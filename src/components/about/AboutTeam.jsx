import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { getAllTeams } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import ResearchTeamCard from '../research/ResearchTeamCard';
import '../research/ResearchTeamCard.css';
import '../../pages/ResearchTeamPage.css';

export default function AboutTeam() {
  const { language, t } = useLanguage();
  const teams = getAllTeams(language);
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="research-obj section" aria-labelledby="about-team-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">{t('about.team.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="about-team-heading">
            {t('about.team.heading')}
          </h2>
          <p className="section-subheading">
            {t('about.team.subheading')}
          </p>
        </div>

        <div
          className="exp-grid__notice reveal"
          style={{ marginBottom: 'var(--space-8)', background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(240,246,255,0.8)' }}
        >
          <Info size={16} />
          <span>
            {t('about.team.notice')}
          </span>
        </div>

        <div className="research-team-grid reveal">
          {teams.map((team) => (
            <ResearchTeamCard key={team.id} team={team} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link to={localizedPath('/research/team')} className="btn btn-outline btn-lg">
            <span>{t('about.team.viewAllCta')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
