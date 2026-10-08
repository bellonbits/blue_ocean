import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Sparkles,
  Compass,
  MapPin,
  ExternalLink,
  Maximize2,
  X,
  ZoomIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './CoverFlowGallery.css';

// Default Somali Coastal Havens Masterpieces (Exact Match to User Reference Layout)
export const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'eyl-canyon',
    title: 'Dooxada Eyl Gorge',
    subtitle: 'Nugaal Valley Coast',
    tag: '1918',
    year: '1918',
    desc: 'Breathtaking freshwater springs cascade through sheer limestone canyon gorges directly into the cobalt swells of the Indian Ocean.',
    image: '/images/img_03.webp',
    avatar: '/images/img_03.webp',
    author: 'Dooxada Eyl Sanctuary',
    authorMeta: 'Nugaal Valley, Indian Ocean Coast • 07°58′N 49°49′E',
    link: '/explore-the-coast/eyl',
  },
  {
    id: 'water-lilies-hafun',
    title: 'Ras Hafun Bluffs',
    subtitle: 'Easternmost Tip of Africa',
    tag: 'BARI',
    year: 'BARI',
    desc: 'Towering continental sandstone cliffs plunge into deep oceanic trenches where centuries of monsoonal spice trading routes converge.',
    image: '/images/img_01.webp',
    avatar: '/images/img_01.webp',
    author: 'Ras Hafun Headlands',
    authorMeta: 'Horn of Africa Continental Shelf • 10°25′N 51°16′E',
    link: '/explore-the-coast/hafun',
  },
  {
    id: 'bajuni-islands',
    title: 'Bajuni Coral Atolls',
    subtitle: 'Jubaland Marine Archipelago',
    tag: 'SOUTH',
    year: 'SOUTH',
    desc: 'An untouched constellation of coral atolls, turquoise lagoons, traditional Swahili-Somali dhow vessels, and green turtle hatcheries.',
    image: '/images/img_05.webp',
    avatar: '/images/img_05.webp',
    author: 'Bajuni Archipelago',
    authorMeta: 'Kismayo Coastal District • 00°21′S 42°32′E',
    link: '/explore-the-coast/kismayo',
  },
  {
    id: 'bosaso-lagoon',
    title: 'Bosaso Coral Coves',
    subtitle: 'Gulf of Aden Marine Outpost',
    tag: 'GULF',
    year: 'GULF',
    desc: 'Where the rugged Karkaar mountain amphitheater plunges into crystal Gulf waters, sheltering artisanal fleets and seasonal whale sharks.',
    image: '/images/img_02.webp',
    avatar: '/images/img_02.webp',
    author: 'Gulf of Aden Sanctuary',
    authorMeta: 'Bari Commercial Seaport • 11°17′N 49°11′E',
    link: '/explore-the-coast/bosaso',
  },
  {
    id: 'lido-corniche',
    title: 'Lido Ocean Horizon',
    subtitle: 'Banadir Coastline Promenade',
    tag: 'BANADIR',
    year: 'BANADIR',
    desc: 'Somalia’s iconic golden coastline where warm ocean breezes, vibrant coastal dining, and historic coral-stone promenades greet the open sea.',
    image: '/images/image.webp',
    avatar: '/images/image.webp',
    author: 'Banadir Seashore',
    authorMeta: 'Mogadishu Coastal Haven • 02°02′N 45°21′E',
    link: '/explore-the-coast/mogadishu',
  },
];

