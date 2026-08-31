import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Layers } from 'lucide-react';
import '../experiences/ExperienceHero.css';

const STATUS_COLORS = {
  Planned: { bg: 'rgba(148, 163, 184, 0.15)', text: '#CBD5E1', border: 'rgba(148, 163, 184, 0.4)' },
  Active: { bg: 'rgba(34, 197, 94, 0.15)', text: '#86EFAC', border: 'rgba(34, 197, 94, 0.4)' },
  Completed: { bg: 'rgba(2, 204, 254, 0.15)', text: '#7DD3FC', border: 'rgba(2, 204, 254, 0.4)' },
  'Coming Soon': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FCD34D', border: 'rgba(245, 158, 11, 0.4)' },
};

export default function ConservationProjectHero({ project }) {
  const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.Active;

  return (
    <section className="exp-detail-hero" aria-label={`${project.title} Conservation Project`}>
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
          <Link to="/conservation/projects" className="exp-detail-hero__crumb-link">Conservation Projects</Link>
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
            <span>{project.focusAreaName}</span>
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
