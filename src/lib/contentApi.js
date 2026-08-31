// Talks to the FastAPI public content endpoints (regions, destinations, …)
// plus the parallel /admin/all and /admin/{id} routes the admin CMS uses to
// see unpublished rows. Same request() shape as adminApi.js.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

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

export async function listRegions() {
  const regions = await request('/regions');
  return regions.map(adaptRegion);
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
    coordinates: { lat: d.latitude, lng: d.longitude },
    bestSeason: d.best_season,
    access: d.access,
    featured: d.featured,
    highlights: d.highlights || [],
    status: d.status,
  };
}

export async function listDestinations(params = {}) {
  const query = new URLSearchParams(params).toString();
  const destinations = await request(`/destinations${query ? `?${query}` : ''}`);
  return destinations.map(adaptDestination);
}

export async function getDestination(slug) {
  const d = await request(`/destinations/${slug}`);
  return adaptDestination(d);
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
