import { useState } from 'react';
import { ArrowUpRight, Sun, Star, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaBentoGrid() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';

  // Carousel slides with authentic Somali coastline photography
  const carouselSlides = [
    {
      img: '/images/img_08.png',
      title: isSomali
        ? 'Xeebaha Liido iyo Jasiira ee Muqdisho oo leh mowjado buluug ah'
        : 'Lido & Jazeera ocean breakers along the Banadir coast',
    },
    {
      img: '/images/img_05.png',
      title: isSomali
        ? 'Jasiiradaha Baajuun iyo biyaha nadiifka ah ee Jubada Hoose'
        : 'Pristine turquoise coral lagoons of the Bajuni Archipelago',
    },
    {
      img: '/images/img_09.png',
      title: isSomali
        ? 'Reef-yada dhagaxeed iyo xeebta taariikhiga ah ee Berbera'
        : 'Ancient coral reefs and deep harbors of Berbera',
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);

  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <section className="raja-bento-section" id="about-archipelago" aria-label={isSomali ? 'Quruxda Xeebaha Soomaaliya' : "Somalia's Coastline Showcase"}>
      {/* Header Row */}
      <div className="raja-bento__header">
        <span className="raja-bento__eyebrow">
          {isSomali ? 'Xeebaha Soomaaliya • Blue Ocean' : "Somalia's Coastline • Blue Ocean"}
        </span>
        <h2 className="raja-bento__heading">
          {isSomali ? 'Quruxda Aan La Midka Ahayn Ee Xeebaha Soomaaliya' : "The Unmatched Beauty of Somalia's Coastline"}
        </h2>
        <p className="raja-bento__subtext">
          {isSomali
            ? 'Soomaaliya waxay leedahay xeebta ugu dheer qaaradda Afrika (3,330 km), oo isugu jirta buuraha Karkaar ee Boosaaso, jasiiradaha Baajuun ee Jubada Hoose, iyo marinnada qadiimiga ah ee Badweynta Hindiya iyo Gacanka Cadmeed.'
            : "Somalia boasts the longest mainland coastline in Africa (3,330 km), stretching from the dramatic volcanic drop-offs of the Gulf of Aden to the pristine turquoise coral atolls of the Bajuni Archipelago."}
        </p>
      </div>

      {/* 4 Bento Items */}
      <div className="raja-bento__grid">
        {/* Card 1: Smartphone Map Mockup */}
        <div className="bento-card-phone">
          <div className="bento-card-phone__top">
            <button
              type="button"
              className="bento-card__expand-icon"
              onClick={() => navigate(`/${language}/explore-the-coast`)}
              aria-label={isSomali ? 'Fur khariidadda' : 'Expand map'}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="bento-card-phone__map-canvas">
            {/* Ambient Map Pins for Somali Coast */}
            <div className="bento-pin bento-pin--1">
              <MapPin size={12} />
              <span>Boosaaso</span>
            </div>
            <div className="bento-pin bento-pin--2">
              <Camera size={12} />
              <span>Baajuun</span>
            </div>
          </div>

          <div className="bento-card-phone__footer">
            <h4>{isSomali ? 'Arag Khariidadda Xeebta' : 'See Somalia Coast Map'}</h4>
          </div>
        </div>

        {/* Card 2: Weather & Sea Conditions */}
        <div className="bento-card-weather">
          <img
            src="/images/img_02.png"
            alt="Bosaso coastal waters"
            className="bento-card-weather__img"
            loading="lazy"
          />
          <div className="bento-card-weather__overlay" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 3 }}>
            <button
              type="button"
              className="bento-card__expand-icon"
              onClick={() => navigate(`/${language}/explore-the-coast/bosaso`)}
              aria-label={isSomali ? 'Faahfaahin' : 'Expand destination'}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="bento-card-weather__badge">
            <Sun size={26} className="text-yellow-300" />
            <div>
              <div className="bento-card-weather__temp">31°</div>
              <div className="bento-card-weather__status">{isSomali ? 'Qorrax Leh' : 'Sunny'}</div>
            </div>
          </div>
        </div>

        {/* Card 3: Social Proof & Research Rating */}
        <div className="bento-card-social">
          <div className="bento-avatars-cluster">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Researcher" className="bento-avatar" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Researcher" className="bento-avatar" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Marine Biologist" className="bento-avatar" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Community Leader" className="bento-avatar" />
          </div>

          <div>
            <div className="bento-card-social__rating">
              <Star size={20} className="bento-star-icon" fill="currentColor" />
              <span className="bento-rating-val">4.9 / 5.0</span>
            </div>
            <p className="bento-card-social__text">
              {isSomali
                ? 'Kormeerka badda iyo ilaalinta noolaha xeebaha Soomaaliya'
                : 'Top-rated marine life monitoring & community ocean stewardship'}
            </p>
          </div>
        </div>

        {/* Card 4: Aerial Beach Carousel Card */}
        <div className="bento-card-carousel">
          <img
            src={carouselSlides[slideIdx].img}
            alt={carouselSlides[slideIdx].title}
            className="bento-card-carousel__img"
            loading="lazy"
          />
          <div className="bento-card-carousel__overlay" />

          <div className="bento-card-carousel__content">
            <h4 className="bento-card-carousel__title">
              {carouselSlides[slideIdx].title}
            </h4>

            <div className="bento-card-carousel__controls">
              <button
                type="button"
                className="bento-nav-btn"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="bento-nav-btn"
                onClick={nextSlide}
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
