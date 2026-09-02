import { useState, useMemo } from 'react';
import LuxuryDestinationCard from './LuxuryDestinationCard';
import FramerCarousel from '../ui/FramerCarousel';
import { Search, MapPin, LayoutGrid, SlidersHorizontal, Sparkles } from 'lucide-react';
import './DestinationGrid.css';

export default function DestinationGrid({ destinations = [], selectedRegion, onSelectRegion }) {
  const [activeFilter, setActiveFilter] = useState(selectedRegion || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'

  // Keep internal state synchronized with parent prop if provided
  const currentFilter = selectedRegion !== undefined ? selectedRegion : activeFilter;

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (onSelectRegion) onSelectRegion(filterId);
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesRegion =
        currentFilter === 'all' ||
        dest.regionId === currentFilter ||
        dest.region.toLowerCase() === currentFilter.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.destinationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.coastlineArea.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [destinations, currentFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: destinations.length,
      puntland: destinations.filter((d) => d.regionId === 'puntland').length,
      somaliland: destinations.filter((d) => d.regionId === 'somaliland').length,
      jubaland: destinations.filter((d) => d.regionId === 'jubaland').length,
      somalia: destinations.filter((d) => d.regionId === 'somalia').length,
    };
  }, [destinations]);

  return (
    <section className="dest-section section" id="destinations-grid" aria-labelledby="dest-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="label-text">Somalia Coastal Catalog</span>
          <div className="divider" />
          <div className="dest-section__title-row">
            <div>
              <h2 className="section-heading" id="dest-heading">
                Places worth discovering.
              </h2>
              <p className="section-subheading">
                Explore individual coastal settlements, historic trading ports, natural harbors, and remote barrier islands across the Horn of Africa.
              </p>
            </div>

            {/* View Mode & Search Wrap */}
            <div className="dest-section__header-actions">
              <div className="dest-section__view-toggle">
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`dest-view-btn ${viewMode === 'carousel' ? 'dest-view-btn--active' : ''}`}
                  title="Carousel View"
                  aria-label="Carousel View"
                >
                  <Sparkles size={16} />
                  <span>Carousel</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`dest-view-btn ${viewMode === 'grid' ? 'dest-view-btn--active' : ''}`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid size={16} />
                  <span>Grid</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="dest-section__search-wrap">
                <Search size={16} className="dest-section__search-icon" />
                <input
                  type="text"
                  placeholder="Search destinations, bays, towns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dest-section__search-input"
                  aria-label="Search destinations"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="dest-section__search-clear"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="dest-filters reveal">
          <button
            onClick={() => handleFilterChange('all')}
            className={`dest-filter-btn ${currentFilter === 'all' ? 'dest-filter-btn--active' : ''}`}
            id="filter-all"
          >
            All Destinations
            <span className="dest-filter-count">{counts.all}</span>
          </button>

          <button
            onClick={() => handleFilterChange('puntland')}
            className={`dest-filter-btn ${currentFilter === 'puntland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-puntland"
          >
            Puntland
            <span className="dest-filter-count">{counts.puntland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('somaliland')}
            className={`dest-filter-btn ${currentFilter === 'somaliland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-somaliland"
          >
            Somaliland
            <span className="dest-filter-count">{counts.somaliland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('jubaland')}
            className={`dest-filter-btn ${currentFilter === 'jubaland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-jubaland"
          >
            Jubaland
            <span className="dest-filter-count">{counts.jubaland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('somalia')}
            className={`dest-filter-btn ${currentFilter === 'somalia' ? 'dest-filter-btn--active' : ''}`}
            id="filter-somalia"
          >
            Central & Southern Coast
            <span className="dest-filter-count">{counts.somalia}</span>
          </button>
        </div>

        {/* Dynamic Display (Carousel vs Grid) */}
        {filteredDestinations.length > 0 ? (
          viewMode === 'carousel' ? (
            <div className="dest-carousel-container">
              <FramerCarousel
                items={filteredDestinations}
                itemWidth={370}
                gap={24}
                autoPlay={true}
                autoPlayInterval={4500}
                renderItem={(destination) => (
                  <LuxuryDestinationCard destination={destination} />
                )}
              />
            </div>
          ) : (
            <div className="dest-grid">
              {filteredDestinations.map((destination) => (
                <LuxuryDestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )
        ) : (
          <div className="dest-empty-state reveal">
            <MapPin size={40} className="dest-empty-icon" />
            <h3 className="dest-empty-title">No destinations match your filter</h3>
            <p className="dest-empty-desc">
              Try adjusting your search terms or select another coastal region.
            </p>
            <button
              onClick={() => {
                handleFilterChange('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
