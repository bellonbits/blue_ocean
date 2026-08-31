"""Thread-safe sliding-window rate limiter — Sprint B14."""

import threading
import time
from collections import defaultdict
from typing import Callable
from fastapi import HTTPException, Request, Response, status


class SlidingWindowRateLimiter:
    """Sliding-window in-memory rate limiter per client IP."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._history: dict[str, list[float]] = defaultdict(list)
        self._lock = threading.Lock()

    def is_allowed(self, client_ip: str) -> tuple[bool, int]:
        """Returns (allowed, retry_after_seconds)."""
        now = time.time()
        window_start = now - self.window_seconds

        with self._lock:
            # Prune old timestamps
            timestamps = [t for t in self._history[client_ip] if t > window_start]
            if len(timestamps) >= self.max_requests:
                earliest = timestamps[0]
                retry_after = max(1, int(self.window_seconds - (now - earliest)))
                self._history[client_ip] = timestamps
                return False, retry_after

            timestamps.append(now)
            self._history[client_ip] = timestamps
            return True, 0

    def __call__(self, request: Request) -> None:
        client_ip = request.client.host if request.client else "unknown"
        allowed, retry_after = self.is_allowed(client_ip)
        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded. Maximum {self.max_requests} requests per {self.window_seconds}s. Please retry in {retry_after} seconds.",
                headers={"Retry-After": str(retry_after)},
            )


# Rate limiter instances for different route sensitivity tiers
limiter_auth_login = SlidingWindowRateLimiter(max_requests=10, window_seconds=60)
limiter_contact_submission = SlidingWindowRateLimiter(max_requests=5, window_seconds=300)
limiter_media_upload = SlidingWindowRateLimiter(max_requests=25, window_seconds=60)
limiter_general_api = SlidingWindowRateLimiter(max_requests=120, window_seconds=60)
