import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { canManageAdmin } from './roles';
import RestrictedNotice from './RestrictedNotice';
import SettingsForm from './SettingsForm';
import UsersPage from './UsersPage';

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'social', label: 'Social Media' },
  { key: 'website', label: 'Website' },
  { key: 'users', label: 'Users' },
];

const GENERAL_FIELDS = [
  { name: 'name', label: 'Organization Name', section: 'Organization' },
  { name: 'contact_email', label: 'Contact Email', section: 'Organization' },
  { name: 'mission_statement', label: 'Mission Statement', fullWidth: true, section: 'Mission & Vision' },
  { name: 'mission_description', label: 'Mission Description', type: 'textarea', fullWidth: true, section: 'Mission & Vision' },
  { name: 'vision_statement', label: 'Vision Statement', fullWidth: true, section: 'Mission & Vision' },
  { name: 'vision_description', label: 'Vision Description', type: 'textarea', fullWidth: true, section: 'Mission & Vision' },
];

const SOCIAL_FIELDS = [
  {
    name: 'social_links', label: 'Social Links', type: 'pairlist', pairKeys: ['label', 'href'],
    fullWidth: true, rows: 6, section: 'Social Media',
    placeholder: 'One per line, e.g.\nInstagram | https://instagram.com/blueoceansomalia\nYouTube | https://youtube.com/@blueoceansomalia',
    hint: 'One per line as "Platform | URL"',
  },
];

const WEBSITE_FIELDS = [
  { name: 'story_intro', label: 'Our Story (intro)', type: 'textarea', fullWidth: true, section: 'About Page' },
  { name: 'why_ocean_matters_heading', label: 'Why the Ocean Matters — heading', section: 'About Page' },
  { name: 'why_ocean_matters_text', label: 'Why the Ocean Matters — text', type: 'textarea', fullWidth: true, section: 'About Page' },
  { name: 'who_we_work_with_heading', label: 'Who We Work With — heading', section: 'About Page' },
  { name: 'who_we_work_with_text', label: 'Who We Work With — text', type: 'textarea', fullWidth: true, section: 'About Page' },
  {
    name: 'contact_locations', label: 'Contact Locations', type: 'pairlist', pairKeys: ['label', 'value'],
    fullWidth: true, rows: 4, section: 'Contact Page',
    placeholder: 'One per line, e.g.\nHead Office | Bosaso, Puntland, Somalia',
    hint: 'One per line as "Label | Value"',
  },
  {
    name: 'contact_subjects', label: 'Contact Form Subjects', type: 'list', fullWidth: true, rows: 4, section: 'Contact Page',
    hint: 'One per line — populates the subject dropdown on the Contact/Volunteer/Partner forms',
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('general');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  return (
    <div>
      <h1 className="admin__title">Settings</h1>
      <p className="admin__subtitle">Organization details, social links, website content, and admin accounts.</p>

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

      {tab === 'general' && <SettingsForm key="general" fields={GENERAL_FIELDS} />}
      {tab === 'social' && <SettingsForm key="social" fields={SOCIAL_FIELDS} />}
      {tab === 'website' && <SettingsForm key="website" fields={WEBSITE_FIELDS} />}
      {tab === 'users' && <UsersPage embedded />}
    </div>
  );
}
