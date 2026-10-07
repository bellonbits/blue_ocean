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
  Fish,
  Leaf,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/portalDesignSystem.css';

export default function CoastalCommunitiesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = isSomali
      ? 'Bulshooyinka Xeebaha & Dhaxalka Badda — Blue Ocean Somalia'
      : 'Coastal Communities & Living Heritage — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredCommunities = [
    {
      tag: isSomali ? 'ISKAASHATADA TAARIIKHIGA AH' : 'HERITAGE COOPERATIVE',
      title: isSomali ? 'Kalluumeysatada Boosaaso & Dhow-dhiska' : 'Bosaso Harbor Artisanal Handline Guild',
      desc: isSomali
        ? 'Kooxo farsamo yaqaanno ah oo ku shaqeeya doonyaha gacanta lagu sameeyo, iyagoo ilaalinaya xeerarka kalluumaysiga ee soo jireenka ah ee Gacanka Cadmeed.'
        : 'Generational artisanal handline crews and master dhow shipwrights operating from northern Somalia’s busiest historical maritime gateway.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.png',
    },
    {
      tag: isSomali ? 'IILAHADA JASIIRADAHA' : 'ISLAND STEWARDS',
      title: isSomali ? 'Ilaaliyayaasha Jasiiradaha Baajuun' : 'Bajuni Archipelago Coral & Turtle Stewards',
      desc: isSomali
        ? 'Qoysaska ku nool jasiiradaha fog ee koonfurta oo qarniyo badan noolaa iyagoo dhowraya dhagaxleyda badda iyo goobaha ay ku dhashaan qoolleydu.'
        : 'Ancestral Swahili-Somali seafaring communities safeguarding remote coral lagoons, dugong pastures, and endangered green turtle rookeries.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.png',
    },
    {
      tag: isSomali ? 'DHALLINYARADA XEEBTA' : 'YOUTH RANGERS',
      title: isSomali ? 'Ilaaliyayaasha Ugxanta ee Raas Xaafuun' : 'Hafun Tombolo Youth Beach Patrols',
      desc: isSomali
        ? 'Dhallinyaro tababaran oo habeennadii ilaaliya xeebaha tombolo-ga ee Cirifka Xaafuun si ay uga badbaadiyaan ukunta qoolleyda halista.'
        : 'Local community youth conducting seasonal night beach patrols to ensure safe hatching and sea migration for endangered sea turtles on Africa’s eastern tip.',
      link: '/explore-the-coast/hafun',
      image: '/images/img_01.png',
    },
  ];

  const communitiesList = [
    {
      region: isSomali ? 'Puntland • Gacanka Cadmeed' : 'Puntland • Gulf of Aden',
      title: isSomali ? 'Iskaashatada Kalluumaysiga Boosaaso' : 'Bosaso Artisanal Fishing Guild',
      desc: isSomali
        ? 'Kalluumeysato dhaqameed adeegsata doonyaha yaryar oo si toos ah ula shaqeysa kormeerka libaax-badeedka iyo ilaalinta noolaha badda.'
        : 'Over 140 handline crews operating with fair-trade standards while reporting dolphin, whale shark, and pelagic species movements.',
      image: '/images/img_02.png',
      link: '/explore-the-coast/bosaso',
    },
    {
      region: isSomali ? 'Jubaland • Koonfurta' : 'Jubaland • Southern Atolls',
      title: isSomali ? 'Bulshada Jasiiradaha Baajuun' : 'Bajuni Seafarers & Island Keepers',
      desc: isSomali
        ? 'Khabiirrada doonyaha shiraaca, ilaalinta cawsduurka badda (seagrass), iyo xannaanada qoolleyda badda ee dhulka fog.'
        : 'Generational ocean navigators preserving ancient dhow sailing lore, seagrass meadows, and turtle conservation across coral archipelagos.',
      image: '/images/img_05.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      region: isSomali ? 'Bari • Bariga Fog' : 'Bari • Horn of Africa Tip',
      title: isSomali ? 'Ilaaliyayaasha Xeebta Xaafuun' : 'Hafun Youth Ocean Guardians',
      desc: isSomali
        ? 'Shabakad dhallinyaro ah oo kormeerta xeebaha ugu waaweyn ee qoolleydu ku ugxanto, barayana ardayda deegaanka ilaalinta badda.'
        : 'Youth network monitoring turtle nesting beaches, protecting coastal dunes, and delivering ocean education workshops in schools.',
      image: '/images/img_01.png',
      link: '/explore-the-coast/hafun',
    },
    {
      region: isSomali ? 'Nugaal • Badweynta Hindiya' : 'Nugaal • Indian Ocean',
      title: isSomali ? 'Odayaasha & Doon-dhismeedka Eyl' : 'Eyl Historic Maritime Artisans',
      desc: isSomali
        ? 'Farsamo-yaqaannada doonyaha qadiimiga ah ee dooxada Eyl, halkaas oo biyaha macaan iyo badweyntu isaga daraan.'
        : 'Keepers of ancient Indian Ocean trade memories, coastal gorge fishing traditions, and traditional timber watercraft fabrication.',
      image: '/images/img_03.png',
      link: '/explore-the-coast/eyl',
    },
    {
      region: isSomali ? 'Jubada Hoose' : 'Lower Juba',
      title: isSomali ? 'Ururka Haweenka Kismaayo' : "Kismayo Women's Fisheries Co-op",
      desc: isSomali
        ? 'Urur haween hoggaaminayaan oo beddelay qashinka kalluunka dakhli qoys, barayana bulshada nadaafadda iyo xisaabinta wax-soo-saarka.'
        : 'Women-led collective processing artisanal catch, eliminating post-harvest waste, and funding children’s schooling through sustainable trade.',
      image: '/images/img_12.png',
      link: '/explore-the-coast/kismayo',
    },
    {
      region: isSomali ? 'Banaadir • Xeebta Dhexe' : 'Banadir • Central Coastline',
      title: isSomali ? 'Isbahaysiga Ganacsiga Liido ee Muqdisho' : 'Lido Beachfront Stewardship Alliance',
      desc: isSomali
        ? 'Ganacsatada iyo dhalinyarada Liido oo si wadajir ah u maalgeliya nadaafadda xeebta, badbaadada dabaasha, iyo wacyiga badda.'
        : 'Beachfront cafes, local youth, and recreational clubs funding quarterly sand cleanups and marine litter monitoring along Mogadishu’s iconic shore.',
      image: '/images/image.png',
      link: '/explore-the-coast/mogadishu',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'AQOON DHAQAMEED' : 'TRADITIONAL KNOWLEDGE',
      title: isSomali ? 'Tilmaamaha Xiddigaha & Mawjadaha ee Odayaasha' : 'Star Navigation & Monsoon Wind Lore',
      meta: isSomali ? 'Diiwaanka Dhaqanka Badda • Eyl & Baajuun' : 'Oral Heritage Archive • Bajuni & Eyl',
      excerpt: isSomali
        ? 'Diiwaangelinta aqoonta qotada dheer ee odayaasha badda ee ku saabsan xilliyada dabaysha (Gu, Dayr, Xagaa) iyo marinnada kalluunka.'
        : 'Preserving centuried celestial navigation techniques and seasonal monsoon tidal observations passed down through oral maritime traditions.',
      image: '/images/img_12.png',
      link: '/communities',
    },
    {
      badge: isSomali ? 'IILASHADA NOOLAHA' : 'WILDLIFE PATROL',
      title: isSomali ? 'Ilaalinta Ugxanta Qoolleyda ee Xaafuun' : 'Community Green Turtle Nesting Patrols',
      meta: isSomali ? 'Dhallinyarada Deegaanka • Raas Xaafuun' : 'Community Rangers • Ras Hafun Tombolo',
      excerpt: isSomali
        ? 'Dhallinyarada deegaanka oo habeenkii ilaalisa xeebaha ciidda cad si qoolleyda dhasha ay si nabad ah ugu gaaraan mowjadaha badda.'
        : 'Local youth volunteering under the starlight to shepherd thousands of green and hawksbill turtle hatchlings into the open Indian Ocean.',
      image: '/images/img_01.png',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'ISKAASHIGA DIIWAANGALISAN' : 'FAIR FISHERIES',
      title: isSomali ? 'Kalluumaysiga Gacanta ee Boosaaso' : 'Zero-Waste Artisanal Handline Fleet',
      meta: isSomali ? 'Gacanka Cadmeed • Boosaaso' : 'Gulf of Aden • Bosaso Fishermen',
      excerpt: isSomali
        ? 'Nidaam cusub oo u oggolaanaya kalluumeysatada in aysan adeegsan shabaakado wax burburiya, iyadoo la dhowrayo hugaanta dhagaxleyda.'
        : 'Pioneering non-destructive hook-and-line harvesting protecting seafloor corals while delivering premium fresh catch to local markets.',
      image: '/images/img_02.png',
      link: '/research',
    },
  ];

  const communityStories = [
    {
      title: isSomali ? 'Sheekada Oday Xasan: 50 Sano oo Shiraac & Badweyn ah' : 'Captain Hassan: 50 Years Under Somali Dhow Canvas',
      desc: isSomali
        ? 'Oday Hassan wuxuu ka hadlayaa sida dabaylaha Monsoon-ka ay u hagayeen doonyaha ganacsiga ee u kala gooshi jiray Boosaaso, Seylac, iyo Baajuun.'
        : 'An elder navigator shares how generational wind readings, ocean swell echoes, and star paths carried Somali dhows across the Indian Ocean safely.',
      date: isSomali ? 'Kaydka Taariikhda Badda' : 'Oral Maritime Archive',
      location: isSomali ? 'Xeebaha Baajuun & Eyl' : 'Bajuni Islands & Eyl Gorge',
      status: isSomali ? 'Sheeko Dhaqameed' : 'Elder Archive',
      code: 'ORAL-01',
      image: '/images/img_12.png',
      link: '/communities',
    },
    {
      title: isSomali ? 'Habeennada Xaafuun: Badbaadinta 1,200 Qoolley oo Cusub' : 'Hafun Nights: Shielding 1,200 Hatchlings Along the Cape',
      desc: isSomali
        ? 'Kormeerayaasha dhallinyarada deegaanka oo sharxaya hawlgallada qabowga habeenkii ee lagu badbaadiyo goobaha ukun-dhigashada qoolleyda cagaaran.'
        : 'Youth guardians detail their midnight dune vigils protecting fragile nests from predators and tidal surges along mainland Africa’s eastern tip.',
      date: isSomali ? 'Xilliyeed Joogto ah' : 'Active Nesting Season',
      location: isSomali ? 'Raas Xaafuun, Bari' : 'Ras Hafun, Bari Region',
      status: isSomali ? 'Hawlgal Toos ah' : 'Active Patrol',
      code: 'PATROL-04',
      image: '/images/img_01.png',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Haweenka Kismaayo: Dakhli Qoys oo ka Yimid Farsamada Waarta' : "Kismayo Women's Cooperative: Sustainable Catch Processing",
      desc: isSomali
        ? 'Sida kooxdan haweenka ah ay u hirgeliyeen qallajinta cadceedda ee casriga ah, iyagoo yareeyay khasaaraha kalluunka boqolkiiba 40.'
        : 'How local women transformed coastal fish landings with solar drying tables and eco-packaging, slashing post-harvest loss by over 40 percent.',
      date: isSomali ? 'Mashruuc Guuleystay' : 'Co-op Milestone',
      location: isSomali ? 'Kismaayo, Jubada Hoose' : 'Kismayo, Lower Juba',
      status: isSomali ? 'Guul Bulsho' : 'Community Win',
      code: 'COOP-07',
      image: '/images/img_05.png',
      link: '/communities',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/explore-the-coast?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredCommunities.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredCommunities.length) % featuredCommunities.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredCommunities.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredCommunities.length]);

  const currentFeatured = featuredCommunities[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Somali Coastal Communities Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.png"
            alt="Somalia coastal community settlements and azure seas"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Compass size={14} />
              <span>{isSomali ? '3,330 KM OO XEEB AH • BULSHOOYINKA XEEBAHA' : '3,330 KM LIVING COASTLINE • MARITIME GUARDIANS'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Bulshooyinka Xeebaha & Dhaxalka Badda.' : 'Coastal Communities & Living Heritage.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Baro sheekooyinka, dhaqanka, iyo doorka muhiimka ah ee kalluumeysatada gacanta, odayaasha badda, iyo dhalinyarada ilaaliya xeebaha Soomaaliya.'
                : 'The living heart of our coastline: artisanal fishing families, generational boatbuilders, elder sea navigators, and youth stewards protecting Somalia’s marine paradise.'}
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
                      ? 'Raadi bulsho, marso, ama farsamo xeebed...'
                      : 'Search communities, fishing guilds, or coastal heritage...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search communities"
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
                onClick={() => navigate(localizedPath('/explore-the-coast/bosaso'))}
                className="portal-hero__tag-btn"
              >
                Kalluumeysatada Boosaaso
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
                Dhallinyarada Xaafuun
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/eyl'))}
                className="portal-hero__tag-btn"
              >
                Odayaasha Eyl
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/mogadishu'))}
                className="portal-hero__tag-btn"
              >
                Xeebta Liido
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Coastal Communities (2-Column Card Section) */}
      <section className="portal-card-section" aria-label="About Coastal Communities">
        <div className="portal-about-grid">
          {/* Left: Narrative + 3 Bullet Points with Circular Green Icons */}
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'BULSHADA & BADWEINTA' : 'PEOPLE OF THE LIVING SEA'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Ilaaliyayaasha Dhabta ah ee Badda Soomaaliya'
                : 'Custodians of Africa’s Longest Coastline'}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Bulshooyinka xeebaha Soomaaliya ma aha oo kaliya dad ku nool cidhifka biyaha — waa dadka kumanaanka sano dhowrayay deegaanka, baranayay socodka dabaylaha iyo xiddigaha, oo noloshoodu ku tiirsan tahay badweynta. Blue Ocean waxay aaminsan tahay in badbaadada badda ay ka bilaabato xoojinta dadkeeda.'
                : 'Somalia’s coastal communities are not merely shoreline residents — they are generational ocean guardians. For centuries, their artisanal knowledge of monsoon currents, reef nurseries, and ethical catch practices preserved our waters. Blue Ocean partners directly with coastal families to ensure conservation empowers local livelihoods.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Anchor size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Aqoonta Dhaqameed ee Badda' : 'Generational Maritime Lore & Navigation'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Odayaasha badda oo yaqaan xilliyada dabaylaha, xiddigaha, iyo marinnada kalluunka iyagoon wax khalkhal ah u geysan deegaanka.'
                      : 'Celestial navigation, seasonal wind reading (Dabaylaha Gu & Xagaa), and non-destructive handline harvesting.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Heart size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Doorka Haweenka ee Farsamada Badda' : 'Women-Led Coastal Value Cooperatives'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Haweenka oo hogaaminaya farsameynta kalluunka ee qasaaraha yar, daryeelka suuqyada maxalliga ah, iyo waxbarashada carruurta.'
                      : 'Zero-waste solar curing, seafood value-addition, and micro-savings programs securing resilient coastal households.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Users size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Dhallinyarada Ilaalisa Qoolleyda & Mangrove-ka' : 'Youth Guardians & Coastal Rangers'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Dhallinyarada deegaanka oo kormeera goobaha ukun-dhigashada qoolleyda badda iyo beeridda dhirta difaaca xeebaha.'
                      : 'Active beach patrols protecting endangered green turtle nests, planting mangroves, and mapping coral reef health.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stylized Interactive Coastal Map Card */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.png"
              alt="Coastal communities map across Somalia"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{isSomali ? 'Saldhigyada Bulshada' : 'Community Maritime Hubs'}</span>
            </div>

            <Link
              to={localizedPath('/explore-the-coast/bosaso')}
              className="portal-about__map-pin portal-about__map-pin--bosaso"
            >
              <span>Boosaaso Guild</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/hafun')}
              className="portal-about__map-pin portal-about__map-pin--hafun"
            >
              <span>Xaafuun Rangers</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/eyl')}
              className="portal-about__map-pin portal-about__map-pin--eyl"
            >
              <span>Eyl Dhow Masters</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/mogadishu')}
              className="portal-about__map-pin portal-about__map-pin--mogadishu"
            >
              <span>Liido Beach Alliance</span>
            </Link>

            <Link
              to={localizedPath('/explore-the-coast/kismayo')}
              className="portal-about__map-pin portal-about__map-pin--bajuni"
            >
              <span>Baajuun Stewards</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Latest Highlights (3-Card Rounded Container) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Community Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DADAALLADA BULSHADA' : 'COMMUNITY HIGHLIGHTS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Qorshayaasha & Guulaha Xeebaha' : 'Grassroots Coastal Stewardship Initiatives'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Wada-shaqeynta dhabta ah ee u dhaxeysa saynisyahannada Blue Ocean iyo bulshooyinka maxalliga ah.'
              : 'Direct collaborative programs joining marine scientific expertise with deep generational community wisdom.'}
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
      <section className="portal-panorama" aria-label="Featured Community Haven">
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
              <span>{isSomali ? 'Baro Bulshada' : 'Explore Community'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Navigation Arrows & Dots */}
          <div className="portal-panorama__nav">
            <div className="portal-panorama__nav-dots">
              {featuredCommunities.map((_, idx) => (
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
              aria-label="Previous community showcase"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next community showcase"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Communities Directory (6-Card Grid: 2 rows of 3) */}
      <section className="portal-card-section" aria-label="Communities Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DIIWAANKA BULSHOOYINKA' : 'COASTAL DIRECTORY'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Ururada & Shabakadaha Xeebaha' : "Somalia's Coastal Collectives & Guilds"}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Laga soo bilaabo marsooyinka qadiimiga ah ee Gacanka Cadmeed ilaa jasiiradaha koonfureed ee Badweynta Hindiya.'
              : 'Community-led associations maintaining living bonds with our ocean across all 3,330 km.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {communitiesList.map((comm, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={comm.image} alt={comm.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark community profile"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{comm.region}</span>
                <h3 className="portal-attraction-card__title">{comm.title}</h3>
                <p className="portal-attraction-card__desc">{comm.desc}</p>
                <Link to={localizedPath(comm.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Sahami Deegaanka' : 'View Hub'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan Goobaha Xeebaha' : 'Explore All Coastal Destinations'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Community Voices & Stories (Horizontal Cards) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Community Stories">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'SHEEKOOYIN DHAB AH' : 'COMMUNITY VOICES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Codadka & Xusuusaha Xeebaha' : 'Dispatches from Somalia’s Shoreline'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sheekooyin dhab ah oo laga soo xigtay odayaasha, kalluumeysatada, iyo dhalinyarada ilaaliya xeebteena.'
              : 'First-hand reflections and lived oral accounts from elder captains, fisher families, and youth patrols.'}
          </p>
        </div>

        <div className="portal-events-list">
          {communityStories.map((story, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={story.image} alt={story.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{story.title}</h3>
                <p className="portal-event-card__desc">{story.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{story.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{story.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Archive</span>
                  <span className="portal-event-card__status-val">{story.code}</span>
                </div>
                <Link to={localizedPath(story.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Akhri Sheekada' : 'Read Story'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #BlueHeavenCommunities Visual Photo Collage */}
      <section className="portal-card-section" aria-label="Visual Community Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #BlueHeavenCommunities
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Nolosha & Dhaqanka Xeebaha' : 'Living Heritage Along the Shore'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Muuqaallo dhab ah oo ka tarjumaya doonyaha dhaqanka, marsooyinka, iyo dadka ku xiran badweynta Soomaaliya.'
              : 'Authentic frames celebrating timeless boatcraft, fishing harbors, and generational ocean stewardship.'}
          </p>
        </div>

        {/* 4-Image Asymmetrical Mosaic */}
        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/exp_dhow_sailing.jpg" alt="Traditional Somali dhow under sail along the coast" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_02.png" alt="Bosaso harbor artisanal fishing vessels" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_01.png" alt="Ras Hafun tombolo beach community patrol grounds" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.png" alt="Bajuni islands coastal boat and pristine waters" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/experiences')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Baro Khibradaha Badda' : 'Experience Coastal Traditions'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Support Coastal Communities">
        <div className="portal-cta__inner">
          <img
            src="/images/image.png"
            alt="Golden sunset over the Somali coastline"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Garab Istaag Bulshooyinka Xeebaha Soomaaliya'
                : 'Stand with Somalia’s Coastal Guardians'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Nala shaqee si aan u horumarino nolosha kalluumeysatada, u ilaalino aqoonta dhaqanka, oo u dhowrno baddeena barakeysan.'
                : 'Partner with us to champion artisanal fishers, empower youth beach patrols, and preserve ancient maritime lore.'}
            </p>
            <Link to={localizedPath('/contact')} className="portal-btn-primary">
              <span>{isSomali ? 'Nala Soo Xiriir Hadda' : 'Partner with Us Today'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
