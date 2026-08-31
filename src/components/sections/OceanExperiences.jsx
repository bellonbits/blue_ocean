import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Heart, Sparkles } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import { getFeaturedExperiences } from '../../data/experiences';
import './OceanExperiences.css';

const experiencesData = getFeaturedExperiences();

export default function OceanExperiences() {
  const [likes, setLikes] = useState({});

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
          <span className="label-text">Ocean Expeditions & Activities</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="experiences-heading">
            Experience the Somali Coast
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Boat tours, snorkeling, diving, fishing, island exploration and more — all coming to the Somali coast.
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
                <Link to={`/experiences/${exp.slug}`} className="exp-lux-card">
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
                        <span>Coming Soon</span>
                      </span>
                      <div className="exp-lux-card__highlight-pill">
                        <span>{exp.region}</span>
                      </div>
                    </div>

                    {/* Clear Horizontal Title */}
                    <h3 className="exp-lux-card__title">{exp.title}</h3>

                    <p className="exp-lux-card__desc">{exp.shortDescription}</p>

                    <span className="exp-lux-card__cta">
                      <span>View Experience</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              );
            }}
          />
        </div>

        <div className="experiences__cta-row reveal">
          <Link to="/experiences" className="btn btn-primary btn-lg">
            <span>Explore Experiences</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
