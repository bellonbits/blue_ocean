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
  FileText,
  Clock,
  Radio,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles, getFeaturedArticle } from '../data/news';
import '../styles/portalDesignSystem.css';

export default function NewsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Wararka & Sahaminta Badda Soomaaliya — Somalia Blue Heaven'
      : 'News & Maritime Dispatches — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const allArticles = getAllArticles(language);
  const featuredArticle = getFeaturedArticle(language);

  const featuredStories = [
    {
      tag: isSomali ? 'WAR-SAXAAFADEED GAAR AH' : 'SPECIAL DISPATCH',
      title: isSomali
        ? 'Aragti Naadir Ah: Libaax-Badeed 9-Mitir ah oo lagu arkay Boosaaso'
        : 'Rare 9-Metre Whale Shark Sighting Documented Off Bosaso',
      desc: isSomali
        ? 'Kooxda cilmi-baarista ee Somalia Blue Heaven ayaa xaqiijisay libaax-badeed weyn oo ku dabaalanayay biyaha Gacanka Cadmeed, taasoo muujinaysa caafimaadka noolaha badda ee deegaanka.'
        : 'Researchers from the Elasmobranch Unit logged a juvenile whale shark surface-feeding off Puntland — the first confirmed sighting in over a decade.',
      link: '/news/whale-shark-puntland',
      image: '/images/img_02.png',
    },
    {
      tag: isSomali ? 'CILMI-BAARIS CUSUB' : 'RESEARCH UPDATE',
      title: isSomali
        ? 'Daraasad Lagu Sameeyay Cawsduurka Badda ee Baajuun'
        : 'Bajuni Seagrass Blue Carbon Survey Completed',
      desc: isSomali
        ? 'Khariidaynta dhulka ballaaran ee cawsduurka badda ee jasiiradaha koonfureed oo lagu ogaaday inay yihiin meelaha ugu muhiimsan ee keydiya kaarboonka Bariga Afrika.'
        : 'Mapping expedition reveals pristine seagrass beds across southern atolls acting as vital carbon sinks and shelters for dugongs and green turtles.',
      link: '/news',
      image: '/images/img_05.png',
    },
    {
      tag: isSomali ? 'HESHIIS MARITIME' : 'CONSERVATION ACCORD',
      title: isSomali
        ? 'Difaaca Cirifka Raas Xaafuun & Marinnada Badweynta'
        : 'Ras Hafun Deep Ocean Migration Sanctuary Initiative',
      desc: isSomali
        ? 'Kulan ay yeesheen kalluumeysatada, odayaasha dhaqanka, iyo saynisyahannada oo lagu ansixiyay aag la ilaaliyo oo loogu talagalay nibiriyada iyo qoolleyda.'
        : 'Coastal elders and researchers agree on seasonal protective corridors for migrating humpback whales and green turtles off Africa’s eastern tip.',
      link: '/news',
      image: '/images/img_01.png',
    },
  ];

  const articlesGrid = [
    {
      category: isSomali ? 'Noolaha Badda' : 'Marine Life',
      title: isSomali
        ? 'Libaax-Badeedka Gacanka Cadmeed: Socdaalka & Diiwaanka Sawirrada'
        : 'Gulf of Aden Whale Shark Migration & Spot-ID Catalog',
      desc: isSomali
        ? 'Diiwaanka sawirrada gaarka ah ee lagu garto libaax-badeedyada maraya biyaha Boosaaso iyo Raas Caseyr.'
        : 'Acoustic tagging and non-invasive photo-ID tracking reveal northern Somalia as a critical seasonal nursery.',
      time: isSomali ? '4 daqiiqo' : '4 min read',
      date: 'Aug 22, 2026',
      image: '/images/img_02.png',
      link: '/news/whale-shark-puntland',
    },
    {
      category: isSomali ? 'Cilmi-baaris' : 'Research',
      title: isSomali
        ? 'Heerkulka Biyaha & Dhagaxleyda Badda ee Seylac'
        : 'Sa’ad ad-Din Coral Bleaching Resilience Analysis',
      desc: isSomali
        ? 'Baaritaanno lagu ogaaday in shacaabka Seylac ay leeyihiin adkeysi dabiici ah oo ka dhan ah kuleylka biyaha badda.'
        : 'Thermal tolerance assays confirm Gulf of Aden reefs demonstrate unique evolutionary resistance to marine heatwaves.',
      time: isSomali ? '6 daqiiqo' : '6 min read',
      date: 'Jul 15, 2026',
      image: '/images/img_07.png',
      link: '/news',
    },
    {
      category: isSomali ? 'Bulshooyinka' : 'Communities',
      title: isSomali
        ? 'Haweenka Kismaayo oo Horseeday Farsamo Kalluumaysi oo Waarta'
        : 'Kismayo Women Lead Zero-Waste Fish Solar Curing',
      desc: isSomali
        ? 'Horumarinta hababka cadceedda lagu qallajiyo kalluunka oo yareeyay khasaaraha, dakhli badanna u keenay qoysaska xeebta.'
        : 'Community-scale solar drying infrastructure slashes post-harvest fish loss by 40% across southern landing sites.',
      time: isSomali ? '5 daqiiqo' : '5 min read',
      date: 'Jun 28, 2026',
      image: '/images/img_05.png',
      link: '/news',
    },
    {
      category: isSomali ? 'Ilaalinta' : 'Conservation',
      title: isSomali
        ? 'Ugxanta Qoolleyda ee Xaafuun: Dhalinyarada oo Badbaadiyay 1,200 Diin'
        : 'Hafun Beach Guardians Shield 1,200 Turtle Hatchlings',
      desc: isSomali
        ? 'Ilaalinta habeenkii ee xeebaha ciidda cad oo suurtogelisay in dhasha qoolleydu ay si nabad ah ugu noqdaan badda weyn.'
        : 'Midnight ranger vigils ensure endangered green turtle nests escape feral predators and reach the open Indian Ocean.',
      time: isSomali ? '4 daqiiqo' : '4 min read',
      date: 'May 19, 2026',
      image: '/images/img_01.png',
      link: '/news',
    },
    {
      category: isSomali ? 'Dalxiiska Badda' : 'Ocean Heritage',
      title: isSomali
        ? 'Dooxada Eyl: Socdaalka Biyaha Macaan ee Badda Ku Furan'
        : 'Dooxada Eyl: Where Freshwater Canyons Meet Cobalt Ocean',
      desc: isSomali
        ? 'Daraasad ku saabsan nidaamka deegaanka ee gaarka ah ee dooxada Eyl iyo qalcadihii taariikhiga ahaa ee Sayidka.'
        : 'Historic coastal fortresses, mineral river cascades, and pristine palm lagoons open for regulated ecotourism.',
      time: isSomali ? '5 daqiiqo' : '5 min read',
      date: 'Apr 11, 2026',
      image: '/images/img_03.png',
      link: '/news',
    },
    {
      category: isSomali ? 'Tiknoolajiyada' : 'Marine Tech',
      title: isSomali
        ? 'Radar-ka Dayax-Gacmeedka oo Joojiyay Kalluumaysiga Sharci-darrada ah'
        : 'Satellite AIS Radar Network Expands Across Somali Waters',
      desc: isSomali
        ? 'Isku-xirka dayax-gacmeedyada oo si toos ah u soo qabta doonyaha shisheeye ee sharci-darrada ku gala xeebta Soomaaliya.'
        : 'Automated dark-vessel detection logs unauthorized industrial trawlers violating artisanal nearshore fishing zones.',
      time: isSomali ? '7 daqiiqo' : '7 min read',
      date: 'Mar 03, 2026',
      image: '/images/image.png',
      link: '/news',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'DAAHFUR CUSUB' : 'BREAKING DISCOVERY',
      title: isSomali ? 'Libaax-Badeedka Boosaaso' : 'Rare Whale Shark Sighting Off Bosaso',
      meta: isSomali ? 'Cilmi-baarista • Puntland' : 'Elasmobranch Survey • Puntland',
      excerpt: isSomali
        ? 'Sawirro rasmi ah oo laga qaaday libaax-badeed 9-mitir ah oo ku quudanayay dusha biyaha ee Gacanka Cadmeed.'
        : 'Photographic evidence and spot-pattern logs confirm seasonal feeding aggregations returning to the northern coast.',
      image: '/images/img_02.png',
      link: '/news/whale-shark-puntland',
    },
    {
      badge: isSomali ? 'IILASHADA DHAGAXLEYDA' : 'REEF RESTORATION',
      title: isSomali ? 'Beeridda 5,000 Murjaan oo Cusub' : '5,000 Coral Fragments Seeded in Bosaso',
      meta: isSomali ? 'Dhowridda Badda • 2026' : 'Marine Nursery • 2026',
      excerpt: isSomali
        ? 'Xarunta daryeelka shacaabka ee Boosaaso oo si guul leh u dhex gelisay dhagaxleyda noocyada adkeysiga u leh kuleylka.'
        : 'Community divers complete transplanting nursery-grown Acropora coral fragments along degraded barrier reef sectors.',
      image: '/images/img_07.png',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'KAARBOONKA BULUUGGA AH' : 'BLUE CARBON',
      title: isSomali ? 'Kaymaha Mangrove-ka ee Koonfurta' : 'Bajuni & Kismayo Mangrove Estuary Map',
      meta: isSomali ? 'Daraasadda Cimilada • Jubaland' : 'Ecosystem Survey • Jubaland',
      excerpt: isSomali
        ? 'Xog ururin muujisay in kaymaha mangrove-ka Soomaaliya ay ka mid yihiin kuwa ugu caafimaadka badan gobolka Bariga Afrika.'
        : 'Baseline carbon density measurements reveal dense southern mangrove estuaries storing immense blue carbon reservoirs.',
      image: '/images/img_05.png',
      link: '/research',
    },
  ];

  const pressBulletins = [
    {
      title: isSomali ? 'War-saxaafadeed: Aagga La Ilaaliyo ee Gacanka Cadmeed' : 'Press Release: Gulf of Aden Marine Protected Haven Established',
      desc: isSomali
        ? 'Somalia Blue Heaven waxay si rasmi ah u shaacisay ballaarinta aagagga kormeerka sayniska ee xeebaha Boosaaso iyo Raas Caseyr.'
        : 'Formal establishment of science-backed seasonal no-take zones protecting whale shark corridors and breeding grouper aggregations.',
      date: isSomali ? 'Sebtembar 2026' : 'September 2026',
      location: isSomali ? 'Boosaaso, Puntland' : 'Bosaso Marine HQ',
      status: isSomali ? 'Bayaan Rasmi ah' : 'Official Release',
      code: 'PR-2026-08',
      image: '/images/img_02.png',
      link: '/news',
    },
    {
      title: isSomali ? 'Warbixinta Tayada Biyaha & Xaaladda Shacaabka 2026' : 'Somali Coastline Marine Quality & Coral Reef Health Bulletin',
      desc: isSomali
        ? 'Daabacaadda xogta sanadlaha ah ee lagu cabbiray heerkulka biyaha, pH, iyo noocyada kalluunka ee 12 goobood oo xeebta ah.'
        : 'Comprehensive scientific monitoring findings published covering 12 oceanic stations from Zeila to the Bajuni Archipelago.',
      date: isSomali ? 'Luuliyo 2026' : 'July 2026',
      location: isSomali ? 'Dhammaan Xeebaha' : 'Somalia Coastline Wide',
      status: isSomali ? 'Warbixin Saynis' : 'Scientific Bulletin',
      code: 'SCI-2026-03',
      image: '/images/img_07.png',
      link: '/research',
    },
    {
      title: isSomali ? 'Baaritaanka Dayax-Gacmeedka ee Kalluumaysiga Sharci-darrada ah' : 'Satellite Radar IUU Fishing Detection Audit Report',
      desc: isSomali
        ? 'Diiwaanka 45 markab oo shisheeye ah oo lagu arkay iyagoo ku xadgudbaya biyaha kalluumeysatada maxalliga ah ee Soomaaliya.'
        : 'Quarterly spatial analysis identifying illegal, unreported, and unregulated foreign industrial trawlers within sovereign territorial waters.',
      date: isSomali ? 'May 2026' : 'May 2026',
      location: isSomali ? 'Geeska Afrika' : 'EEZ Radar Operations',
      status: isSomali ? 'Diiwaan Baaris' : 'Surveillance Log',
      code: 'IUU-2026-02',
      image: '/images/image.png',
      link: '/conservation',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/news/articles?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredStories.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  const currentFeatured = featuredStories[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Somali Ocean News Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.png"
            alt="Somali ocean horizon and breaking waves"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Radio size={14} />
              <span>{isSomali ? 'WARAR & SHAACIN CUSUB EE BADDA' : 'ORIGINAL FIELD REPORTING • MARITIME NEWS'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Wararka & Sahaminta Badda Soomaaliya.' : 'Dispatches from Africa’s Longest Coastline.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Warbixinno toos ah, cilmi-baaris cusub, iyo guulaha ilaalinta deegaanka ee ka soo kordhay 3,330 km oo xeeb nool ah.'
                : 'Direct field reporting, marine biodiversity discoveries, conservation milestones, and community stories from across Somalia.'}
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
                      ? 'Raadi maqaal, noole badda, ama goob...'
                      : 'Search articles, discoveries, or field reports...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search articles"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Search News'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Badges */}
            <div className="portal-hero__tags">
              <button
                type="button"
                onClick={() => navigate(localizedPath('/news/articles?category=marine-life'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Noolaha Badda' : 'Marine Life'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/news/articles?category=research'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Cilmi-baaris' : 'Research'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/news/articles?category=conservation'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Ilaalinta Deegaanka' : 'Conservation'}
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/news/articles?category=coastal-communities'))}
                className="portal-hero__tag-btn"
              >
                {isSomali ? 'Bulshooyinka Xeebaha' : 'Communities'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Marine Journalism (2-Column Card Section) */}
      <section className="portal-card-section" aria-label="About Marine Journalism">
        <div className="portal-about-grid">
          {/* Left: Narrative + 3 Bullet Points with Circular Green Icons */}
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'WARBAAHINTA BADDA' : 'EVIDENCE-BASED OCEAN REPORTING'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Xaqiiqooyin Toos Ah oo Laga Helo Xeebteena'
                : 'Rigorous Reporting from Somalia’s Living Waters'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Somalia Blue Heaven waxay si joogto ah u daabacdaa xogaha dhabta ah ee laga helo xeebaha dalka — heerkulka biyaha, socdaalka libaax-badeedka, xaaladda dhagaxleyda badda, iyo guulaha ilaalinta deegaanka. Ma jiro meel kale oo laga helo xog qoto dheer oo ku saabsan badda Soomaaliya.'
                : 'Decades of scientific isolation left Somalia’s waters largely undocumented in global journals. Somalia Blue Heaven produces sovereign, peer-reviewed, and community-verified dispatches to illuminate our living ocean with unmatched depth and integrity.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Warbixinno Duurjoog ah' : 'First-Hand Field Logs & Telemetry'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Saynisyahannada iyo ilaaliyayaasha deegaanka oo si toos ah uga soo diiwaangeliya badda xaqiiqooyinka cusub.'
                      : 'Real-time observations from acoustic receivers, drone surveys, and underwater transects across all coastal zones.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Sparkles size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Xogaha Sayniska ee Furan' : 'Open Science & Verified Data'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Daahfurnaanta xogta sayniska si ardayda, cilmi-baarayaasha, iyo bulshadu uga faa\'iidaystaan.'
                      : 'Freely accessible datasets on coral thermal thresholds, pelagic migrations, and coastal bathymetry.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Users size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Codadka Bulshada Xeebaha' : 'Authentic Coastal Voices'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Waraysiyo lala yeesho kalluumeysatada gacanta, odayaasha badda, iyo haweenka farsameeya kalluunka.'
                      : 'Direct interviews honoring artisanal fishers, generational boat captains, and youth coastal rangers.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stylized Interactive Coastal Map Card */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.png"
              alt="Somalia coastal reporting stations map"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{isSomali ? 'Saldhigyada Warbixinta' : 'Active Reporting Bureaus'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso Bureau</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Xaafuun Outpost</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>Eyl Field Desk</span>
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
              <span>Baajuun Bureau</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Latest Highlights (3-Card Rounded Container) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Latest Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'WARAR MUHIIM AH' : 'BREAKING DISPATCHES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Dhaqdhaqaaqyada Ugu Dambeeyay' : 'Latest Marine Discoveries & Field Reports'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xogaha cusub ee ka soo kordhay sahaminta iyo ilaalinta badda Soomaaliya.'
              : 'Directly sourced dispatches from active coastal stations and scientific expeditions.'}
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
      <section className="portal-panorama" aria-label="Featured Story Panorama">
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
              <span>{isSomali ? 'Akhri Maqaalka Buuxa' : 'Read Full Dispatch'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous story"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next story"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Articles Directory (6-Card Grid: 2 rows of 3) */}
      <section className="portal-card-section" aria-label="Articles Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'MAQAALLADA CUSUB' : 'LATEST ARTICLES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Diiwaanka Qoraallada Badda' : 'Chronicles of Somalia’s Living Ocean'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada maqaallada ugu dambeeyay ee ku saabsan nolosha badda, cilmi-baarista, iyo ilaalinta deegaanka.'
              : 'In-depth essays, investigative bulletins, and photographic essays across our coastal territory.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {articlesGrid.map((art, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={art.image} alt={art.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark article"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="portal-attraction-card__region">{art.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#688274', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} />
                    {art.time}
                  </span>
                </div>
                <h3 className="portal-attraction-card__title">{art.title}</h3>
                <p className="portal-attraction-card__desc">{art.desc}</p>
                <Link to={localizedPath(art.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Akhri Maqaalka' : 'Read Article'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/news/articles')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Maqaallada' : 'Browse All News Articles'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Press Releases & Field Bulletins (Horizontal Cards) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Press Releases and Bulletins">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'BAYANNO & DIIRADA' : 'PRESS BULLETINS & BRIEFS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'War-saxaafadeedyada Rasmiga ah' : 'Official Bulletins & Marine Declarations'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Bayaanada rasmiga ah ee hay’adda, heshiisyada ilaalinta deegaanka, iyo warbixinnada sayniska.'
              : 'Institutional statements, inter-agency agreements, and scientific surveillance reports.'}
          </p>
        </div>

        <div className="portal-events-list">
          {pressBulletins.map((bulletin, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={bulletin.image} alt={bulletin.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{bulletin.title}</h3>
                <p className="portal-event-card__desc">{bulletin.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{bulletin.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{bulletin.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Bulletin</span>
                  <span className="portal-event-card__status-val">{bulletin.code}</span>
                </div>
                <Link to={localizedPath(bulletin.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Eeg Faahfaahinta' : 'View Bulletin'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #BlueHeavenFieldLogs Visual Photo Collage */}
      <section className="portal-card-section" aria-label="Visual Field Logs">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #BlueHeavenFieldLogs
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Sawirrada & Diirada Duurjoogta' : 'Photographic Field Archives'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirro rasmi ah oo ay qaadeen kooxaha cilmi-baarista iyo saxaafadda badda intii lagu guda jiray hawlgallada.'
              : 'Authentic high-resolution documentation from open-water expeditions and aerial drone flights.'}
          </p>
        </div>

        {/* 4-Image Asymmetrical Mosaic */}
        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/img_02.png" alt="Whale shark documented in northern Somali waters" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_07.png" alt="Living coral reef in Gulf of Aden" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_01.png" alt="Ras Hafun tombolo marine field site" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.png" alt="Bajuni islands coastal boat expedition" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/research')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Baro Cilmi-baaristayada' : 'Explore Scientific Research'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Stay Connected">
        <div className="portal-cta__inner">
          <img
            src="/images/image.png"
            alt="Somali coastal sunset horizon"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Ku Xirnow Wararka & Sahaminta Badda Soomaaliya'
                : 'Stay Connected to Somalia’s Living Ocean'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Kala soco warbixinno toos ah, buugaagta cilmi-baarista, iyo sheekooyinka bulshooyinka xeebaha.'
                : 'Receive breaking scientific expedition logs, marine conservation updates, and field bulletins.'}
            </p>
            <Link to={localizedPath('/contact')} className="portal-btn-primary">
              <span>{isSomali ? 'Nala Soo Xiriir Hadda' : 'Subscribe to Field Updates'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
