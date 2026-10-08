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
  Award,
  Globe,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getOrganization } from '../data/organization';
import '../styles/portalDesignSystem.css';

export default function AboutPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Ku Saabsan Somalia Blue Heaven — Ilaalinta Badda'
      : 'About Somalia Blue Heaven — Marine Heritage & Conservation';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const org = getOrganization(language);

  const featuredBases = [
    {
      tag: isSomali ? 'XARUNTA GUUD EE CILMI-BAARISTA' : 'PRIMARY MARINE HQ',
      title: isSomali
        ? 'Xarunta Sayniska Badda ee Boosaaso'
        : 'Bosaso Marine Research & Oceanography Lab',
      desc: isSomali
        ? 'Xarunta ugu weyn ee Somalia Blue Heaven ee ku taal Gacanka Cadmeed, oo leh shaybaarro casri ah oo lagu baaro noolaha badda, tayada biyaha, iyo socdaalka libaax-badeedka.'
        : 'Northern headquarters anchoring Gulf of Aden acoustic telemetry, coral nursery tanks, water quality monitoring, and pelagic shark research.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.webp',
    },
    {
      tag: isSomali ? 'SALDHIGGA CIRIFKA BARIGA' : 'EASTERN CONTINENTAL OUTPOST',
      title: isSomali
        ? 'Saldhigga Sahaminta ee Raas Xaafuun'
        : 'Ras Hafun Deep Ocean Monitoring Post',
      desc: isSomali
        ? 'Goobta ugu fog bariga qaaradda Afrika oo loo adeegsado la socodka nibiriyada waaweyn (Humpback Whales) iyo ilaalinta ukun-dhigashada qoolleyda badda.'
        : 'Strategic field post tracking deep Indian Ocean whale migration corridors and green turtle nesting populations across Africa’s easternmost tombolo.',
      link: '/explore-the-coast/hafun',
      image: '/images/img_01.webp',
    },
    {
      tag: isSomali ? 'XARUNTA SOOMALIA KOONFURTA' : 'SOUTHERN ATOLL STATION',
      title: isSomali
        ? 'Saldhigga Jasiiradaha Baajuun & Kismaayo'
        : 'Bajuni Archipelago Field Research Base',
      desc: isSomali
        ? 'Saldhig u heellan dhowridda cawsduurka badda (seagrass), dugongs-ka dhifka ah, iyo wada-shaqeynta doonyaha shiraaca ee dhaqanka.'
        : 'Southern field station safeguarding critical blue carbon mangrove estuaries, dugong grazing pastures, and traditional dhow seafaring communities.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.webp',
    },
  ];

  const scienceDivisions = [
    {
      region: isSomali ? 'Puntland • Boosaaso' : 'Puntland • Bosaso HQ',
      title: isSomali ? 'Qaybta Libaax-Badeedka & Kalluunka Waaweyn' : 'Elasmobranch & Pelagic Research Unit',
      desc: isSomali
        ? 'Dabagalka, diiwaangelinta sawirrada, iyo ilaalinta libaax-badeedyada iyo noocyada kala duwan ee shark-ka ee Gacanka Cadmeed.'
        : 'Non-invasive acoustic telemetry, photo-ID cataloging, and migration tracking for whale sharks and oceanic pelagic species.',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      region: isSomali ? 'Gacanka Cadmeed & Seylac' : 'Gulf of Aden & Zeila',
      title: isSomali ? 'Qaybta Daryeelka Dhagaxleyda Murjaanka' : 'Coral Reef Ecology & Nursery Team',
      desc: isSomali
        ? 'Daraasadda adkeysiga shacaabka ee heerkulka biyaha iyo dib-u-beeridda dhagaxleyda xannaanada lagu koriyay.'
        : 'Mapping thermal tolerance thresholds, operating fragmentation nurseries, and restoring damaged coral barrier reefs.',
      image: '/images/img_07.webp',
      link: '/conservation',
    },
    {
      region: isSomali ? 'Bari & Badweynta Hindiya' : 'Bari & Indian Ocean',
      title: isSomali ? 'Qaybta Nibiriyada & Dhawaqa Badda' : 'Cetacean Bioacoustics Observatory',
      desc: isSomali
        ? 'Dhegeysiga dhawaqa nibiriyada (Humpback Whales) iyo dabagalka marinnada ay maraan geeska Afrika xilliyada qabowga.'
        : 'Hydrophone arrays recording humpback whale song, dolphin pods, and evaluating anthropogenic marine noise pollution.',
      image: '/images/img_01.webp',
      link: '/research',
    },
    {
      region: isSomali ? 'Jubaland • Kismaayo' : 'Jubaland • Kismayo',
      title: isSomali ? 'Qaybta Kaymaha Mangrove-ka & Cawsduurka' : 'Mangrove & Seagrass Blue Carbon Unit',
      desc: isSomali
        ? 'Ilaalinta kaymaha difaaca xeebaha, cabbirka kaydinta kaarboonka, iyo badbaadada noocyada dugongs ee halista ku jira.'
        : 'Measuring blue carbon sequestered in southern estuaries, planting shoreline mangroves, and monitoring dugong habitats.',
      image: '/images/img_05.webp',
      link: '/conservation',
    },
    {
      region: isSomali ? 'Dhammaan Gobollada' : 'Somalia Coastline Wide',
      title: isSomali ? 'Qaybta Wada-shaqeynta Kalluumeysatada' : 'Artisanal Fisheries Co-op Alliance',
      desc: isSomali
        ? 'Xoojinta kalluumeysatada gacanta, yareynta qasaaraha kalluunka, iyo joojinta shabaakadaha waxyeelada geysta.'
        : 'Empowering artisanal handline fleets with fair-trade standards, solar-drying tech, and participatory marine governance.',
      image: '/images/img_02.webp',
      link: '/communities',
    },
    {
      region: isSomali ? 'Banaadir • Muqdisho' : 'Banadir • Mogadishu',
      title: isSomali ? 'Akadeemiyada Waxbarashada Badda' : 'Ocean Literacy & Youth Marine Academy',
      desc: isSomali
        ? 'Tababaridda ardayda jaamacadaha Soomaaliya, barnaamijyada dugsiyada, iyo dhiirrigelinta jiilka mustaqbalka ee saynisyahannada.'
        : 'Field internships for Somali marine biology students, ocean literacy for schools, and community diver training.',
      image: '/images/image.webp',
      link: '/about',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'ARAGTIDAYADA' : 'OUR VISION',
      title: isSomali ? 'Bad Soomaaliyeed oo Caafimaad Qabta' : 'A Living Ocean Valued & Protected',
      meta: isSomali ? 'Dadaalka 2026-2035 • Soomaaliya' : '10-Year Framework • Somalia Blue Heaven',
      excerpt: isSomali
        ? 'Mustaqbal ay badda Soomaaliya lagu fahmo saynis ahaan, lagu ilaaliyo caddaymo dhab ah, oo bulshooyinka xeebuhu si siman uga faa\'iidaystaan.'
        : 'A future where marine research is routine, conservation decisions are backed by rigorous science, and coastal communities flourish.',
      image: '/images/image.webp',
      link: '/about',
    },
    {
      badge: isSomali ? 'CILMI-BAARIS XOR AH' : 'SOVEREIGN SCIENCE',
      title: isSomali ? 'Xogta Badda ee Soomaalida Loo Sameeyay' : 'Independent Somali Marine Data',
      meta: isSomali ? 'Shaybaarka Boosaaso & Muqdisho' : 'Field Laboratories • Coastal Stations',
      excerpt: isSomali
        ? 'Dhisidda kaydka cilmi-baarista badda ee ugu weyn gobolka, si dalku u yeesho awood buuxda oo uu ku maareeyo 3,330 km oo xeeb ah.'
        : 'Generating primary datasets on fish stocks, coral bleaching resilience, and offshore currents to inform sovereign maritime policy.',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      badge: isSomali ? 'ISKAASHI CAALAMI AH' : 'GLOBAL STANDARDS',
      title: isSomali ? 'Isku-xirka Sayniska ee Badweynta Hindiya' : 'Western Indian Ocean Integration',
      meta: isSomali ? 'Heshiisyada Sayniska Badda' : 'Regional Marine Partnerships',
      excerpt: isSomali
        ? 'Ku xiridda saynisyahannada Soomaaliyeed shabakadaha caalamiga ah ee daraaseeya cimilada, badda, iyo badbaadada noolaha.'
        : 'Collaborating with regional institutions to ensure Somalia’s waters are integrated into broader climate and biodiversity agendas.',
      image: '/images/img_01.webp',
      link: '/conservation',
    },
  ];

  const institutionalAccords = [
    {
      title: isSomali ? 'Heshiiska Qaran ee Ilaalinta Marinnada Badda' : 'National Somali Marine Sanctuary & Corridor Framework',
      desc: isSomali
        ? 'Heshiis wadajir ah oo dhexmaray maamulada gobollada xeebaha, odayaasha kalluumeysatada, iyo Somalia Blue Heaven si loo sugo goobaha taranka noolaha.'
        : 'Multi-regional consensus safeguarding seasonal whale shark feeding zones and turtle nesting beaches across 3,330 km.',
      date: isSomali ? 'Heshiis Firfircoon 2026' : 'Active Framework 2026',
      location: isSomali ? 'Boosaaso, Muqdisho & Kismaayo' : 'Bosaso, Mogadishu & Kismayo',
      status: isSomali ? 'Heshiis Qaran' : 'National Accord',
      code: 'ACCORD-01',
      image: '/images/img_02.webp',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Shabakadda Sayniska Badda ee Badweynta Hindiya' : 'Western Indian Ocean Marine Science Fellowship',
      desc: isSomali
        ? 'Barnaamij deeq waxbarasho iyo tababar duurjoog ah oo ardayda Soomaaliyeed siinaya fursado ay ku bartaan sayniska badda ee casriga ah.'
        : 'Field attachments and laboratory fellowships for emerging Somali marine scientists, oceanographers, and resource economists.',
      date: isSomali ? 'Sannad kasta socda' : 'Annual Cohort Program',
      location: isSomali ? 'Jaamacadaha Dalka' : 'Somali Universities Network',
      status: isSomali ? 'Waxbarasho Furan' : 'Fellowship Open',
      code: 'FELLOW-03',
      image: '/images/image.webp',
      link: '/research',
    },
    {
      title: isSomali ? 'Kormeerka Dayax-Gacmeedka ee Ka-hortagga Xadgudubyada' : 'Sovereign EEZ Satellite Surveillance & Anti-IUU Taskforce',
      desc: isSomali
        ? 'Isku-xirka qalabka dayax-gacmeedka AIS iyo kormeerayaasha deegaanka si loo ilaaliyo xuquuqda kalluumeysatada maxalliga ah.'
        : 'Continuous radar and transponder tracking documenting foreign illegal trawlers exploiting nearshore artisanal fishing grounds.',
      date: isSomali ? '24/7 Kormeer Toos ah' : '24/7 Live Monitoring',
      location: isSomali ? 'Biyaha Dhaqaalaha ee Soomaaliya' : 'Somali EEZ Territorial Waters',
      status: isSomali ? 'Kormeer Joogto ah' : 'Active Radar Patrol',
      code: 'RADAR-09',
      image: '/images/img_01.webp',
      link: '/conservation',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/research?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredBases.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredBases.length) % featuredBases.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredBases.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredBases.length]);

  const currentFeatured = featuredBases[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="About Somalia Blue Heaven Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.webp"
            alt="Pristine Somalia coastal horizon meeting the ocean"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Compass size={14} />
              <span>{isSomali ? "HAY'ADDA SOMALIA BLUE HEAVEN" : "SOMALIA BLUE HEAVEN"}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Ilaalinta, Barashada & Quruxda Badda Soomaaliya.' : 'Dedicated to Africa’s Longest Living Coastline.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Waxaan u taagannahay in la sahamiyo, la barto, la ilaaliyo, oo adduunka lala wadaago deegaanka badda Soomaaliya — sababtoo ah xeeb muhiimad leh sida tan way u baahan tahay in la yaqaano.'
                : 'Exploring, studying, conserving, and sharing Somalia’s 3,330 km marine paradise in sovereign partnership with coastal communities.'}
            </p>

            {/* Search Pill Widget */}
            <div className="portal-hero__search-wrap">
              <form onSubmit={handleSearch} className="portal-hero__search-form">
                <Search size={18} color="#0ea5e9" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSomali
                      ? 'Raadi qeybaha sayniska, hadafka, ama saldhigyada...'
                      : 'Search our mission, science units, or field bases...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search about organization"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Explore'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Badges */}
            <div className="portal-hero__tags">
              <button
                type="button"
                onClick={() => navigate(localizedPath('/research'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Qaybaha Sayniska' : 'Science Units'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/conservation'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Hawlgallada Ilaalinta' : 'Conservation'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/communities'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Bulshooyinka Xeebaha' : 'Communities'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/contact'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Xarumahayaga' : 'Our Stations'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Founding Mission & Story (2-Column Card Section) */}
      <section className="portal-card-section" aria-label="Our Founding Story">
        <div className="portal-about-grid">
          {/* Left: Narrative + 3 Bullet Points with Circular Green Icons */}
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'SHEEKADAYADA & HADAFKA' : 'OUR FOUNDING STORY'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Waxaad Fahmi Weydo Ma Ilaalin Kartid'
                : 'You Cannot Protect What You Do Not Understand'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Somalia Blue Heaven waxay ka bilaabatay hal fiiro oo cad: Soomaaliya waxay leedahay xeebta ugu dheer Afrika dhulka weyn — 3,330 kilomitir — waxayna ka mid tahay kuwa ugu yar ee cilmi-ahaan loo baaray. Tobanaan sano oo xasilooni la\'aan ah ka dib, waxaan dhisnay hay\'ad u heellan sayniska badda, sahaminta anshaxa leh, iyo ilaalinta deegaanka iyadoo la kaashanayo bulshooyinka maxalliga ah.'
                : 'Somalia Blue Heaven was born from a fundamental imperative: mainland Africa’s longest coastline (3,330 km) was also its least scientifically documented. Where past decades saw void and conflict narratives, we saw living coral reefs, migratory superhighways for whales and sharks, and deep maritime heritage that deserved rigorous protection.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Compass size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Sahamin & Saynis Xaqiiqo Ah' : 'Sovereign Marine Science & Rigor'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Daraasado duurjoog ah oo ku saabsan kala duwanaanta noolaha, heerkulka biyaha, iyo socdaalka kalluunka.'
                      : 'Primary field research replacing speculation with telemetry, water metrics, and verified biodiversity mapping.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Ilaalin Joogto ah oo Caddayn Ku Dhisan' : 'Evidence-Based Habitat Sanctuaries'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'U beddelka xogaha sayniska aagag la ilaaliyo, xannaanada murjaanka, iyo beeridda dhirta mangrove-ka.'
                      : 'Translating ocean data into community-governed marine corridors, coral nurseries, and anti-IUU radar defense.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Users size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Wada-jirka Bulshada Xeebaha' : 'Community Sovereignty & Partnership'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'La shaqeynta kalluumeysatada dhaqanka, odayaasha badda, iyo haweenka si ilaalintu u noqoto mid waarta.'
                      : 'Ensuring artisanal fishers, youth rangers, and coastal women share directly in conservation benefits.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stylized Interactive Coastal Map Card */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.webp"
              alt="Somalia Blue Heaven field stations along Somalia coastline"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{isSomali ? 'Saldhigyada Hawlgalka' : 'Active Field Bases'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso Marine HQ</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Xaafuun Station</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>Eyl Field Post</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/mogadishu')}
              className="portal-about__map-pin portal-about__map-pin--mogadishu"
            >
              <span>Muqdisho Center</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>Baajuun Base</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Latest Highlights (3-Card Rounded Container) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Core Pillars">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'TIIRARKA GUUSHA' : 'OUR PILLARS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Sideen U Shaqaynaa?' : 'Our Four Operational Commitments'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xeerarka iyo mabaadi’da hagaya shaqada Somalia Blue Heaven ee maalinlaha ah.'
              : 'The core values guiding every expedition, research publication, and community collaboration.'}
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
      <section className="portal-panorama" aria-label="Featured Base Panorama">
        <div className="portal-panorama__inner">
          <img
            key={currentFeatured.image}
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
              <span>{isSomali ? 'Baro Saldhigga' : 'Explore Field Base'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Navigation Arrows & Dots */}
          <div className="portal-panorama__nav">
            <div className="portal-panorama__nav-dots">
              {featuredBases.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`portal-panorama__nav-dot ${idx === featuredIndex ? 'portal-panorama__nav-dot--active' : ''}`}
                  onClick={() => setFeaturedIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous base"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next base"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Divisions & Research Units Directory (6-Card Grid: 2 rows of 3) */}
      <section className="portal-card-section" aria-label="Divisions and Units">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'QAYBAHA HAWLGALKA' : 'OPERATIONAL UNITS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Kooxaha Cilmi-baarista & Sayniska' : "Somalia Blue Heaven's Specialized Field Divisions"}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Kooxo khubaro ah oo si joogto ah ugu howlan sahaminta, daryeelka shacaabka, iyo ilaalinta noolaha xeebaha.'
              : 'Interdisciplinary scientific teams stationed across northern, central, and southern marine zones.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {scienceDivisions.map((div, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={div.image} alt={div.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark division"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{div.region}</span>
                <h3 className="portal-attraction-card__title">{div.title}</h3>
                <p className="portal-attraction-card__desc">{div.desc}</p>
                <Link to={localizedPath(div.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Baro Qaybta' : 'Explore Unit'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/research')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Mashaariicda Sayniska' : 'View All Scientific Projects'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Institutional Accords & Governance (Horizontal Cards) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Accords and Partnerships">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'HESHIISYADA & ISKAASHIGA' : 'MARITIME ACCORDS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Xeerarka & Iskaashiga Qaran' : 'Institutional Frameworks & Standards'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Heshiisyada iyo nidaamyada sharci ee lagu hubinayo badbaadada biyaha Soomaaliya ee heer qaran iyo heer caalami.'
              : 'Binding multi-stakeholder accords uniting coastal authorities, fishing guilds, and researchers.'}
          </p>
        </div>

        <div className="portal-events-list">
          {institutionalAccords.map((accord, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={accord.image} alt={accord.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{accord.title}</h3>
                <p className="portal-event-card__desc">{accord.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{accord.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{accord.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Framework</span>
                  <span className="portal-event-card__status-val">{accord.code}</span>
                </div>
                <Link to={localizedPath(accord.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Baro Heshiiska' : 'View Accord'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #BlueHeavenLegacy Visual Photo Collage */}
      <section className="portal-card-section" aria-label="Visual Legacy">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #BlueHeavenLegacy
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Shaqadayada Muuqaal Ahaan' : 'Our Work Along the Horizon'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirro rasmi ah oo muujinaya doonyaha sayniska, shaqaalaha shaybaarka, iyo xeebaha barakeysan.'
              : 'Chronicles from our marine laboratories, research dhows, and community restoration days.'}
          </p>
        </div>

        {/* 4-Image Asymmetrical Mosaic */}
        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/image.webp" alt="Aerial coastal panorama of Somalia" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Bosaso marine research harbor" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_01.webp" alt="Ras Hafun oceanic station cliffs" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.webp" alt="Bajuni islands research dhow voyage" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/contact')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Nala Soo Xiriir' : 'Connect with Somalia Blue Heaven'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Partner with Us">
        <div className="portal-cta__inner">
          <img
            src="/images/image.webp"
            alt="Warm sunset over Somalia ocean coast"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Nala Dhis Mustaqbalka Badda Soomaaliya'
                : 'Build the Future of Somali Ocean Science'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Saynisyahanno, arday, bulshooyinka xeebaha, iyo taageerayaasha caalamka — dhammaantiin albaabkayagu waa idiin furan yahay.'
                : 'Whether as a researcher, student, community leader, or institutional partner, our doors are open to collaborate.'}
            </p>
            <Link to={localizedPath('/contact')} className="portal-btn-primary">
              <span>{isSomali ? 'Nala Soo Xiriir Hadda' : 'Partner with Somalia Blue Heaven'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
