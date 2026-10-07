import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaBestPrice() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';

  return (
    <section className="raja-best-price-section" aria-label={isSomali ? 'Ilaalinta Badda Soomaaliya' : "Preserving Somalia's Living Oceans"}>
      {/* Left Column: Heading and CTA */}
      <div className="raja-best-price__left">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#0284c7',
            marginBottom: 8,
          }}
        >
          <ShieldCheck size={16} />
          <span>{isSomali ? 'Ilaalinta Badda • Blue Ocean' : 'Ocean Conservation • Blue Ocean'}</span>
        </span>

        <h2 className="raja-best-price__heading">
          {isSomali ? (
            <>
              Ilaalinta &<br />
              Cilmi-baarista<br />
              Badda Soomaaliya
            </>
          ) : (
            <>
              Preserving<br />
              Somalia’s<br />
              Living Oceans
            </>
          )}
        </h2>

        <p
          style={{
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: '#64748b',
            maxWidth: 380,
            margin: '0 0 24px 0',
          }}
        >
          {isSomali
            ? '3,330 km oo xeeb dabiici ah, noocyo naadir ah oo baddeena ku nool, iyo taageeridda bulshooyinka xeebaha ee ku tiirsan kheyraadka badda.'
            : 'Protecting 3,330 km of pristine coastline, restoring coral habitats, and supporting local artisanal fishing communities through science.'}
        </p>

        <button
          type="button"
          className="raja-best-price__btn"
          onClick={() => navigate(`/${language}/conservation`)}
        >
          <span>{isSomali ? 'Baro Mashariicda' : 'Explore Conservation'}</span>
          <ArrowRight size={15} style={{ marginLeft: 6, display: 'inline' }} />
        </button>
      </div>

      {/* Right Column: Layered Multi-Plane Photo Composition */}
      <div className="raja-plane-stage">
        {/* Base Large Rounded Image: Authentic Somalia Coastline */}
        <div className="raja-plane-base">
          <img
            src="/images/image.png"
            alt="Somalia coastline and traditional wooden dhow"
            className="raja-plane-base__img"
            loading="lazy"
          />
        </div>

        {/* Sweeping 3D White Ribbon Line */}
        <svg
          className="raja-plane-ribbon"
          viewBox="0 0 700 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 20,280 C 150,220 280,260 380,310 C 480,360 620,280 720,200"
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="drop-shadow(0 4px 12px rgba(255, 255, 255, 0.4))"
          />
        </svg>

        {/* Top-Left Floating Card: Green Sea Turtle Conservation */}
        <div className="raja-plane-card-diver" title={isSomali ? 'Ilaalinta Qoolleyda Badda' : 'Green Sea Turtle Conservation'}>
          <img
            src="/images/img_10.png"
            alt="Endangered green sea turtle swimming over coral reef"
            className="raja-plane-card-diver__img"
            loading="lazy"
          />
        </div>

        {/* Bottom-Right Floating Card: Traditional Dhow Sailing */}
        <div className="raja-plane-card-jetski" title={isSomali ? 'Socdaalka Dhowka ee Xeebta' : 'Traditional Somali Dhow Navigation'}>
          <img
            src="/exp_dhow_sailing.jpg"
            alt="Traditional Somali dhow sailing across the turquoise sea"
            className="raja-plane-card-jetski__img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
