import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import ConservationProjectGrid from '../components/conservation/ConservationProjectGrid';
import { getAllConservationProjects } from '../data/conservation';
import './SpeciesDirectoryPage.css';

export default function ConservationProjectsPage() {
  const [searchParams] = useSearchParams();
  const areaParam = searchParams.get('area') || 'all';
  useScrollReveal();

  useEffect(() => {
    document.title = 'Conservation Projects — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="conservation-projects-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/conservation" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Conservation Overview</span>
            </Link>
          </div>

          <span className="label-text">CONSERVATION DIRECTORY</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Conservation Projects</h1>
          <p className="species-dir-hero__desc">
            Search and filter active, planned, and completed conservation work across Somalia's marine and coastal
            environment.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <ConservationProjectGrid initialArea={areaParam} projectsList={getAllConservationProjects()} />
        </div>
      </section>
    </main>
  );
}
