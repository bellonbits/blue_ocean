import { useRef, useState } from 'react';
import {
  ArrowRight,
  Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './TourismSection.css';

export const TOURISM_DESTINATIONS = [
  {
    id: 'hafun',
    titleEn: 'Ras Hafun Peninsula',
    titleSo: 'Raas Xaafuun',
    image: '/somalia_hero_coast.webp',
    path: '/explore-the-coast/hafun',
    metricsEn: 'Puntland Coast, Indian Ocean • 🤿 32m • 🌡️ 28°C',
    metricsSo: 'Xeebta Puntland, Badweynta Hindiya • 🤿 32m • 🌡️ 28°C',
    priceEn: '$ 180,00 / Day',
    priceSo: '$ 180,00 / Maalin',
  },
  {
    id: 'bajuni',
    titleEn: 'Bajuni Coral Archipelago',
    titleSo: 'Jasiiradaha Baajuun',
    image: '/kismayo1.webp',
    path: '/explore-the-coast/kismayo',
    metricsEn: 'Jubaland Coast, Coral Lagoons • 🤿 28m • 🌡️ 29°C',
    metricsSo: 'Xeebta Jubaland, Shacaabka Badda • 🤿 28m • 🌡️ 29°C',
    priceEn: '$ 220,00 / Day',
    priceSo: '$ 220,00 / Maalin',
  },
  {
    id: 'eyl',
    titleEn: 'Dooxada Eyl Gorge & Falls',
    titleSo: 'Dooxada Eyl & Dhagaxyada',
    image: '/eyl3.webp',
    path: '/explore-the-coast/eyl',
    metricsEn: 'Nugaal Coast, Ocean Canyon • 🤿 30m • 🌡️ 26°C',
    metricsSo: 'Xeebta Nugaal, Dooxada Badda • 🤿 30m • 🌡️ 26°C',
    priceEn: '$ 160,00 / Day',
    priceSo: '$ 160,00 / Maalin',
  },
  {
    id: 'bosaso',
    titleEn: 'Bosaso Deep Bay & Shelf',
    titleSo: 'Boosaaso & Gacanka Cadmeed',
    image: '/WebsiteImagery_1920x1080_SisterCities_BosasoSomalia-mtime20180108165841_2021-11-01-121110_grsn_91852798b59be8b28fc00edfe4aec23a.webp',
    path: '/explore-the-coast/bosaso',
    metricsEn: 'Gulf of Aden, Pelagic Waters • 🤿 25m • 🌡️ 27°C',
    metricsSo: 'Gacanka Cadmeed, Biyo Qoto Dheer • 🤿 25m • 🌡️ 27°C',
    priceEn: '$ 190,00 / Day',
    priceSo: '$ 190,00 / Maalin',
  },
  {
    id: 'mogadishu',
    titleEn: 'Liido Beach & Coral Harbor',
    titleSo: 'Xeebta Liido & Dekedda Qadiimiga',
    image: '/MOGADISHUBEACH LEDE.webp',
    path: '/explore-the-coast/mogadishu',
    metricsEn: 'Benadir Coast, Oceanfront • 🤿 22m • 🌡️ 28°C',
    metricsSo: 'Xeebta Banaadir, Biyo Nadiif ah • 🤿 22m • 🌡️ 28°C',
    priceEn: '$ 140,00 / Day',
    priceSo: '$ 140,00 / Maalin',
  },
  {
    id: 'zeila',
    titleEn: 'Zeila Coral Archipelago',
    titleSo: 'Seylac & Jasiiradaha Saacaddiin',
    image: '/zeila1.webp',
    path: '/explore-the-coast/zeila',
    metricsEn: 'Awdal Coast, Shallow Atolls • 🤿 26m • 🌡️ 29°C',
    metricsSo: 'Xeebta Awdal, Jasiirado Shacaab • 🤿 26m • 🌡️ 29°C',
    priceEn: '$ 175,00 / Day',
    priceSo: '$ 175,00 / Maalin',
  },
];

export default function TourismSection() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;
  const gridRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  // 3-dot pagination: Page 0 (first 3), Page 1 (next 3)
  const scrollToPage = (pageIndex) => {
    setActivePage(pageIndex);
    if (!gridRef.current) return;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const scrollAmount = pageIndex * (card.offsetWidth + 24) * 3;
    gridRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!gridRef.current) return;
    const card = gridRef.current.firstElementChild;
    if (!card) return;
    const pageWidth = (card.offsetWidth + 24) * 3;
    const page = Math.round(gridRef.current.scrollLeft / (pageWidth || 1));
    setActivePage(Math.min(Math.max(page, 0), 2));
  };

  return (
    <section id="tourism-section" className="tourism-section" aria-label="Most Viewed Havens">
      <div className="tourism-section__container">
        {/* Centered Section Header matching reference image */}
        <div className="tourism-section__centered-header">
          <div className="tourism-section__header-pill-line">
            <span className="tourism-section__accent-dot" />
          </div>
          <h2 className="tourism-section__centered-title">
            {isSomali ? 'Goobaha Ugu Badan' : 'Most Viewed'}
          </h2>
          <p className="tourism-section__centered-subtitle">
            {isSomali
              ? 'Sahmi goobaha fasaxa ee ugu quruxda badan ee ku teedsan xeebta Soomaaliya. Si kalsooni leh u qorshee adigoo helaya hagayaal aqoonsan.'
              : 'Discover a range of vacation havens worldwide. Book securely and get expert local support for a stress-free journey.'}
          </p>
        </div>

        {/* 3-Card Simple Responsive Grid matching reference mockup */}
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
              aria-label={`View ${isSomali ? dest.titleSo : dest.titleEn}`}
            >
              {/* Media with modern rounded frame matching reference image */}
              <div className="tourism-card__media">
                <img
                  src={dest.image}
                  alt={isSomali ? dest.titleSo : dest.titleEn}
                  className="tourism-card__img"
                  loading="lazy"
                />
              </div>

              {/* Card Meta & Typography - Simple & Clean */}
              <div className="tourism-card__content">
                {/* Location subtitle and specs line */}
                <div className="tourism-card__meta-line">
                  <span className="tourism-card__meta-text">
                    {isSomali ? dest.metricsSo : dest.metricsEn}
                  </span>
                </div>

                {/* Bold Destination Title */}
                <h3 className="tourism-card__title">
                  {isSomali ? dest.titleSo : dest.titleEn}
                </h3>

                {/* Price / Rate Tag */}
                <div className="tourism-card__price-row">
                  <span className="tourism-card__price-val">
                    {isSomali ? dest.priceSo : dest.priceEn}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Exactly 3 Centered Pagination Dots matching reference image */}
        <div className="tourism-section__pagination-dots" aria-label="Haven slides">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`tourism-section__p-dot ${activePage === idx ? 'tourism-section__p-dot--active' : ''}`}
              onClick={() => scrollToPage(idx)}
              aria-label={`View haven group ${idx + 1}`}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------
            THE EASIEST METHOD TO FIND AN OCEAN HAVEN
            (Matching the bottom section of the user's reference mockup)
            --------------------------------------------------------- */}
        <div className="tourism-method">
          <div className="tourism-method__grid">
            {/* Left Column: Rounded Ocean Photo Card with Floating Badge */}
            <div className="tourism-method__media-wrap">
              <div className="tourism-method__media-card">
                <img
                  src="/somalia_hero_coast.webp"
                  alt="Traditional dhow sailing on crystal clear waters"
                  className="tourism-method__img"
                  loading="lazy"
                />
                <div className="tourism-method__media-badge">
                  <Compass size={28} className="tourism-method__badge-icon" />
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description & Search Pill */}
            <div className="tourism-method__content">
              <h2 className="tourism-method__title">
                {isSomali
                  ? 'Habka Ugu Fudud ee Loo Sahmiyo Badda'
                  : 'The Easiest Method To Explore Somalia’s Coast'}
              </h2>

              <p className="tourism-method__subtitle">
                {isSomali
                  ? 'Somalia Blue Heaven waa marinkaaga tooska ah ee aad ku sahmin karto biyaha buluugga ah ee Baajuun, dooxada Eyl, iyo qaniimada dabiiciga ah ee badweynta Hindiya iyadoo la helayo badmareenno aqoonsan.'
                  : 'Somalia Blue Heaven is your go to destination for discovering the pristine waters of Bajuni, dramatic canyons of Eyl, and authentic seafaring hospitality along 3,330 km of virgin coastline.'}
              </p>

              <div className="tourism-method__cta-row">
                <Link
                  to={localizedPath('/contact?booking=true')}
                  className="tourism-method__cta-btn"
                  id="tourism-method-book-now"
                >
                  <span>{isSomali ? 'Qorshee Safarka' : 'Plan Your Tour'}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
