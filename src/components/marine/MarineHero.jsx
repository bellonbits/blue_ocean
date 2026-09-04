import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, Fish, Shield, Waves } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './MarineHero.css';

export default function MarineHero() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="marine-hero" aria-label="Marine Life of Somalia">
      {/* Background Visual */}
      <div className="marine-hero__media" aria-hidden="true">
        <img
          src="/marine_dolphins.jpg"
          alt="Dolphins in Somalia's coastal waters"
          className="marine-hero__img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="marine-hero__overlay" />
        <div className="marine-hero__gradient" />
      </div>

      <div className="container marine-hero__content">
        {/* Badge */}
        <motion.div
          className="marine-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Waves size={14} className="marine-hero__badge-icon" />
          <span>FIELD GUIDE & SPECIES KNOWLEDGE BASE</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="marine-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('marineLife.hero.heading')} <br />
          <span className="marine-hero__title-accent">{t('marineLife.hero.headingAccent')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="marine-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('marineLife.hero.subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="marine-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link to={localizedPath('/marine-life/species')} className="marine-hero__btn-primary">
            <span>{t('marineLife.hero.ctaPrimary')}</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#ecosystems-section" className="marine-hero__btn-secondary">
            <span>{t('marineLife.hero.ctaSecondary')}</span>
          </a>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          className="marine-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>500+ Documented Taxa</span>
          </div>
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>08 Classification Groups</span>
          </div>
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>Verified IUCN Red List Data</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
