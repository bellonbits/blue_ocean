// =========================================================
// Ocean Experiences Data Model & Discovery Library
// Blue Ocean Somalia — Sprint 5: Ocean Experiences
//
// All experiences ship with status: 'coming-soon' at launch —
// this is a discovery platform for future ocean activities,
// not a live booking system. Update `status` per experience
// as Blue Ocean operationalizes each activity.
//
// i18n note: each translatable record carries a `translations.so`
// block with only the Somali overrides for that record (see
// ../lib/i18n/localizeData.js for merge semantics). Gallery captions
// are translated via `translations.so.galleryCaptions`, an array of
// strings in the same order as `gallery` — `localizeExperience()`
// below zips them back onto the gallery entries so consumers keep
// reading `exp.gallery[i].caption` unchanged.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList, getSpeciesBySlug } from './marineLife.js';
import { localize, localizeList } from '../lib/i18n/localizeData.js';

export const EXPERIENCE_STATUSES = {
  'coming-soon': {
    label: 'Coming Soon',
    description: 'Planned for the Somali coast — not yet operating.',
    translations: {
      so: {
        label: 'Dhawaan',
        description: 'Waxaa loogu talagalay xeebta Soomaaliyeed — wali lama shaqaynayo.',
      },
    },
  },
  'available': {
    label: 'Available',
    description: 'Currently operating and open to visitors.',
    translations: {
      so: {
        label: 'La Heli Karo',
        description: 'Hadda waa la shaqeynayaa oo waa u furan yahay booqdayaasha.',
      },
    },
  },
  'seasonal': {
    label: 'Seasonal',
    description: 'Operates only during a specific seasonal window.',
    translations: {
      so: {
        label: 'Xilliyeed',
        description: 'Wuxuu shaqeeyaa xilli gaar ah oo kaliya.',
      },
    },
  },
  'unavailable': {
    label: 'Unavailable',
    description: 'Currently paused or not operating.',
    translations: {
      so: {
        label: 'Lama Heli Karo',
        description: 'Hadda waa la joojiyay ama lama shaqeynayo.',
      },
    },
  },
};

export const experienceCategories = [
  {
    id: 'boat-tours',
    slug: 'boat-tours',
    title: 'Boat Tours',
    tagline: 'See the coast from the water.',
    description: 'Traditional dhow voyages and coastal cruises along Somalia’s harbors, headlands, and hidden coves.',
    icon: 'Ship',
    image: '/exp_dhow_sailing.jpg',
    translations: {
      so: {
        title: 'Dalxiisyada Doonta',
        tagline: 'Xeebta ka arag bad dusheeda.',
        description: 'Safar dhaqameed oo doon alwaax ah (dhow) ah iyo dalxiisyo xeebeed oo maraya deked, ras xeebeed, iyo qolof qarsoon oo ku yaal xeebaha Soomaaliya.',
      },
    },
  },
  {
    id: 'snorkeling',
    slug: 'snorkeling',
    title: 'Snorkeling',
    tagline: 'Discover life beneath the surface.',
    description: 'Shallow reef-top exploration above vibrant coral gardens and sheltered lagoons.',
    icon: 'Wind',
    image: '/exp_coral_snorkeling.jpg',
    translations: {
      so: {
        title: 'Dabbaasha Murjaanka',
        tagline: 'Ogow nolosha ku jirta badda hoosteeda.',
        description: 'Sahamin fudud oo lagu maro dusha murjaanka ee beeraha murjaanka dhalaalaya iyo harooyinka ilaalinta leh.',
      },
    },
  },
  {
    id: 'diving',
    slug: 'diving',
    title: 'Diving',
    tagline: 'Go deeper.',
    description: 'Scuba expeditions into largely unexplored reef drop-offs and deep pelagic corridors.',
    icon: 'Waves',
    image: '/exp_scuba_diving.jpg',
    translations: {
      so: {
        title: 'Dhex-quusidda',
        tagline: 'U gudub meel ka sii dheer.',
        description: 'Safaro quusid (scuba) oo loo maro qarka murjaanka aan wali si buuxda loo sahamin iyo waddooyinka badda dheer ee xayawaanka badweynta.',
      },
    },
  },
  {
    id: 'fishing',
    slug: 'fishing',
    title: 'Fishing',
    tagline: 'Experience the traditions of the coast.',
    description: 'Traditional handline and reef fishing alongside veteran Somali fishing cooperatives.',
    icon: 'Fish',
    image: '/marine_fish.jpg',
    translations: {
      so: {
        title: 'Kalluumeysiga',
        tagline: 'La kulan dhaqamada xeebta.',
        description: 'Kalluumeysiga dhaqameed ee gacanta iyo qolofka murjaanka, oo lala socdo ururada kalluumeystayaasha Soomaaliyeed ee waayeelka ah.',
      },
    },
  },
  {
    id: 'island-exploration',
    slug: 'island-exploration',
    title: 'Island Exploration',
    tagline: 'Find the islands beyond the shore.',
    description: 'Multi-day expeditions into remote archipelagos, atolls, and untouched sandbars.',
    icon: 'Globe',
    image: '/jubaland.jpg',
    translations: {
      so: {
        title: 'Sahaminta Jasiiradaha',
        tagline: 'Hel jasiiradaha xeebta ka baxsan.',
        description: 'Safarro dhowr maalmood ah oo loo maro jasiiradaha fog, cirifyada, iyo ciidda cad ee aan la taaban.',
      },
    },
  },
  {
    id: 'dolphin-watching',
    slug: 'dolphin-watching',
    title: 'Dolphin & Whale Watching',
    tagline: 'Witness giants of the deep.',
    description: 'Guided sightings of spinner dolphin pods and migrating humpback whales.',
    icon: 'Anchor',
    image: '/marine_dolphins.jpg',
    translations: {
      so: {
        title: 'Daawashada Dhurwaaga iyo Nibiriga',
        tagline: 'Arag waxyaalaha waaweyn ee badda hoosteeda.',
        description: 'Daawasho la hagayo oo lagu arko qolooyinka dhurwaaga la yaqaan iyo nibiriyada guuraya ee humpback-ka.',
      },
    },
  },
  {
    id: 'marine-photography',
    slug: 'marine-photography',
    title: 'Marine Photography',
    tagline: 'Capture the unseen coast.',
    description: 'Guided underwater and aerial expeditions documenting Somalia’s marine frontier.',
    icon: 'Camera',
    image: '/marine_coral.jpg',
    translations: {
      so: {
        title: 'Sawir-qaadista Badda',
        tagline: 'Qabo waxa aan la arki karin ee xeebta.',
        description: 'Safarro la hagayo oo hoos badda iyo hawada sare laga sawiro, kuwaas oo diiwaan gelinaya xuduudka badweynta Soomaaliya.',
      },
    },
  },
  {
    id: 'coastal-trekking',
    slug: 'coastal-trekking',
    title: 'Coastal Trekking',
    tagline: 'Walk the edge of the continent.',
    description: 'Cliffside and canyon treks along Somalia’s dramatic limestone and sandstone coastline.',
    icon: 'Mountain',
    image: '/exp_coastal_cliff.jpg',
    translations: {
      so: {
        title: 'Socodka Qarka Xeebta',
        tagline: 'Ku soco cidhifka qaaradda.',
        description: 'Socodyo lagu maro qarka dhagaxa nooca limestone iyo sandstone ee xeebta Soomaaliya oo la yaabid leh.',
      },
    },
  },
];

