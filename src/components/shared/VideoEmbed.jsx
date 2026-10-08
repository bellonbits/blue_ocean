import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize,
  Heart,
  Search,
  Film,
  Sparkles,
} from 'lucide-react';
import { getVideoEmbedUrl, isDirectVideoFile } from '../../lib/video';
import './VideoEmbed.css';

// Default rich coastal documentary footage if not enough clips provided
const DEFAULT_COASTAL_SERIES = [
  {
    url: '/bosaso_harbor.mp4',
    thumbnail: '/bosaso_harbor_thumb.webp',
    title: 'Bosaso Deep Water Harbor & Marine Outpost',
    description: 'Northern commercial shipping terminal and marine research sanctuary anchoring the Gulf of Aden acoustic telemetry array.',
    views: '786,374',
    likes: '1.3M',
    duration: '03:28 / 04:23',
    progress: 72,
  },
  {
    url: '/bosaso_coastal_life.mp4',
    thumbnail: '/bosaso_life_thumb.webp',
    title: 'Gulf of Aden Artisanal Dhow Seafaring & Coral Coves',
    description: 'Traditional Swahili-Somali wooden dhow fleets navigating dawn sea breezes past living barrier reefs and turquoise lagoons.',
    views: '542,190',
    likes: '890K',
    duration: '02:45 / 03:50',
    progress: 45,
  },
  {
    url: '/1005.mp4',
    thumbnail: '/bosaso_beach_thumb.webp',
    title: 'Ras Hafun Continental Tombolo & Whale Migration Corridor',
    description: 'Africa’s easternmost headland where towering limestone bluffs plunge into cobalt oceanic waters and green turtle hatcheries.',
    views: '1,240,650',
    likes: '2.1M',
    duration: '04:12 / 05:00',
    progress: 80,
  },
  {
    url: '/1002(1).mp4',
    thumbnail: '/1002-Cover.webp',
    title: 'Bajuni Coral Atoll Archipelago & Turquoise Estuaries',
    description: 'An untouched southern island constellation safeguarding critical blue carbon mangrove forests and rare marine habitats.',
    views: '934,810',
    likes: '1.6M',
    duration: '03:15 / 04:10',
    progress: 55,
  },
];

