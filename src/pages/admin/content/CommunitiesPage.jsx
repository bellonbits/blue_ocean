import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { adminCommunities, adminCommunityStories } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const COMMUNITY_FIELDS = [
  { name: 'name', label: 'Name', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'category', label: 'Category', section: 'Basic Information' },
  { name: 'location', label: 'Location', section: 'Basic Information' },
  { name: 'region', label: 'Region', section: 'Basic Information' },

  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'marine_connection', label: 'Marine connection', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'livelihoods', label: 'Livelihoods', type: 'list', fullWidth: true, section: 'Description' },
  { name: 'conservation_activities', label: 'Conservation activities', type: 'list', fullWidth: true, section: 'Description' },

  { name: 'hero_image', label: 'Main image URL', fullWidth: true, section: 'Media' },
  { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },
];

function StoriesTab() {
  const { token } = useAuth();
  const [communities, setCommunities] = useState([]);
  useEffect(() => { adminCommunities.list(token).then(setCommunities).catch(() => {}); }, [token]);

  const fields = [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'community_id', label: 'Community', type: 'select', required: true, section: 'Basic Information', options: communities.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'category', label: 'Category', section: 'Basic Information' },
    { name: 'author', label: 'Author', section: 'Basic Information' },
    { name: 'date', label: 'Date', section: 'Basic Information' },
    { name: 'location', label: 'Location', section: 'Basic Information' },
    { name: 'region', label: 'Region', section: 'Basic Information' },

    { name: 'story_content', label: 'Story (one paragraph per line)', type: 'list', fullWidth: true, rows: 8, section: 'Story' },
    { name: 'marine_connection', label: 'Marine connection', type: 'textarea', fullWidth: true, section: 'Story' },

    { name: 'featured_image', label: 'Featured image URL', fullWidth: true, section: 'Media' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },
  ];

  return (
    <GenericResourcePage
      resource={adminCommunityStories}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, community_id: item.community?.id })}
      itemLabel="story"
      createLabel="Add Story"
      searchKeys={['title', 'author']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'community', label: 'Community', render: (s) => s.community?.name },
        { key: 'author', label: 'Author' },
      ]}
    />
  );
}

const TABS = [
  { key: 'communities', label: 'Communities', component: () => (
    <GenericResourcePage resource={adminCommunities} fields={COMMUNITY_FIELDS} itemLabel="community" createLabel="Add Community" searchKeys={['name', 'location']}
      hasPublished
      columns={[{ key: 'name', label: 'Name' }, { key: 'region', label: 'Region' }, { key: 'category', label: 'Category' }]} />
  ) },
  { key: 'stories', label: 'Stories', component: StoriesTab },
];

export default function CommunitiesPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('communities');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <div>
      <h1 className="admin__title">Communities</h1>
      <p className="admin__subtitle">Coastal communities and the stories about them.</p>

      <div className="admin__tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`admin__tab ${tab === t.key ? 'admin__tab--active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <Active />
    </div>
  );
}
