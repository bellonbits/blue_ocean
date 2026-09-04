import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import ArticleGrid from '../components/news/ArticleGrid';
import { getAllArticles } from '../data/news';
import './SpeciesDirectoryPage.css';

export default function NewsArticlesPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const { language } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    document.title = 'All Stories — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="news-articles-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to="/news" className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>News Overview</span>
            </Link>
          </div>

          <span className="label-text">STORY ARCHIVE</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">All Stories</h1>
          <p className="species-dir-hero__desc">
            Search and filter Blue Ocean's published research findings, conservation updates, and stories from
            Somalia's coast.
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          <ArticleGrid initialCategory={categoryParam} articlesList={getAllArticles(language)} />
        </div>
      </section>
    </main>
  );
}
