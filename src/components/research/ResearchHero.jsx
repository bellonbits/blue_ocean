import { motion } from 'framer-motion';
import { Microscope, ArrowRight } from 'lucide-react';
import { getResearchStats } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function ResearchHero() {
  const stats = getResearchStats();
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-hero" aria-label="Blue Ocean Research">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/marine_coral.jpg"
          alt="Coral reef ecosystem studied by Blue Ocean's research teams"
          className="exp-hero__img"
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
          <Microscope size={14} />
          <span>{t('research.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('research.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('research.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('research.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#research-areas" className="exp-hero__btn-primary">
            <span>{t('research.hero.ctaExplore')}</span>
            <ArrowRight size={18} />
          </a>
          <a href={localizedPath('/research/projects')} className="exp-hero__btn-secondary">
            <span>{t('research.hero.ctaProjects')}</span>
          </a>
        </motion.div>

        <motion.div
          className="exp-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.totalProjects} {t('research.hero.pillProjects')}</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.researchAreasCount} {t('research.hero.pillAreas')}</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.researchSites} {t('research.hero.pillSites')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
