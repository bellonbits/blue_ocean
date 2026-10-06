import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Users,
  Anchor,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/portalDesignSystem.css';

export default function TourismPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Dalxiiska Xeebaha Soomaaliya — Blue Heaven'
      : 'Coastal Tourism — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredHavens = [
    {
      tag: isSomali ? 'DEEGAAN GAAR AH' : 'FEATURED HAVEN',
      title: isSomali ? 'Dooxada Eyl & Dhagaxyada Badda' : 'Dooxada Eyl & The Historic Ocean Cliffs',
      desc: isSomali
        ? 'Halka ilaha biyaha macaan ay kaga soo daraan badda buluugga ah ee Badweynta Hindiya, oo leh daaradaha qadiimiga ah.'
        : 'Where crystal freshwater springs cascade through dramatic limestone gorges directly into the cobalt Indian Ocean.',
      link: '/explore-the-coast/eyl',
      image: '/eyl1.jpg',
    },
    {
      tag: isSomali ? 'XEERTA BARAKAYSAN' : 'PRISTINE ATOLL',
      title: isSomali ? 'Jasiiradaha Baajuun & Dhagaxleyda' : 'Bajuni Archipelago Coral Atolls',
      desc: isSomali
        ? 'Jasiirado qadiimi ah oo leh biyaha ugu nadiifsan, doonyaha dhowka ee dhaqanka, iyo qoolleyda cagaaran ee badda.'
        : 'Secluded coral islands, crystal turquoise lagoons, and traditional Somali dhow maritime voyages.',
      link: '/explore-the-coast/kismayo',
      image: '/kismayo1.png',
    },
    {
      tag: isSomali ? 'GEESKA AFRIKA' : 'HORN OF AFRICA',
      title: isSomali ? 'Raas Xaafuun — Barta Bariga Afrika' : 'Ras Hafun — Easternmost Tip of Africa',
      desc: isSomali
        ? 'Gacanka caanka ah ee ku yaal geeska ugu fog ee bariga qaaradda Afrika, halkaas oo ay isku galaan labada badood.'
        : "Africa's easternmost continental peninsula where monsoon sea breezes connect Africa, Arabia, and Asia.",
      link: '/explore-the-coast/hafun',
      image: '/hafun1.jpg',
    },
  ];

  const attractions = [
    {
      region: isSomali ? 'Puntland' : 'Puntland Coast',
      title: isSomali ? 'Dekedda & Xeebaha Boosaaso' : 'Bosaso Harbor & Pristine Beaches',
      desc: isSomali
        ? 'Biyo deggan oo ku habboon dabaasha, dalxiiska doonyaha, iyo daawashada noolaha badda ee Gacanka Cadmeed.'
        : 'Calm turquoise waters, seasonal whale shark watching, and scenic boat expeditions along the Gulf of Aden.',
      image: '/bosaso1.jpg',
      link: '/explore-the-coast/bosaso',
    },
    {
      region: isSomali ? 'Jubaland' : 'Jubaland',
      title: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Archipelago & Islands',
      desc: isSomali
        ? 'Jasiirado qurux badan, carwooyinka dhagaxleyda badda, iyo xeebaha cad ee aan cidina dhibin.'
        : 'Untouched white sands, protected green turtle sanctuaries, and ancestral Swahili-Somali island villages.',
      image: '/kismayo1.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      region: isSomali ? 'Bari & Xaafuun' : 'Hafun Peninsula',
      title: isSomali ? 'Buuraha & Xeebta Raas Xaafuun' : 'Ras Hafun Ocean Cliffs',
      desc: isSomali
        ? 'Dhul qadiimi ah oo taariikhi ah, buuro dhaadheer oo badda dhex maquura, iyo kalluumeysi dabiici ah.'
        : 'Dramatic cliffs dropping into deep cobalt seas, historical trade ruins, and pristine coastal ecosystems.',
      image: '/hafun1.jpg',
      link: '/explore-the-coast/hafun',
    },
    {
      region: isSomali ? 'Nugaal' : 'Nugaal Coast',
      title: isSomali ? 'Dooxada & Qalcadda Eyl' : 'Dooxada Eyl Coastal Gorge',
      desc: isSomali
        ? 'Dooxo qurxoon oo webi iyo bad isku furan yihiin, qalcadihii taariikhiga ahaa ee Sayidka, iyo xeeb deggan.'
        : 'Historic coastal fortresses, dramatic canyons, and natural ocean pools with lush palm groves.',
      image: '/eyl1.jpg',
      link: '/explore-the-coast/eyl',
    },
    {
      region: isSomali ? 'Banaadir' : 'Banadir Seashore',
      title: isSomali ? 'Xeebta Liido & Muqdisho' : 'Lido Beach & Mogadishu Coast',
      desc: isSomali
        ? 'Xeebta caanka ah ee dalka, makhaayadaha badda, iyo qorrax-u-dhaca cajiibka ah ee Badweynta Hindiya.'
        : 'Somalias iconic vibrant promenade, fresh coastal seafood, warm surf, and golden sunset horizons.',
      image: '/somalia_coast.jpg',
      link: '/explore-the-coast/mogadishu',
    },
    {
      region: isSomali ? 'Awdal / Waqooyi' : 'Gulf of Aden',
      title: isSomali ? 'Jasiiradaha & Lagoons-ka Seylac' : 'Zeila Ancient Coral Lagoons',
      desc: isSomali
        ? 'Jasiiradaha Saacaddiin iyo Ceebaad, biyo gacameed gacale ah, iyo hugaamo badda oo aan caadi ahayn.'
        : 'Sa’ad ad-Din coral islands, ancient seafaring ruins, and emerald marine flats rich in sea birds and corals.',
      image: '/marine_coral.jpg',
      link: '/explore-the-coast/zeila',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'ILAALINTA BADDA' : 'SANCTUARY',
      title: isSomali ? 'Dhowridda Dhagaxleyda Badda ee Boosaaso' : 'Bosaso Coral Nursery & Sanctuary',
      meta: isSomali ? 'Barnaamijka Cilmi-baarista • Puntland' : 'Marine Research Team • Puntland',
      excerpt: isSomali
        ? 'Dadaallo lagu ballaarinayo hugaanta badda iyo ilaalinta noocyada dhifka ah ee ku nool Gacanka Cadmeed.'
        : 'Community-led coral restoration safeguarding critical nursery habitats and seasonal whale shark migrations.',
      image: '/bosaso1.jpg',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'SOCDAAL' : 'EXPEDITION',
      title: isSomali ? 'Baaritaanka Nolosha Badda ee Baajuun' : 'Bajuni Marine Life Biodiversity Survey',
      meta: isSomali ? 'Hawlgalka Jubaland • 2026' : 'Jubaland Fieldwork • 2026',
      excerpt: isSomali
        ? 'Diiwaangelinta qoolleyda badda, kaymaha mangrove-ka, iyo kalluunka qaniga ah ee xeebaha koonfureed.'
        : 'Comprehensive scientific documentation of sea turtle nesting grounds and pristine southern mangrove estuaries.',
      image: '/kismayo1.png',
      link: '/research',
    },
    {
      badge: isSomali ? 'DHIDIBADA TAARIIKHDA' : 'HERITAGE',
      title: isSomali ? 'Socdaalka Badda ee Raas Xaafuun' : 'Ras Hafun Maritime Heritage Journey',
      meta: isSomali ? 'Taariikhda Badda • Geeska Afrika' : 'Ocean History • Horn of Africa',
      excerpt: isSomali
        ? 'Sahaminta barta ugu bariyesa qaaradda Afrika oo kumanaan sano xarun u ahayd ganacsiga badda caalamiga ah.'
        : 'Tracing ancient spice and incense trade routes on the continent’s easternmost windswept peninsula.',
      image: '/hafun1.jpg',
      link: '/explore-the-coast/hafun',
    },
  ];

  const expeditions = [
    {
      title: isSomali ? 'Socdaalka Dabagalka Libaax-Badeedka (Whale Shark)' : 'Whale Shark Monitoring & Conservation Expedition',
      desc: isSomali
        ? 'Hawlgal cilmi-baaris ah oo lagu diiwaangelinayo socdaalka libaax-badeedka Gacanka Cadmeed iyadoo la adeegsanayo sawirro iyo calaamado casri ah.'
        : 'Non-invasive acoustic tracking and photographic identification of migratory whale sharks aggregating in Bosaso coastal waters.',
      date: isSomali ? 'Oktoobar 2026 - Janaayo 2027' : 'October 2026 – January 2027',
      location: isSomali ? 'Saldhigga Boosaaso' : 'Bosaso Maritime Station',
      status: isSomali ? 'Hawlgal Furan' : 'Active Fieldwork',
      code: 'BS-01',
      image: '/bosaso_whale_shark.jpg',
      link: '/research/projects',
    },
    {
      title: isSomali ? 'Badbaadada Qoolleyda Cagaaran ee Jasiiradaha Baajuun' : 'Bajuni Green Sea Turtle Nesting Patrol',
      desc: isSomali
        ? 'Ilaalinta habeenkii ee goobaha ukun-dhigashada qoolleyda badda, iyadoo la kaashanayo bulshooyinka jasiiradaha iyo dhalinyarada deegaanka.'
        : 'Night patrols and hatchery protection for endangered green and hawksbill turtles nesting on remote southern coral shores.',
      date: isSomali ? 'Sannad kasta socda' : 'Year-Round Initiative',
      location: isSomali ? 'Jasiiradaha Baajuun & Kismaayo' : 'Bajuni Islands & Kismayo',
      status: isSomali ? 'Bulshadu Ilaaliso' : 'Community Protected',
      code: 'BJ-04',
      image: '/marine_turtles.jpg',
      link: '/conservation/projects',
    },
    {
      title: isSomali ? 'Beeridda Dhirta Mangrove-ka & Dhagaxleyda Badda' : 'Coastal Mangrove Reforestation & Reef Recovery',
      desc: isSomali
        ? 'Dib u beerista dhirta qaaliga ah ee badda si looga hortago nabaad-guurka xeebaha loona kordhiyo taranka noolaha badda.'
        : 'Youth-driven planting campaigns establishing living coastal sea-walls and restoring vital fish spawning nurseries.',
      date: isSomali ? 'Bil Kasta' : 'Monthly Restoration',
      location: isSomali ? 'Xeebaha Soomaaliya oo dhan' : 'Somalia Coastline Wide',
      status: isSomali ? 'Tabarruc Furan' : 'Volunteer Open',
      code: 'CR-09',
      image: '/marine_coral.jpg',
      link: '/get-involved',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/explore-the-coast?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredHavens.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredHavens.length) % featuredHavens.length);
  };

  const currentFeatured = featuredHavens[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Somalia Coastal Tourism Hero">
        <div className="portal-hero__inner">
          <img
            src="/somalia_hero_coast.jpg"
            alt="Somalia's breathtaking 3,330 km coastline"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Compass size={14} />
              <span>{isSomali ? "3,330 KM XEEB LAGU WAREEGAY" : "SOMALIA'S COASTLINE • 3,330 KM"}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Sahami Dalxiiska Xeebaha Soomaaliya' : 'Discover Blue Heaven Somalia'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'La kulan quruxda aan la midka ahayn ee badda Soomaaliya — biyo nadiif ah, hugaanta dhagaxleyda, iyo magaalooyinka taariikhiga ah ee xeebaha.'
                : 'Experience the pristine coastal paradise, turquoise waters, and living marine sanctuaries along Africa’s longest continental coastline.'}
            </p>

            {/* Search Pill Widget */}
            <div className="portal-hero__search-wrap">
              <form onSubmit={handleSearch} className="portal-hero__search-form">
                <Search size={18} color="#2e7d32" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSomali
                      ? 'Raadi deegaan, jasiirad, ama xeeb...'
                      : 'Search destinations, islands, or coral reefs...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search destination"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Explore Coast'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Badges */}
            <div className="portal-hero__tags">
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Dhammaan Xeebaha' : 'All Coastlines'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/bosaso'))}
                className="portal-hero__tag-btn"
              >
                Boosaaso (Puntland)
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/kismayo'))}
                className="portal-hero__tag-btn"
              >
                Jasiiradaha Baajuun
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/hafun'))}
                className="portal-hero__tag-btn"
              >
                Raas Xaafuun
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/eyl'))}
                className="portal-hero__tag-btn"
              >
                Dooxada Eyl
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Blue Heaven (2-Column Card Section) */}
      <section className="portal-card-section" aria-label="About Blue Heaven Tourism">
        <div className="portal-about-grid">
          {/* Left: Narrative + 3 Bullet Points with Circular Green Icons */}
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'NAGU SAABSAN' : 'ABOUT BLUE HEAVEN'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Quruxda & Nolosha Badda Soomaaliya'
                : "Africa's Longest Living Coastline"}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Soomaaliya waxay leedahay 3,330 km oo xeeb ah oo isugu jirta Gacanka Cadmeed iyo Badweynta Hindiya. Waa dhul hodan ku ah noolaha badda, dhagaxleyda qadiimiga ah, iyo magaalooyinka taariikhiga ah ee kumanaanka sano ahaa albaabbada ganacsiga caalamka.'
                : 'With 3,330 kilometres of ocean front meeting the Indian Ocean and the Gulf of Aden, Somalia holds mainland Africa’s longest and most biodiverse coastline. Blue Heaven is dedicated to ethical coastal exploration, marine science, and protecting our marine paradise.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? '3,330 KM oo Xeeb Nadiif Ah' : '3,330 KM of Pristine Waters'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Xeebta ugu dheer qaaradda Afrika oo leh noocyo kala duwan oo dabeecad iyo cimilo ah.'
                      : 'From windswept northern bluffs on the Gulf of Aden to lush southern tropical coral atolls.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Ilaalinta Goobaha Muhiimka Ah' : 'Marine Protected Sanctuaries'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Libaax-badeedyo, qoolleyda badda, iyo hugaanta shacaabka oo si dhow loo ilaaliyo.'
                      : 'Safe havens for migratory whale sharks, humpback whales, dugongs, and nesting sea turtles.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Users size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Wada-shaqeynta Bulshada Xeebaha' : 'Community Maritime Stewardship'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Dhiirrigelinta kalluumeysatada deegaanka iyo dhalinyarada si ay baddooda u ilaashadaan.'
                      : 'Empowering artisanal fishing families, local researchers, and maritime guardians across every region.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stylized Interactive Coastal Map Card */}
          <div className="portal-about__map-card">
            <img
              src="/somalia_coast.jpg"
              alt="Stylized map view of Somalia coastline"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#2e7d32" />
              <span>{isSomali ? 'Goobaha Ugu Muhiimsan' : 'Premier Marine Hubs'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>⚓ Boosaaso</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>🌊 Raas Xaafuun</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>🏖️ Dooxada Eyl</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/mogadishu')}
              className="portal-about__map-pin portal-about__map-pin--mogadishu"
            >
              <span>🏙️ Muqdisho</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>🏝️ Baajuun</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Latest Highlights (3-Card Rounded Container) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Latest Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'WARAR & MUUQAALLO' : 'LATEST HIGHLIGHTS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Dhaqdhaqaaqyada Ugu Dambeeyay' : 'Latest Field Highlights & Discoveries'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xogaha cusub ee ka soo kordhay sahaminta iyo ilaalinta badda Soomaaliya.'
              : 'Curated dispatches from our active coastal scientific expeditions and marine expeditions.'}
          </p>
        </div>

        <div className="portal-highlights-grid">
          {highlights.map((item, idx) => (
            <article key={idx} className="portal-highlight-card">
              <div className="portal-highlight-card__img-wrap">
                <img src={item.image} alt={item.title} className="portal-highlight-card__img" />
                <span className="portal-highlight-card__badge">{item.badge}</span>
              </div>
              <div className="portal-highlight-card__body">
                <span className="portal-highlight-card__meta">{item.meta}</span>
                <h3 className="portal-highlight-card__title">{item.title}</h3>
                <p className="portal-highlight-card__excerpt">{item.excerpt}</p>
                <Link to={localizedPath(item.link)} className="portal-highlight-card__link">
                  <span>{isSomali ? 'Wax Badan Ka Baro' : 'Read more'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Featured Panorama Card with Floating White Card */}
      <section className="portal-panorama" aria-label="Featured Coastal Haven Panorama">
        <div className="portal-panorama__inner">
          <img
            src={currentFeatured.image}
            alt={currentFeatured.title}
            className="portal-panorama__img"
          />

          {/* Floating White Card */}
          <div className="portal-panorama__card">
            <span className="portal-panorama__card-tag">{currentFeatured.tag}</span>
            <h3 className="portal-panorama__card-title">{currentFeatured.title}</h3>
            <p className="portal-panorama__card-desc">{currentFeatured.desc}</p>
            <Link to={localizedPath(currentFeatured.link)} className="portal-panorama__card-link">
              <span>{isSomali ? 'Sahami Deegaanka' : 'Explore Location'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous destination"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next destination"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Top Attractions (6-Card Grid: 2 rows of 3) */}
      <section className="portal-card-section" aria-label="Top Coastal Attractions">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DEEGAANNADA CAANKA AH' : 'COASTAL HAVENS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Goobaha Ugu Caansan Xeebaha' : "Somalia's Top Coastal Attractions"}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada xeebaha ugu quruxda badan, jasiiradaha fog, iyo dooxooyinka badda ee 3,330 km.'
              : 'Untouched sands, ancient trading ports, and vibrant coral waters across the Somali coastline.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {attractions.map((att, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={att.image} alt={att.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark destination"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{att.region}</span>
                <h3 className="portal-attraction-card__title">{att.title}</h3>
                <p className="portal-attraction-card__desc">{att.desc}</p>
                <Link to={localizedPath(att.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Sahami Hadda' : 'Explore'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Goobaha Xeebaha' : 'View All Coastal Havens'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Events & Expeditions (Horizontal Cards) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Events and Expeditions">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'CILMI-BAARIS & HAWLGALLO' : 'EXPEDITIONS & INITIATIVES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Hawlgallada Badda & Ilaalinta Deegaanka' : 'Ocean Expeditions & Conservation'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Ka qayb gal hawlgallada ilaalinta deegaanka, dhowridda noolaha, iyo cilmi-baarista xeebaha.'
              : 'Join marine biologists, community patrols, and coastal youth protecting our living ocean.'}
          </p>
        </div>

        <div className="portal-events-list">
          {expeditions.map((exp, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={exp.image} alt={exp.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{exp.title}</h3>
                <p className="portal-event-card__desc">{exp.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#2e7d32" />
                    <span>{exp.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#2e7d32" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Station</span>
                  <span className="portal-event-card__status-val">{exp.code}</span>
                </div>
                <Link to={localizedPath(exp.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Ka Qaybgal' : 'Learn More'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/research')} className="portal-btn-secondary">
            <span>{isSomali ? 'Eeg Dhammaan Hawlgallada' : 'View All Expeditions'}</span>
          </Link>
        </div>
      </section>

      {/* 7. #BlueHeavenSomalia Visual Photo Collage */}
      <section className="portal-card-section" aria-label="Visual Ocean Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #BlueHeavenSomalia
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Xusuusaha Muuqaalka Xeebaha' : '#BlueHeavenDiaries'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirro cajiib ah oo ay qaadeen sahamiyeyaasha iyo kooxaha cilmi-baarista xeebaha Soomaaliya.'
              : 'Authentic visual chronicles captured along our 3,330 km turquoise coastline.'}
          </p>
        </div>

        {/* 4-Image Asymmetrical Mosaic */}
        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/somalia_hero_coast.jpg" alt="Aerial view of Somali coastline" />
          </div>
          <div className="portal-diary-item">
            <img src="/bosaso1.jpg" alt="Clear turquoise coastal waters in Bosaso" />
          </div>
          <div className="portal-diary-item">
            <img src="/hafun1.jpg" alt="Ras Hafun dramatic cliffs and ocean" />
          </div>
          <div className="portal-diary-item">
            <img src="/kismayo1.png" alt="Bajuni islands coastal boat" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/experiences')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Sahami Khibradaha Badda' : 'Discover Ocean Experiences'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Ready to Explore Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Call to Action">
        <div className="portal-cta__inner">
          <img
            src="/somalia_hero_coast.jpg"
            alt="Warm sunset over Somalia coastline"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Diyaar Ma U Tahay Sahaminta Badda Soomaaliya?'
                : 'Ready to Discover Blue Heaven Somalia?'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Biyo nadiif ah, dhagaxleyda qadiimiga ah, iyo 3,330 km oo xeeb nool ah oo ku sugaysa.'
                : 'Pristine turquoise waters, ancient seafaring history, and 3,330 km of living coastline await your journey.'}
            </p>
            <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
              <span>{isSomali ? 'Sahami Xeebaha Hadda' : 'Start Your Journey Now'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
