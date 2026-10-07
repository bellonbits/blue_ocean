import { ArrowRight, Compass } from 'lucide-react';
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
    image: '/images/img_02.png',
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
    image: '/images/img_05.png',
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
    image: '/images/img_01.png',
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
    image: '/images/img_03.png',
    path: '/explore-the-coast/eyl',
    tagEn: 'Nugaal Coast',
    tagSo: 'Xeebta Nugaal',
  },
];

export default function TourismSection() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

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

        {/* 4 Destinations Cards Grid (matching reference design) */}
        <div className="tourism-section__grid">
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
      </div>
    </section>
  );
}
