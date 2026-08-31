import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import '../experiences/ExperienceHero.css';

export default function ArticleHero({ article }) {
  return (
    <section className="exp-detail-hero" aria-label={article.title}>
      <div className="exp-detail-hero__media" aria-hidden="true">
        <img src={article.featuredImage} alt={article.title} className="exp-detail-hero__img" />
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
          <Link to="/news" className="exp-detail-hero__crumb-link">News</Link>
          <span className="exp-detail-hero__crumb-sep">/</span>
          <span className="exp-detail-hero__crumb-current">{article.title}</span>
        </motion.div>

        <motion.div
          className="exp-detail-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className={`badge ${article.categoryBadgeClass}`}>{article.categoryLabel}</span>
        </motion.div>

        <motion.h1
          className="exp-detail-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {article.title}
        </motion.h1>

        <motion.p
          className="exp-detail-hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            {article.displayDate}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} />
            By {article.author}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
