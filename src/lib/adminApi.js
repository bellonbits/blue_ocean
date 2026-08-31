// Talks to the FastAPI admin/CMS endpoints (/admin/stats, /users,
// /contact-submissions). All of these require a Bearer token and most
// require an admin/super_admin role — the backend enforces that via
// require_role(), this is just a thin fetch wrapper around it.

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

export function getAdminStats(token) {
  return request('/admin/stats', token);
}

export function listUsers(token) {
  return request('/users', token);
}

export function createUser(token, payload) {
  return request('/users', token, { method: 'POST', body: JSON.stringify(payload) });
}

export function updateUser(token, userId, payload) {
  return request(`/users/${userId}`, token, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteUser(token, userId) {
  return request(`/users/${userId}`, token, { method: 'DELETE' });
}

export function listContactSubmissions(token, isRead, isFavorite) {
  const params = new URLSearchParams();
  if (isRead !== undefined) params.set('is_read', isRead);
  if (isFavorite !== undefined) params.set('is_favorite', isFavorite);
  const query = params.toString();
  return request(`/contact-submissions${query ? `?${query}` : ''}`, token);
}

export function updateContactSubmission(token, submissionId, payload) {
  return request(`/contact-submissions/${submissionId}`, token, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteContactSubmission(token, submissionId) {
  return request(`/contact-submissions/${submissionId}`, token, { method: 'DELETE' });
}
