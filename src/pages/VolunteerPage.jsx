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
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+252 ...' },
  {
    name: 'interest',
    label: 'Area of Interest',
    type: 'select',
    required: true,
    placeholder: 'Select an area',
    options: ['Research', 'Conservation', 'Education', 'Media', 'Community', 'Technology'],
  },
  { name: 'skills', label: 'Skills / Experience', type: 'textarea', placeholder: 'Relevant skills, certifications, or past experience', fullWidth: true },
  { name: 'availability', label: 'Availability', type: 'text', placeholder: 'e.g. Weekends, 3 months from June' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Anything else we should know?', fullWidth: true },
];

export default function VolunteerPage() {
  useScrollReveal();
  const { token } = useAuth();

  useEffect(() => {
    document.title = 'Volunteer — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="volunteer-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/get-involved" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Get Involved</span>
            </Link>
          </div>

          <span className="label-text">VOLUNTEER</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Give your time and skills.</h1>
          <p className="species-dir-hero__desc">
            Tell us where your interests and skills lie, and how much time you can offer — we'll follow up with
            opportunities that fit.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <EnquiryForm
            formId="volunteer-form"
            fields={fields}
            submitLabel="Submit Interest"
            successMessage="Thanks for offering your time — our team will reach out about opportunities matching your interests."
            onSubmit={(values) => submitApplication('volunteer', values, token)}
          />
        </div>
      </section>
    </main>
  );
}
