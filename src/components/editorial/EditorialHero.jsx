import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import {
  Search,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Sparkles,
  Waves,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './EditorialHero.css';

// 6 Authentic, High-Definition Somali Coastline Showcase Images
export const SOMALI_COASTAL_HERO_SPOTS = [
  {
    id: 'somalia-cliffs-cove',
    image: '/somalia_hero_coast.webp',
    alt: 'Somalia coastal cliffs and turquoise azure waters with traditional seafaring dhow',
  },
  {
    id: 'somalia-coastal-panorama',
    image: '/somalia_coast.webp',
    alt: 'Aerial panorama of the 3,330 km Somali coastline and barrier reef shallows',
  },
  {
    id: 'white-sand-lagoons',
    image: '/images/img_01.webp',
    alt: 'Powdery white sand beaches and crystal turquoise lagoon with traditional boats',
  },
  {
    id: 'historic-citadel-bay',
    image: '/WebsiteImagery_1920x1080_SisterCities_BosasoSomalia-mtime20180108165841_2021-11-01-121110_grsn_91852798b59be8b28fc00edfe4aec23a.webp',
    alt: 'Historic coastal maritime tower and fishing haven on the Gulf of Aden',
  },
  {
    id: 'ocean-surf-canyon',
    image: '/images/img_07.webp',
    alt: 'Rolling turquoise Indian Ocean waves crashing on golden shores under coastal mountain peaks',
  },
  {
    id: 'barrier-reef-atoll',
    image: '/images/img_10.webp',
    alt: 'Aerial view of untouched coral barrier atolls and crystal clear marine shallows',
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const activeSpot = SOMALI_COASTAL_HERO_SPOTS[activeSpotIndex];

  // Auto-cycle through the coastal spots every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpotIndex((prev) => (prev + 1) % SOMALI_COASTAL_HERO_SPOTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Anime.js continuous fluid ocean & wildlife movements
  useEffect(() => {
    let anims = [];
    try {
      if (typeof animate === 'function') {
        // 1. Woodblock wave continuous ocean swell
        const a1 = animate('.hero-vector-wave', {
          translateY: [-6, 8],
          rotate: [-2, 2.5],
          duration: 3800,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        });

        // 2. Breaching whale surfacing & diving
        const a2 = animate('.hero-vector-whale-breach', {
          translateY: [8, -10],
          translateX: [-4, 5],
          rotate: [-2.5, 2.5],
          duration: 5200,
          alternate: true,
          loop: true,
          ease: 'inOutQuad',
        });

        // 3. Soaring seagulls coastal glide
        const a3 = animate('.hero-vector-seagulls', {
          translateX: [-14, 14],
          translateY: [-4, 6],
          duration: 6800,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        });

        // 4. Background coast sun gentle horizon breathing
        const a4 = animate('.hero-vector-coast-sun', {
          scale: [1, 1.03],
          translateY: [-4, 4],
          duration: 8500,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        });

        // 5. Spouting whale gentle bobbing
        const a5 = animate('.hero-vector-whale-spout', {
          translateY: [-5, 6],
          rotate: [-1, 1.5],
          duration: 4400,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        });

        anims = [a1, a2, a3, a4, a5];
      }
    } catch (err) {
      console.warn('Anime.js hero animation init:', err);
    }

    return () => {
      anims.forEach((a) => {
        if (a && typeof a.pause === 'function') a.pause();
      });
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${localizedPath('/explore-the-coast')}?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(localizedPath('/explore-the-coast'));
    }
  };

  return (
    <section className="hero-white-canvas" aria-label="Somalia Blue Heaven Marine Tourism">
      {/* Background Vintage Coastal Engraving Watermarks */}
      <div className="hero-vectors-backdrop" aria-hidden="true">
        <img
          src="/vector/coast_sun.webp"
          alt=""
          className="hero-vector-coast-sun"
          loading="lazy"
        />
        <img
          src="/vector/seagulls_coast.webp"
          alt=""
          className="hero-vector-seagulls"
          loading="lazy"
        />
      </div>

      <div className="hero-inner-container">
        {/* MAIN HERO GRID: Left Content + Right Signature Torn Paper Cutout */}
        <div className="hero-grid">
          {/* Left: Tourist Hook, Headlines, Search, and CTAs */}
          <div className="hero-content">
            {/* Breaching Whale Floating Illustrated Feature */}
            <motion.div
              className="hero-vector-whale-wrap"
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              title="Somali Waters Humpback & Sperm Whale Sanctuary"
            >
              <img
                src="/vector/breaching_whale.webp"
                alt="Breaching whale vector illustration"
                className="hero-vector-whale-breach"
              />
              <span className="hero-vector-tag">
                <Sparkles size={10} />
                <span>{isSomali ? 'Nibiriga Badda' : 'Whale Sanctuary'}</span>
              </span>
            </motion.div>

            {/* Subheading with Framer Motion */}
            <motion.span
              className="hero-subheading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isSomali ? 'Soo hel oo jeclow' : 'Discover and love'}
            </motion.span>

            {/* Main Headline with Framer Motion */}
            <motion.h1
              className="hero-main-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {isSomali ? 'Somalia Blue Heaven' : 'Somalia Blue Heaven'}
              <span className="hero-dot">.</span>
            </motion.h1>

            {/* Description with Framer Motion */}
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {isSomali
                ? 'Ku raaxayso safarkaaga oo maalin kasta ka dhig mid cajiib ah. Sahami carwooyinka shacaabka, biyaha buluugga ah, dekedaha qadiimiga ah, iyo soo dhoweynta diirran ee dadka xeebta deggan.'
                : 'Experience Africa’s greatest untouched marine wilderness — crystal turquoise lagoons, virgin coral barrier reefs, ancient maritime spice ports, and legendary coastal warmth along 3,330 km of pristine ocean.'}
            </motion.p>

            {/* Tourist Search Bar with Framer Motion */}
            <motion.form
              onSubmit={handleSearchSubmit}
              className="hero-search-wrap"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="hero-search-icon">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSomali ? 'Raadi meelaha, shacaabka, jasiiradaha...' : 'Search places, diving spots, beaches...'}
                className="hero-search-input"
                aria-label="Search destinations"
              />
              <span className="hero-search-divider" />
              <button
                type="submit"
                className="hero-search-filter"
                aria-label="Explore places"
                title="Search destinations"
              >
                <SlidersHorizontal size={18} />
              </button>
            </motion.form>

            {/* Quick Travel Filter Chips with Framer Motion */}
            <motion.div
              className="hero-travel-chips"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to={`${localizedPath('/explore-the-coast')}?category=Coral+Reefs`} className="hero-travel-chip">
                {isSomali ? 'Shacaabka Badda' : 'Coral Barrier Reefs'}
              </Link>
              <Link to={`${localizedPath('/explore-the-coast')}?category=Whale+Sharks`} className="hero-travel-chip">
                {isSomali ? 'Libaax-Badeed' : 'Whale Shark Safaris'}
              </Link>
              <Link to={`${localizedPath('/explore-the-coast')}?q=Bajuni`} className="hero-travel-chip">
                {isSomali ? 'Jasiirado Bikro ah' : 'Virgin Atolls'}
              </Link>
              <Link to={`${localizedPath('/explore-the-coast')}?category=Dunes+%26+Surf`} className="hero-travel-chip">
                {isSomali ? 'Xeebaha Cad' : 'White Sand Dunes'}
              </Link>
              <Link to={`${localizedPath('/experiences')}?q=dhow`} className="hero-travel-chip">
                {isSomali ? 'Doonyaha Dhowka' : 'Dhow Sailing'}
              </Link>
            </motion.div>

            {/* High-Impact Tourist CTAs with Framer Motion */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to={localizedPath('/explore-the-coast')} className="hero-btn-primary">
                <span>{isSomali ? 'Sahmi Xeebaha (3,330 KM)' : 'Explore the Coast (3,330 KM)'}</span>
                <ArrowRight size={17} />
              </Link>

              <Link to={localizedPath('/experiences')} className="hero-btn-secondary">
                <Compass size={17} />
                <span>{isSomali ? 'Khibradaha Dalxiiska' : 'Ocean Experiences'}</span>
              </Link>
            </motion.div>

            {/* Dynamic Rolling Wave Crest & Spouting Whale Bottom Decorative Row */}
            <div className="hero-vectors-lower-row">
              <motion.div
                className="hero-vector-wave-wrap"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.06, rotate: -1.5 }}
                title="Monsoon Ocean Swells of the Somali Coast"
              >
                <img
                  src="/vector/wave.webp"
                  alt="Rolling ocean wave vector illustration"
                  className="hero-vector-wave"
                />
                <span className="hero-vector-tag">
                  <Waves size={10} />
                  <span>{isSomali ? '3,330 KM Xeeb Nadiif ah' : '3,330 KM Coastline'}</span>
                </span>
              </motion.div>

              <motion.div
                className="hero-vector-spout-wrap"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.06, opacity: 1 }}
                title="Sovereign Marine Sanctuary"
              >
                <img
                  src="/vector/whale.webp"
                  alt="Twin-spouting whale vector illustration"
                  className="hero-vector-whale-spout"
                />
              </motion.div>
            </div>
          </div>

          {/* Right: Signature Torn-Paper Landscape Window matching reference artwork */}
          <div className="hero-visual-side">
            <svg
              className="hero-torn-svg"
              viewBox="0 0 1000 700"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <mask id="heroTornPaperMask">
                  {/* Black canvas: everything outside is transparent */}
                  <rect x="0" y="0" width="1000" height="700" fill="#000000" />

                  {/* Main Panoramic Cutout with organic torn paper edge & lobes matching reference */}
                  <path
                    d="M 1000 0
                       L 640 0
                       C 610 12, 590 32, 560 16
                       C 535 2, 505 24, 475 10
                       C 435 0, 395 10, 365 28
                       C 335 48, 315 88, 292 128
                       C 275 158, 290 188, 272 218
                       C 255 242, 236 268, 226 298
                       C 210 328, 192 352, 178 378
                       C 166 402, 172 432, 188 452
                       C 202 472, 222 488, 234 512
                       C 245 536, 236 562, 250 586
                       C 260 608, 276 622, 292 638
                       C 322 654, 348 634, 378 648
                       C 408 662, 438 644, 468 658
                       C 498 672, 528 648, 558 666
                       C 588 680, 618 652, 648 670
                       C 678 684, 708 656, 738 672
                       C 768 686, 798 660, 828 674
                       C 858 688, 888 662, 918 676
                       C 948 688, 976 666, 1000 674
                       Z"
                    fill="#ffffff"
                  />

                  {/* Torn Slit 1 (Left vertical torn paper slit) */}
                  <path
                    d="M 364 135
                       C 360 195, 369 265, 363 335
                       C 358 405, 368 475, 362 545
                       C 358 585, 364 615, 362 635
                       C 372 635, 377 615, 374 575
                       C 379 505, 370 435, 375 365
                       C 380 295, 371 220, 376 150
                       C 373 138, 368 135, 364 135
                       Z"
                    fill="#000000"
                  />

                  {/* Torn Slit 2 (Middle prominent vertical torn paper slit) */}
                  <path
                    d="M 563 25
                       C 558 95, 568 175, 562 255
                       C 557 335, 567 415, 561 495
                       C 556 565, 565 630, 561 662
                       C 571 662, 577 638, 574 578
                       C 579 508, 570 428, 575 348
                       C 580 268, 571 188, 576 108
                       C 573 58, 568 25, 563 25
                       Z"
                    fill="#000000"
                  />

                  {/* Torn Slit 3 (Right vertical torn paper slit in the water/coast) */}
                  <path
                    d="M 792 250
                       C 788 310, 797 380, 792 450
                       C 787 520, 796 590, 792 650
                       C 802 650, 807 628, 804 582
                       C 809 518, 800 448, 804 378
                       C 808 312, 800 258, 796 248
                       C 794 244, 793 248, 792 250
                       Z"
                    fill="#000000"
                  />

                  {/* Top notch tear */}
                  <path
                    d="M 472 0
                       L 476 35
                       L 482 0
                       Z"
                    fill="#000000"
                  />
                </mask>
              </defs>

              {/* High-Resolution Authentic Somali Coastline Photo */}
              <image
                key={activeSpot.image}
                href={activeSpot.image}
                x="0"
                y="0"
                width="1000"
                height="700"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#heroTornPaperMask)"
                className="hero-torn-image"
              />
            </svg>

            {/* Subtle Minimalist Scene Switcher Indicators (No names, purely visual) */}
            <div className="hero-scene-indicators" aria-label="Somali Coastal Photo Switcher">
              {SOMALI_COASTAL_HERO_SPOTS.map((spot, idx) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveSpotIndex(idx)}
                  className={`hero-scene-dot ${idx === activeSpotIndex ? 'hero-scene-dot--active' : ''}`}
                  aria-label={`Photo scene ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
