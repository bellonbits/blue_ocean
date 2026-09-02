import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Send, Loader2 } from 'lucide-react';
import { contactDetails } from '../../data/organization';
import './EnquiryForm.css';

export default function EnquiryForm({ fields, submitLabel = 'Submit', successMessage, errorMessage, formId, onSubmit }) {
  const initialState = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue || '']));
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const errorRef = useRef(null);

  // A failed submission is easy to miss if it lands below the fold on a
  // long form — pull it into view so "did that actually send?" never
  // goes unanswered.
  useEffect(() => {
    if (status === 'error') errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  const handleSubmit = async (e) => {
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
    try {
      await onSubmit(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
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
        <div ref={errorRef} className="enquiry-form__group--full enquiry-form__banner enquiry-form__banner--error" role="alert">
          <AlertTriangle size={16} />
          <span>
            {errorMessage || (
              <>
                Your message was <strong>not delivered</strong> — please try submitting again. If it keeps failing,
                email us directly at <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
              </>
            )}
          </span>
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
