import { useEffect, useRef, useState } from 'react';
import { MapPin, Search, Link2, ExternalLink } from 'lucide-react';
import { loadGoogleMaps, parseGoogleMapsLink } from '../../../lib/googleMaps';
import './LocationPicker.css';

const DEFAULT_CENTER = { lat: 6.0, lng: 47.5 }; // Somalia coastline
const DEFAULT_ZOOM = 5.6;

// Replaces raw latitude/longitude number inputs with an actual
// pick-a-location UX: a clickable/searchable Google Map, a "paste a
// Google Maps link" shortcut, and an outgoing "View on Google Maps"
// link once a point is set — instead of admins guessing decimal
// coordinates by hand.
export default function LocationPicker({ value, onChange }) {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [linkError, setLinkError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize the map once the API is ready.
  useEffect(() => {
    if (!ready || !mapElRef.current || mapRef.current) return;

    const center = value?.lat != null && value?.lng != null ? value : DEFAULT_CENTER;
    const map = new window.google.maps.Map(mapElRef.current, {
      center,
      zoom: value ? 11 : DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    });
    mapRef.current = map;

    map.addListener('click', (e) => {
      onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });

    if (searchInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        fields: ['geometry'],
      });
      autocomplete.bindTo('bounds', map);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const loc = place.geometry?.location;
        if (loc) {
          onChange({ lat: loc.lat(), lng: loc.lng() });
          map.panTo(loc);
          map.setZoom(12);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Keep the marker (and map center, on first placement) in sync with value.
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const maps = window.google.maps;

    if (!value?.lat || !value?.lng) {
      markerRef.current?.setMap(null);
      markerRef.current = null;
      return;
    }

    if (!markerRef.current) {
      markerRef.current = new maps.Marker({
        map: mapRef.current,
        position: value,
        draggable: true,
      });
      markerRef.current.addListener('dragend', (e) => {
        onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
      mapRef.current.panTo(value);
      mapRef.current.setZoom(11);
    } else {
      markerRef.current.setPosition(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, value?.lat, value?.lng]);

  const handleUseLink = () => {
    const parsed = parseGoogleMapsLink(linkInput);
    if (!parsed) {
      setLinkError(true);
      return;
    }
    setLinkError(false);
    setLinkInput('');
    onChange(parsed);
  };

  const mapsViewLink =
    value?.lat != null && value?.lng != null
      ? `https://www.google.com/maps?q=${value.lat},${value.lng}`
      : null;

  return (
    <div className="location-picker">
      <div className="location-picker__search">
        <Search size={15} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a place…"
          disabled={!ready}
        />
      </div>

      <div className="location-picker__map-wrap">
        {loadError ? (
          <div className="location-picker__fallback">Could not load Google Maps. Paste a Maps link below instead.</div>
        ) : (
          <div ref={mapElRef} className="location-picker__map" />
        )}
      </div>

      <div className="location-picker__link-row">
        <Link2 size={15} />
        <input
          type="text"
          placeholder="Or paste a Google Maps link…"
          value={linkInput}
          onChange={(e) => { setLinkInput(e.target.value); setLinkError(false); }}
        />
        <button type="button" className="btn btn-outline btn-sm" onClick={handleUseLink}>Use</button>
      </div>
      {linkError && <span className="location-picker__link-error">Couldn't find coordinates in that link.</span>}

      <div className="location-picker__result">
        <MapPin size={14} />
        {value?.lat != null && value?.lng != null ? (
          <>
            <span>{value.lat.toFixed(5)}, {value.lng.toFixed(5)}</span>
            <a href={mapsViewLink} target="_blank" rel="noreferrer" className="location-picker__view-link">
              <span>View on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </>
        ) : (
          <span className="location-picker__placeholder">Click the map, search, or paste a link to set a location.</span>
        )}
      </div>
    </div>
  );
}
