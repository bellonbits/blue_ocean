import { motion } from 'framer-motion';
import { Waves, Sparkles, MapPin, Activity, ArrowRight } from 'lucide-react';
import { marineEcosystems } from '../../data/marineLife';
import './EcosystemsSection.css';

export default function EcosystemsSection() {
  return (
    <section className="ecosystems-sec section" id="ecosystems-section" aria-labelledby="ecosystems-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">HABITAT FOUNDATIONS</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="ecosystems-heading">
            Somalia’s Living Marine Ecosystems
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            From high-energy coral barriers and vast seagrass meadows to Earth’s most productive ocean upwellings along the Horn of Africa.
          </p>
        </div>

        {/* Grid */}
        <div className="ecosystems-sec__grid reveal">
          {marineEcosystems.map((eco) => (
            <article key={eco.id} className="eco-card">
              <div className="eco-card__media">
                <img src={eco.image} alt={eco.title} className="eco-card__img" loading="lazy" />
                <div className="eco-card__overlay" />
                <span className="eco-card__metric-badge">
                  <Activity size={12} />
                  <span>{eco.healthMetric}</span>
                </span>
              </div>

              <div className="eco-card__body">
                <span className="eco-card__somali">{eco.somaliName}</span>
                <h3 className="eco-card__title">{eco.title}</h3>
                <p className="eco-card__desc">{eco.description}</p>

                {/* Key Regions */}
                <div className="eco-card__regions">
                  <span className="eco-card__regions-label">Key Zones:</span>
                  <div className="eco-card__regions-tags">
                    {eco.keyRegions.map((r, i) => (
                      <span key={i} className="eco-card__region-tag">
                        <MapPin size={10} />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="eco-card__footer">
                  <span className="eco-card__supported">
                    <strong>Supported:</strong> {eco.speciesSupported}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
