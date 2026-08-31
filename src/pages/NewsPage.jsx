import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import NewsHero from '../components/news/NewsHero';
import FeaturedArticle from '../components/news/FeaturedArticle';
import NewsCategoryStrip from '../components/news/NewsCategoryStrip';
import ArticleCard from '../components/news/ArticleCard';
import { getLatestArticles, getFeaturedArticle } from '../data/news';
import '../components/experiences/ExperienceGrid.css';

export default function NewsPage() {
  useScrollReveal();
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(6, featured.slug);

  useEffect(() => {
    document.title = 'News & Discoveries — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Blue Ocean News & Discoveries">
      <NewsHero />
      <FeaturedArticle />
      <NewsCategoryStrip />

      <section className="section" aria-labelledby="latest-articles-heading">
        <div className="container">
          <div className="section-header reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <span className="label-text">LATEST ARTICLES</span>
              <div className="divider" />
              <h2 className="section-heading" id="latest-articles-heading">More from Blue Ocean</h2>
            </div>
            <Link to="/news/articles" className="btn btn-outline">
              <span>View All Stories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="exp-grid__results reveal" style={{ marginTop: 'var(--space-10)' }}>
            {latest.map((a, i) => (
              <ArticleCard key={a.id} article={a} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
