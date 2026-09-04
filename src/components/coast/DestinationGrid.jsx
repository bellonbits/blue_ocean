import { useState, useMemo } from 'react';
import LuxuryDestinationCard from './LuxuryDestinationCard';
import FramerCarousel from '../ui/FramerCarousel';
import { Search, MapPin, LayoutGrid, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './DestinationGrid.css';

export default function DestinationGrid({ destinations = [], selectedRegion, onSelectRegion }) {
  const { t } = useLanguage();
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
          <span className="label-text">{t('exploreCoast.destinationGrid.eyebrow')}</span>
          <div className="divider" />
          <div className="dest-section__title-row">
            <div>
              <h2 className="section-heading" id="dest-heading">
                {t('exploreCoast.destinationGrid.heading')}
              </h2>
              <p className="section-subheading">
                {t('exploreCoast.destinationGrid.subheading')}
              </p>
            </div>

            {/* View Mode & Search Wrap */}
            <div className="dest-section__header-actions">
              <div className="dest-section__view-toggle">
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`dest-view-btn ${viewMode === 'carousel' ? 'dest-view-btn--active' : ''}`}
                  title={t('exploreCoast.destinationGrid.viewCarouselTitle')}
                  aria-label={t('exploreCoast.destinationGrid.viewCarouselTitle')}
                >
                  <Sparkles size={16} />
                  <span>{t('exploreCoast.destinationGrid.viewCarousel')}</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`dest-view-btn ${viewMode === 'grid' ? 'dest-view-btn--active' : ''}`}
                  title={t('exploreCoast.destinationGrid.viewGridTitle')}
                  aria-label={t('exploreCoast.destinationGrid.viewGridTitle')}
                >
                  <LayoutGrid size={16} />
                  <span>{t('exploreCoast.destinationGrid.viewGrid')}</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="dest-section__search-wrap">
                <Search size={16} className="dest-section__search-icon" />
                <input
                  type="text"
                  placeholder={t('exploreCoast.destinationGrid.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dest-section__search-input"
                  aria-label={t('exploreCoast.destinationGrid.searchAriaLabel')}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="dest-section__search-clear"
                    aria-label={t('exploreCoast.destinationGrid.searchClearAriaLabel')}
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
            {t('exploreCoast.destinationGrid.filterAll')}
            <span className="dest-filter-count">{counts.all}</span>
          </button>

          <button
            onClick={() => handleFilterChange('puntland')}
            className={`dest-filter-btn ${currentFilter === 'puntland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-puntland"
          >
            {t('exploreCoast.destinationGrid.filterPuntland')}
            <span className="dest-filter-count">{counts.puntland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('somaliland')}
            className={`dest-filter-btn ${currentFilter === 'somaliland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-somaliland"
          >
            {t('exploreCoast.destinationGrid.filterSomaliland')}
            <span className="dest-filter-count">{counts.somaliland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('jubaland')}
            className={`dest-filter-btn ${currentFilter === 'jubaland' ? 'dest-filter-btn--active' : ''}`}
            id="filter-jubaland"
          >
            {t('exploreCoast.destinationGrid.filterJubaland')}
            <span className="dest-filter-count">{counts.jubaland}</span>
          </button>

          <button
            onClick={() => handleFilterChange('somalia')}
            className={`dest-filter-btn ${currentFilter === 'somalia' ? 'dest-filter-btn--active' : ''}`}
            id="filter-somalia"
          >
            {t('exploreCoast.destinationGrid.filterSomalia')}
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
            <h3 className="dest-empty-title">{t('exploreCoast.destinationGrid.emptyTitle')}</h3>
            <p className="dest-empty-desc">
              {t('exploreCoast.destinationGrid.emptyDesc')}
            </p>
            <button
              onClick={() => {
                handleFilterChange('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              {t('exploreCoast.destinationGrid.resetFilters')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
