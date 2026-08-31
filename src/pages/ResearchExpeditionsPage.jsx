import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getAllExpeditions } from '../data/research';
import ExpeditionCard from '../components/research/ExpeditionCard';
import '../components/experiences/ExperienceGrid.css';
import './SpeciesDirectoryPage.css';
import './ResearchReportsPage.css';

export default function ResearchExpeditionsPage() {
  useScrollReveal();
  const expeditions = getAllExpeditions();

  useEffect(() => {
    document.title = 'Research Expeditions — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="research-expeditions-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">FIELD EXPEDITIONS</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Research Expeditions</h1>
          <p className="species-dir-hero__desc">
            Join Blue Ocean's research teams in the field. Every expedition below is in planning — dates, pricing,
            and availability will be announced once operational.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="exp-grid__notice" style={{ marginBottom: 'var(--space-8)' }}>
            <Info size={16} />
            <span>
              No expeditions are currently bookable. This page previews Blue Ocean's planned field programs —
              register your interest with the team once dates are confirmed.
            </span>
          </div>

          <div className="research-reports-grid">
            {expeditions.map((exp) => (
              <ExpeditionCard key={exp.id} expedition={exp} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