export default function VideoEmbed({
  url,
  thumbnail,
  videos,
  title = 'Video',
  videoTitle,
  videoDescription,
  videoSource,
}) {
  // Normalize passed videos
  const userVideos = Array.isArray(videos) && videos.length > 0
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

  // Combine user videos with default coastal series to ensure at least 4 items for the following row
  const combinedList = [...userVideos];
  DEFAULT_COASTAL_SERIES.forEach((def) => {
    if (!combinedList.some((v) => (v.url || v.video_url) === def.url)) {
      combinedList.push(def);
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1300000);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState('03:28');
  const [durationStr, setDurationStr] = useState('04:23');
  const [progressPercent, setProgressPercent] = useState(65);

  const videoRef = useRef(null);
  const screenRef = useRef(null);

  const activeVideo = combinedList[activeIndex] || combinedList[0];
  const activeUrl = activeVideo?.url || activeVideo?.video_url;
  const activeThumbnail =
    activeVideo?.thumbnail ||
    activeVideo?.cover_image ||
    activeVideo?.video_thumbnail ||
    thumbnail ||
    '/images/img_02.webp';
  const activeTitle =
    activeVideo?.title ||
    activeVideo?.video_title ||
    videoTitle ||
    title ||
    'Coastal Marine Expedition';
  const activeDescription =
    activeVideo?.description ||
    activeVideo?.video_description ||
    videoDescription ||
    'High-definition coastal documentary chronicle documenting marine sanctuaries, pelagic research, and coral ecology.';
  const activeViews = activeVideo?.views || '786,374';
  const activeLikes = isLiked ? '1.4M' : (activeVideo?.likes || '1.3M');

  const embedUrl = activeUrl ? getVideoEmbedUrl(activeUrl) : null;
  const isFile = activeUrl ? isDirectVideoFile(activeUrl) : false;

  // Auto-pause / reset state when active video changes
  useEffect(() => {
    setIsPlaying(false);
    if (activeVideo?.duration) {
      const parts = activeVideo.duration.split('/');
      if (parts[0] && parts[1]) {
        setCurrentTimeStr(parts[0].trim());
        setDurationStr(parts[1].trim());
      }
    }
    if (activeVideo?.progress != null) {
      setProgressPercent(activeVideo.progress);
    }
  }, [activeIndex]);

  const handleStartPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (isFile && videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (isFile && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleSkipNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % combinedList.length);
  };

  const handleSkipPrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + combinedList.length) % combinedList.length);
  };

  const handleToggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!screenRef.current) return;
    if (!document.fullscreenElement) {
      screenRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleToggleLike = (e) => {
    e?.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgressPercent((current / duration) * 100);

    const curMin = Math.floor(current / 60);
    const curSec = Math.floor(current % 60);
    const durMin = Math.floor(duration / 60);
    const durSec = Math.floor(duration % 60);
    setCurrentTimeStr(`${String(curMin).padStart(2, '0')}:${String(curSec).padStart(2, '0')}`);
    setDurationStr(`${String(durMin).padStart(2, '0')}:${String(durSec).padStart(2, '0')}`);
  };

  // Filtered list for "Following" row based on search query
  const displayFollowing = combinedList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const itemTitle = (item.title || item.video_title || '').toLowerCase();
    const itemDesc = (item.description || item.video_description || '').toLowerCase();
    return itemTitle.includes(q) || itemDesc.includes(q);
  });

  return (
    <div className="vplayer-container" aria-label="Modern Video Player">
      {/* 1. Top Search Bar Pill ("What are you looking for?") */}
      <div className="vplayer-search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="vplayer-search-input"
          aria-label="Search coastal footage"
        />
        <Search size={18} className="vplayer-search-icon" />
      </div>

      {/* 2. Main Video Showcase Card */}
      <div className="vplayer-card">
        {/* Video Canvas Stage */}
        <div className="vplayer-screen" ref={screenRef}>
          {activeThumbnail && !isPlaying ? (
            <div
              className="vplayer-poster-wrap"
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
                className="vplayer-poster-img"
              />
              <div className="vplayer-poster-scrim" />
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl + (isPlaying ? (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1') : '')}
              title={activeTitle}
              className="vplayer-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              src={activeUrl}
              poster={activeThumbnail}
              className="vplayer-html-video"
              onTimeUpdate={handleTimeUpdate}
              controls={false}
              autoPlay={isPlaying}
              playsInline
            />
          )}

          {/* Floating Frosted Glass Controller Capsule on Bottom-Left */}
          <div className="vplayer-ctrl-pill" onClick={(e) => e.stopPropagation()}>
            {/* Skip Back */}
            <button
              type="button"
              className="vplayer-ctrl-btn"
              onClick={handleSkipPrev}
              aria-label="Previous video"
            >
              <SkipBack size={15} />
            </button>

            {/* Play/Pause Button (Accent Round Button) */}
            <button
              type="button"
              className="vplayer-ctrl-play"
              onClick={handleStartPlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
              )}
            </button>

            {/* Skip Forward */}
            <button
              type="button"
              className="vplayer-ctrl-btn"
              onClick={handleSkipNext}
              aria-label="Next video"
            >
              <SkipForward size={15} />
            </button>

            {/* Scrubber Progress & Timestamps */}
            <div className="vplayer-ctrl-time-wrap">
              <span className="vplayer-ctrl-time">
                {currentTimeStr}/{durationStr}
              </span>
              <div className="vplayer-ctrl-progress-bar">
                <div
                  className="vplayer-ctrl-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Maximize Fullscreen */}
            <button
              type="button"
              className="vplayer-ctrl-btn"
              onClick={handleToggleFullscreen}
              aria-label="Fullscreen"
            >
              <Maximize size={15} />
            </button>
          </div>
        </div>

        {/* Video Info: Title, Views, Like Button, and Description */}
        <div className="vplayer-info">
          <div className="vplayer-info-top">
            <div className="vplayer-meta-left">
              <h3 className="vplayer-title">{activeTitle}</h3>
              <span className="vplayer-views">{activeViews} views</span>
            </div>

            {/* Right Like Button Pill */}
            <button
              type="button"
              className={`vplayer-like-btn ${isLiked ? 'vplayer-like-btn--active' : ''}`}
              onClick={handleToggleLike}
              aria-label="Like video"
            >
              <div className="vplayer-like-icon-circle">
                <Heart size={14} fill={isLiked ? '#ffffff' : '#ffffff'} />
              </div>
              <span className="vplayer-like-count">{activeLikes}</span>
            </button>
          </div>

          <p className="vplayer-description">{activeDescription}</p>
        </div>
      </div>

      {/* 3. "Following" Row of Video Thumbnail Cards */}
      <div className="vplayer-following-section">
        <div className="vplayer-following-header">
          <div className="vplayer-following-icon-wrap">
            <Play size={14} fill="currentColor" />
          </div>
          <span className="vplayer-following-title">Following</span>
        </div>

        <div className="vplayer-following-row">
          {displayFollowing.slice(0, 4).map((item, idx) => {
            const isCurrent = (item.url || item.video_url) === activeUrl;
            const itemThumb =
              item.thumbnail ||
              item.cover_image ||
              item.video_thumbnail ||
              DEFAULT_COASTAL_SERIES[idx % DEFAULT_COASTAL_SERIES.length].thumbnail;

            return (
              <div
                key={idx}
                className={`vplayer-thumb-card ${isCurrent ? 'vplayer-thumb-card--active' : ''}`}
                onClick={() => {
                  const globalIdx = combinedList.findIndex(
                    (v) => (v.url || v.video_url) === (item.url || item.video_url)
                  );
                  setActiveIndex(globalIdx >= 0 ? globalIdx : idx);
                  setIsPlaying(true);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select video: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(idx);
                    setIsPlaying(true);
                  }
                }}
              >
                <img
                  src={itemThumb}
                  alt={item.title || `Video ${idx + 1}`}
                  className="vplayer-thumb-img"
                  loading="lazy"
                />
                <div className="vplayer-thumb-overlay">
                  <div className="vplayer-thumb-play-circle">
                    <Play size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
