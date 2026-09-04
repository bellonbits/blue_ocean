import { motion } from 'framer-motion';
import { Newspaper, ArrowRight } from 'lucide-react';
import { getAllArticles } from '../../data/news';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function NewsHero() {
  const { language, t } = useLanguage();
  const count = getAllArticles(language).length;

  return (
    <section className="exp-hero" aria-label="Blue Ocean News & Discoveries">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/bargaal_main.jpg"
          alt="Coastal town along Somalia's northern shore"
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
          <Newspaper size={14} />
          <span>{t('news.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('news.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('news.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('news.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#news-categories" className="exp-hero__btn-primary">
            <span>{t('news.hero.ctaPrimary')}</span>
            <ArrowRight size={18} />
          </a>
          <a href="/news/articles" className="exp-hero__btn-secondary">
            <span>{t('news.hero.ctaSecondary')}</span>
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
            <span>{t('news.hero.pillPublished', count)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
