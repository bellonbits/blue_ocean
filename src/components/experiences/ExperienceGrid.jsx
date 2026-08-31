import { useState, useMemo } from 'react';
import { Search, RotateCcw, Info } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import { experienceCategories } from '../../data/experiences';
import './ExperienceGrid.css';

export default function ExperienceGrid({ initialCategory = 'all', experiencesList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const filteredExperiences = useMemo(() => {
    return experiencesList.filter((exp) => {
      if (selectedCategory !== 'all' && exp.category !== selectedCategory) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          exp.title.toLowerCase().includes(q) ||
          exp.tagline?.toLowerCase().includes(q) ||
          exp.shortDescription?.toLowerCase().includes(q) ||
          exp.location?.toLowerCase().includes(q) ||
          exp.region?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [experiencesList, searchQuery, selectedCategory]);

  return (
    <div className="exp-grid" id="experiences-grid">
      {/* Coming Soon Notice */}
      <div className="exp-grid__notice">
        <Info size={16} />
        <span>
          Every experience below is in active development. Blue Ocean does not currently operate live bookings —
          this directory previews what's coming to the Somali coast.
        </span>
      </div>

      {/* Search + Category Pills */}
      <div className="exp-grid__toolbar">
        <div className="exp-grid__search">
          <Search size={16} className="exp-grid__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiences, locations, regions..."
            className="exp-grid__search-input"
            aria-label="Search ocean experiences"
          />
        </div>

        <div className="exp-grid__pills" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`exp-grid__pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          {experienceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`exp-grid__pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredExperiences.length > 0 ? (
        <div className="exp-grid__results">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
        <div className="exp-grid__empty">
          <div className="exp-grid__empty-icon">
            <Search size={32} />
          </div>
          <h3 className="exp-grid__empty-title">No experiences matched your search</h3>
          <p className="exp-grid__empty-desc">
            Try a different category or clear your search to see everything planned for the Somali coast.
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
