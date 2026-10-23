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
  const isSomali = language === 'so';
  const supportableProjects = getAllConservationProjects(language).filter((p) => (p.statusKey || p.status) !== 'Completed');

  useEffect(() => {
    document.title = isSomali
      ? 'Taageer Mashruuc — Somalia Blue Heaven'
      : 'Support a Project — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const fields = [
    {
      name: 'project',
      label: isSomali ? 'Mashruuca (ikhtiyaari)' : 'Project (optional)',
      type: 'select',
      placeholder: isSomali ? 'Dooro mashruuc aad taageerayso' : 'Support a specific project, or leave general',
      options: supportableProjects.map((p) => p.title),
    },
    { name: 'name', label: isSomali ? 'Magacaaga' : 'Name', type: 'text', required: true, placeholder: isSomali ? 'Magacaaga oo buuxa' : 'Your full name' },
    { name: 'email', label: isSomali ? 'Iimaylkaaga' : 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
    { name: 'message', label: isSomali ? 'Farriintaada' : 'Message', type: 'textarea', required: true, placeholder: isSomali ? 'Noo sheeg sida aad u doonayso inaad u taageerto shaqadan.' : 'Tell us how you would like to support this work.', fullWidth: true },
  ];

  return (
    <main id="main-content" className="support-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to={`/${language}/get-involved`} className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>{isSomali ? 'Dib ugu Noqo Ka Qayb Qaado' : 'Get Involved'}</span>
            </Link>
          </div>

          <span className="label-text">{isSomali ? 'TAAGEER MASHRUUC' : 'SUPPORT A PROJECT'}</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">
            {isSomali ? 'Gacan ka gee horumarinta cilmi-baarista iyo ilaalinta badda.' : 'Help advance ocean research and conservation.'}
          </h1>
          <p className="species-dir-hero__desc">
            {isSomali
              ? 'Mashruuc kasta oo ilaalinta badda ah ee hoos ku xusan wuxuu u baahan yahay taageero — laga bilaabo qalabka cilmi-baarista ilaa barnaamijyada bulshada.'
              : 'Every active and planned conservation project below can use support — from funding to in-kind resources and expertise. Click Learn More on any project to explore its full scope, or let us know how you would like to help.'}
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="exp-grid__notice" style={{ marginBottom: 'var(--space-8)' }}>
            <HeartHandshake size={16} />
            <span>
              {isSomali
                ? 'Kani waa foomka xiisaha iyo wada-xaajoodka taageerada, ma aha lacag-bixin toos ah. Fariintaada ka dib kooxdayadu waxay kula soo xiriiri doontaa faahfaahin.'
                : 'This is an enquiry desk connecting supporters directly to our marine initiatives. Learn more about each project below or submit your interest.'}
            </span>
          </div>

          <div className="exp-grid__results" style={{ marginBottom: 'var(--space-14)' }}>
            {supportableProjects.map((p) => (
              <ConservationProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="section-header reveal" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="label-text">{isSomali ? 'Muuji Xiisahaaga' : 'Express Interest'}</span>
              <div className="divider" />
              <h2 className="section-heading">{isSomali ? 'Waxa Taageeradu Suurtageliso' : 'What support enables'}</h2>
              <p className="section-subheading">
                {isSomali
                  ? 'Taageeradu waxay ka dhigan tahay maalgelinta qalabka goobta, kharashaadka bulshada, ama bixinta khibrad toos ah.'
                  : 'Support can mean funding field equipment, covering community program costs, or contributing expertise directly. Tell us what you have in mind.'}
              </p>
            </div>

            <EnquiryForm
              formId="support-form"
              fields={fields}
              submitLabel={isSomali ? 'Dir Xiisahaaga' : 'Submit Interest'}
              successMessage={isSomali ? 'Waad ku mahadsan tahay xiisahaaga taageero — kooxdayadu waxay kula soo xiriiri doontaa tallaabooyinka xiga.' : 'Thanks for your interest in supporting this work — our team will follow up with next steps.'}
              onSubmit={(values) => submitApplication('support', values, token)}
            />

            <p style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
              <Link to={`/${language}/conservation/projects`} style={{ color: 'var(--color-turquoise)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>{isSomali ? 'Dhammaan mashaariicda ilaalinta' : 'Browse all conservation projects'}</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
