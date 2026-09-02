// Shared Google Maps JS API loader. CoastMap.jsx injects the same script
// tag independently (with the same id) for the public coast map — this
// loader is safe to call alongside it since it checks for that same
// script id before injecting its own, and just waits for it to finish
// loading either way.

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAk6rrT_DxxSanx0pwKjLruI-XhgN_zsko';

const SCRIPT_ID = 'google-maps-script-loader';

let loadPromise = null;

export function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps.')));
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error('Failed to load Google Maps.'));
    document.head.appendChild(script);
  });

  return loadPromise;
}

/** Extracts { lat, lng } from a pasted Google Maps URL, or null if none found. */
export function parseGoogleMapsLink(url) {
  if (!url) return null;

  // .../@lat,lng,zoom  (the format Maps uses in its own address bar)
  let match = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };

  // ?q=lat,lng  or  ll=lat,lng  (share-link formats)
  match = url.match(/[?&](?:q|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };

  return null;
}
