import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const DESTINATIONS = [
  {
    num: '01',
    slug: 'hafun',
    titleEn: 'Hafun',
    titleSo: 'Xaafuun',
    regionEn: 'Puntland',
    regionSo: 'Puntland',
    descEn: 'Where desert meets the Indian Ocean.',
    descSo: 'Halkay saxaraha iyo Badweynta Hindiya isaga darsamaan.',
    image: '/images/img_01.webp',
  },
  {
    num: '02',
    slug: 'mogadishu',
    titleEn: 'Mogadishu',
    titleSo: 'Muqdisho',
    regionEn: 'Benadir',
    regionSo: 'Banaadir',
    descEn: 'Coastal life, culture and history.',
    descSo: 'Nolosha xeebta, hidaha iyo taariikhda qadiimiga ah.',
    image: '/images/img_08.webp',
  },
  {
    num: '03',
    slug: 'hafun-peninsula',
    titleEn: 'Ras Hafun',
    titleSo: 'Raas Xaafuun',
    regionEn: 'Puntland',
    regionSo: 'Puntland',
    descEn: "One of Africa's most extraordinary coastal landscapes.",
    descSo: 'Mid ka mid ah muuqaallada xeebaha ugu yaabka badan Afrika.',
    image: '/images/img_04.webp',
  },
  {
    num: '04',
    slug: 'kismayo',
    titleEn: 'Kismayo',
    titleSo: 'Kismaayo',
    regionEn: 'Jubaland',
    regionSo: 'Jubaland',
    descEn: 'Where forest, ocean and wildlife meet.',
    descSo: 'Halkay kaymaha, badweynta iyo duurjoogtu isaga darsamaan.',
    image: '/images/img_05.webp',
  },
];

export default function EditorialDestinations() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const gridRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Sync active dot on scroll
  const handleScroll = () => {
    if (!gridRef.current) return;
    const scrollLeft = gridRef.current.scrollLeft;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const newIdx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(Math.max(newIdx, 0), DESTINATIONS.length - 1));
  };

  const scrollCard = (dir) => {
    if (!gridRef.current) return;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    gridRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  const scrollToCard = (idx) => {
    if (!gridRef.current) return;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    gridRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveIdx(idx);
  };

  return (
    <section id="editorial-destinations" className="editorial-destinations" aria-label="Featured Coastal Destinations">
      <div className="editorial-destinations__container">
        {/* Section Header */}
        <div className="editorial-destinations__header">
          <div className="editorial-destinations__title-group">
            <span className="editorial-eyebrow">
              {isSomali ? 'SAHMI XEEBTA' : 'EXPLORE THE COAST'}
            </span>
            <h2 className="editorial-section-title">
              {isSomali ? (
                <>Afar Jiho oo <span className="editorial-italic">Mucjiso ah</span></>
              ) : (
                <>Four <span className="editorial-italic">Extraordinary</span> Horizons</>
              )}
            </h2>
          </div>
          <Link
            to={localizedPath('/explore-the-coast')}
            className="editorial-destinations__view-all"
          >
            <span>{isSomali ? 'Dhammaan Gobollada Xeebta' : 'View All 10 Coastal Regions'}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Purposeful Editorial Destination Cards */}
        <div
          className="editorial-destinations__grid"
          ref={gridRef}
          onScroll={handleScroll}
        >
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.num}
              to={localizedPath(`/explore-the-coast/${dest.slug}`)}
              className="editorial-dest-card"
            >
              <img
                src={dest.image}
                alt={isSomali ? dest.titleSo : dest.titleEn}
                className="editorial-dest-card__img"
                loading="lazy"
              />
              <div className="editorial-dest-card__overlay" />

              {/* Top metadata tags */}
              <div className="editorial-dest-card__top">
                <span className="editorial-dest-card__badge">{dest.num}</span>
                <span className="editorial-dest-card__region">
                  {isSomali ? dest.regionSo : dest.regionEn}
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="editorial-dest-card__content">
                <div className="editorial-dest-card__title-row">
                  <h3 className="editorial-dest-card__title">
                    {isSomali ? dest.titleSo : dest.titleEn}
                  </h3>
                  <ArrowRight size={16} className="editorial-dest-card__arrow" />
                </div>
                <p className="editorial-dest-card__desc">
                  {isSomali ? dest.descSo : dest.descEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Interactive Carousel Controller (Arrows + Animated Dots) */}
        <div className="editorial-destinations__mobile-nav" aria-label="Destinations carousel navigation">
          <button
            type="button"
            className="editorial-destinations__nav-btn"
            onClick={() => scrollCard(-1)}
            disabled={activeIdx === 0}
            aria-label="Previous destination"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="editorial-destinations__dots">
            {DESTINATIONS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`editorial-destinations__dot ${idx === activeIdx ? 'editorial-destinations__dot--active' : ''}`}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="editorial-destinations__nav-btn"
            onClick={() => scrollCard(1)}
            disabled={activeIdx === DESTINATIONS.length - 1}
            aria-label="Next destination"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
