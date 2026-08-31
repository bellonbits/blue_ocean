import { useEffect, useState } from 'react';
import { UserPlus, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listUsers, createUser, updateUser, deleteUser } from '../../lib/adminApi';
import { canManageAdmin } from './roles';
import RestrictedNotice from './RestrictedNotice';

const ROLES = ['super_admin', 'admin', 'editor', 'researcher', 'content_manager'];

const emptyForm = { email: '', full_name: '', password: '', role: 'editor' };

export default function UsersPage({ embedded = false }) {
  const { user, token } = useAuth();
  const isAdmin = canManageAdmin(user);
  const isSuperAdmin = user?.role === 'super_admin';
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    if (!isAdmin) return;
    setIsLoading(true);
    listUsers(token)
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, [isAdmin, token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const created = await createUser(token, form);
      setUsers((prev) => [...prev, created]);
      setForm(emptyForm);
      setShowCreate(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const changeRole = async (target, role) => {
    try {
      const updated = await updateUser(token, target.id, { role });
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleActive = async (target) => {
    try {
      const updated = await updateUser(token, target.id, { is_active: !target.is_active });
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (target) => {
    if (!window.confirm(`Delete ${target.email}? This cannot be undone.`)) return;
    try {
      await deleteUser(token, target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="admin__header-row">
        {embedded ? <span /> : (
          <div>
            <h1 className="admin__title">Users</h1>
            <p className="admin__subtitle">Admin/CMS accounts that can sign into this dashboard.</p>
          </div>
        )}
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>
          <UserPlus size={15} />
          <span>New user</span>
        </button>
      </div>

      {error && <div className="admin__error">{error}</div>}
      {isLoading && <div className="admin__loading">Loading users…</div>}

      {!isLoading && (
        <div className="admin__table-wrap">
          <table className="admin__table admin__table--users">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === user.id;
                return (
                  <tr key={u.id}>
                    <td>{u.full_name || '—'}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        value={u.role}
                        disabled={isSelf}
                        onChange={(e) => changeRole(u, e.target.value)}
                        className="admin__select"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className={`admin__status-pill ${u.is_active ? 'admin__status-pill--active' : 'admin__status-pill--inactive'}`}
                        disabled={isSelf}
                        onClick={() => toggleActive(u)}
                      >
                        {u.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      {isSuperAdmin && !isSelf && (
                        <button className="admin__danger-btn" onClick={() => remove(u)} aria-label={`Delete ${u.email}`}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showCreate && (
        <div className="admin__modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin__modal-header">
              <h3>New user</h3>
              <button onClick={() => setShowCreate(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="admin__form">
              {formError && <div className="admin__error">{formError}</div>}
              <label>
                Full name
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <label>
                Role
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="admin__select"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r.replace('_', ' ')}</option>
                  ))}
                </select>
              </label>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Creating…' : 'Create user'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
