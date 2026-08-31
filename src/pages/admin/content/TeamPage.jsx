import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { adminResearchTeams, adminTeamMembers, adminResearchProjects, adminConservationProjects } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const RESEARCH_TEAM_FIELDS = [
  { name: 'name', label: 'Name', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'icon', label: 'Icon', section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
];

function ResearchUnitsTab() {
  return (
    <GenericResourcePage
      resource={adminResearchTeams}
      fields={RESEARCH_TEAM_FIELDS}
      itemLabel="team"
      createLabel="Add Research Unit"
      searchKeys={['name']}
      columns={[{ key: 'name', label: 'Name' }, { key: 'project_count', label: 'Projects' }]}
    />
  );
}

function useTeamMemberFields() {
  const { token } = useAuth();
  const [researchProjects, setResearchProjects] = useState([]);
  const [conservationProjects, setConservationProjects] = useState([]);

  useEffect(() => {
    adminResearchProjects.list(token).then(setResearchProjects).catch(() => {});
    adminConservationProjects.list(token).then(setConservationProjects).catch(() => {});
  }, [token]);

  return [
    { name: 'name', label: 'Name', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, placeholder: 'mohamed-abdi', section: 'Basic Information' },
    { name: 'role', label: 'Role', required: true, placeholder: 'Marine Researcher', section: 'Basic Information' },
    { name: 'location', label: 'Location', section: 'Basic Information' },

    { name: 'biography', label: 'Biography', type: 'textarea', fullWidth: true, rows: 6, section: 'Biography' },
    { name: 'expertise', label: 'Areas of Expertise', type: 'list', fullWidth: true, section: 'Biography' },

    { name: 'profile_image', label: 'Profile Photo URL', section: 'Media' },
    { name: 'cover_image', label: 'Cover Image URL', section: 'Media' },
    { name: 'gallery', label: 'Field Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },

    { name: 'email', label: 'Email', section: 'Contact' },
    { name: 'phone', label: 'Phone', section: 'Contact' },
    {
      name: 'social_links', label: 'Social Links', type: 'pairlist', pairKeys: ['label', 'href'], fullWidth: true, rows: 3,
      placeholder: 'One per line, e.g.\nInstagram | https://instagram.com/...', section: 'Contact',
    },

    {
      name: 'research_project_ids', label: 'Research Projects', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: researchProjects.map((p) => ({ value: p.id, label: p.title })),
    },
    {
      name: 'conservation_project_ids', label: 'Conservation Projects', type: 'multiselect', fullWidth: true, section: 'Related Content',
      options: conservationProjects.map((p) => ({ value: p.id, label: p.title })),
    },

    { name: 'featured', label: 'Featured Member', type: 'checkbox', section: 'Related Content' },
  ];
}

function TeamMembersTab() {
  const fields = useTeamMemberFields();
  return (
    <GenericResourcePage
      resource={adminTeamMembers}
      fields={fields}
      mapInitialValues={(item) => ({
        ...item,
        research_project_ids: (item.research_projects || []).map((p) => p.id),
        conservation_project_ids: (item.conservation_projects || []).map((p) => p.id),
        social_links: item.social_links, // already {label, href} — pairlist matches directly
      })}
      itemLabel="team member"
      createLabel="Add Team Member"
      searchKeys={['name', 'role']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'location', label: 'Location' },
      ]}
    />
  );
}

const TABS = [
  { key: 'members', label: 'Team Members', component: TeamMembersTab },
  { key: 'units', label: 'Research Units', component: ResearchUnitsTab },
];

export default function TeamPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('members');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <div>
      <h1 className="admin__title">Team</h1>
      <p className="admin__subtitle">
        Individual staff/researcher profiles, and the institutional research units they belong to.
      </p>

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
