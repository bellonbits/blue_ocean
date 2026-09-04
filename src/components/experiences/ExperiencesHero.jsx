import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { getExperienceStats } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';
import './ExperiencesHero.css';

export default function ExperiencesHero() {
  const stats = getExperienceStats();
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-hero" aria-label="Ocean Experiences">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/exp_dhow_sailing.jpg"
          alt="Traditional dhow sailing off Somalia's coast"
          className="exp-hero__img"
          loading="eager"
          fetchpriority="high"
        />
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
          <span>OCEAN EXPEDITIONS & ACTIVITIES</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('oceanExperiences.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('oceanExperiences.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('oceanExperiences.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#experiences-grid" className="exp-hero__btn-primary">
            <span>{t('oceanExperiences.hero.ctaPrimary')}</span>
            <ArrowRight size={18} />
          </a>
          <Link to={localizedPath('/explore-the-coast')} className="exp-hero__btn-secondary">
            <span>{t('oceanExperiences.hero.ctaSecondary')}</span>
          </Link>
        </motion.div>

        <motion.div
          className="exp-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="exp-hero__pill">
            <Sparkles size={13} className="exp-hero__pill-icon" />
            <span>{stats.totalExperiences} Experiences in Development</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.categoriesCount} Activity Categories</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.regionsCovered} Somali Regions</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
