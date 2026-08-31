// Mirrors the role gates in backend/app/api/v1/{admin_stats,users,contact_submissions}.py.
// This is UX only — the API is the real boundary — but it keeps the
// dashboard from showing nav links and pages that would just 403.
export const ADMIN_ROLES = ['super_admin', 'admin'];

export function canManageAdmin(user) {
  return !!user && ADMIN_ROLES.includes(user.role);
}
