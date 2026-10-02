import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Waves, Layers, LocateFixed, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getUserPosition, distanceKm, formatCoordinates } from '../../lib/geolocation';
import './CoastMap.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAk6rrT_DxxSanx0pwKjLruI-XhgN_zsko';

// Custom Dark Ocean Google Map Theme
const darkOceanMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#04101e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#030d1a' }, { weight: 3 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#7bbac7' }] },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#00c9b1' }, { weight: 1.5 }, { opacity: 0.6 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0d324d' }, { weight: 1 }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#071626' }],
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry',
    stylers: [{ color: '#061322' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#081e33' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#0a2238' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#020914' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00c9b1' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#020914' }],
  },
];

// Region centers and zoom levels
const regionViewports = {
  all: { center: { lat: 6.0, lng: 47.5 }, zoom: 5.6 },
  puntland: { center: { lat: 10.2, lng: 50.0 }, zoom: 6.8 },
  somaliland: { center: { lat: 10.6, lng: 44.3 }, zoom: 6.8 },
  somalia: { center: { lat: 2.8, lng: 46.0 }, zoom: 6.8 },
  jubaland: { center: { lat: -0.8, lng: 42.4 }, zoom: 7.4 },
};

export default function CoastMap({ destinations = [] }) {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const mapRef = useRef(null);
  const googleMapInstance = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite' | 'hybrid'
  const [selectedId, setSelectedId] = useState('bosaso');
  const [activeRegion, setActiveRegion] = useState('all');
  const userMarkerRef = useRef(null);
  const userCircleRef = useRef(null);
  const [userPos, setUserPos] = useState(null); // { lat, lng, accuracy } from device GPS
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null); // 'denied' | 'unavailable' | 'timeout'

  const hasCoordinates = (d) => d.coordinates?.lat != null && d.coordinates?.lng != null;

  const nearest = userPos
    ? destinations
        .filter(hasCoordinates)
        .map((d) => ({ dest: d, km: distanceKm(userPos, d.coordinates) }))
        .sort((a, b) => a.km - b.km)
        .slice(0, 3)
    : [];

  const selectedDest =
    destinations.find((d) => d.id === selectedId && hasCoordinates(d)) || destinations.find(hasCoordinates);

  const visibleDestinations = destinations.filter(
    (d) => (activeRegion === 'all' || d.regionId === activeRegion) && hasCoordinates(d)
  );

  // Load Google Maps Script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script-loader';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    script.onerror = () => setMapError(true);
    document.head.appendChild(script);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || googleMapInstance.current) return;

    try {
      const initialViewport = regionViewports.all;
      const map = new window.google.maps.Map(mapRef.current, {
        center: initialViewport.center,
        zoom: initialViewport.zoom,
        styles: darkOceanMapStyles,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        backgroundColor: '#030D1A',
        minZoom: 4,
        maxZoom: 14,
      });

      googleMapInstance.current = map;
    } catch (e) {
      console.warn('Google Maps initialization failed:', e);
      setMapError(true);
    }
  }, [mapLoaded]);

  // Update Markers
  useEffect(() => {
    if (!googleMapInstance.current || !window.google) return;

    // Clear previous markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();

    visibleDestinations.forEach((dest) => {
      const isSelected = dest.id === selectedId;
      const position = { lat: dest.coordinates.lat, lng: dest.coordinates.lng };
      bounds.extend(position);

      // Custom SVG Marker Icon
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 8 : 6,
        fillColor: isSelected ? '#00C9B1' : '#4DDFD0',
        fillOpacity: 1,
        strokeColor: '#030D1A',
        strokeWeight: isSelected ? 3 : 2,
      };

      const marker = new window.google.maps.Marker({
        position,
        map: googleMapInstance.current,
        title: dest.name,
        icon: markerIcon,
        label: {
          text: dest.name,
          color: isSelected ? '#00C9B1' : '#F0F6FF',
          fontSize: '11px',
          fontWeight: isSelected ? '700' : '500',
          className: 'gmap-marker-label',
        },
      });

      marker.addListener('click', () => {
        setSelectedId(dest.id);
        googleMapInstance.current.panTo(position);
        if (googleMapInstance.current.getZoom() < 7) {
          googleMapInstance.current.setZoom(8);
        }
      });

      markersRef.current.push(marker);
    });
  }, [mapLoaded, visibleDestinations, selectedId]);

  // Fit the viewport to whichever destinations are visible, instead of a
  // fixed zoom/center — a fixed value tuned for a wide desktop map looked
  // fine there but showed a huge, mostly-inland swath of the map on a
  // narrow mobile viewport. Keyed on activeRegion (not visibleDestinations,
  // which is a new array every render) so a marker click's own panTo/zoom
  // isn't immediately undone by this effect.
  useEffect(() => {
    if (!mapLoaded || !googleMapInstance.current || !window.google) return;

    const regionDestinations = destinations.filter(
      (d) => (activeRegion === 'all' || d.regionId === activeRegion) && hasCoordinates(d)
    );
    if (regionDestinations.length === 0) return;

    if (regionDestinations.length === 1) {
      googleMapInstance.current.panTo({
        lat: regionDestinations[0].coordinates.lat,
        lng: regionDestinations[0].coordinates.lng,
      });
      googleMapInstance.current.setZoom(8);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    regionDestinations.forEach((d) => bounds.extend({ lat: d.coordinates.lat, lng: d.coordinates.lng }));
    googleMapInstance.current.fitBounds(bounds, 48);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded, activeRegion]);

  const handleRegionChange = (regionId) => {
    setActiveRegion(regionId);
  };

  const handleLocate = async () => {
    setLocating(true);
    setLocError(null);
    try {
      setUserPos(await getUserPosition());
    } catch (err) {
      setLocError(err.code || 'unavailable');
    } finally {
      setLocating(false);
    }
  };

  const handleClearLocation = () => {
    setUserPos(null);
    setLocError(null);
    const map = googleMapInstance.current;
    const regionDestinations = destinations.filter(
      (d) => (activeRegion === 'all' || d.regionId === activeRegion) && hasCoordinates(d)
    );
    if (!map || !window.google || regionDestinations.length === 0) return;
    const bounds = new window.google.maps.LatLngBounds();
    regionDestinations.forEach((d) => bounds.extend({ lat: d.coordinates.lat, lng: d.coordinates.lng }));
    map.fitBounds(bounds, 48);
  };

  // Blue "you are here" dot + accuracy ring, and frame the visitor together
  // with the nearest coastal destinations so both are on screen at once.
  useEffect(() => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    if (userCircleRef.current) {
      userCircleRef.current.setMap(null);
      userCircleRef.current = null;
    }
    if (!userPos || !mapLoaded || !googleMapInstance.current || !window.google) return;

    const map = googleMapInstance.current;
    const center = { lat: userPos.lat, lng: userPos.lng };

    userCircleRef.current = new window.google.maps.Circle({
      map,
      center,
      radius: userPos.accuracy || 0,
      fillColor: '#4285F4',
      fillOpacity: 0.15,
      strokeOpacity: 0,
      clickable: false,
    });
    userMarkerRef.current = new window.google.maps.Marker({
      position: center,
      map,
      title: t('exploreCoast.map.youAreHere'),
      zIndex: 999,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
      },
    });

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    nearest.forEach(({ dest }) => bounds.extend({ lat: dest.coordinates.lat, lng: dest.coordinates.lng }));
    map.fitBounds(bounds, 64);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded, userPos]);

  const focusDestination = (dest) => {
    setSelectedId(dest.id);
    const map = googleMapInstance.current;
    if (map) {
      map.panTo({ lat: dest.coordinates.lat, lng: dest.coordinates.lng });
      if (map.getZoom() < 7) map.setZoom(8);
    }
  };

  // Handle Map Type Toggle (Dark Road vs Satellite)
  const toggleMapType = () => {
    if (!googleMapInstance.current || !window.google) return;
    const nextType = mapType === 'roadmap' ? 'hybrid' : 'roadmap';
    setMapType(nextType);
    googleMapInstance.current.setMapTypeId(
      nextType === 'hybrid'
        ? window.google.maps.MapTypeId.HYBRID
        : window.google.maps.MapTypeId.ROADMAP
    );
  };

  return (
    <section className="coast-map-section section" id="coast-map" aria-labelledby="map-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">{t('exploreCoast.map.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="map-heading">
            {t('exploreCoast.map.heading')}
          </h2>
          <p className="section-subheading">
            {t('exploreCoast.map.subheading')}
          </p>
        </div>

        {/* Region Controls */}
        <div className="map-controls reveal">
          <div className="map-region-pills">
            <button
              onClick={() => handleRegionChange('all')}
              className={`map-pill ${activeRegion === 'all' ? 'map-pill--active' : ''}`}
            >
              {t('exploreCoast.map.pillAll')}
            </button>
            <button
              onClick={() => handleRegionChange('puntland')}
              className={`map-pill ${activeRegion === 'puntland' ? 'map-pill--active' : ''}`}
            >
              {t('exploreCoast.map.pillPuntland')}
            </button>
            <button
              onClick={() => handleRegionChange('somaliland')}
              className={`map-pill ${activeRegion === 'somaliland' ? 'map-pill--active' : ''}`}
            >
              {t('exploreCoast.map.pillSomaliland')}
            </button>
            <button
              onClick={() => handleRegionChange('somalia')}
              className={`map-pill ${activeRegion === 'somalia' ? 'map-pill--active' : ''}`}
            >
              {t('exploreCoast.map.pillSomalia')}
            </button>
            <button
              onClick={() => handleRegionChange('jubaland')}
              className={`map-pill ${activeRegion === 'jubaland' ? 'map-pill--active' : ''}`}
            >
              {t('exploreCoast.map.pillJubaland')}
            </button>
          </div>

          <div className="map-controls__actions">
            <button
              onClick={userPos ? handleClearLocation : handleLocate}
              disabled={locating}
              className={`map-type-toggle-btn map-locate-btn ${userPos ? 'map-locate-btn--active' : ''}`}
              id="map-use-my-location"
            >
              {userPos ? <X size={14} /> : <LocateFixed size={14} />}
              <span>
                {locating
                  ? t('exploreCoast.map.locating')
                  : userPos
                    ? t('exploreCoast.map.clearLocation')
                    : t('exploreCoast.map.useMyLocation')}
              </span>
            </button>
            <button
              onClick={toggleMapType}
              className="map-type-toggle-btn"
              title={t('exploreCoast.map.toggleTitle')}
            >
              <Layers size={14} />
              <span>{mapType === 'roadmap' ? t('exploreCoast.map.toggleSatellite') : t('exploreCoast.map.toggleDarkOcean')}</span>
            </button>
          </div>
        </div>

        {locError && (
          <p className="map-locate-error" role="alert">
            {t(`exploreCoast.map.error${locError.charAt(0).toUpperCase()}${locError.slice(1)}`)}
          </p>
        )}

        {nearest.length > 0 && (
          <div className="map-nearest" aria-live="polite">
            <span className="map-nearest__heading">{t('exploreCoast.map.nearestHeading')}</span>
            <div className="map-nearest__list">
              {nearest.map(({ dest, km }) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => focusDestination(dest)}
                  className={`map-nearest__item ${dest.id === selectedId ? 'map-nearest__item--active' : ''}`}
                >
                  <span className="map-nearest__name">{dest.name}</span>
                  <span className="map-nearest__km">{Math.round(km).toLocaleString()} {t('exploreCoast.map.kmAway')}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Map Layout Card */}
        <div className="map-container-card glass reveal">
          {/* Google Maps Container */}
          <div className="map-viewport" ref={mapRef}>
            {!mapLoaded && !mapError && (
              <div className="map-loading-overlay">
                <Compass size={36} className="map-loading-icon" />
                <span>{t('exploreCoast.map.loadingText')}</span>
              </div>
            )}
          </div>

          {/* Floating Destination Inspector Card */}
          {selectedDest && (
            <div className="map-inspector">
              <div className="map-inspector__image-wrap">
                <img
                  src={selectedDest.heroImage}
                  alt={selectedDest.name}
                  className="map-inspector__img"
                />
                <div className="map-inspector__img-overlay" />
                <span className="map-inspector__region badge badge-turquoise">
                  {selectedDest.region}
                </span>
              </div>

              <div className="map-inspector__content">
                <div className="map-inspector__header">
                  <h3 className="map-inspector__title">{selectedDest.name}</h3>
                  <span className="map-inspector__type">{selectedDest.destinationType}</span>
                </div>

                <p className="map-inspector__desc">{selectedDest.shortDescription}</p>

                <div className="map-inspector__meta">
                  <div className="map-inspector__meta-item">
                    <Compass size={13} />
                    <span>{formatCoordinates(selectedDest.coordinates.lat, selectedDest.coordinates.lng)}</span>
                  </div>
                  {userPos && (
                    <div className="map-inspector__meta-item">
                      <LocateFixed size={13} />
                      <span>
                        {Math.round(distanceKm(userPos, selectedDest.coordinates)).toLocaleString()}{' '}
                        {t('exploreCoast.map.kmAway')}
                      </span>
                    </div>
                  )}
                  <div className="map-inspector__meta-item">
                    <Waves size={13} />
                    <span>{selectedDest.coastlineArea}</span>
                  </div>
                </div>

                <div className="map-inspector__actions">
                  <Link
                    to={localizedPath(`/explore-the-coast/${selectedDest.slug}`)}
                    className="btn btn-primary btn-sm"
                    id={`map-explore-${selectedDest.slug}`}
                  >
                    <span>{t('exploreCoast.map.inspectorCta')}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
