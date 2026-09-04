// Talks to the FastAPI public content endpoints (regions, destinations, …)
// plus the parallel /admin/all and /admin/{id} routes the admin CMS uses to
// see unpublished rows. Same request() shape as adminApi.js.

import { supabase } from './supabaseClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (err) {
    // The backend itself is unreachable (down, DNS failure, offline,
    // CORS) — distinct from a reachable backend returning an error
    // response, so callers can choose to fail over to Supabase only for
    // this class of failure rather than for e.g. a genuine 404.
    const networkError = new Error(`Blue Ocean API unreachable: ${err.message}`);
    networkError.isNetworkError = true;
    throw networkError;
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.detail || `Request failed with status ${res.status}`);
  }

  return data;
}

function withAuth(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---- Regions ----------------------------------------------------------

// Maps API RegionRead -> the shape RegionCards.jsx / WhereWeWork.jsx expect
// from the old src/data/regions.js (see contentApi adapter notes below).
function adaptRegion(r) {
  return {
    id: r.slug,
    dbId: r.id,
    slug: r.slug,
    name: r.name,
    subtitle: r.subtitle,
    tagline: r.tagline,
    description: r.description,
    image: r.image,
    coastlineKm: r.coastline_km,
    seas: r.seas || [],
    highlights: r.highlights || [],
    destinationsCount: r.destinations_count,
  };
}

// Supabase fallback for listRegions() — same public shape via adaptRegion,
// only reached when the FastAPI backend itself is unreachable. Mirrors
// the backend's own destinations_count logic (a straight count of every
// destination row with that region_id, not filtered by status).
async function listRegionsFromSupabase() {
  const [{ data: regions, error: regionsError }, { data: destinations, error: destError }] = await Promise.all([
    supabase.from('regions').select('*').order('name'),
    supabase.from('destinations').select('region_id'),
  ]);
  if (regionsError) throw regionsError;
  if (destError) throw destError;

  const counts = {};
  (destinations || []).forEach((d) => { counts[d.region_id] = (counts[d.region_id] || 0) + 1; });

  return (regions || [])
    .map((r) => adaptRegion({ ...r, destinations_count: counts[r.id] || 0 }));
}

export async function listRegions(lang) {
  try {
    const query = lang && lang !== 'en' ? `?lang=${lang}` : '';
    const regions = await request(`/regions${query}`);
    return regions.map(adaptRegion);
  } catch (err) {
    if (err.isNetworkError && supabase) return listRegionsFromSupabase();
    throw err;
  }
}

// Admin functions return the raw API shape (snake_case, matches the
// Create/Update schemas exactly) — only the public functions above adapt to
// the legacy component shape.
export function adminListRegions(token) {
  return request('/regions/admin/all', { headers: withAuth(token) });
}

export function adminGetRegion(token, id) {
  return request(`/regions/admin/${id}`, { headers: withAuth(token) });
}

export function createRegion(token, payload) {
  return request('/regions', { method: 'POST', headers: withAuth(token), body: JSON.stringify(payload) });
}

export function updateRegion(token, id, payload) {
  return request(`/regions/${id}`, { method: 'PATCH', headers: withAuth(token), body: JSON.stringify(payload) });
}

export function deleteRegion(token, id) {
  return request(`/regions/${id}`, { method: 'DELETE', headers: withAuth(token) });
}

// ---- Destinations -------------------------------------------------------

// Maps API DestinationRead -> the shape the coast components expect from
// the old src/data/destinations.js. marineSpecies/researchProjects/
// experiences aren't sourced from the API yet (those domains aren't live —
// see Phase 2 of the CMS plan), so callers that need them merge in the
// static bridge themselves (see DestinationDetailPage.jsx).
export function adaptDestination(d) {
  return {
    id: d.slug,
    dbId: d.id,
    slug: d.slug,
    name: d.name,
    region: d.region?.name,
    regionId: d.region?.slug,
    location: d.location,
    coastlineArea: d.coastline_area,
    destinationType: d.destination_type,
    tagline: d.tagline,
    shortDescription: d.short_description,
    fullDescription: d.full_description,
    heroImage: d.hero_image,
    gallery: d.gallery || [],
    videoUrl: d.video_url || null,
    videoTitle: d.video_title || null,
    videoDescription: d.video_description || null,
    videoSource: d.video_source || null,
    coordinates: { lat: d.latitude, lng: d.longitude },
    bestSeason: d.best_season,
    access: d.access,
    featured: d.featured,
    highlights: d.highlights || [],
    status: d.status,
  };
}

// Supabase fallback for listDestinations()/getDestination() — only
// reached when the FastAPI backend itself is unreachable. Filtering by
// region/featured happens client-side after the fetch rather than via
// PostgREST's embedded-resource filter syntax, trading a slightly
// larger one-off fetch for a much simpler, harder-to-get-wrong query on
// a path that's exercised only during an outage.
async function listDestinationsFromSupabase(params = {}) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*, region:regions(id,slug,name)')
    .eq('status', 'published')
    .order('name');
  if (error) throw error;

  let destinations = (data || []).map(adaptDestination);
  if (params.region) destinations = destinations.filter((d) => d.regionId === params.region);
  if (params.featured !== undefined) {
    const wantFeatured = params.featured === 'true' || params.featured === true;
    destinations = destinations.filter((d) => d.featured === wantFeatured);
  }
  return destinations;
}

