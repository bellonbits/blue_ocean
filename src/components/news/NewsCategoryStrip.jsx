import { Link } from 'react-router-dom';
import { ArrowRight, Fish, FlaskConical, Compass, Shield, Users, Waves } from 'lucide-react';
import { NEWS_CATEGORIES, getCategoryArticleCount } from '../../data/news';

const ICONS = {
  'marine-life': Fish,
  research: FlaskConical,
  tourism: Compass,
  conservation: Shield,
  'coastal-communities': Users,
  'ocean-news': Waves,
};

const IMAGES = {
  'marine-life': '/marine_turtles.jpg',
  research: '/exp_scuba_diving.jpg',
  tourism: '/jubaland.jpg',
  conservation: '/marine_coral.jpg',
  'coastal-communities': '/puntland.jpg',
  'ocean-news': '/somalia_coast.jpg',
};

export default function NewsCategoryStrip() {
  return (
    <section className="exp-cats section" id="news-categories" aria-labelledby="news-categories-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">BROWSE BY CATEGORY</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="news-categories-heading">
            Stories by Category
          </h2>
        </div>

        <div className="exp-cats__grid">
          {NEWS_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.id] || Fish;
            const count = getCategoryArticleCount(cat.id);

            return (
              <Link key={cat.id} to={`/news/articles?category=${cat.id}`} className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={IMAGES[cat.id]} alt={cat.label} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">{count} {count === 1 ? 'Story' : 'Stories'}</span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{cat.label}</h3>

                  <span className="exp-cat-card__cta">
                    <span>Browse</span>
                    <ArrowRight size={14} className="exp-cat-card__arrow" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
