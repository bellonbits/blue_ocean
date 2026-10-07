import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getAllConservationProjects } from '../data/conservation';
import EnquiryForm from '../components/shared/EnquiryForm';
import ConservationProjectCard from '../components/conservation/ConservationProjectCard';
import { submitApplication } from '../lib/dashboardApi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './SpeciesDirectoryPage.css';
import '../components/shared/EnquiryForm.css';

export default function SupportPage() {
  useScrollReveal();
  const { token } = useAuth();
  const { language } = useLanguage();
  const supportableProjects = getAllConservationProjects(language).filter((p) => (p.statusKey || p.status) !== 'Completed');

  useEffect(() => {
    document.title = 'Support a Project — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  const fields = [
    {
      name: 'project',
      label: 'Project (optional)',
      type: 'select',
      placeholder: 'Support a specific project, or leave general',
      options: supportableProjects.map((p) => p.title),
    },
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us how you would like to support this work.', fullWidth: true },
  ];

  return (
    <main id="main-content" className="support-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/get-involved" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Get Involved</span>
            </Link>
          </div>

          <span className="label-text">SUPPORT A PROJECT</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Help advance ocean research and conservation.</h1>
          <p className="species-dir-hero__desc">
            Every active and planned conservation project below can use support — from funding to in-kind resources
            and expertise. Let us know how you'd like to help, and our team will follow up.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="exp-grid__notice" style={{ marginBottom: 'var(--space-8)' }}>
            <HeartHandshake size={16} />
            <span>
              This is currently an enquiry form, not a payment or donation flow. Submitting your interest starts a
              conversation with our team about how to support the work below.
            </span>
          </div>

          <div className="exp-grid__results" style={{ marginBottom: 'var(--space-14)' }}>
            {supportableProjects.map((p) => (
              <ConservationProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="section-header reveal" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="label-text">Express Interest</span>
              <div className="divider" />
              <h2 className="section-heading">What support enables</h2>
              <p className="section-subheading">
                Support can mean funding field equipment, covering community program costs, or contributing
                expertise directly. Tell us what you have in mind.
              </p>
            </div>

            <EnquiryForm
              formId="support-form"
              fields={fields}
              submitLabel="Submit Interest"
              successMessage="Thanks for your interest in supporting this work — our team will follow up with next steps."
              onSubmit={(values) => submitApplication('support', values, token)}
            />

            <p style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
              <Link to="/conservation/projects" style={{ color: 'var(--color-turquoise)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Browse all conservation projects</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
