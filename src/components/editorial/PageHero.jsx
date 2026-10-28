import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './PageHero.css';

export default function PageHero({
  pageId = 'portal',
  image,
  title,
  titleTop,
  titleHighlight,
  titleBottom,
  titleItalic,
  desc,
  primaryCta,
  cutout,
  spots = [],
  backLink,
}) {
  const { language } = useLanguage();
  const isSomali = language === 'so';

  const localizedPath = (path) => {
    if (!path || typeof path !== 'string') return `/${language}`;
    const clean = path.trim();
    if (!clean) return `/${language}`;
    if (clean.startsWith('#') || clean.startsWith('http')) return clean;
    return `/${language}${clean.startsWith('/') ? clean : `/${clean}`}`;
  };

  // Determine the ONE single hero image that explains this page
  const heroImage = image || (spots && spots[0]?.image) || '/images/image.webp';

  // Primary Action Button (supports { label, path } and { text, href })
  const ctaLabel = primaryCta?.label || primaryCta?.text || (isSomali ? 'Sahami Hada' : 'Explore Now');
  const ctaPath = localizedPath(primaryCta?.path || primaryCta?.href || '#');

  // Title rendering matching reference "Discover New [Destinations] With Every Flight"
  const topText = titleTop || title || (isSomali ? 'Sahami Quruxda' : 'Discover Pristine');
  const highlightText = titleHighlight || titleItalic;
  const bottomText = titleBottom || '';

  // Inset Cutout Card content & thumbnails
  const cutoutTitle = cutout?.title || (isSomali ? 'Kala Soco Xogaha Xeebta' : "Explore Today's Expeditions");
  const cutoutPath = localizedPath(cutout?.path || primaryCta?.path || primaryCta?.href || '#');
  const cutoutInfo = cutout?.info || (isSomali
    ? 'Hubi xaaladda cimilada, doonyaha, iyo hagayaasha maxalliga ah ee ku habboon safarkaaga.'
    : 'Check Real-Time Ocean Weather, Local Guides, And Corridors To Find The Best Option For Your Journey.');

  // 3 Thumbnails for the inset subcard
  const cutoutThumbs = cutout?.thumbnails || (spots && spots.length >= 3
    ? [spots[0]?.image, spots[1]?.image, spots[2]?.image]
    : [
        heroImage,
        '/images/img_07.webp',
        '/images/img_01.webp',
      ]);

  const rating = cutout?.rating || '4.9';
  const ratingTagline = cutout?.tagline || (isSomali ? 'In ka badan 500+ safar oo lagu guulaystay' : 'Trusted by over 500+ happy travelers!');

  const defaultFaces = [
    '/images/img_01.webp',
    '/images/img_07.webp',
    '/images/img_11.webp',
    '/images/img_10.webp',
  ];

  const handleNavClick = (e, path) => {
    if (!path) return;
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', path);
      }
    }
  };

  return (
    <section className="modern-hero-canvas" aria-label={topText || 'Hero Section'}>
      <div className="modern-hero-wrapper">
        <div className="modern-hero-banner">
          {/* 1. ONE SINGLE HIGH-DEFINITION HERO IMAGE */}
          <img
            src={heroImage}
            alt={topText}
            className="modern-hero-bg"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          {/* Directional Gradient Overlay for 100% Left Text Legibility */}
          <div className="modern-hero-overlay" aria-hidden="true" />

          {/* 2. LEFT HERO CONTENT (Matching reference typography & button) */}
          <div className="modern-hero-left">
            {backLink && (
              <Link
                to={localizedPath(backLink.path || backLink.href || '/explore-the-coast')}
                className="modern-hero-backlink"
              >
                <ArrowLeft size={13} />
                <span>{backLink.label || backLink.text || (isSomali ? 'Ku Noqo' : 'Back')}</span>
              </Link>
            )}

            <h1 className="modern-hero-title">
              {topText}
              {highlightText && (
                <>
                  <br />
                  <span className="modern-hero-title-highlight">
                    {highlightText}
                  </span>
                </>
              )}
              {bottomText && (
                <>
                  {' '}
                  {bottomText}
                </>
              )}
            </h1>

            {desc && (
              <p className="modern-hero-desc">
                {desc}
              </p>
            )}

            {/* Solid Blue Pill Button matching reference "Search Flights" */}
            <Link
              to={ctaPath}
              onClick={(e) => handleNavClick(e, ctaPath)}
              className="modern-hero-cta-btn"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* 3. BOTTOM-RIGHT INSET WHITE SCOOP CUTOUT */}
          <div className="modern-hero-cutout">
            {/* Concave Corner Scoop - Top Right */}
            <svg
              className="modern-hero-scoop-top"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <path d="M0,36 A36,36 0 0,0 36,0 L36,36 Z" fill="#ffffff" />
            </svg>

            {/* Concave Corner Scoop - Bottom Left */}
            <svg
              className="modern-hero-scoop-left"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <path d="M36,0 A36,36 0 0,0 0,36 L36,36 Z" fill="#ffffff" />
            </svg>

            {/* Row 1: Header Link with Arrow */}
            <Link
              to={cutoutPath}
              onClick={(e) => handleNavClick(e, cutoutPath)}
              className="modern-cutout-header"
            >
              <span className="modern-cutout-header-title">{cutoutTitle}</span>
              <ArrowRight size={17} className="modern-cutout-arrow" />
            </Link>

            {/* Row 2: Inset Subcard with 3 Circular Thumbnails & Description */}
            <Link
              to={cutoutPath}
              onClick={(e) => handleNavClick(e, cutoutPath)}
              className="modern-cutout-subcard"
              title={cutoutTitle}
            >
              <div className="modern-cutout-avatars" aria-hidden="true">
                {cutoutThumbs.slice(0, 3).map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    alt=""
                    className="modern-cutout-avatar"
                  />
                ))}
              </div>
              <p className="modern-cutout-subtext">
                {cutoutInfo}
              </p>
            </Link>

            {/* Row 3: Social Proof & Rating Badge */}
            <Link
              to={localizedPath('/about')}
              className="modern-cutout-proof"
              title={ratingTagline}
            >
              <div className="modern-cutout-proof-left">
                <div className="modern-cutout-faces" aria-hidden="true">
                  {defaultFaces.slice(0, 4).map((face, idx) => (
                    <img
                      key={idx}
                      src={face}
                      alt=""
                      className="modern-cutout-face"
                    />
                  ))}
                </div>
                <span className="modern-cutout-rating">
                  {rating} <span className="modern-cutout-star">★</span>
                </span>
              </div>
              <span className="modern-cutout-tagline">{ratingTagline}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
