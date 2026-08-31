import { useEffect, useRef, useState } from 'react';
import { Upload, Trash2, Copy, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { canManageAdmin } from '../roles';
import RestrictedNotice from '../RestrictedNotice';
import { listMedia, uploadMedia, updateMedia, deleteMedia, mediaUrl } from '../../../lib/contentApi';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const { user, token } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [altDraft, setAltDraft] = useState('');
  const fileInputRef = useRef(null);

  const load = () => {
    setIsLoading(true);
    listMedia(token).then(setItems).catch((err) => setError(err.message)).finally(() => setIsLoading(false));
  };

  useEffect(load, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of files) {
        const created = await uploadMedia(token, file);
        setItems((prev) => [created, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (media) => {
    if (!window.confirm(`Delete "${media.filename}"? This can't be undone.`)) return;
    try {
      await deleteMedia(token, media.id);
      setItems((prev) => prev.filter((m) => m.id !== media.id));
      if (selected?.id === media.id) setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDetail = (media) => {
    setSelected(media);
    setAltDraft(media.alt_text || '');
  };

  const saveAlt = async () => {
    try {
      const updated = await updateMedia(token, selected.id, { alt_text: altDraft || null });
      setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      setSelected(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyUrl = (media) => {
    navigator.clipboard?.writeText(mediaUrl(media)).catch(() => {});
  };

  return (
    <div>
      <div className="admin__header-row">
        <div>
          <h1 className="admin__title">Media Library</h1>
          <p className="admin__subtitle">Images used across destinations, species, projects, and articles.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          <Upload size={15} />
          <span>{uploading ? 'Uploading…' : 'Upload Media'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </div>

      {error && <div className="admin__error">{error}</div>}
      {isLoading && <div className="admin__loading">Loading…</div>}
      {!isLoading && items.length === 0 && <div className="admin__empty">No media uploaded yet.</div>}

      {!isLoading && items.length > 0 && (
        <div className="admin__media-grid">
          {items.map((media) => (
            <button key={media.id} className="admin__media-tile" onClick={() => openDetail(media)}>
              <img src={mediaUrl(media)} alt={media.alt_text || media.filename} loading="lazy" />
              <span className="admin__media-tile-name">{media.filename}</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="admin__modal-backdrop" onClick={() => setSelected(null)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin__modal-header">
              <h3>Image Details</h3>
              <button onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <img src={mediaUrl(selected)} alt={selected.alt_text || selected.filename} className="admin__media-preview" />
            <div className="admin__form">
              <label>File name<input type="text" value={selected.filename} disabled /></label>
              <label>
                Alt text
                <input type="text" value={altDraft} onChange={(e) => setAltDraft(e.target.value)} placeholder="Describe this image" />
              </label>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>
                {formatSize(selected.size_bytes)} · {selected.mime_type} · uploaded by {selected.uploaded_by?.full_name || selected.uploaded_by?.email || 'unknown'}
              </div>
              <div className="admin__form-actions">
                <button className="btn btn-primary" type="button" onClick={saveAlt}>Save</button>
                <button className="btn btn-ghost" type="button" onClick={() => copyUrl(selected)}>
                  <Copy size={15} /><span>Copy URL</span>
                </button>
                <button className="btn btn-ghost admin__danger-btn" type="button" onClick={() => handleDelete(selected)}>
                  <Trash2 size={15} /><span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
