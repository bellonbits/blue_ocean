import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import ConservationProjectGrid from '../components/conservation/ConservationProjectGrid';
import { getAllConservationProjects } from '../data/conservation';
import { useLanguage } from '../context/LanguageContext';
import './SpeciesDirectoryPage.css';

export default function ConservationProjectsPage() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const areaParam = searchParams.get('area') || 'all';
  useScrollReveal();

  useEffect(() => {
    document.title = isSomali
      ? 'Mashaariicda Ilaalinta Badda — Somalia Blue Heaven'
      : 'Conservation Projects — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  return (
    <main id="main-content" className="conservation-projects-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to={`/${language}/conservation`} className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>{isSomali ? 'Dib ugu Noqo Ilaalinta Badda' : 'Conservation Overview'}</span>
            </Link>
          </div>

          <span className="label-text">{isSomali ? 'DIIWAANKA ILAALINTA' : 'CONSERVATION DIRECTORY'}</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">
            {isSomali ? 'Mashaariicda Ilaalinta Badda' : 'Conservation Projects'}
          </h1>
          <p className="species-dir-hero__desc">
            {isSomali
              ? 'Raadi oo kala saar mashaariicda ilaalinta badda ee socda, la qorsheeyay, iyo kuwa la dhammaystiray ee ku baahsan 3,330 km oo xeebaha Soomaaliya ah.'
              : 'Search and filter active, planned, and completed conservation work across Somalia’s marine and coastal environment.'}
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <ConservationProjectGrid initialArea={areaParam} projectsList={getAllConservationProjects(language)} language={language} />
        </div>
      </section>
    </main>
  );
}
