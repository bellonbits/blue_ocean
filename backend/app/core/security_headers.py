"""Security headers and payload protection middleware — Sprint B14."""

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Injects defensive HTTP security headers into every response."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"

        return response


class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """Guards against denial-of-service via huge request bodies."""

    def __init__(self, app, max_upload_size_bytes: int = 15 * 1024 * 1024, max_json_size_bytes: int = 2 * 1024 * 1024):
        super().__init__(app)
        self.max_upload_size_bytes = max_upload_size_bytes
        self.max_json_size_bytes = max_json_size_bytes

    async def dispatch(self, request: Request, call_next) -> Response:
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                length = int(content_length)
                is_media_upload = request.url.path.startswith("/api/v1/media")
                max_allowed = self.max_upload_size_bytes if is_media_upload else self.max_json_size_bytes

                if length > max_allowed:
                    return JSONResponse(
                        status_code=413,
                        content={"detail": f"Payload too large. Maximum allowed size is {max_allowed // (1024 * 1024)}MB."},
                    )
            except ValueError:
                pass

        return await call_next(request)
