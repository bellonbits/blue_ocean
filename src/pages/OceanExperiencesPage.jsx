import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Sailboat,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
  Anchor,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/portalDesignSystem.css';

export default function OceanExperiencesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Khibradaha Badda Soomaaliya — Somalia Blue Heaven'
      : 'Ocean Experiences — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredExperiences = [
    {
      tag: isSomali ? 'SOCDAAL GAAR AH' : 'SIGNATURE EXPEDITION',
      title: isSomali ? 'Raacidda Doonyaha Dhaqanka ee Baajuun' : 'Traditional Bajuni Dhow Ocean Sailing',
      desc: isSomali
        ? 'Safarka doonyaha dhowka ee qadiimiga ah ee dhex mara jasiiradaha Baajuun, biyaha buluugga ah, iyo carwooyinka shacaabka.'
        : 'Sail traditional handcrafted wooden dhows through the pristine coral atolls and turquoise lagoons of southern Somalia.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.webp',
    },
    {
      tag: isSomali ? 'NOOLAHA BADDA' : 'WILDLIFE SAFARI',
      title: isSomali ? 'Daawashada Libaax-Badeedka Boosaaso' : 'Gulf of Aden Whale Shark Snorkel Encounter',
      desc: isSomali
        ? 'Dabaasha agagaarka libaax-badeedka xilliga socdaalka ee biyaha deggan ee Gacanka Cadmeed iyadoo la raacayo shuruucda ilaalinta.'
        : 'Ethical, non-invasive snorkeling alongside gentle migrating whale sharks in the nutrient-rich coastal waters of Bosaso.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.webp',
    },
    {
      tag: isSomali ? 'BUURAHA & BADDA' : 'COASTAL TREK',
      title: isSomali ? 'Socdaalka Dooxada Eyl & Qalcadaha' : 'Dooxada Eyl Waterfall & Ocean Gorge Hike',
      desc: isSomali
        ? 'Lugaynta dooxada dabiiciga ah halka ay ku kulmaan ilaha biyaha macaan iyo baddu, oo ay ku yaallaan daarado qadiimi ah.'
        : 'Trek dramatic limestone canyons and palm groves where crystal freshwater waterfalls cascade directly into the Indian Ocean.',
      link: '/explore-the-coast/eyl',
      image: '/images/img_03.webp',
    },
  ];

  const experiences = [
    {
      category: isSomali ? 'Doonyaha Dhaqanka' : 'Dhow Sailing',
      title: isSomali ? 'Safarka Jasiiradaha Baajuun' : 'Bajuni Archipelago Island Voyage',
      desc: isSomali
        ? 'Sahami jasiirado carwo ah, biyo nadiif ah, iyo doonyaha shiraaca ee taariikhiga ah.'
        : 'Glide across mirror-still turquoise waters aboard traditional Swahili-Somali lateen-rigged dhows.',
      image: '/images/img_05.webp',
      link: '/explore-the-coast/kismayo',
    },
    {
      category: isSomali ? 'Daawashada Noolaha' : 'Marine Safari',
      title: isSomali ? 'Libaax-Badeedka Gacanka Cadmeed' : 'Whale Shark Coastal Encounter',
      desc: isSomali
        ? 'La dabaalo xayawaanka ugu weyn badda oo si deggan u dhex mushaaxaya biyaha Boosaaso.'
        : 'Join certified marine rangers for ethical observation of seasonal migratory whale sharks.',
      image: '/images/img_02.webp',
      link: '/explore-the-coast/bosaso',
    },
    {
      category: isSomali ? 'Badbaadada Qoolleyda' : 'Wildlife Patrol',
      title: isSomali ? 'Ilaalinta Ukun-dhigashada Qoolleyda' : 'Sea Turtle Night Hatching Patrol',
      desc: isSomali
        ? 'Ka qayb gal ilaalinta habeenkii ee qoolleyda cagaaran ee ukunta ku dhigta xeebaha Koonfurta.'
        : 'Participate in community-led conservation monitoring endangered green turtles along remote sands.',
      image: '/images/img_10.webp',
      link: '/conservation',
    },
    {
      category: isSomali ? 'Socodka & Buuraha' : 'Coastal Hike',
      title: isSomali ? 'Dooxada Eyl & Dhagaxyada Badda' : 'Eyl Ocean Gorge & Historic Trail',
      desc: isSomali
        ? 'Lug dabiici ah oo dhex marta dooxada webiga iyo badda, qalcadihii hore, iyo beero timireed.'
        : 'Explore freshwater spring pools, sheer coastal cliffs, and hundred-year-old stone fortresses.',
      image: '/images/img_03.webp',
      link: '/explore-the-coast/eyl',
    },
    {
      category: isSomali ? 'Dabaasha & Kayak' : 'Water Sports',
      title: isSomali ? 'Xeebta Liido & Qorrax-u-dhaca' : 'Lido Ocean Promenade & Kayak',
      desc: isSomali
        ? 'Kayak-gareynta biyaha diirran ee Muqdisho iyo daawashada qorrax-u-dhaca Badweynta Hindiya.'
        : 'Sunset ocean kayaking and vibrant coastal culture along Somalia’s iconic capital beachfront.',
      image: '/images/image.webp',
      link: '/explore-the-coast/mogadishu',
    },
    {
      category: isSomali ? 'Shacaabka Badda' : 'Reef Snorkeling',
      title: isSomali ? 'Shacaabka Jasiiradda Saacaddiin' : 'Zeila Coral Lagoon Exploration',
      desc: isSomali
        ? 'Daawashada hugaanta shacaabka ee biyaha gacanka iyo noocyada kalluunka ee kala duwan.'
        : 'Snorkel across shallow emerald flats and historical island ruins in the ancient Gulf of Aden.',
      image: '/images/img_07.webp',
      link: '/explore-the-coast/zeila',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'BADBAADADA' : 'SAFE TRAVEL',
      title: isSomali ? 'Hagayaal Khibrad Leh oo Deegaanka Ah' : 'Certified Local Coastal Guides',
      meta: isSomali ? 'Badbaadada Badda • 2026' : 'Maritime Safety Standards • 2026',
      excerpt: isSomali
        ? 'Dhammaan safarrada badda waxaa hoggaamiya khubaro iyo kalluumeysato yaqaanna dabaysha iyo xeebaha.'
        : 'All expeditions are accompanied by seasoned local fishermen and trained marine conservation rangers.',
      image: '/images/img_02.webp',
      link: '/explore-the-coast',
    },
    {
      badge: isSomali ? 'ILAALINTA DEEGAANKA' : 'ETHICAL CODE',
      title: isSomali ? 'Shuruucda Ilaalinta Noolaha Badda' : 'Wildlife Protection & No-Trace Code',
      meta: isSomali ? 'Ilaalinta Shacaabka' : 'Living Marine Sanctuaries',
      excerpt: isSomali
        ? 'Kuma taabano shacaabka, mana carqaladayno xayawaanka badda. Waxaan dhowrnaa nolosha dabiiciga ah.'
        : 'Strict minimum-distance guidelines protecting coral reefs, turtle nesting dunes, and whale sharks.',
      image: '/images/img_10.webp',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'DHAQANKA' : 'HERITAGE',
      title: isSomali ? 'Taariikhda Badda ee Soomaalida' : 'Centuries of Seafaring Maritime Culture',
      meta: isSomali ? 'Dhaqanka Xeebaha' : 'Swahili-Somali Seafaring',
      excerpt: isSomali
        ? 'Ka baro sida awoowayaashu u isticmaali jireen xiddigaha iyo dabaysha monsoon-ka socdaalka badda.'
        : 'Learn traditional celestial navigation, monsoon wind patterns, and the art of coastal storytelling.',
      image: '/images/img_05.webp',
      link: '/communities',
    },
  ];

  const guidelines = [
    {
      title: isSomali ? 'Ilaalinta Shacaabka & Biyaha Nadiifka Ah' : 'Coral Reef & Seagrass Sanctuary Code',
      desc: isSomali
        ? 'Waligaa ha ku istaagin shacaabka badda. Isticmaal maraakiibta doonyaha ee aan waxyeellayn hugaanta.'
        : 'Always maintain neutral buoyancy; never anchor directly on living barrier reefs or fragile seagrass flats.',
      date: isSomali ? 'Xeerka Badda' : 'Maritime Code',
      location: isSomali ? 'Dhammaan Xeebaha' : 'Coastline Wide',
      status: isSomali ? 'Qasab Ah' : 'Required',
      code: 'ETH-01',
      image: '/images/img_07.webp',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Xeerka U Dhowaanshaha Libaax-Badeedka' : 'Whale Shark Observation Distances',
      desc: isSomali
        ? 'U dhowow ugu yaraan 3 mitir madaxa iyo 4 mitir dabada. Ha isticmaalin iftiinka tooska ah ee sawirka.'
        : 'Keep a 3-metre clearance from the head and 4 metres from the tail; no flash photography or touching.',
      date: isSomali ? 'Xilliga Socdaalka' : 'Migration Season',
      location: isSomali ? 'Boosaaso & Gacanka' : 'Bosaso & Gulf',
      status: isSomali ? 'Ilaalin' : 'Protected',
      code: 'WS-02',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      title: isSomali ? 'Badbaadada Habeenkii ee Qoolleyda Badda' : 'Sea Turtle Nesting Beach Protocols',
      desc: isSomali
        ? 'Ha isticmaalin iftiinka cad xeebta habeenkii si aadan u baqin qoolleyda ukun-dhigashada ku jirta.'
        : 'Use only red-filtered flashlights during night patrols to avoid disorienting nesting mother turtles and hatchlings.',
      date: isSomali ? 'Sannad Kasta' : 'Year-Round',
      location: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Atolls',
      status: isSomali ? 'Tabarruc' : 'Patrol',
      code: 'TT-03',
      image: '/images/img_10.webp',
      link: '/conservation',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = experiences.find((exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) navigate(localizedPath(match.link));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredExperiences.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredExperiences.length) % featuredExperiences.length);
  };

  const currentFeatured = featuredExperiences[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Ocean Experiences Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.webp"
            alt="Ocean adventures along Somalia's coast"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Compass size={14} />
              <span>{isSomali ? 'KHIBRADAHA BADDA · 3,330 KM' : 'OCEAN EXPERIENCES · 3,330 KM'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? (
                <>
                  Khibradaha Badda <br />
                  <span className="editorial-hero__title-italic">ee Soomaaliya.</span>
                </>
              ) : (
                <>
                  Ocean Experiences & <br />
                  <span className="editorial-hero__title-italic">Expeditions.</span>
                </>
              )}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Safarka doonyaha shiraaca ee dhowka, dabaasha libaax-badeedka, iyo ilaalinta qoolleyda badda ee xeebaha 3,330 km.'
                : 'Authentic coastal adventures, traditional dhow sailing, and ethical marine wildlife encounters along Africa’s longest coastline.'}
            </p>

            {/* Inset Search Widget */}
            <div className="portal-hero__search-wrap">
              <form onSubmit={handleSearch} className="portal-hero__search-form">
                <Search size={18} className="portal-hero__search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSomali
                      ? 'Raadi doon, libaax-badeed, quusin, ama buuro...'
                      : 'Search sailing, whale sharks, diving, or hiking...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search ocean experiences"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Explore Experiences'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Tags */}
            <div className="portal-hero__tags">
              <Link to={localizedPath('/explore-the-coast/kismayo')} className="portal-hero__tag-btn">
                {isSomali ? 'Doonyaha Baajuun' : 'Bajuni Dhow Sailing'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/bosaso')} className="portal-hero__tag-btn">
                {isSomali ? 'Libaax-Badeedka' : 'Whale Shark Encounter'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/eyl')} className="portal-hero__tag-btn">
                {isSomali ? 'Dooxada Eyl Hike' : 'Eyl Waterfall Trek'}
              </Link>
              <Link to={localizedPath('/explore-the-coast/mogadishu')} className="portal-hero__tag-btn">
                {isSomali ? 'Xeebta Liido' : 'Lido Ocean Surf'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2-Column About Experiences */}
      <section className="portal-card-section" aria-label="Experiences Overview">
        <div className="portal-about-grid">
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'SAFARRO DABIICI AH' : 'COASTAL EXPEDITIONS'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Khibrado Biyood oo Aan La Ilaawi Karin'
                : 'Living Coastal Expeditions'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Badda Soomaaliya ma aha oo kaliya biyo qurux badan — waa meel ay ku nool yihiin xayawaanno dhif ah, dhaqan qadiimi ah oo doonyaha ah, iyo jasiirado carwo ah oo aan weli dunidu arag. Ka qayb gal safarro anshax leh oo lagu dhowrayo deegaanka.'
                : 'Somalia’s coastline is a realm of active discovery — where you can sail wooden dhows alongside spinner dolphins, snorkel beside migrating whale sharks, and trek limestone canyons spilling into cobalt seas under the guidance of native seafarers.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Sailboat size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Doonyaha Dhaqanka ee Dhowka' : 'Traditional Dhow Seafaring'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Socdaal nabdoon oo dhex mara jasiiradaha Baajuun iyo gacanka Seylac.'
                      : 'Silent, wind-powered voyages across coral lagoons respecting marine tranquility.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'La Kulanka Noolaha Badda' : 'Ethical Wildlife Encounters'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Libaax-badeedka, qoolleyda badda, iyo hugaanta shacaabka oo aan waxyeello loo geysan.'
                      : 'Non-invasive, certified ranger-guided snorkeling with whale sharks and sea turtles.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Taageeridda Bulshada Xeebaha' : 'Community Maritime Support'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Safarrada oo toos u xoojiya kalluumeysatada iyo dhalinyarada deegaanka.'
                      : 'Every expedition directly benefits artisanal coastal families and marine conservation.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map card highlighting experience hubs */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.webp"
              alt="Coastal adventure hubs across Somalia"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#38bdf8" />
              <span>{isSomali ? 'Xarumaha Khibradaha' : 'Adventure Hubs'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Raas Xaafuun</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>Dooxada Eyl</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>Baajuun</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 3-Card Highlights Grid */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Experience Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'XULASHO GAAR AH' : 'FEATURED ADVENTURES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Khibradaha Ugu Caansan Badda' : 'Premier Marine Adventures'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada khibradaha ugu xiisaha badan ee laga helo xeebaha Soomaaliya ee 3,330 km.'
              : 'Handpicked ocean journeys celebrating ethical adventure and authentic maritime heritage.'}
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
      <section className="portal-panorama" aria-label="Featured Experience Spotlight">
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
              <span>{isSomali ? 'Sahami Khibradda' : 'Explore Experience'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous experience"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next experience"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 6-Card Experiences Grid (2x3) */}
      <section className="portal-card-section" aria-label="Experiences Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DHAMMAAN KHIBRADAHA' : 'EXPERIENCES CATALOG'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Khibradaha Badda ee Soomaaliya' : 'All Ocean Experiences'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Ka baro wax badan oo ku saabsan dhammaan hawlaha badda ee laga heli karo xeebaha 3,330 km.'
              : 'Every sustainable maritime activity, wildlife encounter, and cultural voyage along our coast.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {experiences.map((exp, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={exp.image} alt={exp.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark experience"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{exp.category}</span>
                <h3 className="portal-attraction-card__title">{exp.title}</h3>
                <p className="portal-attraction-card__desc">{exp.desc}</p>
                <Link to={localizedPath(exp.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Sahami Hadda' : 'Discover More'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Goobaha Xeebaha' : 'View Coastal Havens'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Horizontal Guidelines & Safety Codes */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Guidelines and Safety Codes">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'BADBAADADA & DHOOVRIDDA' : 'RESPONSIBLE TOURISM'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Shuruucda Ilaalinta Badda' : 'Ethical Wildlife & Safety Guidelines'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sida loo dhowro xayawaanka badda iyo shacaabka marka la guda galo safarrada badda.'
              : 'Our strict operational standards safeguarding Somalia’s marine ecosystems and visitors alike.'}
          </p>
        </div>

        <div className="portal-events-list">
          {guidelines.map((guide, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={guide.image} alt={guide.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{guide.title}</h3>
                <p className="portal-event-card__desc">{guide.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{guide.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{guide.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Code</span>
                  <span className="portal-event-card__status-val">{guide.code}</span>
                </div>
                <Link to={localizedPath(guide.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Xeerka' : 'View Code'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #SomaliaOceanAdventures Photo Diaries Mosaic */}
      <section className="portal-card-section" aria-label="Ocean Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #SomaliaOceanAdventures
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Xusuusaha Khibradaha Badda' : 'Ocean Adventure Chronicles'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirrada safarrada shiraaca, quusitaanka shacaabka, iyo socodka buuraha xeebaha.'
              : 'Visual chronicles from traditional dhow passages and pristine reef dives.'}
          </p>
        </div>

        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/image.webp" alt="Somali ocean horizon" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.webp" alt="Bajuni dhow sailing" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Bosaso coastline" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_03.webp" alt="Eyl coastal waterfall" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Sahami Goobaha Xeebaha' : 'Explore Coastal Destinations'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Panoramic Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Experiences CTA">
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
                ? 'Diyaar Ma U Tahay Khibradaha Badda Soomaaliya?'
                : "Ready for Somalia's Ocean Experiences?"}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Doonyaha dhowka ee dhaqanka, libaax-badeedka, iyo biyo buluugga ah ee aan la taaban ayaa ku sugaya.'
                : 'Pristine turquoise waters, ancient seafaring wisdom, and living marine sanctuaries await your journey.'}
            </p>
            <Link to={localizedPath('/explore-the-coast/kismayo')} className="portal-btn-primary">
              <span>{isSomali ? 'Bilow Safarka Hadda' : 'Plan Your Journey'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
