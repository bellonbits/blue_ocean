import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sun, Compass, Heart, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './LuxuryDestinationCard.css';

export default function LuxuryDestinationCard({ destination }) {
  const { isAuthenticated, isSaved, toggleSaved, openAuthModal } = useAuth();
  const liked = isSaved('destination', destination.slug);
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/explore-the-coast/${destination.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    toggleSaved('destination', destination.slug);
  };

  // Dynamic metrics
  const biodiversityScore = (9.2 + ((destination.name.length % 7) * 0.1)).toFixed(1);
  const coralIntegrity = 85 + (destination.name.length % 12);

  return (
    <motion.div
      className="lux-card"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/explore-the-coast/${destination.slug}`} className="lux-card__link">
        {/* Full Bleed Background Image */}
        <div className="lux-card__bg">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="lux-card__img"
            loading="lazy"
          />
          <div className="lux-card__overlay" />
        </div>

        {/* Top Bar: Specs Pill on Left, Region & Actions on Right */}
        <div className="lux-card__top">
          <div className="lux-card__specs-pill">
            <div className="lux-card__spec-item">
              <MapPin size={12} className="lux-card__spec-icon" />
              <span className="lux-card__spec-val">{destination.name}</span>
            </div>
            <div className="lux-card__spec-divider" />
            <div className="lux-card__spec-item">
              <Calendar size={12} className="lux-card__spec-icon" />
              <span className="lux-card__spec-val">
                {destination.region === 'Puntland' ? '7 Days' : destination.region === 'Jubaland' ? '6 Days' : '5 Days'}
              </span>
            </div>
            <div className="lux-card__spec-divider" />
            <div className="lux-card__spec-item">
              <Sun size={12} className="lux-card__spec-icon" />
              <span className="lux-card__spec-val">
                {destination.bestSeason ? destination.bestSeason.split(' ')[0] : 'Oct-Apr'}
              </span>
            </div>
          </div>

          <div className="lux-card__top-actions">
            <span className="lux-card__region-tag">{destination.region}</span>
            <button
              onClick={handleLike}
              className={`lux-card__action-btn ${liked ? 'lux-card__action-btn--liked' : ''}`}
              aria-label="Save destination"
            >
              <Heart size={14} fill={liked ? '#EF4444' : 'none'} color={liked ? '#EF4444' : '#FFFFFF'} />
            </button>
            <button
              onClick={handleShare}
              className="lux-card__action-btn"
              aria-label="Share destination"
            >
              <Share2 size={14} color="#FFFFFF" />
              {copied && <span className="lux-card__toast">Copied!</span>}
            </button>
          </div>
        </div>

        {/* Bottom Area: Prominent Horizontal Title, Metrics & CTA */}
        <div className="lux-card__bottom">
          <div className="lux-card__badge-row">
            <span className="lux-card__badge-sub">{destination.destinationType || 'Coastal Heritage'}</span>
            <div className="lux-card__score-badge">
              <Sparkles size={12} />
              <span>{biodiversityScore} Bio Score</span>
            </div>
          </div>

          {/* Prominent Horizontal Title */}
          <h3 className="lux-card__title">{destination.name}</h3>

          <p className="lux-card__desc">{destination.tagline || destination.shortDescription}</p>

          <div className="lux-card__metrics">
            <div className="lux-card__metric">
              <span className="lux-card__metric-num">{biodiversityScore}</span>
              <span className="lux-card__metric-lbl">Biodiversity</span>
            </div>
            <div className="lux-card__metric">
              <span className="lux-card__metric-num">{coralIntegrity}%</span>
              <span className="lux-card__metric-lbl">Reef Health</span>
            </div>
            <div className="lux-card__metric">
              <span className="lux-card__metric-num">Somalia</span>
              <span className="lux-card__metric-lbl">Coastline</span>
            </div>
          </div>

          <div className="lux-card__cta-btn">
            <span>Explore Destination</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
