// Shared helpers for the site's single `video_url` field (used by
// VideoPicker in the admin and VideoEmbed on the public site) — a video
// can be either a pasted YouTube/Vimeo link or a directly uploaded file
// URL from the Media Library, and both places need to tell those apart
// the same way.

const YOUTUBE_RE = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/;
const VIMEO_RE = /vimeo\.com\/(?:video\/)?(\d+)/;

export function getVideoEmbedUrl(url) {
  if (!url) return null;

  const youtubeMatch = url.match(YOUTUBE_RE);
  if (youtubeMatch) return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}`;

  const vimeoMatch = url.match(VIMEO_RE);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

export function isDirectVideoFile(url) {
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}
