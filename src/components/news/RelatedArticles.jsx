import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedArticles } from '../../data/news';
import ArticleCard from './ArticleCard';
import '../experiences/RelatedExperiences.css';

export default function RelatedArticles({ currentSlug }) {
  const related = getRelatedArticles(currentSlug, 3);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-exp section" aria-labelledby="related-articles-heading">
      <div className="container">
        <div className="related-exp__header reveal">
          <div className="related-exp__header-left">
            <span className="label-text">KEEP READING</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-articles-heading">
              More stories from the coast
            </h2>
          </div>

          <div className="related-exp__header-right">
            <Link to="/news/articles" className="related-exp__btn">
              <span>View All Stories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="related-exp__grid reveal">
          {related.map((a) => (
            <div key={a.id} className="related-exp__item">
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
