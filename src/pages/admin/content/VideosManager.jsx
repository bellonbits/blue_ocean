import { useState, useRef } from 'react';
import {
  Upload,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  VideoOff,
  Link2,
  Image as ImageIcon,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { uploadMedia, mediaUrl } from '../../../lib/contentApi';
import { getVideoEmbedUrl, isDirectVideoFile } from '../../../lib/video';

/**
 * Capture a frame from an HTML5 video file and upload it as a thumbnail.
 */
async function captureVideoFrame(videoUrl, token) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = videoUrl;
    video.muted = true;
    video.currentTime = 1.0;

    video.onloadeddata = () => {
      video.currentTime = Math.min(1.0, video.duration ? video.duration / 2 : 1.0);
    };

    video.onseeked = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Failed to capture video frame'));
            return;
          }
          const file = new File([blob], `thumb_${Date.now()}.jpg`, { type: 'image/jpeg' });
          try {
            const media = await uploadMedia(token, file, 'Auto-generated video thumbnail');
            resolve(mediaUrl(media));
          } catch (err) {
            reject(err);
          }
        }, 'image/jpeg', 0.88);
      } catch (err) {
        reject(err);
      }
    };

    video.onerror = () => {
      reject(new Error('Could not load video to capture thumbnail. Please upload an image manually.'));
    };
  });
}

