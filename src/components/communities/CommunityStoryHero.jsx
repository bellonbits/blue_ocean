import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { getCommunityCategoryInfo } from '../../data/communities';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceHero.css';

export default function CommunityStoryHero({ story }) {
  const { language } = useLanguage();
  const categoryInfo = getCommunityCategoryInfo(story.category, language);

  return (
    <section className="exp-detail-hero" aria-label={story.title}>
      <div className="exp-detail-hero__media" aria-hidden="true">
        <img src={story.featuredImage} alt={story.title} className="exp-detail-hero__img" />
        <div className="exp-detail-hero__overlay" />
        <div className="exp-detail-hero__gradient" />
      </div>

      <div className="container exp-detail-hero__content">
        <motion.div
          className="exp-detail-hero__breadcrumb"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/communities" className="exp-detail-hero__crumb-link">Coastal Communities</Link>
          <span className="exp-detail-hero__crumb-sep">/</span>
          <span className="exp-detail-hero__crumb-current">{story.title}</span>
        </motion.div>

        <motion.div
          className="exp-detail-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="exp-detail-hero__group-badge">
            <Users size={13} />
            <span>{categoryInfo?.label || 'Community Story'}</span>
          </span>
        </motion.div>

        <motion.h1
          className="exp-detail-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {story.title}
        </motion.h1>

        <motion.p
          className="exp-detail-hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {story.location} · {story.region}
        </motion.p>
      </div>
    </section>
  );
}
