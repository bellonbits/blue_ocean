import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Fish,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PageHero from '../components/editorial/PageHero';
import '../styles/portalDesignSystem.css';

export default function MarineLifePage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [savedSpecies, setSavedSpecies] = useState({});

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const toggleSave = (e, title) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedSpecies((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    document.title = isSomali
      ? 'Nolosha Badda Soomaaliya — Somalia Blue Heaven Field Guide'
      : 'Marine Life of Somalia — Somalia Blue Heaven Field Guide';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredSpecies = [
    {
      tag: isSomali ? 'NOOLAHA WAAWEYN' : 'PELAGIC MEGAFAUNA',
      title: isSomali ? 'Libaax-Badeedka (Whale Shark) — Rhincodon typus' : 'Whale Shark (Libaax-Badeed) — Rhincodon typus',
      desc: isSomali
        ? 'Kalluunka ugu weyn dunida oo si xilliyeed ah u soo booqda biyaha diirran ee Gacanka Cadmeed ee Boosaaso si uu u helo nafaqada plankton-ka.'
        : 'The largest living fish species, gracefully migrating through the upwelling plankton-rich waters off Bosaso along the Gulf of Aden.',
      link: '/marine-life/whale-shark',
      image: '/images/img_02.webp',
    },
    {
      tag: isSomali ? 'QOOLLEYDA BADDA' : 'ANCIENT REPTILES',
      title: isSomali ? 'Qoolleyda Cagaaran ee Badda — Chelonia mydas' : 'Green Sea Turtle (Qoolleyda Badda) — Chelonia mydas',
      desc: isSomali
        ? 'Qoolleyda qadiimiga ah ee ku ukun-dhigata xeebaha cad-cad ee jasiiradaha Baajuun iyo Koonfurta Soomaaliya, oo si dhow loo ilaaliyo.'
        : 'Crucial southern nesting populations that return to the remote white sand dunes of the Bajuni Archipelago year after year.',
      link: '/marine-life/green-sea-turtle',
      image: '/images/img_10.webp',
    },
    {
      tag: isSomali ? 'DHAGAXLEYDA BADDA' : 'CORAL ARCHITECTURE',
      title: isSomali ? 'Dhagaxleyda Shacaabka — Barrier Reefs' : 'Coral Barrier Reef Ecosystems',
      desc: isSomali
        ? 'Kaymaha biyaha hoostooda ee guryaha u ah in ka badan 800 nooc oo kalluunka badda ah iyo noolaha yaryar ee Badweynta Hindiya.'
        : 'Living limestone architecture harboring nursery grounds for hundreds of reef fish species, moray eels, and crustaceans.',
      link: '/marine-life/coral-reefs',
      image: '/images/img_07.webp',
    },
  ];

  const speciesList = [
    {
      category: isSomali ? 'Kalluunka Waaweyn' : 'Megafauna',
      title: isSomali ? 'Libaax-Badeedka (Whale Shark)' : 'Whale Shark (Rhincodon typus)',
      desc: isSomali
        ? 'Xayawaan nabdoon oo dhererkiisu gaaro ilaa 12 mitir, kuna nool Gacanka Cadmeed.'
        : 'Gentle filter-feeders measuring up to 12 metres, migrating along northern waters.',
      image: '/images/img_02.webp',
      status: 'ENDANGERED',
      link: '/marine-life/species',
    },
    {
      category: isSomali ? 'Qoolleyda Badda' : 'Marine Reptiles',
      title: isSomali ? 'Qoolleyda Cagaaran (Green Turtle)' : 'Green Sea Turtle (Chelonia mydas)',
      desc: isSomali
        ? 'Ku nool daaqsinada cawska badda ee Baajuun iyo meelaha ukunta lagu aaso.'
        : 'Vital grazers of shallow seagrass meadows across the southern Bajuni atolls.',
      image: '/images/img_10.webp',
      status: 'PROTECTED',
      link: '/marine-life/species',
    },
    {
      category: isSomali ? 'Xayawaanka Ugaarsada' : 'Apex Predators',
      title: isSomali ? 'Kalluunka Shacaabka (Blacktip Shark)' : 'Blacktip Reef Shark',
      desc: isSomali
        ? 'Kalluun degdeg badan oo kormeera caafimaadka shacaabka badda ee gacanka.'
        : 'Agile shallow-water patrollers essential for balancing reef fish ecosystems.',
      image: '/images/img_11.webp',
      status: 'VULNERABLE',
      link: '/marine-life/species',
    },
    {
      category: isSomali ? 'Kalluunka Badweynta' : 'Pelagic Fish',
      title: isSomali ? 'Kalluunka Jeedaalka & Tuunada' : 'Yellowfin Tuna & Blue Marlin',
      desc: isSomali
        ? 'Kalluunka dheereeya ee marinka Badweynta Hindiya oo leh qiimo sare.'
        : 'High-speed open ocean predators navigating offshore Somali upwelling currents.',
      image: '/images/img_11.webp',
      status: 'NATIVE',
      link: '/marine-life/species',
    },
    {
      category: isSomali ? 'Dhagaxleyda Badda' : 'Corals',
      title: isSomali ? 'Shacaabka Badda ee Soomaaliya' : 'Somali Barrier Coral Reefs',
      desc: isSomali
        ? 'Guryaha dabiiciga ah ee kordhiya taranka kalluunka kana hortaga hirarka badda.'
        : 'Resilient coral formations buffering coastlines from erosion and providing fish nurseries.',
      image: '/images/img_07.webp',
      status: 'CRITICAL',
      link: '/marine-life/species',
    },
    {
      category: isSomali ? 'Xayawaanka Naasleyda' : 'Marine Mammals',
      title: isSomali ? 'Xuudka & Hoonbarka (Dolphins)' : 'Spinner Dolphins & Humpback Whales',
      desc: isSomali
        ? 'Naasleyda caqliga badan ee badda oo lagu arko xeebaha Puntland iyo Banaadir.'
        : 'Acrobatic pods patrolling coastal bays alongside seasonal humpback whale pods.',
      image: '/images/image.webp',
      status: 'PROTECTED',
      link: '/marine-life/species',
    },
  ];

  const highlights = [
    {
      badge: isSomali ? 'DIIWAANGELIN' : 'TAXONOMY',
      title: isSomali ? 'In Ka Badan 1,200 Nooc oo Badda Ah' : 'Over 1,200 Documented Marine Species',
      meta: isSomali ? 'Cilmi-Baarista Badda • 2026' : 'Somalia Marine Life Catalog • 2026',
      excerpt: isSomali
        ? 'Diiwaanka casriga ah ee noolaha badda Soomaaliya oo ay ku jiraan magacyada af-Soomaaliga iyo cilmiga.'
        : 'Comprehensive scientific library uniting Somali vernacular names and taxonomic classifications.',
      image: '/images/img_11.webp',
      link: '/marine-life/species',
    },
    {
      badge: isSomali ? 'ILAALINTA' : 'SANCTUARY',
      title: isSomali ? 'Dhowridda Meelaha Ukun-Dhigashada' : 'Protected Turtle Hatchery Sanctuaries',
      meta: isSomali ? 'Koonfurta Soomaaliya' : 'Southern Somalia Marine Reserves',
      excerpt: isSomali
        ? 'Barnaamijyo ay bulshadu hoggaaminayso oo badbaadiya boqolaal qoolleydii badda ee Baajuun.'
        : 'Community-led night patrols guarding nesting mothers and guiding hatchlings safely to sea.',
      image: '/images/img_10.webp',
      link: '/conservation',
    },
    {
      badge: isSomali ? 'CILMI-BAARIS' : 'RESEARCH',
      title: isSomali ? 'Dabagalka Libaax-Badeedka ee Gacanka' : 'Acoustic Whale Shark Migration Tagging',
      meta: isSomali ? 'Saldhigga Boosaaso' : 'Bosaso Ocean Research Station',
      excerpt: isSomali
        ? 'Isticmaalka sawirrada iyo calaamadaha casriga ah si loo fahmo socdaalka libaax-badeedka.'
        : 'Tracking regional connectivity and feeding patterns in collaboration with international oceanographers.',
      image: '/images/img_02.webp',
      link: '/research',
    },
  ];

  const initiatives = [
    {
      title: isSomali ? 'Kormeerka & Dhowridda Libaax-Badeedka' : 'Whale Shark Habitat Monitoring Program',
      desc: isSomali
        ? 'Diiwaangelinta xilliyada imaatinka libaax-badeedka Boosaaso iyo ilaalinta meelaha ay ku quutaan plankton-ka.'
        : 'Non-invasive acoustic telemetry and photographic ID cataloguing migratory whale sharks.',
      date: isSomali ? 'Barnaamij Sanadle Ah' : 'Year-Round Monitoring',
      location: isSomali ? 'Boosaaso, Puntland' : 'Bosaso Station, Puntland',
      status: isSomali ? 'Socda' : 'Active Fieldwork',
      code: 'BIO-01',
      image: '/images/img_02.webp',
      link: '/research',
    },
    {
      title: isSomali ? 'Ilaalinta Ukunta Qoolleyda Cagaaran' : 'Green Turtle Hatchery Patrol & DNA Study',
      desc: isSomali
        ? 'Dhalinyarada deegaanka oo la socda meelaha ay qoolleydu ku aasto ukunta si looga ilaaliyo ugaarsiga.'
        : 'Community rangers guarding turtle nests on Bajuni beaches and logging nesting health data.',
      date: isSomali ? 'Xilliga Taranka' : 'Nesting Season',
      location: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Archipelago',
      status: isSomali ? 'Ilaashan' : 'Protected',
      code: 'TUR-04',
      image: '/images/img_10.webp',
      link: '/conservation',
    },
    {
      title: isSomali ? 'Dib u Soo Celinta Shacaabka Badda' : 'Coral Reef Bleaching Resilience Network',
      desc: isSomali
        ? 'Baaritaanka noocyada shacaabka ee u adkaysta kulaylka biyaha iyo beeridda qaybo cusub oo shacaab ah.'
        : 'Deploying heat-tolerant coral micro-fragment nurseries in shallow lagoons across northern and southern waters.',
      date: isSomali ? 'Cilmi-Baaris Joogto Ah' : 'Ongoing Study',
      location: isSomali ? 'Seylac & Boosaaso' : 'Zeila & Bosaso Reeftops',
      status: isSomali ? 'Daraasad' : 'Research',
      code: 'COR-09',
      image: '/images/img_07.webp',
      link: '/research',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/marine-life/species?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredSpecies.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredSpecies.length) % featuredSpecies.length);
  };

  const currentFeatured = featuredSpecies[featuredIndex];

  const MARINE_LIFE_HERO_SPOTS = [
    {
      id: 'turtles',
      tag: isSomali ? 'QOOLLEY' : 'SEA TURTLES',
      year: isSomali ? 'ILAALIN' : 'ENDANGERED',
      title: isSomali ? 'Qoolleyda Badda ee Cagaaran' : 'Green & Hawksbill Sea Turtles',
      subtitle: isSomali ? 'Chelonia mydas & Eretmochelys' : 'Virgin Coral Atolls & Nesting Beaches',
      desc: isSomali
        ? 'Xeebaha Baajuun iyo jasiiradaha koonfureed waxay hoy u yihiin kumanaan qoolley oo badda ku nool oo ku tarma ciidda cad.'
        : 'Somalia’s tranquil barrier islands shelter critical nesting and foraging grounds for globally endangered green and hawksbill sea turtles.',
      link: '/marine-life/species',
      image: '/marine_turtles.webp',
      avatar: '/marine_turtles.webp',
      author: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Turtle Sanctuary',
      authorMeta: isSomali ? 'Ilaalinta Caalamiga ah • IUCN Red List' : 'IUCN Red List Protected • 1,200+ Nests Tracked',
    },
    {
      id: 'dolphins',
      tag: isSomali ? 'HOONBAR' : 'DOLPHINS',
      year: isSomali ? 'GACANKA' : 'PELAGIC',
      title: isSomali ? 'Hoonbarka Badda ee Baallayda ah' : 'Spinner & Bottlenose Dolphins',
      subtitle: isSomali ? 'Stenella longirostris' : 'Playful Pods Across the Somali Current',
      desc: isSomali
        ? 'Boqolaal hoonbar ah oo si wadajir ah u boodboodaya biyaha badweynta, iyagoo raacaya qulqulka biyaha nafaqada leh.'
        : 'Pods of hundreds of spinner dolphins inhabit the nutrient-rich upwelling waters of the Horn of Africa and Gulf of Aden.',
      link: '/marine-life/species',
      image: '/marine_dolphins.webp',
      avatar: '/marine_dolphins.webp',
      author: isSomali ? 'Gacanka Cadmeed & Badweynta' : 'Somali Pelagic Highway',
      authorMeta: isSomali ? 'Socdaalka Badda • Xilli Walba' : 'Pelagic Highway • Year-Round Resident Pods',
    },
    {
      id: 'sharks',
      tag: isSomali ? 'LIBAAX-BADEED' : 'WHALE SHARKS',
      year: isSomali ? 'BOOSAASO' : 'GULF OF ADEN',
      title: isSomali ? 'Libaax-Badeedka Weyn ee Boosaaso' : 'Gentle Giant Whale Sharks',
      subtitle: isSomali ? 'Rhincodon typus' : 'World’s Largest Living Fish Migrations',
      desc: isSomali
        ? 'Kalluunka ugu weyn caalamka oo si nabad ah ugu dabaasha biyaha deggan ee Boosaaso si uu u cuno plankton-ka hodanka ah.'
        : 'Reaching up to 12 meters, these gentle pelagic giants aggregate seasonally in the plankton-rich waters off Bosaso and Zeila.',
      link: '/marine-life/species',
      image: '/marine_sharks.webp',
      avatar: '/marine_sharks.webp',
      author: isSomali ? 'Xeebta Boosaaso' : 'Bosaso Deep Shelf',
      authorMeta: isSomali ? 'Gacanka Cadmeed • Nafaqada Badda' : 'Gulf of Aden Upwelling • Filter Feeders',
    },
    {
      id: 'coral',
      tag: isSomali ? 'SHACAAB' : 'CORAL REEFS',
      year: isSomali ? 'NOOLOY' : 'BIODIVERSITY',
      title: isSomali ? 'Shacaabka Biyaha Hoose ee Nool' : 'Living Coral Reefs & Barrier Atolls',
      subtitle: isSomali ? 'Acropora & Porites Gardens' : 'Thermally Resilient Red Sea & Somali Reefs',
      desc: isSomali
        ? 'Beero shacaab ah oo midabbo badan leh oo u adkaysta kulaylka badda, hoyna u ah kumanaan nooc oo noolaha badda ah.'
        : 'Remarkably resilient coral reefs thriving in warm waters, providing essential nursery habitat for hundreds of reef fish species.',
      link: '/marine-life/species',
      image: '/marine_coral.webp',
      avatar: '/marine_coral.webp',
      author: isSomali ? 'Dhagaxleyda Baajuun' : 'Bajuni Reef System',
      authorMeta: isSomali ? 'Deegaanka Shacaabka ee 3,330 KM' : 'Reef Biodiversity Hotspot • 300+ Corals',
    },
    {
      id: 'seagrass',
      tag: isSomali ? 'DAAQA BADDA' : 'SEAGRASS',
      year: isSomali ? 'KAARBOON' : 'BLUE CARBON',
      title: isSomali ? 'Daaqa Badda & Doofaarka Badda (Dugong)' : 'Seagrass Meadows & Dugong Sanctuaries',
      subtitle: isSomali ? 'Halodule & Thalassia Ecosystems' : 'Essential Blue Carbon Coastal Nurseries',
      desc: isSomali
        ? 'Meelo ballaaran oo cawska badda ah oo qabta kaarboonka, ilaalina siiya dugong-yada dhifka ah iyo kalluunka yaryar.'
        : 'Expansive intertidal seagrass meadows absorbing massive quantities of carbon while sustaining rare dugong populations.',
      link: '/marine-life/species',
      image: '/marine_seagrass.webp',
      avatar: '/marine_seagrass.webp',
      author: isSomali ? 'Xeebaha Koonfureed' : 'Southern Sheltered Inlets',
      authorMeta: isSomali ? 'Kaydka Kaarboonka Buluugga ah' : 'Critical Nursery & Blue Carbon Sink',
    },
    {
      id: 'boxfish',
      tag: isSomali ? 'KALLUUN' : 'REEF FISH',
      year: isSomali ? 'MIDABBO' : 'ENDEMIC',
      title: isSomali ? 'Kalluunka Shacaabka ee Midabbada Badan' : 'Tropical Reef Fish Biodiversity',
      subtitle: isSomali ? 'Ostraciidae & Chaetodontidae' : 'Endemic Species of the Western Indian Ocean',
      desc: isSomali
        ? 'Kumanaan nooc oo kalluun dhalaalaya ah oo ku dhex nool dhagaxleyda iyo godadka badda ee Soomaaliya.'
        : 'From ornate boxfish to vibrant butterflyfish, Somalia’s reef biomes exhibit high endemism and marine vibrancy.',
      link: '/marine-life/species',
      image: '/raja_boxfish.webp',
      avatar: '/raja_boxfish.webp',
      author: isSomali ? 'Xeebaha Shacaabka' : 'Horn of Africa Reefs',
      authorMeta: isSomali ? '1,200+ Nooc oo Noolaha Badda ah' : '1,200+ Documented Marine Species',
    },
  ];

  return (
    <div className="portal-page">
      {/* 1. Page Hero: Reference Inset Layout with Single Background Image */}
      <PageHero
        pageId="marine_life"
        image="/images/img_10.webp"
        titleTop={isSomali ? 'Baro Noolaha' : 'Encounter Rare'}
        titleHighlight={isSomali ? 'Badda' : 'Marine Life'}
        titleBottom={isSomali ? 'ee Soomaaliya' : 'In Living Seas'}
        desc={
          isSomali
            ? 'Diiwaanka cilmiyeed iyo ilaalinta noolaha badda ee 3,330 km — libaax-badeedyada, qoolleyda badda, iyo shacaabka hodanka ah.'
            : 'Scientific field guide and conservation atlas for over 1,200 documented marine species thriving across Africa’s longest coastline.'
        }
        primaryCta={{
          label: isSomali ? 'Diiwaanka Noolaha' : 'Explore Marine Life',
          path: '#all-species',
          icon: <ArrowRight size={17} />,
        }}
        cutout={{
          title: isSomali ? 'Raadi 1,200+ Nooc oo Noolaha Badda' : "Explore 1,200+ Marine Species",
          path: '#all-species',
          thumbnails: ['/images/img_09.webp', '/images/img_07.webp', '/images/img_01.webp'],
          info: isSomali
            ? 'Kala garo libaax-badeedyada, qoolleyda dabar-go’a ku dhow, iyo shacaabka u adkaysta kulaylka badda.'
            : 'Whale Sharks, Endangered Sea Turtles, Spinner Dolphins, And Thermally Resilient Coral Gardens.',
          rating: '1,200+',
          tagline: isSomali ? 'Nooc oo Noolaha Badda ah' : 'Documented Marine Species',
        }}
      />

      {/* 2. 2-Column About Marine Life */}
      <section className="portal-card-section" aria-label="Marine Biodiversity Overview">
        <div className="portal-about-grid">
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'DABEECADDA BADDA' : 'BIODIVERSITY ATLAS'}
            </span>
            <h2 className="portal-section-title">
              {isSomali
                ? 'Quruxda & Hodannimada Noolaha Badda'
                : "The Living Oceans of the Horn"}
            </h2>
            <p className="portal-about__body">
              {isSomali
                ? 'Badda Soomaaliya waxay leedahay mid ka mid ah nidaamyada dabiiciga ah ee ugu hodansan adduunka sababtoo ah biyaha nafaqada leh ee Gacanka Cadmeed iyo carwooyinka shacaabka ee Badweynta Hindiya. Waxaan dhowrnaa noolahaas dhifka ah ee taariikhiga ah.'
                : 'Where cold, nutrient-rich upwelling currents from the Somali Current meet warm equatorial coral reefs, a unique convergence occurs. Somalia Blue Heaven documents, catalogs, and safeguards these extraordinary marine populations alongside local maritime communities.'}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Fish size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? '1,200+ Nooc oo Diiwaangashan' : 'Over 1,200 Cataloged Species'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Laga bilaabo kalluunka yaryar ee shacaabka ilaa naasleyda waaweyn ee badda.'
                      : 'From microscopic bioluminescent plankton to migratory blue whales and pelagic sharks.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Kaymaha Shacaabka & Mangrove-ka' : 'Barrier Reefs & Mangrove Forests'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Goobo dabiici ah oo kobciya taranka kalluunka badda Soomaaliya.'
                      : 'Vital coastal nursery habitats supporting regional fisheries and shoreline stability.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Goobo Gaar Ah oo La Ilaaliyo' : 'Designated Marine Sanctuaries'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Ilaalinta libaax-badeedyada iyo qoolleyda badda si ay u sii noolaadaan.'
                      : 'Community-guarded safe havens ensuring species recovery and research transparency.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map card highlighting marine habitat zones */}
          <div className="portal-about__map-card">
            <img
              src="/images/image.webp"
              alt="Marine habitat zones of Somalia"
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#38bdf8" />
              <span>{isSomali ? 'Goobaha Noolaha' : 'Marine Habitat Zones'}</span>
            </div>

            <div
              className="portal-about__map-pin"
              style={{ top: '22%', right: '28%' }}
            >
              <span>Libaax-Badeed</span>
            </div>

            <div
              className="portal-about__map-pin"
              style={{ top: '48%', right: '24%' }}
            >
              <span>Shacaabka Eyl</span>
            </div>

            <div
              className="portal-about__map-pin"
              style={{ bottom: '18%', left: '22%' }}
            >
              <span>Qoolleyda Baajuun</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3-Card Highlights Grid */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Marine Highlights">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'XULASHO GAAR AH' : 'SPECIES SPOTLIGHT'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Noolaha Ugu Muhiimsan Badda' : 'Keystone Marine Species'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xayawaannada astanta u ah caafimaadka iyo mustaqbalka badda Soomaaliya.'
              : 'Crucial indicator species defining the health and vitality of our 3,330 km coastline.'}
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
                  <span>{isSomali ? 'Baro Noolahan' : 'Explore Species'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Panorama Featured Card with Floating White Card */}
      <section className="portal-panorama" aria-label="Featured Species Panorama">
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
              <span>{isSomali ? 'Eeg Xogta Buuxda' : 'View Species Profile'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous species"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next species"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 6-Card Species Directory Grid (2x3) */}
      <section id="all-species" className="portal-card-section" aria-label="Species Directory">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'DIIWAANKA NOOLAHA' : 'SPECIES DIRECTORY'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Hagaha Noolaha Badda' : 'Field Guide Species Directory'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xogta noocyada ugu caansan ee ku nool biyaha Soomaaliya oo leh heerka badbaadadooda.'
              : 'Browse verified marine species documented by Somalia Blue Heaven scientists and local rangers.'}
          </p>
        </div>

        {searchQuery && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600 }}>
              {isSomali ? 'Natiijada' : 'Results for'}: "{searchQuery}"
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: '#e0f2fe',
                color: '#0284c7',
                border: 'none',
                borderRadius: '12px',
                padding: '2px 10px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {isSomali ? 'Dib u celi' : 'Clear filter'}
            </button>
          </div>
        )}

        <div className="portal-attractions-grid">
          {(searchQuery
            ? speciesList.filter((sp) =>
                sp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sp.desc.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : speciesList
          ).map((sp, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={sp.image} alt={sp.title} className="portal-attraction-card__img" />
                <span className="portal-highlight-card__badge" style={{ position: 'absolute', top: 12, left: 12 }}>
                  {sp.status}
                </span>
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label={`Bookmark ${sp.title}`}
                  onClick={(e) => toggleSave(e, sp.title)}
                >
                  <Heart
                    size={16}
                    fill={savedSpecies[sp.title] ? '#ef4444' : 'none'}
                    color={savedSpecies[sp.title] ? '#ef4444' : '#64748b'}
                  />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{sp.category}</span>
                <h3 className="portal-attraction-card__title">{sp.title}</h3>
                <p className="portal-attraction-card__desc">{sp.desc}</p>
                <Link to={localizedPath(sp.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Faahfaahin' : 'Learn More'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/marine-life/species')} className="portal-btn-primary">
            <span>{isSomali ? 'Eeg Dhammaan 1,200+ Nooc' : 'Explore Full Species Library'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6. Horizontal Conservation Programs */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Marine Conservation Initiatives">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'CILMI-BAARIS & DHOOWRID' : 'CONSERVATION PROGRAMS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Hawlgallada Ilaalinta Noolaha' : 'Active Species Protection Initiatives'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Dadaallada socda ee lagu ilaalinayo noolaha badda ee nugul.'
              : 'Direct field interventions protecting endangered turtles, whale sharks, and living coral heads.'}
          </p>
        </div>

        <div className="portal-events-list">
          {initiatives.map((init, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={init.image} alt={init.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{init.title}</h3>
                <p className="portal-event-card__desc">{init.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Calendar size={14} color="#0ea5e9" />
                    <span>{init.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{init.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Project</span>
                  <span className="portal-event-card__status-val">{init.code}</span>
                </div>
                <Link to={localizedPath(init.link)} className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Faahfaahin' : 'View Initiative'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #SomaliaMarineLife Photo Diaries Mosaic */}
      <section className="portal-card-section" aria-label="Marine Life Diaries">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #SomaliaMarineLife
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Xusuusaha Noolaha Badda' : 'Living Marine Chronicles'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Sawirrada tooska ah ee noolaha badda ee lagu qabtay biyaha Soomaaliya.'
              : 'Underwater imagery captured by our scientific divers along the 3,330 km coastline.'}
          </p>
        </div>

        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Whale shark swimming" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_10.webp" alt="Green sea turtle swimming" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_07.webp" alt="Coral reef underwater" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_11.webp" alt="Blacktip reef shark" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/conservation')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Ka Qaybgal Ilaalinta Badda' : 'Join Marine Conservation'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Panoramic Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Marine Life CTA">
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
                ? 'Nala Ilaali Noolaha Badda Soomaaliya'
                : 'Help Us Protect Somalia’s Living Ocean'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Taageer cilmi-baarista iyo dhowridda shacaabka, libaax-badeedka, iyo qoolleyda badda ee 3,330 km.'
                : 'Support community-led conservation safeguarding 1,200+ marine species for future generations.'}
            </p>
            <Link to={localizedPath('/conservation')} className="portal-btn-primary">
              <span>{isSomali ? 'Ku Biir Hawsha Ilaalinta' : 'Join Our Conservation Mission'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
