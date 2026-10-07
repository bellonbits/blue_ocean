import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { contactDetails } from '../data/organization';
import './StaticContentPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="static-page" aria-label="Privacy Policy">
      <div className="container">
        <div className="static-page__header">
          <span className="label-text">Legal</span>
          <h1 className="static-page__title">Privacy Policy</h1>
        </div>

        <div className="static-page__body">
          <div className="static-page__notice">
            <AlertTriangle size={20} />
            <span>
              This is a standard-shape policy template, not yet reviewed by counsel. Replace the
              placeholder specifics below with Blue Ocean's actual data practices before treating
              it as a binding policy.
            </span>
          </div>

          <p className="static-page__meta">Last updated: [date] · Effective from: [date]</p>

          <h2>Information We Collect</h2>
          <p>
            When you create an account, contact us, apply to volunteer, or submit a partnership
            inquiry, we collect the information you provide directly — such as your name, email
            address, phone number, and the content of your message. When you browse the site, we
            may also collect standard technical information (IP address, browser type, pages
            visited) through server logs and analytics.
          </p>

          <h2>How We Use It</h2>
          <ul>
            <li>To respond to inquiries, applications, and messages you send us</li>
            <li>To operate and secure your account, if you have one</li>
            <li>To understand how the site is used, so we can improve it</li>
            <li>To meet legal or reporting obligations where applicable</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use essential cookies to keep you signed in and remember basic preferences (such as
            light/dark theme). We do not use third-party advertising cookies.
          </p>

          <h2>Sharing Your Information</h2>
          <p>
            We do not sell personal information. We may share information with service providers
            who help us run the site (such as hosting and email delivery), and only to the extent
            necessary for them to provide that service.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain account and message data for as long as needed to fulfil the purpose it was
            collected for, or as required by law, after which it is deleted or anonymized.
          </p>

          <h2>Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal data by
            contacting us using the details below. If you have an account, you can update your
            name at any time from your profile.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href={`mailto:${contactDetails.email}`} style={{ color: 'var(--color-turquoise)' }}>
              {contactDetails.email}
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
