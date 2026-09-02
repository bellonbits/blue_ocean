import { useEffect, useState } from 'react';
import { getDestinationPhotos } from '../../lib/contentApi';

// Real destination photography, Google Places first, falling back to
// Blue Ocean's own local image — per Blue Ocean's chosen fallback order:
//
//   Google Places photo available → use it
//   otherwise                     → use fallbackSrc (local image/placeholder)
//
// Renders fallbackSrc immediately (no loading flash) and silently
// upgrades to a live Google photo if one resolves — a slow/unconfigured/
// down Google Places API just means the local image keeps showing.
export default function PlaceImage({ slug, fallbackSrc, alt, className, loading = 'lazy', fetchPriority }) {
  const [googleSrc, setGoogleSrc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setGoogleSrc(null);
    if (!slug) return undefined;

    getDestinationPhotos(slug)
      .then((photos) => {
        if (!cancelled && photos.length > 0) setGoogleSrc(photos[0].url);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [slug]);

  return (
    <img
      src={googleSrc || fallbackSrc}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  );
}
