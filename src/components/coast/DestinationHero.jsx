import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Compass, Waves } from 'lucide-react';
import PlaceImage from '../shared/PlaceImage';
import './DestinationHero.css';

export default function DestinationHero({ destination }) {
  return (
    <section className="dest-hero" aria-label={`Destination ${destination.name}`}>
      {/* Background Photography */}
      <div className="dest-hero__bg">
        <PlaceImage
          slug={destination.slug}
          fallbackSrc={destination.heroImage}
          alt={`${destination.name}, ${destination.region}`}
          className="dest-hero__bg-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="dest-hero__overlay" aria-hidden="true" />
      </div>

      <div className="container dest-hero__container">
        {/* Breadcrumb / Back Link */}
        <div className="dest-hero__back anim-slide-up">
          <Link to="/explore-the-coast" className="dest-hero__back-link">
            <ArrowLeft size={16} />
            <span>Explore Somalia's Coast</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="dest-hero__content">
          <div className="dest-hero__meta-top anim-slide-up anim-delay-100">
            <span className="dest-hero__region-pill">
              <MapPin size={12} />
              {destination.region.toUpperCase()} · SOMALIA
            </span>
            <span className="dest-hero__type-pill">
              {destination.destinationType}
            </span>
          </div>

          <h1 className="dest-hero__title display-heading anim-slide-up anim-delay-200">
            {destination.name}
          </h1>

          <p className="dest-hero__tagline anim-slide-up anim-delay-300">
            {destination.tagline}
          </p>

          <div className="dest-hero__stats-row anim-slide-up anim-delay-400">
            {destination.coordinates?.lat != null && destination.coordinates?.lng != null && (
              <div className="dest-hero__stat-pill">
                <Compass size={14} />
                <span>
                  {destination.coordinates.lat.toFixed(2)}°N, {destination.coordinates.lng.toFixed(2)}°E
                </span>
              </div>
            )}
            <div className="dest-hero__stat-pill">
              <Waves size={14} />
              <span>{destination.coastlineArea}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

