import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Microscope,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
  FileText,
  Activity,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/portalDesignSystem.css';

export default function ResearchPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Cilmi-Baarista Badda Soomaaliya — Somalia Blue Heaven Research'
      : 'Scientific Research & Living Observatories — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredStations = [
    {
      tag: isSomali ? 'SALDHIGGA WAQOOYI' : 'PRIMARY MARINE OBSERVATORY',
      title: isSomali ? 'Saldhigga Cilmi-Baarista Badda ee Boosaaso' : 'Bosaso Deep-Sea Marine Research Station',
      desc: isSomali
        ? 'Xarunta ugu weyn ee kormeerta heerkulka biyaha, plankton-ka, iyo socdaalka libaax-badeedka Gacanka Cadmeed iyadoo la adeegsanayo qalab casri ah.'
        : 'Continuous oceanographic monitoring tracking upwelling nutrient pulses, acoustic whale shark corridors, and temperature loggers.',
      link: '/research/projects',
      image: '/images/img_02.webp',
    },
    {
      tag: isSomali ? 'BLUE CARBON' : 'MANGROVE & REEF LAB',
      title: isSomali ? 'Xarunta Kaymaha Mangrove-ka ee Baajuun' : 'Bajuni Blue Carbon & Seagrass Laboratory',
      desc: isSomali
        ? 'Daraasaadka kaydinta kaarboonka ee dhirta badda, ilaalinta qoolleyda, iyo shacaabka koonfureed ee Badweynta Hindiya.'
        : 'Quantifying carbon sequestration in southern coastal estuaries while guarding essential green turtle breeding lagoons.',
      link: '/research/projects',
      image: '/images/img_05.webp',
    },
    {
      tag: isSomali ? 'BARIGA AFRIKA' : 'UPWELLING OBSERVATORY',
      title: isSomali ? 'Kormeerka Hirarka Badda ee Raas Xaafuun' : 'Ras Hafun Oceanographic Current Station',
      desc: isSomali
        ? 'Baaritaanka wareegga biyaha moolka ah ee ka soo kaca badweynta xilliga dabaysha monsoon-ka iyo saamaynta ay ku leeyihiin kalluunka.'
        : 'Documenting the world-renowned Somali Current upwelling that nourishes one of the most productive marine zones on Earth.',
      link: '/research/projects',
      image: '/images/img_01.webp',
    },
  ];

  const projects = [
    {
      category: isSomali ? 'Dabagalka Libaax-Badeedka' : 'Megafauna Telemetry',
      title: isSomali ? 'Socdaalka Libaax-Badeedka ee Gacanka' : 'Whale Shark Satellite Telemetry',
      desc: isSomali
        ? 'Calaamadeynta sawirrada iyo calaamadaha acoustic-ka si loo fahmo socdaalka xilliyeed.'
        : 'High-precision acoustic hydrophone monitoring mapping seasonal migratory routes.',
      image: '/images/img_02.webp',
      code: 'PROJ-01',
      link: '/research/projects',
    },
    {
      category: isSomali ? 'Adkaysiga Shacaabka' : 'Coral Resilience',
      title: isSomali ? 'Shacaabka u Adkaysta Kulaylka' : 'Thermal Tolerance in Somali Corals',
      desc: isSomali
        ? 'Daraasaad lagu ogaanayo noocyada shacaabka ee u adkeysan kara isbeddelka cimilada.'
        : 'Identifying heat-resilient coral genotypes thriving in variable Gulf of Aden waters.',
      image: '/images/img_07.webp',
      code: 'PROJ-02',
      link: '/research/projects',
    },
    {
      category: isSomali ? 'Blue Carbon' : 'Mangrove Ecology',
      title: isSomali ? 'Kaymaha Mangrove-ka ee Baajuun' : 'Mangrove Blue Carbon Stock Mapping',
      desc: isSomali
        ? 'Qiyaasidda kaydinta kaarboonka ee kaymaha biyaha cusbada leh ee koonfurta Soomaaliya.'
        : 'Comprehensive biomass and soil carbon core assessments along pristine mangrove shores.',
      image: '/images/img_05.webp',
      code: 'PROJ-03',
      link: '/research/projects',
    },
    {
      category: isSomali ? 'Kalluumeysiga Dhaqanka' : 'Fisheries Dynamics',
      title: isSomali ? 'Qiimeynta Kalluunka ee Boosaaso & Eyl' : 'Artisanal Fisheries Catch Assessment',
      desc: isSomali
        ? 'Wada-shaqeyn lala yeesho kalluumeysatada si loo xaqiijiyo badbaadada taranka kalluunka.'
        : 'Community-partnered logbook and catch monitoring to ensure long-term stock sustainability.',
      image: '/images/img_11.webp',
      code: 'PROJ-04',
      link: '/research/projects',
    },
    {
      category: isSomali ? 'Nabaad-Guurka Xeebaha' : 'Geomorphology',
      title: isSomali ? 'Isbeddelka Ciidda & Dhagaxyada Xeebaha' : 'Coastal Erosion & Shoreline Dynamics',
      desc: isSomali
        ? 'Kormeerka hirarka badda iyo nabaad-guurka xeebaha iyadoo la adeegsanayo sawirrada dayax-gacmeedka.'
        : 'Satellite radar mapping tracking shoreline sediment drift across 3,330 km of coast.',
      image: '/images/img_03.webp',
      code: 'PROJ-05',
      link: '/research/projects',
    },
    {
      category: isSomali ? 'Biyo Nadiifinta' : 'Pollution Monitoring',
      title: isSomali ? 'Baaritaanka Wasakhda Biyaha' : 'Microplastics & Ocean Purity Study',
      desc: isSomali
        ? 'Kormeerka joogtada ah ee nadaafadda biyaha iyo baaritaanka wasakhda badda dhex marta.'
        : 'Establishing baseline water purity measurements along remote coastal stations.',
      image: '/images/image.webp',
      code: 'PROJ-06',
      link: '/research/projects',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'XOGTA FURAN' : 'OPEN DATA',
      title: isSomali ? 'Xogta Cilmi-Baarista oo Furan' : 'Open Access Oceanographic Data',
      meta: isSomali ? 'Jaamacadaha & Saynisyahannada' : 'Global & Somali University Access',
      excerpt: isSomali
        ? 'Dhammaan xogaha heerkulka biyaha, tayada shacaabka, iyo socdaalka noolaha waa kuwo furan.'
        : 'Publishing transparent environmental datasets to empower Somali students and international researchers.',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      badge: isSomali ? 'QALABKA CASRIGA AH' : 'TECH INNOVATION',
      title: isSomali ? 'Buoy-yada & Qalabka Acoustic-ka' : 'Subsea Hydrophones & Monitoring Buoys',
      meta: isSomali ? 'Kormeerka 24/7' : '24/7 Automated Marine Telemetry',
      excerpt: isSomali
        ? 'Qalabka biyaha hoostooda ee duuba dhawaaqa hoonbarka, xuudka, iyo libaax-badeedka badda.'
        : 'Automated sensor arrays logging ocean temperature, salinity, and marine mammal vocalizations.',
      image: '/images/img_07.webp',
      link: '/research',
    },
    {
      badge: isSomali ? 'WADA-SHAQEYN' : 'COMMUNITY PARTNERSHIP',
      title: isSomali ? 'Sayniska Bulshada (Citizen Science)' : 'Citizen Science with Coastal Fishermen',
      meta: isSomali ? 'Xeebaha oo Dhan' : '3,330 KM Coastline Network',
      excerpt: isSomali
        ? 'Kalluumeysatada deegaanka oo gacan ka geysanaya diiwaangelinta xaaladaha badda iyo noocyada dhifka ah.'
        : 'Pairing modern satellite science with generations of indigenous navigation and marine knowledge.',
      image: '/images/img_01.webp',
      link: '/communities',
    },
  ];

  const expeditions = [
    {
      title: isSomali ? 'Warbixinta Sannadlaha ah ee Xaaladda Badda Soomaaliya' : 'State of the Somali Oceans Annual Report',
      desc: isSomali
        ? 'Warbixin dhammaystiran oo ku saabsan caafimaadka shacaabka, heerkulka biyaha, iyo noolaha badda ee 2026.'
        : 'Comprehensive ocean health assessment detailing reef cover, fisheries biomass, and climate resilience indicators.',
      date: isSomali ? 'Daabacaadda 2026' : 'Published 2026',
      location: isSomali ? 'Dhammaan Saldhigyada' : 'Coastwide Stations',
      status: isSomali ? 'Diyaar Ah' : 'Open Access',
      code: 'REP-26',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      title: isSomali ? 'Daraasadda Socdaalka Xuudka Badweynta Hindiya' : 'Humpback Whale Indian Ocean Migration Survey',
      desc: isSomali
        ? 'Diiwaangelinta marin-baxa xuudka weyn ee Badweynta Hindiya ee soo mara xeebaha Soomaaliya xilliga qaboobaha.'
        : 'Acoustic and visual surveys documenting southern humpback whale mother-calf pairs migrating along the Somali coast.',
      date: isSomali ? 'Xilliyeed' : 'Seasonal Survey',
      location: isSomali ? 'Raas Xaafuun & Eyl' : 'Hafun & Eyl Corridors',
      status: isSomali ? 'Socda' : 'In Progress',
      code: 'MAM-02',
      image: '/images/image.webp',
      link: '/research',
    },
    {
      title: isSomali ? 'Beeridda Tijaabada ah ee Shacaabka Micro-fragmentation' : 'Coral Micro-Fragmentation Pilot Study',
      desc: isSomali
        ? 'Tijaabinta xawaaraha koritaanka shacaabka marka la isticmaalo farsamada micro-fragmentation ee biyaha Boosaaso.'
        : 'Evaluating accelerated growth rates of damaged brain and staghorn corals in shallow in-situ nursery tables.',
      date: isSomali ? 'Tijaabo Joogto Ah' : 'Field Pilot',
      location: isSomali ? 'Gacanka Cadmeed' : 'Gulf of Aden Nursery',
      status: isSomali ? 'Tijaabo' : 'Pilot Trial',
      code: 'RES-08',
      image: '/images/img_07.webp',
      link: '/research',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = projects.find((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) navigate(localizedPath(match.link));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredStations.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredStations.length) % featuredStations.length);
  };

  const currentFeatured = featuredStations[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Marine Research Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.webp"
            alt="Marine research along Somalia coastline"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Microscope size={14} />
              <span>{isSomali ? 'CILMI-BAARISTA BADDA • 3,330 KM' : 'MARINE SCIENCE & RESEARCH • 3,330 KM'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Cilmi-Baarista & Xarumaha Badda.' : 'Scientific Research & Ocean Observatories.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Daraasaadka cilmiyeed ee badda, dhowridda shacaabka, iyo xogaha xaqiiqda ah ee lagu ilaalinayo xeebta ugu dheer qaaradda Afrika.'
                : 'Pioneering scientific oceanography, coral resilience tracking, and marine telemetry across Africa’s longest coastline.'}
            </p>

            {/* Inset Search Widget */}
            <div className="portal-hero__search-wrap">
              <form onSubmit={handleSearch} className="portal-hero__search-form">
                <Search size={18} color="#0ea5e9" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSomali
                      ? 'Raadi mashruuc, shacaab, libaax-badeed, ama xog...'
                      : 'Search projects, coral data, tagging, or stations...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search research projects"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Explore Science'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Tags */}
            <div className="portal-hero__tags">
              <Link to={localizedPath('/research/projects')} className="portal-hero__tag-btn">
                {isSomali ? 'Mashaariicda Socota' : 'Active Projects'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/bosaso')} className="portal-hero__tag-btn">
                {isSomali ? 'Saldhigga Boosaaso' : 'Bosaso Ocean Lab'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/kismayo')} className="portal-hero__tag-btn">
                {isSomali ? 'Kaymaha Baajuun' : 'Bajuni Mangrove Study'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/hafun')} className="portal-hero__tag-btn">
                {isSomali ? 'Hirarka Xaafuun' : 'Hafun Upwelling'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2-Column About Marine Research */}
      <section className="portal-card-section" aria-label="Research Overview">
        <div className="portal-about-grid">
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'SAYNISKA BADDA' : 'SCIENTIFIC INTEGRITY'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Saynis Casri Ah oo Lagu Ilaalinayo Badda'
                : 'Data-Driven Ocean Stewardship'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Somalia Blue Heaven waxay horumarinaysaa sayniska badda Soomaaliya iyadoo la adeegsanayo qalab casri ah, cilmi-baarayaal Soomaaliyeed, iyo wada-shaqeyn lala leeyahay jaamacadaha caalamka. Waxaan ururinaa xogta dhabta ah ee lagu difaacayo 3,330 km oo xeeb ah.'
                : 'Rigorous empirical observation forms the bedrock of marine protection. By pairing remote-sensing satellite radar with coastal acoustic hydrophones and community catch monitoring, we deliver actionable oceanographic data across the Somali coastline.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Activity size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Kormeerka Joogtada Ah ee Biyaha' : 'Continuous Oceanographic Telemetry'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Qalabka diiwaangeliya heerkulka, cusbada, iyo hirarka biyaha 24/7.'
                      : 'Real-time sensors monitoring sea surface temperature, salinity, and upwelling cycles.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Microscope size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Daraasadda Adkaysiga Shacaabka' : 'Coral Bleaching & Genetics Research'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Ogaanshaha noocyada shacaabka ee adkeysan kara kuleylka badda.'
                      : 'Genomic sampling of resilient coral heads surviving thermal stress anomalies.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <FileText size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Xogta oo Bulshada loo Furo' : 'Open Scientific Data Access'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Waxaan xogta cilmi-baarista u furaa ardayda iyo cilmi-baarayaasha Soomaaliyeed.'
                      : 'Empowering Somali scholars with free access to verified environmental datasets.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map card highlighting research stations */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.webp"
              alt="Research stations across Somalia"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{isSomali ? 'Saldhigyada Cilmi-Baarista' : 'Active Research Stations'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso Lab</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Xaafuun Buoy</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>Eyl Hydrophone</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>Baajuun Lab</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 3-Card Highlights Grid */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Research Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'HORUMARKA CILMIYEED' : 'SCIENTIFIC ADVANCEMENTS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Daraasaadka Ugu Muhiimsan' : 'Key Research Pillars'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada hawlgallada sayniska ee sida tooska ah u badbaadiya nolosha badda Soomaaliya.'
              : 'Our flagship oceanographic programs delivering actionable environmental protection.'}
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
                  <span>{isSomali ? 'Faahfaahin' : 'Learn More'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Panorama Featured Card with Floating White Card */}
      <section className="portal-panorama" aria-label="Featured Research Observatory">
        <div className="portal-panorama__inner">
          <img
            src={currentFeatured.image}
            alt={currentFeatured.title}
            className="portal-panorama__img"
          />

          <div className="portal-panorama__card">
            <span className="portal-panorama__card-tag">{currentFeatured.tag}</span>
            <h3 className="portal-panorama__card-title">{currentFeatured.title}</h3>
            <p className="portal-panorama__card-desc">{currentFeatured.desc}</p>
            <Link to={localizedPath(currentFeatured.link)} className="portal-panorama__card-link">
              <span>{isSomali ? 'Eeg Saldhigga' : 'Explore Station'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous observatory"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next observatory"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 6-Card Research Projects Grid (2x3) */}
      <section className="portal-card-section" aria-label="Research Projects Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'MASHAARIICDA CILMIYEED' : 'RESEARCH PORTFOLIO'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Mashaariicda Cilmi-Baarista ee Socda' : 'Active Marine Research Projects'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Ka baro wax badan oo ku saabsan dhammaan mashaariicda cilmiga ee laga fulinayo xeebaha 3,330 km.'
              : 'Empirical studies monitoring biodiversity, coastal geomorphology, and ocean health.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {projects.map((proj, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={proj.image} alt={proj.title} className="portal-attraction-card__img" />
                <span className="portal-highlight-card__badge" style={{ position: 'absolute', top: 12, left: 12 }}>
                  {proj.code}
                </span>
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark project"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{proj.category}</span>
                <h3 className="portal-attraction-card__title">{proj.title}</h3>
                <p className="portal-attraction-card__desc">{proj.desc}</p>
                <Link to={localizedPath(proj.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Daraasadda' : 'View Project'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/research/projects')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Mashaariicda' : 'Explore All Scientific Projects'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Horizontal Reports & Expeditions */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Scientific Reports">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DAABACAADAHA CILMIGA' : 'PUBLICATIONS & REPORTS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Warbixinnada & Buugaagta Cilmiga' : 'Peer-Reviewed Reports & Publications'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xogaha rasmiga ah ee ay soo saareen khubarada badda ee Somalia Blue Heaven.'
              : 'Open-access oceanographic monographs, field checklists, and annual health reviews.'}
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
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{exp.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Report</span>
                  <span className="portal-event-card__status-val">{exp.code}</span>
                </div>
                <Link to={localizedPath(exp.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Akhri' : 'Read Report'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #SomaliaMarineResearch Photo Diaries Mosaic */}
      <section className="portal-card-section" aria-label="Research Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #SomaliaMarineResearch
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Muuqaallada Sayniska Badda' : 'Fieldwork Dispatches'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirrada tooska ah ee hawlgallada cilmi-baarista xeebaha Soomaaliya.'
              : 'High-resolution photo chronicles of scientific field deployments and subsea surveys.'}
          </p>
        </div>

        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Bosaso research station waters" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_07.webp" alt="Coral reef survey" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Whale shark tagging" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/image.webp" alt="Coastline aerial research" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/conservation')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Ka Qaybgal Ilaalinta Badda' : 'Explore Conservation Work'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Panoramic Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Research CTA">
        <div className="portal-cta__inner">
          <img
            src="/images/image.webp"
            alt="Sunset over Somalia coastline"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Ku Biir Isbahaysiga Sayniska Badda Soomaaliya'
                : 'Partner with Somalia Marine Science'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Waxaan soo dhoweyneynaa cilmi-baarayaasha, ardayda, iyo hay’adaha caalamka ee doonaya inay baddayada wax ka bartaan.'
                : 'Collaborate with our maritime research stations to advance marine ecology and ocean health.'}
            </p>
            <Link to={localizedPath('/contact')} className="portal-btn-primary">
              <span>{isSomali ? 'Nala Soo Xiriir' : 'Contact Research Directorate'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
