import { Layers, Waves, ArrowDown, Activity, Clock, Award, ShieldCheck, Scale, Ruler } from 'lucide-react';
import { getStatusInfo } from './SpeciesCard';
import './SpeciesInfo.css';

export default function SpeciesInfo({ species }) {
  const statusInfo = getStatusInfo(species.conservationStatus);

  const facts = [
    { label: 'COMMON NAME', value: species.commonName },
    { label: 'SOMALI NAME', value: species.somaliName || '—' },
    { label: 'SCIENTIFIC NAME', value: species.scientificName, italic: true },
    { label: 'GROUP', value: species.group || 'Marine Taxa' },
    { label: 'HABITAT', value: species.habitat || 'Coastal Waters' },
    { label: 'DEPTH RANGE', value: species.depth || 'Surface to Shelf' },
    { label: 'AVERAGE SIZE', value: species.size || 'Data pending survey' },
    { label: 'AVERAGE WEIGHT', value: species.weight || 'Data pending survey' },
    { label: 'TYPICAL LIFESPAN', value: species.lifespan || 'Data pending survey' },
    {
      label: 'CONSERVATION STATUS',
      value: statusInfo.label,
      isStatus: true,
      statusInfo,
    },
  ];

  return (
    <section className="species-info section" aria-labelledby="species-info-heading">
      <div className="container">
        {/* Editorial Statement */}
        <div className="species-info__editorial reveal">
          <span className="label-text">SPECIES PROFILE</span>
          <div className="divider" />
          <h2 className="species-info__heading" id="species-info-heading">
            {species.editorialStatement || species.description}
          </h2>
          <p className="species-info__narrative">
            {species.description}
          </p>
        </div>

        {/* Premium Scientific Info Matrix */}
        <div className="species-info__matrix reveal">
          <div className="species-info__matrix-header">
            <h3 className="species-info__matrix-title">Scientific Taxonomy & Field Specifications</h3>
            <span className="species-info__matrix-sub">Verified Marine Biological Data</span>
          </div>

          <div className="species-info__grid">
            {facts.map((fact, idx) => (
              <div key={idx} className="species-info__cell">
                <span className="species-info__label">{fact.label}</span>
                {fact.isStatus ? (
                  <span
                    className="species-info__status-pill"
                    style={{
                      background: fact.statusInfo.bg,
                      borderColor: fact.statusInfo.border,
                      color: fact.statusInfo.text,
                    }}
                  >
                    <ShieldCheck size={13} />
                    <span>{fact.value}</span>
                  </span>
                ) : (
                  <span className={`species-info__val ${fact.italic ? 'is-italic' : ''}`}>
                    {fact.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Diet & Distribution Callouts */}
          <div className="species-info__callouts">
            {species.diet && (
              <div className="species-info__callout">
                <h4 className="species-info__callout-title">Diet & Foraging Ecology</h4>
                <p className="species-info__callout-text">{species.diet}</p>
              </div>
            )}
            {species.distribution && (
              <div className="species-info__callout">
                <h4 className="species-info__callout-title">Somali Coastal Distribution</h4>
                <p className="species-info__callout-text">{species.distribution}</p>
              </div>
            )}
          </div>

          {/* Interesting Facts Bulleted Highlights */}
          {species.interestingFacts && species.interestingFacts.length > 0 && (
            <div className="species-info__facts-box">
              <h4 className="species-info__facts-title">Field Notes & Ecological Insights</h4>
              <ul className="species-info__facts-list">
                {species.interestingFacts.map((fact, i) => (
                  <li key={i} className="species-info__fact-item">
                    <span className="species-info__fact-bullet" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
