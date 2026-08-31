import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import './ExperienceHero.css';

export default function ExperienceHero({ experience }) {
  return (
    <section className="exp-detail-hero" aria-label={`${experience.title} Experience`}>
      <div className="exp-detail-hero__media" aria-hidden="true">
        <img src={experience.heroImage} alt={experience.title} className="exp-detail-hero__img" />
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
          <Link to="/experiences" className="exp-detail-hero__crumb-link">Ocean Experiences</Link>
          <span className="exp-detail-hero__crumb-sep">/</span>
          <span className="exp-detail-hero__crumb-current">{experience.title}</span>
        </motion.div>

        <motion.div
          className="exp-detail-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="exp-detail-hero__group-badge">
            <Layers size={13} />
            <span>{experience.categoryName}</span>
          </span>

          {experience.status === 'coming-soon' && (
            <span className="badge badge-coming-soon exp-detail-hero__status-badge">
              <Sparkles size={13} />
              <span>Coming Soon</span>
            </span>
          )}
        </motion.div>

        <motion.h1
          className="exp-detail-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {experience.title}
        </motion.h1>

        <motion.p
          className="exp-detail-hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {experience.tagline}
        </motion.p>
      </div>
    </section>
  );
}
