import { ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaHero({ onLetsGo }) {
  const { language } = useLanguage();
  const isSomali = language === 'so';

  return (
    <section className="raja-hero" aria-label="Somalia Blue Heaven Coastline Hero">
      {/* Background Photography: Authentic Somalia Coastline */}
      <img
        src="/images/image.webp"
        alt="Somalia coastline where dramatic limestone mountain ridges meet turquoise waters of the Gulf of Aden"
        className="raja-hero__bg"
        loading="eager"
      />

      <div className="raja-hero__overlay" />

      {/* Graceful 3D Looping Light Ribbon Vector */}
      <svg
        className="raja-hero__ribbon-svg"
        viewBox="0 0 1200 640"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
          </linearGradient>
        </defs>
        <path
          className="raja-hero__ribbon-path"
          d="M -50,560 C 220,580 380,550 460,490 C 540,420 570,330 490,320 C 410,310 370,410 440,510 C 530,620 900,520 1250,220"
          stroke="url(#ribbonGrad)"
        />
      </svg>

      {/* Grand Serif Display Headline */}
      <div className="raja-hero__title-wrap">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#e0f2fe',
            marginBottom: 8,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          <Compass size={14} color="#38bdf8" />
          <span>{isSomali ? 'Xeebaha Soomaaliya • 3,330 KM' : "Somalia's Coastline • 3,330 KM"}</span>
        </span>
        <h1 className="raja-hero__title">
          Blue <span>heaven</span>
        </h1>
      </div>

      {/* Right-Aligned Editorial Subtitle Block */}
      <div className="raja-hero__desc-box">
        <p className="raja-hero__desc-text">
          {isSomali
            ? 'Sahami mucjisooyinka badda iyo quruxda dabiiciga ah ee xeebaha Soomaaliya (3,330 km). Ku raaxayso safar dabiici ah oo aan la iloobi karin oo ku teedsan Badweynta Hindiya iyo Gacanka Cadmeed.'
            : "Discover the incomparable marine wonders and natural beauty of Somalia's 3,330 km coastline. Enjoy an unforgettable ocean journey across the Indian Ocean and Gulf of Aden."}
        </p>
        <button
          type="button"
          className="raja-hero__lets-go-btn"
          onClick={onLetsGo}
        >
          <span>{isSomali ? 'Sahami Xeebaha' : 'Explore Coast'}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
