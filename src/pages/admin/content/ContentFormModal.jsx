import { useState, useEffect, Fragment } from 'react';
import { X, Eye } from 'lucide-react';

// Generic create/edit modal driven by a `fields` config array, the same
// field-config idiom src/components/shared/EnquiryForm.jsx already uses on
// the public side. Field shape: { name, label, type, required, options,
// placeholder, rows, section }. Supported types: text, textarea, number,
// checkbox, select, multiselect (native <select multiple>, needs
// `options`), list (newline-separated array of strings), imagelist
// (newline-separated URLs, stored as [{url, caption}] — the shape most
// gallery fields use; Destination's plain string[] gallery is the outlier
// and uses 'list' instead), blocklist (blank-line-separated paragraphs,
// stored as [{type:'paragraph', text, attribution}]), pairlist
// (newline "label | value" rows, stored as [{[pairKeys[0]]: ..,
// [pairKeys[1]]: ..}] — needs a `pairKeys: [k1, k2]` on the field).
//
// Fields with a `section` key are grouped under a heading in field order —
// "don't show everything at once" (Basic Info / Description / Media / …).
//
// When `statusField` is set ({ name, draftValue, publishedValue }), the
// footer becomes Save Draft / Publish instead of a single Save button —
// each sets values[name] to the given draft/published value before
// submitting. Covers both Destination's 3-state status string and every
// other resource's plain published boolean. When `onPreview` is also given
// (and an item is being edited), a Preview button appears alongside them.
function toFormValue(type, value, field) {
  if (type === 'list') return (value || []).join('\n');
  if (type === 'imagelist') return (value || []).map((g) => g.url).join('\n');
  if (type === 'blocklist') return (value || []).map((b) => b.text).join('\n\n');
  if (type === 'multiselect') return value || [];
  if (type === 'pairlist') {
    const [k1, k2] = field.pairKeys;
    return (value || []).map((row) => `${row[k1] || ''} | ${row[k2] || ''}`).join('\n');
  }
  if (value === null || value === undefined) return '';
  return value;
}

function fromFormValue(type, raw, required, field) {
  if (type === 'checkbox') return !!raw;
  if (type === 'number') return raw === '' ? null : Number(raw);
  if (type === 'multiselect') return raw || [];
  if (type === 'list') return String(raw || '').split('\n').map((s) => s.trim()).filter(Boolean);
  if (type === 'imagelist') {
    return String(raw || '').split('\n').map((s) => s.trim()).filter(Boolean).map((url) => ({ url, caption: null }));
  }
  if (type === 'blocklist') {
    return String(raw || '').split('\n\n').map((s) => s.trim()).filter(Boolean).map((text) => ({ type: 'paragraph', text, attribution: null }));
  }
  if (type === 'pairlist') {
    const [k1, k2] = field.pairKeys;
    return String(raw || '')
      .split('\n')
      .map((line) => line.split('|').map((s) => s.trim()))
      .filter(([a]) => a)
      .map(([a, b]) => ({ [k1]: a, [k2]: b || '' }));
  }
  const trimmed = String(raw ?? '').trim();
  if (trimmed === '' && !required) return null;
  return trimmed;
}

export default function ContentFormModal({
  title, fields, initialValues, onSubmit, onClose, submitting, error, statusField, onPreview,
}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    const next = {};
    fields.forEach((f) => { next[f.name] = toFormValue(f.type, initialValues?.[f.name], f); });
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const buildPayload = (overrides = {}) => {
    const payload = {};
    fields.forEach((f) => { payload[f.name] = fromFormValue(f.type, values[f.name], f.required, f); });
    return { ...payload, ...overrides };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(buildPayload());
  };

  const handleStatusSubmit = (isPublishing) => {
    onSubmit(buildPayload({ [statusField.name]: isPublishing ? statusField.publishedValue : statusField.draftValue }));
  };

  let currentSection = null;

  return (
    <div className="admin__modal-backdrop" onClick={onClose}>
      <div className="admin__modal admin__modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="admin__modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="admin__form">
          {error && <div className="admin__error admin__form-field--full">{error}</div>}
          {fields.map((f) => {
            const sectionHeading = f.section && f.section !== currentSection ? f.section : null;
            if (sectionHeading) currentSection = f.section;
            return (
              <Fragment key={f.name}>
                {sectionHeading && (
                  <div className="admin__form-section">{f.section}</div>
                )}
                <label className={f.fullWidth ? 'admin__form-field--full' : undefined}>
                  {f.label}
                  {f.required && <span className="admin__required">*</span>}
                  {f.type === 'multiselect' && (
                    <span style={{ fontWeight: 400, color: 'var(--admin-text-dim)', fontSize: '0.78rem' }}> — Cmd/Ctrl-click to select multiple</span>
                  )}
                  {f.type === 'textarea' || f.type === 'list' || f.type === 'imagelist' || f.type === 'blocklist' || f.type === 'pairlist' ? (
                    <textarea
                      rows={f.rows || (f.type === 'textarea' ? 4 : f.type === 'blocklist' ? 8 : 3)}
                      placeholder={
                        f.type === 'imagelist' ? 'One image URL per line'
                          : f.type === 'blocklist' ? 'One paragraph per blank-line-separated block'
                          : f.type === 'pairlist' ? (f.placeholder || `One per line as "${f.pairKeys?.[0]} | ${f.pairKeys?.[1]}"`)
                          : f.type === 'list' ? 'One per line' : f.placeholder
                      }
                      value={values[f.name] ?? ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    />
                  ) : f.type === 'select' ? (
                    <select value={values[f.name] ?? ''} onChange={(e) => handleChange(f.name, e.target.value)}>
                      <option value="">{f.placeholder || 'Select…'}</option>
                      {f.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : f.type === 'multiselect' ? (
                    <select
                      multiple
                      size={Math.min(6, Math.max(3, f.options.length))}
                      value={values[f.name] || []}
                      onChange={(e) => handleChange(f.name, Array.from(e.target.selectedOptions, (o) => o.value))}
                    >
                      {f.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!values[f.name]}
                      onChange={(e) => handleChange(f.name, e.target.checked)}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={values[f.name] ?? ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    />
                  )}
                </label>
              </Fragment>
            );
          })}

          <div className="admin__form-actions">
            {statusField ? (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={submitting}
                  onClick={() => handleStatusSubmit(false)}
                >
                  {submitting ? 'Saving…' : 'Save Draft'}
                </button>
                {onPreview && (
                  <button type="button" className="btn btn-outline" onClick={onPreview}>
                    <Eye size={15} />
                    <span>Preview</span>
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={submitting}
                  onClick={() => handleStatusSubmit(true)}
                >
                  {submitting ? 'Publishing…' : 'Publish'}
                </button>
              </>
            ) : (
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
