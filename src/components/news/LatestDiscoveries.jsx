import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getFeaturedArticle, getLatestArticles } from '../../data/news';
import ArticleCard from './ArticleCard';
import '../research/FeaturedResearch.css';
import '../sections/NewsPreview.css';

export default function LatestDiscoveries() {
  const featured = getFeaturedArticle();
  const others = getLatestArticles(3, featured.slug);

  return (
    <section className="featured-research section" aria-labelledby="latest-discoveries-heading">
      <div className="container">
        <div className="news-preview__header reveal">
          <div>
            <span className="label-text">FROM THE FIELD</span>
            <div className="divider" />
            <h2 className="section-heading" id="latest-discoveries-heading">
              Latest discoveries
            </h2>
          </div>
          <Link to="/news" className="btn btn-outline" id="latest-discoveries-view-all">
            <span>View All Stories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <Link to={`/news/${featured.slug}`} className="featured-research__card reveal">
          <div className="featured-research__media">
            <img src={featured.featuredImage} alt={featured.title} className="featured-research__img" loading="lazy" />
            <div className="featured-research__overlay" />
          </div>

          <div className="featured-research__content">
            <span className="featured-research__area">{featured.categoryLabel}</span>
            <h3 className="featured-research__title">{featured.title}</h3>
            <p className="featured-research__summary">{featured.excerpt}</p>

            <div className="featured-research__meta">
              <span className="featured-research__meta-item">
                <Calendar size={13} />
                <span>{featured.displayDate}</span>
              </span>
              <span className="featured-research__meta-item">
                <Clock size={13} />
                <span>{featured.readTime}</span>
              </span>
            </div>

            <span className="featured-research__cta">
              <span>Read story</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {others.length > 0 && (
          <div className="featured-research__others reveal">
            {others.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
