import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, X, Maximize2 } from 'lucide-react';
import '../gallery/VisualDiaryGallery.css';

export default function DestinationGallery({ destination }) {
  // Collect images and videos for this destination
  const rawImages = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [destination.heroImage, '/bosaso_beach_thumb.jpg', '/bosaso_1005_thumb.jpg', '/bosaso_life_thumb.jpg', '/bosaso_harbor_thumb.jpg'];

  const rawVideos = destination.videos && destination.videos.length > 0
    ? destination.videos
    : destination.videoUrl
    ? [{ url: destination.videoUrl, title: destination.name, thumbnail: destination.videoThumbnail }]
    : [];

  // Build combined visual diary collection
  const filterPills = [
    { id: 'all', label: 'All Highlights' },
    { id: 'beaches', label: 'Beaches & Lagoons' },
    { id: 'coral', label: 'Coral & Marine Life' },
    { id: 'culture', label: 'Maritime Culture' },
  ];

  const [activePill, setActivePill] = useState('all');

  // Prepare standard 5 items for the coverflow
  const mediaItems = [
    {
      id: 'item-1',
      title: `${destination.name} Shoreline & Surf`,
      image: rawImages[1] || rawImages[0] || '/bosaso_1005_thumb.jpg',
      isVideo: true,
      videoUrl: rawVideos[1]?.url || '/1005.mp4',
    },
    {
      id: 'item-2',
      title: `${destination.name} Coastal Panorama`,
      image: rawImages[2] || '/raja_wayag.jpg',
      isVideo: false,
    },
    {
      id: 'item-3',
      title: `${destination.name} Pristine Waters`,
      image: rawImages[0] || destination.heroImage || '/gallery_center_lake.jpg',
      isVideo: false,
    },
    {
      id: 'item-4',
      title: `${destination.name} Maritime Dhow Fleet`,
      image: rawImages[3] || '/bosaso_life_thumb.jpg',
      isVideo: true,
      videoUrl: rawVideos[0]?.url || '/bosaso_coastal_life.mp4',
    },
    {
      id: 'item-5',
      title: `${destination.name} Aerial Horizon`,
      image: rawImages[4] || '/raja_arborek.jpg',
      isVideo: false,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Center card (index 2) by default
  const [lightboxItem, setLightboxItem] = useState(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mediaItems.length]);

  // Touch Swipe for mobile
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  const getPositionClass = (idx) => {
    const total = mediaItems.length;
    let offset = idx - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    if (offset === 0) return 'diary-flow-card--center';
    if (offset === -1) return 'diary-flow-card--left-1';
    if (offset === 1) return 'diary-flow-card--right-1';
    if (offset === -2) return 'diary-flow-card--left-2';
    if (offset === 2) return 'diary-flow-card--right-2';
    return 'diary-flow-card--hidden';
  };

  return (
    <section className="diary-gallery-section" aria-label={`${destination.name} Visual Diary`}>
      <div className="diary-gallery-bokeh" />

      {/* Main Glass Card Container with Iridescent Gradient Border */}
      <div className="diary-gallery-card">
        {/* Header */}
        <div className="diary-gallery__header">
          <span className="diary-gallery__eyebrow">GALLERY</span>
          <h2 className="diary-gallery__title">{destination.name} Visual Diary</h2>
          <p className="diary-gallery__subtext">
            See {destination.name} through our lens: adventures in photos and videos
          </p>
        </div>

        {/* Filter Pills */}
        <div className="diary-pills-track" role="tablist">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`diary-pill ${activePill === pill.id ? 'diary-pill--active' : ''}`}
              onClick={() => setActivePill(pill.id)}
              role="tab"
              aria-selected={activePill === pill.id}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 3D Coverflow Stage */}
        <div
          className="diary-coverflow-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {mediaItems.map((item, idx) => {
            const posClass = getPositionClass(idx);
            const isCenter = posClass === 'diary-flow-card--center';

            return (
              <div
                key={item.id}
                className={`diary-flow-card ${posClass}`}
                onClick={() => {
                  if (isCenter) {
                    setLightboxItem(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="diary-flow-card__img"
                  loading="lazy"
                />

                {/* Circular Play Badge for Video Items */}
                {item.isVideo && (
                  <div className="diary-flow-card__play-badge" aria-label="Play Video">
                    <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Controls: Circular Outline Buttons */}
        <div className="diary-gallery__controls">
          <button
            type="button"
            className="diary-nav-btn"
            onClick={handlePrev}
            aria-label="Previous item"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="diary-nav-btn"
            onClick={handleNext}
            aria-label="Next item"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {lightboxItem && (
        <div
          className="diary-lightbox"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="diary-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="diary-lightbox__close"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {lightboxItem.isVideo && lightboxItem.videoUrl ? (
              <video
                src={lightboxItem.videoUrl}
                controls
                autoPlay
                className="diary-lightbox__media"
                style={{ width: '100%', maxHeight: '75vh', borderRadius: 16 }}
              />
            ) : (
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="diary-lightbox__media"
              />
            )}

            <div className="diary-lightbox__caption">
              {lightboxItem.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
