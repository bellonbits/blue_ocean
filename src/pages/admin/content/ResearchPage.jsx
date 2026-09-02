import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import {
  adminResearchAreas, adminMethodologies, adminResearchTeams, adminResearchProjects, adminExpeditions,
} from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const AREA_FIELDS = [
  { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'tag', label: 'Tag', section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'image', label: 'Image', type: 'image', fullWidth: true, section: 'Media' },
];

const METHODOLOGY_FIELDS = [
  { name: 'label', label: 'Label', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'icon', label: 'Icon', section: 'Basic Information' },
];

const TEAM_FIELDS = [
  { name: 'name', label: 'Name', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'icon', label: 'Icon', section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
];

const PROJECT_STATUS_OPTIONS = ['Planned', 'Active', 'Completed', 'Published'].map((v) => ({ value: v, label: v }));
const EXPEDITION_STATUS_OPTIONS = ['coming-soon', 'planned', 'active', 'completed'].map((v) => ({ value: v, label: v }));

function useLookups() {
  const { token } = useAuth();
  const [areas, setAreas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [methodologies, setMethodologies] = useState([]);
  useEffect(() => {
    adminResearchAreas.list(token).then(setAreas).catch(() => {});
    adminResearchTeams.list(token).then(setTeams).catch(() => {});
    adminMethodologies.list(token).then(setMethodologies).catch(() => {});
  }, [token]);
  return { areas, teams, methodologies };
}

function ProjectsTab() {
  const { areas, teams } = useLookups();
  const fields = [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'area_id', label: 'Research Area', type: 'select', required: true, section: 'Basic Information', options: areas.map((a) => ({ value: a.id, label: a.title })) },
    { name: 'research_team_id', label: 'Research Team', type: 'select', section: 'Basic Information', options: teams.map((t) => ({ value: t.id, label: t.name })) },
    { name: 'status', label: 'Status', type: 'select', required: true, options: PROJECT_STATUS_OPTIONS, section: 'Basic Information' },
    { name: 'region', label: 'Region', section: 'Basic Information' },
    { name: 'start_date', label: 'Start date', section: 'Basic Information' },
    { name: 'end_date', label: 'End date', section: 'Basic Information' },

    { name: 'summary', label: 'Summary', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'research_question', label: 'Research question', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'purpose', label: 'Purpose', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'geographic_scope', label: 'Geographic scope', section: 'Description' },
    { name: 'expected_outcomes', label: 'Expected outcomes', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'objectives', label: 'Objectives', type: 'list', fullWidth: true, section: 'Description' },
    { name: 'conservation_themes', label: 'Conservation themes', type: 'list', fullWidth: true, section: 'Description' },

    { name: 'hero_image', label: 'Main image', type: 'image', fullWidth: true, section: 'Media' },
    { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },
    { name: 'video_url', label: 'Video', type: 'video', fullWidth: true, section: 'Media' },
    { name: 'video_title', label: 'Video title', section: 'Media' },
    { name: 'video_source', label: 'Video source / credit', section: 'Media' },
    { name: 'video_description', label: 'Video description', type: 'textarea', fullWidth: true, rows: 2, section: 'Media' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },
  ];

  return (
    <GenericResourcePage
      resource={adminResearchProjects}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, area_id: item.area?.id, research_team_id: item.research_team?.id })}
      itemLabel="research project"
      createLabel="Add Project"
      searchKeys={['title', 'region']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'area', label: 'Area', render: (p) => p.area?.title },
        { key: 'status', label: 'Status' },
      ]}
    />
  );
}

function ExpeditionsTab() {
  const { areas, teams } = useLookups();
  const fields = [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'area_id', label: 'Research Area', type: 'select', section: 'Basic Information', options: areas.map((a) => ({ value: a.id, label: a.title })) },
    { name: 'research_team_id', label: 'Research Team', type: 'select', section: 'Basic Information', options: teams.map((t) => ({ value: t.id, label: t.name })) },
    { name: 'status', label: 'Status', type: 'select', options: EXPEDITION_STATUS_OPTIONS, section: 'Basic Information' },
    { name: 'location', label: 'Location', section: 'Basic Information' },
    { name: 'region', label: 'Region', section: 'Basic Information' },
    { name: 'dates', label: 'Dates', section: 'Basic Information' },
    { name: 'duration', label: 'Duration', section: 'Basic Information' },

    { name: 'purpose', label: 'Purpose', type: 'textarea', fullWidth: true, section: 'Description' },
    { name: 'requirements', label: 'Requirements', type: 'list', fullWidth: true, section: 'Description' },
  ];

  return (
    <GenericResourcePage
      resource={adminExpeditions}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, area_id: item.area?.id, research_team_id: item.research_team?.id })}
      itemLabel="expedition"
      createLabel="Add Expedition"
      searchKeys={['title', 'region']}
      hasPublished
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'area', label: 'Area', render: (e) => e.area?.title },
        { key: 'status', label: 'Status' },
      ]}
    />
  );
}

const TABS = [
  { key: 'projects', label: 'Projects', component: ProjectsTab },
  { key: 'expeditions', label: 'Expeditions', component: ExpeditionsTab },
  { key: 'areas', label: 'Areas', component: () => (
    <GenericResourcePage resource={adminResearchAreas} fields={AREA_FIELDS} itemLabel="area" createLabel="Add Area" searchKeys={['title']}
      columns={[{ key: 'title', label: 'Title' }, { key: 'project_count', label: 'Projects' }]} />
  ) },
  { key: 'teams', label: 'Teams', component: () => (
    <GenericResourcePage resource={adminResearchTeams} fields={TEAM_FIELDS} itemLabel="team" createLabel="Add Team" searchKeys={['name']}
      columns={[{ key: 'name', label: 'Name' }, { key: 'project_count', label: 'Projects' }]} />
  ) },
  { key: 'methodologies', label: 'Methodologies', component: () => (
    <GenericResourcePage resource={adminMethodologies} fields={METHODOLOGY_FIELDS} itemLabel="methodology" createLabel="Add Methodology" searchKeys={['label']}
      columns={[{ key: 'label', label: 'Label' }, { key: 'icon', label: 'Icon' }]} />
  ) },
];

export default function ResearchPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('projects');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <div>
      <h1 className="admin__title">Research</h1>
      <p className="admin__subtitle">Projects, expeditions, research areas, teams, and methodologies.</p>

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
