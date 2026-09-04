import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, ArrowRight, Heart, Sparkles, Waves, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { getSpeciesStatusInfo } from '../../data/marineLife';
import './SpeciesCard.css';

// Re-exported for backward compatibility with any remaining callers.
export const getStatusInfo = getSpeciesStatusInfo;

export default function SpeciesCard({ species, priority = false }) {
  const { isAuthenticated, isSaved, toggleSaved, openAuthModal } = useAuth();
  const { language, t } = useLanguage();
  const liked = isSaved('species', species.slug);
  const statusInfo = getSpeciesStatusInfo(species.conservationStatus, language);

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
                if (!isAuthenticated) {
                  openAuthModal('login');
                  return;
                }
                toggleSaved('species', species.slug);
              }}
              aria-label={liked ? 'Remove species from Saved' : 'Save species'}
            >
              <Heart size={14} fill={liked ? '#02CCFE' : 'none'} color={liked ? '#02CCFE' : '#FFFFFF'} />
            </button>
          </div>

          {/* Top-Left Floating Specs */}
          <div className="species-card__specs-row">
            <div className="species-card__spec-chip">
              <Layers size={11} />
              <span>{species.group || t('marineLife.card.genericTaxa')}</span>
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
              <span>{t('marineLife.card.viewCta')}</span>
              <ArrowRight size={14} className="species-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