async function getDestinationFromSupabase(slug) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*, region:regions(id,slug,name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) throw error;
  return adaptDestination(data);
}

export async function listDestinations(params = {}) {
  try {
    const { lang, ...rest } = params;
    const queryParams = { ...rest };
    if (lang && lang !== 'en') queryParams.lang = lang;
    const query = new URLSearchParams(queryParams).toString();
    const destinations = await request(`/destinations${query ? `?${query}` : ''}`);
    return destinations.map(adaptDestination);
  } catch (err) {
    if (err.isNetworkError && supabase) return listDestinationsFromSupabase(params);
    throw err;
  }
}

// Real photos of a destination sourced from Google Places (New) on the
// backend — returns [] when Google Places isn't configured or has no
// coverage for this place, so callers should always have a local-image
// fallback ready (see PlaceImage.jsx).
export async function getDestinationPhotos(slug) {
  const photos = await request(`/destinations/${slug}/photos`);
  return photos.map((p) => ({ ...p, url: `${API_BASE_URL}${p.url}` }));
}

// ---- Related content (news articles linked to a destination/species/etc.) ----
//
// News articles already carry real many-to-many links to destinations,
// species, research projects, and conservation projects at the database
// level (see backend/app/models/news_article.py) — this just adapts the
// API's snake_case article shape to what ArticleCard.jsx expects.
function adaptArticleSummary(a) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    featuredImage: a.featured_image,
    categoryLabel: a.category?.label,
    categoryBadgeClass: a.category?.badge_class,
    displayDate: a.display_date || a.date,
    readTime: a.read_time,
  };
}

export async function getRelatedNews({ destination, species, researchProject, conservationProject } = {}) {
  const params = new URLSearchParams();
  if (destination) params.set('destination', destination);
  if (species) params.set('species', species);
  if (researchProject) params.set('research_project', researchProject);
  if (conservationProject) params.set('conservation_project', conservationProject);
  const articles = await request(`/news-articles?${params.toString()}`);
  return articles.map(adaptArticleSummary);
}

export async function getDestination(slug, lang) {
  try {
    const query = lang && lang !== 'en' ? `?lang=${lang}` : '';
    const d = await request(`/destinations/${slug}${query}`);
    return adaptDestination(d);
  } catch (err) {
    if (err.isNetworkError && supabase) return getDestinationFromSupabase(slug);
    throw err;
  }
}

export function adminListDestinations(token) {
  return request('/destinations/admin/all', { headers: withAuth(token) });
}

