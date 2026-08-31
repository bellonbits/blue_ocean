import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { adminListRegions, createRegion, updateRegion, deleteRegion } from '../../../lib/contentApi';
import ContentTable from './ContentTable';
import ContentFormModal from './ContentFormModal';

const FIELDS = [
  { name: 'name', label: 'Name', required: true, section: 'Basic Information' },
  { name: 'slug', label: 'Slug', required: true, placeholder: 'puntland', section: 'Basic Information' },
  { name: 'subtitle', label: 'Subtitle', section: 'Basic Information' },
  { name: 'tagline', label: 'Tagline', fullWidth: true, type: 'textarea', rows: 2, section: 'Description' },
  { name: 'description', label: 'Description', fullWidth: true, type: 'textarea', section: 'Description' },
  { name: 'image', label: 'Image URL', fullWidth: true, section: 'Media' },
  { name: 'coastline_km', label: 'Coastline length', section: 'Details' },
  { name: 'seas', label: 'Seas', type: 'list', fullWidth: true, section: 'Details' },
  { name: 'highlights', label: 'Highlights', type: 'list', fullWidth: true, section: 'Details' },
];

export default function RegionsPage() {
  const { token } = useAuth();
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setIsLoading(true);
    adminListRegions(token).then(setRegions).catch((err) => setError(err.message)).finally(() => setIsLoading(false));
  };

  useEffect(load, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setFormError(null);
    try {
      if (modal.mode === 'create') {
        const created = await createRegion(token, payload);
        setRegions((prev) => [...prev, created]);
      } else {
        const updated = await updateRegion(token, modal.region.id, payload);
        setRegions((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      }
      setModal(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (region) => {
    if (!window.confirm(`Delete region "${region.name}"? Destinations must be reassigned first.`)) return;
    try {
      await deleteRegion(token, region.id);
      setRegions((prev) => prev.filter((r) => r.id !== region.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <ContentTable
        items={regions}
        isLoading={isLoading}
        error={error}
        searchKeys={['name', 'subtitle']}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'subtitle', label: 'Subtitle' },
          { key: 'destinations_count', label: 'Locations' },
        ]}
        createLabel="Add Region"
        onCreate={() => setModal({ mode: 'create' })}
        onEdit={(region) => setModal({ mode: 'edit', region })}
        onDelete={handleDelete}
      />

      {modal && (
        <ContentFormModal
          title={modal.mode === 'create' ? 'Add Region' : `Edit ${modal.region.name}`}
          fields={FIELDS}
          initialValues={modal.mode === 'edit' ? modal.region : {}}
          onSubmit={handleSubmit}
          onClose={() => { setModal(null); setFormError(null); }}
          submitting={submitting}
          error={formError}
        />
      )}
    </div>
  );
}
