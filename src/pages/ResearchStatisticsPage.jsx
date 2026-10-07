import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import CoastalStatistics from '../components/research/CoastalStatistics';
import './SpeciesDirectoryPage.css';

export default function ResearchStatisticsPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Coastal & Marine Statistics — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="research-statistics-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">NATIONAL REFERENCE DATA</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Coastal & Marine Statistics</h1>
          <p className="species-dir-hero__desc">
            An archival country-profile dataset for Somalia's coastline, marine territory, biodiversity, and
            fisheries sector, set against Sub-Saharan African and global benchmarks.
          </p>
        </div>
      </section>

      <CoastalStatistics />
    </main>
  );
}
