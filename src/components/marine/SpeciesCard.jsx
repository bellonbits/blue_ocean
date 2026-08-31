import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, ArrowRight, Heart, Sparkles, Waves, Layers } from 'lucide-react';
import './SpeciesCard.css';

// Status badge color and label helper
export function getStatusInfo(status) {
  switch (status?.toLowerCase()) {
    case 'critically endangered':
      return { label: 'Critically Endangered', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#FCA5A5' };
    case 'endangered':
      return { label: 'Endangered', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)', text: '#FDBA74' };
    case 'vulnerable':
      return { label: 'Vulnerable', bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)', text: '#FDE047' };
    case 'near threatened':
      return { label: 'Near Threatened', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', text: '#93C5FD' };
    case 'least concern':
    default:
      return { label: status || 'Least Concern', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#6EE7B7' };
  }
}

export default function SpeciesCard({ species, priority = false }) {
  const [liked, setLiked] = useState(false);
  const statusInfo = getStatusInfo(species.conservationStatus);

  return (
    <article className="species-card">
      <Link to={`/marine-life/species/${species.slug}`} className="species-card__link" aria-label={`Explore ${species.commonName}`}>
        {/* Card Photo */}
        <div className="species-card__media-wrap">
          <img
            src={species.heroImage}
            alt={species.commonName}
            className="species-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="species-card__gradient" />

          {/* Top badges */}
          <div className="species-card__top-bar">
            <span
              className="species-card__status-badge"
              style={{
                background: statusInfo.bg,
                borderColor: statusInfo.border,
                color: statusInfo.text,
              }}
            >
              <Shield size={11} />
              <span>{statusInfo.label}</span>
            </span>

            <button
              type="button"
              className={`species-card__fav-btn ${liked ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLiked(!liked);
              }}
              aria-label="Save species to field guide"
            >
              <Heart size={14} fill={liked ? '#02CCFE' : 'none'} color={liked ? '#02CCFE' : '#FFFFFF'} />
            </button>
          </div>

          {/* Top-Left Floating Specs */}
          <div className="species-card__specs-row">
            <div className="species-card__spec-chip">
              <Layers size={11} />
              <span>{species.group || 'Marine Taxa'}</span>
            </div>
            {species.habitat && (
              <div className="species-card__spec-chip">
                <Waves size={11} />
                <span>{species.habitat}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="species-card__body">
          <div className="species-card__header-block">
            {species.somaliName && (
              <span className="species-card__somali-name">{species.somaliName}</span>
            )}
            <h3 className="species-card__title">{species.commonName}</h3>
            <p className="species-card__scientific">{species.scientificName}</p>
          </div>

          <p className="species-card__desc">
            {species.description}
          </p>

          {/* Footer Action */}
          <div className="species-card__footer">
            <div className="species-card__dest-pills">
              {species.destinations?.slice(0, 2).map((d) => (
                <span key={d.slug} className="species-card__dest-tag">
                  <MapPin size={10} />
                  {d.name}
                </span>
              ))}
            </div>

            <span className="species-card__cta">
              <span>Field Profile</span>
              <ArrowRight size={14} className="species-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
