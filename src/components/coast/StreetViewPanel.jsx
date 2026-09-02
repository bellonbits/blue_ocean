import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { loadGoogleMaps } from '../../lib/googleMaps';

// The plain <iframe src=".../embed/v1/streetview?location=...">  only
// searches a very tight radius around the exact point given, so it
// silently renders a dark box whenever the nearest real panorama is more
// than a few dozen meters away — common along this coastline, where
// imagery (when it exists at all) tends to be a scattered user photo
// rather than continuous car-driven coverage. Using the JS API's
// StreetViewService directly lets us search a much wider radius and, if
// nothing turns up at all, say so instead of showing a broken-looking
// blank panel.
const SEARCH_RADIUS_METERS = 2000;

export default function StreetViewPanel({ coordinates, name = 'this location' }) {
  const panoRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ok | none | error

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !panoRef.current) return;

        const streetViewService = new maps.StreetViewService();
        streetViewService.getPanorama(
          { location: coordinates, radius: SEARCH_RADIUS_METERS, source: maps.StreetViewSource.OUTDOOR },
          (data, requestStatus) => {
            if (cancelled) return;

            if (requestStatus !== 'OK' || !data?.location?.latLng) {
              setStatus('none');
              return;
            }

            new maps.StreetViewPanorama(panoRef.current, {
              position: data.location.latLng,
              pov: { heading: 0, pitch: 0 },
              zoom: 1,
              addressControl: false,
              fullscreenControl: true,
              motionTracking: false,
              motionTrackingControl: false,
            });
            setStatus('ok');
          }
        );
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [coordinates]);

  return (
    <div className="street-view-panel">
      <div ref={panoRef} className="street-view-panel__pano" hidden={status !== 'ok'} />

      {status === 'loading' && (
        <div className="street-view-panel__message">Looking for Street View imagery…</div>
      )}

      {status === 'none' && (
        <div className="street-view-panel__message">
          <Camera size={20} />
          <span>No Street View imagery is available near {name} yet.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="street-view-panel__message">Couldn't load Street View. Please try again.</div>
      )}
    </div>
  );
}
