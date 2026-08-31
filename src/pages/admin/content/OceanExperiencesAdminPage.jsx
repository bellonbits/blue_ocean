import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import ExperiencesPage, { ExperienceCategoriesPage } from './ExperiencesPage';

const TABS = [
  { key: 'experiences', label: 'Experiences' },
  { key: 'categories', label: 'Categories' },
];

export default function OceanExperiencesAdminPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('experiences');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  return (
    <div>
      <h1 className="admin__title">Ocean Experiences</h1>
      <p className="admin__subtitle">Boat tours, snorkeling, diving, fishing, and island exploration.</p>

      <div className="admin__tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`admin__tab ${tab === t.key ? 'admin__tab--active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'experiences' ? <ExperiencesPage /> : <ExperienceCategoriesPage />}
    </div>
  );
}
