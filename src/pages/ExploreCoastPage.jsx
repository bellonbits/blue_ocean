import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Anchor,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../components/editorial/EditorialHome.css';
import '../styles/ExploreCoastEditorial.css';

export default function ExploreCoastPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Sahami Xeebaha Soomaaliya (3,330 KM) — Somalia Blue Heaven'
      : "Explore Somalia's Coast (3,330 KM) — Somalia Blue Heaven";
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredDestinations = [
    {
      tag: isSomali ? 'GEESKA AFRIKA' : 'EASTERN HORN OF AFRICA',
      title: isSomali ? 'Raas Xaafuun — Barta Bariga Qaaradda' : 'Ras Hafun Peninsula & Ancient Trading Haven',
      desc: isSomali
        ? 'Barta ugu bariyesa qaaradda Afrika, halkaas oo ay isku galaan Badweynta Hindiya iyo Gacanka Cadmeed oo leh buuro dhaadheer.'
        : "Africa's easternmost continental point, where sheer limestone cliffs plunge into cobalt ocean waters under ancient monsoon skies.",
      link: '/explore-the-coast/hafun',
      image: '/images/img_01.png',
    },
    {
      tag: isSomali ? 'DEKEDDA & XEEBAHA' : 'PORT & SANCTUARY',
      title: isSomali ? 'Boosaaso — Gacanka Cadmeed' : 'Bosaso Marine Port & Whale Shark Waters',
      desc: isSomali
        ? 'Dekedda ganacsiga qadiimiga ah oo leh xeebo cad-cad, biyo deggan, iyo marinka socdaalka libaax-badeedka badda.'
        : 'A historic Gulf of Aden trading hub blessed with calm turquoise waters, coastal palm groves, and seasonal whale shark migrations.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.png',
    },
    {
      tag: isSomali ? 'JASIIRADAHA KOONFURTA' : 'SOUTHERN ATOLLS',
      title: isSomali ? 'Jasiiradaha Baajuun — Badweynta Hindiya' : 'Bajuni Archipelago Coral Islands',
      desc: isSomali
        ? 'Jasiirado qadiimi ah oo leh biyaha ugu nadiifsan, doonyaha dhowka ee dhaqanka, iyo goobaha ukun-dhigashada qoolleyda badda.'
        : 'An untouched constellation of coral atolls, turquoise lagoons, traditional Swahili-Somali dhow vessels, and green turtle hatcheries.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.png',
    },
  ];

  const destinations = [
    {
      region: isSomali ? 'Puntland' : 'Puntland Coast',
      title: isSomali ? 'Dekedda & Xeebaha Boosaaso' : 'Bosaso Harbor & Pristine Waters',
      desc: isSomali
        ? 'Xeebta caanka ah ee Gacanka Cadmeed oo leh biyo diirran, buuro dhaadheer, iyo kalluumeysi dabiici ah.'
        : 'Where dramatic Karkaar mountains meet calm Gulf waters, rich in marine life and ancient seafaring heritage.',
      image: '/images/img_02.png',
      link: '/explore-the-coast/bosaso',
    },
    {
      region: isSomali ? 'Jubaland' : 'Jubaland Coast',
      title: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Coral Archipelago',
      desc: isSomali
        ? 'Jasiirado carwo ah oo ku yaal Badweynta Hindiya, oo leh biyo buluug ah iyo noocyo dhif ah oo shacaab ah.'
        : 'Pristine islands ringed by living barrier reefs, crystal lagoons, and centuries of dhow maritime traditions.',
      image: '/images/img_05.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      region: isSomali ? 'Bari & Xaafuun' : 'Hafun Horn',
      title: isSomali ? 'Buuraha & Xeebta Raas Xaafuun' : 'Ras Hafun Ocean Cliffs',
      desc: isSomali
        ? 'Dhul taariikhi ah oo Geeska Afrika ku yaal, buuro shacaab ah oo dhererkoodu gaarayo badda gudaheeda.'
        : "Africa's easternmost headland, towering limestone bluffs, wild oceanic swells, and ancient spice trading ruins.",
      image: '/images/img_01.png',
      link: '/explore-the-coast/hafun',
    },
    {
      region: isSomali ? 'Nugaal' : 'Nugaal Valley',
      title: isSomali ? 'Dooxada & Qalcadda Eyl' : 'Dooxada Eyl Coastal Gorge',
      desc: isSomali
        ? 'Dooxo dabiici ah oo webi biyaha macaan iyo baddu isku galaan, qalcadihii Daraawiishta, iyo xeeb deggan.'
        : 'A breathtaking coastal canyon where freshwater streams spill directly into the turquoise Indian Ocean.',
      image: '/images/img_03.png',
      link: '/explore-the-coast/eyl',
    },
    {
      region: isSomali ? 'Banaadir' : 'Banadir Seashore',
      title: isSomali ? 'Xeebta Liido & Muqdisho' : 'Lido Beach & Mogadishu Coast',
      desc: isSomali
        ? 'Xeebta ugu caansan dalka oo leh makhaayado badda, qorrax-u-dhaca cajiibka ah, iyo dadweyne farxad leh.'
        : 'Iconic open ocean promenade, warm rolling surf, bustling seaside culture, and golden evening light.',
      image: '/images/image.png',
      link: '/explore-the-coast/mogadishu',
    },
    {
      region: isSomali ? 'Awdal / Waqooyi' : 'Gulf of Aden',
      title: isSomali ? 'Jasiiradaha & Lagoons-ka Seylac' : 'Zeila Ancient Coral Lagoons',
      desc: isSomali
        ? 'Jasiiradaha Saacaddiin, biyo gacameed gacale ah, iyo hugaamo badda oo kumanaan sano jirtey.'
        : 'Shallow emerald marine flats, Sa’ad ad-Din island coral sanctuaries, and ancient seafaring trading routes.',
      image: '/images/img_07.png',
      link: '/explore-the-coast/zeila',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'GACANKA CADMEED' : 'GULF OF ADEN',
      title: isSomali ? 'Xeebaha Waqooyi & Boosaaso' : 'Northern Gulf of Aden & Bosaso',
      meta: isSomali ? 'Puntland • 1,300 KM Xeeb' : 'Puntland • 1,300 KM Coast',
      excerpt: isSomali
        ? 'Buuraha dhaadheer ee Karkaar oo badda ku darsama, biyo mool ah oo ay dhex maraan noocyada waaweyn ee badda.'
        : 'Rugged coastal mountain ranges meeting deep oceanic waters, famous for calm coves and seasonal whale sharks.',
      image: '/images/img_02.png',
      link: '/explore-the-coast/bosaso',
    },
    {
      badge: isSomali ? 'BADWEYNTA HINDIYA' : 'INDIAN OCEAN',
      title: isSomali ? 'Jasiiradaha Koonfureed & Baajuun' : 'Southern Indian Ocean & Bajuni',
      meta: isSomali ? 'Jubaland • Coral Atolls' : 'Jubaland • Coral Atolls',
      excerpt: isSomali
        ? 'Silsilad jasiirado ah oo leh carwooyinka shacaabka, kaymaha mangrove-ka, iyo xeebaha cad ee aan la taaban.'
        : 'A protected archipelago of coral cays, dense mangrove forests, and crucial green sea turtle nesting grounds.',
      image: '/images/img_05.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      badge: isSomali ? 'BARIGA AFRIKA' : 'EASTERN HORN',
      title: isSomali ? 'Raas Xaafuun & Dooxada Eyl' : 'Ras Hafun & Eyl Sea Cliffs',
      meta: isSomali ? 'Bari & Nugaal • Ancient Seaways' : 'Bari & Nugaal • Ancient Seaways',
      excerpt: isSomali
        ? 'Dhul qadiimi ah oo Geeska Afrika ku yaal, qalcado taariikhi ah, iyo buuro dabiici ah oo badda dhexdeeda ah.'
        : 'Ancient maritime crossroads where freshwater springs, deep sea canyons, and historic stone fortresses convene.',
      image: '/images/img_03.png',
      link: '/explore-the-coast/hafun',
    },
  ];

  const harbors = [
    {
      title: isSomali ? 'Dekedda Boosaaso & Marinka Libaax-Badeedka' : 'Bosaso Deep Port & Whale Shark Sanctuary',
      desc: isSomali
        ? 'Xarunta ganacsiga iyo marin baxa doonyaha ee Gacanka Cadmeed, oo caan ku ah biyaha diirran iyo noolaha badda.'
        : 'The northern gateway uniting coastal commerce and marine sanctuary research along the Gulf of Aden.',
      date: isSomali ? 'Puntland Maritime Zone' : 'Puntland Maritime Zone',
      location: isSomali ? 'Gacanka Cadmeed (11.28° N, 49.18° E)' : 'Gulf of Aden (11.28° N, 49.18° E)',
      status: isSomali ? 'Deggan' : 'Active Port',
      code: 'BS-01',
      image: '/images/img_02.png',
      link: '/explore-the-coast/bosaso',
    },
    {
      title: isSomali ? 'Gacanka Jasiiradaha Baajuun & Dhowridda Badda' : 'Bajuni Archipelago Marine Protected Area',
      desc: isSomali
        ? 'Jasiiradaha ugu hodansan koonfurta dalka ee dhinaca shacaabka, qoolleyda, iyo doonyaha qadiimiga ah.'
        : 'Southern sanctuary protecting coral reefs, green turtles, and sustainable artisanal island fishermen.',
      date: isSomali ? 'Jubaland Marine Zone' : 'Jubaland Marine Zone',
      location: isSomali ? 'Badweynta Hindiya (-0.36° S, 42.54° E)' : 'Indian Ocean (-0.36° S, 42.54° E)',
      status: isSomali ? 'Ilaalin Buuxda' : 'Protected',
      code: 'BJ-04',
      image: '/images/img_05.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      title: isSomali ? 'Dooxada Eyl & Dhagaxyada Badweynta Hindiya' : 'Dooxada Eyl Coastal Gorge & Marine Canyon',
      desc: isSomali
        ? 'Halka ilaha biyaha macaan ay kaga daraan badda buluugga ah, oo leh taariikh dheer oo qarniyo ah.'
        : 'Iconic limestone canyon where pure fresh springs meet rolling Indian Ocean swells beside stone fortresses.',
      date: isSomali ? 'Nugaal Marine Zone' : 'Nugaal Marine Zone',
      location: isSomali ? 'Badweynta Hindiya (7.98° N, 49.82° E)' : 'Indian Ocean (7.98° N, 49.82° E)',
      status: isSomali ? 'Dabiici Ah' : 'Natural Cove',
      code: 'EY-07',
      image: '/images/img_03.png',
      link: '/explore-the-coast/eyl',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const dest = destinations.find(
      (d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (dest) {
      navigate(localizedPath(dest.link));
    }
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredDestinations.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredDestinations.length) % featuredDestinations.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredDestinations.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredDestinations.length]);

  const currentFeatured = featuredDestinations[featuredIndex];

  return (
    <div className="explore-editorial-page">
      {/* 1. Full-Bleed Editorial Hero (Seamless, No Inset Card) */}
      <section className="explore-hero" aria-label="Explore Somalia Coast Hero">
        <img
          src="/images/image.png"
          alt="Somalia 3,330 KM pristine coastline"
          className="explore-hero__bg"
          loading="eager"
        />
        <div className="explore-hero__overlay" />

        <div className="explore-hero__content">
          <div className="explore-hero__meta">
            <span className="explore-hero__kicker">
              <Compass size={14} />
              <span>{isSomali ? '3,330 KM XEEB NOOL AH' : "SOMALIA'S COASTLINE · 3,330 KM"}</span>
            </span>
          </div>

          <h1 className="explore-hero__title">
            {isSomali ? (
              <>
                Sahami Xeebaha <br />
                <span className="explore-hero__title-italic">Badda Soomaaliya.</span>
              </>
            ) : (
              <>
                Explore Somalia's <br />
                <span className="explore-hero__title-italic">Pristine Coast.</span>
              </>
            )}
          </h1>

          <p className="explore-hero__desc">
            {isSomali
              ? 'Laga bilaabo buuraha dhaadheer ee Gacanka Cadmeed ilaa carwooyinka shacaabka ee Badweynta Hindiya — sahami xeebta ugu dheer qaaradda Afrika.'
              : 'From the dramatic sea cliffs of the Gulf of Aden to the crystal turquoise coral atolls of the Indian Ocean — discover the longest coastline on mainland Africa.'}
          </p>

          {/* Luxury Editorial Search Bar */}
          <div className="explore-hero__search-wrap">
            <form onSubmit={handleSearch} className="explore-hero__search-form">
              <Search size={18} className="explore-hero__search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isSomali
                    ? 'Raadi Boosaaso, Baajuun, Eyl...'
                    : 'Search Bosaso, Bajuni, Hafun...'
                }
                className="explore-hero__search-input"
                aria-label="Search destinations"
              />
              <button type="submit" className="explore-hero__search-btn">
                <span>{isSomali ? 'Sahami' : 'Explore'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Quick Filter Tags */}
          <div className="explore-hero__tags">
            <Link to={localizedPath('/explore-the-coast/bosaso')} className="explore-hero__tag-btn">
              Boosaaso (Puntland)
            </Link>
            <Link to={localizedPath('/explore-the-coast/kismayo')} className="explore-hero__tag-btn">
              Jasiiradaha Baajuun
            </Link>
            <Link to={localizedPath('/explore-the-coast/hafun')} className="explore-hero__tag-btn">
              Raas Xaafuun
            </Link>
            <Link to={localizedPath('/explore-the-coast/eyl')} className="explore-hero__tag-btn">
              Dooxada Eyl
            </Link>
            <Link to={localizedPath('/explore-the-coast/mogadishu')} className="explore-hero__tag-btn">
              Xeebta Liido
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 2-Column Overview & Interactive Coastal Map (120px Pause) */}
      <section className="explore-section" aria-label="Somalia Coastal Overview">
        <div className="explore-container">
          <div className="explore-about-grid">
            <div className="explore-about__narrative">
              <span className="explore-eyebrow">
                {isSomali ? 'GEESKA AFRIKA' : 'COASTAL SANCTUARIES'}
              </span>
              <h2 className="explore-section-title">
                {isSomali ? (
                  <>Saddex Caalam oo <span className="editorial-italic">Biyood oo Isku Xiran</span></>
                ) : (
                  <>Three Interconnected <span className="editorial-italic">Marine Worlds</span></>
                )}
              </h2>
              <p className="explore-about__body">
                {isSomali
                  ? 'Xeebta Soomaaliya ee 3,330 km waxay u qaybsantaa saddex gobol oo badda ah: Gacanka Cadmeed oo leh buuro iyo biyo deggan, Bariga Afrika oo leh barta Raas Xaafuun, iyo Koonfurta Badweynta Hindiya oo leh jasiiradaha Baajuun ee dhagaxleyda badda ah.'
                  : 'Somalia’s coastline embraces three distinct oceanic realms: the deep upwelling currents of the Gulf of Aden, the historic windswept cliffs of Ras Hafun and Eyl, and the protected tropical coral archipelago of Bajuni in the south.'}
              </p>

              <div className="explore-about__features">
                <div className="explore-feature-item">
                  <div className="explore-feature-icon">
                    <Waves size={20} />
                  </div>
                  <div className="explore-feature-text">
                    <h3 className="explore-feature-title">
                      {isSomali ? 'Gacanka Cadmeed (Waqooyi)' : 'Northern Gulf of Aden'}
                    </h3>
                    <p className="explore-feature-desc">
                      {isSomali
                        ? 'Dekedda Boosaaso, buuraha Karkaar, iyo marinka socdaalka libaax-badeedka badda.'
                        : 'Bosaso deep port, coastal date palm groves, and nutrient-rich seasonal whale shark aggregation zones.'}
                    </p>
                  </div>
                </div>

                <div className="explore-feature-item">
                  <div className="explore-feature-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="explore-feature-text">
                    <h3 className="explore-feature-title">
                      {isSomali ? 'Geeska Bari & Dooxada Eyl' : 'Easternmost Horn & Eyl Coves'}
                    </h3>
                    <p className="explore-feature-desc">
                      {isSomali
                        ? 'Raas Xaafuun oo ah barta ugu fog bariga Afrika iyo dooxada dabiiciga ah ee Eyl.'
                        : 'Ras Hafun peninsula meeting oceanic swells, paired with limestone freshwater waterfalls in Eyl.'}
                    </p>
                  </div>
                </div>

                <div className="explore-feature-item">
                  <div className="explore-feature-icon">
                    <Anchor size={20} />
                  </div>
                  <div className="explore-feature-text">
                    <h3 className="explore-feature-title">
                      {isSomali ? 'Badweynta Hindiya (Koonfur)' : 'Southern Indian Ocean & Bajuni'}
                    </h3>
                    <p className="explore-feature-desc">
                      {isSomali
                        ? 'Jasiiradaha Baajuun, doonyaha dhowka ee dhaqanka, iyo qoolleyda cagaaran ee badda.'
                        : 'Untouched coral atolls, ancient Swahili-Somali maritime trade, and green sea turtle sanctuaries.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stylized Interactive Coastal Map Card */}
            <div className="explore-map-card">
              <img
                src="/images/image.png"
                alt="Stylized map of Somalia coastline"
                className="explore-map-img"
              />
              <div className="explore-map-badge">
                <MapPin size={14} color="#38bdf8" />
                <span>{isSomali ? 'Deegaannada Muhiimka Ah' : 'Coastal Navigation Hubs'}</span>
              </div>

              <Link
                to={localizedPath('/explore-the-coast/bosaso')}
                className="explore-map-pin explore-map-pin--bosaso"
              >
                <span>Boosaaso</span>
              </Link>

              <Link
                to={localizedPath('/explore-the-coast/hafun')}
                className="explore-map-pin explore-map-pin--hafun"
              >
                <span>Raas Xaafuun</span>
              </Link>

              <Link
                to={localizedPath('/explore-the-coast/eyl')}
                className="explore-map-pin explore-map-pin--eyl"
              >
                <span>Dooxada Eyl</span>
              </Link>

              <Link
                to={localizedPath('/explore-the-coast/mogadishu')}
                className="explore-map-pin explore-map-pin--mogadishu"
              >
                <span>Muqdisho</span>
              </Link>

              <Link
                to={localizedPath('/explore-the-coast/kismayo')}
                className="explore-map-pin explore-map-pin--bajuni"
              >
                <span>Baajuun</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Premier Marine Landscapes (3 Cards Grid, 120px Pause) */}
      <section className="explore-section explore-section--tint" aria-label="Coastal Regions Highlights">
        <div className="explore-container">
          <div className="explore-section-header">
            <span className="explore-eyebrow">
              {isSomali ? 'GOBALLADA BADDA' : 'REGIONAL WORLDS'}
            </span>
            <h2 className="explore-section-title">
              {isSomali ? (
                <>Deegaannada Ugu <span className="editorial-italic">Caansan Xeebaha</span></>
              ) : (
                <>Premier <span className="editorial-italic">Marine Landscapes</span></>
              )}
            </h2>
            <p className="explore-section-desc">
              {isSomali
                ? 'Xulashada saddexda gobol ee ugu waaweyn xeebaha Soomaaliya ee 3,330 km.'
                : 'Explore the three primary oceanic landscapes defining Somalia’s coastal paradise.'}
            </p>
          </div>

          <div className="explore-highlights-grid">
            {highlights.map((item, idx) => (
              <article key={idx} className="explore-highlight-card">
                <div className="explore-highlight-card__media">
                  <img src={item.image} alt={item.title} className="explore-highlight-card__img" />
                  <span className="explore-highlight-card__badge">{item.badge}</span>
                </div>
                <div className="explore-highlight-card__body">
                  <span className="explore-highlight-card__meta">{item.meta}</span>
                  <h3 className="explore-highlight-card__title">{item.title}</h3>
                  <p className="explore-highlight-card__excerpt">{item.excerpt}</p>
                  <Link to={localizedPath(item.link)} className="explore-highlight-card__link">
                    <span>{isSomali ? 'Sahami Deegaanka' : 'Explore Region'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Panorama Featured Spotlight Banner */}
      <section className="explore-panorama" aria-label="Featured Coastal Destination">
        <div className="explore-panorama__inner">
          <img
            key={currentFeatured.image}
            src={currentFeatured.image}
            alt={currentFeatured.title}
            className="explore-panorama__bg"
          />
          <div className="explore-panorama__overlay" />

          <div className="explore-panorama__content">
            <span className="explore-panorama__tag">{currentFeatured.tag}</span>
            <h3 className="explore-panorama__title">{currentFeatured.title}</h3>
            <p className="explore-panorama__desc">{currentFeatured.desc}</p>
            <Link to={localizedPath(currentFeatured.link)} className="explore-panorama__link">
              <span>{isSomali ? 'Sahami Deegaanka' : 'Explore Destination'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="explore-panorama__nav">
            <div className="explore-panorama__nav-dots">
              {featuredDestinations.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`explore-panorama__nav-dot ${idx === featuredIndex ? 'explore-panorama__nav-dot--active' : ''}`}
                  onClick={() => setFeaturedIndex(idx)}
                  aria-label={`Go to destination ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={prevFeatured}
              className="explore-panorama__nav-btn"
              aria-label="Previous destination"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="explore-panorama__nav-btn"
              aria-label="Next destination"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Destination Catalog (6 Editorial Cards, 120px Pause) */}
      <section className="explore-section" aria-label="All Destinations Catalog">
        <div className="explore-container">
          <div className="explore-section-header">
            <span className="explore-eyebrow">
              {isSomali ? 'DEEGAANNADA XEEBAHA' : 'DESTINATION DIRECTORY'}
            </span>
            <h2 className="explore-section-title">
              {isSomali ? (
                <>Dhammaan Goobaha <span className="editorial-italic">Xeebaha</span></>
              ) : (
                <>Somalia's Premier <span className="editorial-italic">Coastal Gems</span></>
              )}
            </h2>
            <p className="explore-section-desc">
              {isSomali
                ? 'Xulasho buuxda oo ah magaalooyinka, jasiiradaha, iyo deegaannada badda ee 3,330 km.'
                : 'Discover authentic maritime harbors, protected coral atolls, and historic seaside towns.'}
            </p>
          </div>

          <div className="explore-dest-grid">
            {destinations.map((dest, i) => (
              <Link
                key={i}
                to={localizedPath(dest.link)}
                className="explore-dest-card"
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="explore-dest-card__img"
                  loading="lazy"
                />
                <div className="explore-dest-card__overlay" />

                <div className="explore-dest-card__top">
                  <span className="explore-dest-card__region">{dest.region}</span>
                </div>

                <div className="explore-dest-card__content">
                  <div className="explore-dest-card__title-row">
                    <h3 className="explore-dest-card__title">{dest.title}</h3>
                    <ArrowRight size={16} className="explore-dest-card__arrow" />
                  </div>
                  <p className="explore-dest-card__desc">{dest.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="explore-center-row">
            <Link to={localizedPath('/explore-the-coast/bosaso')} className="editorial-btn-dark">
              <span>{isSomali ? 'Bilow Boosaaso (Puntland)' : 'Start with Bosaso Port'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Maritime Harbors & Ocean Stations (120px Pause) */}
      <section className="explore-section explore-section--tint" aria-label="Maritime Stations and Harbors">
        <div className="explore-container">
          <div className="explore-section-header">
            <span className="explore-eyebrow">
              {isSomali ? 'DEKADAHA & SALDHIGYADA' : 'MARITIME HARBORS'}
            </span>
            <h2 className="explore-section-title">
              {isSomali ? (
                <>Dekadaha & Xarumaha <span className="editorial-italic">Badda</span></>
              ) : (
                <>Key Harbors & <span className="editorial-italic">Maritime Hubs</span></>
              )}
            </h2>
            <p className="explore-section-desc">
              {isSomali
                ? 'Xarumaha muhiimka ah ee ganacsiga badda, badbaadada noolaha, iyo kormeerka xeebaha.'
                : 'Primary maritime stations and historical ports anchoring Somalia’s living coastline.'}
            </p>
          </div>

          <div className="explore-harbors-list">
            {harbors.map((harbor, idx) => (
              <div key={idx} className="explore-harbor-card">
                <div className="explore-harbor-card__media">
                  <img src={harbor.image} alt={harbor.title} className="explore-harbor-card__img" />
                </div>
                <div className="explore-harbor-card__info">
                  <h3 className="explore-harbor-card__title">{harbor.title}</h3>
                  <p className="explore-harbor-card__desc">{harbor.desc}</p>
                  <div className="explore-harbor-card__meta-row">
                    <span className="explore-harbor-card__meta-item">
                      <Calendar size={14} />
                      <span>{harbor.date}</span>
                    </span>
                    <span className="explore-harbor-card__meta-item">
                      <MapPin size={14} />
                      <span>{harbor.location}</span>
                    </span>
                  </div>
                </div>
                <div className="explore-harbor-card__side">
                  <div className="explore-harbor-card__zone">
                    <span>Zone: {harbor.code}</span>
                  </div>
                  <Link to={localizedPath(harbor.link)} className="explore-harbor-card__link">
                    <span>{isSomali ? 'Faahfaahin' : 'View Hub'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Coastline Chronicles Mosaic (#ExploreSomaliaCoast) */}
      <section className="explore-section" aria-label="Coast Visual Diaries">
        <div className="explore-container">
          <div className="explore-section-header">
            <span className="explore-eyebrow">
              <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
              #ExploreSomaliaCoast
            </span>
            <h2 className="explore-section-title">
              {isSomali ? (
                <>Xusuusaha Muuqaalka <span className="editorial-italic">Xeebaha</span></>
              ) : (
                <>Visual Coastline <span className="editorial-italic">Chronicles</span></>
              )}
            </h2>
            <p className="explore-section-desc">
              {isSomali
                ? 'Sawirro toos ah oo laga soo qaaday xeebaha Boosaaso, Baajuun, Xaafuun, iyo Eyl.'
                : 'Curated photography celebrating the living colors and untouched horizons of Somalia.'}
            </p>
          </div>

          <div className="explore-mosaic-grid">
            <div className="explore-mosaic-item">
              <img src="/images/image.png" alt="Somalia coastline aerial" />
            </div>
            <div className="explore-mosaic-item">
              <img src="/images/img_02.png" alt="Bosaso turquoise waters" />
            </div>
            <div className="explore-mosaic-item">
              <img src="/images/img_01.png" alt="Ras Hafun cliffs" />
            </div>
            <div className="explore-mosaic-item">
              <img src="/images/img_05.png" alt="Bajuni islands boat" />
            </div>
          </div>

          <div className="explore-center-row">
            <Link to={localizedPath('/experiences')} className="editorial-btn-dark">
              <Sparkles size={16} />
              <span>{isSomali ? 'Sahami Khibradaha Badda' : 'Discover Ocean Experiences'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Final Expedition CTA Banner */}
      <section className="explore-cta" aria-label="Explore Coast CTA">
        <img
          src="/images/image.png"
          alt="Sunset over Somalia coastline"
          className="explore-cta__bg"
        />
        <div className="explore-cta__overlay" />

        <div className="explore-cta__content">
          <h2 className="explore-cta__title">
            {isSomali ? (
              <>
                Diyaar Ma U Tahay Sahaminta <br />
                <span className="editorial-italic">Xeebaha Soomaaliya?</span>
              </>
            ) : (
              <>
                Ready to Explore Somalia's <br />
                <span className="editorial-italic">Living Coastline?</span>
              </>
            )}
          </h2>
          <p className="explore-cta__desc">
            {isSomali
              ? 'Ka baro wax badan oo ku saabsan goobaha ugu quruxda badan, jasiiradaha shacaabka, iyo dhaqanka badda ee 3,330 km.'
              : 'Experience untouched turquoise seas, ancient seafaring villages, and Africa’s longest coastal paradise.'}
          </p>
          <Link to={localizedPath('/explore-the-coast/bosaso')} className="explore-cta__btn">
            <span>{isSomali ? 'Bilow Sahaminta Hadda' : 'Begin Your Coastal Journey'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