// Raw experience records — cross-links reference slugs resolved below.
const rawExperiences = [
  {
    id: 'boat-tours',
    slug: 'boat-tours',
    title: 'Dhow Boat Tours',
    category: 'boat-tours',
    status: 'coming-soon',
    tagline: 'See the coast from the water.',
    shortDescription: 'Explore Somalia’s historic shoreline aboard traditional handcrafted wooden dhow vessels.',
    story: {
      whatItIs: 'A guided coastal voyage aboard a traditional Somali dhow — the same handcrafted wooden vessels that have carried merchants, fishermen, and travelers along the Horn of Africa for centuries.',
      whereItHappens: 'Departing from working harbors like Bosaso, dhow tours trace the shoreline past coral-stone forts, fishing fleets, and open pelagic waters.',
      whatToExpect: 'Calm-water sailing, close encounters with resident dolphin pods, and conversation with the dhow builders and crews who keep this maritime heritage alive.',
    },
    region: 'Puntland',
    location: 'Bosaso Harbor',
    duration: 'Full Day',
    difficulty: 'Easy — All Ages',
    bestSeason: 'October – April',
    heroImage: '/exp_dhow_sailing.jpg',
    gallery: [
      { url: '/exp_dhow_sailing.jpg', caption: 'Traditional dhow under sail off the Bosaso coastline.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso harbor, home port for coastal dhow voyages.' },
      { url: '/marine_dolphins.jpg', caption: 'Resident dolphin pods often accompany dhow crossings.' },
    ],
    highlights: [
      'Sail aboard a handcrafted wooden dhow',
      'Pass historic coral-stone fortifications',
      'Meet artisan dhow builders and maritime crews',
      'Frequent dolphin sightings along the route',
    ],
    destinationSlugs: ['bosaso', 'kismayo', 'mogadishu'],
    marineSpeciesSlugs: ['bottlenose-dolphin', 'yellowfin-tuna'],
    conservationThemes: [
      'Supports traditional dhow builders and heritage maritime craft',
      'Zero-wake, low-speed boating near coastal wildlife',
      'Pack-in, pack-out — no waste left on the water',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Dalxiisyada Doonta Dhow',
        tagline: 'Xeebta ka arag bad dusheeda.',
        shortDescription: 'Sahamin xeebta taariikhiga ah ee Soomaaliya adigoo saaran doon alwaax ah oo dhaqameed.',
        story: {
          whatItIs: 'Safar xeebeed oo la hagayo oo saaran doon dhaqameed Soomaaliyeed—dhow—kuwaas oo ah markabyada alwaax ee gacanta lagu sameeyay ee qarniyo badan xambaarsanaa ganacsato, kalluumeystayaal, iyo socotooyin ku dhex maraya Geeska Afrika.',
          whereItHappens: 'Ka bilaabma deked shaqo leh sida Boosaaso, dalxiisyada doonta waxay raacaan xeebta oo maraya qalcado dhagax murjaan ah, kalluumeysatada, iyo biyaha badweynta oo furan.',
          whatToExpect: 'Dabbaal biyo deggan, la kulanka dhow ee qolooyinka dhurwaaga deggan, iyo wada-hadal la sameeyo dhisayaasha doonta iyo shaqaalaha badda ee ilaalinaya dhaqankan badweynta.',
        },
        region: 'Puntland',
        location: 'Deked Boosaaso',
        duration: 'Maalin Dhan',
        difficulty: 'Fudud — Dhammaan Da\'da',
        bestSeason: 'Oktoobar – Abriil',
        galleryCaptions: [
          'Doon dhaqameed oo shiraacyadeeda kacsan oo ku socota xeebta Boosaaso.',
          'Deked Boosaaso, saldhigga guriga ee safarrada doonta xeebta.',
          'Qolooyinka dhurwaaga deggan ayaa inta badan raaca gudubka doonta.',
        ],
        highlights: [
          'Ku dabbaal doon alwaax ah oo gacanta lagu sameeyay',
          'Ka soo gudub qalcado taariikhi ah oo dhagax murjaan ah',
          'La kulan dhisayaasha doonta iyo shaqaalaha badda ee farsamada leh',
          'Arag dhurwaag inta badan jidka oo dhan',
        ],
        conservationThemes: [
          'Taageerid dhisayaasha doonta dhaqameed iyo farsamada dhaxalka badweynta',
          'Dabbaal xawaare hooseeya oo aan dhib u gaysan xayawaanka xeebta',
          'Wax la keeno, wax la qaado — biyaha lagama tagayo qashin',
        ],
      },
    },
  },
  {
    id: 'snorkeling',
    slug: 'snorkeling',
    title: 'Coral Garden Snorkeling',
    category: 'snorkeling',
    status: 'coming-soon',
    tagline: 'Discover life beneath the surface.',
    shortDescription: 'Snorkel above intact coral reefs teeming with parrotfish, rays, and vibrant biodiversity.',
    story: {
      whatItIs: 'A shallow-water snorkeling excursion over some of the Western Indian Ocean’s most intact coral gardens.',
      whereItHappens: 'The sheltered lagoons and outer reef flats of the Bajuni Atolls, with calm, high-visibility water for much of the season.',
      whatToExpect: 'Reef-top swims among branching and table coral, giant clams, and reef fish, guided by local snorkel leaders trained in reef-safe practices.',
    },
    region: 'Jubaland',
    location: 'Bajuni Atolls',
    duration: 'Half Day',
    difficulty: 'Easy — Beginner Friendly',
    bestSeason: 'November – March',
    heroImage: '/exp_coral_snorkeling.jpg',
    gallery: [
      { url: '/exp_coral_snorkeling.jpg', caption: 'Snorkeler above a shallow coral garden in the Bajuni Atolls.' },
      { url: '/marine_coral.jpg', caption: 'Branching and table coral formations near the reef crest.' },
      { url: '/jubaland.jpg', caption: 'The sheltered lagoons of the Jubaland archipelago.' },
    ],
    highlights: [
      'Shallow, calm-water reef access',
      'Guided by reef-safe snorkel leaders',
      'Giant clams and reef fish at arm’s length',
      'Beginner-friendly, no certification required',
    ],
    destinationSlugs: ['bajuni-islands', 'kismayo', 'qandala'],
    marineSpeciesSlugs: ['acropora-coral', 'giant-clam', 'hawksbill-turtle'],
    conservationThemes: [
      'No-touch reef etiquette to protect fragile coral polyps',
      'Reef-safe sunscreen required for all participants',
      'Proceeds support the Bajuni Barrier Reef Resilience research program',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Dabbaasha Beerta Murjaanka',
        tagline: 'Ogow nolosha ku jirta badda hoosteeda.',
        shortDescription: 'Ku dabbaal murjaan nadiif ah oo ay ku badan yihiin kalluunka midabka leh, raayada, iyo noolaha kaladuwan.',
        story: {
          whatItIs: 'Safar dabbaal biyo gaagaaban ah oo lagu maro qaar ka mid ah beeraha murjaanka ugu nadiifsan Badweynta Hindiya Galbeed.',
          whereItHappens: 'Harooyinka ilaalinta leh iyo dusha murjaanka ee dibedda ah ee Jasiiradaha Bajuni, halkaas oo biyaha degan oo aragti fiican leh ay muddo dheer socdaan.',
          whatToExpect: 'Dabbaal dusha murjaanka ah oo ku dhex jira murjaanka laamaha leh iyo miiska, dhaskooyinka waaweyn, iyo kalluunka reefka, oo hoggaamiya dadka deegaanka ah oo tababaran habka ilaalinta reefka.',
        },
        region: 'Jubaland',
        location: 'Jasiiradaha Bajuni',
        duration: 'Nus Maalin',
        difficulty: 'Fudud — Ku Habboon Bilowga',
        bestSeason: 'Noofembar – Maarso',
        galleryCaptions: [
          'Dabbaal-yahan oo ku sabsan beer murjaan gaagaaban oo ku taal Jasiiradaha Bajuni.',
          'Qaabab murjaan oo laamo leh iyo miis ah oo u dhow qarka reefka.',
          'Harooyinka ilaalinta leh ee dhulka-badeed ee Jubaland.',
        ],
        highlights: [
          'Gelitaanka reefka oo biyo gaagaaban oo degan leh',
          'Waxaa hoggaaminaya hogaamiyayaal dabbaal oo ilaalinta reefka yaqaan',
          'Dhaskooyin waaweyn iyo kalluun reef ah oo aad ugu dhow',
          'Ku habboon bilowga, wax shahaado ah looma baahna',
        ],
        conservationThemes: [
          'Anaqad taabasho la\'aan ah si loo ilaaliyo unugyada murjaanka jilicsan',
          'Waxaa lagama maarmaan u ah dhammaan ka qaybgalayaasha dahaadhka qorraxda ee reefka nabad geliya',
          'Dakhliga wuxuu taageeraa barnaamijka cilmi-baarista Adkaanta Sabkada Bajuni',
        ],
      },
    },
  },
  {
    id: 'diving',
    slug: 'diving',
    title: 'Deep Pelagic Diving',
    category: 'diving',
    status: 'coming-soon',
    tagline: 'Go deeper.',
    shortDescription: 'Scuba dive into largely unexplored Somali reef drop-offs where oceanic giants congregate.',
    story: {
      whatItIs: 'A multi-day scuba expedition into deep reef walls and pelagic drop-offs, designed for certified divers seeking largely unsurveyed waters.',
      whereItHappens: 'The Guardafui Deep off the tip of the Horn of Africa, where the Somali Current upwelling draws nutrient-rich water — and the animals that follow it — close to shore.',
      whatToExpect: 'Wall dives beside whale sharks and oceanic manta rays, with dive briefings led alongside Blue Ocean’s marine research teams.',
    },
    region: 'Puntland',
    location: 'Guardafui Deep',
    duration: '5 Days',
    difficulty: 'Advanced — Certified Divers',
    bestSeason: 'December – April',
    heroImage: '/exp_scuba_diving.jpg',
    gallery: [
      { url: '/exp_scuba_diving.jpg', caption: 'Divers along a pelagic drop-off in the Guardafui Channel.' },
      { url: '/marine_sharks.jpg', caption: 'Whale sharks feeding in the seasonal upwelling zone.' },
      { url: '/hafun2.jpg', caption: 'The Hafun Peninsula, gateway to the deep pelagic shelf.' },
    ],
    highlights: [
      'Wall dives on unsurveyed reef drop-offs',
      'Seasonal whale shark and manta ray encounters',
      'Dive briefings informed by active research data',
      'For certified advanced divers only',
    ],
    destinationSlugs: ['bosaso', 'hafun', 'bargaal'],
    marineSpeciesSlugs: ['whale-shark', 'manta-ray'],
    conservationThemes: [
      'No-touch, no-chase interaction guidelines with pelagic megafauna',
      'Dive data contributes to the Bari Coast Whale Shark Tagging Study',
      'Certified dive operators only, with mandatory buoyancy checks over reef',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Dhex-quusidda Badda Dheer',
        tagline: 'U gudub meel ka sii dheer.',
        shortDescription: 'Ku quus badda hoosteeda qarka murjaanka Soomaaliyeed ee aan wali la sahamin, halkaas oo xayawaanka waaweyn isugu yimaadaan.',
        story: {
          whatItIs: 'Safar quusid (scuba) oo dhowr maalmood ah oo loo maro darbiyada murjaanka qoto dheer iyo meelaha badda dheer, oo loogu talagalay quusayaasha shahaadada haysta ee raadinaya biyo aan weli si buuxda loo sahamin.',
          whereItHappens: 'Guardafui Deep-ka oo ku yaal dhamaadka Geeska Afrika, halkaas oo Qulqulka Badweynta Soomaaliya uu keenno biyo hodan ah oo nafaqo leh—iyo xayawaanka raaca—oo u soo dhawaanaya xeebta.',
          whatToExpect: 'Quusid darbiyo ah oo la socda sharkiga nibiriga (whale shark) iyo raayada manta-ga badweynta, iyadoo casharrada quusidda la hagaayo kooxaha cilmi-baarista badweynta ee Blue Ocean.',
        },
        region: 'Puntland',
        location: 'Guardafui Deep',
        duration: '5 Maalmood',
        difficulty: 'Sare — Quusayaal Shahaado Haysta',
        bestSeason: 'Diseembar – Abriil',
        galleryCaptions: [
          'Quusayaal ku socda darbi badda dheer oo ku yaal Marinka Guardafui.',
          'Sharkiga nibiriga oo wax ka quudinaya xilliga soo bixitaanka biyaha.',
          'Gacanka Hafun, iridda loo maro qarka badda dheer.',
        ],
        highlights: [
          'Quusid darbiyo ah oo qarka murjaanka aan la sahamin ah',
          'La kulan xilliyeed oo sharkiga nibiriga iyo raayada manta ah',
          'Casharro quusid ah oo ku salaysan xog cilmi-baaris firfircoon',
          'Kaliya quusayaasha sare ee shahaadada haysta',
        ],
        conservationThemes: [
          'Tilmaamo taabasho iyo eryasho la\'aan ah oo lala kulmo xayawaanka waaweyn ee badweynta',
          'Xogta quusidda waxay gacan ka geysataa Daraasadda Sumadaynta Sharkiga Nibiriga ee Xeebta Bari',
          'Kaliya hay\'adaha quusidda ee la ansixiyay, oo leh hubinta dabaqa lagama maarmaanka ah ee reefka',
        ],
      },
    },
  },
  {
    id: 'fishing',
    slug: 'fishing',
    title: 'Artisanal Pelagic Fishing',
    category: 'fishing',
    status: 'coming-soon',
    tagline: 'Experience the traditions of the coast.',
    shortDescription: 'Experience traditional sustainable fishing on the Indian Ocean alongside veteran fishermen.',
    story: {
      whatItIs: 'A day on the water with Somali artisanal fishermen, learning traditional handline and hoop-trap techniques passed down for generations.',
      whereItHappens: 'The productive pelagic shelf off Bargaal, where seasonal upwellings bring yellowfin tuna and other pelagic fish within reach of small boats.',
      whatToExpect: 'Hands-on handline fishing, a shoreline catch, and firsthand insight into the fishing cooperatives that anchor Somalia’s coastal economy.',
    },
    region: 'Puntland',
    location: 'Bargaal Coast',
    duration: '2 Days',
    difficulty: 'Moderate',
    bestSeason: 'November – April',
    heroImage: '/marine_fish.jpg',
    gallery: [
      { url: '/marine_fish.jpg', caption: 'Yellowfin tuna landed using traditional handline methods.' },
      { url: '/exp_dhow_sailing.jpg', caption: 'Fishing dhows departing at dawn from Bargaal.' },
      { url: '/bargaal_main.jpg', caption: 'The Bargaal coastline, home to generations of artisanal fishermen.' },
    ],
    highlights: [
      'Hands-on traditional handline fishing',
      'Guided by veteran Somali fishing cooperatives',
      'Fresh shoreline catch and coastal cuisine',
      'Insight into sustainable artisanal fishing methods',
    ],
    destinationSlugs: ['bargaal', 'eyl', 'bosaso'],
    marineSpeciesSlugs: ['yellowfin-tuna', 'spiny-lobster'],
    conservationThemes: [
      'Traditional handline and hoop-trap methods that avoid seafloor damage and bycatch',
      'Respect for seasonal closed periods protecting breeding stock',
      'Supports Fair Trade Handline Certification for Somali artisanal fleets',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Kalluumeysiga Dhaqameed ee Badweynta',
        tagline: 'La kulan dhaqamada xeebta.',
        shortDescription: 'La kulan kalluumeysiga waarta ee Badweynta Hindiya, adigoo la socda kalluumeystayaasha waayeelka ah.',
        story: {
          whatItIs: 'Maalin lagu qaato biyaha kalluumeystayaasha dhaqameed ee Soomaaliyeed, adigoo baranaya farsamooyinka gacanta iyo dabinnada dhaqameed ee qarniyo laga soo dhaxlay.',
          whereItHappens: 'Sabkada badweynta ee wax soo saarta ee ku taal Bargaal, halkaas oo soo bixitaanka xilliyeed uu keeno tuna-ga (yellowfin) iyo kalluunka badweynta kale ee gaadhi kara doonaha yaryar.',
          whatToExpect: 'Kalluumeysi gacan ah oo lagu falgalo, kalluun laga qabto xeebta, iyo aqoonta ku saabsan ururada kalluumeysiga ee saldhiga u ah dhaqaalaha xeebta Soomaaliya.',
        },
        region: 'Puntland',
        location: 'Xeebta Bargaal',
        duration: '2 Maalmood',
        difficulty: 'Dhexdhexaad',
        bestSeason: 'Noofembar – Abriil',
        galleryCaptions: [
          'Kalluun yellowfin ah oo lagu soo qabtay habka gacanta ee dhaqameed.',
          'Doonaha kalluumeysiga oo ka baxaya waaberiga Bargaal.',
          'Xeebta Bargaal, guriga jiilal badan oo kalluumeystayaal dhaqameed ah.',
        ],
        highlights: [
          'Kalluumeysi gacan ah oo si toos ah loo sameeyo',
          'Waxaa hoggaaminaya ururada kalluumeystayaasha Soomaaliyeed ee waayeelka ah',
          'Kalluun cusub oo xeebta laga qabtay iyo cunto xeebeed',
          'Aqoon ku saabsan habab kalluumeysi waara oo dhaqameed',
        ],
        conservationThemes: [
          'Farsamooyinka gacanta iyo dabinnada dhaqameed ee ka fogaanaya waxyeelada dhulka badda iyo kalluunka aan loo baahnayn',
          'Ixtiraamka xilliyada xirnaanshaha ee ilaalinaya kaydka dhalanka',
          'Waxay taageertaa Shahaadada Ganacsiga Cadaalatka ah ee Kalluumeysiga Gacanta ee Kalluumeystayaasha Soomaaliyeed',
        ],
      },
    },
  },
  {
    id: 'island-exploration',
    slug: 'island-exploration',
    title: 'Bajuni Island Odyssey',
    category: 'island-exploration',
    status: 'coming-soon',
    tagline: 'Find the islands beyond the shore.',
    shortDescription: 'Visit remote uninhabited islands and turquoise lagoons off Somalia’s southern border.',
    story: {
      whatItIs: 'A multi-day expedition by boat through the Bajuni Archipelago’s chain of coral islands, islets, and hidden lagoons.',
      whereItHappens: 'The southern Jubaland coast, from Kismayo’s harbor down toward the remote reaches near Ras Kamboni.',
      whatToExpect: 'Island hopping by traditional outrigger and dhow, remote beach landings, and time with the seafaring Bajuni community who have navigated these reef passages for centuries.',
    },
    region: 'Jubaland',
    location: 'Jubaland Archipelago',
    duration: '4 Days',
    difficulty: 'Moderate — Adventure',
    bestSeason: 'October – March',
    heroImage: '/jubaland.jpg',
    gallery: [
      { url: '/jubaland.jpg', caption: 'Remote coral islands of the Bajuni Archipelago.' },
      { url: '/marine_turtles.jpg', caption: 'Sea turtles nesting on undisturbed island beaches.' },
      { url: '/marine_seagrass.jpg', caption: 'Sheltered seagrass lagoons between the islands.' },
    ],
    highlights: [
      'Multi-day boat expedition through remote atolls',
      'Time with the seafaring Bajuni community',
      'Untouched white-sand beach landings',
      'High chance of dugong and sea turtle sightings',
    ],
    destinationSlugs: ['bajuni-islands', 'kismayo', 'ras-kamboni'],
    marineSpeciesSlugs: ['dugong', 'green-sea-turtle'],
    conservationThemes: [
      'No-anchor zones over seagrass meadows and coral heads',
      'Supports Bajuni Archipelago Dugong Drone Survey research',
      'Respect for community-managed island territorial waters',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Safarka Jasiiradaha Bajuni',
        tagline: 'Hel jasiiradaha xeebta ka baxsan.',
        shortDescription: 'Booqo jasiiradaha aan la degin iyo harooyinka buluuga ah ee ku yaal xadka koonfureed ee Soomaaliya.',
        story: {
          whatItIs: 'Safar dhowr maalmood ah oo doon lagu maro silsiladda jasiiradaha murjaanka, jasiirad-yarayaasha, iyo harooyinka qarsoon ee Jasiiradaha Bajuni.',
          whereItHappens: 'Xeebta koonfureed ee Jubaland, laga bilaabo dekedda Kismaayo ilaa meelaha fog ee u dhow Ras Kaambooni.',
          whatToExpect: 'Ka gudubka jasiiradaha iyada oo la isticmaalayo doonaha dhaqameed, dagitaanno xeeb oo fog, iyo waqti lala qaato bulshada Bajuni ee badweynta ku noolaanaysa oo qarniyo badan maray gudbinta reefyadan.',
        },
        region: 'Jubaland',
        location: 'Jasiiradaha Jubaland',
        duration: '4 Maalmood',
        difficulty: 'Dhexdhexaad — Waxbarasho Dheeraad ah',
        bestSeason: 'Oktoobar – Maarso',
        galleryCaptions: [
          'Jasiiradaha murjaanka ee fog ee Jasiiradaha Bajuni.',
          'Diinka badda oo ugxan ka dhigaya xeebaha aan la dhibin.',
          'Harooyinka cawska badda ee ilaalinta leh ee u dhexeeya jasiiradaha.',
        ],
        highlights: [
          'Safar doon oo dhowr maalmood ah oo loo maro cirifyada fog',
          'Waqti lala qaato bulshada Bajuni ee badweynta ku noolaanaysa',
          'Dagitaanno xeeb oo ciid cad ah oo aan la taaban',
          'Fursad sare oo lagu arko dugongyada iyo diinka badda',
        ],
        conservationThemes: [
          'Aagagga aan la sadaxin ee ka sarreeya cawska badda iyo madaxyada murjaanka',
          'Waxay taageertaa Sahaminta Draanka Dugongyada ee Jasiiradaha Bajuni',
          'Ixtiraamka biyaha xuduudda bulshada ee dhulka jasiiradaha maamusho',
        ],
      },
    },
  },
  {
    id: 'dolphin-watching',
    slug: 'dolphin-watching',
    title: 'Dolphin & Whale Watching',
    category: 'dolphin-watching',
    status: 'coming-soon',
    tagline: 'Witness giants of the deep.',
    shortDescription: 'Witness hundreds of acrobatic spinner dolphins and migrating humpback whales in pristine waters.',
    story: {
      whatItIs: 'A guided boat excursion to observe resident dolphin pods and, in season, migrating humpback whales.',
      whereItHappens: 'The Gulf of Aden corridor off Puntland, a resting and migration route for cetaceans crossing the Arabian Sea.',
      whatToExpect: 'Engine-idle observation of spinner dolphin pods riding the bow wake, and — during the winter migration window — distant humpback breaches and tail slaps.',
    },
    region: 'Puntland',
    location: 'Gulf of Aden',
    duration: 'Half Day',
    difficulty: 'Easy',
    bestSeason: 'October – May',
    heroImage: '/marine_dolphins.jpg',
    gallery: [
      { url: '/marine_dolphins.jpg', caption: 'Spinner dolphins riding the bow wake in the Gulf of Aden.' },
      { url: '/exp_coastal_cliff.jpg', caption: 'Humpback whales breaching off the Bari coastal cliffs.' },
      { url: '/somalia_coast.jpg', caption: 'Deep coastal waters along the migration corridor.' },
    ],
    highlights: [
      'Resident spinner dolphin pods',
      'Seasonal humpback whale migration',
      'Engine-idle, no-chase observation protocol',
      'Guided by marine mammal researchers',
    ],
    destinationSlugs: ['bosaso', 'eyl', 'hafun'],
    marineSpeciesSlugs: ['bottlenose-dolphin', 'humpback-whale'],
    conservationThemes: [
      'Respectful-distance protocols to avoid disturbing pods',
      'Supports the Maritime Route Whale Collision Advisory System',
      'No-chase, engine-idle observation guidelines for all vessels',
    ],
    featured: true,
    translations: {
      so: {
        title: 'Daawashada Dhurwaaga iyo Nibiriga',
        tagline: 'Arag waxyaalaha waaweyn ee badda hoosteeda.',
        shortDescription: 'Arag boqolaal dhurwaag oo boodbooda ah iyo nibiriyada guuraya ee humpback-ka ee biyaha nadiifka ah.',
        story: {
          whatItIs: 'Safar doon oo la hagayo si loo daawado qolooyinka dhurwaaga deggan iyo, xilliga saxda ah, nibiriyada guuraya ee humpback-ka.',
          whereItHappens: 'Marinka Gacanka Cadmeed ee ku yaal Puntland, oo ah waddo nasasho iyo guur ah oo ay maraan xayawaanka badweynta ee gudbaya Badweynta Carabiga.',
          whatToExpect: 'Daawasho iyada oo mishiinku joogsanayo ee lagu daawado qolooyinka dhurwaaga oo raacaya mowjadaha doonta, iyo—xilliga guurka jiilaalka—boodbooda iyo dabada garaacida nibiriyada humpback-ka oo fog laga arki karo.',
        },
        region: 'Puntland',
        location: 'Gacanka Cadmeed',
        duration: 'Nus Maalin',
        difficulty: 'Fudud',
        bestSeason: 'Oktoobar – Maajo',
        galleryCaptions: [
          'Dhurwaag boodbooda ah oo raacaya mowjadaha doonta ee Gacanka Cadmeed.',
          'Nibiriyada humpback-ka oo boodbooda oo ka mid ah qarka xeebta Bari.',
          'Biyaha xeebta ee qoto dheer ee ku yaal marinka guurka.',
        ],
        highlights: [
          'Qolooyinka dhurwaaga ee deggan',
          'Guurka xilliyeed ee nibiriyada humpback-ka',
          'Nidaam daawasho ah oo mishiinku joogsanayo, eryasho la\'aanna leh',
          'Waxaa hoggaaminaya cilmi-baarayaasha xayawaanka badweynta',
        ],
        conservationThemes: [
          'Nidaamyo ixtiraam masaafo leh si aan loo dhibin qolooyinka',
          'Waxay taageertaa Nidaamka Talobixinta Iska-hortagga Kulanka Nibiriga ee Waddooyinka Badda',
          'Tilmaamaha daawasho ee eryasho la\'aan iyo mishiin-joogsi ah ee dhammaan doomaha',
        ],
      },
    },
  },
  {
    id: 'marine-photography',
    slug: 'marine-photography',
    title: 'Underwater Photography Expedition',
    category: 'marine-photography',
    status: 'coming-soon',
    tagline: 'Capture the unseen coast.',
    shortDescription: 'Guided underwater and aerial expeditions capturing Somalia’s best-kept marine frontier.',
    story: {
      whatItIs: 'A guided expedition for underwater and coastal photographers, pairing camera time with marine research fieldwork.',
      whereItHappens: 'A rotating circuit across Somalia’s richest reef and coastline subjects, from Bajuni coral gardens to Qandala’s black coral drop-offs.',
      whatToExpect: 'Structured shoots at reef sites and cleaning stations, with guidance on light, buoyancy, and approach — and the option to contribute images to Blue Ocean’s species photo-ID archives.',
    },
    region: 'Somalia',
    location: 'Somalia Seaboard',
    duration: '6 Days',
    difficulty: 'Moderate',
    bestSeason: 'All Seasons',
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'Coral garden photography subjects in the Bajuni Archipelago.' },
      { url: '/exp_scuba_diving.jpg', caption: 'Underwater photographers documenting a reef drop-off.' },
      { url: '/marine_turtles.jpg', caption: 'Sea turtles are among the archipelago’s signature subjects.' },
    ],
    highlights: [
      'Structured shoots at signature reef sites',
      'Guidance on underwater light and approach',
      'Option to contribute to species photo-ID databases',
      'Suitable for surface and underwater photographers',
    ],
    destinationSlugs: ['kismayo', 'bajuni-islands', 'qandala'],
    marineSpeciesSlugs: ['acropora-coral', 'green-sea-turtle', 'manta-ray'],
    conservationThemes: [
      'Images contribute to Blue Ocean’s photo-ID species databases',
      'No flash photography near nesting or resting marine life',
      'Shared work supports public ocean literacy campaigns',
    ],
    featured: false,
    translations: {
      so: {
        title: 'Safarka Sawir-qaadista Badda Hoosteeda',
        tagline: 'Qabo waxa aan la arki karin ee xeebta.',
        shortDescription: 'Safarro la hagayo oo hoos badda iyo hawada sare laga sawiro xeebta ugu qarsoon ee Soomaaliya.',
        story: {
          whatItIs: 'Safar la hagayo oo loogu talagalay sawir-qaadayaasha badda hoosteeda iyo xeebta, kaas oo isku daraya waqtiga kamarada iyo shaqada cilmi-baarista badweynta.',
          whereItHappens: 'Wareeg is-badbadalaya oo ka baxsan xeebaha ugu hodansan ee Soomaaliya, laga bilaabo beeraha murjaanka Bajuni ilaa qarka murjaanka madow ee Qandala.',
          whatToExpect: 'Sawir qaad oo si hab ahaan loo qaabeeyay oo ka dhaca goobaha reefka iyo saldhagaha nadaafadda, oo la siinayo talooyin ku saabsan iftiinka, dheelitirka biyaha, iyo habka loo dhawaado—iyadoo fursad la siinayo in sawirrada lagu darsado kaydka aqoonsiga noocyada ee Blue Ocean.',
        },
        region: 'Soomaaliya',
        location: 'Xeebta Soomaaliya',
        duration: '6 Maalmood',
        difficulty: 'Dhexdhexaad',
        bestSeason: 'Dhammaan Xilliyada',
        galleryCaptions: [
          'Sawirka beeraha murjaanka ee Jasiiradaha Bajuni.',
          'Sawir-qaadayaasha badda hoosteeda oo diiwaan gelinaya darbi reef ah.',
          'Diinka badda waa ka mid ah astaamaha ugu caansan ee cirifka.',
        ],
        highlights: [
          'Sawir qaad hab ahaan loo qabtay oo goobaha reefka caansan ka dhacay',
          'Talooyin ku saabsan iftiinka badda hoosteeda iyo habka loo dhawaado',
          'Fursad lagu darsado kaydadka aqoonsiga noocyada',
          'Ku habboon sawir-qaadayaasha sare iyo kuwa badda hoosteeda',
        ],
        conservationThemes: [
          'Sawirrada waxay gacan ka geystaan kaydadka aqoonsiga noocyada ee Blue Ocean',
          'Ma jiro sawir-iftiin (flash) oo u dhow xayawaanka ugxanaya ama nasanaya',
          'Shaqada la wadaagay waxay taageertaa ololayaasha aqoonta bulshada ee badweynta',
        ],
      },
    },
  },
  {
    id: 'coastal-trekking',
    slug: 'coastal-trekking',
    title: 'Coastal Cliff Safari',
    category: 'coastal-trekking',
    status: 'coming-soon',
    tagline: 'Walk the edge of the continent.',
    shortDescription: 'Discover dramatic volcanic limestone cliffs, hidden ocean coves, and pristine white sands.',
    story: {
      whatItIs: 'A multi-day trek along Somalia’s dramatic limestone headlands, tracing coastline that few visitors have walked.',
      whereItHappens: 'The Karkaar mountain ridges of the Bari coast, where cliffs plunge directly into the Gulf of Aden.',
      whatToExpect: 'Clifftop trails, hidden coves accessible only on foot, and sweeping views over deep pelagic waters where whales and dolphins are often visible from shore.',
    },
    region: 'Puntland',
    location: 'Bari Coast',
    duration: '3 Days',
    difficulty: 'Moderate — Fitness Required',
    bestSeason: 'October – April',
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Karkaar limestone cliffs meeting the Gulf of Aden.' },
      { url: '/qandala_main.jpg', caption: 'Coastal bluffs near Qandala along the trekking route.' },
      { url: '/bargaal_main.jpg', caption: 'Hidden coves accessible only by clifftop trail.' },
    ],
    highlights: [
      'Multi-day clifftop and canyon trekking',
      'Hidden coves reachable only on foot',
      'Whale and dolphin sightings from shore',
      'Karkaar Ridge volcanic limestone geology',
    ],
    destinationSlugs: ['bargaal', 'qandala', 'hafun'],
    marineSpeciesSlugs: ['spiny-lobster', 'hawksbill-turtle'],
    conservationThemes: [
      'Stay-on-trail practices to protect nesting seabird colonies',
      'Pack-in, pack-out waste policy on all treks',
      'Local guide partnerships support community-based coastal stewardship',
    ],
    featured: false,
    translations: {
      so: {
        title: 'Safariga Qarka Xeebta',
        tagline: 'Ku soco cidhifka qaaradda.',
        shortDescription: 'Ogow qarka dhagaxa nooca volcanic limestone ee la yaabka leh, gacan-dhig qarsoon, iyo ciidda cad ee nadiifka ah.',
        story: {
          whatItIs: 'Socod dhowr maalmood ah oo lagu maro qarka dhagaxa limestone ee la yaabka leh ee Soomaaliya, isagoo raacaya xeeb yar oo booqdayaal aad u yar ay ku socdeen.',
          whereItHappens: 'Buuraha Karkaar ee xeebta Bari, halkaas oo qarka dhagaxa uu si toos ah ugu dhacayo Gacanka Cadmeed.',
          whatToExpect: 'Waddooyin qarka sare ah, gacan-dhig aan lagu gaari karin lugta mooyee, iyo muuqaal ballaaran oo laga arko biyaha badda dheer ee inta badan laga arki karo nibiriyada iyo dhurwaaga xeebta.',
        },
        region: 'Puntland',
        location: 'Xeebta Bari',
        duration: '3 Maalmood',
        difficulty: 'Dhexdhexaad — Fiisigi Loo Baahan Yahay',
        bestSeason: 'Oktoobar – Abriil',
        galleryCaptions: [
          'Qarka dhagaxa Karkaar oo kulmaya Gacanka Cadmeed.',
          'Buuraha xeebta ee u dhow Qandala oo ku yaal jidka socodka.',
          'Gacan-dhig qarsoon oo lagu gaari karin waddada qarka sare mooyee.',
        ],
        highlights: [
          'Socod dhowr maalmood ah oo lagu maro qarka sare iyo canyon-ka',
          'Gacan-dhig qarsoon oo lugta oo keliya lagu gaari karo',
          'Arag nibiriyada iyo dhurwaaga xeebta laga arki karo',
          'Juqraafiga dhagaxa volcanic limestone ee Karkaar Ridge',
        ],
        conservationThemes: [
          'Habka ku socodka waddada oo ilaalinaya beeraha shimbiraha ugxanaya',
          'Siyaasadda wax la keeno wax la qaado ee dhammaan socodyada',
          'Iskaashiga hoggaamiyayaasha deegaanka ah wuxuu taageeraa ilaalinta xeebta ee bulshada ku salaysan',
        ],
      },
    },
  },
];

