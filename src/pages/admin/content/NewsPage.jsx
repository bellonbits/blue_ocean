import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import {
  adminNewsCategories, adminNewsArticles, adminListDestinations,
  adminSpecies, adminResearchProjects, adminConservationProjects, adminExperiences, adminCommunities,
} from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const CATEGORY_FIELDS = [
  { name: 'label', label: 'Label', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'badge_class', label: 'Badge style', section: 'Basic Information' },
];

function ArticlesTab() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [species, setSpecies] = useState([]);
  const [researchProjects, setResearchProjects] = useState([]);
  const [conservationProjects, setConservationProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    adminNewsCategories.list(token).then(setCategories).catch(() => {});
    adminListDestinations(token).then(setDestinations).catch(() => {});
    adminSpecies.list(token).then(setSpecies).catch(() => {});
    adminResearchProjects.list(token).then(setResearchProjects).catch(() => {});
    adminConservationProjects.list(token).then(setConservationProjects).catch(() => {});
    adminExperiences.list(token).then(setExperiences).catch(() => {});
    adminCommunities.list(token).then(setCommunities).catch(() => {});
  }, [token]);

  const fields = [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'category_id', label: 'Category', type: 'select', required: true, section: 'Basic Information', options: categories.map((c) => ({ value: c.id, label: c.label })) },
    { name: 'author', label: 'Author', section: 'Basic Information' },
    { name: 'date', label: 'Date', placeholder: 'YYYY-MM-DD', section: 'Basic Information' },
    { name: 'display_date', label: 'Display date', placeholder: 'e.g. June 12, 2026', section: 'Basic Information' },
    { name: 'read_time', label: 'Read time', placeholder: 'e.g. 4 min read', section: 'Basic Information' },

    { name: 'excerpt', label: 'Excerpt', type: 'textarea', fullWidth: true, section: 'Content' },
    { name: 'content', label: 'Article body (blank line between paragraphs)', type: 'blocklist', fullWidth: true, section: 'Content' },

    { name: 'featured_image', label: 'Featured image', type: 'image', fullWidth: true, section: 'Media' },
    { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },
    { name: 'video_url', label: 'Video', type: 'video', fullWidth: true, section: 'Media' },
    { name: 'video_title', label: 'Video title', section: 'Media' },
    { name: 'video_source', label: 'Video source / credit', section: 'Media' },
    { name: 'video_description', label: 'Video description', type: 'textarea', fullWidth: true, rows: 2, section: 'Media' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },

    {
      name: 'destination_ids', label: 'Related destinations', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: destinations.map((d) => ({ value: d.id, label: d.name })),
    },
    {
      name: 'species_ids', label: 'Related marine species', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: species.map((s) => ({ value: s.id, label: s.common_name })),
    },
    {
      name: 'research_project_ids', label: 'Related research projects', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: researchProjects.map((p) => ({ value: p.id, label: p.title })),
    },
    {
      name: 'conservation_project_ids', label: 'Related conservation projects', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: conservationProjects.map((p) => ({ value: p.id, label: p.title })),
    },
    {
      name: 'experience_ids', label: 'Related ocean experiences', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: experiences.map((e) => ({ value: e.id, label: e.title })),
    },
    {
      name: 'community_ids', label: 'Related communities', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: communities.map((c) => ({ value: c.id, label: c.name })),
    },
  ];

  return (
    <GenericResourcePage
      resource={adminNewsArticles}
      fields={fields}
      mapInitialValues={(item) => ({
        ...item,
        category_id: item.category?.id,
        destination_ids: (item.destinations || []).map((d) => d.id),
        species_ids: (item.species || []).map((s) => s.id),
        research_project_ids: (item.research_projects || []).map((p) => p.id),
        conservation_project_ids: (item.conservation_projects || []).map((p) => p.id),
        experience_ids: (item.experiences || []).map((e) => e.id),
        community_ids: (item.communities || []).map((c) => c.id),
      })}
      itemLabel="article"
      createLabel="Write Article"
      searchKeys={['title', 'author']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', render: (a) => a.category?.label },
        { key: 'date', label: 'Date' },
      ]}
    />
  );
}

const TABS = [
  { key: 'articles', label: 'Articles', component: ArticlesTab },
  { key: 'categories', label: 'Categories', component: () => (
    <GenericResourcePage resource={adminNewsCategories} fields={CATEGORY_FIELDS} itemLabel="category" createLabel="Add Category" searchKeys={['label']}
      columns={[{ key: 'label', label: 'Label' }, { key: 'article_count', label: 'Articles' }]} />
  ) },
];

export default function NewsPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('articles');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <div>
      <h1 className="admin__title">News</h1>
      <p className="admin__subtitle">Articles and the categories they're published under.</p>

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
