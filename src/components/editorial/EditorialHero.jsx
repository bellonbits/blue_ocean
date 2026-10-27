import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  MapPin,
  Waves,
  ShieldCheck,
  Calendar,
  Sparkles,
  Camera,
  Anchor,
  Eye,
  Search,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './EditorialHero.css';

// 6 Authentic, High-Definition Somali Coastline Showcase Spots
export const SOMALI_COASTAL_HERO_SPOTS = [
  {
    id: 'hafun-cove',
    title: 'Ras Hafun Peninsula',
    titleSo: 'Gacan-biyoodka Raas Xaafuun',
    tabTitle: 'Ras Hafun',
    location: 'Puntland Coast • Indian Ocean',
    locationSo: 'Xeebta Puntland • Badweynta Hindiya',
    badge: "Africa's Easternmost Horn",
    badgeSo: 'Barta Ugu Bariga fog Afrika',
    temp: '28°C',
    visibility: '32m Visibility',
    image: '/somalia_hero_coast.webp',
    alt: 'Somalia coastal cliffs and turquoise azure waters with traditional seafaring dhow',
  },
  {
    id: 'bajuni-islands',
    title: 'Bajuni Coral Archipelago',
    titleSo: 'Jasiiradaha Baajuun',
    tabTitle: 'Bajuni Islands',
    location: 'Jubaland Coast • Coral Lagoons',
    locationSo: 'Xeebta Jubaland • Biyaha Shacaabka',
    badge: 'Pristine Sandbars & Lagoons',
    badgeSo: 'Carro Cad & Shacaab Bikro ah',
    temp: '29°C',
    visibility: '28m Visibility',
    image: '/kismayo1.webp',
    alt: 'Bajuni Archipelago pristine white sandbars and tropical turquoise lagoons',
  },
  {
    id: 'bosaso-gulf',
    title: 'Bosaso Deep Bay & Fortress',
    titleSo: 'Gacanka Qotada Dheer ee Boosaaso',
    tabTitle: 'Bosaso Bay',
    location: 'Gulf of Aden • Deep Water Shelf',
    locationSo: 'Gacanka Cadmeed • Biyaha Pelagic-ka',
    badge: 'Whale Shark Sanctuary',
    badgeSo: 'Hoyga Libaax-Badeedka',
    temp: '27°C',
    visibility: '25m Visibility',
    image: '/WebsiteImagery_1920x1080_SisterCities_BosasoSomalia-mtime20180108165841_2021-11-01-121110_grsn_91852798b59be8b28fc00edfe4aec23a.webp',
    alt: 'Historic coastal maritime tower and fishing haven on the Gulf of Aden',
  },
  {
    id: 'eyl-canyon',
    title: 'Dooxada Eyl Gorge & Falls',
    titleSo: 'Dooxada Eyl & Dhagaxyada Badda',
    tabTitle: 'Eyl Canyon',
    location: 'Nugaal Coast • Indian Ocean Gorge',
    locationSo: 'Xeebta Nugaal • Dooxada Dhagaxeedka',
    badge: 'Freshwater Springs & Swells',
    badgeSo: 'Ilaha Biyaha Macaan & Badweynta',
    temp: '26°C',
    visibility: '30m Visibility',
    image: '/eyl3.webp',
    alt: 'A breathtaking canyon gorge meeting open Indian Ocean swells',
  },
  {
    id: 'liido-promenade',
    title: 'Liido Beach & Ocean Promenade',
    titleSo: 'Xeebta Liido ee Muqdisho',
    tabTitle: 'Liido Beach',
    location: 'Benadir Coast • Cobalt Swells',
    locationSo: 'Xeebta Banaadir • Hirarka Buluugga ah',
    badge: 'Living Maritime Heritage',
    badgeSo: 'Hidaha Badmareenka Nool',
    temp: '28°C',
    visibility: '22m Visibility',
    image: '/MOGADISHUBEACH LEDE.webp',
    alt: 'Liido Beach vibrant shoreline and turquoise Indian Ocean',
  },
  {
    id: 'barrier-reef-atoll',
    title: '3,330 KM Untouched Coastline',
    titleSo: '3,330 KM oo Xeeb Bikro ah',
    tabTitle: 'Coastline Panorama',
    location: 'Somali Current • Marine Wilderness',
    locationSo: 'Biyaha Geeska Afrika • Dabiici',
    badge: "Africa's Longest Coastline",
    badgeSo: 'Xeebta Ugu Dheer Qaaradda Afrika',
    temp: '28°C',
    visibility: '30m+ Visibility',
    image: '/somalia_coast.webp',
    alt: 'Aerial view of untouched coral barrier atolls and crystal clear marine shallows',
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  // Quick Booking / Trip Planning State
  const [bookingDest, setBookingDest] = useState('All Destinations');
  const [bookingExp, setBookingExp] = useState('All Experiences');
  const [bookingSeason, setBookingSeason] = useState('Peak Season (Nov–Apr)');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      booking: 'true',
      destination: bookingDest,
      experience: bookingExp,
      season: bookingSeason,
    }).toString();
    navigate(`${localizedPath('/contact')}?${query}`);
  };

  return (
    <section
      className="hero-cinema"
      aria-label="Somalia Blue Heaven Marine Tourism"
    >
      {/* 1. IMMERSIVE FULL-BLEED BACKGROUND OCEAN CANVAS (NO WHITE CUTS / NO DIVIDING LINES) */}
      <div className="hero-cinema__bg-container">
        <img
          src="/image.png"
          alt={
            isSomali
              ? 'Xeebta Soomaaliya ee quruxda badan oo leh doonyo dhaqameed iyo biyo buluug ah'
              : 'Somalia pristine turquoise lagoon, white sands, and traditional seafaring dhows'
          }
          className="hero-cinema__bg-img"
          loading="eager"
          fetchPriority="high"
        />

        {/* Sophisticated Luxury Multi-Stop Vignette Gradients for 100% Text Clarity */}
        <div className="hero-cinema__overlay-scrim" />
        <div className="hero-cinema__overlay-radial" />
        <div className="hero-cinema__overlay-bottom" />
      </div>

      {/* 2. MAIN HERO FOREGROUND CONTENT MATCHING REFERENCE MOCKUP */}
      <div className="hero-cinema__container">
        <div className="hero-cinema__main-row hero-cinema__main-row--simple">
          {/* Left Column: Headlines & Search Pill */}
          <div className="hero-cinema__content">
            {/* Main Headline matching reference mockup */}
            <motion.h1
              className="hero-cinema__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              {isSomali ? (
                <>
                  Helitaanka Jannada <br />
                  Baddaada Waa Fududahay<span className="hero-cinema__title-dot">.</span>
                </>
              ) : (
                <>
                  Finding Your Ocean <br />
                  Paradise Is Simple<span className="hero-cinema__title-dot">.</span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="hero-cinema__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              {isSomali
                ? 'Somalia Blue Heaven waa goobtaada koowaad ee lagu helo safarka badda ee kugu habboon. Ku raaxayso 3,330 km oo biyo buluug ah iyo shacaab bikro ah.'
                : 'Somalia Blue Heaven is your go to destination for finding the perfect ocean haven to suit your needs. With 3,330 km of pristine turquoise lagoons and virgin coral reefs across East Africa.'}
            </motion.p>

            {/* Search Pill Button matching reference image */}
            <motion.div
              className="hero-cinema__search-prompt-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('quick-booking-bar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-cinema__search-prompt-btn"
                aria-label="Search destinations"
              >
                <span>{isSomali ? 'Raadi' : 'Search'}</span>
                <span className="hero-cinema__search-prompt-line" />
                <ArrowRight size={15} className="hero-cinema__search-prompt-arrow" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. INTEGRATED FLOATING QUICK BOOKING / TRIP PLANNING BAR STRADDLING HERO SEAM */}
      <div id="quick-booking-bar" className="hero-cinema__booking-bar-wrap">
        <form onSubmit={handleBookingSubmit} className="hero-cinema__booking-bar" aria-label="Quick Trip Planning Bar">
          <div className="hero-cinema__booking-field">
            <span className="hero-cinema__booking-label">
              <MapPin size={14} className="hero-cinema__booking-icon" />
              <span>{isSomali ? 'Goobta Xeebta' : 'Destination'}</span>
              </span>
              <select
                value={bookingDest}
                onChange={(e) => setBookingDest(e.target.value)}
                className="hero-cinema__booking-select"
                aria-label="Select destination"
              >
                <option value="All Destinations">{isSomali ? 'Dhammaan Goobaha (10 Regions)' : 'All 10 Coastal Regions'}</option>
                <option value="Bajuni Islands">{isSomali ? 'Jasiiradaha Baajuun (Jubaland)' : 'Bajuni Coral Atolls (Jubaland)'}</option>
                <option value="Ras Hafun">{isSomali ? 'Raas Xaafuun (Puntland)' : 'Ras Hafun Peninsula (Puntland)'}</option>
                <option value="Dooxada Eyl">{isSomali ? 'Dooxada Eyl (Nugaal)' : 'Dooxada Eyl Canyon (Nugaal)'}</option>
                <option value="Bosaso">{isSomali ? 'Boosaaso (Gacanka Cadmeed)' : 'Bosaso Port & Deep Shelf'}</option>
                <option value="Mogadishu">{isSomali ? 'Xeebta Liido & Muqdisho' : 'Liido Beach & Mogadishu'}</option>
                <option value="Zeila">{isSomali ? 'Seylac & Jasiiradaha' : 'Zeila Archipelago & Reefs'}</option>
              </select>
            </div>

            <div className="hero-cinema__booking-divider" />

            <div className="hero-cinema__booking-field">
              <span className="hero-cinema__booking-label">
                <Compass size={14} className="hero-cinema__booking-icon" />
                <span>{isSomali ? 'Khibradda Badda' : 'Activity & Experience'}</span>
              </span>
              <select
                value={bookingExp}
                onChange={(e) => setBookingExp(e.target.value)}
                className="hero-cinema__booking-select"
                aria-label="Select experience"
              >
                <option value="All Experiences">{isSomali ? 'Dhammaan Khibradaha' : 'All Ocean Activities'}</option>
                <option value="Coral Reef Snorkeling">{isSomali ? 'Dabaasha Shacaabka (Snorkeling)' : 'Coral Reef & Lagoon Snorkeling'}</option>
                <option value="Pelagic Scuba Diving">{isSomali ? 'Quusidda Qotada Dheer (Scuba)' : 'Pelagic Coral Wall Scuba Diving'}</option>
                <option value="Traditional Dhow Sailing">{isSomali ? 'Doonyaha Dhowka ee Dhaqanka' : 'Traditional Dhow Island Sailing'}</option>
                <option value="Underwater Photography">{isSomali ? 'Sawir-qaadista Biyaha Hoostooda' : 'Underwater & Drone Photography'}</option>
                <option value="Marine Wildlife Safari">{isSomali ? 'Daawashada Libaax-Badeedka' : 'Whale Shark & Marine Safari'}</option>
              </select>
            </div>

            <div className="hero-cinema__booking-divider" />

            <div className="hero-cinema__booking-field">
              <span className="hero-cinema__booking-label">
                <Calendar size={14} className="hero-cinema__booking-icon" />
                <span>{isSomali ? 'Xilliga Safarka' : 'Travel Season'}</span>
              </span>
              <select
                value={bookingSeason}
                onChange={(e) => setBookingSeason(e.target.value)}
                className="hero-cinema__booking-select"
                aria-label="Select season"
              >
                <option value="Peak Season (Nov–Apr)">{isSomali ? 'Nof – Abriil (Biyo Deggan)' : 'November – April (Peak Calm Seas)'}</option>
                <option value="Monsoon Season (May–Oct)">{isSomali ? 'May – Oktoobar (Hirarka Badda)' : 'May – October (Active Swells)'}</option>
                <option value="Flexible Dates">{isSomali ? 'Waqti Furan' : 'Flexible / Year-Round Travel'}</option>
              </select>
            </div>

            <div className="hero-cinema__booking-action">
              <button
                type="submit"
                className="hero-cinema__booking-submit-btn"
                id="hero-check-availability-btn"
                aria-label="Search and book destinations"
              >
                <Search size={16} />
                <span>{isSomali ? 'Raadi Havens' : 'Search Havens'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
