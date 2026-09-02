import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { adminNewsCategories, adminNewsArticles } from '../../../lib/contentApi';
import GenericResourcePage from './GenericResourcePage';

const CATEGORY_FIELDS = [
  { name: 'label', label: 'Label', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, section: 'Basic Information' },
  { name: 'badge_class', label: 'Badge style', section: 'Basic Information' },
];

function ArticlesTab() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => { adminNewsCategories.list(token).then(setCategories).catch(() => {}); }, [token]);

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
    { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Media' },
  ];

  return (
    <GenericResourcePage
      resource={adminNewsArticles}
      fields={fields}
      mapInitialValues={(item) => ({ ...item, category_id: item.category?.id })}
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
