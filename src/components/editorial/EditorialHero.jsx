import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Star
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../shared/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';

export const COASTAL_REGIONS = [
  {
    id: 'puntland',
    num: '1',
    numberBadge: '01',
    nameEn: 'PUNTLAND',
    nameSo: 'PUNTLAND',
    taglineEn: 'Gulf of Aden & Easternmost Horn',
    taglineSo: 'Gacanka Cadmeed & Barta Bari ee Afrika',
    prevGhostEn: 'SOMALILAND',
    prevGhostSo: 'SOMALILAND',
    nextGhostEn: 'JUBALAND',
    nextGhostSo: 'JUBALAND',
    descEn: 'Africa’s easternmost continental peninsula, where limestone cliffs drop into nutrient-rich pelagic upwelling currents along 1,300 km of untouched coastline.',
    descSo: 'Geeska bari ee qaaradda Afrika, halkaas oo buuraha dhaadheer ay ku dhacaan biyaha hodanka ah ee Gacanka Cadmeed iyo Badweynta Hindiya.',
    explorePath: '/explore-the-coast/hafun',
    heroBg: '/images/image.webp',
    destinations: [
      {
        id: 'hafun',
        title: 'Ras Hafun Peninsula',
        area: 'Bari Coast · Hafun',
        image: '/images/img_01.webp',
        stars: 5,
        path: '/explore-the-coast/hafun',
      },
      {
        id: 'bosaso',
        title: 'Bosaso Harbor & Shelf',
        area: 'Gulf of Aden Corridor',
        image: '/images/img_02.webp',
        stars: 5,
        path: '/explore-the-coast/bosaso',
      },
      {
        id: 'eyl',
        title: 'Dooxada Eyl Gorge',
        area: 'Nugaal Ocean Cliffs',
        image: '/images/img_03.webp',
        stars: 5,
        path: '/explore-the-coast/eyl',
      },
      {
        id: 'guardafui',
        title: 'Cape Guardafui Horn',
        area: 'Ras Asir Headland',
        image: '/images/img_04.webp',
        stars: 5,
        path: '/explore-the-coast/guardafui',
      },
    ],
  },
  {
    id: 'jubaland',
    num: '2',
    numberBadge: '02',
    nameEn: 'JUBALAND',
    nameSo: 'JUBALAND',
    taglineEn: 'Southern Indian Ocean & Coral Atolls',
    taglineSo: 'Koonfurta Badweynta Hindiya & Shacaabka',
    prevGhostEn: 'PUNTLAND',
    prevGhostSo: 'PUNTLAND',
    nextGhostEn: 'BENADIR',
    nextGhostSo: 'BANAADIR',
    descEn: 'An untouched tropical marine wilderness: the Bajuni coral archipelago, mangrove blue carbon nurseries, and virgin green sea turtle breeding lagoons.',
    descSo: 'Jasiirado qadiimi ah oo leh biyaha ugu nadiifsan, doonyaha dhowka ee dhaqanka, iyo qoolleyda cagaaran ee badda oo buuxa dhagaxleyda carwooyinka ah.',
    explorePath: '/explore-the-coast/kismayo',
    heroBg: '/images/img_05.webp',
    destinations: [
      {
        id: 'bajuni',
        title: 'Bajuni Coral Atolls',
        area: 'Southern Archipelago',
        image: '/images/img_05.webp',
        stars: 5,
        path: '/explore-the-coast/kismayo',
      },
      {
        id: 'kismayo-coast',
        title: 'Kismayo White Sands',
        area: 'Lower Juba Seashore',
        image: '/images/img_07.webp',
        stars: 5,
        path: '/explore-the-coast/kismayo',
      },
      {
        id: 'kamboni',
        title: 'Ras Kamboni Sanctuary',
        area: 'Turtle Dune Dunes',
        image: '/images/img_10.webp',
        stars: 5,
        path: '/explore-the-coast/kamboni',
      },
    ],
  },
  {
    id: 'benadir',
    num: '3',
    numberBadge: '03',
    nameEn: 'BENADIR',
    nameSo: 'BANAADIR',
    taglineEn: 'Central Seafaring Heritage & Coral Bays',
    taglineSo: 'Dhaqanka Badmaaxiinta & Gacannada Shacaabka',
    prevGhostEn: 'JUBALAND',
    prevGhostSo: 'JUBALAND',
    nextGhostEn: 'SOMALILAND',
    nextGhostSo: 'SOMALILAND',
    descEn: 'Millennia of Indian Ocean seafaring trade, historic coral-stone architecture, crystal azure lagoons, and the celebrated shores of Liido and Jazira.',
    descSo: 'Kumanaan sano oo ganacsi badeed ah, dhagaxleyda qadiimiga ah, biyaha buluugga ah, iyo xeebaha caanka ah ee Liido iyo Jasiira.',
    explorePath: '/explore-the-coast/mogadishu',
    heroBg: '/images/img_08.webp',
    destinations: [
      {
        id: 'liido',
        title: 'Liido Historic Seashore',
        area: 'Mogadishu Coastline',
        image: '/images/img_08.webp',
        stars: 5,
        path: '/explore-the-coast/mogadishu',
      },
      {
        id: 'jazeera',
        title: 'Jazira Coral Lagoon',
        area: 'Benadir Marine Bay',
        image: '/images/img_02.webp',
        stars: 5,
        path: '/explore-the-coast/mogadishu',
      },
      {
        id: 'barawe',
        title: 'Barawe Ancient Port',
        area: 'Lower Shabelle Seashore',
        image: '/images/img_09.webp',
        stars: 5,
        path: '/explore-the-coast/barawe',
      },
    ],
  },
  {
    id: 'somaliland',
    num: '4',
    numberBadge: '04',
    nameEn: 'SOMALILAND',
    nameSo: 'SOMALILAND',
    taglineEn: 'Red Sea Gateway & Ancient Coral Ports',
    taglineSo: 'Albaabka Badda Cas & Dekeddaha Qadiimiga Ah',
    prevGhostEn: 'BENADIR',
    prevGhostSo: 'BANAADIR',
    nextGhostEn: 'GALMUDUG',
    nextGhostSo: 'GALMUDUG',
    descEn: 'Centuries of maritime civilization where the ancient coral-stone ruins of Zeila meet vibrant barrier reefs and the deep cobalt waters of the Gulf of Aden.',
    descSo: 'Taariikh qani ah oo badmaaxnimo halkaas oo marsooyinkii qadiimiga ahaa ee Seylac ay kula kulmaan shacaabka hodanka ah ee Berbera.',
    explorePath: '/explore-the-coast/zeila',
    heroBg: '/images/img_09.webp',
    destinations: [
      {
        id: 'zeila',
        title: 'Zeila Coral Archipelago',
        area: 'Awdal Barrier Reefs',
        image: '/images/img_09.webp',
        stars: 5,
        path: '/explore-the-coast/zeila',
      },
      {
        id: 'berbera',
        title: 'Berbera Deep Bay',
        area: 'Sahil Marine Corridor',
        image: '/images/img_03.webp',
        stars: 5,
        path: '/explore-the-coast/berbera',
      },
      {
        id: 'maydh',
        title: 'Maydh Island Sanctuary',
        area: 'Sanaag Coastal Cliffs',
        image: '/images/img_04.webp',
        stars: 5,
        path: '/explore-the-coast/maydh',
      },
    ],
  },
  {
    id: 'galmudug',
    num: '5',
    numberBadge: '05',
    nameEn: 'GALMUDUG',
    nameSo: 'GALMUDUG',
    taglineEn: 'Central Dunes & Untamed Ocean Frontier',
    taglineSo: 'Bannaanka Ciidda & Xeebta Furan ee Badda',
    prevGhostEn: 'SOMALILAND',
    prevGhostSo: 'SOMALILAND',
    nextGhostEn: 'PUNTLAND',
    nextGhostSo: 'PUNTLAND',
    descEn: 'Wild and windswept ocean wilderness where towering golden desert sand dunes plunge directly into the crashing surf of the open Indian Ocean.',
    descSo: 'Xeeb furan oo dabaylo hodan ah leh, halkaas oo buuraha ciidda dahabiga ah ay si toos ah ugu dhacaan hirarka xoogga badan ee Badweynta Hindiya.',
    explorePath: '/explore-the-coast/hobyo',
    heroBg: '/images/img_06.webp',
    destinations: [
      {
        id: 'hobyo',
        title: 'Hobyo Ancient Seaport',
        area: 'Mudug Dunes & Ocean',
        image: '/images/img_06.webp',
        stars: 5,
        path: '/explore-the-coast/hobyo',
      },
      {
        id: 'el-hur',
        title: 'El Hur Dunes & Surf',
        area: 'Central Coastal Dunes',
        image: '/images/img_11.webp',
        stars: 5,
        path: '/explore-the-coast/hobyo',
      },
      {
        id: 'marka',
        title: 'Marka Historic Bay',
        area: 'Southern Central Shore',
        image: '/images/img_01.webp',
        stars: 5,
        path: '/explore-the-coast/marka',
      },
    ],
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [cardOffset, setCardOffset] = useState(0);
  const [slideDirection, setSlideDirection] = useState('up');
  const [savedCards, setSavedCards] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const deckRef = useRef(null);

  const currentRegion = COASTAL_REGIONS[activeRegionIndex];
  const destinations = currentRegion.destinations;

  // Auto-advance cards every 5s; when all cards of the current region are scrolled,
  // also scroll regions upwards to the next region!
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCardOffset((prevOffset) => {
        const nextOffset = prevOffset + 1;
        if (nextOffset < destinations.length) {
          // Advance to next card in current region
          return nextOffset;
        } else {
          // All cards of this region have scrolled!
          // Scroll region upwards to the next region
          setSlideDirection('up');
          setActiveRegionIndex((prevRegion) => (prevRegion + 1) % COASTAL_REGIONS.length);
          return 0;
        }
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [destinations.length, isPaused]);

  // Ensure deck is scrolled smoothly to front on offset or region change so the first card is never cut off
  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [cardOffset, activeRegionIndex]);

  const handlePrevRegion = () => {
    setSlideDirection('down');
    setActiveRegionIndex((prev) => (prev > 0 ? prev - 1 : COASTAL_REGIONS.length - 1));
    setCardOffset(0);
  };

  const handleNextRegion = () => {
    setSlideDirection('up');
    setActiveRegionIndex((prev) => (prev < COASTAL_REGIONS.length - 1 ? prev + 1 : 0));
    setCardOffset(0);
  };

  const handleSelectRegion = (idx) => {
    if (idx === activeRegionIndex) return;
    setSlideDirection(idx > activeRegionIndex ? 'up' : 'down');
    setActiveRegionIndex(idx);
    setCardOffset(0);
  };

  const handlePrevCard = () => {
    setCardOffset((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        // Scrolled backwards past first card: scroll region downwards to previous region
        handlePrevRegion();
        return 0;
      }
    });
  };

  const handleNextCard = () => {
    setCardOffset((prev) => {
      if (prev + 1 < destinations.length) {
        return prev + 1;
      } else {
        // All cards scrolled: scroll region upwards to next region
        handleNextRegion();
        return 0;
      }
    });
  };

  const toggleBookmark = (e, destId) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedCards((prev) => ({
      ...prev,
      [destId]: !prev[destId],
    }));
  };

  const activeTitle = isSomali ? currentRegion.nameSo : currentRegion.nameEn;
  const isLongTitle = activeTitle.length > 8;

  // Rotate destinations array so current destination is always the first lead card, 100% full in view
  const visibleDestinations = destinations.slice(cardOffset).concat(destinations.slice(0, cardOffset));

  return (
    <section className="travel-hero" aria-label="Somalia Blue Heaven Coastal Regions">
      {/* Full-Bleed Panoramic Background Image */}
      <div className="travel-hero__bg-wrap">
        <img
          key={currentRegion.heroBg}
          src={currentRegion.heroBg}
          alt={`${currentRegion.nameEn} coastal waters`}
          className="travel-hero__bg"
          loading="eager"
        />
        <div className="travel-hero__overlay" />
      </div>

      {/* Main Container */}
      <div className="travel-hero__main">
        {/* Left Vertical Stepper / Timeline */}
        <aside className="travel-hero__stepper" aria-label="Region timeline stepper">
          <div className="travel-hero__stepper-track">
            {COASTAL_REGIONS.map((region, idx) => {
              const isActive = idx === activeRegionIndex;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => handleSelectRegion(idx)}
                  className={`travel-hero__step-item ${isActive ? 'travel-hero__step-item--active' : ''}`}
                  aria-label={`Region ${idx + 1}: ${region.nameEn}`}
                >
                  {isActive ? (
                    <span className="travel-hero__step-badge">{idx + 1}</span>
                  ) : (
                    <span className="travel-hero__step-dot" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="travel-hero__stepper-counter">
            <span className="travel-hero__stepper-current">{activeRegionIndex + 1}</span>
            <span className="travel-hero__stepper-sep">/</span>
            <span className="travel-hero__stepper-total">{COASTAL_REGIONS.length}</span>
          </div>
        </aside>

        {/* Center-Left: Region Story with Upwards/Downwards Reel Scrolling Animation */}
        <div className="travel-hero__story">
          {/* Top Place Title (clipped off the top edge) */}
          <div
            key={`top-${activeRegionIndex}`}
            className={`travel-hero__place-clip travel-hero__place-clip--top travel-hero__place-clip--${slideDirection}`}
          >
            <button
              type="button"
              className="travel-hero__place-btn"
              onClick={handlePrevRegion}
              title={`Previous region: ${isSomali ? currentRegion.prevGhostSo : currentRegion.prevGhostEn}`}
              aria-label={`Previous region: ${isSomali ? currentRegion.prevGhostSo : currentRegion.prevGhostEn}`}
            >
              <span className="travel-hero__place-text">
                {isSomali ? currentRegion.prevGhostSo : currentRegion.prevGhostEn}
              </span>
            </button>
          </div>

          {/* Center Story Content */}
          <div
            key={`story-${activeRegionIndex}`}
            className={`travel-hero__story-center travel-hero__story-center--${slideDirection}`}
          >
            {/* Subhead Eyebrow */}
            <div className="travel-hero__eyebrow">
              <span>{isSomali ? 'Sahmi Xeebaha' : 'Discover'}</span>
            </div>

            {/* Giant Bold Serif Region Title (Scaled cleanly for long names like SOMALILAND) */}
            <h1 className={`travel-hero__title ${isLongTitle ? 'travel-hero__title--long' : ''}`}>
              {activeTitle}
            </h1>

            {/* Descriptive Editorial Text */}
            <p className="travel-hero__desc">
              {isSomali ? currentRegion.descSo : currentRegion.descEn}
            </p>

            {/* Oval Glass Pill CTA */}
            <div className="travel-hero__actions">
              <Link
                to={localizedPath(currentRegion.explorePath)}
                className="travel-hero__explore-btn"
                id="hero-explore-region-btn"
              >
                <span>{isSomali ? 'Sahmi' : 'Explore'}</span>
                <ArrowRight size={18} className="travel-hero__btn-arrow" />
              </Link>
            </div>
          </div>

          {/* Bottom Place Title (clipped off the bottom edge) */}
          <div
            key={`bottom-${activeRegionIndex}`}
            className={`travel-hero__place-clip travel-hero__place-clip--bottom travel-hero__place-clip--${slideDirection}`}
          >
            <button
              type="button"
              className="travel-hero__place-btn"
              onClick={handleNextRegion}
              title={`Next region: ${isSomali ? currentRegion.nextGhostSo : currentRegion.nextGhostEn}`}
              aria-label={`Next region: ${isSomali ? currentRegion.nextGhostSo : currentRegion.nextGhostEn}`}
            >
              <span className="travel-hero__place-text">
                {isSomali ? currentRegion.nextGhostSo : currentRegion.nextGhostEn}
              </span>
            </button>
          </div>
        </div>

        {/* Center-Right: Scrollable Luxury Destination Cards Deck (Changes every 5s) */}
        <div
          className="travel-hero__cards-pane"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="travel-hero__cards-deck" ref={deckRef}>
            {visibleDestinations.map((dest, i) => {
              const isLead = i === 0;
              const isSaved = !!savedCards[dest.id];

              return (
                <Link
                  key={dest.id}
                  to={localizedPath(dest.path)}
                  className={`travel-card ${isLead ? 'travel-card--lead' : 'travel-card--sub'}`}
                  aria-label={`${dest.title} in ${currentRegion.nameEn}`}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="travel-card__img"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="travel-card__gradient" />

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    className={`travel-card__bookmark-btn ${isSaved ? 'travel-card__bookmark-btn--saved' : ''}`}
                    onClick={(e) => toggleBookmark(e, dest.id)}
                    aria-label={`Save ${dest.title}`}
                  >
                    <Bookmark
                      size={14}
                      fill={isSaved ? '#38bdf8' : 'none'}
                      color={isSaved ? '#38bdf8' : '#ffffff'}
                    />
                  </button>

                  {/* Card Bottom Content */}
                  <div className="travel-card__body">
                    <span className="travel-card__area">{dest.area}</span>
                    <h3 className="travel-card__title">{dest.title}</h3>
                    <div className="travel-card__stars" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, starI) => (
                        <Star key={starI} size={11} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Carousel Arrows & Dots */}
          <div className="travel-hero__carousel-ctrls">
            <button
              type="button"
              className="travel-hero__arrow-btn"
              onClick={handlePrevCard}
              aria-label="Previous destination"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="travel-hero__dots" aria-label="Destination slides">
              {destinations.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`travel-hero__dot ${dotIdx === cardOffset ? 'travel-hero__dot--active' : ''}`}
                  onClick={() => setCardOffset(dotIdx)}
                  aria-label={`Go to card ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="travel-hero__arrow-btn"
              onClick={handleNextCard}
              aria-label="Next destination"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Row: Social Links */}
      <div className="travel-hero__bottom-bar">
        <div className="travel-hero__socials" aria-label="Social media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="travel-hero__social-icon"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="travel-hero__social-icon"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="travel-hero__social-icon"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
