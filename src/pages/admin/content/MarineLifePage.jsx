import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { adminSpeciesCategories, adminSpecies } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const CATEGORY_FIELDS = [
  { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'group', label: 'Group', section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'image', label: 'Image URL', fullWidth: true, section: 'Media' },
];

const CONSERVATION_STATUSES = [
  'Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Data Deficient',
].map((v) => ({ value: v, label: v }));

function useSpeciesFields() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => { adminSpeciesCategories.list(token).then(setCategories).catch(() => {}); }, [token]);

  return [
    { name: 'common_name', label: 'Common Name', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
    { name: 'somali_name', label: 'Somali Name', section: 'Basic Information' },
    { name: 'scientific_name', label: 'Scientific Name', section: 'Basic Information' },
    { name: 'category_id', label: 'Category', type: 'select', required: true, section: 'Basic Information', options: categories.map((c) => ({ value: c.id, label: c.title })) },
    { name: 'taxonomic_group', label: 'Taxonomic group', section: 'Basic Information' },

    { name: 'tagline', label: 'Tagline', fullWidth: true, type: 'textarea', rows: 2, section: 'Description' },
    { name: 'description', label: 'Description', fullWidth: true, type: 'textarea', rows: 5, section: 'Description' },
    { name: 'interesting_facts', label: 'Interesting facts', type: 'list', fullWidth: true, section: 'Description' },

    { name: 'habitat', label: 'Habitat', section: 'Biology' },
    { name: 'depth', label: 'Depth', section: 'Biology' },
    { name: 'distribution', label: 'Distribution', section: 'Biology' },
    { name: 'diet', label: 'Diet', section: 'Biology' },
    { name: 'size', label: 'Size', section: 'Biology' },
    { name: 'weight', label: 'Weight', section: 'Biology' },
    { name: 'lifespan', label: 'Lifespan', section: 'Biology' },

    { name: 'conservation_status', label: 'Conservation status', type: 'select', options: CONSERVATION_STATUSES, section: 'Conservation' },
    { name: 'status_explanation', label: 'Status explanation', type: 'textarea', fullWidth: true, section: 'Conservation' },

    { name: 'hero_image', label: 'Main image URL', fullWidth: true, section: 'Media' },
    { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },
  ];
}

function SpeciesTab() {
  const fields = useSpeciesFields();
  return (
    <GenericResourcePage
      resource={adminSpecies}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, category_id: item.category?.id })}
      itemLabel="species"
      createLabel="Add Species"
      searchKeys={['common_name', 'scientific_name']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'common_name', label: 'Common Name' },
        { key: 'scientific_name', label: 'Scientific Name' },
        { key: 'category', label: 'Category', render: (s) => s.category?.title },
      ]}
    />
  );
}

function CategoriesTab() {
  return (
    <GenericResourcePage
      resource={adminSpeciesCategories}
      fields={CATEGORY_FIELDS}
      itemLabel="category"
      createLabel="Add Category"
      searchKeys={['title']}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'species_count', label: 'Species' },
      ]}
    />
  );
}

const TABS = [
  { key: 'species', label: 'Species' },
  { key: 'categories', label: 'Categories' },
];

export default function MarineLifePage() {
  const { user } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('species');

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  return (
    <div>
      <h1 className="admin__title">Marine Life</h1>
      <p className="admin__subtitle">Species profiles and the categories they belong to.</p>

      <div className="admin__tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`admin__tab ${tab === t.key ? 'admin__tab--active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'species' ? <SpeciesTab /> : <CategoriesTab />}
    </div>
  );
}
