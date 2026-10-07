import { useEffect, useState } from 'react';
import { Users, FileText, Mail, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAdminStats } from '../../lib/adminApi';
import { canManageAdmin } from './roles';
import RestrictedNotice from './RestrictedNotice';

const CONTENT_LABELS = {
  regions: 'Regions',
  destinations: 'Destinations',
  species_categories: 'Species Categories',
  species: 'Species',
  research_areas: 'Research Areas',
  methodologies: 'Methodologies',
  research_teams: 'Research Teams',
  research_projects: 'Research Projects',
  expeditions: 'Expeditions',
  experience_categories: 'Experience Categories',
  experiences: 'Experiences',
  conservation_focus_areas: 'Conservation Focus Areas',
  conservation_issues: 'Conservation Issues',
  conservation_projects: 'Conservation Projects',
  communities: 'Communities',
  community_stories: 'Community Stories',
  news_categories: 'News Categories',
  news_articles: 'News Articles',
  media: 'Media',
};

export default function DashboardOverviewPage() {
  const { user, token } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(isAdmin);

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    setIsLoading(true);
    getAdminStats(token)
      .then((data) => { if (!cancelled) setStats(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [isAdmin, token]);

  if (!isAdmin) {
    return (
      <div>
        <h1 className="admin__title">Welcome, {user?.full_name || user?.email}</h1>
        <p className="admin__subtitle">
          You're signed in as <strong>{user?.role?.replace('_', ' ')}</strong>. Content
          management tools for your role are on the way.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin__title">Overview</h1>
      <p className="admin__subtitle">Live counts across the Blue Ocean CMS.</p>

      {error && <div className="admin__error">{error}</div>}
      {isLoading && <div className="admin__loading">Loading stats…</div>}

      {stats && (
        <>
          <div className="admin__stat-grid">
            <div className="admin__stat-card">
              <div className="admin__stat-icon admin__stat-icon--blue"><Users size={20} /></div>
              <div>
                <div className="admin__stat-value">{stats.users.total}</div>
                <div className="admin__stat-label">Users ({stats.users.active} active)</div>
              </div>
            </div>
            <div className="admin__stat-card">
              <div className="admin__stat-icon admin__stat-icon--red"><Mail size={20} /></div>
              <div>
                <div className="admin__stat-value">{stats.contact_submissions.unread}</div>
                <div className="admin__stat-label">Unread messages ({stats.contact_submissions.total} total)</div>
              </div>
            </div>
            <div className="admin__stat-card">
              <div className="admin__stat-icon admin__stat-icon--purple"><FileText size={20} /></div>
              <div>
                <div className="admin__stat-value">{stats.content.news_articles}</div>
                <div className="admin__stat-label">News articles</div>
              </div>
            </div>
            <div className="admin__stat-card">
              <div className="admin__stat-icon admin__stat-icon--amber"><Layers size={20} /></div>
              <div>
                <div className="admin__stat-value">
                  {Object.values(stats.content).reduce((sum, n) => sum + n, 0)}
                </div>
                <div className="admin__stat-label">Total content records</div>
              </div>
            </div>
          </div>

          <h2 className="admin__section-title">Content by type</h2>
          <div className="admin__table-wrap">
            <table className="admin__table">
              <tbody>
                {Object.entries(stats.content).map(([key, count]) => (
                  <tr key={key}>
                    <td>{CONTENT_LABELS[key] || key}</td>
                    <td className="admin__table-num">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="admin__section-title">Users by role</h2>
          <div className="admin__table-wrap">
            <table className="admin__table">
              <tbody>
                {Object.entries(stats.users.by_role).map(([role, count]) => (
                  <tr key={role}>
                    <td>{role.replace('_', ' ')}</td>
                    <td className="admin__table-num">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
