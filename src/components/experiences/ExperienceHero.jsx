import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listExperienceInterests, setExperienceInterest, deleteExperienceInterest } from '../../lib/dashboardApi';
import './ExperienceHero.css';

const INTEREST_OPTIONS = [
  { value: 'interested', label: 'Interested' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
];

export default function ExperienceHero({ experience }) {
  const { isAuthenticated, token, isSaved, toggleSaved, openAuthModal } = useAuth();
  const liked = isSaved('experience', experience.slug);
  const [interest, setInterest] = useState(null);

  useEffect(() => {
    if (!token) {
      setInterest(null);
      return;
    }
    listExperienceInterests(token)
      .then((rows) => {
        setInterest(rows.find((r) => r.experience_slug === experience.slug) || null);
      })
      .catch(() => {});
  }, [token, experience.slug]);

  const handleSave = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    toggleSaved('experience', experience.slug);
  };

  const handleTrack = async (status) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (interest?.status === status) {
      setInterest(null);
      await deleteExperienceInterest(token, interest.id).catch(() => {});
      return;
    }
    const saved = await setExperienceInterest(token, experience.slug, status).catch(() => null);
    if (saved) setInterest(saved);
  };

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

          <button
            type="button"
            className={`exp-detail-hero__save-btn ${liked ? 'exp-detail-hero__save-btn--active' : ''}`}
            onClick={handleSave}
            aria-label={liked ? 'Remove experience from Saved' : 'Save experience'}
          >
            <Heart size={13} fill={liked ? '#EF4444' : 'none'} />
            <span>{liked ? 'Saved' : 'Save'}</span>
          </button>
        </motion.div>

        <motion.div
          className="exp-detail-hero__track"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="exp-detail-hero__track-label">Track my interest:</span>
          {INTEREST_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`exp-detail-hero__track-btn ${interest?.status === value ? 'exp-detail-hero__track-btn--active' : ''}`}
              onClick={() => handleTrack(value)}
            >
              {label}
            </button>
          ))}
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
