import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Layers, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../experiences/ExperienceHero.css';

const STATUS_COLORS = {
  Planned: { bg: 'rgba(148, 163, 184, 0.15)', text: '#CBD5E1', border: 'rgba(148, 163, 184, 0.4)' },
  Active: { bg: 'rgba(34, 197, 94, 0.15)', text: '#86EFAC', border: 'rgba(34, 197, 94, 0.4)' },
  Completed: { bg: 'rgba(2, 204, 254, 0.15)', text: '#7DD3FC', border: 'rgba(2, 204, 254, 0.4)' },
  Published: { bg: 'rgba(168, 85, 247, 0.15)', text: '#D8B4FE', border: 'rgba(168, 85, 247, 0.4)' },
};

export default function ResearchProjectHero({ project }) {
  const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.Active;
  const { isAuthenticated, isSaved, toggleSaved, openAuthModal } = useAuth();
  const liked = isSaved('research', project.slug);

  const handleSave = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    toggleSaved('research', project.slug);
  };

  return (
    <section className="exp-detail-hero" aria-label={`${project.title} Research Project`}>
      <div className="exp-detail-hero__media" aria-hidden="true">
        <img src={project.heroImage} alt={project.title} className="exp-detail-hero__img" />
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
          <Link to="/research/projects" className="exp-detail-hero__crumb-link">Research Projects</Link>
          <span className="exp-detail-hero__crumb-sep">/</span>
          <span className="exp-detail-hero__crumb-current">{project.title}</span>
        </motion.div>

        <motion.div
          className="exp-detail-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="exp-detail-hero__group-badge">
            <Layers size={13} />
            <span>{project.areaName}</span>
          </span>

          <span
            className="exp-detail-hero__status-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: 'var(--radius-full)',
              background: statusColor.bg,
              color: statusColor.text,
              border: `1px solid ${statusColor.border}`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Activity size={13} />
            <span>{project.status}</span>
          </span>

          <button
            type="button"
            className={`exp-detail-hero__save-btn ${liked ? 'exp-detail-hero__save-btn--active' : ''}`}
            onClick={handleSave}
            aria-label={liked ? 'Remove research project from Saved' : 'Save research project'}
          >
            <Heart size={13} fill={liked ? '#EF4444' : 'none'} />
            <span>{liked ? 'Saved' : 'Save'}</span>
          </button>
        </motion.div>

        <motion.h1
          className="exp-detail-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="exp-detail-hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.region} · Somalia
        </motion.p>
      </div>
    </section>
  );
}
