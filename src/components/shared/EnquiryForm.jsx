import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Send, Loader2 } from 'lucide-react';
import './EnquiryForm.css';

// Front-end only: this project has no backend/CMS wired up yet, so
// submission is simulated locally with a short delay to demonstrate the
// idle -> submitting -> success/error flow. Replace the body of the
// setTimeout in handleSubmit with a real API call once one exists —
// call setStatus('error') in its catch block to surface the error state.
export default function EnquiryForm({ fields, submitLabel = 'Submit', successMessage, formId }) {
  const initialState = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue || '']));
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    fields.forEach((f) => {
      const val = String(values[f.name] || '').trim();
      if (f.required && !val) {
        nextErrors[f.name] = 'This field is required.';
      } else if (f.type === 'email' && val && !/\S+@\S+\.\S+/.test(val)) {
        nextErrors[f.name] = 'Enter a valid email address.';
      } else if (f.minLength && val && val.length < f.minLength) {
        nextErrors[f.name] = `Please enter at least ${f.minLength} characters.`;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Honeypot: bots tend to fill every field, humans never see this one
    // (hidden via CSS). If it's filled, fake a normal success silently.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  if (status === 'success') {
    return (
      <div className="enquiry-form__success reveal">
        <div className="enquiry-form__success-icon">
          <CheckCircle2 size={32} />
        </div>
        <h3>Message received.</h3>
        <p>{successMessage || "Thank you for reaching out. We'll get back to you as soon as possible."}</p>
      </div>
    );
  }

  return (
    <form className="enquiry-form reveal" onSubmit={handleSubmit} id={formId} noValidate>
      {/* Honeypot field — hidden from real users via CSS, left empty by them */}
      <div className="enquiry-form__honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Leave this field empty</label>
        <input
          id={`${formId}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {fields.map((field) => (
        <div key={field.name} className={`enquiry-form__group ${field.fullWidth ? 'enquiry-form__group--full' : ''}`}>
          <label htmlFor={`${formId}-${field.name}`} className="enquiry-form__label">
            {field.label}
            {field.required && <span className="enquiry-form__required">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={`${formId}-${field.name}`}
              className="enquiry-form__textarea"
              rows={field.rows || 4}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === 'select' ? (
            <select
              id={`${formId}-${field.name}`}
              className="enquiry-form__select"
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={`${formId}-${field.name}`}
              type={field.type || 'text'}
              className="enquiry-form__input"
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {errors[field.name] && <span className="enquiry-form__error">{errors[field.name]}</span>}
        </div>
      ))}

      {status === 'error' && (
        <div className="enquiry-form__group--full enquiry-form__banner enquiry-form__banner--error">
          <AlertTriangle size={16} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg enquiry-form__submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="enquiry-form__spinner" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>{submitLabel}</span>
          </>
        )}
      </button>
    </form>
  );
}
