import { getVideoEmbedUrl, isDirectVideoFile } from '../../lib/video';
import './VideoEmbed.css';

// Renders a video_url field as either a YouTube/Vimeo iframe embed or a
// native <video> player for a directly uploaded file — same duality the
// admin VideoPicker offers when setting the field. Renders nothing at
// all when no url is set, so no page ever shows an empty video slot.
//
// `title` is only the iframe's accessibility label (never shown on the
// page) — the visible caption is entirely driven by videoTitle/
// videoDescription/videoSource, so a video with no metadata set shows no
// caption block at all rather than falling back to the page's own title.
export default function VideoEmbed({ url, title = 'Video', videoTitle, videoDescription, videoSource }) {
  if (!url) return null;

  const embedUrl = getVideoEmbedUrl(url);
  const isFile = isDirectVideoFile(url);
  if (!embedUrl && !isFile) return null;

  const hasCaption = videoTitle || videoDescription || videoSource;

  return (
    <div className="video-embed-block">
      <div className="video-embed">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <video src={url} controls preload="metadata" />
        )}
      </div>

      {hasCaption && (
        <div className="video-embed__caption">
          {videoTitle && <h4 className="video-embed__title">{videoTitle}</h4>}
          {videoDescription && <p className="video-embed__desc">{videoDescription}</p>}
          {videoSource && <p className="video-embed__source">Source: {videoSource}</p>}
        </div>
      )}
    </div>
  );
}
