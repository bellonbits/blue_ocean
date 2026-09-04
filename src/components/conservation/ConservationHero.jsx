import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { getConservationImpact } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function ConservationHero() {
  const impact = getConservationImpact();
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-hero" aria-label="Blue Ocean Conservation">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/marine_turtles.jpg"
          alt="A green sea turtle swimming over a Somali reef"
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
          <Shield size={14} />
          <span>{t('conservation.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('conservation.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('conservation.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('conservation.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#conservation-focus" className="exp-hero__btn-primary">
            <span>{t('conservation.hero.ctaExplore')}</span>
            <ArrowRight size={18} />
          </a>
          <a href={localizedPath('/get-involved')} className="exp-hero__btn-secondary">
            <span>{t('conservation.hero.ctaGetInvolved')}</span>
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
            <span>{impact.totalProjects} {t('conservation.hero.pillProjects')}</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{impact.focusAreas} {t('conservation.hero.pillAreas')}</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{impact.locations} {t('conservation.hero.pillLocations')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
