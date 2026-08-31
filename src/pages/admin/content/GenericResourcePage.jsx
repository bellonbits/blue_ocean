import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ContentTable from './ContentTable';
import ContentFormModal from './ContentFormModal';

// One reusable list+form page for a content resource, parameterized by the
// {list,get,create,update,remove} object from contentApi.js's
// makeAdminResource() and a fields/columns config — the same pattern
// RegionsPage/DestinationsPage established, generalized so the remaining
// content areas don't each reinvent this wiring.
// `mapInitialValues` flattens nested relation summaries the API returns
// (e.g. `category: {id, title}`) into the flat `category_id` a select field
// needs — without it, editing an item with a relation clears that field's
// selection every time (the id was never where the form looked for it).
const identity = (item) => item;

function displayName(item) {
  return item?.title || item?.name || item?.common_name || item?.label || null;
}

export default function GenericResourcePage({
  resource, fields, columns, searchKeys = [], hasPublished = false, hasFeatured = false,
  createLabel = 'New', itemLabel = 'item', extraToggles = [], mapInitialValues = identity,
}) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setIsLoading(true);
    resource.list(token).then(setItems).catch((err) => setError(err.message)).finally(() => setIsLoading(false));
  };

  useEffect(load, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setFormError(null);
    try {
      if (modal.mode === 'create') {
        const created = await resource.create(token, payload);
        setItems((prev) => [...prev, created]);
      } else {
        const updated = await resource.update(token, modal.item.id, payload);
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      }
      setModal(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this ${itemLabel}?`)) return;
    try {
      await resource.remove(token, item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (item, key, value) => {
    try {
      const updated = await resource.update(token, item.id, { [key]: value });
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (err) {
      setError(err.message);
    }
  };

  const statusToggles = [
    ...(hasPublished ? [{ key: 'published', label: 'Published' }] : []),
    ...(hasFeatured ? [{ key: 'featured', label: 'Featured' }] : []),
    ...extraToggles,
  ];

  return (
    <div>
      <ContentTable
        items={items}
        isLoading={isLoading}
        error={error}
        searchKeys={searchKeys}
        columns={columns}
        statusToggles={statusToggles}
        createLabel={createLabel}
        onCreate={() => setModal({ mode: 'create' })}
        onEdit={(item) => setModal({ mode: 'edit', item })}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {modal && (
        <ContentFormModal
          title={modal.mode === 'create' ? createLabel : `Edit${displayName(modal.item) ? ` ${displayName(modal.item)}` : ''}`}
          fields={fields}
          initialValues={modal.mode === 'edit' ? mapInitialValues(modal.item) : {}}
          onSubmit={handleSubmit}
          onClose={() => { setModal(null); setFormError(null); }}
          submitting={submitting}
          error={formError}
          statusField={hasPublished ? { name: 'published', draftValue: false, publishedValue: true } : undefined}
        />
      )}
    </div>
  );
}
