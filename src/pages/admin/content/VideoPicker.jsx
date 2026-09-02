import { useRef, useState } from 'react';
import { Upload, X, Loader2, VideoOff, Link2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadMedia, mediaUrl } from '../../../lib/contentApi';
import { getVideoEmbedUrl, isDirectVideoFile } from '../../../lib/video';

// Single-video counterpart to ImagePicker — upload a file (through the
// Media Library, same as images) or paste a YouTube/Vimeo URL. Stored as
// a plain string, same shape as an 'image' field, so the same
// destination/species/research/etc. column just holds either kind of URL.
export default function VideoPicker({ value, onChange }) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const embedUrl = getVideoEmbedUrl(value);
  const isFile = isDirectVideoFile(value);

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
          {isFile ? (
            <video src={value} controls className="video-picker__video" />
          ) : embedUrl ? (
            <div className="video-picker__embed-preview">
              <Link2 size={18} />
              <span>Linked video — will embed on the page</span>
            </div>
          ) : (
            <div className="video-picker__embed-preview">
              <VideoOff size={18} />
              <span>URL doesn't look like YouTube, Vimeo, or a video file</span>
            </div>
          )}
          <button
            type="button"
            className="image-picker__remove"
            onClick={() => onChange('')}
            aria-label="Remove video"
            title="Remove video"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <div className="image-picker__empty">
          <VideoOff size={18} />
          <span>No video set</span>
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
          <span>{uploading ? 'Uploading…' : value ? 'Replace Video' : 'Upload Video'}</span>
        </button>
        <input
          type="text"
          className="image-picker__url-input"
          placeholder="or paste a YouTube / Vimeo URL"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}
