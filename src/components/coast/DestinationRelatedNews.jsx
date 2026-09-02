import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { getRelatedNews } from '../../lib/contentApi';
import ArticleCard from '../news/ArticleCard';

// Real relationship-driven "related stories" — pulls whichever published
// articles are actually linked to this destination in the database
// (see NewsArticle.destinations), not a hardcoded list. Renders nothing
// when there are none, so a destination with no coverage yet shows no
// empty section.
export default function DestinationRelatedNews({ slug }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let cancelled = false;
    if (!slug) return undefined;
    getRelatedNews({ destination: slug })
      .then((a) => { if (!cancelled) setArticles(a); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  if (articles.length === 0) return null;

  return (
    <section className="section container" aria-labelledby="related-news-heading">
      <div className="section-header reveal">
        <span className="label-text">
          <Newspaper size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          LATEST STORIES
        </span>
        <div className="divider" />
        <h2 className="section-heading" id="related-news-heading">
          News from this destination
        </h2>
      </div>

      <div className="dest-grid">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
        <Link to="/news" className="btn btn-outline btn-sm">
          <span>Explore All Stories</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
