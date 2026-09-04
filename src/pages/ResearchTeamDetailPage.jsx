import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Anchor, Waves, Compass, Fish, Sprout, Droplets } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getTeamBySlug } from '../data/research';
import { useLanguage } from '../context/LanguageContext';
import ResearchProjectCard from '../components/research/ResearchProjectCard';
import '../components/experiences/ExperienceGrid.css';
import '../components/research/ResearchTeamCard.css';
import './SpeciesDirectoryPage.css';
import './ResearchTeamPage.css';

const ICONS = { Anchor, Waves, Compass, Fish, Sprout, Droplets };

export default function ResearchTeamDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const team = getTeamBySlug(slug, language);
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = team ? `${team.name} — Blue Ocean Research Team` : 'Team Not Found — Blue Ocean Somalia';
  }, [team]);

  if (!team) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Compass size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Team Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>This research team profile is not currently published.</p>
          <Link to="/research/team" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Research Team</span>
          </Link>
        </div>
      </main>
    );
  }

  const Icon = ICONS[team.icon] || Anchor;

  return (
    <main id="main-content" className="research-team-detail-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research/team" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Team</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="team-card__icon" style={{ width: 56, height: 56 }}>
              <Icon size={26} />
            </div>
          </div>

          <span className="label-text">RESEARCH TEAM</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">{team.name}</h1>
          <p className="species-dir-hero__desc">{team.description}</p>

          <div className="team-card__focus" style={{ marginTop: 'var(--space-4)' }}>
            {team.focusAreaDetails.map((a) => (
              <span key={a.id} className="team-card__focus-tag">{a.title}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="section-header reveal">
            <span className="label-text">TEAM PROJECTS</span>
            <div className="divider" />
            <h2 className="section-heading">Active & Past Research</h2>
          </div>

          {team.projects.length > 0 ? (
            <div className="exp-grid__results">
              {team.projects.map((p) => (
                <ResearchProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)' }}>No published projects for this team yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
