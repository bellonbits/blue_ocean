import { useRef, useState } from 'react';
import { ArrowRight, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './TourismSection.css';


export const TOURISM_DESTINATIONS = [
  {
    id: 'bosaso',
    titleEn: 'Bosaso',
    titleSo: 'Boosaaso',
    descEn: 'Where rugged volcanic ridges meet the deep pelagic waters of the Gulf of Aden.',
    descSo: 'Halka buuraha dhaadheer ay ku dhacaan biyaha qotada dheer ee Gacanka Cadmeed.',
    image: '/images/img_02.webp',
    path: '/explore-the-coast/bosaso',
    tagEn: 'Gulf of Aden',
    tagSo: 'Gacanka Cadmeed',
  },
  {
    id: 'bajuni',
    titleEn: 'Bajuni Islands',
    titleSo: 'Jasiiradaha Baajuun',
    descEn: 'Pristine coral archipelago with turquoise lagoons, white sandbars and mangroves.',
    descSo: 'Jasiirado carwooyin leh oo biyo nadiif ah, carro cad iyo kaymaha mangroves.',
    image: '/images/img_05.webp',
    path: '/explore-the-coast/kismayo',
    tagEn: 'Indian Ocean',
    tagSo: 'Badweynta Hindiya',
  },
  {
    id: 'hafun',
    titleEn: 'Ras Hafun',
    titleSo: 'Raas Xaafuun',
    descEn: "Africa's easternmost horn with dramatic sandstone headlands and ancient trade routes.",
    descSo: 'Barta bari ee Afrika oo leh buuro dhagaxeed qurux badan iyo waddooyinkii ganacsiga qadiimiga ahaa.',
    image: '/images/img_01.webp',
    path: '/explore-the-coast/hafun',
    tagEn: 'Puntland Coast',
    tagSo: 'Xeebta Puntland',
  },
  {
    id: 'eyl',
    titleEn: 'Eyl Canyon',
    titleSo: 'Dooxada Eyl',
    descEn: 'A breathtaking canyon gorge meeting the open Indian Ocean and historic fortifications.',
    descSo: 'Dooxo mucjiso ah oo badda ku darsanta iyo qalcadihii taariikhiga ahaa.',
    image: '/images/img_03.webp',
    path: '/explore-the-coast/eyl',
    tagEn: 'Nugaal Coast',
    tagSo: 'Xeebta Nugaal',
  },
];

export default function TourismSection() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;
  const gridRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Sync active dot on mobile horizontal scroll
  const handleScroll = () => {
    if (!gridRef.current) return;
    const scrollLeft = gridRef.current.scrollLeft;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const newIdx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(Math.max(newIdx, 0), TOURISM_DESTINATIONS.length - 1));
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
    <section id="tourism-section" className="tourism-section" aria-label="Coastal Tourism Destinations">
      <div className="tourism-section__container">
        {/* Section Header */}
        <div className="tourism-section__header">
          <div className="tourism-section__title-group">
            <span className="tourism-section__eyebrow">
              <Compass size={14} className="tourism-section__eyebrow-icon" />
              {isSomali ? 'DALXIISKA XEEBTA' : 'COASTAL TOURISM'}
            </span>
            <h2 className="tourism-section__title">
              {isSomali ? 'Goobaha Dalxiiska ee Xeebta' : 'Featured Coastal Destinations'}
            </h2>
            <p className="tourism-section__subtitle">
              {isSomali
                ? 'Sahmi goobaha ugu caansan uguna quruxda badan ee ku teedsan 3,330 km oo xeebta Soomaaliya ah.'
                : "Explore iconic havens, coral atolls, and untouched shores across Somalia's 3,330 km coastline."}
            </p>
          </div>
          <Link
            to={localizedPath('/tourism')}
            className="tourism-section__view-all"
            id="tourism-section-view-all-btn"
          >
            <span>{isSomali ? 'Dhammaan Dalxiiska' : 'Explore All Destinations'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4 Destinations Cards Grid (responsive swipeable deck on mobile) */}
        <div
          className="tourism-section__grid"
          ref={gridRef}
          onScroll={handleScroll}
        >
          {TOURISM_DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              to={localizedPath(dest.path)}
              className="tourism-card"
              aria-label={isSomali ? dest.titleSo : dest.titleEn}
            >
              <div className="tourism-card__media">
                <img
                  src={dest.image}
                  alt={isSomali ? dest.titleSo : dest.titleEn}
                  className="tourism-card__img"
                  loading="lazy"
                />
                <span className="tourism-card__tag">
                  {isSomali ? dest.tagSo : dest.tagEn}
                </span>
              </div>
              <div className="tourism-card__content">
                <h3 className="tourism-card__title">
                  {isSomali ? dest.titleSo : dest.titleEn}
                </h3>
                <p className="tourism-card__desc">
                  {isSomali ? dest.descSo : dest.descEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Interactive Carousel Controller (Arrows + Animated Dots) */}
        <div className="tourism-section__mobile-nav" aria-label="Destination slides">
          <button
            type="button"
            className="tourism-section__nav-btn"
            onClick={() => scrollCard(-1)}
            disabled={activeIdx === 0}
            aria-label="Previous destination"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="tourism-section__dots">
            {TOURISM_DESTINATIONS.map((dest, i) => (
              <button
                key={dest.id}
                type="button"
                className={`tourism-section__dot ${i === activeIdx ? 'tourism-section__dot--active' : ''}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${isSomali ? dest.titleSo : dest.titleEn}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="tourism-section__nav-btn"
            onClick={() => scrollCard(1)}
            disabled={activeIdx === TOURISM_DESTINATIONS.length - 1}
            aria-label="Next destination"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

