import { Search, X } from 'lucide-react';

export default function SpeciesSearch({ value, onChange, onClear, totalResults }) {
  return (
    <div className="species-search">
      <div className="species-search__input-wrap">
        <Search size={18} className="species-search__icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by common, Somali (e.g. Jeedar, Diin-Badeed), or scientific name..."
          className="species-search__input"
          aria-label="Search marine species"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="species-search__clear-btn"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="species-search__meta">
        <span className="species-search__count">
          Showing <strong>{totalResults}</strong> species
        </span>
      </div>
    </div>
  );
}
