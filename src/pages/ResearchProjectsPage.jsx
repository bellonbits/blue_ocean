import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import ResearchProjectGrid from '../components/research/ResearchProjectGrid';
import { getAllProjects } from '../data/research';
import { useLanguage } from '../context/LanguageContext';
import './SpeciesDirectoryPage.css';

export default function ResearchProjectsPage() {
  const [searchParams] = useSearchParams();
  const areaParam = searchParams.get('area') || 'all';
  const { language } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    document.title = 'Research Projects — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="research-projects-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">RESEARCH DIRECTORY</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Research Projects</h1>
          <p className="species-dir-hero__desc">
            Search and filter active, planned, and completed scientific research across Somalia's marine and coastal environment.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <ResearchProjectGrid initialArea={areaParam} projectsList={getAllProjects(language)} />
        </div>
      </section>
    </main>
  );
}