export default function VideosManager({ value, onChange }) {
  const { token } = useAuth();
  const [uploadingIdx, setUploadingIdx] = useState(null); // { index, field: 'video' | 'thumbnail' | 'auto' }
  const [error, setError] = useState(null);

  // Normalize array of video objects
  const videos = Array.isArray(value) ? value : [];

  const updateItem = (index, patch) => {
    const next = [...videos];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const handleAddVideo = () => {
    onChange([
      ...videos,
      {
        url: '',
        thumbnail: '',
        title: '',
        description: '',
        source: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(videos.filter((_, i) => i !== index));
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= videos.length) return;
    const next = [...videos];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  const handleFileUpload = async (index, file, field) => {
    if (!file) return;
    setUploadingIdx({ index, field });
    setError(null);
    try {
      const media = await uploadMedia(token, file);
      updateItem(index, { [field]: mediaUrl(media) });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleAutoThumbnail = async (index, videoUrl) => {
    if (!videoUrl) return;
    setUploadingIdx({ index, field: 'auto' });
    setError(null);
    try {
      const thumbUrl = await captureVideoFrame(videoUrl, token);
      updateItem(index, { thumbnail: thumbUrl });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="videos-manager">
      {error && <div className="gallery-manager__error">{error}</div>}

      {videos.length === 0 && (
        <div className="videos-manager__empty">
          <VideoOff size={24} className="videos-manager__empty-icon" />
          <p>No videos added yet. You can attach multiple videos with custom cover thumbnails.</p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleAddVideo}
          >
            <Plus size={14} />
            <span>Add First Video</span>
          </button>
        </div>
      )}

      {videos.length > 0 && (
        <div className="videos-manager__list">
          {videos.map((item, index) => {
            const isFile = isDirectVideoFile(item.url);
            const embedUrl = getVideoEmbedUrl(item.url);
            const isVideoUploading = uploadingIdx?.index === index && uploadingIdx?.field === 'video';
            const isThumbUploading = uploadingIdx?.index === index && uploadingIdx?.field === 'thumbnail';
            const isAutoCapturing = uploadingIdx?.index === index && uploadingIdx?.field === 'auto';

            return (
              <div key={index} className="videos-manager__card">
                {/* Header with order and action buttons */}
                <div className="videos-manager__card-header">
                  <div className="videos-manager__card-badge">
                    <span>Video #{index + 1}</span>
                    {index === 0 && <span className="videos-manager__primary-pill">Primary</span>}
                  </div>
                  <div className="videos-manager__card-actions">
                    <button
                      type="button"
                      className="btn-icon"
                      disabled={index === 0}
                      onClick={() => handleMove(index, -1)}
                      title="Move up"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon"
                      disabled={index === videos.length - 1}
                      onClick={() => handleMove(index, 1)}
                      title="Move down"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-icon--danger"
                      onClick={() => handleRemove(index)}
                      title="Remove video"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="videos-manager__card-grid">
                  {/* Left Column: Video File / URL */}
                  <div className="videos-manager__section">
                    <label className="videos-manager__label">Video Source (File or URL)</label>
                    <div className="videos-manager__preview-box">
                      {item.url ? (
                        isFile ? (
                          <video src={item.url} controls className="videos-manager__video-preview" />
                        ) : embedUrl ? (
                          <div className="video-picker__embed-preview">
                            <Link2 size={18} />
                            <span>Linked Video ({item.url.includes('youtube') ? 'YouTube' : item.url.includes('vimeo') ? 'Vimeo' : 'External'})</span>
                          </div>
                        ) : (
                          <div className="video-picker__embed-preview">
                            <VideoOff size={18} />
                            <span>Invalid video URL</span>
                          </div>
                        )
                      ) : (
                        <div className="videos-manager__unselected">
                          <VideoOff size={20} />
                          <span>No video file or link selected</span>
                        </div>
                      )}
                    </div>

                    <div className="videos-manager__input-row">
                      <label className="btn btn-outline btn-sm videos-manager__upload-label">
                        {isVideoUploading ? <Loader2 size={14} className="gallery-manager__spinner" /> : <Upload size={14} />}
                        <span>{isVideoUploading ? 'Uploading…' : item.url ? 'Replace File' : 'Upload Video'}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          hidden
                          disabled={isVideoUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = '';
                            handleFileUpload(index, file, 'video');
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        className="image-picker__url-input"
                        placeholder="or paste YouTube / Vimeo / MP4 URL"
                        value={item.url || ''}
                        onChange={(e) => updateItem(index, { url: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Right Column: Cover Thumbnail */}
                  <div className="videos-manager__section">
                    <label className="videos-manager__label">Cover Thumbnail (Poster Image)</label>
                    <div className="videos-manager__preview-box videos-manager__preview-box--thumb">
                      {item.thumbnail ? (
                        <div className="videos-manager__thumb-wrapper">
                          <img src={item.thumbnail} alt="" className="videos-manager__thumb-img" />
                          <button
                            type="button"
                            className="image-picker__remove"
                            onClick={() => updateItem(index, { thumbnail: '' })}
                            title="Remove cover thumbnail"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="videos-manager__unselected">
                          <ImageIcon size={20} />
                          <span>No cover thumbnail set</span>
                        </div>
                      )}
                    </div>

                    <div className="videos-manager__input-row">
                      <label className="btn btn-outline btn-sm videos-manager__upload-label">
                        {isThumbUploading ? <Loader2 size={14} className="gallery-manager__spinner" /> : <Upload size={14} />}
                        <span>{isThumbUploading ? 'Uploading…' : item.thumbnail ? 'Replace Cover' : 'Upload Cover'}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          hidden
                          disabled={isThumbUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = '';
                            handleFileUpload(index, file, 'thumbnail');
                          }}
                        />
                      </label>

                      {isFile && item.url && !item.thumbnail && (
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          disabled={isAutoCapturing}
                          onClick={() => handleAutoThumbnail(index, item.url)}
                          title="Capture video frame at 1s as thumbnail"
                        >
                          {isAutoCapturing ? <Loader2 size={14} className="gallery-manager__spinner" /> : <Sparkles size={14} />}
                          <span>Auto-Capture</span>
                        </button>
                      )}

                      <input
                        type="text"
                        className="image-picker__url-input"
                        placeholder="or paste image URL"
                        value={item.thumbnail || ''}
                        onChange={(e) => updateItem(index, { thumbnail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Metadata Row: Title, Source, Description */}
                <div className="videos-manager__meta-fields">
                  <div className="videos-manager__meta-row">
                    <label className="videos-manager__meta-input-group">
                      <span>Video Title</span>
                      <input
                        type="text"
                        placeholder="e.g. Bosaso Beach Turquoise Waters"
                        value={item.title || ''}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                      />
                    </label>
                    <label className="videos-manager__meta-input-group">
                      <span>Source / Credit</span>
                      <input
                        type="text"
                        placeholder="e.g. Community Submission / YouTube"
                        value={item.source || ''}
                        onChange={(e) => updateItem(index, { source: e.target.value })}
                      />
                    </label>
                  </div>
                  <label className="videos-manager__meta-input-group">
                    <span>Description (Optional caption)</span>
                    <textarea
                      rows={2}
                      placeholder="Brief description of what is shown in this video"
                      value={item.description || ''}
                      onChange={(e) => updateItem(index, { description: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            className="btn btn-outline videos-manager__add-btn"
            onClick={handleAddVideo}
          >
            <Plus size={16} />
            <span>Add Another Video</span>
          </button>
        </div>
      )}
    </div>
  );
}
