// Talks to the singleton /api/v1/organization endpoint (About/Contact
// content + social links) — GET/PATCH only, no list/create/delete, since
// there's exactly one row (see backend/app/models/organization_settings.py).

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || `Request failed with status ${res.status}`);
  return data;
}

export function getOrganizationSettings() {
  return request('/organization');
}

export function updateOrganizationSettings(token, payload) {
  return request('/organization', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}
