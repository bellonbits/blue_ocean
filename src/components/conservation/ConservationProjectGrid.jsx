import { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import ConservationProjectCard from './ConservationProjectCard';
import { conservationFocusAreas, CONSERVATION_STATUSES } from '../../data/conservation';
import '../experiences/ExperienceGrid.css';

const REGIONS = ['Puntland', 'Jubaland', 'Somalia'];

export default function ConservationProjectGrid({ initialArea = 'all', projectsList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedArea !== 'all' || selectedRegion !== 'all' || selectedStatus !== 'all';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedArea('all');
    setSelectedRegion('all');
    setSelectedStatus('all');
  };

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      if (selectedArea !== 'all' && p.focusArea !== selectedArea) return false;
      if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
      if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.summary?.toLowerCase().includes(q) ||
          p.focusAreaName?.toLowerCase().includes(q) ||
          p.region?.toLowerCase().includes(q) ||
          p.species?.some((s) => s.commonName.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [projectsList, searchQuery, selectedArea, selectedRegion, selectedStatus]);

  return (
    <div className="exp-grid" id="conservation-projects-grid">
      <div className="exp-grid__toolbar">
        <div className="exp-grid__search">
          <Search size={16} className="exp-grid__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, locations, species..."
            className="exp-grid__search-input"
            aria-label="Search conservation projects"
          />
        </div>

        <div className="exp-grid__pills" role="group" aria-label="Filter by focus area">
          <button type="button" className={`exp-grid__pill ${selectedArea === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedArea('all')}>
            All Areas
          </button>
          {conservationFocusAreas.map((area) => (
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

        <div className="exp-grid__pills" role="group" aria-label="Filter by region">
          <button type="button" className={`exp-grid__pill ${selectedRegion === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedRegion('all')}>
            All Regions
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              className={`exp-grid__pill ${selectedRegion === region ? 'is-active' : ''}`}
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="exp-grid__pills" role="group" aria-label="Filter by status">
          <button type="button" className={`exp-grid__pill ${selectedStatus === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedStatus('all')}>
            All Statuses
          </button>
          {CONSERVATION_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={`exp-grid__pill ${selectedStatus === status ? 'is-active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="exp-grid__results">
          {filteredProjects.map((p) => (
            <ConservationProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="exp-grid__empty">
          <div className="exp-grid__empty-icon">
            <Search size={32} />
          </div>
          <h3 className="exp-grid__empty-title">No conservation projects matched your search</h3>
          <p className="exp-grid__empty-desc">
            Try a different focus area, region, or status, or clear your search.
          </p>
          {hasActiveFilters && (
            <button type="button" className="exp-grid__empty-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
