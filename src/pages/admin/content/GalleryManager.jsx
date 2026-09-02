import { useRef, useState } from 'react';
import { Upload, X, Loader2, Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadMedia, mediaUrl } from '../../../lib/contentApi';

// Lets an admin upload photos straight from disk, or paste an image URL
// directly (for content that already lives elsewhere and never needs to
// go through the Media Library), and add/remove them from a gallery
// array. Uploads go through the shared Media Library API (same one
// MediaPage.jsx uses); pasted URLs are added as-is. Either way the result
// is appended to the field's plain string[] value — the shape
// Destination.gallery expects.
export default function GalleryManager({ value, onChange }) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const urls = value || [];

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const uploaded = [];
      for (const file of files) {
        const media = await uploadMedia(token, file);
        uploaded.push(mediaUrl(media));
      }
      onChange([...urls, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...urls, url]);
    setUrlInput('');
  };

  const handleRemove = (url) => {
    onChange(urls.filter((u) => u !== url));
  };

  return (
    <div className="gallery-manager">
      {urls.length > 0 && (
        <div className="gallery-manager__grid">
          {urls.map((url) => (
            <div key={url} className="gallery-manager__tile">
              <img src={url} alt="" />
              <button
                type="button"
                className="gallery-manager__remove"
                onClick={() => handleRemove(url)}
                aria-label="Remove photo"
                title="Remove from gallery"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {urls.length === 0 && <div className="gallery-manager__empty">No photos yet.</div>}

      {error && <div className="gallery-manager__error">{error}</div>}

      <div className="image-picker__row">
        <button
          type="button"
          className="btn btn-outline btn-sm gallery-manager__upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={14} className="gallery-manager__spinner" /> : <Upload size={14} />}
          <span>{uploading ? 'Uploading…' : 'Upload Photos'}</span>
        </button>
        <input
          type="text"
          className="image-picker__url-input"
          placeholder="or paste an image URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddUrl();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handleAddUrl}
          disabled={!urlInput.trim()}
          aria-label="Add image URL"
          title="Add image URL"
        >
          <Plus size={14} />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        hidden
        onChange={handleFiles}
      />
    </div>
  );
}
