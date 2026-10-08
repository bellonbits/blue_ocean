import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
  CheckCircle2,
  TreePine,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/portalDesignSystem.css';

export default function ConservationPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Ilaalinta Deegaanka Badda Soomaaliya — Somalia Blue Heaven Conservation'
      : 'Marine Conservation & Sanctuaries — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredSanctuaries = [
    {
      tag: isSomali ? 'DEEGAAN LA ILAALIYO' : 'SANCTUARY NETWORK',
      title: isSomali ? 'Dhowridda Jasiiradaha Baajuun & Badweynta Hindiya' : 'Bajuni Archipelago Marine Protected Area',
      desc: isSomali
        ? 'Aagagga shacaabka ee la dhowro oo ay bulshadu maamusho si loo badbaadiyo qoolleyda badda, kaymaha mangrove-ka, iyo taranka kalluunka.'
        : 'Community-enforced marine reserve safeguarding coral atolls, mangrove carbon sinks, and endangered sea turtle nesting dunes.',
      link: '/conservation/projects',
      image: '/images/img_05.png',
    },
    {
      tag: isSomali ? 'KA HORTAGGA IUU' : 'ANTI-IUU PATROL',
      title: isSomali ? 'Kormeerka Maraakiibta Sharci-darrada ah ee Badda' : 'Satellite Radar & Anti-Illegal Fishing Tracking',
      desc: isSomali
        ? 'Dabagalka dayax-gacmeedka ee lagu difaaco kalluumeysatada deegaanka loogana hortago maraakiibta shisheeye ee waxyeelleeya shacaabka.'
        : 'Protecting traditional artisanal fishing rights and marine biodiversity using satellite AIS and community coastal radar.',
      link: '/conservation/projects',
      image: '/images/image.png',
    },
    {
      tag: isSomali ? 'DIB U BEERIDDA' : 'REEF RESTORATION',
      title: isSomali ? 'Xarunta Shacaabka & Xannaanada Badda Boosaaso' : 'Bosaso Community Coral Nursery Initiative',
      desc: isSomali
        ? 'Dhalinyarada xeebaha oo beera shacaabka cusub si loo soo celiyo deegaankii kalluunka loona xoojiyo adkaysiga badda.'
        : 'Youth-driven active coral propagation and underwater nursery tables accelerating reef regeneration off northern shores.',
      link: '/conservation/projects',
      image: '/images/img_07.png',
    },
  ];

  const programs = [
    {
      category: isSomali ? 'Ilaalinta Qoolleyda' : 'Turtle Sanctuaries',
      title: isSomali ? 'Shabakadda Ilaalinta Qoolleyda Baajuun' : 'Bajuni Sea Turtle Sanctuary Network',
      desc: isSomali
        ? 'Ilaalinta ukunta iyo daadgureynta dhalinyarada qoolleyda badda si nabad ah.'
        : 'Night patrols guarding mother turtles and returning hatchlings safely to sea.',
      image: '/images/img_10.png',
      code: 'CON-01',
      link: '/conservation/projects',
    },
    {
      category: isSomali ? 'Kaymaha Mangrove-ka' : 'Mangrove Restoration',
      title: isSomali ? 'Beeridda 100,000 Geed oo Mangrove Ah' : '100,000 Mangrove Coastal Reforestation',
      desc: isSomali
        ? 'Dib u beerista dhirta badda si looga hortago nabaad-guurka xeebaha loona kaydiyo kaarboonka.'
        : 'Restoring critical estuarine buffer zones and rich fish nursery grounds.',
      image: '/images/img_05.png',
      code: 'CON-02',
      link: '/conservation/projects',
    },
    {
      category: isSomali ? 'Nadiifinta Badda' : 'Ghost Net Removal',
      title: isSomali ? 'Ka Saaridda Shabakadaha Badda ee Duugoobay' : 'Zero-Ghost-Net Ocean Retrieval Drive',
      desc: isSomali
        ? 'Kala soo bixidda shabakadaha dilaaga ah ee badda si loo badbaadiyo noolaha badda.'
        : 'Retrieving discarded commercial fishing nets from shallow reefs and rocky headlands.',
      image: '/images/img_02.png',
      code: 'CON-03',
      link: '/conservation/projects',
    },
    {
      category: isSomali ? 'Kalluumeysiga Nidaamsan' : 'Artisanal Fisheries',
      title: isSomali ? 'Xoojinta Iskaashatooyinka Kalluumeysatada' : 'Sustainable Fishermen Co-op Network',
      desc: isSomali
        ? 'Taageeridda qoysaska kalluumeysatada iyo isticmaalka qalabka badda ee sharciga ah.'
        : 'Equipping traditional fishing crews with sustainable gear and fair cold-storage.',
      image: '/images/img_11.png',
      code: 'CON-04',
      link: '/conservation/projects',
    },
    {
      category: isSomali ? 'Beeridda Shacaabka' : 'Coral Nurseries',
      title: isSomali ? 'Xannaanada Shacaabka ee Boosaaso' : 'Living Coral Fragment Micro-Nurseries',
      desc: isSomali
        ? 'Beeridda qaybo shacaab ah oo u adkaysta kulaylka badda si loogu beero reefs-ka.'
        : 'Cultivating climate-resilient coral fragments for transplantation onto damaged reefs.',
      image: '/images/img_07.png',
      code: 'CON-05',
      link: '/conservation/projects',
    },
    {
      category: isSomali ? 'Waxbarashada Badda' : 'Marine Education',
      title: isSomali ? 'Dugsiyada & Dhalinyarada Xeebaha' : 'Coastal Youth Marine Guardians Academy',
      desc: isSomali
        ? 'Tababbarka dhalinyarada deegaanka ee xagga quusitaanka, kormeerka, iyo daryeelka badda.'
        : 'Training the next generation of Somali marine rangers, scuba divers, and ecotourism guides.',
      image: '/images/img_03.png',
      code: 'CON-06',
      link: '/conservation/projects',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'DHOWRIDDA BADDA' : 'PROTECTED AREAS',
      title: isSomali ? 'Aagagga Badda ee La Ilaaliyo (MPAs)' : 'Community Marine Protected Areas',
      meta: isSomali ? 'Ilaalin Deegaan • 2026' : 'Indigenous MPA Governance • 2026',
      excerpt: isSomali
        ? 'Aagag badda ah oo laga mamnuucay jilaabashada burburka keenta si noolaha badda uu u tarmo.'
        : 'Designated no-take replenishment zones allowing reef fish biomass to recover exponentially.',
      image: '/images/img_05.png',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'DIB U SOO CELINTA' : 'ECOSYSTEM RESTORATION',
      title: isSomali ? 'Kaymaha Mangrove-ka ee Soomaaliya' : 'Living Coastal Mangrove Sea Walls',
      meta: isSomali ? 'Ka Hortagga Nabaad-Guurka' : 'Coastal Erosion & Blue Carbon',
      excerpt: isSomali
        ? 'Kaymo dabiici ah oo ka hortagaya duufaannada iyo hirarka xooggan ee Badweynta Hindiya.'
        : 'Natural green infrastructure absorbing storm surges while locking away carbon in estuarine muds.',
      image: '/images/img_07.png',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'KORMEERKA' : 'RADAR DEFENSE',
      title: isSomali ? 'Ilaalinta Xuduudda Badda ee Kalluunka' : 'Artisanal Fisheries Defense System',
      meta: isSomali ? 'Dayax-Gacmeedka & Radar-ka' : 'Satellite Monitoring & Coastal Defense',
      excerpt: isSomali
        ? 'Difaacidda kheyraadka dabiiciga ah ee Soomaaliya iyadoo la kaashanayo bulshooyinka xeebaha.'
        : 'Real-time alert systems stopping industrial bottom trawlers from devastating nearshore nursery reefs.',
      image: '/images/img_01.png',
      link: '/communities',
    },
  ];

  const milestones = [
    {
      title: isSomali ? 'Balaarinta Xudduudda Dhowridda ee Baajuun' : 'Bajuni Coastal Reserve Expansion',
      desc: isSomali
        ? 'Ballaarinta aagagga la ilaaliyo ee jasiiradaha Baajuun si loogu daro carwooyinka shacaabka ee cusub.'
        : 'Extending formal community protection across 450 km² of barrier reefs and turtle sandbars.',
      date: isSomali ? 'Hawlgal Socda' : 'Active Sanctuary',
      location: isSomali ? 'Jubaland Coast' : 'Jubaland Marine Zone',
      status: isSomali ? 'Dhowran' : 'Enforced',
      code: 'MPA-01',
      image: '/images/img_05.png',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Dadaalka Beeridda Shacaabka ee Boosaaso' : 'Bosaso In-Situ Coral Nursery Expansion',
      desc: isSomali
        ? 'Beeridda in ka badan 5,000 qaybood oo shacaab ah si loogu soo celiyo biyaha Gacanka Cadmeed.'
        : 'Deploying submerged nursery tables propagating endangered branching and brain corals.',
      date: isSomali ? 'Xilliyeed' : 'Seasonal Planting',
      location: isSomali ? 'Puntland Coast' : 'Puntland Marine Zone',
      status: isSomali ? 'Beerid' : 'Nursery Active',
      code: 'CRF-03',
      image: '/images/img_07.png',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Badbaadinta Qoolleyda ee Xilliga Ukun-Dhigashada' : 'Annual Green Turtle Hatching Milestone',
      desc: isSomali
        ? 'Boqolaal qoolleydii badda ah oo si nabad ah ugu noqday badda iyadoo la kaashanayo dhalinyarada deegaanka.'
        : 'Documenting successful hatch rates exceeding 88% across community-guarded southern sand dunes.',
      date: isSomali ? 'Sannad Kasta' : 'Annual Milestone',
      location: isSomali ? 'Xeebaha Koonfurta' : 'Southern Sandy Beaches',
      status: isSomali ? 'Guul' : '88% Hatch Rate',
      code: 'TUR-12',
      image: '/images/img_10.png',
      link: '/conservation',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = programs.find((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) navigate(localizedPath(match.link));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredSanctuaries.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredSanctuaries.length) % featuredSanctuaries.length);
  };

  const currentFeatured = featuredSanctuaries[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Marine Conservation Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.png"
            alt="Somalia marine conservation and protected waters"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <ShieldCheck size={14} />
              <span>{isSomali ? 'ILAALINTA DEEGAANKA • 3,330 KM' : 'OCEAN CONSERVATION • 3,330 KM'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Ilaalinta Deegaanka Badda Soomaaliya.' : 'Marine Conservation & Habitat Defense.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Difaacidda 3,330 km oo xeeb ah iyadoo la adeegsanayo aagag la dhowro, la dagaallanka kalluumeysiga sharci-darrada ah, iyo soo celinta shacaabka.'
                : 'Guarding 3,330 km of living coastline through indigenous community marine reserves, anti-poaching radar, and habitat restoration.'}
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
                      ? 'Raadi barnaamij, shacaab, qoolley, ama mangrove...'
                      : 'Search programs, sanctuaries, turtles, or reefs...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search conservation programs"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Explore Action'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Tags */}
            <div className="portal-hero__tags">
              <Link to={localizedPath('/conservation/projects')} className="portal-hero__tag-btn">
                {isSomali ? 'Aagagga La Dhowro' : 'Marine Sanctuaries'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/kismayo')} className="portal-hero__tag-btn">
                {isSomali ? 'Qoolleyda Baajuun' : 'Turtle Sanctuaries'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/bosaso')} className="portal-hero__tag-btn">
                {isSomali ? 'Shacaabka Boosaaso' : 'Coral Nurseries'}
              </Link>
              <Link to={localizedPath('/get-involved')} className="portal-hero__tag-btn">
                {isSomali ? 'Ku Biir Hawsha' : 'Take Action'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2-Column About Conservation */}
      <section className="portal-card-section" aria-label="Conservation Mission Overview">
        <div className="portal-about-grid">
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'GARGAARKA BADDA' : 'INDIGENOUS GUARDIANSHIP'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Difaacidda Badda Soomaaliya ee 3,330 KM'
                : 'Defending Africa’s Longest Living Coast'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Kheyraadka badda Soomaaliya wuxuu u baahan yahay ilaalinta dhabta ah ee dadka deegaanka. Somalia Blue Heaven waxay la shaqaysaa kalluumeysatada dhaqanka iyo dhalinyarada si loo dhiso aagagga badda ee la dhowro loona joojiyo jilaabashada sharci-darrada ah.'
                : 'Centuries of indigenous maritime stewardship prove that conservation succeeds when local fishing families lead. Somalia Blue Heaven partners directly with coastal communities to enforce no-take replenishment zones, deploy anti-trawler radar, and restore vital nursery habitats.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Aagagga Badda ee La Dhowro (MPAs)' : 'Community Marine Reserves'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Goobaha taranka kalluunka oo aan la taaban karin si noolaha badda uu u koro.'
                      : 'Designated replenishment areas allowing coral and pelagic fish populations to multiply.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'La Dagaallanka Maraakiibta Sharci-darrada' : 'Anti-IUU Trawler Radar'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Difaacidda xuquuqda kalluumeysatada Soomaaliyeed iyadoo la isticmaalayo radar.'
                      : 'Satellite surveillance identifying industrial foreign vessels raiding nearshore reefs.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <TreePine size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Beeridda Mangrove-ka & Shacaabka' : 'Active Habitat Restoration'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Dib u dhiska nidaamka dabiiciga ah ee xeebaha si looga hortago nabaad-guurka.'
                      : 'Youth planting campaigns establishing living sea-walls and expanding coral nurseries.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map card highlighting marine reserves */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.png"
              alt="Marine reserves map of Somalia"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{isSomali ? 'Aagagga La Ilaaliyo' : 'Marine Protected Sanctuaries'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso MPA</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Xaafuun Reserve</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>Baajuun Sanctuary</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 3-Card Highlights Grid */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Conservation Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DADAALLADA SOCDA' : 'CORE INITIATIVES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Barnaamijyada Ilaalinta ee Ugu Waaweyn' : 'Flagship Conservation Pillars'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada hawlgallada tooska ah ee badbaadinaya kheyraadka badda Soomaaliya.'
              : 'Our highest-impact conservation programs guarding living reefs and coastal livelihoods.'}
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
      <section className="portal-panorama" aria-label="Featured Conservation Sanctuary">
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
              <span>{isSomali ? 'Sahami Aagga' : 'Explore Sanctuary'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous sanctuary"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next sanctuary"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 6-Card Conservation Programs Grid (2x3) */}
      <section className="portal-card-section" aria-label="Conservation Programs Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'HAWLGALLADA DEEGAANKA' : 'ACTION DIRECTORY'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Mashaariicda Ilaalinta Badda ee Socda' : 'Active Conservation Programs'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Ka baro wax badan oo ku saabsan mashaariicda tooska ah ee ay hoggaaminayaan dhalinyarada iyo bulshada xeebaha.'
              : 'Community-led initiatives safeguarding marine biodiversity across Somalia’s 3,330 km coastline.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {programs.map((prog, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={prog.image} alt={prog.title} className="portal-attraction-card__img" />
                <span className="portal-highlight-card__badge" style={{ position: 'absolute', top: 12, left: 12 }}>
                  {prog.code}
                </span>
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark program"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{prog.category}</span>
                <h3 className="portal-attraction-card__title">{prog.title}</h3>
                <p className="portal-attraction-card__desc">{prog.desc}</p>
                <Link to={localizedPath(prog.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Qayb Qaado' : 'Get Involved'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/get-involved')} className="portal-btn-primary">
            <span>{isSomali ? 'Ku Biir Hawlgallada Ilaalinta' : 'Volunteer & Take Action'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Horizontal Conservation Milestones */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Conservation Milestones">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'GUULAHA LA GAARAY' : 'MEASURED IMPACT'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Natiijooyinka Hawlgallada Ilaalinta' : 'Conservation Impact & Milestones'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Natiijooyinka la taaban karo ee laga gaaray ilaalinta shacaabka, qoolleyda, iyo kaymaha mangrove-ka.'
              : 'Verifiable impact delivered through community partnership across our coastal stations.'}
          </p>
        </div>

        <div className="portal-events-list">
          {milestones.map((ms, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={ms.image} alt={ms.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{ms.title}</h3>
                <p className="portal-event-card__desc">{ms.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{ms.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{ms.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Impact</span>
                  <span className="portal-event-card__status-val">{ms.status}</span>
                </div>
                <Link to={localizedPath(ms.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Faahfaahin' : 'View Impact'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #GuardiansOfSomaliSeas Photo Diaries Mosaic */}
      <section className="portal-card-section" aria-label="Conservation Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #GuardiansOfSomaliSeas
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Muuqaallada Ilaalinta Badda' : 'Guardians of Somali Seas'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirrada dhalinyarada, kalluumeysatada, iyo khubarada ilaalinaya badda Soomaaliya.'
              : 'Field dispatches of community rangers safeguarding their ancestral coastal sanctuaries.'}
          </p>
        </div>

        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/img_10.png" alt="Sea turtle hatchling" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.png" alt="Bajuni mangroves and dhow" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_07.png" alt="Healthy coral garden" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_02.png" alt="Bosaso pristine shoreline" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/get-involved')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Ku Biir Hawsha Ilaalinta' : 'Join Our Conservation Mission'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Panoramic Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Conservation CTA">
        <div className="portal-cta__inner">
          <img
            src="/images/image.png"
            alt="Sunset over Somalia coastline"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Nala Ilaali Badda Soomaaliya ee 3,330 KM'
                : 'Stand with Somalia’s Living Coastline'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Dadaalkaagu wuxuu si toos ah u caawinayaa ilaalinta qoolleyda, shacaabka, iyo xuquuqda kalluumeysatada deegaanka.'
                : 'Your participation empowers artisanal fishing communities and ensures pristine seas for future generations.'}
            </p>
            <Link to={localizedPath('/get-involved')} className="portal-btn-primary">
              <span>{isSomali ? 'Ka Qaybgal Hadda' : 'Take Action Today'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
