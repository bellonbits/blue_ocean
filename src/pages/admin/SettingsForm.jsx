import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getOrganizationSettings, updateOrganizationSettings } from '../../lib/settingsApi';

// Inline (non-modal) sectioned settings form — same field-config idiom as
// ContentFormModal, but for a singleton resource (organization settings):
// fetch once, edit in place, one Save Changes button instead of a
// draft/publish workflow. Supports one extra type beyond ContentFormModal's:
// 'pairlist', a newline list of "label | value" rows (for social links and
// contact locations) — parsed into [{ [pairKeys[0]]: ..., [pairKeys[1]]: ... }].
function toFormValue(field, value) {
  if (field.type === 'list') return (value || []).join('\n');
  if (field.type === 'pairlist') {
    return (value || []).map((row) => `${row[field.pairKeys[0]] || ''} | ${row[field.pairKeys[1]] || ''}`).join('\n');
  }
  return value ?? '';
}

function fromFormValue(field, raw) {
  if (field.type === 'list') return String(raw || '').split('\n').map((s) => s.trim()).filter(Boolean);
  if (field.type === 'pairlist') {
    return String(raw || '')
      .split('\n')
      .map((line) => line.split('|').map((s) => s.trim()))
      .filter(([a]) => a)
      .map(([a, b]) => ({ [field.pairKeys[0]]: a, [field.pairKeys[1]]: b || '' }));
  }
  const trimmed = String(raw ?? '').trim();
  return trimmed === '' ? null : trimmed;
}

export default function SettingsForm({ fields }) {
  const { token } = useAuth();
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getOrganizationSettings()
      .then((data) => {
        const next = {};
        fields.forEach((f) => { next[f.name] = toFormValue(f, data[f.name]); });
        setValues(next);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {};
      fields.forEach((f) => { payload[f.name] = fromFormValue(f, values[f.name]); });
      await updateOrganizationSettings(token, payload);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="admin__loading">Loading…</div>;
  if (error && !values) return <div className="admin__error">{error}</div>;

  let currentSection = null;

  return (
    <form onSubmit={handleSubmit} className="admin__form admin__form--settings">
      {error && <div className="admin__error admin__form-field--full">{error}</div>}
      {saved && <div className="admin__saved-banner admin__form-field--full">Saved.</div>}

      {fields.map((f) => {
        const sectionHeading = f.section && f.section !== currentSection ? f.section : null;
        if (sectionHeading) currentSection = f.section;
        return (
          <Fragment key={f.name}>
            {sectionHeading && <div className="admin__form-section">{f.section}</div>}
            <label className={f.fullWidth ? 'admin__form-field--full' : undefined}>
              {f.label}
              {f.hint && <span style={{ fontWeight: 400, color: 'var(--admin-text-dim)' }}> — {f.hint}</span>}
              {f.type === 'textarea' || f.type === 'list' || f.type === 'pairlist' ? (
                <textarea
                  rows={f.rows || 3}
                  placeholder={f.placeholder}
                  value={values[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={values[f.name] ?? ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                />
              )}
            </label>
          </Fragment>
        );
      })}

      <div className="admin__form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
