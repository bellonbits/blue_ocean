import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  adminListDestinations, createDestination, updateDestination, deleteDestination, adminListRegions,
} from '../../../lib/contentApi';
import ContentTable from './ContentTable';
import ContentFormModal from './ContentFormModal';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

// Related Marine Life / Research / Conservation / Experiences pickers are
// deliberately left out of this form — those domains don't have live admin
// data to pick from yet (Phase 2 of the CMS plan adds them one at a time).
const baseFields = [
  { name: 'name', label: 'Location Name', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, placeholder: 'bosaso', section: 'Basic Information' },
  { name: 'region_id', label: 'Region', type: 'select', required: true, options: [], section: 'Basic Information' },
  { name: 'location', label: 'Location', section: 'Basic Information' },
  { name: 'coastline_area', label: 'Coastline area', section: 'Basic Information' },
  { name: 'destination_type', label: 'Destination type', section: 'Basic Information' },

  { name: 'tagline', label: 'Tagline', fullWidth: true, type: 'textarea', rows: 2, section: 'Description' },
  { name: 'short_description', label: 'Short description', fullWidth: true, type: 'textarea', section: 'Description' },
  { name: 'full_description', label: 'Full description', fullWidth: true, type: 'textarea', rows: 6, section: 'Description' },

  { name: 'hero_image', label: 'Main image', type: 'image', fullWidth: true, section: 'Media' },
  { name: 'gallery', label: 'Gallery', type: 'gallery', fullWidth: true, section: 'Media' },
  { name: 'video_url', label: 'Video', type: 'video', fullWidth: true, section: 'Media' },
  { name: 'video_title', label: 'Video title', section: 'Media' },
  { name: 'video_source', label: 'Video source / credit', section: 'Media' },
  { name: 'video_description', label: 'Video description', type: 'textarea', fullWidth: true, rows: 2, section: 'Media' },

  { name: 'best_season', label: 'Best season', section: 'Details' },
  { name: 'access', label: 'Access', section: 'Details' },
  { name: 'location_point', label: 'Location on map', type: 'location', fullWidth: true, section: 'Details' },
  { name: 'highlights', label: 'Highlights', type: 'list', fullWidth: true, section: 'Details' },
  { name: 'featured', label: 'Feature on homepage', type: 'checkbox', section: 'Details' },

  // Somali translation — see BLUE_OCEAN_BACKLOG.md 10.2. Namespaced
  // `so_*` fields rather than a separate modal so this reuses the same
  // ContentFormModal/save flow; flattened from/back into `translations.so`
  // in initialValues/handleSubmit below. A blank field here just leaves
  // that piece untranslated (English shows through) rather than blank.
  { name: 'so_title', label: 'Title (Cinwaan)', section: 'Somali Translation (Af-Soomaali)' },
  { name: 'so_tagline', label: 'Tagline', type: 'textarea', rows: 2, fullWidth: true, section: 'Somali Translation (Af-Soomaali)' },
  { name: 'so_short_description', label: 'Short description (Sharaxaad Kooban)', type: 'textarea', fullWidth: true, section: 'Somali Translation (Af-Soomaali)' },
  { name: 'so_full_description', label: 'Full description (Sharaxaad Buuxda)', type: 'textarea', rows: 6, fullWidth: true, section: 'Somali Translation (Af-Soomaali)' },
  { name: 'so_highlights', label: 'Highlights', type: 'list', fullWidth: true, section: 'Somali Translation (Af-Soomaali)' },
];

