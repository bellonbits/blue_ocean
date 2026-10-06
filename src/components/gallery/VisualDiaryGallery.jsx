import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, X, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './VisualDiaryGallery.css';

export default function VisualDiaryGallery({ title, subtitle }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';

  const defaultTitle = isSomali ? 'Xusuus-qorkayga Muuqaalka ah' : 'My Visual Diary';
  const defaultSubtitle = isSomali
    ? 'Ku arag xeebaha Soomaaliya muraayaddayda: sawirro iyo muuqaallo cajiib ah'
    : 'See Somalia’s coast through our lens: adventures in photos and videos';

  const galleryTitle = title || defaultTitle;
  const gallerySubtitle = subtitle || defaultSubtitle;

  // Location/Category Filter Pills for Somalia's Coastline
  const filterPills = [
    { id: 'all', label: isSomali ? 'Dhammaan' : 'All Coast' },
    { id: 'bosaso', label: isSomali ? 'Boosaaso' : 'Bosaso' },
    { id: 'bajuni', label: isSomali ? 'Baajuun' : 'Bajuni' },
    { id: 'hafun', label: isSomali ? 'Xaafuun' : 'Hafun' },
    { id: 'eyl', label: isSomali ? 'Eyl' : 'Eyl' },
    { id: 'kismayo', label: isSomali ? 'Kismaayo' : 'Kismayo' },
    { id: 'berbera', label: isSomali ? 'Berbera' : 'Berbera' },
    { id: 'liido', label: isSomali ? 'Liido' : 'Lido' },
    { id: 'barawe', label: isSomali ? 'Baraawe' : 'Barawe' },
    { id: 'zeila', label: isSomali ? 'Saylac' : 'Zeila' },
  ];

  const [activePill, setActivePill] = useState('all');

  // Authentic Somali Coastline Collections by Pill
  const mediaCollections = {
    all: [
      {
        id: 'all-1',
        title: isSomali ? 'Dekedda Qadiimiga ah ee Boosaaso' : 'Bosaso Historic Seaport & Maritime Channel',
        image: '/bosaso_harbor_thumb.jpg',
        isVideo: true,
        videoUrl: '/bosaso_harbor.mp4',
      },
      {
        id: 'all-2',
        title: isSomali ? 'Mowjadaha Xeebta & Biyaha Nadiifka ah' : 'Shoreline Breakers & Azure Sea of Puntland',
        image: '/bosaso_1005_thumb.jpg',
        isVideo: true,
        videoUrl: '/1005.mp4',
      },
      {
        id: 'all-3',
        title: isSomali ? 'Xeebta Boosaaso & Buuraha Karkaar' : 'Pristine Bosaso Coastline & Karkaar Mountains',
        image: '/somalia_hero_coast.jpg',
        isVideo: false,
      },
      {
        id: 'all-4',
        title: isSomali ? 'Doonyaha Dhowka & Nolosha Xeebta' : 'Traditional Dhow Fleet & Coastal Life',
        image: '/bosaso_life_thumb.jpg',
        isVideo: true,
        videoUrl: '/bosaso_coastal_life.mp4',
      },
      {
        id: 'all-5',
        title: isSomali ? 'Cirifka Bari ee Raas Xaafuun' : 'Ras Hafun Sandstone Headlands & Indian Ocean',
        image: '/hafun1.jpg',
        isVideo: false,
      },
    ],
    bosaso: [
      {
        id: 'bo-1',
        title: isSomali ? 'Dekedda Ganacsiga Boosaaso' : 'Bosaso Commercial Gateway',
        image: '/bosaso_harbor_thumb.jpg',
        isVideo: true,
        videoUrl: '/bosaso_harbor.mp4',
      },
      {
        id: 'bo-2',
        title: isSomali ? 'Xeebta Nadiifka ah ee Boosaaso' : 'Crystal Turquoise Shoreline',
        image: '/bosaso_1005_thumb.jpg',
        isVideo: true,
        videoUrl: '/1005.mp4',
      },
      {
        id: 'bo-3',
        title: isSomali ? 'Dhoobada Badda & Buuraha Karkaar' : 'Where Mountains Plunge Into Gulf of Aden',
        image: '/somalia_hero_coast.jpg',
        isVideo: false,
      },
      {
        id: 'bo-4',
        title: isSomali ? 'Kalluumeysatada Dhowka Boosaaso' : 'Artisanal Tuna Fishermen & Dhows',
        image: '/bosaso_life_thumb.jpg',
        isVideo: true,
        videoUrl: '/bosaso_coastal_life.mp4',
      },
      {
        id: 'bo-5',
        title: isSomali ? 'Xeebta Qandala ee Boosaaso u dhow' : 'Qandala Coastal Cliffs',
        image: '/qandala_main.jpg',
        isVideo: false,
      },
    ],
    bajuni: [
      {
        id: 'ba-1',
        title: isSomali ? 'Jasiiradaha Baajuun ee Biyaha Saafi ah' : 'Bajuni Archipelago Coral Reefs',
        image: '/kismayo1.png',
        isVideo: false,
      },
      {
        id: 'ba-2',
        title: isSomali ? 'Kanaalada Mangroves ee Jubada Hoose' : 'Mangrove Estuaries & Tidal Channels',
        image: '/kismayo2.png',
        isVideo: false,
      },
      {
        id: 'ba-3',
        title: isSomali ? 'Jasiiradaha Dabiiciga ah ee Baajuun' : 'Turquoise Atolls of Jubaland',
        image: '/kismayo3.png',
        isVideo: false,
      },
      {
        id: 'ba-4',
        title: isSomali ? 'Raas Kamboni & Badweynta Hindiya' : 'Ras Kamboni Marine Sanctuary',
        image: '/kamboni1.png',
        isVideo: false,
      },
      {
        id: 'ba-5',
        title: isSomali ? 'Xeebta Kismaayo ee Dhagaxeed' : 'Kismayo Coastal Horizon',
        image: '/kismayo4.png',
        isVideo: false,
      },
    ],
    hafun: [
      {
        id: 'hf-1',
        title: isSomali ? 'Cirifka Raas Xaafuun' : 'Ras Hafun Easternmost Promontory',
        image: '/hafun1.jpg',
        isVideo: false,
      },
      {
        id: 'hf-2',
        title: isSomali ? 'Xeebta Baargaal ee Puntland' : 'Bargaal Palm Oasis on Oceanfront',
        image: '/bargaal_main.jpg',
        isVideo: false,
      },
      {
        id: 'hf-3',
        title: isSomali ? 'Banka Xaafuun & Badda Casri ah' : 'Ancient Opone Maritime Tombolo',
        image: '/hafun2.jpg',
        isVideo: false,
      },
      {
        id: 'hf-4',
        title: isSomali ? 'Mowjadaha Badweynta Hindiya ee Xaafuun' : 'Hafun Indian Ocean Swell',
        image: '/hafun3.jpg',
        isVideo: false,
      },
      {
        id: 'hf-5',
        title: isSomali ? 'Xeebta Baargaal & Kalluumeysatada' : 'Bargaal Coastal Anchorage',
        image: '/bargaal_1.jpg',
        isVideo: false,
      },
    ],
    liido: [
      {
        id: 'li-1',
        title: isSomali ? 'Xeebta Liido ee Muqdisho' : 'Lido Beach Promenade',
        image: '/liido1.png',
        isVideo: false,
      },
      {
        id: 'li-2',
        title: isSomali ? 'Xeebta Jasiira ee Quruxda Badan' : 'Jazeera Lagoon & Coral Shallows',
        image: '/jazeera1.png',
        isVideo: false,
      },
      {
        id: 'li-3',
        title: isSomali ? 'Mowjadaha Liido & Cadceed Dhaca' : 'Sunset Over Lido Breakers',
        image: '/liido2.png',
        isVideo: false,
      },
      {
        id: 'li-4',
        title: isSomali ? 'Jasiiradda Jasiira' : 'Jazeera Marine Outcrop',
        image: '/jazeera2.png',
        isVideo: false,
      },
      {
        id: 'li-5',
        title: isSomali ? 'Badda Banaadir & Nolosha Bulshada' : 'Mogadishu Coastal Horizon',
        image: '/liido3.png',
        isVideo: false,
      },
    ],
  };

  const activeMedia = mediaCollections[activePill] || mediaCollections.all;
  const [activeIndex, setActiveIndex] = useState(2); // Center item (index 2) by default
  const [lightboxItem, setLightboxItem] = useState(null);

  // Auto reset activeIndex when pill changes
  useEffect(() => {
    setActiveIndex(Math.floor(activeMedia.length / 2));
  }, [activePill]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activeMedia.length) % activeMedia.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activeMedia.length);
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
  }, [activeMedia.length]);

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
    const total = activeMedia.length;
    let offset = idx - activeIndex;

    // Wrap around for seamless coverflow
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
    <section className="diary-gallery-section" aria-label="Visual Diary Gallery">
      <div className="diary-gallery-bokeh" />

      {/* Main Glass Card Container with Iridescent Gradient Border */}
      <div className="diary-gallery-card">
        {/* Header */}
        <div className="diary-gallery__header">
          <span className="diary-gallery__eyebrow">GALLERY</span>
          <h2 className="diary-gallery__title">{galleryTitle}</h2>
          <p className="diary-gallery__subtext">{gallerySubtitle}</p>
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
          <button
            type="button"
            className="diary-pill diary-pill--view-more"
            onClick={() => navigate(`/${language}/explore-the-coast`)}
            aria-label={isSomali ? 'Sahami Dhammaan Xeebaha' : 'View more destinations'}
          >
            <span>{isSomali ? 'Sahami Dhammaan' : 'View More'}</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 3D Coverflow Stage */}
        <div
          className="diary-coverflow-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {activeMedia.map((item, idx) => {
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
            aria-label={isSomali ? 'Hore' : 'Previous item'}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="diary-nav-btn"
            onClick={handleNext}
            aria-label={isSomali ? 'Xiga' : 'Next item'}
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
