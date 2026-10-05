import { useState, useRef, useEffect } from 'react';
import { Play, Film, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { getVideoEmbedUrl, isDirectVideoFile } from '../../lib/video';
import './VideoEmbed.css';

/**
 * Premium Cinematic Video Player & Multi-Video Showcase.
 * Features:
 * - Perfectly centered glassmorphic play button with ambient pulse waves
 * - Multi-video top switcher tabs + bottom interactive playlist cards
 * - High-res cover thumbnail with film vignette & subtle grade
 * - Responsive 16:9 aspect ratio with Philips-style ambient glow aura
 * - Direct video file (.mp4) and external (YouTube/Vimeo) player handling
 */
export default function VideoEmbed({
  url,
  thumbnail,
  videos,
  title = 'Video',
  videoTitle,
  videoDescription,
  videoSource,
}) {
  // Normalize into a standardized video items array
  const videoList = Array.isArray(videos) && videos.length > 0
    ? videos.filter((v) => v && (v.url || v.video_url))
    : url
    ? [
        {
          url,
          thumbnail: thumbnail || null,
          title: videoTitle || title,
          description: videoDescription || null,
          source: videoSource || null,
        },
      ]
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Auto-pause / reset state when active video changes
  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  if (videoList.length === 0) return null;

  const activeVideo = videoList[activeIndex] || videoList[0];
  const activeUrl = activeVideo.url || activeVideo.video_url;
  const activeThumbnail = activeVideo.thumbnail || activeVideo.cover_image || activeVideo.video_thumbnail || thumbnail;
  const activeTitle = activeVideo.title || activeVideo.video_title || (videoList.length > 1 ? `Video ${activeIndex + 1}` : videoTitle || title);
  const activeDescription = activeVideo.description || activeVideo.video_description || videoDescription;
  const activeSource = activeVideo.source || activeVideo.video_source || videoSource;

  const embedUrl = getVideoEmbedUrl(activeUrl);
  const isFile = isDirectVideoFile(activeUrl);

  if (!embedUrl && !isFile) return null;

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (isFile && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const hasCaption = activeTitle || activeDescription || activeSource;

  return (
    <div className="video-cinema-wrapper" aria-label="Cinematic Video Showcase">
      {/* Top Bar: Category badge & quick segment pills */}
      <div className="video-cinema__header">
        <div className="video-cinema__eyebrow">
          <span className="video-cinema__live-dot" />
          <Film size={14} className="video-cinema__eyebrow-icon" />
          <span className="video-cinema__eyebrow-text">Coastal Video Archive</span>
        </div>

        {videoList.length > 1 && (
          <div className="video-cinema__tabs">
            {videoList.map((item, idx) => {
              const tabTitle = item.title || item.video_title || `Video ${idx + 1}`;
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`video-cinema__tab ${isCurrent ? 'video-cinema__tab--active' : ''}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  aria-pressed={isCurrent}
                >
                  <span className="video-cinema__tab-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="video-cinema__tab-title">{tabTitle}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Screen with Ambient Aura */}
      <div className="video-cinema__stage">
        {/* Soft Ambient Light Glow behind player */}
        <div className="video-cinema__ambient-glow" aria-hidden="true" />

        <div className="video-cinema__screen">
          {/* Cover Mode (Shows high-res poster & centered pulsating play button) */}
          {activeThumbnail && !isPlaying ? (
            <div
              className="video-cinema__cover"
              onClick={handleStartPlay}
              role="button"
              tabIndex={0}
              aria-label={`Play: ${activeTitle}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStartPlay();
                }
              }}
            >
              <img
                src={activeThumbnail}
                alt={activeTitle}
                className="video-cinema__cover-img"
                loading="lazy"
              />

              {/* Scrims for depth & contrast */}
              <div className="video-cinema__scrim-top" />
              <div className="video-cinema__scrim-bottom" />
              <div className="video-cinema__vignette" />

              {/* Floating Top Tag inside video */}
              <div className="video-cinema__cover-badge-top">
                <span className="video-cinema__cover-pill">
                  <Sparkles size={12} className="video-cinema__pill-icon" />
                  <span>HD Field Footage</span>
                </span>
                {videoList.length > 1 && (
                  <span className="video-cinema__cover-count">
                    {activeIndex + 1} of {videoList.length}
                  </span>
                )}
              </div>

              {/* Dead-Center Floating Glassmorphic Play Button */}
              <div className="video-cinema__play-center">
                <button
                  type="button"
                  className="video-cinema__play-orb"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPlay();
                  }}
                  aria-label="Start video playback"
                >
                  <div className="video-cinema__play-ring-outer" />
                  <div className="video-cinema__play-ring-inner" />
                  <div className="video-cinema__play-disc">
                    <Play size={30} className="video-cinema__play-triangle" />
                  </div>
                </button>
                <div className="video-cinema__play-hint">
                  <span>Watch Video</span>
                </div>
              </div>

              {/* Bottom Metadata inside cover */}
              <div className="video-cinema__cover-footer">
                {activeTitle && (
                  <h3 className="video-cinema__cover-title">{activeTitle}</h3>
                )}
                {activeSource && (
                  <div className="video-cinema__cover-source">
                    <Compass size={13} />
                    <span>{activeSource}</span>
                  </div>
                )}
              </div>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl + (isPlaying ? (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1') : '')}
              title={activeTitle || title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              src={activeUrl}
              poster={activeThumbnail || undefined}
              controls
              autoPlay={isPlaying}
              preload="metadata"
              playsInline
            />
          )}
        </div>
      </div>

      {/* Description Strip below video */}
      {hasCaption && (
        <div className="video-cinema__caption-strip">
          <div className="video-cinema__caption-main">
            {activeTitle && <h4 className="video-cinema__caption-title">{activeTitle}</h4>}
            {activeDescription && <p className="video-cinema__caption-desc">{activeDescription}</p>}
          </div>
          {activeSource && (
            <div className="video-cinema__caption-meta">
              <span className="video-cinema__caption-source-label">Source / Credit</span>
              <span className="video-cinema__caption-source-val">{activeSource}</span>
            </div>
          )}
        </div>
      )}

      {/* Interactive Playlist Carousel (When multiple videos are attached) */}
      {videoList.length > 1 && (
        <div className="video-cinema__playlist" aria-label="Available videos in series">
          <div className="video-cinema__playlist-header">
            <div className="video-cinema__playlist-title-wrap">
              <Film size={15} />
              <span>Available Footage in this Gallery</span>
            </div>
            <span className="video-cinema__playlist-pill">
              {videoList.length} Videos
            </span>
          </div>

          <div className="video-cinema__playlist-grid">
            {videoList.map((item, idx) => {
              const itemThumb = item.thumbnail || item.cover_image || item.video_thumbnail || thumbnail;
              const itemTitle = item.title || item.video_title || `Video ${idx + 1}`;
              const itemSource = item.source || item.video_source;
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  className={`video-cinema__card ${isSelected ? 'video-cinema__card--active' : ''}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(true);
                  }}
                  aria-pressed={isSelected}
                >
                  <div className="video-cinema__card-thumb-wrap">
                    {itemThumb ? (
                      <img src={itemThumb} alt={itemTitle} className="video-cinema__card-thumb" loading="lazy" />
                    ) : (
                      <div className="video-cinema__card-fallback">
                        <Film size={22} />
                      </div>
                    )}
                    <span className="video-cinema__card-index">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="video-cinema__card-action-badge">
                      {isSelected ? (
                        <div className="video-cinema__now-playing">
                          <span className="video-cinema__bar video-cinema__bar--1" />
                          <span className="video-cinema__bar video-cinema__bar--2" />
                          <span className="video-cinema__bar video-cinema__bar--3" />
                        </div>
                      ) : (
                        <Play size={12} className="video-cinema__card-play-icon" />
                      )}
                    </div>
                  </div>

                  <div className="video-cinema__card-body">
                    <div className="video-cinema__card-top-tag">
                      {isSelected ? (
                        <span className="video-cinema__tag--playing">
                          <CheckCircle2 size={11} />
                          <span>Now Selected</span>
                        </span>
                      ) : (
                        <span className="video-cinema__tag--track">Clip {idx + 1}</span>
                      )}
                    </div>
                    <span className="video-cinema__card-title">{itemTitle}</span>
                    {itemSource && (
                      <span className="video-cinema__card-source">{itemSource}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
