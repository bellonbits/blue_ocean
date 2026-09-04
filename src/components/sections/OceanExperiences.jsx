import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Heart, Sparkles } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import { getFeaturedExperiences } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';
import './OceanExperiences.css';

export default function OceanExperiences() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const [likes, setLikes] = useState({});
  const experiencesData = getFeaturedExperiences(language);

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="experiences section" aria-labelledby="experiences-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">{t('oceanExperiencesPreview.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="experiences-heading">
            {t('oceanExperiencesPreview.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('oceanExperiencesPreview.subheading')}
          </p>
        </div>

        {/* Interactive Framer Carousel */}
        <div className="experiences__carousel-wrap">
          <FramerCarousel
            items={experiencesData}
            itemWidth={360}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4500}
            renderItem={(exp) => {
              const isLiked = likes[exp.id];

              return (
                <Link to={localizedPath(`/experiences/${exp.slug}`)} className="exp-lux-card">
                  {/* Background Image */}
                  <div className="exp-lux-card__bg">
                    <img
                      src={exp.heroImage}
                      alt={exp.title}
                      className="exp-lux-card__img"
                      loading="lazy"
                    />
                    <div className="exp-lux-card__overlay" />
                  </div>

                  {/* Top Bar: Specs Pill & Actions */}
                  <div className="exp-lux-card__top">
                    <div className="exp-lux-card__specs">
                      <div className="exp-lux-card__spec">
                        <MapPin size={12} className="exp-lux-card__spec-icon" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="exp-lux-card__spec-divider" />
                      <div className="exp-lux-card__spec">
                        <Clock size={12} className="exp-lux-card__spec-icon" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <div className="exp-lux-card__top-actions">
                      <span className="exp-lux-card__category-badge">{exp.categoryName}</span>
                      <button
                        onClick={(e) => toggleLike(exp.id, e)}
                        className="exp-lux-card__like"
                        aria-label="Save experience"
                      >
                        <Heart size={14} fill={isLiked ? '#EF4444' : 'none'} color={isLiked ? '#EF4444' : '#FFFFFF'} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Content Area with Horizontal Title */}
                  <div className="exp-lux-card__bottom">
                    <div className="exp-lux-card__meta-bar">
                      <span className="badge badge-coming-soon">
                        <Sparkles size={11} />
                        <span>{t('oceanExperiencesPreview.comingSoon')}</span>
                      </span>
                      <div className="exp-lux-card__highlight-pill">
                        <span>{exp.region}</span>
                      </div>
                    </div>

                    {/* Clear Horizontal Title */}
                    <h3 className="exp-lux-card__title">{exp.title}</h3>

                    <p className="exp-lux-card__desc">{exp.shortDescription}</p>

                    <span className="exp-lux-card__cta">
                      <span>{t('oceanExperiencesPreview.cardCta')}</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              );
            }}
          />
        </div>

        <div className="experiences__cta-row reveal">
          <Link to={localizedPath('/experiences')} className="btn btn-primary btn-lg">
            <span>{t('oceanExperiencesPreview.mainCta')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
