import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Info } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getAllReports, getResearchAreas } from '../data/research';
import { useLanguage } from '../context/LanguageContext';
import ResearchReportCard from '../components/research/ResearchReportCard';
import '../components/experiences/ExperienceGrid.css';
import './SpeciesDirectoryPage.css';
import './ResearchReportsPage.css';

export default function ResearchReportsPage() {
  useScrollReveal();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const reports = getAllReports(language);
  const researchAreas = getResearchAreas(language);

  useEffect(() => {
    document.title = 'Research Reports — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (selectedArea !== 'all' && r.area !== selectedArea) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        return r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
      }
      return true;
    });
  }, [reports, searchQuery, selectedArea]);

  return (
    <main id="main-content" className="research-reports-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/research" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>Research Overview</span>
            </Link>
          </div>

          <span className="label-text">RESEARCH LIBRARY</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">Research Reports</h1>
          <p className="species-dir-hero__desc">
            Progress summaries from Blue Ocean's active and completed research projects.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <div className="exp-grid__notice" style={{ marginBottom: 'var(--space-8)' }}>
            <Info size={16} />
            <span>
              Full published reports are still in preparation. Each entry below summarizes a research project and
              links to its live project page — downloadable documents will appear here once available. In the
              meantime, see our{' '}
              <Link to="/research/statistics" style={{ color: 'var(--color-turquoise)', fontWeight: 600, textDecoration: 'underline' }}>
                national Coastal & Marine Statistics reference
              </Link>{' '}
              and{' '}
              <Link to="/research/coastal-geography" style={{ color: 'var(--color-turquoise)', fontWeight: 600, textDecoration: 'underline' }}>
                Coastal Geomorphology & Habitats reference
              </Link>.
            </span>
          </div>

          <div className="exp-grid__toolbar" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="exp-grid__search">
              <Search size={16} className="exp-grid__search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="exp-grid__search-input"
                aria-label="Search research reports"
              />
            </div>
            <div className="exp-grid__pills" role="group" aria-label="Filter by research area">
              <button type="button" className={`exp-grid__pill ${selectedArea === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedArea('all')}>
                All Areas
              </button>
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  className={`exp-grid__pill ${selectedArea === area.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedArea(area.id)}
                >
                  {area.title}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="research-reports-grid">
              {filtered.map((r) => (
                <ResearchReportCard key={r.id} report={r} />
              ))}
            </div>
          ) : (
            <div className="exp-grid__empty">
              <div className="exp-grid__empty-icon">
                <Search size={32} />
              </div>
              <h3 className="exp-grid__empty-title">No reports matched your search</h3>
              <p className="exp-grid__empty-desc">Try a different research area or clear your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
