import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { getAllCommunities, getAllCommunityStories } from '../../data/communities';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperiencesHero.css';

export default function CommunitiesHero() {
  const { language, t } = useLanguage();
  const communityCount = getAllCommunities(language).length;
  const storyCount = getAllCommunityStories(language).length;

  return (
    <section className="exp-hero" aria-label="Blue Ocean Coastal Communities">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/con_beach_cleanup.jpg"
          alt="A coastal community taking part in a beach cleanup"
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
          <Users size={14} />
          <span>{t('communities.hero.badge')}</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('communities.hero.heading')} <br />
          <span className="exp-hero__title-accent">{t('communities.hero.headingAccent')}</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('communities.hero.subtext')}
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#community-stories" className="exp-hero__btn-primary">
            <span>{t('communities.hero.ctaPrimary')}</span>
            <ArrowRight size={18} />
          </a>
          <a href="/get-involved" className="exp-hero__btn-secondary">
            <span>{t('communities.hero.ctaSecondary')}</span>
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
            <span>{t('communities.hero.pillCommunities', communityCount)}</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{t('communities.hero.pillStories', storyCount)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
