import { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import CommunityStoryCard from './CommunityStoryCard';
import { COMMUNITY_CATEGORIES } from '../../data/communities';
import '../experiences/ExperienceGrid.css';

const REGIONS = ['Puntland', 'Jubaland', 'Somalia'];

export default function CommunityStoryGrid({ initialCategory = 'all', storiesList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedRegion !== 'all';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
  };

  const filteredStories = useMemo(() => {
    return storiesList.filter((s) => {
      if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
      if (selectedRegion !== 'all' && s.region !== selectedRegion) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          s.title.toLowerCase().includes(q) ||
          s.communityName?.toLowerCase().includes(q) ||
          s.location?.toLowerCase().includes(q) ||
          s.storyContent.some((p) => p.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [storiesList, searchQuery, selectedCategory, selectedRegion]);

  return (
    <div className="exp-grid" id="community-stories-grid">
      <div className="exp-grid__toolbar">
        <div className="exp-grid__search">
          <Search size={16} className="exp-grid__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, communities, locations..."
            className="exp-grid__search-input"
            aria-label="Search community stories"
          />
        </div>

        <div className="exp-grid__pills" role="group" aria-label="Filter by category">
          <button type="button" className={`exp-grid__pill ${selectedCategory === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedCategory('all')}>
            All Stories
          </button>
          {COMMUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`exp-grid__pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
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
      </div>

      {filteredStories.length > 0 ? (
        <div className="exp-grid__results">
          {filteredStories.map((s) => (
            <CommunityStoryCard key={s.id} story={s} />
          ))}
        </div>
      ) : (
        <div className="exp-grid__empty">
          <div className="exp-grid__empty-icon">
            <Search size={32} />
          </div>
          <h3 className="exp-grid__empty-title">No stories matched your search</h3>
          <p className="exp-grid__empty-desc">
            Try a different category or region, or clear your search.
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
