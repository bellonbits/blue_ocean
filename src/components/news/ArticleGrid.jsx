import { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { getNewsCategories } from '../../data/news';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceGrid.css';

const PAGE_SIZE = 6;

export default function ArticleGrid({ initialCategory = 'all', articlesList = [] }) {
  const { language, t } = useLanguage();
  const categories = getNewsCategories(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setVisibleCount(PAGE_SIZE);
  };

  const filteredArticles = useMemo(() => {
    return articlesList.filter((a) => {
      if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q) ||
          a.destinations?.some((d) => d.name.toLowerCase().includes(q)) ||
          a.species?.some((s) => s.commonName.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [articlesList, searchQuery, selectedCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = filteredArticles.length > visibleArticles.length;

  return (
    <div className="exp-grid" id="articles-grid">
      <div className="exp-grid__toolbar">
        <div className="exp-grid__search">
          <Search size={16} className="exp-grid__search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
            placeholder={t('news.grid.searchPlaceholder')}
            className="exp-grid__search-input"
            aria-label={t('news.grid.searchAriaLabel')}
          />
        </div>

        <div className="exp-grid__pills" role="group" aria-label={t('news.grid.filterAriaLabel')}>
          <button
            type="button"
            className={`exp-grid__pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => { setSelectedCategory('all'); setVisibleCount(PAGE_SIZE); }}
          >
            {t('news.grid.allPill')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`exp-grid__pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => { setSelectedCategory(cat.id); setVisibleCount(PAGE_SIZE); }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {visibleArticles.length > 0 ? (
        <>
          <div className="exp-grid__results">
            {visibleArticles.map((a, i) => (
              <ArticleCard key={a.id} article={a} priority={i < 3} />
            ))}
          </div>

          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                <span>{t('news.grid.loadMore')}</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="exp-grid__empty">
          <div className="exp-grid__empty-icon">
            <Search size={32} />
          </div>
          <h3 className="exp-grid__empty-title">{t('news.grid.emptyTitle')}</h3>
          <p className="exp-grid__empty-desc">
            {t('news.grid.emptyDesc')}
          </p>
          {hasActiveFilters && (
            <button type="button" className="exp-grid__empty-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              <span>{t('news.grid.resetFilters')}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
