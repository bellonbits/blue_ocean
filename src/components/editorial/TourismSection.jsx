import { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Waves,
  MapPin,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './TourismSection.css';

export const TOURISM_DESTINATIONS = [
  {
    id: 'hafun',
    titleEn: 'Ras Hafun Peninsula',
    titleSo: 'Raas Xaafuun',
    locationEn: 'Puntland Coast • Indian Ocean',
    locationSo: 'Xeebta Puntland • Badweynta Hindiya',
    tagEn: 'Ras Hafun',
    tagSo: 'Raas Xaafuun',
    image: '/hafun1.webp',
    path: '/explore-the-coast/hafun',
    spotsLeft: 4,
    seasonEn: 'Best: Nov – Apr',
    seasonSo: 'Xilliga: Nof – Abr',
    categoryEn: 'Africa’s Easternmost Horn',
    categorySo: 'Barta Ugu Bariga fog Afrika',
    shortDescEn: 'Cultural coastal walk with local seafaring guides',
    shortDescSo: 'Socdaal dhaqameed oo leh badmareenno aqoonsan',
    priceEn: '$ 180,00 / Day',
    priceSo: '$ 180,00 / Maalin',
  },
  {
    id: 'bajuni',
    titleEn: 'Bajuni Coral Archipelago',
    titleSo: 'Jasiiradaha Baajuun',
    locationEn: 'Jubaland Coast • Coral Lagoons',
    locationSo: 'Xeebta Jubaland • Shacaabka Badda',
    tagEn: 'Bajuni Islands',
    tagSo: 'Jasiiradaha Baajuun',
    image: '/images/img_01.webp',
    path: '/explore-the-coast/bajuni-islands',
    spotsLeft: 5,
    seasonEn: 'Best: Nov – Apr',
    seasonSo: 'Xilliga: Nof – Abr',
    categoryEn: 'Virgin Sandbars & Shallows',
    categorySo: 'Carro Cad & Shacaab Bikro ah',
    shortDescEn: 'Untouched turquoise lagoons & barrier atolls',
    shortDescSo: 'Biyo buluug ah iyo shacaab dabiici ah',
    priceEn: '$ 220,00 / Day',
    priceSo: '$ 220,00 / Maalin',
  },
  {
    id: 'eyl',
    titleEn: 'Dooxada Eyl Gorge & Falls',
    titleSo: 'Dooxada Eyl & Dhagaxyada',
    locationEn: 'Nugaal Coast • Indian Ocean Gorge',
    locationSo: 'Xeebta Nugaal • Dooxada Dhagaxeedka',
    tagEn: 'Dooxada Eyl',
    tagSo: 'Dooxada Eyl',
    image: '/eyl1.webp',
    path: '/explore-the-coast/eyl',
    spotsLeft: 3,
    seasonEn: 'Best: Oct – Apr',
    seasonSo: 'Xilliga: Okb – Abr',
    categoryEn: 'Ocean Canyon & Freshwater Springs',
    categorySo: 'Ilaha Biyaha Macaan & Badweynta',
    shortDescEn: 'Freshwater springs meeting open Indian Ocean swells',
    shortDescSo: 'Ilo biyo macaan oo kulaalaya badweynta Hindiya',
    priceEn: '$ 160,00 / Day',
    priceSo: '$ 160,00 / Maalin',
  },
  {
    id: 'bosaso',
    titleEn: 'Bosaso Deep Bay & Shelf',
    titleSo: 'Boosaaso & Gacanka Cadmeed',
    locationEn: 'Gulf of Aden • Deep Water Shelf',
    locationSo: 'Gacanka Cadmeed • Biyo Qoto Dheer',
    tagEn: 'Bosaso Bay',
    tagSo: 'Boosaaso',
    image: '/bosaso_harbor_thumb.webp',
    path: '/explore-the-coast/bosaso',
    spotsLeft: 6,
    seasonEn: 'Best: Oct – Apr',
    seasonSo: 'Xilliga: Okb – Abr',
    categoryEn: 'Whale Shark Haven & Fortress',
    categorySo: 'Hoyga Libaax-Badeedka & Dekedda',
    shortDescEn: 'Deep-water pelagic safari & historic maritime haven',
    shortDescSo: 'Safarka libaax-badeedka & dekad qadiimi ah',
    priceEn: '$ 190,00 / Day',
    priceSo: '$ 190,00 / Maalin',
  },
  {
    id: 'mogadishu',
    titleEn: 'Liido Beach & Coral Harbor',
    titleSo: 'Xeebta Liido & Dekedda Qadiimiga',
    locationEn: 'Benadir Coast • Cobalt Swells',
    locationSo: 'Xeebta Banaadir • Hirarka Buluugga ah',
    tagEn: 'Liido Beach',
    tagSo: 'Xeebta Liido',
    image: '/mogadishu1.webp',
    path: '/explore-the-coast/mogadishu',
    spotsLeft: 8,
    seasonEn: 'Best: Oct – May',
    seasonSo: 'Xilliga: Okb – May',
    categoryEn: 'Living Maritime Heritage',
    categorySo: 'Hidaha Badmareenka Nool',
    shortDescEn: 'Sunset dhow sailing along the ancient maritime promenade',
    shortDescSo: 'Dabaasha doonyaha qorrax-dhaca ee xeebta caasimadda',
    priceEn: '$ 140,00 / Day',
    priceSo: '$ 140,00 / Maalin',
  },
  {
    id: 'zeila',
    titleEn: 'Zeila Coral Archipelago',
    titleSo: 'Seylac & Jasiiradaha Saacaddiin',
    locationEn: 'Awdal Coast • Shallow Atolls',
    locationSo: 'Xeebta Awdal • Jasiirado Shacaab',
    tagEn: 'Zeila Atolls',
    tagSo: 'Seylac',
    image: '/zeila1.webp',
    path: '/explore-the-coast/zeila',
    spotsLeft: 2,
    seasonEn: 'Best: Nov – Mar',
    seasonSo: 'Xilliga: Nof – Mar',
    categoryEn: 'Historic Silk Route Archipelago',
    categorySo: 'Jasiiradaha Wadada Xariirta',
    shortDescEn: 'Crystal-clear island shallows & submerged medieval reefs',
    shortDescSo: 'Jasiirado biyo nadiif ah iyo shacaab qadiimi ah',
    priceEn: '$ 175,00 / Day',
    priceSo: '$ 175,00 / Maalin',
  },
];

export default function TourismSection() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  // Showcase Asymmetric Cards Carousel Index
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Pick the Place Filter States
  const [filterDest, setFilterDest] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSeason, setFilterSeason] = useState('All');
  const [filterGroup, setFilterGroup] = useState('All');

  const handlePrevShowcase = () => {
    setShowcaseIndex((prev) => (prev - 1 + TOURISM_DESTINATIONS.length) % TOURISM_DESTINATIONS.length);
  };

  const handleNextShowcase = () => {
    setShowcaseIndex((prev) => (prev + 1) % TOURISM_DESTINATIONS.length);
  };

  // Get 3 items for the asymmetric staggered cards starting at showcaseIndex
  const showcaseItems = [
    TOURISM_DESTINATIONS[showcaseIndex % TOURISM_DESTINATIONS.length],
    TOURISM_DESTINATIONS[(showcaseIndex + 1) % TOURISM_DESTINATIONS.length],
    TOURISM_DESTINATIONS[(showcaseIndex + 2) % TOURISM_DESTINATIONS.length],
  ];

  // Filter logic for Pick the Place
  const filteredHavens = TOURISM_DESTINATIONS.filter((dest) => {
    if (filterDest !== 'All' && dest.id !== filterDest) return false;
    return true;
  });

  const handleDiscover = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      booking: 'true',
      destination: filterDest !== 'All' ? filterDest : 'All Havens',
      category: filterCategory !== 'All' ? filterCategory : 'All Activities',
      season: filterSeason !== 'All' ? filterSeason : 'Nov–Apr',
      group: filterGroup !== 'All' ? filterGroup : 'Squad',
    }).toString();
    navigate(`${localizedPath('/contact')}?${query}`);
  };

  return (
    <section id="tourism-section" className="travel-style-section" aria-label="Somalia Blue Heaven Coastal Havens">
      <div className="travel-style-container">
        {/* ---------------------------------------------------------
            1. TOP EDITORIAL STATEMENT & SOCIAL PROOF BANNER
            Matching reference image: "Visa Travels means Going Places"
            --------------------------------------------------------- */}
        <div className="travel-brand-header">
          {/* Social Proof Pill Badge */}
          <div className="travel-brand-proof">
            <div className="travel-brand-proof__badge">
              <Waves size={14} className="travel-brand-proof__icon" />
              <span className="travel-brand-proof__brand">Somalia Blue Heaven</span>
              <span className="travel-brand-proof__star">★</span>
              <span className="travel-brand-proof__stat">
                {isSomali ? '3,330 KM oo Xeeb Bikro ah' : '3,330 KM Untouched Coastline'}
              </span>
            </div>
            <div className="travel-brand-proof__avatars">
              <span className="travel-brand-proof__avatar">🤿</span>
              <span className="travel-brand-proof__avatar">⛵</span>
              <span className="travel-brand-proof__avatar">🐬</span>
              <span className="travel-brand-proof__avatar-count">+1.2k</span>
            </div>
          </div>

          {/* Large Modern Headline */}
          <h2 className="travel-editorial-title">
            {isSomali ? (
              <>
                Somalia Blue Heaven Micnaheedu Waa <br />
                <span className="travel-editorial-title__highlight">Xeebaha Bikrada ah.</span>
              </>
            ) : (
              <>
                Somalia Blue Heaven means <br />
                <span className="travel-editorial-title__highlight">Going Coastal.</span>
              </>
            )}
          </h2>

          {/* Minimalist Compass Tracker Graphic matching reference */}
          <div className="travel-tracker-line" aria-hidden="true">
            <span className="travel-tracker-line__start" />
            <span className="travel-tracker-line__dash" />
            <div className="travel-tracker-line__target">
              <Compass size={22} />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------
            2. ASYMMETRIC STAGGERED SHOWCASE ("Not Your Ordinary Haven")
            Matching reference layout with 3 cards of different heights
            --------------------------------------------------------- */}
        <div className="travel-showcase">
          {/* Left Column: Heading, Subtitle & Book Button */}
          <div className="travel-showcase__left">
            <div className="travel-pill-tag">
              <span className="travel-pill-tag__dot" />
              <span>{isSomali ? '01 Xeebahayaga' : '01 Our Havens'}</span>
            </div>

            <h3 className="travel-showcase__title">
              {isSomali ? (
                <>
                  Ma Ahan Safarkaaga <br />
                  Badda ee Caadiga ah
                </>
              ) : (
                <>
                  Not Your Typical <br />
                  Coastal Journey
                </>
              )}
            </h3>

            <p className="travel-showcase__subtitle">
              {isSomali
                ? 'Waxaan qorsheynaa safarro dabiici ah oo lagu maro 3,330 km oo shacaab bikro ah, jasiirado carro cad ah, iyo hidaha badmareenka Soomaaliyeed iyadoo la helayo badmareenno aqoonsan.'
                : 'We plan pristine, curated ocean expeditions with authentic seafaring heritage, virgin coral reefs, and certified local skippers across Africa’s longest coastline.'}
            </p>

            <Link
              to={localizedPath('/contact?booking=true')}
              className="travel-showcase__btn"
              id="travel-showcase-book-btn"
            >
              <span>{isSomali ? 'Ballanso Safarka Hadda' : 'Book Trip Now'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Column: 3 Asymmetric Staggered Cards */}
          <div className="travel-showcase__right">
            <div className="travel-showcase__cards-row">
              {/* Card 1: Tall Primary Card */}
              <Link
                to={localizedPath(showcaseItems[0].path)}
                className="travel-stagger-card travel-stagger-card--tall"
                aria-label={showcaseItems[0].titleEn}
              >
                <div className="travel-stagger-card__media">
                  <img
                    src={showcaseItems[0].image}
                    alt={isSomali ? showcaseItems[0].titleSo : showcaseItems[0].titleEn}
                    className="travel-stagger-card__img"
                    loading="lazy"
                  />
                  <span className="travel-stagger-card__season-chip">
                    <Sparkles size={10} />
                    <span>{isSomali ? showcaseItems[0].seasonSo : showcaseItems[0].seasonEn}</span>
                  </span>
                  <span className="travel-stagger-card__chip">
                    {isSomali ? showcaseItems[0].tagSo : showcaseItems[0].tagEn}
                  </span>
                </div>
                <div className="travel-stagger-card__meta">
                  <h4 className="travel-stagger-card__title">
                    {isSomali ? showcaseItems[0].titleSo : showcaseItems[0].titleEn}
                  </h4>
                  <p className="travel-stagger-card__caption">
                    {isSomali ? showcaseItems[0].shortDescSo : showcaseItems[0].shortDescEn}
                  </p>
                </div>
              </Link>

              {/* Card 2: Medium Staggered Card */}
              <Link
                to={localizedPath(showcaseItems[1].path)}
                className="travel-stagger-card travel-stagger-card--medium"
                aria-label={showcaseItems[1].titleEn}
              >
                <div className="travel-stagger-card__media">
                  <img
                    src={showcaseItems[1].image}
                    alt={isSomali ? showcaseItems[1].titleSo : showcaseItems[1].titleEn}
                    className="travel-stagger-card__img"
                    loading="lazy"
                  />
                  <span className="travel-stagger-card__season-chip">
                    <Sparkles size={10} />
                    <span>{isSomali ? showcaseItems[1].seasonSo : showcaseItems[1].seasonEn}</span>
                  </span>
                  <span className="travel-stagger-card__chip">
                    {isSomali ? showcaseItems[1].tagSo : showcaseItems[1].tagEn}
                  </span>
                </div>
                <div className="travel-stagger-card__meta">
                  <h4 className="travel-stagger-card__title">
                    {isSomali ? showcaseItems[1].titleSo : showcaseItems[1].titleEn}
                  </h4>
                  <p className="travel-stagger-card__caption">
                    {isSomali ? showcaseItems[1].shortDescSo : showcaseItems[1].shortDescEn}
                  </p>
                </div>
              </Link>

              {/* Card 3: Compact Staggered Card */}
              <Link
                to={localizedPath(showcaseItems[2].path)}
                className="travel-stagger-card travel-stagger-card--compact"
                aria-label={showcaseItems[2].titleEn}
              >
                <div className="travel-stagger-card__media">
                  <img
                    src={showcaseItems[2].image}
                    alt={isSomali ? showcaseItems[2].titleSo : showcaseItems[2].titleEn}
                    className="travel-stagger-card__img"
                    loading="lazy"
                  />
                  <span className="travel-stagger-card__season-chip">
                    <Sparkles size={10} />
                    <span>{isSomali ? showcaseItems[2].seasonSo : showcaseItems[2].seasonEn}</span>
                  </span>
                  <span className="travel-stagger-card__chip">
                    {isSomali ? showcaseItems[2].tagSo : showcaseItems[2].tagEn}
                  </span>
                </div>
                <div className="travel-stagger-card__meta">
                  <h4 className="travel-stagger-card__title">
                    {isSomali ? showcaseItems[2].titleSo : showcaseItems[2].titleEn}
                  </h4>
                  <p className="travel-stagger-card__caption">
                    {isSomali ? showcaseItems[2].shortDescSo : showcaseItems[2].shortDescEn}
                  </p>
                </div>
              </Link>
            </div>

            {/* Prev / Next Switcher Controls matching reference mockup */}
            <div className="travel-showcase__nav-controls">
              <button
                type="button"
                onClick={handlePrevShowcase}
                className="travel-showcase__nav-btn"
                aria-label="Previous havens"
              >
                <ChevronLeft size={16} />
                <span>{isSomali ? 'Hore' : 'Prev'}</span>
              </button>
              <button
                type="button"
                onClick={handleNextShowcase}
                className="travel-showcase__nav-btn"
                aria-label="Next havens"
              >
                <span>{isSomali ? 'Xiga' : 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------
            3. "PICK THE PLACE" SECTION
            Interactive search bar + 3 modern booking cards with badges
            --------------------------------------------------------- */}
        <div className="travel-pick-section">
          {/* Header Row: Title & Subtitle Split */}
          <div className="travel-pick-header">
            <div className="travel-pick-header__left">
              <div className="travel-pill-tag">
                <span className="travel-pill-tag__dot" />
                <span>{isSomali ? 'Goobaha Caanka ah 2026' : 'Popular Destinations 2026'}</span>
              </div>
              <h3 className="travel-pick-title">
                {isSomali ? 'Dooro Goobta' : 'Pick the Place'}
              </h3>
            </div>

            <div className="travel-pick-header__right">
              <p className="travel-pick-subtitle">
                {isSomali
                  ? 'Waxaan haynaa goobo cajiib ah oo loogu talagalay qof kasta iyo goobo ku habboon kooxdaada si aad ugu raaxaysataan!'
                  : 'We have great options for everyone and cozy spots for your squad to enjoy together!'}
              </p>
            </div>
          </div>

          {/* Filter Bar: Clean White Card with Dropdowns */}
          <form onSubmit={handleDiscover} className="travel-filter-bar" aria-label="Pick destination filter">
            {/* Field 1: Destination */}
            <div className="travel-filter-bar__item">
              <span className="travel-filter-bar__label">
                <MapPin size={12} className="travel-filter-bar__icon" />
                <span>{isSomali ? 'Goobta' : 'Destination'}</span>
              </span>
              <select
                value={filterDest}
                onChange={(e) => setFilterDest(e.target.value)}
                className="travel-filter-bar__select"
                aria-label="Select destination"
              >
                <option value="All">{isSomali ? 'Dhammaan Goobaha' : 'Find a spot...'}</option>
                <option value="bajuni">{isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Islands (Jubaland)'}</option>
                <option value="hafun">{isSomali ? 'Raas Xaafuun' : 'Ras Hafun (Puntland)'}</option>
                <option value="eyl">{isSomali ? 'Dooxada Eyl' : 'Dooxada Eyl (Nugaal)'}</option>
                <option value="bosaso">{isSomali ? 'Boosaaso' : 'Bosaso Deep Bay (Gulf of Aden)'}</option>
                <option value="mogadishu">{isSomali ? 'Xeebta Liido' : 'Liido Beach (Benadir)'}</option>
                <option value="zeila">{isSomali ? 'Seylac' : 'Zeila Archipelago (Awdal)'}</option>
              </select>
            </div>

            <div className="travel-filter-bar__divider" />

            {/* Field 2: Category */}
            <div className="travel-filter-bar__item">
              <span className="travel-filter-bar__label">
                <Compass size={12} className="travel-filter-bar__icon" />
                <span>{isSomali ? 'Qaybta' : 'Category'}</span>
              </span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="travel-filter-bar__select"
                aria-label="Select category"
              >
                <option value="All">{isSomali ? 'Nooca Khibradda' : 'Select type'}</option>
                <option value="snorkeling">{isSomali ? 'Snorkeling & Shacaab' : 'Coral Reef Snorkeling'}</option>
                <option value="diving">{isSomali ? 'Quusid (Scuba)' : 'Pelagic Scuba Diving'}</option>
                <option value="dhow">{isSomali ? 'Doon Dhaqameed' : 'Traditional Dhow Tour'}</option>
                <option value="safari">{isSomali ? 'Safarka Noolaha' : 'Marine Wildlife Safari'}</option>
              </select>
            </div>

            <div className="travel-filter-bar__divider" />

            {/* Field 3: Season / Price */}
            <div className="travel-filter-bar__item">
              <span className="travel-filter-bar__label">
                <Sparkles size={12} className="travel-filter-bar__icon" />
                <span>{isSomali ? 'Xilliga & Qiimaha' : 'Price & Season'}</span>
              </span>
              <select
                value={filterSeason}
                onChange={(e) => setFilterSeason(e.target.value)}
                className="travel-filter-bar__select"
                aria-label="Select season"
              >
                <option value="All">{isSomali ? 'Xilliga Safarka' : 'Select range / budget'}</option>
                <option value="peak">{isSomali ? 'Nof – Abriil (Biyo Deggan)' : 'Nov – Apr (Calm Seas)'}</option>
                <option value="monsoon">{isSomali ? 'May – Oktoobar (Hirarka)' : 'May – Oct (Active Swells)'}</option>
                <option value="flexible">{isSomali ? 'Sannadka Oo Dhan' : 'Year-Round Travel'}</option>
              </select>
            </div>

            <div className="travel-filter-bar__divider" />

            {/* Field 4: Travelers / Date */}
            <div className="travel-filter-bar__item">
              <span className="travel-filter-bar__label">
                <Calendar size={12} className="travel-filter-bar__icon" />
                <span>{isSomali ? 'Kooxda' : 'Travelers'}</span>
              </span>
              <select
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
                className="travel-filter-bar__select"
                aria-label="Select group size"
              >
                <option value="All">{isSomali ? 'Tirada Dadka' : 'Select squad size'}</option>
                <option value="solo">{isSomali ? '1 Qof (Solo Explorer)' : 'Solo Explorer (1 person)'}</option>
                <option value="duo">{isSomali ? '2 Qof (Duo / Couple)' : 'Duo / Couple (2 people)'}</option>
                <option value="squad">{isSomali ? 'Koox (3–6 Qof)' : 'Squad / Group (3–6 people)'}</option>
                <option value="private">{isSomali ? 'Safarka Gaarka Ah' : 'Private Custom Charter'}</option>
              </select>
            </div>

            {/* Discover Action Button */}
            <div className="travel-filter-bar__action">
              <button
                type="submit"
                className="travel-filter-bar__btn"
                id="travel-filter-discover-btn"
                aria-label="Discover destinations"
              >
                <span>{isSomali ? 'Sahmi' : 'Discover'}</span>
              </button>
            </div>
          </form>

          {/* 3 Modern Haven Cards with Badges & Open Trip pills */}
          <div className="travel-haven-cards-grid">
            {filteredHavens.slice(0, 3).map((dest) => (
              <div key={dest.id} className="travel-place-card">
                {/* Header Meta: Title & Spots Left Badge */}
                <div className="travel-place-card__header">
                  <div className="travel-place-card__info">
                    <h4 className="travel-place-card__name">
                      {isSomali ? dest.titleSo : dest.titleEn}
                    </h4>
                    <span className="travel-place-card__location">
                      {isSomali ? dest.locationSo : dest.locationEn}
                    </span>
                  </div>

                  <span className="travel-place-card__badge">
                    <span className="travel-place-card__badge-dot" />
                    <span>{dest.spotsLeft} {isSomali ? 'Boos ayaa haray' : 'Slot left'}</span>
                  </span>
                </div>

                {/* Photo Media with Seasonal Badge and Open Trip Button */}
                <div className="travel-place-card__media">
                  <img
                    src={dest.image}
                    alt={isSomali ? dest.titleSo : dest.titleEn}
                    className="travel-place-card__img"
                    loading="lazy"
                  />
                  <span className="travel-place-card__season-pill">
                    <Sparkles size={10} />
                    <span>{isSomali ? dest.seasonSo : dest.seasonEn}</span>
                  </span>
                  <Link
                    to={localizedPath(dest.path)}
                    className="travel-place-card__open-pill"
                    aria-label={`Open trip to ${isSomali ? dest.titleSo : dest.titleEn}`}
                  >
                    <span>{isSomali ? 'Fur Safarka' : 'Open Trip'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
