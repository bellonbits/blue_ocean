import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import EnquiryForm from '../components/shared/EnquiryForm';
import { submitApplication } from '../lib/dashboardApi';
import { useAuth } from '../context/AuthContext';
import './SpeciesDirectoryPage.css';
import '../components/shared/EnquiryForm.css';

const fields = [
  { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Organization name' },
  { name: 'name', label: 'Contact Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+252 ...' },
  {
    name: 'partnershipType',
    label: 'Partnership Type',
    type: 'select',
    required: true,
    placeholder: 'Select a category',
    options: [
      'Research Institution',
      'Conservation Organization',
      'University',
      'Tourism Organization',
      'Coastal Business',
      'NGO',
      'Media',
      'Corporate Partner',
    ],
  },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us about your organization and what you have in mind.', fullWidth: true },
];

export default function PartnerPage() {
  useScrollReveal();
  const { token } = useAuth();

  useEffect(() => {
    document.title = 'Partner With Us — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="partner-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/get-involved" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Get Involved</span>
            </Link>
          </div>

          <span className="label-text">PARTNER WITH US</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Work with Blue Ocean to create lasting impact.</h1>
          <p className="species-dir-hero__desc">
            Research institutions, conservation organizations, universities, tourism operators, coastal businesses,
            NGOs, media, and corporate partners all play a role in Blue Ocean's work.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <EnquiryForm
            formId="partner-form"
            fields={fields}
            submitLabel="Submit Partnership Enquiry"
            successMessage="Thanks for reaching out — our partnerships team will follow up to discuss next steps."
            onSubmit={(values) => submitApplication('partner', values, token)}
          />
        </div>
      </section>
    </main>
  );
}
