import { useMemo, useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';

// Generic admin list table for a content resource. `columns` is
// [{ key, label, render?(item) }]. `statusToggles` is an optional list of
// boolean fields rendered as clickable pills (e.g. featured). `statusField`
// is an optional { key, options: [{value,label}] } for a three-state
// draft/published/archived badge with an inline quick-change select.
export default function ContentTable({
  items,
  columns,
  searchKeys = [],
  statusToggles = [],
  statusField,
  onCreate,
  onEdit,
  onDelete,
  onToggle,
  onStatusChange,
  isLoading,
  error,
  createLabel = 'New',
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim() || searchKeys.length === 0) return items;
    const q = query.toLowerCase();
    return items.filter((item) => searchKeys.some((key) => String(item[key] || '').toLowerCase().includes(q)));
  }, [items, query, searchKeys]);

  return (
    <div>
      <div className="admin__header-row">
        <div className="admin__search-wrap">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="admin__search-input"
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          <Plus size={15} />
          <span>{createLabel}</span>
        </button>
      </div>

      {error && <div className="admin__error">{error}</div>}
      {isLoading && <div className="admin__loading">Loading…</div>}
      {!isLoading && filtered.length === 0 && <div className="admin__empty">Nothing here yet.</div>}

      {!isLoading && filtered.length > 0 && (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                {columns.map((col) => <th key={col.key}>{col.label}</th>)}
                {statusField && <th>Status</th>}
                {statusToggles.map((t) => <th key={t.key}>{t.label}</th>)}
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
                  ))}
                  {statusField && (
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={`admin__status-badge admin__status-badge--${item[statusField.key]}`}>
                          {item[statusField.key]}
                        </span>
                        <select
                          className="admin__select"
                          value={item[statusField.key]}
                          onChange={(e) => onStatusChange(item, e.target.value)}
                          aria-label="Change status"
                        >
                          {statusField.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  )}
                  {statusToggles.map((t) => (
                    <td key={t.key}>
                      <button
                        className={`admin__status-pill ${item[t.key] ? 'admin__status-pill--active' : 'admin__status-pill--inactive'}`}
                        onClick={() => onToggle(item, t.key, !item[t.key])}
                      >
                        {item[t.key] ? t.label : `Not ${t.label.toLowerCase()}`}
                      </button>
                    </td>
                  ))}
                  <td className="admin__table-actions">
                    <button className="admin__icon-btn" onClick={() => onEdit(item)} aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button className="admin__icon-btn admin__danger-btn" onClick={() => onDelete(item)} aria-label="Delete">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
