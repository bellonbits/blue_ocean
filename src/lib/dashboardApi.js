// The member dashboard's own endpoints — saved items and experience
// interests. Every call here is user-scoped (Bearer token required),
// unlike contentApi.js's public GETs. Same request()/withAuth() shape as
// adminApi.js and contentApi.js.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, token, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

// ---- Saved items ----------------------------------------------------

export function listSavedItems(token, contentType) {
  const query = contentType ? `?content_type=${contentType}` : '';
  return request(`/saved-items/me${query}`, token);
}

/** Saves if not already saved, un-saves if it is. Returns the row (saved) or null (un-saved). */
export function toggleSavedItem(token, contentType, contentSlug) {
  return request('/saved-items/toggle', token, {
    method: 'POST',
    body: JSON.stringify({ content_type: contentType, content_slug: contentSlug }),
  });
}

export function deleteSavedItem(token, id) {
  return request(`/saved-items/${id}`, token, { method: 'DELETE' });
}

// ---- Experience interests --------------------------------------------

export function listExperienceInterests(token) {
  return request('/experience-interests/me', token);
}

/** Upsert: sets (or creates) the interest status for an experience. */
export function setExperienceInterest(token, experienceSlug, status = 'interested') {
  return request('/experience-interests', token, {
    method: 'POST',
    body: JSON.stringify({ experience_slug: experienceSlug, status }),
  });
}

export function updateExperienceInterest(token, id, status) {
  return request(`/experience-interests/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteExperienceInterest(token, id) {
  return request(`/experience-interests/${id}`, token, { method: 'DELETE' });
}

// ---- Messages (a member's own past contact-form enquiries) ------------

export function listMyMessages(token) {
  return request('/contact-submissions/me', token);
}

/** Submits the contact form. Anonymous when no token is passed. */
export function submitContactMessage(payload, token) {
  return request('/contact-submissions', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ---- Notifications ------------------------------------------------------

export function listMyNotifications(token) {
  return request('/notifications/me', token);
}

export function markNotificationRead(token, id) {
  return request(`/notifications/${id}/read`, token, { method: 'PATCH' });
}

export function markAllNotificationsRead(token) {
  return request('/notifications/read-all', token, { method: 'POST' });
}

// ---- Applications (Get Involved: volunteer / partner / support) --------

export function listMyApplications(token) {
  return request('/applications/me', token);
}

/** Submits a Get Involved form. Anonymous when no token is passed.
 * `values` is the EnquiryForm's raw field map — name/email/phone are
 * lifted to top-level columns, everything else (interest, skills,
 * partnershipType, ...) rides along in `details` since each of the
 * three forms collects a different field set. */
export function submitApplication(applicationType, values, token) {
  const { name, email, phone, ...details } = values;
  return request('/applications', token, {
    method: 'POST',
    body: JSON.stringify({ application_type: applicationType, name, email, phone: phone || null, details }),
  });
}

// ---- Ocean Interests (dashboard Profile page) ---------------------------

export function updateInterests(token, interests) {
  return request('/auth/me/interests', token, {
    method: 'PATCH',
    body: JSON.stringify({ interests }),
  });
}
