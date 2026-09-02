import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { adminExperienceCategories, adminExperiences } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const CATEGORY_FIELDS = [
  { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'tagline', label: 'Tagline', section: 'Basic Information' },
  { name: 'icon', label: 'Icon', section: 'Basic Information' },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, section: 'Description' },
  { name: 'image', label: 'Image', type: 'image', fullWidth: true, section: 'Media' },
];

const STATUS_OPTIONS = [
  { value: 'coming-soon', label: 'Coming Soon' },
  { value: 'available', label: 'Available' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'unavailable', label: 'Unavailable' },
];

function useExperienceFields() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => { adminExperienceCategories.list(token).then(setCategories).catch(() => {}); }, [token]);

  return [
    { name: 'title', label: 'Title', required: true, section: 'Basic Information' },
    { name: 'slug', label: 'Slug', required: true, placeholder: 'reef-snorkeling-bosaso', section: 'Basic Information' },
    { name: 'category_id', label: 'Category', type: 'select', required: true, section: 'Basic Information', options: categories.map((c) => ({ value: c.id, label: c.title })) },
    { name: 'status', label: 'Availability', type: 'select', required: true, options: STATUS_OPTIONS, section: 'Basic Information' },
    { name: 'region', label: 'Region', section: 'Basic Information' },
    { name: 'location', label: 'Location', section: 'Basic Information' },

    { name: 'tagline', label: 'Tagline', fullWidth: true, type: 'textarea', rows: 2, section: 'Description' },
    { name: 'short_description', label: 'Short description', fullWidth: true, type: 'textarea', section: 'Description' },
    { name: 'duration', label: 'Duration', section: 'Details' },
    { name: 'difficulty', label: 'Difficulty', section: 'Details' },
    { name: 'best_season', label: 'Best season', section: 'Details' },

    { name: 'hero_image', label: 'Main image', type: 'image', fullWidth: true, section: 'Media' },
    { name: 'gallery', label: 'Gallery', type: 'imagelist', fullWidth: true, section: 'Media' },

    { name: 'highlights', label: 'Highlights', type: 'list', fullWidth: true, section: 'More' },
    { name: 'conservation_themes', label: 'Conservation themes', type: 'list', fullWidth: true, section: 'More' },
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'More' },
  ];
}

export default function ExperiencesPage() {
  const fields = useExperienceFields();

  return (
    <GenericResourcePage
      resource={adminExperiences}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, category_id: item.category?.id })}
      itemLabel="experience"
      createLabel="Add Experience"
      searchKeys={['title', 'region']}
      hasPublished
      hasFeatured
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', render: (e) => e.category?.title },
        { key: 'status', label: 'Availability' },
      ]}
    />
  );
}

export function ExperienceCategoriesPage() {
  return (
    <GenericResourcePage
      resource={adminExperienceCategories}
      fields={CATEGORY_FIELDS}
      itemLabel="category"
      createLabel="Add Category"
      searchKeys={['title']}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'experiences_count', label: 'Experiences' },
      ]}
    />
  );
}
