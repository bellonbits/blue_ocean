import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Waves, Sun, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import { useLanguage } from '../../context/LanguageContext';
import { getFeaturedSpecies, getSpeciesStatusInfo } from '../../data/marineLife';
import './MarineLifePreview.css';

export default function MarineLifePreview() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const [likes, setLikes] = useState({});

  const featured = useMemo(() => getFeaturedSpecies(language), [language]);

  const marineSpeciesData = useMemo(() => {
    return featured.map((s, idx) => {
      const statusInfo = getSpeciesStatusInfo(s.conservationStatus, language);
      const destinationName = s.destinations?.[0]?.name;
      const locationText = destinationName || (language === 'so' ? 'Xeebta Soomaaliya' : 'Somali Coast');

      return {
        id: s.id,
        slug: s.slug,
        name: s.commonName,
        subtitle: s.scientificName,
        location: locationText,
        depth: s.depth ? s.depth.split('(')[0].trim() : '0 - 100m',
        season: language === 'so' ? 'Sannadka oo Dhan' : 'Year-Round',
        status: statusInfo.label,
        count: `${s.destinations?.length || 3}+`,
        description: s.description,
        image: s.heroImage,
        path: `/marine-life/${s.slug}`,
        rating: (9.6 + ((idx * 3) % 4) * 0.1).toFixed(1),
        tagline: s.tagline || (language === 'so' ? 'Noolaha Badda' : 'Oceanic Wonder'),
        integrity: statusInfo.label,
      };
    });
  }, [featured, language]);

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="marine section" aria-labelledby="marine-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">{t('marineLifePreview.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="marine-heading">
            {t('marineLifePreview.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('marineLifePreview.subheading')}
          </p>
        </div>

        {/* Moving Framer Carousel */}
        <div className="marine__carousel-wrap">
          <FramerCarousel
            items={marineSpeciesData}
            itemWidth={370}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4500}
            renderItem={(species) => {
              const isLiked = likes[species.id];

              return (
                <div className="lux-card">
                  <Link to={localizedPath(species.path)} className="lux-card__link">
                    {/* Background Image */}
                    <div className="lux-card__bg">
                      <img
                        src={species.image}
                        alt={species.name}
                        className="lux-card__img"
                        loading="lazy"
                      />
                      <div className="lux-card__overlay" />
                    </div>

                    {/* Top Bar: Specs & Actions */}
                    <div className="lux-card__top">
                      <div className="lux-card__specs-pill">
                        <div className="lux-card__spec-item">
                          <MapPin size={12} className="lux-card__spec-icon" />
                          <span className="lux-card__spec-val">{species.location}</span>
                        </div>
                        <div className="lux-card__spec-divider" />
                        <div className="lux-card__spec-item">
                          <Waves size={12} className="lux-card__spec-icon" />
                          <span className="lux-card__spec-val">{species.depth}</span>
                        </div>
                        <div className="lux-card__spec-divider" />
                        <div className="lux-card__spec-item">
                          <Sun size={12} className="lux-card__spec-icon" />
                          <span className="lux-card__spec-val">{species.season}</span>
                        </div>
                      </div>

                      <div className="lux-card__top-actions">
                        <span className="lux-card__region-tag">{species.status}</span>
                        <button
                          onClick={(e) => toggleLike(species.id, e)}
                          className={`lux-card__action-btn ${isLiked ? 'lux-card__action-btn--liked' : ''}`}
                          aria-label={language === 'so' ? 'Kaydi noocan' : 'Save species'}
                        >
                          <Heart size={14} fill={isLiked ? '#EF4444' : 'none'} color={isLiked ? '#EF4444' : '#FFFFFF'} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Area with Prominent Horizontal Title */}
                    <div className="lux-card__bottom">
                      <div className="lux-card__badge-row">
                        <span className="lux-card__badge-sub">{species.tagline}</span>
                        <div className="lux-card__score-badge">
                          <Sparkles size={12} />
                          <span>{species.rating} {t('marineLifePreview.bioScore')}</span>
                        </div>
                      </div>

                      <h3 className="lux-card__title">{species.name}</h3>

                      <p className="lux-card__desc">{species.description}</p>

                      <div className="lux-card__metrics">
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.rating}</span>
                          <span className="lux-card__metric-lbl">{t('marineLifePreview.bioScore')}</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.integrity}</span>
                          <span className="lux-card__metric-lbl">{t('marineLifePreview.status')}</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.count}</span>
                          <span className="lux-card__metric-lbl">{t('marineLifePreview.records')}</span>
                        </div>
                      </div>

                      <div className="lux-card__cta-btn">
                        <span>{t('marineLifePreview.cardCta')}</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }}
          />
        </div>

        {/* Main CTA */}
        <div className="marine__cta reveal">
          <Link to={localizedPath('/marine-life')} className="btn btn-primary btn-lg" id="marine-explore-all">
            {t('marineLifePreview.mainCta')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
