import { useState, useMemo } from 'react';
import { Search, RotateCcw, Info } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import { getExperienceCategories } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';
import './ExperienceGrid.css';

export default function ExperienceGrid({ initialCategory = 'all', experiencesList = [] }) {
  const { language, t } = useLanguage();
  const experienceCategories = getExperienceCategories(language);
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
          {t('oceanExperiences.grid.notice')}
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
            placeholder={t('oceanExperiences.grid.searchPlaceholder')}
            className="exp-grid__search-input"
            aria-label={t('oceanExperiences.grid.searchAriaLabel')}
          />
        </div>

        <div className="exp-grid__pills" role="group" aria-label={t('oceanExperiences.grid.filterAriaLabel')}>
          <button
            type="button"
            className={`exp-grid__pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {t('oceanExperiences.grid.allPill')}
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
          <h3 className="exp-grid__empty-title">{t('oceanExperiences.grid.emptyTitle')}</h3>
          <p className="exp-grid__empty-desc">
            {t('oceanExperiences.grid.emptyDesc')}
          </p>
          {hasActiveFilters && (
            <button type="button" className="exp-grid__empty-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              <span>{t('oceanExperiences.grid.resetFilters')}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
