import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { getSpeciesCategories } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import './MarineCategories.css';

export default function MarineCategories() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const marineCategories = getSpeciesCategories(language);

  return (
    <section className="marine-cats section" aria-labelledby="marine-cats-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">{t('marineLife.categories.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="marine-cats-heading">
            {t('marineLife.categories.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('marineLife.categories.subheading')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="marine-cats__grid">
          {marineCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={localizedPath(`/marine-life/species?category=${cat.id}`)}
              className="marine-cat-card"
            >
              <div className="marine-cat-card__media">
                <img src={cat.image} alt={cat.title} className="marine-cat-card__img" loading="lazy" />
                <div className="marine-cat-card__overlay" />
                <span className="marine-cat-card__badge">{cat.countLabel}</span>
              </div>

              <div className="marine-cat-card__body">
                <span className="marine-cat-card__group">{cat.group}</span>
                <h3 className="marine-cat-card__title">{cat.title}</h3>
                <p className="marine-cat-card__desc">{cat.description}</p>

                <div className="marine-cat-card__footer">
                  <span className="marine-cat-card__cta">
                    <span>{t('marineLife.categories.exploreCta')}</span>
                    <ArrowRight size={14} className="marine-cat-card__arrow" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
