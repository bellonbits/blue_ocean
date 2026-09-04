import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './CoastHero.css';

export default function CoastHero() {
  const { t } = useLanguage();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="coast-hero" aria-label="Explore Somalia's Coast">
      {/* Background Image with dark ocean gradient */}
      <div className="coast-hero__bg">
        <img
          src="/mogadishu_beach.jpg"
          alt="Scenic landscape of Somalia's coastline"
          className="coast-hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="coast-hero__overlay" aria-hidden="true" />
      </div>

      <div className="container coast-hero__container">
        <div className="coast-hero__content">
          <motion.div
            className="coast-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Compass size={14} className="coast-hero__badge-icon" />
            <span>{t('exploreCoast.hero.badge')}</span>
          </motion.div>

          <motion.h1
            className="coast-hero__title display-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t('exploreCoast.hero.heading')}
            <br />
            <span className="coast-hero__title-accent">{t('exploreCoast.hero.headingAccent')}</span>
          </motion.h1>

          <motion.p
            className="coast-hero__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('exploreCoast.hero.subtext')}
          </motion.p>

          <motion.div
            className="coast-hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button
              onClick={() => scrollToSection('destinations-grid')}
              className="btn btn-primary btn-lg"
              id="cta-explore-destinations"
            >
              {t('exploreCoast.hero.ctaExploreDestinations')}
              <ArrowDown size={18} />
            </button>
            <button
              onClick={() => scrollToSection('coast-map')}
              className="btn btn-outline btn-lg"
              id="cta-view-map"
            >
              <MapPin size={18} />
              {t('exploreCoast.hero.ctaViewMap')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

