import { Link } from 'react-router-dom';
import { ArrowRight, Fish } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './DestinationMarineLife.css';

export default function DestinationMarineLife({ destination }) {
  const { language } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const isSo = language === 'so';

  const speciesList = destination.marineSpecies || [];

  if (speciesList.length === 0) return null;

  return (
    <section className="dest-marine-section section" aria-labelledby="dest-marine-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">
            {isSo ? 'Iftiiminta Nidaamka Deegaanka' : 'Ecosystem Spotlight'}
          </span>
          <div className="divider centered" />
          <h2 className="section-heading" id="dest-marine-heading">
            {isSo ? 'Nolosha hoos taal biyahan.' : 'Life beneath these waters.'}
          </h2>
          <p className="section-subheading">
            {isSo
              ? `Xayawaanka badda ee muhiimka ah, noocyada badda furan, iyo deegaannada lagu diiwaan geliyay biyaha ${destination.name}.`
              : `Key marine wildlife, pelagic species, and benthic habitats documented in the waters off ${destination.name}.`}
          </p>
        </div>

        {/* Species Grid */}
        <div className="dest-marine-grid">
          {speciesList.map((species, i) => (
            <article
              key={species.id || species.name}
              className={`dest-species-card reveal reveal-delay-${i + 1}`}
            >
              {/* Species Photo */}
              <div className="dest-species-card__image-wrap">
                <img
                  src={species.image}
                  alt={species.name}
                  className="dest-species-card__img"
                  loading="lazy"
                />
                <div className="dest-species-card__overlay" aria-hidden="true" />
              </div>

              {/* Species Info */}
              <div className="dest-species-card__content">
                <div className="dest-species-card__names">
                  <h3 className="dest-species-card__common-name">{species.name}</h3>
                  <span className="dest-species-card__scientific-name">
                    {species.scientificName}
                  </span>
                </div>

                <p className="dest-species-card__desc">{species.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to full Marine Life Library */}
        <div className="dest-marine-cta reveal">
          <Link to={localizedPath('/marine-life')} className="btn btn-primary" id="dest-marine-explore-all">
            <Fish size={18} />
            <span>{isSo ? 'Sahamiso Kaydka Nolosha Badda' : 'Explore Marine Life Library'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
