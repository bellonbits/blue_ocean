import { Filter, RotateCcw, X, Check } from 'lucide-react';
import { getSpeciesCategories } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import './SpeciesFilters.css';

const habitatOptions = [
  { id: 'all', label: 'All Habitats' },
  { id: 'Open Ocean', label: 'Open Ocean' },
  { id: 'Coral Reef', label: 'Coral Reef' },
  { id: 'Coastal Waters', label: 'Coastal Waters' },
  { id: 'Seagrass', label: 'Seagrass Meadows' },
  { id: 'Mangrove', label: 'Mangrove Forests' },
  { id: 'Sandy', label: 'Sandy Shoals & Dunes' },
  { id: 'Rocky', label: 'Rocky Cliffs & Coves' },
];

const statusOptions = [
  { id: 'all', label: 'All Conservation Statuses' },
  { id: 'Critically Endangered', label: 'Critically Endangered (CR)' },
  { id: 'Endangered', label: 'Endangered (EN)' },
  { id: 'Vulnerable', label: 'Vulnerable (VU)' },
  { id: 'Near Threatened', label: 'Near Threatened (NT)' },
  { id: 'Least Concern', label: 'Least Concern (LC)' },
];

export default function SpeciesFilters({
  selectedCategory,
  onSelectCategory,
  selectedHabitat,
  onSelectHabitat,
  selectedStatus,
  onSelectStatus,
  onReset,
  hasActiveFilters,
  isOpenMobile,
  onCloseMobile,
}) {
  const { language } = useLanguage();
  const marineCategories = getSpeciesCategories(language);

  return (
    <aside className={`species-filters ${isOpenMobile ? 'is-mobile-open' : ''}`}>
      {/* Mobile Header */}
      <div className="species-filters__mobile-header">
        <div className="species-filters__mobile-title">
          <Filter size={18} />
          <span>Filter Species Library</span>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="species-filters__close-btn"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      <div className="species-filters__inner">
        {/* Header & Reset */}
        <div className="species-filters__top">
          <div className="species-filters__header-title">
            <Filter size={16} />
            <span>Refine Library</span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="species-filters__reset-btn"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 1. Category Filter */}
        <div className="species-filters__group">
          <h4 className="species-filters__group-title">Classification Group</h4>
          <div className="species-filters__options">
            <button
              type="button"
              className={`species-filters__option-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => onSelectCategory('all')}
            >
              <span>All Categories</span>
              {selectedCategory === 'all' && <Check size={14} />}
            </button>
            {marineCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`species-filters__option-btn ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.title}</span>
                {selectedCategory === cat.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Habitat Filter */}
        <div className="species-filters__group">
          <h4 className="species-filters__group-title">Habitat Type</h4>
          <div className="species-filters__options">
            {habitatOptions.map((h) => (
              <button
                key={h.id}
                type="button"
                className={`species-filters__option-btn ${selectedHabitat === h.id ? 'is-active' : ''}`}
                onClick={() => onSelectHabitat(h.id)}
              >
                <span>{h.label}</span>
                {selectedHabitat === h.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Conservation Status */}
        <div className="species-filters__group">
          <h4 className="species-filters__group-title">IUCN Red List Status</h4>
          <div className="species-filters__options">
            {statusOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`species-filters__option-btn ${selectedStatus === s.id ? 'is-active' : ''}`}
                onClick={() => onSelectStatus(s.id)}
              >
                <span>{s.label}</span>
                {selectedStatus === s.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="species-filters__mobile-footer">
          <button
            type="button"
            className="species-filters__apply-btn"
            onClick={onCloseMobile}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