// --- Cross-link resolution -------------------------------------------

function resolveDestinations(slugs = []) {
  return slugs
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean)
    .map((d) => ({ id: d.id, slug: d.slug, name: d.name, region: d.region, tagline: d.tagline, heroImage: d.heroImage }));
}

function resolveMarineSpecies(slugs = [], language = 'en') {
  return slugs
    .map((slug) => getSpeciesBySlug(slug, language))
    .filter(Boolean)
    .map((s) => ({
      id: s.id,
      slug: s.slug,
      commonName: s.commonName,
      scientificName: s.scientificName,
      heroImage: s.heroImage,
      category: s.categoryName,
      conservationStatus: s.conservationStatus,
    }));
}

function resolveResearchProjects(slugs = []) {
  const projects = [];
  const seen = new Set();
  slugs.forEach((slug) => {
    const species = speciesList.find((s) => s.slug === slug);
    (species?.researchProjects || []).forEach((project) => {
      if (!seen.has(project.id)) {
        seen.add(project.id);
        projects.push(project);
      }
    });
  });
  return projects;
}

export const experiences = rawExperiences.map((exp) => {
  const category = experienceCategories.find((c) => c.id === exp.category);
  return {
    ...exp,
    categoryName: category?.title || exp.category,
    destinations: resolveDestinations(exp.destinationSlugs),
    researchProjects: resolveResearchProjects(exp.marineSpeciesSlugs),
  };
});

