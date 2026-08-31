import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import './StaticContentPage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Publications — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/api/v1/research-projects?status=Published`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setPublications(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <main id="main-content" className="static-page" aria-label="Publications">
      <div className="container">
        <div className="static-page__header">
          <span className="label-text">Research</span>
          <h1 className="static-page__title">Publications</h1>
          <p className="static-page__subtitle">
            Research findings Blue Ocean has published from work along Somalia's coast.
          </p>
        </div>

        {isLoading && <div className="static-page__empty">Loading…</div>}

        {!isLoading && publications.length === 0 && (
          <div className="static-page__empty">
            No published research yet — check back as active projects wrap up, or see all{' '}
            <Link to="/research/projects" style={{ color: 'var(--color-turquoise)' }}>research projects</Link> in progress.
          </div>
        )}

        {!isLoading && publications.length > 0 && (
          <div className="publications-list">
            {publications.map((p) => (
              <Link key={p.id} to={`/research/projects/${p.slug}`} className="publication-card">
                <div className="publication-card__meta">
                  <FileText size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  {p.area?.title} {p.end_date ? `· ${p.end_date}` : ''}
                </div>
                <h2 className="publication-card__title">{p.title}</h2>
                {p.summary && <p className="publication-card__summary">{p.summary}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
