import { useState, useMemo } from 'react';
import { Filter, Grid, SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';
import SpeciesCard from './SpeciesCard';
import SpeciesSearch from './SpeciesSearch';
import SpeciesFilters from './SpeciesFilters';
import FramerCarousel from '../ui/FramerCarousel';
import './SpeciesGrid.css';

export default function SpeciesGrid({
  initialCategory = 'all',
  speciesList = [],
  showSearchHeader = true,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedHabitat, setSelectedHabitat] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedHabitat('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedHabitat !== 'all' ||
    selectedStatus !== 'all';

  // Filter and search logic across English, Somali, and Scientific names
  const filteredSpecies = useMemo(() => {
    return speciesList.filter((species) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesCommon = species.commonName?.toLowerCase().includes(q);
        const matchesSomali = species.somaliName?.toLowerCase().includes(q);
        const matchesScientific = species.scientificName?.toLowerCase().includes(q);
        const matchesDesc = species.description?.toLowerCase().includes(q);
        const matchesGroup = species.group?.toLowerCase().includes(q);
        if (!matchesCommon && !matchesSomali && !matchesScientific && !matchesDesc && !matchesGroup) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && species.category !== selectedCategory) {
        return false;
      }

      // 3. Habitat Filter
      if (selectedHabitat !== 'all') {
        if (!species.habitat?.toLowerCase().includes(selectedHabitat.toLowerCase())) {
          return false;
        }
      }

      // 4. Conservation Status
      if (selectedStatus !== 'all') {
        if (species.conservationStatus?.toLowerCase() !== selectedStatus.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [speciesList, searchQuery, selectedCategory, selectedHabitat, selectedStatus]);

  return (
    <div className="species-dir" id="species-directory-container">
      {/* Top Search & Filter Bar */}
      {showSearchHeader && (
        <div className="species-dir__search-bar">
          <SpeciesSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            totalResults={filteredSpecies.length}
          />

          <div className="species-dir__controls">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              className="species-dir__mobile-filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
              aria-label="Open filter options"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {hasActiveFilters && <span className="species-dir__filter-dot" />}
            </button>

            {/* View Mode Toggle (Grid vs Carousel) */}
            <div className="species-dir__view-toggle" role="group" aria-label="View toggle">
              <button
                type="button"
                className={`species-dir__toggle-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <Grid size={16} />
                <span className="species-dir__toggle-label">Grid</span>
              </button>
              <button
                type="button"
                className={`species-dir__toggle-btn ${viewMode === 'carousel' ? 'is-active' : ''}`}
                onClick={() => setViewMode('carousel')}
                title="Carousel view"
              >
                <SlidersHorizontal size={16} />
                <span className="species-dir__toggle-label">Carousel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Species Grid */}
      <div className="species-dir__layout">
        {/* Filter Sidebar */}
        <div className="species-dir__sidebar">
          <SpeciesFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedHabitat={selectedHabitat}
            onSelectHabitat={setSelectedHabitat}
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
            onReset={handleReset}
            hasActiveFilters={hasActiveFilters}
            isOpenMobile={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />
        </div>

        {/* Content Area */}
        <div className="species-dir__content">
          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="species-dir__active-tags">
              <span className="species-dir__active-label">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  className="species-dir__tag-chip"
                  onClick={() => setSelectedCategory('all')}
                >
                  <span>Category: {selectedCategory}</span>
                  <span className="species-dir__tag-x">×</span>
                </button>
              )}
              {selectedHabitat !== 'all' && (
                <button
                  type="button"
                  className="species-dir__tag-chip"
                  onClick={() => setSelectedHabitat('all')}
                >
                  <span>Habitat: {selectedHabitat}</span>
                  <span className="species-dir__tag-x">×</span>
                </button>
              )}
              {selectedStatus !== 'all' && (
                <button
                  type="button"
                  className="species-dir__tag-chip"
                  onClick={() => setSelectedStatus('all')}
                >
                  <span>Status: {selectedStatus}</span>
                  <span className="species-dir__tag-x">×</span>
                </button>
              )}
              {searchQuery && (
                <button
                  type="button"
                  className="species-dir__tag-chip"
                  onClick={() => setSearchQuery('')}
                >
                  <span>"{searchQuery}"</span>
                  <span className="species-dir__tag-x">×</span>
                </button>
              )}
              <button
                type="button"
                className="species-dir__clear-all-link"
                onClick={handleReset}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Display */}
          {filteredSpecies.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="species-dir__grid">
                {filteredSpecies.map((species) => (
                  <div key={species.id} className="species-dir__grid-item">
                    <SpeciesCard species={species} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="species-dir__carousel-wrapper">
                <FramerCarousel
                  items={filteredSpecies}
                  itemWidth={360}
                  gap={20}
                  autoPlay={true}
                  autoPlayInterval={5500}
                  renderItem={(species) => (
                    <div className="species-dir__carousel-item">
                      <SpeciesCard species={species} />
                    </div>
                  )}
                />
              </div>
            )
          ) : (
            /* Zero-Results Empty State */
            <div className="species-dir__empty-state">
              <div className="species-dir__empty-icon">
                <Search size={32} />
              </div>
              <h3 className="species-dir__empty-title">No species matched your criteria</h3>
              <p className="species-dir__empty-desc">
                Try searching with alternative Somali or scientific terms, or reset the taxonomy and status filters.
              </p>
              <button
                type="button"
                className="species-dir__empty-btn"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
