import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

// Resolves to { lat, lng, accuracy } from the device GPS. On the native apps
// this goes through Capacitor's permission flow; on the web build the same
// plugin falls back to the browser's navigator.geolocation. Rejects with an
// Error whose `code` is 'denied' | 'unavailable' | 'timeout' so the caller
// can show a specific message instead of a generic failure.
export async function getUserPosition() {
  try {
    if (Capacitor.isNativePlatform()) {
      const status = await Geolocation.checkPermissions();
      if (status.location !== 'granted') {
        const requested = await Geolocation.requestPermissions({ permissions: ['location'] });
        if (requested.location !== 'granted') throw Object.assign(new Error('denied'), { code: 'denied' });
      }
    }
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
    return { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
  } catch (err) {
    if (err.code === 'denied') throw err;
    const message = String(err?.message || '').toLowerCase();
    // Browser GeolocationPositionError: 1 = denied, 2 = unavailable, 3 = timeout.
    if (err?.code === 1 || message.includes('denied') || message.includes('permission')) {
      throw Object.assign(new Error('denied'), { code: 'denied' });
    }
    if (err?.code === 3 || message.includes('timeout') || message.includes('timed out')) {
      throw Object.assign(new Error('timeout'), { code: 'timeout' });
    }
    throw Object.assign(new Error('unavailable'), { code: 'unavailable' });
  }
}

// Great-circle distance in kilometres between two { lat, lng } points.
export function distanceKm(a, b) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// "11.2842° N, 49.1813° E" — picks N/S and E/W from the sign rather than
// printing a negative number next to a fixed hemisphere letter (Jubaland's
// latitudes are south of the equator).
export function formatCoordinates(lat, lng, digits = 4) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(digits)}° ${ns}, ${Math.abs(lng).toFixed(digits)}° ${ew}`;
}
