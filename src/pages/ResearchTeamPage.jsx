import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getAllTeams } from '../data/research';
import { useLanguage } from '../context/LanguageContext';
import ResearchTeamCard from '../components/research/ResearchTeamCard';
import '../components/experiences/ExperienceGrid.css';
import './SpeciesDirectoryPage.css';
import './ResearchTeamPage.css';

export default function ResearchTeamPage() {
  useScrollReveal();
  const { language } = useLanguage();
  const teams = getAllTeams(language);

  useEffect(() => {
    document.title = 'Research Team — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="research-team-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">RESEARCH TEAM</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Our Research Teams</h1>
          <p className="species-dir-hero__desc">
            The specialist units behind Blue Ocean's field research, organized by area of scientific focus.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="exp-grid__notice" style={{ marginBottom: 'var(--space-8)' }}>
            <Info size={16} />
            <span>
              Individual researcher profiles are not yet published. Teams are shown here as organizational units
              until Blue Ocean's full roster is confirmed.
            </span>
          </div>

          <div className="research-team-grid">
            {teams.map((team) => (
              <ResearchTeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
