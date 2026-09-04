// =========================================================
// Conservation Data Model
// Blue Ocean Somalia — Sprint 6: Conservation & Coastal Communities
//
// Follows the same pattern as data/research.js: institutional
// attribution rather than named individuals, and impact figures are
// computed from this data model (getConservationImpact) rather than
// hand-typed, so nothing here is a fabricated statistic.
//
// Localization: every exported getter takes a `language` argument
// ('en' | 'so'). Somali overrides live under each record's
// `translations.so` key and are merged in via localize()/localizeList()
// from ../lib/i18n/localizeData.js. Enum keys used for filtering, CSS
// lookups, or routing (status keys, focus-area ids, issue ids) are never
// translated — only their display labels are.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';
import { researchProjects } from './research.js';
import { communities } from './communities.js';
import { localize, localizeList } from '../lib/i18n/localizeData.js';

// Enum keys — used for filtering/logic. Never translated.
export const CONSERVATION_STATUSES = ['Planned', 'Active', 'Completed', 'Coming Soon'];

const STATUS_LABELS_SO = {
  Planned: 'La Qorsheeyay',
  Active: 'Socda',
  Completed: 'La Dhammeeyay',
  'Coming Soon': 'Dhawaan',
};

// Display label for a status enum key. The key itself (used for
// filtering and CSS/style lookups) is always the English value above.
export function getStatusLabel(statusKey, language = 'en') {
  if (language === 'so' && STATUS_LABELS_SO[statusKey]) return STATUS_LABELS_SO[statusKey];
  return statusKey;
}

export const conservationFocusAreas = [
  {
    id: 'marine-wildlife',
    slug: 'marine-wildlife',
    title: 'Marine Wildlife',
    description: 'Protecting endangered and vulnerable marine species — from sea turtles to sharks and cetaceans — across Somali waters.',
    image: '/marine_turtles.jpg',
    translations: {
      so: {
        title: 'Duurjoogta Badda',
        description: 'Ilaalinta noocyada badeed ee halista ku jira ama nugul ah — laga bilaabo diinta badda ilaa sharka iyo nibiriyada — ee ku baahsan biyaha Soomaaliyeed.',
      },
    },
  },
  {
    id: 'coral-habitat',
    slug: 'coral-habitat',
    title: 'Coral & Habitat Protection',
    description: 'Safeguarding coral reefs, seagrass meadows, and mangrove nurseries against degradation and unregulated development.',
    image: '/marine_coral.jpg',
    translations: {
      so: {
        title: 'Ilaalinta Jiirka iyo Deegaanka',
        description: 'Difaaca jiirka badda, dooxyada cawska badda, iyo beeraha caws-qoyanka (mangrove) ee ah meelaha korriinka noolaha yaryar, iyagoo laga ilaalinayo sii-xumaanshaha iyo horumar aan la xakumin.',
      },
    },
  },
  {
    id: 'illegal-fishing',
    slug: 'illegal-fishing',
    title: 'Illegal Fishing',
    description: 'Documenting illegal and destructive fishing activity in Somali waters and supporting evidence-based, sustainable management of the resources coastal communities depend on.',
    image: '/marine_fish.jpg',
    translations: {
      so: {
        title: 'Kalluumeysiga Sharci-darrada ah',
        description: 'Diiwaangelinta howlaha kalluumeysiga sharci-darrada ah ee wax-u-dhiman ee ka socda biyaha Soomaaliyeed, iyo taageeridda maamul waara oo ku salaysan xog sax ah ee khayraadka ay bulshooyinka xeebaha ku tiirsan yihiin.',
      },
    },
  },
  {
    id: 'sustainable-fishing',
    slug: 'sustainable-fishing',
    title: 'Sustainable Fishing',
    description: 'Working with artisanal fleets to protect fish stocks, nursery grounds, and livelihoods for the long term.',
    image: '/exp_dhow_sailing.jpg',
    translations: {
      so: {
        title: 'Kalluumeysi Waara',
        description: 'La shaqaynta doonyaha kalluumeysiga ee dhaqameed si loo ilaaliyo kaydka kalluunka, meelaha korriinka, iyo nolol-maalmeedka mustaqbalka fog.',
      },
    },
  },
  {
    id: 'ocean-pollution',
    slug: 'ocean-pollution',
    title: 'Ocean Pollution',
    description: 'Mapping marine debris, microplastics, and coastal pollution sources to guide cleanup and prevention.',
    image: '/mogadishu_beach.jpg',
    translations: {
      so: {
        title: 'Wasakhaynta Badweynta',
        description: 'Khariidaynta qashinka badda, walxaha plastikga yaryar (microplastics), iyo isha wasakhda xeebaha, si loo hagaajiyo howlaha nadaafadda iyo ka hortagga.',
      },
    },
  },
  {
    id: 'beach-cleanup',
    slug: 'beach-cleanup',
    title: 'Beach Cleanup',
    description: 'Organizing community-led shoreline cleanups along Somalia\'s most heavily used coastlines.',
    image: '/con_beach_cleanup.jpg',
    translations: {
      so: {
        title: 'Nadaafadda Xeebaha',
        description: 'Habaynta ololayaal nadaafad oo bulshada hoggaamiso ee ka socda xeebaha ugu isticmaalka badan ee Soomaaliya.',
      },
    },
  },
  {
    id: 'marine-education',
    slug: 'marine-education',
    title: 'Marine Education',
    description: 'Building ocean literacy in coastal schools and communities to grow the next generation of stewards.',
    image: '/con_youth_education.jpg',
    translations: {
      so: {
        title: 'Waxbarashada Badda',
        description: 'Kobcinta aqoonta ku saabsan badweynta dugsiyada iyo bulshooyinka xeebaha si loo soo saaro jiil cusub oo ilaaliya deegaanka.',
      },
    },
  },
  {
    id: 'community-conservation',
    slug: 'community-conservation',
    title: 'Community Conservation',
    description: 'Partnering with coastal communities so conservation is led by the people who depend on the ocean most.',
    image: '/puntland.jpg',
    translations: {
      so: {
        title: 'Ilaalinta Bulsho-hoggaamineed',
        description: 'La shaqaynta bulshooyinka xeebaha si ilaalinta deegaanka loo hoggaamiyo dadka ugu tiirsanaanta badweynta.',
      },
    },
  },
];

export function getConservationFocusAreas(language = 'en') {
  return localizeList(conservationFocusAreas, language);
}

// Controlled vocabulary of issues a project can address — selected per
// project, not free text, so the Problem section only ever shows
// issues Blue Ocean actually works on.
export const CONSERVATION_ISSUES = [
  { id: 'habitat-degradation', label: 'Habitat Degradation', icon: 'TreePine', translations: { so: { label: 'Sii-xumaanshaha Deegaanka' } } },
  { id: 'plastic-pollution', label: 'Plastic & Marine Debris', icon: 'Trash2', translations: { so: { label: 'Plastikga iyo Qashinka Badda' } } },
  { id: 'unsustainable-fishing', label: 'Unsustainable Fishing', icon: 'Fish', translations: { so: { label: 'Kalluumeysi Aan Waarin' } } },
  { id: 'illegal-fishing', label: 'Illegal & Unregulated Fishing', icon: 'AlertTriangle', translations: { so: { label: 'Kalluumeysi Sharci-darro ah oo Aan La Xakumin' } } },
  { id: 'bycatch', label: 'Bycatch & Entanglement', icon: 'AlertTriangle', translations: { so: { label: 'Qabashada Aan Loo Baahnayn iyo Ku Xidhmidda Shabagyada' } } },
  { id: 'wildlife-trade', label: 'Illegal Wildlife Trade', icon: 'ShieldOff', translations: { so: { label: 'Ganacsiga Sharci-darrada ah ee Duurjoogta' } } },
  { id: 'vessel-strikes', label: 'Vessel Strikes', icon: 'Ship', translations: { so: { label: 'Kudhufashada Doonyaha' } } },
  { id: 'water-quality', label: 'Declining Water Quality', icon: 'Droplets', translations: { so: { label: 'Hoos-u-dhaca Tayada Biyaha' } } },
  { id: 'climate-warming', label: 'Warming & Bleaching', icon: 'Thermometer', translations: { so: { label: 'Kulaylka iyo Cadaanshaha Jiirka' } } },
  { id: 'low-awareness', label: 'Limited Ocean Literacy', icon: 'BookOpen', translations: { so: { label: 'Aqoon Yari ku saabsan Badweynta' } } },
];

