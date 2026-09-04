import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function TourismHero() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-hero" aria-label="Tourism — Blue Ocean Somalia">
      <div className="exp-hero__media" aria-hidden="true">
        <img src="/somalia_coast.jpg" alt="Somalia's coastline meeting the Indian Ocean" className="exp-hero__img" />
        <div className="exp-hero__overlay" />
        <div className="exp-hero__gradient" />
      </div>

      <div className="container exp-hero__content">
        <motion.div
          className="exp-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Compass size={14} />
          <span>{t('tourism.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('tourism.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('tourism.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('tourism.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href={localizedPath('/explore-the-coast')} className="exp-hero__btn-primary">
            <span>{t('tourism.hero.ctaExploreCoast')}</span>
            <ArrowRight size={18} />
          </a>
          <a href="#tourism-experiences" className="exp-hero__btn-secondary">
            <span>{t('tourism.hero.ctaDiscoverExperiences')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
