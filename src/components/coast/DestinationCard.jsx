import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './DestinationCard.css';

export default function DestinationCard({ destination, index }) {
  const { t } = useLanguage();
  return (
    <article
      className={`dest-card reveal reveal-delay-${(index % 3) + 1}`}
      aria-label={destination.name}
    >
      {/* Large Image Header */}
      <div className="dest-card__image-container">
        <img
          src={destination.heroImage}
          alt={`${destination.name}, ${destination.region}`}
          className="dest-card__image"
          loading="lazy"
        />
        <div className="dest-card__image-overlay" aria-hidden="true" />
        
        <div className="dest-card__badges">
          <span className="dest-card__region-badge">
            <MapPin size={11} />
            {destination.region}
          </span>
          {destination.featured && (
            <span className="dest-card__featured-badge">{t('exploreCoast.card.featuredBadge')}</span>
          )}
        </div>

        <div className="dest-card__geo">
          <span>{destination.coastlineArea}</span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="dest-card__content">
        <div className="dest-card__meta">
          <span className="dest-card__type">{destination.destinationType}</span>
        </div>

        <h3 className="dest-card__name">
          <Link to={`/explore-the-coast/${destination.slug}`} className="dest-card__name-link">
            {destination.name}
          </Link>
        </h3>

        <p className="dest-card__desc">{destination.shortDescription}</p>

        <div className="dest-card__footer">
          <div className="dest-card__location">
            <Compass size={13} className="dest-card__loc-icon" />
            <span>{destination.location}</span>
          </div>

          <Link
            to={`/explore-the-coast/${destination.slug}`}
            className="dest-card__cta"
            id={`dest-explore-${destination.slug}`}
          >
            <span>{t('exploreCoast.card.exploreCta')}</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
