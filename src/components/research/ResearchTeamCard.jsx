import { Link } from 'react-router-dom';
import { Anchor, Waves, Compass, Fish, Sprout, Droplets, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './ResearchTeamCard.css';

const ICONS = { Anchor, Waves, Compass, Fish, Sprout, Droplets };

export default function ResearchTeamCard({ team }) {
  const { t } = useLanguage();
  const Icon = ICONS[team.icon] || Anchor;

  return (
    <Link to={`/research/team/${team.slug}`} className="team-card">
      <div className="team-card__icon">
        <Icon size={26} />
      </div>

      <div className="team-card__body">
        <h3 className="team-card__name">{team.name}</h3>
        <p className="team-card__desc">{team.description}</p>

        <div className="team-card__focus">
          {team.focusAreaDetails.map((a) => (
            <span key={a.id} className="team-card__focus-tag">{a.title}</span>
          ))}
        </div>

        <div className="team-card__footer">
          <span className="team-card__count">{team.projects.length} {team.projects.length === 1 ? t('research.card.projectSingular') : t('research.card.projectPlural')}</span>
          <span className="team-card__cta">
            <span>{t('research.card.viewTeamCta')}</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
