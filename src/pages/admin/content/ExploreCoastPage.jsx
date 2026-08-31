import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import DestinationsPage from './DestinationsPage';
import RegionsPage from './RegionsPage';

const TABS = [
  { key: 'locations', label: 'Locations' },
  { key: 'regions', label: 'Regions' },
];

export default function ExploreCoastPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('locations');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  return (
    <div>
      <h1 className="admin__title">Explore Coast</h1>
      <p className="admin__subtitle">Coastal destinations and the regions they belong to.</p>

      <div className="admin__tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin__tab ${tab === t.key ? 'admin__tab--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'locations' ? <DestinationsPage /> : <RegionsPage />}
    </div>
  );
}
