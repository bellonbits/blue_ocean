import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Compass, Waves, ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import SpeciesGrid from '../components/marine/SpeciesGrid';
import ExploreCTA from '../components/coast/ExploreCTA';
import { speciesList } from '../data/marineLife';
import './SpeciesDirectoryPage.css';

export default function SpeciesDirectoryPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  useScrollReveal();

  useEffect(() => {
    document.title = 'Species Directory — Blue Ocean Marine Life Field Guide';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="species-directory-page">
      {/* Directory Header Banner */}
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/marine-life" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Marine Life Overview</span>
            </Link>
          </div>

          <span className="label-text">FIELD GUIDE DATABASE</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">
            Species Directory
          </h1>
          <p className="species-dir-hero__desc">
            Explore and filter documented marine species across Somalia's 3,025 km coastline by taxonomy, habitat, and conservation status.
          </p>
        </div>
      </section>

      {/* Directory Grid Section */}
      <section className="species-dir-content-sec section">
        <div className="container">
          <SpeciesGrid
            initialCategory={categoryParam}
            speciesList={speciesList}
            showSearchHeader={true}
          />
        </div>
      </section>

      <ExploreCTA />
    </main>
  );
}
