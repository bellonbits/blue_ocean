import { useEffect, useRef, useState, useCallback } from 'react';

// ---- Recently viewed (dashboard "Continue Exploring") --------------------
//
// Client-side only — no cross-device need, and avoids a backend write on
// every single page view. Caps at 8 most-recent, deduped by type+slug.

const RECENTLY_VIEWED_KEY = 'blue_ocean_recently_viewed';
const RECENTLY_VIEWED_LIMIT = 8;

/**
 * Call from a content detail page to record it as viewed. `item` shape:
 * { type: 'destination'|'species'|'experience'|'research', slug, title, subtitle, image, path }
 */
export function trackRecentlyViewed(item) {
  if (!item?.type || !item?.slug) return;
  try {
    const existing = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    const withoutDupe = existing.filter((e) => !(e.type === item.type && e.slug === item.slug));
    const next = [{ ...item, viewedAt: Date.now() }, ...withoutDupe].slice(0, RECENTLY_VIEWED_LIMIT);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private mode etc.) — recently-viewed is a
    // nice-to-have, fail silently.
  }
}

/** Hook for reading the list, e.g. on the dashboard home page. */
export function useRecentlyViewed() {
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]'));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(refresh, [refresh]);

  return items;
}

/** Call from a detail page: records the view once per mount/slug change. */
export function useTrackRecentlyViewed(item) {
  useEffect(() => {
    if (item) trackRecentlyViewed(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.type, item?.slug]);
}

/**
 * useScrollReveal — attaches IntersectionObserver to elements with .reveal class
 * and adds .revealed when they enter the viewport.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.05, rootMargin = '0px 0px -30px 0px' } = options;

  useEffect(() => {
    let observer;

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('.reveal:not(.revealed)');
      if (elements.length === 0) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // fire once
              }
            });
          },
          { threshold, rootMargin }
        );
      }

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in/above viewport, reveal immediately
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    scanAndObserve();
    const t1 = setTimeout(scanAndObserve, 80);
    const t2 = setTimeout(scanAndObserve, 350);
    const t3 = setTimeout(scanAndObserve, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (observer) observer.disconnect();
    };
  }, [threshold, rootMargin]);
}

/**
 * useCountUp — animates a number from 0 to target when element enters viewport
 */
export function useCountUp(ref, target, duration = 2000) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const isFloat = String(target).includes('.');
        const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
        const suffix = String(target).replace(/[0-9.]/g, '');

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numTarget * eased;
          ref.current.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, target, duration]);
}
