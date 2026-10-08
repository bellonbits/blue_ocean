import { ArrowRight, Compass, Mail, Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function EditorialCTA() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section className="editorial-cta" aria-label="Begin Your Expedition">
      {/* Background Image with Dark Navy Editorial Overlay */}
      <div className="editorial-cta__bg-wrap">
        <img
          src="/images/image.png"
          alt="Somali coast horizon"
          className="editorial-cta__bg"
          loading="lazy"
        />
        <div className="editorial-cta__overlay" />
      </div>

      <div className="editorial-cta__content">
        <div className="editorial-cta__badge">
          <Compass size={14} className="editorial-cta__badge-icon" />
          <span>{isSomali ? 'SAFARKAAGA BILOW' : 'AN EXPEDITION AWAITS'}</span>
        </div>

        <h2 className="editorial-cta__title">
          {isSomali ? (
            <>
              Sahmi waxa ka dambeeya <br />
              <span className="editorial-italic">aragtida cirka iyo badda.</span>
            </>
          ) : (
            <>
              Explore what lies <br />
              <span className="editorial-italic">beyond the horizon.</span>
            </>
          )}
        </h2>

        <p className="editorial-cta__desc">
          {isSomali
            ? 'Haddii aad doonayso safar cilmi-baaris, quusidda reef-ka aan la taaban, ama taageeridda ilaalinta noolaha badda—safarkaaga Somalia Blue Heaven halkan buu ka bilaabmayaa.'
            : 'Whether joining a scientific marine survey, diving untouched coral atolls, or partnering on coastal conservation stewardship—your journey with Somalia Blue Heaven begins here.'}
        </p>

        <div className="editorial-cta__actions">
          <Link
            to={localizedPath('/explore-the-coast')}
            className="editorial-cta__btn-primary"
          >
            <span>{isSomali ? 'Bilow Safarkaaga' : 'Begin Your Journey'}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to={localizedPath('/contact')}
            className="editorial-cta__btn-secondary"
          >
            <Mail size={16} />
            <span>{isSomali ? 'La Xiriir Kooxda Safarka' : 'Contact Expedition Team'}</span>
          </Link>
        </div>

        <div className="editorial-cta__footer-note">
          <span className="editorial-cta__dot" />
          <span>
            {isSomali
              ? '3,330 KM oo Xeeb ah · Dalxiis Mas’uuliyad Leh · Cilmi-Baaris & Dhowrid'
              : "3,330 KM of Coastline · Responsible Expeditions · Scientific Stewardship"}
          </span>
        </div>
      </div>
    </section>
  );
}
