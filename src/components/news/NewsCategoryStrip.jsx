import { Link } from 'react-router-dom';
import { ArrowRight, Fish, FlaskConical, Compass, Shield, Users, Waves } from 'lucide-react';
import { getNewsCategories, getCategoryArticleCount } from '../../data/news';
import { useLanguage } from '../../context/LanguageContext';

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
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const categories = getNewsCategories(language);

  return (
    <section className="exp-cats section" id="news-categories" aria-labelledby="news-categories-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('news.categoryStrip.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="news-categories-heading">
            {t('news.categoryStrip.heading')}
          </h2>
        </div>

        <div className="exp-cats__grid">
          {categories.map((cat) => {
            const Icon = ICONS[cat.id] || Fish;
            const count = getCategoryArticleCount(cat.id);

            return (
              <Link key={cat.id} to={localizedPath(`/news/articles?category=${cat.id}`)} className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={IMAGES[cat.id]} alt={cat.label} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">{t('news.categoryStrip.storyCount', count)}</span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{cat.label}</h3>

                  <span className="exp-cat-card__cta">
                    <span>{t('news.categoryStrip.browse')}</span>
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