// Blue Ocean's shared conservation methodology — the same five steps
// apply across every project, so this is defined once and reused on
// the Conservation landing page and every project detail page.
export const CONSERVATION_APPROACH_STEPS = [
  {
    step: '01',
    title: 'Research',
    desc: 'Every initiative starts with data — field surveys, species monitoring, and habitat assessments that establish an evidence baseline.',
    translations: {
      so: {
        title: 'Cilmi-baaris',
        desc: 'Hindise kastaa wuxuu ku bilaabmaa xog — sahan goob ah, kormeerka noocyada, iyo qiimaynta deegaanka — kuwaas oo aasaas u ah xaqiiqo la hubiyay.',
      },
    },
  },
  {
    step: '02',
    title: 'Understand',
    desc: 'Raw findings are translated into a clear picture of what is actually threatening a species, habitat, or coastal livelihood.',
    translations: {
      so: {
        title: 'Fahamka',
        desc: 'Natiijooyinka ceyriinka ah waxaa loo beddelaa sawir cad oo muujinaya waxa runtii khatar ku ah nooc, deegaan, ama nolol-maalmeedka xeebaha.',
      },
    },
  },
  {
    step: '03',
    title: 'Engage',
    desc: 'Coastal communities, fishing cooperatives, and local authorities are brought in as partners in the response, not bystanders to it.',
    translations: {
      so: {
        title: 'La-xiriirka',
        desc: 'Bulshooyinka xeebaha, iskaashatooyinka kalluumeysiga, iyo maamullada deegaanka waxaa loogu casumaa inay noqdaan wehelo ka qayb qaata xalka, ee aysan ahayn kuwo daawan.',
      },
    },
  },
  {
    step: '04',
    title: 'Protect',
    desc: 'Findings become action — protected corridors, gear changes, seasonal closures, cleanup networks, or policy proposals.',
    translations: {
      so: {
        title: 'Ilaalinta',
        desc: 'Natiijooyinku waxay noqdaan tallaabo dhab ah — waddooyin la ilaaliyo, isbeddel qalabka kalluumeysiga, xannibaadyo xilliyeed, shabakadaha nadaafadda, ama soo jeedinno siyaasadeed.',
      },
    },
  },
  {
    step: '05',
    title: 'Measure',
    desc: 'We track whether an intervention is actually working, and adjust the approach as new field data comes in.',
    translations: {
      so: {
        title: 'Qiimaynta',
        desc: 'Waxaan la soconaa in tallaabadu runtii shaqaynayso iyo in kale, waxaana habka wax ka beddelnaa marka xog goob oo cusub soo gasho.',
      },
    },
  },
];

export function getConservationApproachSteps(language = 'en') {
  return localizeList(CONSERVATION_APPROACH_STEPS, language);
}

