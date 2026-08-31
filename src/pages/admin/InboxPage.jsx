import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Star,
  RefreshCw,
  ChevronDown,
  MoreVertical,
  Trash2,
  MailOpen,
  Mail as MailIcon,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listContactSubmissions, updateContactSubmission, deleteContactSubmission } from '../../lib/adminApi';
import { canManageAdmin } from './roles';
import RestrictedNotice from './RestrictedNotice';

const TABS = [
  { key: 'all', label: 'All messages' },
  { key: 'unread', label: 'Unread' },
  { key: 'favourites', label: 'Favourites' },
];

function previewText(message) {
  return (message || '').replace(/\s+/g, ' ').trim();
}

export default function InboxPage() {
  const { user, token } = useAuth();
  const isAdmin = canManageAdmin(user);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [checkedIds, setCheckedIds] = useState(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const selectMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  const load = () => {
    if (!isAdmin) return;
    const isRead = tab === 'unread' ? false : undefined;
    const isFavorite = tab === 'favourites' ? true : undefined;
    setIsLoading(true);
    listContactSubmissions(token, isRead, isFavorite)
      .then((data) => {
        setSubmissions(data);
        setCheckedIds(new Set());
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, [isAdmin, token, tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (selectMenuRef.current && !selectMenuRef.current.contains(e.target)) setSelectMenuOpen(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) setMoreMenuOpen(false);
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter((s) =>
      [s.name, s.email, s.subject, s.message].some((field) => (field || '').toLowerCase().includes(q))
    );
  }, [submissions, search]);

  if (!isAdmin) return <RestrictedNotice roleDisplay={user?.role?.replace('_', ' ')} />;

  const patch = async (submission, payload) => {
    try {
      const updated = await updateContactSubmission(token, submission.id, payload);
      setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      if (selected?.id === updated.id) setSelected(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const openSubmission = (submission) => {
    setSelected(submission);
    if (!submission.is_read) patch(submission, { is_read: true });
  };

  const toggleChecked = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectByScope = (scope) => {
    setSelectMenuOpen(false);
    if (scope === 'none') {
      setCheckedIds(new Set());
      return;
    }
    if (scope === 'all') {
      setCheckedIds(new Set(visible.map((s) => s.id)));
      return;
    }
    if (scope === 'read') {
      setCheckedIds(new Set(visible.filter((s) => s.is_read).map((s) => s.id)));
      return;
    }
    if (scope === 'unread') {
      setCheckedIds(new Set(visible.filter((s) => !s.is_read).map((s) => s.id)));
    }
  };

  const allChecked = visible.length > 0 && checkedIds.size === visible.length;

  const bulkMarkRead = async (isRead) => {
    setMoreMenuOpen(false);
    const ids = [...checkedIds];
    await Promise.all(ids.map((id) => updateContactSubmission(token, id, { is_read: isRead })));
    setSubmissions((prev) => prev.map((s) => (ids.includes(s.id) ? { ...s, is_read: isRead } : s)));
    setCheckedIds(new Set());
  };

  const bulkDelete = async () => {
    setMoreMenuOpen(false);
    const ids = [...checkedIds];
    if (ids.length === 0) return;
    if (!window.confirm(`Delete ${ids.length} message${ids.length === 1 ? '' : 's'}?`)) return;
    await Promise.all(ids.map((id) => deleteContactSubmission(token, id)));
    setSubmissions((prev) => prev.filter((s) => !ids.includes(s.id)));
    setCheckedIds(new Set());
    if (selected && ids.includes(selected.id)) setSelected(null);
  };

  const toggleFavorite = (submission, e) => {
    e.stopPropagation();
    patch(submission, { is_favorite: !submission.is_favorite });
  };

  const remove = async (submission) => {
    if (!window.confirm(`Delete the message from ${submission.name}?`)) return;
    try {
      await deleteContactSubmission(token, submission.id);
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
      if (selected?.id === submission.id) setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- Detail view (single-pane, replaces the list when a message is open) ----
  if (selected) {
    return (
      <div>
        <button className="admin__inbox-back" onClick={() => setSelected(null)}>
          <ArrowLeft size={15} />
          <span>Back to Inbox</span>
        </button>

        {error && <div className="admin__error">{error}</div>}

        <div className="admin__inbox-detail">
          <div className="admin__inbox-detail-header">
            <div>
              <h3>{selected.subject || 'No subject'}</h3>
              <p>{selected.name} &lt;{selected.email}&gt;</p>
              <span className="admin__inbox-detail-date">
                {new Date(selected.created_at).toLocaleString()}
              </span>
            </div>
            <div className="admin__inbox-detail-actions">
              <button
                className="admin__icon-btn"
                onClick={(e) => toggleFavorite(selected, e)}
                title={selected.is_favorite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Star size={16} className={selected.is_favorite ? 'admin__star admin__star--filled' : 'admin__star'} />
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => patch(selected, { is_read: !selected.is_read })}>
                Mark as {selected.is_read ? 'unread' : 'read'}
              </button>
              <button className="btn btn-ghost btn-sm admin__danger-btn" onClick={() => remove(selected)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
          <p className="admin__inbox-detail-message">{selected.message}</p>
        </div>
      </div>
    );
  }

  // ---- List view ----
  return (
    <div>
      <h1 className="admin__title">Inbox</h1>
      <p className="admin__subtitle">Messages submitted through the contact form.</p>

      <div className="admin__inbox2-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search on emails…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="admin__inbox2-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin__inbox2-tab ${tab === t.key ? 'admin__inbox2-tab--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin__inbox2-toolbar">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={() => selectByScope(allChecked ? 'none' : 'all')}
          aria-label="Select all"
        />
        <div className="admin__inbox2-menu" ref={selectMenuRef}>
          <button className="admin__icon-btn" onClick={() => setSelectMenuOpen((v) => !v)} aria-label="Selection options">
            <ChevronDown size={15} />
          </button>
          {selectMenuOpen && (
            <div className="admin__inbox2-dropdown">
              <button onClick={() => selectByScope('all')}>All</button>
              <button onClick={() => selectByScope('none')}>None</button>
              <button onClick={() => selectByScope('read')}>Read</button>
              <button onClick={() => selectByScope('unread')}>Unread</button>
            </div>
          )}
        </div>
        <button className="admin__icon-btn" onClick={load} aria-label="Refresh">
          <RefreshCw size={15} />
        </button>
        <div className="admin__inbox2-menu" ref={moreMenuRef}>
          <button
            className="admin__icon-btn"
            onClick={() => setMoreMenuOpen((v) => !v)}
            disabled={checkedIds.size === 0}
            aria-label="More actions"
          >
            <MoreVertical size={15} />
          </button>
          {moreMenuOpen && (
            <div className="admin__inbox2-dropdown">
              <button onClick={() => bulkMarkRead(true)}><MailOpen size={14} /><span>Mark as read</span></button>
              <button onClick={() => bulkMarkRead(false)}><MailIcon size={14} /><span>Mark as unread</span></button>
              <button onClick={bulkDelete} className="admin__danger-btn"><Trash2 size={14} /><span>Delete</span></button>
            </div>
          )}
        </div>
        {checkedIds.size > 0 && <span className="admin__inbox2-toolbar-count">{checkedIds.size} selected</span>}
      </div>

      {error && <div className="admin__error">{error}</div>}
      {isLoading && <div className="admin__loading">Loading messages…</div>}
      {!isLoading && visible.length === 0 && <div className="admin__empty">No messages here.</div>}

      {!isLoading && visible.length > 0 && (
        <ul className="admin__inbox2-list">
          {visible.map((s) => (
            <li
              key={s.id}
              className={`admin__inbox2-row ${!s.is_read ? 'admin__inbox2-row--unread' : ''} ${checkedIds.has(s.id) ? 'admin__inbox2-row--checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={checkedIds.has(s.id)}
                onChange={() => toggleChecked(s.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <button className="admin__inbox2-star" onClick={(e) => toggleFavorite(s, e)} aria-label="Toggle favourite">
                <Star size={16} className={s.is_favorite ? 'admin__star admin__star--filled' : 'admin__star'} />
              </button>
              <button className="admin__inbox2-row-main" onClick={() => openSubmission(s)}>
                <span className="admin__inbox2-row-sender">
                  <span className="admin__inbox2-row-name">{s.name}</span>
                  {!s.is_read && <span className="admin__inbox2-row-badge">New</span>}
                </span>
                <span className="admin__inbox2-row-content">
                  <span className="admin__inbox2-row-subject">{s.subject || '(No subject)'}</span>
                  <span className="admin__inbox2-row-preview"> — {previewText(s.message)}</span>
                </span>
                <span className="admin__inbox2-row-date">{new Date(s.created_at).toLocaleDateString()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
