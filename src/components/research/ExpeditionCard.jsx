import { MapPin, Clock, Sparkles } from 'lucide-react';
import '../experiences/ExperienceCard.css';

export default function ExpeditionCard({ expedition }) {
  const image = expedition.species[0]?.heroImage || '/exp_scuba_diving.jpg';

  return (
    <article className="exp-card">
      <div className="exp-card__media-wrap">
        <img src={image} alt={expedition.title} className="exp-card__img" loading="lazy" />
        <div className="exp-card__gradient" />

        <div className="exp-card__top-bar">
          <span className="exp-card__category-badge">{expedition.areaName}</span>
          <span className="badge badge-coming-soon exp-card__status-badge">
            <Sparkles size={11} />
            <span>Coming Soon</span>
          </span>
        </div>
      </div>

      <div className="exp-card__body">
        <h3 className="exp-card__title">{expedition.title}</h3>
        <p className="exp-card__desc">{expedition.purpose}</p>

        <div className="exp-card__meta-row">
          <span className="exp-card__meta-item">
            <MapPin size={12} />
            <span>{expedition.location}</span>
          </span>
          <span className="exp-card__meta-item">
            <Clock size={12} />
            <span>{expedition.duration}</span>
          </span>
        </div>

        {expedition.requirements && expedition.requirements.length > 0 && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
            {expedition.requirements.map((r, i) => (
              <li key={i} style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>· {r}</li>
            ))}
          </ul>
        )}

        <div className="exp-card__footer">
          <span className="exp-card__meta-item">Team: {expedition.researchTeamName}</span>
        </div>
      </div>
    </article>
  );
}