export function adminGetDestination(token, id) {
  return request(`/destinations/admin/${id}`, { headers: withAuth(token) });
}

export function createDestination(token, payload) {
  return request('/destinations', { method: 'POST', headers: withAuth(token), body: JSON.stringify(payload) });
}

export function updateDestination(token, id, payload) {
  return request(`/destinations/${id}`, { method: 'PATCH', headers: withAuth(token), body: JSON.stringify(payload) });
}

export function deleteDestination(token, id) {
  return request(`/destinations/${id}`, { method: 'DELETE', headers: withAuth(token) });
}

// ---- Generic admin CRUD for the remaining content areas ------------------
//
// These resources don't have their public pages wired to the API yet (that's
// still static src/data/*.js — see the CMS plan's Phase 2), so unlike
// Regions/Destinations above there's no public-shape adapter here, just the
// raw admin CRUD every resource needs: list all (any status), get one,
// create, update, delete. One factory instead of repeating the same five
// functions 16 times.
function makeAdminResource(path) {
  return {
    list: (token) => request(`${path}/admin/all`, { headers: withAuth(token) }),
    get: (token, id) => request(`${path}/admin/${id}`, { headers: withAuth(token) }),
    create: (token, payload) => request(path, { method: 'POST', headers: withAuth(token), body: JSON.stringify(payload) }),
    update: (token, id, payload) =>
      request(`${path}/${id}`, { method: 'PATCH', headers: withAuth(token), body: JSON.stringify(payload) }),
    remove: (token, id) => request(`${path}/${id}`, { method: 'DELETE', headers: withAuth(token) }),
  };
}

export const adminExperienceCategories = makeAdminResource('/experience-categories');
export const adminExperiences = makeAdminResource('/experiences');
export const adminSpeciesCategories = makeAdminResource('/species-categories');
export const adminSpecies = makeAdminResource('/species');
export const adminResearchAreas = makeAdminResource('/research-areas');
export const adminMethodologies = makeAdminResource('/methodologies');
export const adminResearchTeams = makeAdminResource('/research-teams');
export const adminResearchProjects = makeAdminResource('/research-projects');
export const adminExpeditions = makeAdminResource('/expeditions');
export const adminConservationFocusAreas = makeAdminResource('/conservation-focus-areas');
export const adminConservationIssues = makeAdminResource('/conservation-issues');
export const adminConservationProjects = makeAdminResource('/conservation-projects');
export const adminCommunities = makeAdminResource('/communities');
export const adminCommunityStories = makeAdminResource('/community-stories');
export const adminNewsCategories = makeAdminResource('/news-categories');
export const adminNewsArticles = makeAdminResource('/news-articles');
export const adminTeamMembers = makeAdminResource('/team-members');

// ---- Team members (public) ------------------------------------------

export function listTeamMembers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/team-members${query ? `?${query}` : ''}`);
}

export function getTeamMember(slug) {
  return request(`/team-members/${slug}`);
}

// ---- Media library ---------------------------------------------------
//
// Upload is multipart, not JSON, so it bypasses request()'s default
// Content-Type header (the browser sets the multipart boundary itself).

export function mediaUrl(media) {
  return `${API_BASE_URL}${media.url}`;
}

export function listMedia(token) {
  return request('/media', { headers: withAuth(token) });
}

export function uploadMedia(token, file, altText) {
  const formData = new FormData();
  formData.append('file', file);
  if (altText) formData.append('alt_text', altText);
  return fetch(`${API_BASE_URL}/api/v1/media`, {
    method: 'POST',
    headers: withAuth(token),
    body: formData,
  }).then(async (res) => {
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.detail || `Upload failed with status ${res.status}`);
    return data;
  });
}

export function updateMedia(token, id, payload) {
  return request(`/media/${id}`, { method: 'PATCH', headers: withAuth(token), body: JSON.stringify(payload) });
}

export function deleteMedia(token, id) {
  return request(`/media/${id}`, { method: 'DELETE', headers: withAuth(token) });
}