export default function CoverFlowGallery({
  items = DEFAULT_GALLERY_ITEMS,
  eyebrow = 'CURATED PHOTOGRAPHY',
  title = 'Visual Ocean Masterpieces',
  subtitle = 'Experience 3,330 km of living Somali coastline through our immersive 3D visual collection.',
  whiteBackground = true,
}) {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const galleryItems = items && items.length > 0 ? items : DEFAULT_GALLERY_ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);
  const [copied, setCopied] = useState(false);

  // Prevent background scroll when lightbox modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null);
        } else if (e.key === 'ArrowLeft') {
          handleLightboxPrev();
        } else if (e.key === 'ArrowRight') {
          handleLightboxNext();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryItems.length, lightboxIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => {
      const nextIdx = (prev - 1 + galleryItems.length) % galleryItems.length;
      setActiveIndex(nextIdx);
      return nextIdx;
    });
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => {
      const nextIdx = (prev + 1) % galleryItems.length;
      setActiveIndex(nextIdx);
      return nextIdx;
    });
  };

  const openLightbox = (idx) => {
    setActiveIndex(idx);
    setLightboxIndex(idx);
  };

  const handleToggleLike = (e) => {
    e?.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    const current = galleryItems[activeIndex] || galleryItems[0];
    if (navigator.share) {
      navigator
        .share({
          title: current.title,
          text: current.desc,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Touch Swipe for Mobile / Tablet Stage
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) handleNext();
    if (diff < -35) handlePrev();
    touchStartX.current = null;
  };

  // Touch Swipe for Mobile Fullscreen Lightbox
  const lightboxTouchStartX = useRef(null);
  const handleLightboxTouchStart = (e) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };
  const handleLightboxTouchEnd = (e) => {
    if (lightboxTouchStartX.current === null) return;
    const diff = lightboxTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) handleLightboxNext();
    if (diff < -35) handleLightboxPrev();
    lightboxTouchStartX.current = null;
  };

  const activeItem = galleryItems[activeIndex] || galleryItems[0];
  const lightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  // Calculate 3D position classes for coverflow
  const getCardOffset = (idx) => {
    const total = galleryItems.length;
    let offset = idx - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section
      className={`cflow-section ${whiteBackground ? 'cflow-section--white' : ''}`}
      aria-label="3D Cover Flow Image Gallery"
    >
      {/* Top Header */}
      {(title || eyebrow) && (
        <div className="cflow-header">
          {eyebrow && <span className="cflow-eyebrow">{eyebrow}</span>}
          {title && <h2 className="cflow-title">{title}</h2>}
          {subtitle && <p className="cflow-subtitle">{subtitle}</p>}
        </div>
      )}

      {/* 3D Stage Wrapper */}
      <div
        className="cflow-stage-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Side Action Buttons (Heart & Share) */}
        <aside className="cflow-floating-actions" aria-label="Gallery Actions">
          <button
            type="button"
            className={`cflow-action-btn ${isLiked ? 'cflow-action-btn--liked' : ''}`}
            onClick={handleToggleLike}
            aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
            title={`${likeCount} Likes`}
          >
            <Heart size={20} fill={isLiked ? '#f43f5e' : 'none'} color={isLiked ? '#f43f5e' : '#ffffff'} />
          </button>

          <button
            type="button"
            className="cflow-action-btn"
            onClick={handleShare}
            aria-label="Share photo"
            title={copied ? 'Link Copied!' : 'Share'}
          >
            <Share2 size={19} color="#ffffff" />
          </button>
        </aside>

        {/* 3D Cover Flow Cards Array */}
        <div className="cflow-stage">
          {galleryItems.map((item, idx) => {
            const offset = getCardOffset(idx);
            let positionClass = 'cflow-card--hidden';

            if (offset === 0) positionClass = 'cflow-card--center';
            else if (offset === -1) positionClass = 'cflow-card--left-1';
            else if (offset === 1) positionClass = 'cflow-card--right-1';
            else if (offset === -2) positionClass = 'cflow-card--left-2';
            else if (offset === 2) positionClass = 'cflow-card--right-2';

            const isCenter = offset === 0;

            return (
              <div
                key={item.id || idx}
                className={`cflow-card ${positionClass}`}
                onClick={() => {
                  if (isCenter) {
                    openLightbox(idx);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={isCenter ? `Click to view full photo: ${item.title}` : `Bring to center: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isCenter) {
                      openLightbox(idx);
                    } else {
                      setActiveIndex(idx);
                    }
                  }
                }}
              >
                {/* Full-Bleed Image Background */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="cflow-card-img"
                  loading="lazy"
                />

                {/* Card Zoom Badge on Top-Right */}
                <button
                  type="button"
                  className="cflow-card-zoom-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(idx);
                  }}
                  aria-label="View photo in fullscreen gallery"
                  title="Expand to gallery"
                >
                  <Maximize2 size={15} />
                </button>

                {/* Frosted Glass Overlay (Matches Monet Reference UI) */}
                <div className="cflow-card-overlay">
                  <div className="cflow-card-overlay-header">
                    <h3 className="cflow-card-title">{item.title}</h3>
                    <span className="cflow-card-year">{item.year || item.tag || '1918'}</span>
                  </div>

                  <div className="cflow-card-author">{item.subtitle || item.author}</div>

                  <p className="cflow-card-desc">{item.desc || item.description}</p>

                  {/* Mobile Tap to View Hint (Hidden on Desktop) */}
                  <div className="cflow-card-tap-hint">
                    <span>{isSomali ? 'Taabo si aad u weynayso' : 'Tap to expand full photo'}</span>
                    <ZoomIn size={13} />
                  </div>

                  <div className="cflow-card-actions-row">
                    <button
                      type="button"
                      className="cflow-card-zoom-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(idx);
                      }}
                      aria-label="View photo in gallery modal"
                    >
                      <ZoomIn size={13} />
                      <span>{isSomali ? 'Ku Arag Shaashadda' : 'View Full Photo'}</span>
                    </button>

                    {item.link && isCenter && (
                      <Link
                        to={localizedPath(item.link)}
                        className="cflow-card-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{isSomali ? 'Deegaanka' : 'Explore'}</span>
                        <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controller Pill Capsule (Claude Monet Style) */}
      <div className="cflow-controller-wrap">
        <div className="cflow-controller-capsule" role="region" aria-label="Gallery Carousel Controller">
          {/* Previous Slide Button */}
          <button
            type="button"
            className="cflow-ctrl-btn"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Center Info: Round Portrait + Author / Region Meta */}
          <div
            className="cflow-ctrl-meta"
            onClick={() => openLightbox(activeIndex)}
            role="button"
            tabIndex={0}
            title="Click to view full photo"
          >
            <img
              src={activeItem.avatar || activeItem.image}
              alt={activeItem.author || activeItem.title}
              className="cflow-ctrl-avatar"
            />
            <div className="cflow-ctrl-text">
              <span className="cflow-ctrl-name">{activeItem.author || activeItem.title}</span>
              <span className="cflow-ctrl-sub">
                {activeItem.authorMeta || activeItem.subtitle || 'Somali Coastal Sanctuary'}
              </span>
            </div>
          </div>

          {/* Next Slide Button */}
          <button
            type="button"
            className="cflow-ctrl-btn"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Click Image to View in Gallery) */}
      {lightboxIndex !== null && lightboxItem && (
        <div
          className="cflow-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo Gallery: ${lightboxItem.title}`}
        >
          {/* Top Header Bar */}
          <div className="cflow-lightbox-top" onClick={(e) => e.stopPropagation()}>
            <div className="cflow-lightbox-counter">
              <span>{lightboxIndex + 1} / {galleryItems.length}</span>
              <span className="cflow-lightbox-tag-pill">{lightboxItem.tag || lightboxItem.year || 'SANCTUARY'}</span>
            </div>

            <div className="cflow-lightbox-top-actions">
              <button
                type="button"
                className={`cflow-lightbox-action-btn ${isLiked ? 'cflow-lightbox-action-btn--liked' : ''}`}
                onClick={handleToggleLike}
                aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
                title={`${likeCount} Likes`}
              >
                <Heart size={18} fill={isLiked ? '#f43f5e' : 'none'} color={isLiked ? '#f43f5e' : '#ffffff'} />
              </button>

              <button
                type="button"
                className="cflow-lightbox-action-btn"
                onClick={handleShare}
                aria-label="Share photo"
                title={copied ? 'Link Copied!' : 'Share'}
              >
                <Share2 size={18} color="#ffffff" />
              </button>

              <button
                type="button"
                className="cflow-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo preview"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Center Stage with Image & Navigation Chevrons */}
          <div
            className="cflow-lightbox-body"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Previous Chevron */}
            <button
              type="button"
              className="cflow-lightbox-nav-btn cflow-lightbox-nav-btn--prev"
              onClick={handleLightboxPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Main Photo View */}
            <div className="cflow-lightbox-media-wrap">
              <img
                key={lightboxItem.image}
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="cflow-lightbox-img"
              />
            </div>

            {/* Next Chevron */}
            <button
              type="button"
              className="cflow-lightbox-nav-btn cflow-lightbox-nav-btn--next"
              onClick={handleLightboxNext}
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          </div>

          {/* Bottom Frosted Glass Caption Box */}
          <div className="cflow-lightbox-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="cflow-lightbox-caption-card">
              <div className="cflow-lightbox-caption-header">
                <h3 className="cflow-lightbox-caption-title">{lightboxItem.title}</h3>
                <span className="cflow-lightbox-caption-year">{lightboxItem.year || lightboxItem.tag}</span>
              </div>
              <div className="cflow-lightbox-caption-sub">
                {lightboxItem.subtitle || lightboxItem.authorMeta}
              </div>
              <p className="cflow-lightbox-caption-desc">
                {lightboxItem.desc || lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
