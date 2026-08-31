import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sun, Compass, Heart, ArrowRight, Sparkles } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import './ExploreCoast.css';

const regionsData = [
  {
    id: 'puntland',
    name: 'Puntland',
    subtitle: 'Northern Somalia',
    location: 'Bari & Nugaal',
    duration: '7 Days',
    season: 'Oct - Apr',
    type: 'Deep Pelagic',
    description: 'Dramatic cliffs, the Gulf of Aden, and some of Somalia\'s richest marine biodiversity. Home to Bosaso, Bargaal, and Cap Guardafui.',
    image: '/exp_coastal_cliff.jpg',
    rating: '9.8',
    integrity: '92%',
    coastline: '~2,000 km',
    path: '/explore-the-coast',
    tagline: 'Gulf of Aden Corridor',
  },
  {
    id: 'jubaland',
    name: 'Jubaland',
    subtitle: 'Southern Somalia',
    location: 'Lower Juba & Bajuni',
    duration: '6 Days',
    season: 'Nov - Mar',
    type: 'Coral Atolls',
    description: 'Lush tropical coastline, pristine white beaches, and intact coral atolls stretching from Kismayo to the Kenyan border.',
    image: '/jubaland.jpg',
    rating: '9.9',
    integrity: '96%',
    coastline: '~700 km',
    path: '/explore-the-coast',
    tagline: 'Indian Ocean Reefs',
  },
  {
    id: 'somalia-coast',
    name: 'Somalia Coast',
    subtitle: 'The Full Seaboard',
    location: 'Djibouti to Kenya',
    duration: '14 Days',
    season: 'All Seasons',
    type: 'Grand Expedition',
    description: 'Africa\'s longest coastline stretching 3,025 km — explore maritime history, ancient dhow harbors, and pelagic frontiers.',
    image: '/somalia_coast.jpg',
    rating: '9.9',
    integrity: '94%',
    coastline: '3,025 km',
    path: '/explore-the-coast',
    tagline: 'Africa\'s Longest Coast',
  },
  {
    id: 'bosaso-cape',
    name: 'Cap Guardafui',
    subtitle: 'Horn of Africa Tip',
    location: 'Ras Asir Channel',
    duration: '5 Days',
    season: 'Oct - May',
    type: 'Pelagic Upwelling',
    description: 'The iconic geographical tip of Africa where the Red Sea, Gulf of Aden, and Indian Ocean meet in powerful marine currents.',
    image: '/bosaso2.jpg',
    rating: '9.7',
    integrity: '95%',
    coastline: '~450 km',
    path: '/explore-the-coast/bosaso',
    tagline: 'Ocean Confluence',
  },
  {
    id: 'hafun-peninsula',
    name: 'Hafun Peninsula',
    subtitle: 'Easternmost Africa',
    location: 'Hafun Sandspit',
    duration: '4 Days',
    season: 'Nov - Apr',
    type: 'Ancient Seaport',
    description: 'A 40km natural tombolo sandspit linked to historic spice trade routes, home to nesting sea turtles and dune lagoons.',
    image: '/hafun2.jpg',
    rating: '9.6',
    integrity: '91%',
    coastline: '~280 km',
    path: '/explore-the-coast/hafun',
    tagline: 'Ancient Spice Port',
  },
];

export default function ExploreCoast() {
  const [likes, setLikes] = useState({});

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="explore section" id="explore-coast" aria-labelledby="explore-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">Regional Coastal Journeys</span>
          <div className="divider" />
          <h2 className="section-heading" id="explore-heading">
            Explore Somalia's Coast
          </h2>
          <p className="section-subheading">
            From the dramatic cliffs of Puntland to the tropical atolls of Jubaland —
            discover curated journeys along Africa's longest maritime frontier.
          </p>
        </div>

        {/* Moving Framer Carousel */}
        <div className="explore__carousel-wrap">
          <FramerCarousel
            items={regionsData}
            itemWidth={370}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4500}
            renderItem={(region) => {
              const isLiked = likes[region.id];

              return (
                <div className="lux-card">
                  <Link to={region.path} className="lux-card__link">
                    {/* Background Image */}
                    <div className="lux-card__bg">
                      <img
                        src={region.image}
                        alt={`${region.name} coastline`}
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
                          <span className="lux-card__spec-val">{region.location.split(' ')[0]}</span>
                        </div>
                        <div className="lux-card__spec-divider" />
                        <div className="lux-card__spec-item">
                          <Calendar size={12} className="lux-card__spec-icon" />
                          <span className="lux-card__spec-val">{region.duration}</span>
                        </div>
                        <div className="lux-card__spec-divider" />
                        <div className="lux-card__spec-item">
                          <Sun size={12} className="lux-card__spec-icon" />
                          <span className="lux-card__spec-val">{region.season}</span>
                        </div>
                      </div>

                      <div className="lux-card__top-actions">
                        <span className="lux-card__region-tag">{region.name}</span>
                        <button
                          onClick={(e) => toggleLike(region.id, e)}
                          className={`lux-card__action-btn ${isLiked ? 'lux-card__action-btn--liked' : ''}`}
                          aria-label="Save journey"
                        >
                          <Heart size={14} fill={isLiked ? '#EF4444' : 'none'} color={isLiked ? '#EF4444' : '#FFFFFF'} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Area with Prominent Horizontal Title */}
                    <div className="lux-card__bottom">
                      <div className="lux-card__badge-row">
                        <span className="lux-card__badge-sub">{region.tagline}</span>
                        <div className="lux-card__score-badge">
                          <Sparkles size={12} />
                          <span>{region.rating} Rating</span>
                        </div>
                      </div>

                      <h3 className="lux-card__title">{region.name}</h3>

                      <p className="lux-card__desc">{region.description}</p>

                      <div className="lux-card__metrics">
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{region.rating}</span>
                          <span className="lux-card__metric-lbl">Rating</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{region.integrity}</span>
                          <span className="lux-card__metric-lbl">Reef Health</span>
                        </div>
                        <div className="lux-card__metric">
                          <span className="lux-card__metric-num">{region.coastline}</span>
                          <span className="lux-card__metric-lbl">Coast</span>
                        </div>
                      </div>

                      <div className="lux-card__cta-btn">
                        <span>Explore Region</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