const rawProjects = [
  {
    id: 'marine-mammal-safe-corridors',
    slug: 'marine-mammal-safe-corridors',
    title: 'Marine Mammal Migration Safe Corridors',
    focusArea: 'marine-wildlife',
    status: 'Active',
    region: 'Puntland',
    startDate: '2024',
    endDate: null,
    summary: 'Mapping dolphin and whale movement along the Gulf of Aden to keep migration corridors clear of shipping and fishing conflict.',
    editorialStatement: 'Every pod deserves a corridor free of conflict.',
    whatItIs: 'A standing initiative to identify and formally propose safe-passage corridors for resident dolphin pods and migratory humpback whales along Somalia\'s northern coast.',
    whyItMatters: 'Vessel traffic and fishing gear are two of the most preventable threats resident cetaceans face — and they are only preventable once you know exactly where the animals actually are.',
    whoIsInvolved: 'Blue Ocean\'s Cetacean & Marine Mammal Research Unit, working alongside artisanal fishing cooperatives along the Bosaso–Qandala corridor.',
    aims: 'A formally mapped, evidence-based corridor proposal that shipping operators and local fisheries can both plan around.',
    problemStatement: 'Resident dolphin pods and migrating humpback whales share the Gulf of Aden with dense shipping lanes and active fishing grounds — with no formal corridor in place to reduce the overlap.',
    issueSlugs: ['vessel-strikes', 'bycatch'],
    heroImage: '/marine_dolphins.jpg',
    gallery: [
      { url: '/marine_dolphins.jpg', caption: 'A resident dolphin pod in the Gulf of Aden corridor.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso harbor, a key vessel-traffic zone along the corridor.' },
      { url: '/exp_coastal_cliff.jpg', caption: 'Coastal waters along the proposed corridor route.' },
    ],
    speciesSlugs: ['bottlenose-dolphin', 'humpback-whale'],
    destinationSlugs: ['bosaso', 'qandala', 'eyl', 'hafun', 'hurdiya'],
    researchProjectSlugs: ['cetacean-monitoring', 'acoustic-hydrophone'],
    communitySlugs: ['bosaso-fishing-cooperative'],
    featured: true,
    translations: {
      so: {
        title: 'Waddooyinka Ammaanka ee Socodka Xayawaanka Naaska Leh ee Badda',
        summary: 'Khariidaynta dhaqdhaqaaqa delfiinka iyo nibiriga ee Gacanka Cadmeed si waddooyinka socodka loo sii wado iyagoo ka fog khilaafka maraakiibta iyo kalluumeysiga.',
        editorialStatement: 'Cutub kastaa waxa ay mudan tahay waddo ka fog khilaaf.',
        whatItIs: 'Hindise joogto ah oo lagu aqoonsanayo oo si rasmi ah loogu soo jeedinayo waddooyin ammaan ah oo loogu talagalay quruumaha delfiinka deggan iyo nibiriyada guuraaga (humpback) ee xeebta woqooyi ee Soomaaliya.',
        whyItMatters: 'Dhaqdhaqaaqa maraakiibta iyo qalabka kalluumeysigu waa laba ka mid ah khataraha ugu badan ee laga hortagi karo ee ay wajahaan xayawaanka naaska leh ee deggan — waana kuwo aan laga hortagi karin ilaa aad ogaato meesha ay xayawaanku ku sugan yihiin.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Nibiriga iyo Xayawaanka Naaska Leh ee Blue Ocean, oo la shaqaynaysa iskaashatooyinka kalluumeysiga dhaqameed ee waddada Boosaaso–Qandala.',
        aims: 'Soo jeedin waddo la khariideeyay oo ku salaysan xog la hubiyay oo ay ku qorsheysan karaan hawlwadeenada maraakiibta iyo kalluumeysiga maxaliga ah labaduba.',
        problemStatement: 'Quruumaha delfiinka deggan iyo nibiriyada guuraaga waxay la wadaagaan Gacanka Cadmeed waddooyin maraakiib oo cufan iyo goobo kalluumeysi firfircoon — iyadoon jirin wado rasmi ah oo yareysa isku dhacyada.',
        gallery: [
          { url: '/marine_dolphins.jpg', caption: 'Quruux delfiin ah oo deggan waddada Gacanka Cadmeed.' },
          { url: '/bosaso2.jpg', caption: 'Deked Boosaaso, oo ah meel muhiim ah oo dhaqdhaqaaqa maraakiibtu ku badan yahay ee waddada.' },
          { url: '/exp_coastal_cliff.jpg', caption: 'Biyaha xeebeed ee ku teedsan waddada la soo jeediyay.' },
        ],
      },
    },
  },
  {
    id: 'elasmobranch-protection-initiative',
    slug: 'elasmobranch-protection-initiative',
    title: 'Horn of Africa Elasmobranch Protection Initiative',
    focusArea: 'marine-wildlife',
    status: 'Active',
    region: 'Puntland',
    startDate: '2023',
    endDate: null,
    summary: 'A regional protection push for whale sharks feeding along the seasonal Guardafui upwelling, built on Blue Ocean\'s tagging and photo-ID work.',
    editorialStatement: 'The ocean\'s largest fish needs some of its strongest protection.',
    whatItIs: 'A regional initiative — coordinated with partner organizations across the Horn of Africa — to secure protected status for whale shark feeding aggregations.',
    whyItMatters: 'Whale sharks are slow to mature and slower to recover from population loss; a single unregulated feeding ground can undo years of protection elsewhere in their migratory range.',
    whoIsInvolved: 'Blue Ocean\'s Elasmobranch Research Unit, alongside regional whale shark research networks sharing tagging and photo-ID data.',
    aims: 'Recognized protected status for the Guardafui upwelling feeding grounds, and a shared regional monitoring standard.',
    problemStatement: 'Whale sharks feeding along the Guardafui upwelling remain unprotected and increasingly exposed to unregulated tourism approaches and accidental net entanglement.',
    issueSlugs: ['wildlife-trade', 'bycatch'],
    heroImage: '/marine_sharks.jpg',
    gallery: [
      { url: '/marine_sharks.jpg', caption: 'A whale shark feeding near the surface off Cap Guardafui.' },
      { url: '/exp_scuba_diving.jpg', caption: 'Research divers conducting a photo-ID approach.' },
      { url: '/bargaal_main.jpg', caption: 'Bargaal, a seasonal whale shark feeding aggregation site.' },
    ],
    speciesSlugs: ['whale-shark'],
    destinationSlugs: ['bosaso', 'hafun', 'bargaal'],
    researchProjectSlugs: ['whale-shark-satellite'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Hindisaha Ilaalinta Elasmobranch-ka ee Geeska Afrika',
        summary: 'Dadaal ilaalineed oo gobolka ku baahsan oo loogu talagalay sharkiyada weyn ee daaqa xilliga upwelling-ka Guardafui, oo ku dhisan shaqada Blue Ocean ee calaamadaynta iyo aqoonsiga sawirka.',
        editorialStatement: 'Kalluunka ugu weyn ee badweynta wuxuu u baahan yahay mid ka mid ah ilaalinta ugu xoogga badan.',
        whatItIs: 'Hindise gobol oo lagula kaashanayo ururo shirkeed oo ka tirsan Geeska Afrika, si loo helo xaalad la ilaaliyo oo loogu talagalo isku-ururka sharkiyada weyn ee daaqa.',
        whyItMatters: 'Sharkiyada weyn way gaabsadaan koritaanka waxayna ka gaabsan yihiin dib-u-soo-kabashada dhimista tirada bulshadooda — beer daaqeed keliya oo aan la xakumin ayaa burin kara sanado ilaalin oo ka jira meelo kale oo socodkooda ah.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Elasmobranch-ka ee Blue Ocean, oo la shaqaynaysa shabakadaha cilmi-baarista sharka weyn ee gobolka oo wadaagaya xogta calaamadaynta iyo aqoonsiga sawirka.',
        aims: 'Xaalad la ilaaliyo oo la aqoonsaday oo loogu talagalay beerta daaqa ee Guardafui, iyo heer kormeer gobol oo la wadaago.',
        problemStatement: 'Sharkiyada weyn ee daaqa xilliga upwelling-ka Guardafui wali lama ilaalin, waxaana sii kordhaya khatarta dalxiiska aan la xakumin iyo ku xidhmidda shabagyada kalluumeysiga si aan ula kac ahayn.',
        gallery: [
          { url: '/marine_sharks.jpg', caption: 'Shark weyn oo daaqaya dushiisa biyaha u dhow Cap Guardafui.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Cilmi-baarayaal dhex-dhex ah oo sameynaya nidaamka aqoonsiga sawirka.' },
          { url: '/bargaal_main.jpg', caption: 'Bargaal, oo ah meel xilliyeed oo isugu imaanaya sharka weyn ee daaqa.' },
        ],
      },
    },
  },
  {
    id: 'mobulid-ray-trade-ban-enforcement',
    slug: 'mobulid-ray-trade-ban-enforcement',
    title: 'National Mobulid & Ray Trade Ban Enforcement',
    focusArea: 'marine-wildlife',
    status: 'Planned',
    region: 'Jubaland',
    startDate: '2026',
    endDate: null,
    summary: 'A planned enforcement and monitoring push against the manta and mobulid ray trade, built on the Bajuni Archipelago photo-ID registry.',
    editorialStatement: 'A trade ban only protects what it can actually see.',
    whatItIs: 'A planned program pairing photo-ID population data with enforcement support for Somalia\'s existing mobulid ray trade restrictions.',
    whyItMatters: 'Manta and mobulid rays are targeted for their gill plates in regional trade networks, and enforcement without population data is difficult to prioritize or defend.',
    whoIsInvolved: 'Blue Ocean\'s Elasmobranch Research Unit, working toward a coordination agreement with regional fisheries authorities.',
    aims: 'A verified regional population baseline that enforcement agencies can use to prioritize patrol and inspection effort.',
    problemStatement: 'Manta and mobulid rays are exposed to trade demand for their gill plates, and no verified regional population estimate yet exists to prioritize enforcement.',
    issueSlugs: ['wildlife-trade'],
    heroImage: '/exp_scuba_diving.jpg',
    gallery: [
      { url: '/exp_scuba_diving.jpg', caption: 'A research diver approaching a manta ray for photo-ID capture.' },
      { url: '/marine_coral.jpg', caption: 'A reef pinnacle identified as a candidate cleaning station.' },
      { url: '/jubaland.jpg', caption: 'Bajuni Archipelago waters covered by the planned registry.' },
    ],
    speciesSlugs: ['manta-ray'],
    destinationSlugs: ['kismayo', 'hafun', 'qandala'],
    researchProjectSlugs: ['manta-photo-id'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Fulinta Mamnuucidda Ganacsiga Manta-yada iyo Mobulid-ka Qaranka',
        summary: 'Dadaal fulin iyo kormeer oo lagu qorsheeyay looga hortago ganacsiga manta-ga iyo diirka mobulid-ka, oo ku dhisan diiwaanka aqoonsiga sawirka ee Jasiiradaha Baajuun.',
        editorialStatement: 'Mamnuucidda ganacsigu waxa uu ilaaliyaa kaliya waxa uu arki karo.',
        whatItIs: 'Barnaamij la qorsheeyay oo isku daraya xogta tirakoobka aqoonsiga sawirka iyo taageerada fulinta xayiraadaha jira ee ganacsiga diirka mobulid-ka ee Soomaaliya.',
        whyItMatters: 'Manta-ga iyo diirka mobulid-ka ayaa lagu bartilmaameedsadaa xuubabkooda dahaarka marka lagu daro shabakadaha ganacsiga gobolka, fulintuna way adkaataa marka aan jirin xog tiro-koob oo la hubiyay.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Elasmobranch-ka ee Blue Ocean, oo u socda heshiis iskaashi la leh maamulada kalluumeysiga gobolka.',
        aims: 'Aasaas tiro-koob gobol oo la xaqiijiyay oo ay hay\'adaha fulintu isticmaali karaan si ay ugu mudnaanta siiyaan patrolka iyo baaritaanka.',
        problemStatement: 'Manta-ga iyo diirka mobulid-ka waxay wajahaan baahida ganacsiga xuubabkooda dahaarka, mana jiro tiro-koob gobol oo la hubiyay oo lagu mudnaanta siin karo fulinta.',
        gallery: [
          { url: '/exp_scuba_diving.jpg', caption: 'Cilmi-baare dhex-dhex ah oo u soo dhawaanaya diir manta ah si uu u qaado sawir aqoonsi.' },
          { url: '/marine_coral.jpg', caption: 'Jiir badeed oo la aqoonsaday inuu yahay meel u badan in ay nadiifiyaan kalluunka.' },
          { url: '/jubaland.jpg', caption: 'Biyaha Jasiiradaha Baajuun ee ay daboolayso diiwaanka la qorsheeyay.' },
        ],
      },
    },
  },
  {
    id: 'sirenian-protected-corridors',
    slug: 'sirenian-protected-corridors',
    title: 'Zero-Gillnet Protected Corridors for Somali Sirenians',
    focusArea: 'marine-wildlife',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Establishing gillnet-free seagrass channels for one of East Africa\'s last resident dugong populations.',
    editorialStatement: 'One of the last strongholds deserves one of the strictest protections.',
    whatItIs: 'A gillnet exclusion proposal covering the Bajuni Archipelago\'s sheltered seagrass channels, drawn directly from Blue Ocean\'s aerial dugong survey.',
    whyItMatters: 'Gillnets are the single greatest cause of dugong mortality region-wide, and this small, resident population has almost no margin for loss.',
    whoIsInvolved: 'Blue Ocean\'s Marine Biodiversity Unit, in coordination with Bajuni Archipelago fishing communities who use the same channels.',
    aims: 'A community-honored gillnet-free zone across the channels where the surveyed population concentrates.',
    problemStatement: 'Gillnet entanglement is the leading threat to the small resident dugong population using the Bajuni Archipelago\'s seagrass channels.',
    issueSlugs: ['bycatch', 'habitat-degradation'],
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'A dugong feeding trail visible in a shallow seagrass meadow.' },
      { url: '/jubaland.jpg', caption: 'Sheltered mangrove creeks included in the proposed corridor.' },
      { url: '/somalia_coast.jpg', caption: 'Southern coastal waters within the survey extent.' },
    ],
    speciesSlugs: ['dugong'],
    destinationSlugs: ['kismayo'],
    researchProjectSlugs: ['dugong-aerial-survey'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Waddooyinka la Ilaaliyo ee Aan Shabag-Dhaadheer Lahayn ee Naasleyda Badda ee Soomaaliya',
        summary: 'Dejinta jidad cawska badda ah oo shabag-dhaadheer laga saaray, oo loogu talagalay mid ka mid ah kooxaha ugu dambeeya ee dugong-ga deggan ee Bariga Afrika.',
        editorialStatement: 'Mid ka mid ah qalcadaha ugu dambeeya wuxuu mudan yahay mid ka mid ah ilaalinta ugu adag.',
        whatItIs: 'Soo jeedin lagu saarayo shabagyada dhaadheer jidadka cawska badda ee la ilaaliyo ee Jasiiradaha Baajuun, oo si toos ah looga soo qaatay sahanka hawada ee dugong-ga ee Blue Ocean.',
        whyItMatters: 'Shabagyada dhaadheer waa sababta ugu weyn ee dhimashada dugong-ga gobolka oo dhan, kooxdan yar ee deggani waxayna ku hayaan meel yar oo ay ku lumaan karaan.',
        whoIsInvolved: 'Xarunta Kala-duwanaanta Noolaha Badda ee Blue Ocean, oo iskaashi la leh bulshooyinka kalluumeysiga ee Jasiiradaha Baajuun ee isticmaala jidadkaas.',
        aims: 'Aag aan shabag-dhaadheer lahayn oo bulshadu ixtiraamto oo daboolaya jidadka ay kooxda la sahmiyay ku badan tahay.',
        problemStatement: 'Ku xidhmidda shabagyada dhaadheer waa khatarta ugu weyn ee kooxda yar ee dugong-ga ee isticmaasha jidadka cawska badda ee Jasiiradaha Baajuun.',
        gallery: [
          { url: '/marine_seagrass.jpg', caption: 'Wadada raaca ee dugong-ga oo lagu arki karo dooxo caws bad oo dhaadheer.' },
          { url: '/jubaland.jpg', caption: 'Wadiiqooyinka caws-qoyanka ee ku jira waddada la soo jeediyay.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebeed ee koonfureed ee ku jira aagga sahanka.' },
        ],
      },
    },
  },
  {
    id: 'mpa-framework-reef-zoning',
    slug: 'mpa-framework-reef-zoning',
    title: 'Marine Protected Area (MPA) Framework & Reef Zoning',
    focusArea: 'coral-habitat',
    status: 'Planned',
    region: 'Jubaland',
    startDate: '2026',
    endDate: null,
    summary: 'A planned zoning framework for Somalia\'s first coral-focused Marine Protected Areas, built on thermal-resilience genotyping data.',
    editorialStatement: 'Somalia has no Marine Protected Areas yet. That is the gap this closes.',
    whatItIs: 'A planned zoning proposal identifying which Bajuni and Qandala reef sites should be prioritized for formal protection, based on measured coral thermal resilience.',
    whyItMatters: 'Somalia currently has no Marine Protected Areas at all — a gap flagged as far back as a landmark 2000 coastal study, and one that leaves even the most resilient reefs with no legal protection.',
    whoIsInvolved: 'Blue Ocean\'s Coral Reef & Coastal Ecosystems Unit, developing the zoning proposal for future submission to relevant coastal authorities.',
    aims: 'A ready-to-submit MPA zoning framework prioritized around the most thermally resilient reef sites identified so far.',
    problemStatement: 'Somalia has no legally established Marine Protected Areas, leaving even its most resilient coral sites without formal protection from quarrying, anchoring, or unregulated development.',
    issueSlugs: ['habitat-degradation', 'climate-warming'],
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'A coral garden in the Bajuni Archipelago.' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Survey team sampling coral fragments for genetic analysis.' },
      { url: '/qandala_main.jpg', caption: 'Qandala patch reefs included in the zoning proposal.' },
    ],
    speciesSlugs: ['acropora-coral'],
    destinationSlugs: ['kismayo', 'qandala', 'bosaso'],
    researchProjectSlugs: ['coral-thermal-study'],
    communitySlugs: [],
    featured: true,
    translations: {
      so: {
        title: 'Qaab-dhismeedka Aagagga la Ilaaliyo ee Badda (MPA) iyo Qaybinta Jiirka',
        summary: 'Qaab-dhismeed qaybineed oo lagu qorsheeyay Aagagga la Ilaaliyo ee Badda ee ugu horreeya ee Soomaaliya oo diirado ku salaysan, oo ku dhisan xogta cilmiga hidda-wadaha kulaylka jiirka.',
        editorialStatement: 'Soomaaliya wali ma laha Aagag la Ilaaliyo oo Badeed. Kaas ayaa boodhka ah ee tan xalinayso.',
        whatItIs: 'Soo jeedin qaybineed oo lagu qorsheeyay oo aqoonsanaysa goobaha jiirka ee Baajuun iyo Qandala ee ugu mudnaanta badan in la ilaaliyo si rasmi ah, oo ku salaysan cabbirka adkaanta kulaylka ee jiirka la cabbiray.',
        whyItMatters: 'Soomaaliya hadda ma laha Aagag la Ilaaliyo oo Badeed haba yaraatee — boodh la calaamadiyay ilaa daraasad xeebeed oo taariikhi ah oo sanadkii 2000, kuna reeban jiirka ugu adag ilaalin sharci ah.',
        whoIsInvolved: 'Xarunta Jiirka Badda iyo Deegaannada Xeebaha ee Blue Ocean, oo soo saaraysa soo jeedinta qaybinta si loogu gudbiyo maamullada xeebaha ee mustaqbalka.',
        aims: 'Qaab-dhismeed MPA oo diyaar u ah in la gudbiyo, oo mudnaanta siinaya goobaha jiirka ugu adag ee kulaylka ee ilaa hadda la aqoonsaday.',
        problemStatement: 'Soomaaliya sharci ahaan ma laha Aagag la Ilaaliyo oo Badeed, taasoo ka tagaysa xitaa goobaheeda jiirka ugu adag ilaalin sharci ah oo ka hortagta qodista, dhabta, ama horumarka aan la xakumin.',
        gallery: [
          { url: '/marine_coral.jpg', caption: 'Beer jiir ah oo ku taal Jasiiradaha Baajuun.' },
          { url: '/exp_coral_snorkeling.jpg', caption: 'Kooxda sahanka oo soo ururinaya qaybo jiir ah si loo falanqeeyo hiddaha.' },
          { url: '/qandala_main.jpg', caption: 'Jiirada Qandala ee lagu daray soo jeedinta qaybinta.' },
        ],
      },
    },
  },
  {
    id: 'no-anchor-seagrass-zones',
    slug: 'no-anchor-seagrass-zones',
    title: 'No-Anchor Marine Seagrass Conservation Zones',
    focusArea: 'coral-habitat',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Protecting the carbon-rich seagrass meadows of the Lower Juba Archipelago from anchor damage.',
    editorialStatement: 'A meadow you can\'t see from the surface is still worth protecting.',
    whatItIs: 'A no-anchor zone proposal covering the seagrass meadows measured in Blue Ocean\'s blue carbon soil-core audit.',
    whyItMatters: 'Anchor damage tears through seagrass rhizome mats in seconds, undoing carbon storage that took the meadow decades to build.',
    whoIsInvolved: 'Blue Ocean\'s Coral Reef & Coastal Ecosystems Unit, coordinating with vessel operators using Kismayo Lagoon and Hafun Bay.',
    aims: 'A marked no-anchor zone across the surveyed meadow extent, with mooring alternatives in place for local vessel traffic.',
    problemStatement: 'Uncontrolled anchoring in Kismayo Lagoon and Hafun Bay is damaging seagrass meadows that store significant carbon and support foraging turtles and dugongs.',
    issueSlugs: ['habitat-degradation'],
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'Sub-tidal seagrass meadow sampled for the blue carbon audit.' },
      { url: '/jubaland.jpg', caption: 'Lower Juba Archipelago, the primary study area.' },
      { url: '/marine_turtles.jpg', caption: 'A green sea turtle foraging within the surveyed meadow.' },
    ],
    speciesSlugs: ['ribbon-seagrass', 'dugong'],
    destinationSlugs: ['kismayo', 'hafun'],
    researchProjectSlugs: ['blue-carbon-audit'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Aagagga Ilaalinta Cawska Badda ee Aan Barroosin Lahayn',
        summary: 'Ilaalinta dooxyada cawska badda ee sarreeya kaarboonka ee Jasiiradaha Juba Hoose oo ka hortagaysa waxyeelada barroosinka.',
        editorialStatement: 'Dooxo aadan dushiisa ka arki karin wali waa mid mudan in la ilaaliyo.',
        whatItIs: 'Soo jeedin aag aan barroosin lahayn oo daboolaya dooxyada cawska badda ee lagu cabbiray sahanka kaarboonka buluuga ah ee Blue Ocean.',
        whyItMatters: 'Waxyeelada barroosinku wuxuu jeexaa xididada cawska badda ilbiriqsiyo gudahood, isagoo burinaya kaydinta kaarboonka ee dooxadu qaadatay tobanaan sano inay dhisto.',
        whoIsInvolved: 'Xarunta Jiirka Badda iyo Deegaannada Xeebaha ee Blue Ocean, oo la shaqaynaysa hawlwadeenada doonyaha ee isticmaala Buuxdada Kismaayo iyo Khaliijka Hufun.',
        aims: 'Aag barroosin la mamnuucay oo daboolaya dhammaan dooxada la sahamiyay, iyo agabyo barroosin oo beddel ah oo loo diyaariyo dhaqdhaqaaqa doonyaha maxaliga ah.',
        problemStatement: 'Barroosinka aan la xakumin ee Buuxdada Kismaayo iyo Khaliijka Hufun ayaa waxyeeleynaya dooxyada cawska badda ee kaydiya kaarboon aad u badan una adeega diinta iyo dugong-ga raadinaya cunto.',
        gallery: [
          { url: '/marine_seagrass.jpg', caption: 'Doox caws bad oo hoosaadka biyaha ku yaal oo loo qaatay sahanka kaarboonka buluuga ah.' },
          { url: '/jubaland.jpg', caption: 'Jasiiradaha Juba Hoose, oo ah aagga sahanka ugu weyn.' },
          { url: '/marine_turtles.jpg', caption: 'Diin bad oo cagaaran oo raadinaysa cunto gudaha dooxada la sahamiyay.' },
        ],
      },
    },
  },
  {
    id: 'fair-trade-handline-certification',
    slug: 'fair-trade-handline-certification',
    title: 'Fair Trade Handline Certification',
    focusArea: 'sustainable-fishing',
    status: 'Active',
    region: 'Puntland',
    startDate: '2025',
    endDate: null,
    summary: 'A certification pathway for Somali artisanal handline fleets, built on a published tuna stock assessment.',
    editorialStatement: 'Sustainable catch deserves a market that recognizes it.',
    whatItIs: 'A certification program recognizing artisanal handline fleets whose yellowfin tuna catch stays within sustainable stock limits.',
    whyItMatters: 'Handline fishing is already one of the most selective methods available — certification gives fleets that use it a market advantage over less sustainable competitors.',
    whoIsInvolved: 'Blue Ocean\'s Fisheries Science Team, working directly with participating handline cooperatives in Bosaso and Bargaal.',
    aims: 'A recognized certification mark that export buyers can use to identify sustainably caught Somali handline tuna.',
    problemStatement: 'Somali artisanal handline fleets have no way to distinguish their sustainable catch in export markets that don\'t differentiate fishing method.',
    issueSlugs: ['unsustainable-fishing'],
    heroImage: '/exp_dhow_sailing.jpg',
    gallery: [
      { url: '/exp_dhow_sailing.jpg', caption: 'Traditional handline fishing vessels in the certification pathway.' },
      { url: '/marine_fish.jpg', caption: 'Yellowfin tuna landed for biometric sampling.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso fish market, a key landing and certification checkpoint.' },
    ],
    speciesSlugs: ['yellowfin-tuna'],
    destinationSlugs: ['bosaso', 'bargaal', 'kismayo'],
    researchProjectSlugs: ['fisheries-stock'],
    communitySlugs: ['bosaso-fishing-cooperative'],
    featured: false,
    translations: {
      so: {
        title: 'Shahaadada Ganacsiga Caadilka ah ee Kalluumeysiga Xadhigga',
        summary: 'Waddo shahaadeed oo loogu talagalay doonyaha kalluumeysiga dhaqameed ee Soomaaliya, oo ku dhisan qiimeyn kaydka tuna-ga oo la daabacay.',
        editorialStatement: 'Kalluumeysi waara wuxuu mudan yahay suuq aqoonsada.',
        whatItIs: 'Barnaamij shahaado ah oo aqoonsanaya doonyaha kalluumeysiga xadhigga ah ee ka soo ururiya tuna-ga yellowfin-ka intii ay ku jirto xadka kaydka waara.',
        whyItMatters: 'Kalluumeysiga xadhigga ahi horeba ayuu u yahay mid ka mid ah habab ugu doorbidan ee kalluumeysiga — shahaadadu waxay siisaa doonyaha isticmaala habkan faa\'iido suuq oo ka sarreeya kuwa aan waari doonin.',
        whoIsInvolved: 'Kooxda Sayniska Kalluumeysiga ee Blue Ocean, oo si toos ah ula shaqaynaysa iskaashatooyinka xadhigga ee Boosaaso iyo Bargaal.',
        aims: 'Astaan shahaado oo la aqoonsaday oo ay iibsadayaasha dibadda isticmaali karaan si ay u aqoonsadaan tuna-ga xadhigga ee Soomaaliya ee si waara loo qabtay.',
        problemStatement: 'Doonyaha kalluumeysiga xadhigga ee Soomaaliya ma laha hab ay kaga soocan karaan kaydkooda waara suuqyada dibadda oo aan kala sooc samayn habka kalluumeysiga.',
        gallery: [
          { url: '/exp_dhow_sailing.jpg', caption: 'Doonyo kalluumeysi dhaqameed oo xadhig isticmaala oo ku jira waddada shahaadada.' },
          { url: '/marine_fish.jpg', caption: 'Tuna yellowfin ah oo la soo dejiyay si loo qaado tijaabo baayoolaji.' },
          { url: '/bosaso2.jpg', caption: 'Suuqa kalluunka Boosaaso, oo ah meel muhiim ah oo dejin iyo hubinta shahaadada.' },
        ],
      },
    },
  },
  {
    id: 'berried-female-release-accord',
    slug: 'berried-female-release-accord',
    title: 'Berried Female Release & Size-Limit Accord',
    focusArea: 'sustainable-fishing',
    status: 'Completed',
    region: 'Puntland',
    startDate: '2022',
    endDate: '2024',
    summary: 'A community-adopted seasonal closure and release protocol that grew directly out of a completed lobster biomass study.',
    editorialStatement: 'A fishery that protects its breeders protects its future.',
    whatItIs: 'A community-adopted accord requiring the release of egg-bearing ("berried") female spiny lobsters and observing a minimum harvest size, now followed by participating cooperatives.',
    whyItMatters: 'Protecting breeding females is one of the highest-leverage actions a fishery can take — it directly safeguards the next generation\'s reproductive capacity.',
    whoIsInvolved: 'Blue Ocean\'s Fisheries Science Team and the artisanal lobster fishing cooperatives of Eyl, Hafun, and Bargaal, who co-designed and adopted the accord.',
    aims: 'A durable, community-enforced closed season and size-limit standard covering the Bari escarpment lobster fishery.',
    problemStatement: 'Spiny lobster harvesting along the Bari escarpments had no consistent protection for egg-bearing females or minimum catch sizes before this accord.',
    issueSlugs: ['unsustainable-fishing'],
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Limestone escarpments where the lobster study was conducted.' },
      { url: '/eyl1.jpg', caption: 'Eyl, a primary artisanal lobster landing site.' },
      { url: '/exp_scuba_diving.jpg', caption: 'Survey diver documenting lobster density in reef crevices.' },
    ],
    speciesSlugs: ['spiny-lobster'],
    destinationSlugs: ['eyl', 'bargaal', 'hafun'],
    researchProjectSlugs: ['lobster-sustainable-yield'],
    communitySlugs: ['eyl-traditional-knowledge-keepers'],
    featured: false,
    translations: {
      so: {
        title: 'Heshiiska Sii-daynta Dheddigyada Ukunta Sita iyo Xadka Cabbirka',
        summary: 'Xannibaad xilliyeed iyo hab sii-dayn oo bulshadu aqbashay, oo si toos ah uga soo baxay daraasad la dhammeeyay oo ku saabsan miisaanka lobster-ka.',
        editorialStatement: 'Kalluumeysi ilaaliya dhalatadiisa ayaa ilaaliya mustaqbalkiisa.',
        whatItIs: 'Heshiis bulshadu aqbashay oo shardhi ah in la sii daayo dheddigyada lobster-ka ee ukunta sita ("berried") iyo in la fuliyo cabbirka ugu yar ee la qaadan karo, hadda oo ay raacayaan iskaashatooyinka ka qayb-galay.',
        whyItMatters: 'Ilaalinta dheddigyada dhalanaya waa mid ka mid ah tallaabooyinka ugu waxtarka badan ee kalluumeysigu qaadan karo — waxay si toos ah u ilaalisaa awoodda dhalmada jiilka soo socda.',
        whoIsInvolved: 'Kooxda Sayniska Kalluumeysiga ee Blue Ocean iyo iskaashatooyinka kalluumeysiga lobster-ka ee dhaqameed ee Eyl, Hufun, iyo Bargaal, kuwaas oo wada naqshadeeyay oo aqbalay heshiiska.',
        aims: 'Heshiis xilli-xannibaad iyo xad-cabbir ah oo bulshadu fulinayso oo waara, kuna daboolan kalluumeysiga lobster-ka ee dhabta Bari.',
        problemStatement: 'Ururinta lobster-ka ee dhabta Bari wax ilaalin joogto ah lahaa lagama helin dheddigyada ukunta sita ama cabbirrada ugu yar ka hor heshiiskan.',
        gallery: [
          { url: '/exp_coastal_cliff.jpg', caption: 'Dhabta jibaale ee lagu sameeyay daraasadda lobster-ka.' },
          { url: '/eyl1.jpg', caption: 'Eyl, oo ah meel ugu weyn oo lagu soo dejiyo lobster-ka dhaqameed.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Cilmi-baare dhex-dhex ah oo diiwaan gelinaya cufnaanta lobster-ka ee godadka jiirka.' },
        ],
      },
    },
  },
  {
    id: 'southern-coast-debris-mapping',
    slug: 'southern-coast-debris-mapping',
    title: 'Marine Debris & Microplastics Mapping',
    focusArea: 'ocean-pollution',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Tracking debris density and microplastic contamination along Somalia\'s most heavily used public beaches.',
    editorialStatement: 'You can\'t clean what you haven\'t mapped.',
    whatItIs: 'An ongoing debris-density and microplastic sampling program covering Kismayo and Liido Beach, Mogadishu.',
    whyItMatters: 'Cleanup effort is limited — mapping where debris actually concentrates, and where it comes from, makes every hour of cleanup work count for more.',
    whoIsInvolved: 'Blue Ocean\'s Pollution & Water Quality Team, working with community volunteers trained in the survey protocol.',
    aims: 'A public debris-density map and a repeatable monitoring protocol that community groups can run on their own.',
    problemStatement: 'Land-based packaging and household waste dominate the debris found along Somalia\'s most heavily used public beaches, with no public map of where it concentrates.',
    issueSlugs: ['plastic-pollution', 'water-quality'],
    heroImage: '/con_beach_cleanup.jpg',
    gallery: [
      { url: '/con_beach_cleanup.jpg', caption: 'Community debris sorting during a beach survey.' },
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, one of two sites in the debris survey.' },
      { url: '/jubaland.jpg', caption: 'Kismayo coastline surveyed for debris density.' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['kismayo', 'liido-beach'],
    researchProjectSlugs: ['marine-debris-microplastics-mapping'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Khariidaynta Qashinka Badda iyo Microplastics-ka',
        summary: 'La socodka cufnaanta qashinka iyo wasakhda microplastics-ka ee xeebaha ugu isticmaalka badan ee dadweynaha Soomaaliya.',
        editorialStatement: 'Ma nadiifin kartid wax aadan khariidayn.',
        whatItIs: 'Barnaamij joogto ah oo lagu qiimeeyo cufnaanta qashinka iyo microplastics-ka ee daboolaya Kismaayo iyo Xeebta Liido, Muqdisho.',
        whyItMatters: 'Dadaalka nadaafaddu waa xaddidan — khariidaynta halka qashinku runtii ku ururo, iyo halka uu ka yimaado, ayaa saacad kasta oo nadaafad ah ka dhigaysa mid faa\'iido badan.',
        whoIsInvolved: 'Kooxda Wasakhda iyo Tayada Biyaha ee Blue Ocean, oo la shaqaynaysa mutadawiciin bulsho ah oo loo tababaray habka sahanka.',
        aims: 'Khariidad dadweyne oo cufnaanta qashinka muujinaysa, iyo hab kormeer oo dib loo celin karo oo kooxaha bulshada iyagu keligood fulin karaan.',
        problemStatement: 'Qashinka guryaha iyo baakadaha dhulka ka soo jeeda ayaa ugu badan qashinka laga helo xeebaha ugu isticmaalka badan ee dadweynaha Soomaaliya, iyadoon jirin khariidad dadweyne oo muujineysa halka uu ku ururo.',
        gallery: [
          { url: '/con_beach_cleanup.jpg', caption: 'Bulsho oo kala saaraysa qashinka intii lagu jiray sahan xeebeed.' },
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, oo ah mid ka mid ah labada goob ee sahanka qashinka.' },
          { url: '/jubaland.jpg', caption: 'Xeebta Kismaayo oo lagu sahamiyay cufnaanta qashinka.' },
        ],
      },
    },
  },
  {
    id: 'southern-coast-beach-cleanup-network',
    slug: 'southern-coast-beach-cleanup-network',
    title: 'Southern Coast Community Beach Cleanup Network',
    focusArea: 'beach-cleanup',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Quarterly volunteer-led shoreline cleanups at the two sites identified as debris hotspots by Blue Ocean\'s mapping work.',
    editorialStatement: 'The map only matters once people show up with bags.',
    whatItIs: 'A recurring, volunteer-led cleanup program at the beaches identified as debris hotspots, run in partnership with local business and community groups.',
    whyItMatters: 'Regular cleanups keep debris from breaking down into microplastics and re-entering the water — the longer waste sits, the harder it becomes to remove.',
    whoIsInvolved: 'Community volunteers, coastal business partners, and Blue Ocean\'s Pollution & Water Quality Team, who coordinate site selection using the debris map.',
    aims: 'A self-sustaining quarterly cleanup calendar covering every site flagged in the ongoing debris-density mapping work.',
    problemStatement: 'Debris identified by ongoing mapping work needs consistent, organized removal — not one-off cleanups — to keep it from breaking down into microplastics.',
    issueSlugs: ['plastic-pollution'],
    heroImage: '/con_beach_cleanup.jpg',
    gallery: [
      { url: '/con_beach_cleanup.jpg', caption: 'Volunteers sorting collected debris by category.' },
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, a recurring cleanup site.' },
      { url: '/jubaland.jpg', caption: 'Kismayo shoreline, the network\'s southern site.' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['kismayo', 'liido-beach'],
    researchProjectSlugs: ['marine-debris-microplastics-mapping'],
    communitySlugs: ['mogadishu-coastal-business-alliance'],
    featured: false,
    translations: {
      so: {
        title: 'Shabakada Nadaafadda Xeebaha ee Bulshada Koonfurta',
        summary: 'Nadaafado xeeb oo mutadawiciintu hoggaamiyaan oo saddex biloodba mar ka dhaca labada goob ee shaqada khariidaynta Blue Ocean u aqoonsatay inay yihiin meelaha qashinku ugu badan yahay.',
        editorialStatement: 'Khariidaddu waxay micno u leedahay marka dad soo bandhigo boorso.',
        whatItIs: 'Barnaamij nadaafad oo mutadawiciintu hoggaamiyaan oo ku soo noqnoqda xeebaha loo aqoonsaday inay yihiin meelaha qashinku ugu badan yahay, oo lala shaqeeyo ganacsatada iyo kooxaha bulshada maxaliga ah.',
        whyItMatters: 'Nadaafadaha joogtada ahi waxay ka hortagaan in qashinku kala jajabo microplastics uuna dib ugu noqdo biyaha — mudda uu qashinku joogo, ayaa sii adkaanaysa saarideeda.',
        whoIsInvolved: 'Mutadawiciinta bulshada, ganacsatada xeebaha, iyo Kooxda Wasakhda iyo Tayada Biyaha ee Blue Ocean, kuwaas oo isku duwa xulashada goobaha iyagoo isticmaalaya khariidada qashinka.',
        aims: 'Jadwal nadaafad saddex-biloodle ah oo iskaafiya oo daboolaya dhammaan goobaha uu shaqada khariidaynta socota calaamadiyay.',
        problemStatement: 'Qashinka uu shaqada khariidaynta socota aqoonsaday wuxuu u baahan yahay saaris joogto ah oo la habeeyay — ee aan ahayn nadaafado hal-mar ah — si looga hortago inuu kala jajabo microplastics.',
        gallery: [
          { url: '/con_beach_cleanup.jpg', caption: 'Mutadawiciin kala saaraya qashinka la soo ururiyay noocyadiisa.' },
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, oo ah goob nadaafad oo ku soo noqnoqota.' },
          { url: '/jubaland.jpg', caption: 'Xeebta Kismaayo, oo ah goobta koonfureed ee shabakadda.' },
        ],
      },
    },
  },
  {
    id: 'banaadir-ocean-literacy-guidance',
    slug: 'banaadir-ocean-literacy-guidance',
    title: 'Banaadir Public Coastal Health & Ocean Literacy Guidance',
    focusArea: 'marine-education',
    status: 'Active',
    region: 'Somalia',
    startDate: '2023',
    endDate: null,
    summary: 'Turning continuous water-quality monitoring in Mogadishu into public guidance and school-level ocean education.',
    editorialStatement: 'A capital city\'s ocean deserves the same public scrutiny as its water supply.',
    whatItIs: 'A public guidance and school outreach program built on Blue Ocean\'s continuous water-quality monitoring of the Banaadir coastline.',
    whyItMatters: 'Public health guidance is only useful if it actually reaches swimmers, fishers, and coastal schools — that translation work doesn\'t happen automatically.',
    whoIsInvolved: 'Blue Ocean\'s Pollution & Water Quality Team, coordinating with coastal schools and community groups in Mogadishu.',
    aims: 'Regularly updated public water-quality guidance, plus an ocean literacy curriculum for coastal schools.',
    problemStatement: 'Water-quality data for Mogadishu\'s coastline has historically stayed inside research files rather than reaching the swimmers, fishers, and schools who need it.',
    issueSlugs: ['water-quality', 'low-awareness'],
    heroImage: '/con_youth_education.jpg',
    gallery: [
      { url: '/con_youth_education.jpg', caption: 'A coastal ocean-literacy session with local students.' },
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, the primary continuous monitoring site.' },
      { url: '/somalia_coast.jpg', caption: 'Banaadir coastal waters covered by the guidance program.' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['mogadishu', 'liido-beach'],
    researchProjectSlugs: ['banaadir-coastal-water-quality-monitoring'],
    communitySlugs: ['mogadishu-coastal-business-alliance', 'hafun-youth-beach-guardians'],
    featured: false,
    translations: {
      so: {
        title: 'Hagitaanka Caafimaadka Xeebaha Dadweynaha iyo Aqoonta Badda ee Banaadir',
        summary: 'U beddelidda kormeerka joogtada ah ee tayada biyaha ee Muqdisho hagitaan dadweyne iyo waxbarasho badeed oo heer dugsi ah.',
        editorialStatement: 'Badweynta magaalada caasimadda ah waxay mudan tahay baaritaan dadweyne oo la mid ah kan biyaha la cabbo.',
        whatItIs: 'Barnaamij hagitaan dadweyne iyo gaadhsiin dugsiyeed oo ku dhisan kormeerka joogtada ah ee tayada biyaha ee Blue Ocean ee xeebta Banaadir.',
        whyItMatters: 'Hagitaanka caafimaadka dadweynaha waxa uu faa\'iido leeyahay kaliya markuu runtii gaadho dabaasha, kalluumeystayaasha, iyo dugsiyada xeebaha — shaqadaas turjumaad si toos ah uma dhicin.',
        whoIsInvolved: 'Kooxda Wasakhda iyo Tayada Biyaha ee Blue Ocean, oo iskaashi la leh dugsiyada xeebaha iyo kooxaha bulshada ee Muqdisho.',
        aims: 'Hagitaan tayada biyaha oo si joogto ah loo cusboonaysiiyo, iyo manhaj waxbarasho badeed oo loogu talagalay dugsiyada xeebaha.',
        problemStatement: 'Xogta tayada biyaha ee xeebta Muqdisho ayaa taariikh ahaan ku hadhay faylalka cilmi-baarista halkii ay ka gaadhi lahayd dabaasha, kalluumeystayaasha, iyo dugsiyada u baahan.',
        gallery: [
          { url: '/con_youth_education.jpg', caption: 'Fasal aqoon-badeed oo xeebeed oo lala qabtay ardayda maxaliga ah.' },
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, oo ah goobta ugu weyn ee kormeerka joogtada ah.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebeed ee Banaadir ee ay daboolayso barnaamijka hagitaanka.' },
        ],
      },
    },
  },
  {
    id: 'beach-guardian-nest-protection',
    slug: 'beach-guardian-nest-protection',
    title: 'Community Beach Guardian Nest Protection Program',
    focusArea: 'community-conservation',
    status: 'Active',
    region: 'Puntland',
    startDate: '2023',
    endDate: null,
    summary: 'Training local beach guardians to monitor sea turtle nests across the Hafun and Bajuni rookeries.',
    editorialStatement: 'The best nest protection lives on the beach, not in a research station.',
    whatItIs: 'A trained network of community "beach guardians" who monitor turtle nests, deter disturbance, and support hatchling release across two nesting rookeries.',
    whyItMatters: 'Nest monitoring only works if someone is actually on the beach during incubation — a community-based network can be there far more consistently than a research team alone.',
    whoIsInvolved: 'Blue Ocean\'s Sea Turtle Research Unit, training and coordinating with community members from Hafun and the Bajuni Archipelago.',
    aims: 'A self-sustaining local guardian network covering every active nesting beach in both rookeries, season after season.',
    problemStatement: 'Green and hawksbill turtle nests along the Hafun and Bajuni rookeries face disturbance and poor incubation outcomes without consistent, on-the-ground monitoring.',
    issueSlugs: ['wildlife-trade', 'habitat-degradation'],
    heroImage: '/marine_turtles.jpg',
    gallery: [
      { url: '/marine_turtles.jpg', caption: 'A green sea turtle grazing on seagrass in the Bajuni shallows.' },
      { url: '/hafun2.jpg', caption: 'Hafun tombolo beach, one of two rookeries monitored by guardians.' },
      { url: '/con_youth_education.jpg', caption: 'Beach guardian training session.' },
    ],
    speciesSlugs: ['green-sea-turtle', 'hawksbill-turtle'],
    destinationSlugs: ['hafun', 'kismayo', 'eyl'],
    researchProjectSlugs: ['turtle-telemetry'],
    communitySlugs: ['hafun-youth-beach-guardians'],
    featured: false,
    translations: {
      so: {
        title: 'Barnaamijka Ilaalinta Buulasha ee Ilaaliyeyaasha Xeebaha Bulshada',
        summary: 'Tababarka ilaaliyeyaal xeeb oo maxalli ah si ay u kormeeraan buulasha diinta badda ee Xeebta Hufun iyo Baajuun.',
        editorialStatement: 'Ilaalinta buul ugu wanaagsan waxay ku nooshahay xeebta, ma aha xarunta cilmi-baarista.',
        whatItIs: 'Shabakad ilaaliyeyaal xeeb ah oo la tababaray oo kormeera buulasha diinta, ka hortagta carqaladaynta, oo taageerta sii-daynta dhalatada ee labada goob ee dhalmada.',
        whyItMatters: 'Kormeerka buulashu wuxuu shaqeeyaa kaliya haddii qof runtii xeebta joogo intii ay socoto qaadka — shabakad bulsho ku salaysan ayaa xeebta joogi kara si aad uga adag kooxda cilmi-baarista keligeed.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Diinta Badda ee Blue Ocean, oo tababarta oo la shaqaynaysa dadka bulshada ee Hufun iyo Jasiiradaha Baajuun.',
        aims: 'Shabakad ilaaliye maxalli ah oo iskaafiya oo daboolaya dhammaan xeebaha buulasha firfircoon ee labada goob, xilli walba.',
        problemStatement: 'Buulasha diinta cagaaran iyo hawksbill-ka ee Xeebta Hufun iyo Baajuun waxay wajahaan carqaladayn iyo natiijooyin qaadid oo liita iyadoon jirin kormeer joogto ah oo dhulka ku fadhiya.',
        gallery: [
          { url: '/marine_turtles.jpg', caption: 'Diin bad oo cagaaran oo daaqaysa caws badeed oo hoosaadka biyaha ku yaal Baajuun.' },
          { url: '/hafun2.jpg', caption: 'Xeebta Tombolo ee Hufun, oo ah mid ka mid ah labada goob ee ilaaliyeyaashu kormeeraan.' },
          { url: '/con_youth_education.jpg', caption: 'Dugsi tababar oo loogu talagalay ilaaliyeyaasha xeebaha.' },
        ],
      },
    },
  },
  {
    id: 'illegal-fishing-monitoring',
    slug: 'illegal-fishing-monitoring',
    title: 'Eastern Bari Coast Illegal Fishing Monitoring',
    focusArea: 'illegal-fishing',
    status: 'Active',
    region: 'Puntland',
    startDate: '2025',
    endDate: null,
    summary: 'Documenting unlicensed and destructive fishing activity along Puntland\'s eastern coast to support evidence-based fisheries management.',
    editorialStatement: 'Protecting Somalia\'s waters starts with knowing exactly what is happening in them.',
    whatItIs: 'A standing monitoring effort that logs unlicensed vessel activity, destructive gear, and catch pressure along the Bosaso–Hurdiya–Qandala stretch of coast, working directly with the artisanal fishing crews who work these waters daily.',
    whyItMatters: 'Illegal and destructive fishing can strip nearshore stocks faster than they recover, undercutting the same artisanal fishers who depend on sustainable yields for their livelihoods — the effects show up in local catch first, long before they show up in any official count.',
    whoIsInvolved: 'Blue Ocean\'s Fisheries Research Unit, working alongside artisanal fishing crews and cooperatives along the eastern Bari coast.',
    aims: 'A verified, evidence-based record of fishing pressure and illegal activity that can inform sustainable fisheries management and future partnerships with government and regional fisheries bodies.',
    problemStatement: 'Unlicensed and destructive fishing activity along Puntland\'s exposed eastern coast goes largely undocumented, leaving fisheries managers and coastal communities without the evidence base needed to respond.',
    issueSlugs: ['illegal-fishing', 'unsustainable-fishing'],
    heroImage: '/marine_fish.jpg',
    gallery: [
      { url: '/marine_fish.jpg', caption: 'Reef and pelagic fish surveyed along the eastern Bari coast.' },
      { url: '/hafun1.jpg', caption: 'Coastal waters near Hurdiya, part of the monitored stretch.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso harbor, a key landing point for the region\'s fishing fleet.' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['hurdiya', 'bosaso', 'qandala'],
    researchProjectSlugs: ['fisheries-stock'],
    communitySlugs: ['bosaso-fishing-cooperative'],
    featured: true,
    translations: {
      so: {
        title: 'Kormeerka Kalluumeysiga Sharci-darrada ah ee Xeebta Bari ee Bari',
        summary: 'Diiwaangelinta howlaha kalluumeysiga aan shatiga lahayn ee wax-u-dhiman ee ka socda xeebta bari ee Puntland si loo taageero maamulka kalluumeysiga oo ku salaysan xog sax ah.',
        editorialStatement: 'Ilaalinta biyaha Soomaaliya waxay ka bilaabantaa in la ogaado sida saxda ah ee ka dhacaysa gudahooda.',
        whatItIs: 'Dadaal kormeer oo joogto ah oo diiwaangeliya dhaqdhaqaaqa doonyaha aan shatiga lahayn, qalabka wax-u-dhiman, iyo cadaadiska ururinta ee ku teedsan xeebta Boosaaso–Hurdiya–Qandala, isagoo si toos ah ula shaqaynaya kooxaha kalluumeysiga dhaqameed ee maalin walba biyahaas ka shaqeeya.',
        whyItMatters: 'Kalluumeysiga sharci-darrada ah iyo kan wax-u-dhimani wuxuu ka xayuubin karaa kaydka kalluunka xeebta ka dhow inta uu soo kabsan karo, isagoo saameynaya isla kalluumeystayaasha dhaqameed ee ku tiirsan wax-soo-saarka waara — saameynta ayaa markasta ka soo muuqata ururinta maxaliga ka hor inta aysan ka soo muuqan tirakoob rasmi ah.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Kalluumeysiga ee Blue Ocean, oo la shaqaynaysa kooxaha iyo iskaashatooyinka kalluumeysiga dhaqameed ee xeebta bari ee Bari.',
        aims: 'Diiwaan xog sax ah oo la hubiyay oo ku saabsan cadaadiska kalluumeysiga iyo dhaqdhaqaaqa sharci-darrada ah, oo lagu wargelin karo maamulka kalluumeysiga waara iyo iskaashatooyinka mustaqbalka ee dawladda iyo hay\'adaha kalluumeysiga gobolka.',
        problemStatement: 'Dhaqdhaqaaqa doonyaha aan shatiga lahayn ee wax-u-dhiman ee xeebta bari ee Puntland ee u furan dabaysha ayaa inta badan aan la diiwaangelin, taasoo ka tagaysa maamulayaasha kalluumeysiga iyo bulshooyinka xeebaha iyagoon lahayn xog ay ku jawaabaan.',
        gallery: [
          { url: '/marine_fish.jpg', caption: 'Kalluun jiir iyo kuwo badweyn ah oo lagu sahamiyay xeebta bari ee Bari.' },
          { url: '/hafun1.jpg', caption: 'Biyaha xeebeed ee u dhow Hurdiya, oo qayb ka ah xeebta la kormeerayo.' },
          { url: '/bosaso2.jpg', caption: 'Deked Boosaaso, oo ah meel muhiim ah oo lagu soo dejiyo kalluunka gobolka.' },
        ],
      },
    },
  },
  {
    id: 'sustainable-lobster-yield',
    slug: 'sustainable-lobster-yield',
    title: 'Sustainable Lobster Yield & Anti-Poaching Partnership',
    focusArea: 'illegal-fishing',
    status: 'Planned',
    region: 'Puntland',
    startDate: '2025',
    endDate: null,
    summary: 'Turning spiny lobster stock data into practical, community-led limits that keep illegal harvesting from undermining a fishery entire towns depend on.',
    editorialStatement: 'A fishery this productive is worth protecting properly.',
    whatItIs: 'A planned partnership between Blue Ocean\'s fisheries research and the lobster-fishing communities of Eyl and Hurdiya, translating stock and catch-per-unit-effort data into practical, locally agreed harvesting limits.',
    whyItMatters: 'Spiny lobster is one of the most valuable artisanal fisheries on this coast — and one of the most exposed to illegal, out-of-season harvesting by outside operators who have no stake in whether the stock survives the next decade.',
    whoIsInvolved: 'Blue Ocean\'s Fisheries Research Unit, in partnership with lobster-fishing crews and cooperatives in Eyl and Hurdiya.',
    aims: 'Community-agreed harvesting guidelines grounded in real stock data, plus a shared monitoring system to flag illegal or out-of-season activity early.',
    problemStatement: 'Illegal, unregulated lobster harvesting threatens to outpace what the fishery can sustain, without local fishers having a shared, evidence-based way to push back.',
    issueSlugs: ['illegal-fishing'],
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'Rocky reef habitat supporting the region\'s spiny lobster fishery.' },
      { url: '/eyl1.jpg', caption: 'Eyl, one of two partner communities in this fishery.' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['eyl', 'hurdiya'],
    researchProjectSlugs: ['lobster-sustainable-yield'],
    communitySlugs: [],
    featured: false,
    translations: {
      so: {
        title: 'Iskaashiga Wax-soo-saarka Waara ee Lobster-ka iyo Ka-hortagga Kalluumeysiga Sharci-darrada ah',
        summary: 'U beddelidda xogta kaydka lobster-ka xadad dhab ah oo bulshadu hoggaamiso, kuwaas oo ka hortagaya in ururinta sharci-darrada ahi burinayso kalluumeysi ay magaalooyin oo dhan ku tiirsan yihiin.',
        editorialStatement: 'Kalluumeysi wax-soo-saarkan le\'eg wuxuu mudan yahay in si sax ah loo ilaaliyo.',
        whatItIs: 'Iskaashi la qorsheeyay oo u dhexeeya cilmi-baarista kalluumeysiga ee Blue Ocean iyo bulshooyinka lobster-ka ee Eyl iyo Hurdiya, kaas oo u beddelaya xogta kaydka iyo qabashada halkii-dadaal xadad ururin oo dhab ah oo bulshadu isku raacday.',
        whyItMatters: 'Lobster-ka ayaa ah mid ka mid ah kalluumeysiyada dhaqameed ee ugu qiimaha badan ee xeebtan — waana mid ka mid ah kuwa ugu badan ee wajaha ururinta sharci-darrada ah ee xilliga aan loo oggolayn ee ay fulinayaan hawlwadeeno ka baxsan oo aan waxba ka lahayn haddii kaydku badbaado tobankii sano ee soo socda.',
        whoIsInvolved: 'Xarunta Cilmi-baarista Kalluumeysiga ee Blue Ocean, oo iskaashi la leh kooxaha iyo iskaashatooyinka lobster-ka ee Eyl iyo Hurdiya.',
        aims: 'Tilmaamo ururin oo bulshadu isku raacday oo ku salaysan xog kayd oo dhab ah, iyo nidaam kormeer oo la wadaago si loo ogaado goor hore dhaqdhaqaaq sharci-darro ah ama xilli aan la oggolayn.',
        problemStatement: 'Ururinta lobster-ka ee sharci-darrada ah iyo aan la xakumin waxay ku sii socotaa inay dhaafto waxa kalluumeysigu awoodo inuu u waarto, iyadoon kalluumeystayaasha maxaliga ahi lahayn hab wadaag ah oo xog ku saleysan oo ay wax kaga qabtaan.',
        gallery: [
          { url: '/marine_coral.jpg', caption: 'Deegaan jiir dhagax ah oo taageeraya kalluumeysiga lobster-ka gobolka.' },
          { url: '/eyl1.jpg', caption: 'Eyl, oo ah mid ka mid ah labada bulsho ee iskaashiga kalluumeysigan.' },
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
    .map((d) => ({ id: d.id, slug: d.slug, name: d.name, region: d.region, coordinates: d.coordinates }));
}

function resolveSpecies(slugs = []) {
  return slugs
    .map((slug) => speciesList.find((s) => s.slug === slug))
    .filter(Boolean)
    .map((s) => ({
      id: s.id,
      slug: s.slug,
      commonName: s.commonName,
      scientificName: s.scientificName,
      heroImage: s.heroImage,
      category: s.categoryName,
    }));
}

function resolveResearchProjects(slugs = []) {
  return slugs
    .map((slug) => researchProjects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      areaName: p.areaName,
      status: p.status,
      heroImage: p.heroImage,
      summary: p.summary,
    }));
}

function resolveCommunities(slugs = []) {
  return slugs
    .map((slug) => communities.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => ({ id: c.id, slug: c.slug, name: c.name, category: c.category, location: c.location, heroImage: c.heroImage }));
}

export const conservationProjects = rawProjects.map((p) => {
  const area = conservationFocusAreas.find((a) => a.id === p.focusArea);
  return {
    ...p,
    // English enum key, always stable — used for filtering, CSS/style
    // lookups. The `status` field above is the (possibly localized)
    // display value; this is the key that never changes with language.
    statusKey: p.status,
    focusAreaName: area?.title || p.focusArea,
    destinations: resolveDestinations(p.destinationSlugs),
    species: resolveSpecies(p.speciesSlugs),
    researchLinks: resolveResearchProjects(p.researchProjectSlugs),
    communityLinks: resolveCommunities(p.communitySlugs),
    issues: (p.issueSlugs || []).map((id) => CONSERVATION_ISSUES.find((i) => i.id === id)).filter(Boolean),
  };
});

// --- Localization ---------------------------------------------------

function localizeProject(project, language = 'en') {
  if (!project) return project;
  const localized = localize(project, language);
  const localizedArea = conservationFocusAreas.find((a) => a.id === project.focusArea);
  const localizedIssues = (project.issues || []).map((issue) => {
    const source = CONSERVATION_ISSUES.find((i) => i.id === issue.id) || issue;
    return localize(source, language);
  });
  return {
    ...localized,
    status: getStatusLabel(project.statusKey, language),
    focusAreaName: (localizedArea && localize(localizedArea, language)?.title) || localized.focusAreaName,
    issues: localizedIssues,
  };
}

function localizeProjects(list, language = 'en') {
  return (list || []).map((p) => localizeProject(p, language));
}

// --- Public helpers -----------------------------------------------------

export function getAllConservationProjects(language = 'en') {
  return localizeProjects(conservationProjects, language);
}

export function getConservationProjectBySlug(slug, language = 'en') {
  const project = conservationProjects.find((p) => p.slug === slug || p.id === slug);
  return project ? localizeProject(project, language) : undefined;
}

export function getFeaturedConservationProject(language = 'en') {
  const project = conservationProjects.find((p) => p.featured) || conservationProjects[0];
  return project ? localizeProject(project, language) : undefined;
}

export function getConservationProjectsByFocusArea(focusAreaId, language = 'en') {
  const list = !focusAreaId || focusAreaId === 'all'
    ? conservationProjects
    : conservationProjects.filter((p) => p.focusArea === focusAreaId);
  return localizeProjects(list, language);
}

export function getRelatedConservationProjects(currentSlug, limit = 3, language = 'en') {
  const current = conservationProjects.find((p) => p.slug === currentSlug || p.id === currentSlug);
  const list = !current
    ? conservationProjects.slice(0, limit)
    : conservationProjects
      .filter((p) => p.slug !== currentSlug && (p.focusArea === current.focusArea || p.region === current.region))
      .slice(0, limit);
  return localizeProjects(list, language);
}

export function getFocusAreaBySlug(slug, language = 'en') {
  const area = conservationFocusAreas.find((a) => a.slug === slug || a.id === slug);
  return area ? localize(area, language) : undefined;
}

export function getFocusAreaProjectCount(focusAreaId) {
  return conservationProjects.filter((p) => p.focusArea === focusAreaId).length;
}

// Reverse relationships — used by Research, Marine Life, and Coast
// detail pages to surface the conservation work connected to them.
export function getConservationProjectsForResearch(researchSlug, language = 'en') {
  return localizeProjects(conservationProjects.filter((p) => p.researchProjectSlugs.includes(researchSlug)), language);
}

export function getConservationProjectsForSpecies(speciesSlug, language = 'en') {
  return localizeProjects(conservationProjects.filter((p) => p.speciesSlugs.includes(speciesSlug)), language);
}

export function getConservationProjectsForDestination(destinationSlug, language = 'en') {
  return localizeProjects(conservationProjects.filter((p) => p.destinationSlugs.includes(destinationSlug)), language);
}

export function getConservationProjectsForCommunity(communitySlug, language = 'en') {
  return localizeProjects(conservationProjects.filter((p) => p.communitySlugs.includes(communitySlug)), language);
}

// Impact figures are computed directly from the data above — nothing
// here is a hand-typed statistic. Purely numeric, so no localization
// is needed.
export function getConservationImpact() {
  const uniqueDestinations = new Set();
  const uniqueSpecies = new Set();
  const uniqueCommunities = new Set();

  conservationProjects.forEach((p) => {
    p.destinationSlugs.forEach((d) => uniqueDestinations.add(d));
    p.speciesSlugs.forEach((s) => uniqueSpecies.add(s));
    p.communitySlugs.forEach((c) => uniqueCommunities.add(c));
  });

  return {
    totalProjects: conservationProjects.length,
    activeProjects: conservationProjects.filter((p) => p.status === 'Active').length,
    locations: uniqueDestinations.size,
    speciesProtected: uniqueSpecies.size,
    focusAreas: conservationFocusAreas.length,
    communitiesInvolved: uniqueCommunities.size,
  };
}
