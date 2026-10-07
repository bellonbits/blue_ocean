import { motion } from 'framer-motion';
import { Waves, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function AboutHero() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-hero" aria-label="About Blue Ocean">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/MOGADISHUBEACH%20LEDE.jpg"
          alt="Mogadishu's coast, home to Blue Ocean's headquarters"
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
          <Waves size={14} />
          <span>{t('about.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('about.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('about.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('about.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#our-story" className="exp-hero__btn-primary">
            <span>{t('about.hero.ctaStory')}</span>
            <ArrowRight size={18} />
          </a>
          <a href={localizedPath('/contact')} className="exp-hero__btn-secondary">
            <span>{t('about.hero.ctaContact')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