// --- i18n helpers ---------------------------------------------------

// Localizes a single experience record, including zipping translated
// gallery captions (`translations.so.galleryCaptions`) back onto the
// `gallery` array so consumers keep reading `exp.gallery[i].caption`.
function localizeExperience(exp, language) {
  const localized = localize(exp, language);
  const captions = exp.translations?.[language]?.galleryCaptions;
  if (!captions || !Array.isArray(localized.gallery)) return localized;
  return {
    ...localized,
    gallery: localized.gallery.map((entry, i) => ({ ...entry, caption: captions[i] ?? entry.caption })),
  };
}

// --- Public helpers -----------------------------------------------------

export function getExperienceCategories(language = 'en') {
  return localizeList(experienceCategories, language);
}

export function getExperienceStatusInfo(statusKey, language = 'en') {
  const status = EXPERIENCE_STATUSES[statusKey];
  return status ? localize(status, language) : undefined;
}

export function getAllExperiences(language = 'en') {
  const categories = getExperienceCategories(language);
  return experiences.map((exp) => {
    const localized = localizeExperience(exp, language);
    const category = categories.find((c) => c.id === exp.category);
    return {
      ...localized,
      categoryName: category?.title || exp.category,
      statusLabel: getExperienceStatusInfo(exp.status, language)?.label || exp.status,
      marineSpecies: resolveMarineSpecies(exp.marineSpeciesSlugs, language),
    };
  });
}

export function getExperienceBySlug(slug, language = 'en') {
  return getAllExperiences(language).find((e) => e.slug === slug || e.id === slug);
}

export function getFeaturedExperiences(language = 'en') {
  return getAllExperiences(language).filter((e) => e.featured);
}

export function getExperiencesByCategory(categoryId, language = 'en') {
  const all = getAllExperiences(language);
  if (!categoryId || categoryId === 'all') return all;
  return all.filter((e) => e.category === categoryId);
}

export function getRelatedExperiences(currentSlug, limit = 3, language = 'en') {
  const all = getAllExperiences(language);
  const current = all.find((e) => e.slug === currentSlug || e.id === currentSlug);
  if (!current) return all.slice(0, limit);
  return all
    .filter((e) => e.slug !== currentSlug && (e.category === current.category || e.region === current.region))
    .slice(0, limit);
}

export function getExperienceStats() {
  return {
    totalExperiences: experiences.length,
    categoriesCount: experienceCategories.length,
    comingSoonCount: experiences.filter((e) => e.status === 'coming-soon').length,
    regionsCovered: new Set(experiences.map((e) => e.region)).size,
  };
}
