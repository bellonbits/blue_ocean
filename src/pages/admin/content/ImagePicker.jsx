import { useRef, useState } from 'react';
import { Upload, X, Loader2, ImageOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadMedia, mediaUrl } from '../../../lib/contentApi';

// Single-image counterpart to GalleryManager, for fields like hero_image —
// upload a file (goes through the Media Library API, same as the gallery
// widget) or fall back to pasting a URL by hand, since older content still
// points at plain static paths (e.g. /somalia_coast.jpg) that never went
// through an upload.
export default function ImagePicker({ value, onChange }) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const media = await uploadMedia(token, file);
      onChange(mediaUrl(media));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-picker">
      {value ? (
        <div className="image-picker__preview">
          <img src={value} alt="" />
          <button
            type="button"
            className="image-picker__remove"
            onClick={() => onChange('')}
            aria-label="Remove image"
            title="Remove image"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <div className="image-picker__empty">
          <ImageOff size={18} />
          <span>No image set</span>
        </div>
      )}

      {error && <div className="gallery-manager__error">{error}</div>}

      <div className="image-picker__row">
        <button
          type="button"
          className="btn btn-outline btn-sm gallery-manager__upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={14} className="gallery-manager__spinner" /> : <Upload size={14} />}
          <span>{uploading ? 'Uploading…' : value ? 'Replace Image' : 'Upload Image'}</span>
        </button>
        <input
          type="text"
          className="image-picker__url-input"
          placeholder="or paste an image URL"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}
