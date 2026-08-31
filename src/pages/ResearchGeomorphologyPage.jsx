import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import CoastalGeomorphology from '../components/research/CoastalGeomorphology';
import './SpeciesDirectoryPage.css';

export default function ResearchGeomorphologyPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Coastal Geomorphology & Habitats — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="research-geomorphology-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">SCIENTIFIC REFERENCE</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Coastal Geomorphology & Habitats</h1>
          <p className="species-dir-hero__desc">
            How Somalia's 3,025 km coastline was built — its dune fields, barrier islands, coral reefs, and
            mangroves — summarized from a landmark 2000 scientific study of the Indian Ocean coast.
          </p>
        </div>
      </section>

      <CoastalGeomorphology />
    </main>
  );
}