export default function DestinationsPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setIsLoading(true);
    Promise.all([adminListDestinations(token), adminListRegions(token)])
      .then(([d, r]) => { setDestinations(d); setRegions(r); })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fields = baseFields.map((f) =>
    f.name === 'region_id' ? { ...f, options: regions.map((r) => ({ value: r.id, label: r.name })) } : f
  );

  // LocationPicker edits a single { lat, lng } point (see ContentFormModal's
  // 'location' field type), but the API persists separate latitude/longitude
  // columns — flatten here before submitting, same idea as region_id below.
  const flattenLocation = (payload) => {
    const { location_point, ...rest } = payload;
    return { ...rest, latitude: location_point?.lat ?? null, longitude: location_point?.lng ?? null };
  };

  // The form's so_* fields are flat (ContentFormModal has no concept of a
  // nested translation object) — fold them into the `translations.so`
  // shape the API expects, and drop the flat keys so they aren't sent as
  // stray top-level fields.
  const nestTranslation = (payload) => {
    const { so_title, so_tagline, so_short_description, so_full_description, so_highlights, ...rest } = payload;
    const hasSomaliContent = so_title || so_tagline || so_short_description || so_full_description
      || (so_highlights && so_highlights.length > 0);
    if (!hasSomaliContent) return rest;
    return {
      ...rest,
      translations: {
        so: {
          title: so_title || null,
          tagline: so_tagline || null,
          short_description: so_short_description || null,
          full_description: so_full_description || null,
          highlights: so_highlights || [],
        },
      },
    };
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setFormError(null);
    try {
      const finalPayload = nestTranslation(flattenLocation(payload));
      if (modal.mode === 'create') {
        const created = await createDestination(token, finalPayload);
        setDestinations((prev) => [...prev, created]);
      } else {
        const updated = await updateDestination(token, modal.destination.id, finalPayload);
        setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      }
      setModal(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (destination) => {
    if (!window.confirm(`Delete destination "${destination.name}"?`)) return;
    try {
      await deleteDestination(token, destination.id);
      setDestinations((prev) => prev.filter((d) => d.id !== destination.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (destination, key, value) => {
    try {
      const updated = await updateDestination(token, destination.id, { [key]: value });
      setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (destination, status) => {
    try {
      const updated = await updateDestination(token, destination.id, { status });
      setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <ContentTable
        items={destinations}
        isLoading={isLoading}
        error={error}
        searchKeys={['name', 'location']}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'region', label: 'Region', render: (d) => d.region?.name },
          { key: 'destination_type', label: 'Type' },
        ]}
        statusField={{ key: 'status', options: STATUS_OPTIONS }}
        statusToggles={[{ key: 'featured', label: 'Featured' }]}
        createLabel="Add Location"
        onCreate={() => setModal({ mode: 'create' })}
        onEdit={(destination) => setModal({ mode: 'edit', destination })}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onStatusChange={handleStatusChange}
      />

      {modal && (
        <ContentFormModal
          title={modal.mode === 'create' ? 'Add Location' : `Edit ${modal.destination.name}`}
          fields={fields}
          initialValues={
            modal.mode === 'edit'
              ? (() => {
                  const soTranslation = modal.destination.translations?.find((tr) => tr.language === 'so');
                  return {
                    ...modal.destination,
                    region_id: modal.destination.region?.id,
                    location_point:
                      modal.destination.latitude != null && modal.destination.longitude != null
                        ? { lat: modal.destination.latitude, lng: modal.destination.longitude }
                        : null,
                    so_title: soTranslation?.title || '',
                    so_tagline: soTranslation?.tagline || '',
                    so_short_description: soTranslation?.short_description || '',
                    so_full_description: soTranslation?.full_description || '',
                    so_highlights: soTranslation?.highlights || [],
                  };
                })()
              : {}
          }
          onSubmit={handleSubmit}
          onClose={() => { setModal(null); setFormError(null); }}
          submitting={submitting}
          error={formError}
          statusField={{ name: 'status', draftValue: 'draft', publishedValue: 'published' }}
          onPreview={
            modal.mode === 'edit'
              ? () => navigate(`/admin/content/coast/destinations/${modal.destination.id}/preview`)
              : undefined
          }
        />
      )}
    </div>
  );
}
