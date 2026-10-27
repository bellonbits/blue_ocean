import { ArrowRight, Compass, Mail, Calendar, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function EditorialCTA() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section className="editorial-cta" aria-label="Begin Your Expedition">
      <div className="editorial-cta__content">
        <div className="editorial-cta__badge">
          <Compass size={14} className="editorial-cta__badge-icon" />
          <span>{isSomali ? 'SAFARKAAGA BILOW HADDABA' : 'AN EXPEDITION AWAITS'}</span>
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
            ? 'Haddii aad doonayso dabaasha shacaabka bikro ah, quusidda reef-ka, safar doon dhaqameed ah, ama sawir-qaadista xeebaha ugu quruxda badan Afrika — safarkaaga Somalia Blue Heaven halkan buu ka bilaabmayaa.'
            : 'Whether joining a guided coral snorkeling excursion, diving untouched drop-offs, booking a traditional dhow voyage, or planning a custom coastal media expedition — your journey begins here.'}
        </p>

        <div className="editorial-cta__actions">
          <Link
            to={localizedPath('/contact?booking=true')}
            className="editorial-cta__btn-primary"
            id="cta-plan-trip-btn"
          >
            <Calendar size={18} />
            <span>{isSomali ? 'Qorshee Safarkaaga (Book Tour)' : 'Plan Your Trip / Book Tour'}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to={localizedPath('/contact')}
            className="editorial-cta__btn-secondary"
            id="cta-contact-team-btn"
          >
            <Mail size={16} />
            <span>{isSomali ? 'La Xiriir Kooxda Safarka' : 'Contact Expedition Desk'}</span>
          </Link>
        </div>

        {/* Direct Contact & Trust Badges */}
        <div className="editorial-cta__contact-bar">
          <a href="tel:+252907790000" className="editorial-cta__contact-pill">
            <Phone size={14} className="editorial-cta__pill-icon" />
            <span>+252 90 779 0000 (Direct / WhatsApp)</span>
          </a>
          <span className="editorial-cta__contact-pill">
            <ShieldCheck size={14} className="editorial-cta__pill-icon" />
            <span>{isSomali ? 'Hagayaal Aqoonsan & Badbaado' : 'Licensed Local Skippers & Guides'}</span>
          </span>
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
