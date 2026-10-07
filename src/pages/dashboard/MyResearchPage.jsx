import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Library, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getProjectBySlug, getStatusLabel } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';

export default function MyResearchPage() {
  const { savedItems, toggleSaved } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    document.title = 'My Research — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  const rows = useMemo(
    () =>
      savedItems
        .filter((item) => item.content_type === 'research')
        .map((item) => ({ item, project: getProjectBySlug(item.content_slug, language) }))
        .filter((row) => row.project),
    [savedItems, language]
  );

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>My Research</h1>
        <p>Research projects you've saved to follow their findings and progress.</p>
      </div>

      {rows.length === 0 ? (
        <div className="user-dash-empty">
          <Library size={28} />
          <p>No research projects saved yet — tap the heart icon on any research project to keep track of it here.</p>
          <Link to="/research/projects" className="btn btn-primary btn-sm">
            <span>Browse Research</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="user-dash-recent-grid">
          {rows.map(({ item, project }) => (
            <div key={item.id} className="user-dash-recent-card user-dash-recent-card--removable">
              <button
                type="button"
                className="user-dash-recent-card__remove"
                aria-label="Remove from Saved"
                onClick={() => toggleSaved('research', item.content_slug)}
              >
                <X size={14} />
              </button>
              <Link to={`/research/projects/${project.slug}`} className="user-dash-recent-card__inner">
                <div className="user-dash-recent-card__media">
                  {project.heroImage && <img src={project.heroImage} alt="" loading="lazy" />}
                </div>
                <div className="user-dash-recent-card__body">
                  <span className="user-dash-recent-card__type">{getStatusLabel(project.status, language)}</span>
                  <h3>{project.title}</h3>
                  {project.areaName && <p>{project.areaName}</p>}
                  <span className="user-dash-recent-card__cta">
                    <span>View</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
