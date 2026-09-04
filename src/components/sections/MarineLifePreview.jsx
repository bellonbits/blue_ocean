import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fish, Waves, Compass, Sun, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import { useLanguage } from '../../context/LanguageContext';
import './MarineLifePreview.css';

const marineSpeciesData = [
  {
    id: 'whale-sharks',
    name: 'Whale Sharks',
    subtitle: 'Rhincodon typus',
    location: 'Gulf of Aden',
    depth: '0 - 500m',
    season: 'Oct - Apr',
    status: 'Endangered',
    count: '35+ Identified',
    description: 'The world\'s largest fish frequents the nutrient-rich coastal upwellings off Bosaso and Cap Guardafui.',
    image: '/marine_sharks.jpg',
    path: '/marine-life',
    rating: '9.9',
    tagline: 'Oceanic Giant',
    integrity: 'Protected',
  },
  {
    id: 'sea-turtles',
    name: 'Sea Turtles',
    subtitle: 'Chelonia mydas',
    location: 'Hafun & Bajuni',
    depth: 'Shallow Reefs',
    season: 'Year-Round',
    status: 'Vulnerable',
    count: '4 Species',
    description: 'Major nesting rookeries along Hafun tombolo and feeding grounds across southern mangrove shallows.',
    image: '/marine_turtles.jpg',
    path: '/marine-life',
    rating: '9.8',
    tagline: 'Ancient Mariners',
    integrity: 'Nesting Shore',
  },
  {
    id: 'dolphins-whales',
    name: 'Dolphins & Whales',
    subtitle: 'Cetacea Family',
    location: 'Somali Seaboard',
    depth: 'Pelagic Zone',
    season: 'Dec - May',
    status: 'Resident Pods',
    count: '14+ Species',
    description: 'Thousands of spinner dolphins, bottlenose pods, and migrating humpback whales traverse the maritime corridor.',
    image: '/marine_dolphins.jpg',
    path: '/marine-life',
    rating: '9.9',
    tagline: 'Acrobatic Pods',
    integrity: 'Safe Haven',
  },
  {
    id: 'coral-gardens',
    name: 'Coral Gardens',
    subtitle: 'Anthozoa Ecosystem',
    location: 'Bajuni Archipelago',
    depth: '5 - 35m',
    season: 'All Seasons',
    status: 'High Biodiversity',
    count: '180+ Coral Types',
    description: 'Pristine barrier reefs, brain corals, and staghorn thickets largely sheltered from industrial bleaching.',
    image: '/marine_coral.jpg',
    path: '/marine-life',
    rating: '9.9',
    tagline: 'Living Reef Barrier',
    integrity: '94% Health',
  },
  {
    id: 'reef-pelagic-fish',
    name: 'Reef & Pelagic Fish',
    subtitle: 'Actinopterygii',
    location: 'Somali Shelf',
    depth: 'Surface to 200m',
    season: 'Year-Round',
    status: 'Rich Biomass',
    count: '400+ Species',
    description: 'Yellowfin tuna, kingfish, groupers, parrotfish, and manta rays thriving in one of the world\'s richest fisheries.',
    image: '/exp_coral_snorkeling.jpg',
    path: '/marine-life',
    rating: '9.7',
    tagline: 'Abundant Fisheries',
    integrity: 'High Biomass',
  },
  {
    id: 'mangroves-seagrass',
    name: 'Mangroves & Seagrass',
    subtitle: 'Blue Carbon Habitats',
    location: 'Lower Juba Coast',
    depth: 'Intertidal',
    season: 'Year-Round',
    status: 'Carbon Sink',
    count: '600+ km²',
    description: 'Vital nursery habitats for juvenile fish, dugongs, and coastal erosion defense along southern estuaries.',
    image: '/marine_seagrass.jpg',
    path: '/marine-life',
    rating: '9.6',
    tagline: 'Blue Carbon Buffer',
    integrity: 'Vital Nursery',
  },
];

export default function MarineLifePreview() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const [likes, setLikes] = useState({});

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
                          <span className="lux-card__spec-val">{species.location.split(' ')[0]}</span>
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
                          aria-label="Save species"
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
                          <span>{species.rating} Bio Score</span>
                        </div>
                      </div>

                      <h3 className="lux-card__title">{species.name}</h3>

                      <p className="lux-card__desc">{species.description}</p>

                      <div className="lux-card__metrics">
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.rating}</span>
                          <span className="lux-card__metric-lbl">Bio Score</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.integrity}</span>
                          <span className="lux-card__metric-lbl">Status</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{species.count.split(' ')[0]}</span>
                          <span className="lux-card__metric-lbl">Records</span>
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
