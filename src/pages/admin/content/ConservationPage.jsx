import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { adminConservationFocusAreas, adminConservationIssues, adminConservationProjects } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const AREA_FIELDS = [
  { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'image', label: 'Image', type: 'image', fullWidth: true, section: 'Media' },
];

const ISSUE_FIELDS = [
  { name: 'label', label: 'Label', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'icon', label: 'Icon', section: 'Basic Information' },
];

const STATUS_OPTIONS = ['Planned', 'Active', 'Completed', 'Coming Soon'].map((v) => ({ value: v, label: v }));

function ProjectsTab() {
  const { token } = useAuth();
  const [areas, setAreas] = useState([]);
  useEffect(() => { adminConservationFocusAreas.list(token).then(setAreas).catch(() => {}); }, [token]);

  const fields = [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'focus_area_id', label: 'Focus Area', type: 'select', required: true, section: 'Basic Information', options: areas.map((a) => ({ value: a.id, label: a.title })) },
    { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, section: 'Basic Information' },
    { name: 'region', label: 'Region', section: 'Basic Information' },
    { name: 'start_date', label: 'Start date', section: 'Basic Information' },
    { name: 'end_date', label: 'End date', section: 'Basic Information' },

    { name: 'summary', label: 'Summary', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'what_it_is', label: 'What it is', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'why_it_matters', label: 'Why it matters', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'who_is_involved', label: 'Who is involved', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'aims', label: 'Aims', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'problem_statement', label: 'Problem statement', type: 'textarea', fullWidth: true, section: 'Description' },

    { name: 'hero_image', label: 'Main image', type: 'image', fullWidth: true, section: 'Media' },
    { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },
  ];

  return (
    <GenericResourcePage
      resource={adminConservationProjects}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, focus_area_id: item.focus_area?.id })}
      itemLabel="conservation project"
      createLabel="Add Project"
      searchKeys={['title', 'region']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'focus_area', label: 'Focus Area', render: (p) => p.focus_area?.title },
        { key: 'status', label: 'Status' },
      ]}
    />
  );
}

const TABS = [
  { key: 'projects', label: 'Projects', component: ProjectsTab },
  { key: 'focus-areas', label: 'Focus Areas', component: () => (
    <GenericResourcePage resource={adminConservationFocusAreas} fields={AREA_FIELDS} itemLabel="focus area" createLabel="Add Focus Area" searchKeys={['title']}
      columns={[{ key: 'title', label: 'Title' }, { key: 'project_count', label: 'Projects' }]} />
  ) },
  { key: 'issues', label: 'Issues', component: () => (
    <GenericResourcePage resource={adminConservationIssues} fields={ISSUE_FIELDS} itemLabel="issue" createLabel="Add Issue" searchKeys={['label']}
      columns={[{ key: 'label', label: 'Label' }, { key: 'icon', label: 'Icon' }]} />
  ) },
];

export default function ConservationPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('projects');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <div>
      <h1 className="admin__title">Conservation</h1>
      <p className="admin__subtitle">Projects, focus areas, and the issues they address.</p>

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
