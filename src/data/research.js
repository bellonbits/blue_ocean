// =========================================================
// Research & Scientific Discovery Data Model
// Blue Ocean Somalia — Sprint 4: Research
//
// Research team & report content is intentionally institutional
// (e.g. "Blue Ocean Fisheries Science Team") rather than named
// individuals — no real researcher photos/bios exist yet. Reports
// ship with status: 'coming-soon' since no publishable documents
// exist yet — do not add live PDF links until real files exist.
//
// i18n: every user-facing record below may carry a
// `translations: { so: { ... } }` block holding only the fields
// that differ in Somali. `localize()`/`localizeList()` (see
// ../lib/i18n/localizeData.js) merge those overrides in — nested
// objects merge key by key, arrays are replaced wholesale. Public
// getters below accept a `language` argument ('en' default) and
// return already-localized data, so consumers need no extra logic.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';
import { localize, localizeList } from '../lib/i18n/localizeData.js';

export const PROJECT_STATUSES = ['Planned', 'Active', 'Completed', 'Published'];

// Display labels for status enum keys — keys never change (used for
// filtering/routing/styling), only the rendered label is localized.
const PROJECT_STATUS_LABELS_SO = {
  Planned: 'Qorshaysan',
  Active: 'Socda',
  Completed: 'Dhammaystiran',
  Published: 'Daabacan',
};
const EXPEDITION_STATUS_LABELS_SO = {
  'coming-soon': 'Dhawaan Soo Socda',
};

export function getStatusLabel(status, language = 'en') {
  if (language !== 'so') return status;
  return PROJECT_STATUS_LABELS_SO[status] || EXPEDITION_STATUS_LABELS_SO[status] || status;
}

export function getProjectStatuses(language = 'en') {
  return PROJECT_STATUSES.map((status) => ({ value: status, label: getStatusLabel(status, language) }));
}

export const researchAreas = [
  {
    id: 'marine-biodiversity',
    slug: 'marine-biodiversity',
    title: 'Marine Biodiversity',
    description: 'Cataloguing the full spectrum of marine life and uncharted species across Somali waters.',
    image: '/marine_fish.jpg',
    tag: 'Biodiversity',
    color: 'rgba(0,201,177,0.15)',
    borderColor: 'rgba(0,201,177,0.3)',
    textColor: '#4DDFD0',
    translations: {
      so: {
        title: 'Kala Duwanaanta Nolosha Badda',
        description: 'Diiwaan gelinta noocyada kala duwan ee nolosha badda iyo noocyada aan weli la ogaan, ee ku baahsan biyaha Soomaaliyeed.',
        tag: 'Kala Duwanaanta',
      },
    },
  },
  {
    id: 'fisheries',
    slug: 'fisheries',
    title: 'Fisheries Science',
    description: 'Population dynamics, stock assessments, catch data, and sustainable marine harvest yields.',
    image: '/marine_fish.jpg',
    tag: 'Fisheries',
    color: 'rgba(99,102,241,0.15)',
    borderColor: 'rgba(99,102,241,0.3)',
    textColor: '#A5B4FC',
    translations: {
      so: {
        title: 'Sayniska Kalluumeysiga',
        description: 'Dhaqdhaqaaqa tirada kalluunka, qiimaynta kaydka, xogta soo-saarka, iyo waxsoosaarka badda ee waara.',
        tag: 'Kalluumeysiga',
      },
    },
  },
  {
    id: 'coral-reefs',
    slug: 'coral-reefs',
    title: 'Coral Reef Health',
    description: 'Monitoring reef bleaching, thermal resilience, and coral regeneration under climate shifts.',
    image: '/marine_coral.jpg',
    tag: 'Coral Reefs',
    color: 'rgba(249,115,22,0.15)',
    borderColor: 'rgba(249,115,22,0.3)',
    textColor: '#FDBA74',
    translations: {
      so: {
        title: 'Caafimaadka Jiirifka (Coral)',
        description: 'La socodka qaboojinta jiirifka, u-adkaysiga kulaylka, iyo dib-u-soo-noolaynta jiirifka marka cimilada isbedesho.',
        tag: 'Jiirifka',
      },
    },
  },
  {
    id: 'sharks-rays',
    slug: 'sharks-rays',
    title: 'Sharks & Rays',
    description: 'Population monitoring, migratory corridor mapping, and protection of apex predators.',
    image: '/marine_sharks.jpg',
    tag: 'Elasmobranchs',
    color: 'rgba(59,130,246,0.15)',
    borderColor: 'rgba(59,130,246,0.3)',
    textColor: '#93C5FD',
    translations: {
      so: {
        title: 'Sharka iyo Rayska',
        description: 'La socodka tirada, khariidadaynta jidadka u-guuritaanka, iyo ilaalinta xayawaanka ugu sarreeya silsiladda cuntada.',
        tag: 'Sharka & Rayska',
      },
    },
  },
  {
    id: 'dolphins-whales',
    slug: 'dolphins-whales',
    title: 'Dolphins & Whales',
    description: 'Acoustic monitoring, migration tracking, and population surveys of resident and migratory cetaceans.',
    image: '/marine_dolphins.jpg',
    tag: 'Cetaceans',
    color: 'rgba(2,204,254,0.15)',
    borderColor: 'rgba(2,204,254,0.3)',
    textColor: '#7DD3FC',
    translations: {
      so: {
        title: 'Dhurwaagyada iyo Nibiriyada',
        description: 'La socodka dhawaqa, raadraaca u-guuritaanka, iyo sahannada tirada dabaasha iyo tan u-guurta ee cetaceans-ka.',
        tag: 'Dhurwaag & Nibiri',
      },
    },
  },
  {
    id: 'sea-turtles',
    slug: 'sea-turtles',
    title: 'Sea Turtle Research',
    description: 'Nesting site telemetry, satellite tagging, and beach incubation recovery programs.',
    image: '/marine_turtles.jpg',
    tag: 'Sea Turtles',
    color: 'rgba(34,197,94,0.15)',
    borderColor: 'rgba(34,197,94,0.3)',
    textColor: '#86EFAC',
    translations: {
      so: {
        title: 'Cilmi-baarista Diinka Badda',
        description: 'La socodka meelaha ugxanta, calaamadaynta dayax-gacmeed, iyo barnaamijyada dib-u-soo-celinta ugxanta xeebaha.',
        tag: 'Diinka Badda',
      },
    },
  },
  {
    id: 'ocean-pollution',
    slug: 'ocean-pollution',
    title: 'Ocean Pollution',
    description: 'Mapping microplastics, marine debris accumulation, and coastal pollutant hotspots.',
    image: '/con_beach_cleanup.jpg',
    tag: 'Pollution',
    color: 'rgba(239,68,68,0.15)',
    borderColor: 'rgba(239,68,68,0.3)',
    textColor: '#FCA5A5',
    translations: {
      so: {
        title: 'Wasakhowga Badda',
        description: 'Khariidadaynta walxaha plastikada yaryar, uruurinta qashinka badda, iyo goobaha ugu sarreeya wasakhowga xeebaha.',
        tag: 'Wasakhowga',
      },
    },
  },
  {
    id: 'water-quality',
    slug: 'water-quality',
    title: 'Water Quality',
    description: 'Salinity, dissolved oxygen, pH metrics, and ocean temperature sensing across the coast.',
    image: '/somalia_coast.jpg',
    tag: 'Oceanography',
    color: 'rgba(14,165,233,0.15)',
    borderColor: 'rgba(14,165,233,0.3)',
    textColor: '#7DD3FC',
    translations: {
      so: {
        title: 'Tayada Biyaha',
        description: 'Cusbada, ogsijiinta ku milmay, heerka pH, iyo kulaylka badda ee lagu qiyaaso xeebaha oo dhan.',
        tag: 'Cilmi-badeedka',
      },
    },
  },
  {
    id: 'coastal-ecosystems',
    slug: 'coastal-ecosystems',
    title: 'Coastal Ecosystems',
    description: 'Mangrove preservation, seagrass carbon sequestration, and estuarine wetland protection.',
    image: '/marine_seagrass.jpg',
    tag: 'Ecosystems',
    color: 'rgba(132,204,22,0.15)',
    borderColor: 'rgba(132,204,22,0.3)',
    textColor: '#BEF264',
    translations: {
      so: {
        title: 'Nidaamyada Deegaanka Xeebaha',
        description: 'Ilaalinta caws-badeedka (mangrove), keydinta kaarboonka doogga badda, iyo ilaalinta dhulka qoyan ee webiyada.',
        tag: 'Nidaamyada Deegaanka',
      },
    },
  },
];

// Controlled methodology vocabulary — selected per project, not free text.
export const RESEARCH_METHODOLOGIES = [
  { id: 'field-surveys', label: 'Field Surveys', icon: 'ClipboardList', translations: { so: { label: 'Sahannada Duurka' } } },
  { id: 'underwater-surveys', label: 'Underwater Surveys', icon: 'Waves', translations: { so: { label: 'Sahannada Hoosta Biyaha' } } },
  { id: 'species-identification', label: 'Species Identification', icon: 'Fingerprint', translations: { so: { label: 'Aqoonsiga Noocyada' } } },
  { id: 'water-sampling', label: 'Water Sampling', icon: 'TestTube', translations: { so: { label: 'Tijaabinta Biyaha' } } },
  { id: 'fisheries-data', label: 'Fisheries Data Collection', icon: 'Fish', translations: { so: { label: 'Ururinta Xogta Kalluumeysiga' } } },
  { id: 'acoustic-monitoring', label: 'Acoustic Monitoring', icon: 'AudioLines', translations: { so: { label: 'La Socodka Dhawaaqa' } } },
  { id: 'photography', label: 'Photography & Photo-ID', icon: 'Camera', translations: { so: { label: 'Sawir-qaadista & Aqoonsiga Sawirka' } } },
  { id: 'geographic-mapping', label: 'Geographic Mapping', icon: 'Map', translations: { so: { label: 'Khariidadaynta Juqraafiga' } } },
  { id: 'community-knowledge', label: 'Community Knowledge', icon: 'Users', translations: { so: { label: 'Aqoonta Bulshada' } } },
];

const rawProjects = [
  {
    id: 'cetacean-monitoring',
    slug: 'cetacean-monitoring',
    title: 'Somali Cetacean Acoustic & Population Survey',
    area: 'dolphins-whales',
    status: 'Active',
    region: 'Puntland',
    startDate: '2024',
    endDate: null,
    summary: 'Mapping the life beneath Somalia’s coastal waters — tracking resident dolphin pods along the Gulf of Aden corridor.',
    editorialStatement: 'Mapping the life beneath Somalia’s coastal waters.',
    researchQuestion: 'How do resident bottlenose and spinner dolphin populations use the Gulf of Aden corridor across seasons, and where do they overlap with shipping and fishing activity?',
    purpose: 'To establish a baseline population count and movement pattern for cetaceans along the northern Somali coast, informing safe-corridor and bycatch mitigation planning.',
    geographicScope: 'Gulf of Aden coastal corridor, from Bosaso to Qandala, extending to the Bajuni shallows.',
    expectedOutcomes: 'A verified population estimate, an acoustic detection archive, and a migratory corridor map to guide future marine protected area proposals.',
    heroImage: '/marine_dolphins.jpg',
    gallery: [
      { url: '/marine_dolphins.jpg', caption: 'Spinner dolphin pod recorded during a Gulf of Aden acoustic survey.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso harbor, the primary staging point for cetacean survey vessels.' },
      { url: '/somalia_coast.jpg', caption: 'Coastal waters along the northern survey corridor.' },
    ],
    objectives: [
      'Establish a baseline population estimate for resident dolphin pods in the Gulf of Aden corridor.',
      'Deploy passive acoustic recorders to document seasonal presence and vocalization patterns.',
      'Map areas of overlap between cetacean activity and maritime shipping lanes.',
      'Build a photo-identification catalog of individually recognizable pod members.',
    ],
    methodology: ['acoustic-monitoring', 'photography', 'field-surveys', 'geographic-mapping'],
    findings: [
      { title: 'Resident pod confirmed year-round', description: 'Acoustic and visual survey data confirm a resident bottlenose dolphin pod present in the Bosaso corridor across all four survey seasons to date.', source: 'Blue Ocean Cetacean Research Unit, 2024–2025 Field Seasons' },
      { title: 'Seasonal spinner dolphin aggregations', description: 'Larger spinner dolphin aggregations were recorded between October and May, coinciding with the northeast monsoon period.', source: 'Blue Ocean Cetacean Research Unit, 2025 Season Summary' },
    ],
    speciesSlugs: ['bottlenose-dolphin'],
    destinationSlugs: ['bosaso', 'kismayo', 'qandala'],
    researchTeamSlug: 'cetacean-marine-mammal-unit',
    conservationThemes: ['Feeds directly into the Marine Mammal Migration Safe Corridors initiative'],
    featured: true,
    translations: {
      so: {
        title: 'Sahanka Dhawaaqa & Tirada Dhurwaagyada Soomaaliyeed',
        summary: 'Khariidadaynta nolosha ku dhex jirta biyaha xeebaha Soomaaliya — la socodka guutooyinka dhurwaagyada ku nool marinka Gacanka Cadmeed.',
        editorialStatement: 'Khariidadaynta nolosha ku dhex jirta biyaha xeebaha Soomaaliya.',
        researchQuestion: 'Sidee guutooyinka dhurwaagyada bottlenose iyo spinner ee ku nool u isticmaalaan marinka Gacanka Cadmeed xilliyada kala duwan, xaggeese ay isku dhex biirsadaan dhaqdhaqaaqa markabka iyo kalluumeysiga?',
        purpose: 'In la sameeyo tirakoob aasaasi ah iyo qaab-dhaqdhaqaaq oo ku saabsan xayawaanka badda ee cetaceans-ka ee xeebta woqooyi ee Soomaaliya, taasoo caawinaysa qorshaynta marino ammaan ah iyo yareynta qabashada aan ula kaca.',
        geographicScope: 'Marinka xeebaha Gacanka Cadmeed, laga bilaabo Boosaaso ilaa Qandala, oo gaaraya biyaha gacanka hoose ee Baajuni.',
        expectedOutcomes: 'Tirakoob la xaqiijiyay, kaydka ogaanshaha dhawaaqa, iyo khariidad marinka u-guuritaanka si loo hagto soo jeedinta meelaha ilaalinta badda ee mustaqbalka.',
        gallery: [
          { url: '/marine_dolphins.jpg', caption: 'Guuto dhurwaag ah oo la duubay intii lagu jiray sahan dhawaaq oo Gacanka Cadmeed ah.' },
          { url: '/bosaso2.jpg', caption: 'Deked Boosaaso, saldhigga ugu weyn ee maraakiibta sahanka cetaceans-ka.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebaha ee marinka sahanka woqooyi.' },
        ],
        objectives: [
          'In la sameeyo tirakoob aasaasi ah oo ku saabsan guutooyinka dhurwaagyada ku nool marinka Gacanka Cadmeed.',
          'In la dejiyo qalabka dhawaaqa ee aan hawlgelin si loo diiwaan geliyo joogitaanka xilliyeed iyo qaababka dhawaaqa.',
          'In la khariidadeeyo meelaha ay isku dhex biirsadaan dhaqdhaqaaqa cetaceans-ka iyo jidadka maraakiibta ganacsiga.',
          'In la dhiso diiwaan sawir-aqoonsi ah oo ay ku jiraan xubnaha guutada ee si gaar ah loo aqoonsan karo.',
        ],
        findings: [
          { title: 'La xaqiijiyay guuto joogto ah oo sanadka oo dhan jirta', description: 'Xogta sahanka dhawaaqa iyo aragtida ayaa xaqiijisay in guuto dhurwaag bottlenose ah oo joogto ah ay ku sugan tahay marinka Boosaaso xilliyada afarta sahan ee la sameeyay ilaa hadda.', source: 'Blue Ocean Cetacean Research Unit, 2024–2025 Field Seasons' },
          { title: 'Isu-imaatinka xilliyeed ee dhurwaagyada spinner', description: 'Isu-imaatimo waaweyn oo dhurwaag spinner ah ayaa la diiwaan geliyay bishii Oktoobar ilaa Maajo, taasoo la mid ah xilliga dabaysha waqooyi-bari.', source: 'Blue Ocean Cetacean Research Unit, 2025 Season Summary' },
        ],
        conservationThemes: ['Wuxuu si toos ah u gelayaa hindisaha Marino Ammaan ah ee U-guuritaanka Xayawaanka Badda'],
      },
    },
  },
  {
    id: 'acoustic-hydrophone',
    slug: 'acoustic-hydrophone',
    title: 'Somali Deep Hydrophone Acoustic Corridor Mapping',
    area: 'dolphins-whales',
    status: 'Active',
    region: 'Puntland',
    startDate: '2024',
    endDate: null,
    summary: 'Passive acoustic monitoring of humpback whale song along the deep-water Eyl Trench and Guardafui Channel migration corridor.',
    editorialStatement: 'Listening to the deep water where whales sing.',
    researchQuestion: 'When and where do humpback whales transit the Somali deep-water corridor, and how does their vocal activity vary through the migration season?',
    purpose: 'To document the timing and density of humpback whale migration through Somali waters using long-duration passive acoustic monitoring.',
    geographicScope: 'Eyl Trench and Guardafui Channel deep-water corridor.',
    expectedOutcomes: 'A seasonal acoustic activity calendar and a foundation dataset for future ship-strike risk modeling.',
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Bari coastal cliffs overlooking the deep-water humpback migration corridor.' },
      { url: '/marine_dolphins.jpg', caption: 'Mixed cetacean pods recorded transiting the Guardafui Channel.' },
      { url: '/eyl1.jpg', caption: 'Eyl, home port for hydrophone deployment and retrieval.' },
    ],
    objectives: [
      'Deploy long-duration hydrophones across the Eyl Trench and Guardafui Channel.',
      'Document the seasonal timing of humpback whale vocal activity.',
      'Cross-reference acoustic detections with known shipping lane traffic.',
      'Build a foundation dataset for future ship-strike risk assessment.',
    ],
    methodology: ['acoustic-monitoring', 'geographic-mapping'],
    findings: [
      { title: 'Peak vocal activity in winter months', description: 'Hydrophone data show a marked increase in humpback whale vocal activity between December and February, consistent with the northern migration window.', source: 'Blue Ocean Cetacean Research Unit, 2025 Acoustic Summary' },
    ],
    speciesSlugs: ['humpback-whale'],
    destinationSlugs: ['eyl', 'bosaso', 'hafun'],
    researchTeamSlug: 'cetacean-marine-mammal-unit',
    conservationThemes: ['Supports the Maritime Route Whale Collision Advisory System'],
    featured: false,
    translations: {
      so: {
        title: 'Khariidadaynta Marinka Dhawaaqa Hydrophone-ka Qoto-dheer ee Soomaaliya',
        summary: 'La socodka dhawaqa aan hawlgelin ee heesta nibiriga kubaneed ee marinka qoto-dheer ee Eyl Trench iyo Marinka Guardafui.',
        editorialStatement: 'Dhagaysiga biyaha qoto-dheer ee ay nibiriyadu ku heesaan.',
        researchQuestion: 'Goorma iyo xaggee ayay nibiriyada kubaneed ka gudbaan marinka qoto-dheer ee Soomaaliya, sideese dhaqdhaqaaqooda codku u kala duwanaadaa xilliga u-guuritaanka?',
        purpose: 'In la diiwaan geliyo waqtiga iyo tirada u-guuritaanka nibiriga kubaneed ee biyaha Soomaaliya iyada oo la isticmaalayo la socodka dhawaaqa mudada dheer.',
        geographicScope: 'Marinka qoto-dheer ee Eyl Trench iyo Marinka Guardafui.',
        expectedOutcomes: 'Jadwal dhaqdhaqaaqa dhawaaqa xilliyeed ah iyo xog aasaasi ah oo loogu talagalay qiimaynta halista kubaneysiga markabka ee mustaqbalka.',
        gallery: [
          { url: '/exp_coastal_cliff.jpg', caption: 'Dhaadhaca xeebaha Bari oo daaha ka qaadaya marinka u-guuritaanka nibiriga kubaneed ee qoto-dheer.' },
          { url: '/marine_dolphins.jpg', caption: 'Guutooyin isku dhafan oo cetaceans ah oo la duubay iyagoo ka gudbaya Marinka Guardafui.' },
          { url: '/eyl1.jpg', caption: 'Eyl, deked u ah dejinta iyo soo-celinta hydrophone-yada.' },
        ],
        objectives: [
          'In la dejiyo hydrophone-yo mudo dheer socda oo ku fidsan Eyl Trench iyo Marinka Guardafui.',
          'In la diiwaan geliyo waqtiga xilliyeed ee dhaqdhaqaaqa codka nibiriga kubaneed.',
          'In la is-barbardhigo ogaanshaha dhawaaqa iyo socodka markabka ee la yaqaan.',
          'In la dhiso xog aasaasi ah oo loogu talagalay qiimaynta halista kubaneysiga markabka ee mustaqbalka.',
        ],
        findings: [
          { title: 'Dhaqdhaqaaqa codka ugu sarreeya xilliga qabowga', description: 'Xogta hydrophone-ku waxay muujinaysaa kordhin muuqata oo dhaqdhaqaaqa codka nibiriga kubaneed ah oo dhex maray Diseembar iyo Febraayo, taasoo la mid ah xilliga u-guuritaanka waqooyi.', source: 'Blue Ocean Cetacean Research Unit, 2025 Acoustic Summary' },
        ],
        conservationThemes: ['Wuxuu taageerayaa Nidaamka Talobixinta Isku-dhaca Nibiriga ee Jidka Badda'],
      },
    },
  },
  {
    id: 'whale-shark-satellite',
    slug: 'whale-shark-satellite',
    title: 'Bari Coast Whale Shark Acoustic & Tagging Study',
    area: 'sharks-rays',
    status: 'Active',
    region: 'Puntland',
    startDate: '2023',
    endDate: null,
    summary: 'Satellite tagging and photo-ID tracking of whale sharks feeding along the seasonal Guardafui upwelling.',
    editorialStatement: 'Following the ocean’s largest fish through Somalia’s richest upwelling.',
    researchQuestion: 'What migratory routes do whale sharks follow through the Guardafui upwelling, and how long do individuals remain in Somali waters?',
    purpose: 'To satellite-tag and photo-identify whale sharks in order to understand residency time and migratory connectivity across the western Indian Ocean.',
    geographicScope: 'Cap Guardafui and Ras Asir upwelling zones, extending along the Bari pelagic shelf.',
    expectedOutcomes: 'A regional migratory connectivity map and a growing photo-ID catalog shared with regional whale shark research networks.',
    heroImage: '/marine_sharks.jpg',
    gallery: [
      { url: '/marine_sharks.jpg', caption: 'Juvenile whale shark feeding near the surface off Cap Guardafui.' },
      { url: '/exp_scuba_diving.jpg', caption: 'Research divers approaching a whale shark for photo-ID capture.' },
      { url: '/bargaal_main.jpg', caption: 'Bargaal, a seasonal whale shark feeding aggregation site.' },
    ],
    objectives: [
      'Deploy satellite tags on whale sharks encountered in the Guardafui upwelling.',
      'Build a photo-ID catalog using each shark’s unique spot pattern.',
      'Estimate residency time within Somali territorial waters.',
      'Share tagging data with regional whale shark research networks.',
    ],
    methodology: ['photography', 'species-identification', 'geographic-mapping'],
    findings: [
      { title: 'Multi-month residency confirmed', description: 'Tagged individuals showed residency periods of up to four months within the Guardafui upwelling zone before departing on longer pelagic transits.', source: 'Blue Ocean Elasmobranch Research Unit, 2024 Tagging Report' },
      { title: 'Feeding aggregation peaks December–April', description: 'Sighting frequency data confirm the strongest feeding aggregations occur between December and April, aligned with peak plankton bloom.', source: 'Blue Ocean Elasmobranch Research Unit, 2024–2025 Season Summary' },
    ],
    speciesSlugs: ['whale-shark'],
    destinationSlugs: ['bosaso', 'hafun', 'bargaal'],
    researchTeamSlug: 'elasmobranch-research-unit',
    conservationThemes: ['Supports the Horn of Africa Elasmobranch Protection Initiative'],
    featured: false,
    translations: {
      so: {
        title: 'Daraasadda Dhawaaqa & Calaamadaynta Sharka Nibiriga ee Xeebta Bari',
        summary: 'Calaamadaynta dayax-gacmeed iyo raadraaca sawir-aqoonsiga ee sharka nibiriga ee wax ka quudinaya kacsanaanta xilliyeed ee Guardafui.',
        editorialStatement: 'Raad-raacidda kalluunka ugu weyn ee badda iyada oo la marayo kacsanaanta ugu hodanka badan ee Soomaaliya.',
        researchQuestion: 'Waa maxay jidadka u-guuritaanka ee sharka nibiriga ku maraan kacsanaanta Guardafui, immisana muddo ayay shakhsiyaadku ku sugnaadaan biyaha Soomaaliya?',
        purpose: 'In sharka nibiriga lagu calaamadeeyo dayax-gacmeed loona sawir-aqoonsado si loo fahmo muddada joogitaanka iyo isku xirnaanta u-guuritaanka ee Badweynta Hindiya galbeed.',
        geographicScope: 'Aagagga kacsanaanta Cap Guardafui iyo Ras Asir, oo fidsan ilaa buurta hoose ee badda ee Bari.',
        expectedOutcomes: 'Khariidad isku xirnaanta u-guuritaanka gobolka iyo diiwaan sawir-aqoonsi oo sii kordhaya oo lala wadaagayo shabakadaha cilmi-baarista sharka nibiriga ee gobolka.',
        gallery: [
          { url: '/marine_sharks.jpg', caption: 'Sharka nibiriga oo yar oo wax ka quudinaya dushii biyaha ee Cap Guardafui agteeda.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Cilmi-baarayaal quusaya oo u soo dhawaanaya sharka nibiriga si loo qaado sawir-aqoonsi.' },
          { url: '/bargaal_main.jpg', caption: 'Bargaal, goob xilliyeed oo isu-imaatin ah oo uu ku wax cunno sharka nibiriga.' },
        ],
        objectives: [
          'In lagu dejiyo calaamado dayax-gacmeed ah sharka nibiriga laga helo kacsanaanta Guardafui.',
          'In la dhiso diiwaan sawir-aqoonsi ah iyadoo la isticmaalayo qaabka bar-bar ee gaarka ah ee shark kasta.',
          'In la qiyaaso muddada joogitaanka gudaha biyaha gobolka Soomaaliya.',
          'In xogta calaamadaynta lala wadaago shabakadaha cilmi-baarista sharka nibiriga ee gobolka.',
        ],
        findings: [
          { title: 'La xaqiijiyay joogitaan dhawr bilood ah', description: 'Shakhsiyaadka la calaamadeeyay waxay muujiyeen muddo joogitaan ah oo gaaraysa afar bilood gudaha aagga kacsanaanta Guardafui ka hor intaanay ka bixin socdaal badweyn oo dheer.', source: 'Blue Ocean Elasmobranch Research Unit, 2024 Tagging Report' },
          { title: 'Isu-imaatinka wax-cunista ayaa sare u kaca Diseembar–Abriil', description: 'Xogta soo-aragga ayaa xaqiijisay in isu-imaatimada ugu xoogga badan ay dhacaan Diseembar ilaa Abriil, taasoo la mid ah xilliga ugu sarreeya ee kobaca plankton-ka.', source: 'Blue Ocean Elasmobranch Research Unit, 2024–2025 Season Summary' },
        ],
        conservationThemes: ['Wuxuu taageerayaa Hindisaha Ilaalinta Elasmobranch-ka ee Geeska Afrika'],
      },
    },
  },
  {
    id: 'manta-photo-id',
    slug: 'manta-photo-id',
    title: 'Somali Manta Ray Photo-ID Database & Cleaning Station Registry',
    area: 'sharks-rays',
    status: 'Planned',
    region: 'Jubaland',
    startDate: '2026',
    endDate: null,
    summary: 'A planned photo-identification registry of oceanic manta rays and their reef cleaning stations across the Bajuni Archipelago.',
    editorialStatement: 'Every manta has a fingerprint — we’re building the registry to read it.',
    researchQuestion: 'How many individual manta rays use the Bajuni Archipelago’s cleaning stations, and how site-faithful are they across seasons?',
    purpose: 'To establish the first regional photo-ID registry of oceanic manta rays using their unique ventral spot patterns.',
    geographicScope: 'Bajuni Archipelago outer reef pinnacles and known cleaning station sites.',
    expectedOutcomes: 'A founding photo-ID database and a preliminary estimate of local manta ray population size.',
    heroImage: '/exp_scuba_diving.jpg',
    gallery: [
      { url: '/exp_scuba_diving.jpg', caption: 'Oceanic manta ray at a reef cleaning station in the Bajuni Archipelago.' },
      { url: '/marine_coral.jpg', caption: 'Coral pinnacle drop-off identified as a candidate cleaning station site.' },
      { url: '/jubaland.jpg', caption: 'Bajuni Archipelago waters targeted for the planned registry.' },
    ],
    objectives: [
      'Identify and map known manta ray cleaning station sites across the archipelago.',
      'Photograph ventral spot patterns to build individual identification records.',
      'Estimate site fidelity across repeated seasonal visits.',
      'Publish a preliminary local population estimate.',
    ],
    methodology: ['photography', 'species-identification', 'underwater-surveys'],
    findings: [],
    speciesSlugs: ['manta-ray'],
    destinationSlugs: ['kismayo', 'hafun', 'qandala'],
    researchTeamSlug: 'elasmobranch-research-unit',
    conservationThemes: ['Will inform the National Mobulid & Ray Trade Ban Enforcement program'],
    featured: false,
    translations: {
      so: {
        title: 'Kaydka Sawir-aqoonsiga Raysaska Manta ee Soomaaliya & Diiwaanka Goobaha Nadiifinta',
        summary: 'Diiwaan sawir-aqoonsi oo qorsheysan oo ku saabsan raysaska manta ee badweynta iyo goobahooda nadiifinta jiirifka ee ku fidsan Baajuni.',
        editorialStatement: 'Manta kasta waxay leedahay far-baaqday — waxaan dhisaynaa diiwaanka si aan u akhrino.',
        researchQuestion: 'Immisa rays manta oo shakhsi ah ayaa isticmaala goobaha nadiifinta ee Baajuni, ilaa xaggee ayay ku sugnaadaan goobahaas xilliyada kala duwan?',
        purpose: 'In la dhiso diiwaanka ugu horreeya ee gobolka ee sawir-aqoonsiga raysaska manta badweynta iyada oo la isticmaalayo qaababka bar-bar ee caloosha gaarka ah.',
        geographicScope: 'Buuraha jiirifka ee gadaasha Baajuni iyo goobaha nadiifinta ee la yaqaan.',
        expectedOutcomes: 'Kayd sawir-aqoonsi oo aasaasi ah iyo qiyaas hordhac ah oo ku saabsan tirada raysaska manta ee maxalliga ah.',
        gallery: [
          { url: '/exp_scuba_diving.jpg', caption: 'Rays manta oo badweyn ah oo ku sugan goob nadiifin oo jiirif ah oo ku taal Baajuni.' },
          { url: '/marine_coral.jpg', caption: 'Buur jiirif ah oo la aqoonsaday inay tahay goob macangag ah oo nadiifin ah.' },
          { url: '/jubaland.jpg', caption: 'Biyaha Baajuni ee bartilmaameedka diiwaanka qorshaysan.' },
        ],
        objectives: [
          'In la aqoonsado laguna khariidadeeyo goobaha nadiifinta raysaska manta ee ku fidsan gadaasha.',
          'In sawir laga qaado qaababka caloosha si loo dhiso diiwaanno aqoonsi oo gaar ah.',
          'In la qiyaaso aaminaadda goobta iyada oo la eegayo booqashooyin xilliyeed oo isdaba joog ah.',
          'In la daabaco qiyaas hordhac ah oo ku saabsan tirada maxalliga ah.',
        ],
        conservationThemes: ['Wuxuu wax ku baraysaa Barnaamijka Fulinta Mamnuucidda Ganacsiga Mobulid & Rays ee Qaranka'],
      },
    },
  },
  {
    id: 'turtle-telemetry',
    slug: 'turtle-telemetry',
    title: 'Indian Ocean Sea Turtle Satellite Telemetry & Nest Monitoring',
    area: 'sea-turtles',
    status: 'Active',
    region: 'Puntland',
    startDate: '2023',
    endDate: null,
    summary: 'Satellite tracking and nest monitoring of green sea turtles across the Hafun and Bajuni nesting rookeries.',
    editorialStatement: 'Following ancient voyagers home, one nesting season at a time.',
    researchQuestion: 'What migratory routes do nesting green sea turtles take between foraging grounds and Somali nesting beaches, and how successful are nests under current conditions?',
    purpose: 'To satellite-tag nesting females and monitor incubation outcomes across Somalia’s two most significant nesting rookeries.',
    geographicScope: 'Hafun Peninsula tombolo beaches and the Bajuni Archipelago nesting islands.',
    expectedOutcomes: 'A migratory route map linking foraging and nesting grounds, and a nest-success dataset to guide beach protection efforts.',
    heroImage: '/marine_turtles.jpg',
    gallery: [
      { url: '/marine_turtles.jpg', caption: 'Green sea turtle grazing on seagrass in Bajuni shallows.' },
      { url: '/hafun2.jpg', caption: 'Hafun tombolo beach, one of the two rookeries monitored by the project.' },
      { url: '/marine_seagrass.jpg', caption: 'Seagrass foraging habitat linked to nesting turtle movement.' },
    ],
    objectives: [
      'Deploy satellite tags on nesting female green sea turtles.',
      'Monitor nest incubation temperature and hatch success across both rookeries.',
      'Map migratory corridors between foraging grounds and nesting beaches.',
      'Train community beach guardians in nest-monitoring protocols.',
    ],
    methodology: ['field-surveys', 'species-identification', 'geographic-mapping', 'community-knowledge'],
    findings: [
      { title: 'Two-rookery migratory link confirmed', description: 'Satellite tracks confirm individual turtles moving between the Hafun and Bajuni rookeries within a single nesting season, suggesting a shared regional population.', source: 'Blue Ocean Sea Turtle Research Unit, 2025 Telemetry Report' },
    ],
    speciesSlugs: ['green-sea-turtle', 'hawksbill-turtle'],
    destinationSlugs: ['hafun', 'kismayo', 'eyl'],
    researchTeamSlug: 'sea-turtle-research-unit',
    conservationThemes: ['Directly supports the Community Beach Guardian Nest Protection Program'],
    featured: false,
    translations: {
      so: {
        title: 'Calaamadaynta Dayax-gacmeed & La Socodka Ugxanta Diinka Badda ee Badweynta Hindiya',
        summary: 'Raadraaca dayax-gacmeed iyo la socodka ugxanta diinka badda cagaaran ee ku fidsan goobaha ugxanta ee Hafun iyo Baajuni.',
        editorialStatement: 'Raad-raacidda safarayaasha qadiimiga ah ee dib ugu soo laabtaya guriga, xilli ugxan kasta.',
        researchQuestion: 'Waa maxay jidadka u-guuritaanka ee diinka badda cagaaran ee dhalanaya u qaadaan inta u dhaxaysa meelaha daaqa iyo xeebaha ugxanta Soomaaliyeed, immisase ku guuleystay ugxanta xaaladaha hadda jira?',
        purpose: 'In dhaddigyada dhalan doona lagu calaamadeeyo dayax-gacmeed lana socdo natiijooyinka sisiga ee laba-goob ee ugu muhiimsan ee ugxanta Soomaaliya.',
        geographicScope: 'Xeebaha tombolo ee Cirbaha Hafun iyo jasiiradaha ugxanta ee Baajuni.',
        expectedOutcomes: 'Khariidad marino u-guuritaanka ah oo isku xirta meelaha daaqa iyo ugxanta, iyo xog guusha ugxanta ah oo hagta dadaallada ilaalinta xeebaha.',
        gallery: [
          { url: '/marine_turtles.jpg', caption: 'Diin badda cagaaran ah oo daaqaya doogga badda ee biyaha hooseeya ee Baajuni.' },
          { url: '/hafun2.jpg', caption: 'Xeebta tombolo ee Hafun, mid ka mid ah labada goob ee mashruucu la socdo.' },
          { url: '/marine_seagrass.jpg', caption: 'Deegaanka doogga badda ee lala xiriiriyo dhaqdhaqaaqa diinka ugxanta.' },
        ],
        objectives: [
          'In lagu dejiyo calaamado dayax-gacmeed ah dhaddigyada diinka badda cagaaran ee dhalan doona.',
          'In la socdo heerkulka sisiga ugxanta iyo guusha bixidda labada goobood.',
          'In la khariidadeeyo marinada u-guuritaanka ee u dhexeeya meelaha daaqa iyo xeebaha ugxanta.',
          'In la tababaro ilaaliyayaasha xeebaha ee bulshada hab-raacyada la socodka ugxanta.',
        ],
        findings: [
          { title: 'La xaqiijiyay xiriirka u-guuritaanka labada goobood', description: 'Raadraacyada dayax-gacmeed waxay xaqiijinayaan in shakhsiyaad diin ah ay u dhaqaaqaan inta u dhaxaysa Hafun iyo Baajuni xilli ugxan hal ah gudahiis, taasoo soo jeedinaysa dad-weyne gobol oo la wadaago.', source: 'Blue Ocean Sea Turtle Research Unit, 2025 Telemetry Report' },
        ],
        conservationThemes: ['Wuxuu si toos ah u taageerayaa Barnaamijka Ilaalinta Ugxanta ee Ilaaliyayaasha Xeebaha Bulshada'],
      },
    },
  },
  {
    id: 'fisheries-stock',
    slug: 'fisheries-stock',
    title: 'Somali EEZ Pelagic Tuna Stock Assessment & Genetic Mapping',
    area: 'fisheries',
    status: 'Published',
    region: 'Puntland',
    startDate: '2022',
    endDate: '2025',
    summary: 'A completed stock assessment and genetic mapping study of yellowfin tuna across Somalia’s Exclusive Economic Zone.',
    editorialStatement: 'Understanding the fish that feed a coastline.',
    researchQuestion: 'What is the current stock status of yellowfin tuna within the Somali EEZ, and how genetically distinct is the local population from regional stocks?',
    purpose: 'To provide the first published stock assessment for yellowfin tuna in Somali waters, supporting sustainable fisheries policy.',
    geographicScope: 'Somali Exclusive Economic Zone, with concentrated sampling along the Bari coast and Guardafui Channel.',
    expectedOutcomes: 'A published stock status report and a genetic reference dataset for future fisheries management decisions.',
    heroImage: '/marine_fish.jpg',
    gallery: [
      { url: '/marine_fish.jpg', caption: 'Yellowfin tuna landed for genetic and biometric sampling.' },
      { url: '/exp_dhow_sailing.jpg', caption: 'Traditional handline fishing vessels that supported the sampling program.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso fish market, a key sampling and data collection point.' },
    ],
    objectives: [
      'Collect biometric and genetic samples from landed yellowfin tuna catches.',
      'Assess current stock status against regional Indian Ocean baselines.',
      'Determine genetic distinctiveness of the Somali EEZ population.',
      'Publish findings to inform sustainable catch-limit policy.',
    ],
    methodology: ['fisheries-data', 'species-identification', 'community-knowledge'],
    findings: [
      { title: 'Stock within sustainable range', description: 'Biomass estimates place the Somali EEZ yellowfin tuna stock within a sustainable range as of the 2025 assessment, though monitoring is recommended given regional fishing pressure.', source: 'Blue Ocean Fisheries Science Team, Published Stock Assessment, 2025' },
    ],
    speciesSlugs: ['yellowfin-tuna'],
    destinationSlugs: ['bosaso', 'bargaal', 'kismayo'],
    researchTeamSlug: 'fisheries-science-team',
    conservationThemes: ['Underpins the Fair Trade Handline Certification for Somali artisanal fleets'],
    featured: false,
    translations: {
      so: {
        title: 'Qiimaynta Kaydka Tuna-ga Badweynta & Khariidadaynta Hidde-sidaha ee EEZ Soomaaliya',
        summary: 'Qiimayn dhammaystiran oo kaydka ah iyo daraasad khariidadaynta hidde-sidaha ee tuna-ga huruudda ah ee ku fidsan Xadka Dhaqaalaha Badweynta ee Soomaaliya.',
        editorialStatement: 'Fahamka kalluunka quudiya xeebta.',
        researchQuestion: 'Waa maxay xaaladda kaydka hadda jira ee tuna-ga huruudda ah gudaha EEZ Soomaaliya, sideese u kala duwan yihiin hidde-sidaha dad-weynaha maxalliga ah iyo kuwa gobolka?',
        purpose: 'In la bixiyo qiimaynta kaydka ugu horreysa ee la daabaco ee tuna-ga huruudda ah ee biyaha Soomaaliya, taasoo taageeraysa siyaasadda kalluumeysiga waara.',
        geographicScope: 'Xadka Dhaqaalaha Badweynta ee Soomaaliya, iyada oo tijaabo si xoogan loogu geeyay xeebta Bari iyo Marinka Guardafui.',
        expectedOutcomes: 'Warbixin xaalada kaydka oo la daabacay iyo xog hidde-side oo loogu talagalay go’aannada maaraynta kalluumeysiga ee mustaqbalka.',
        gallery: [
          { url: '/marine_fish.jpg', caption: 'Tuna huruud ah oo la keenay si loo tijaabiyo hidde-side iyo qiyaasyo jir ahaaneed.' },
          { url: '/exp_dhow_sailing.jpg', caption: 'Doonyaha kalluumeysiga dhaqameed ee gacanta lagu qabsado ee taageeray barnaamijka tijaabinta.' },
          { url: '/bosaso2.jpg', caption: 'Suuqa kalluunka Boosaaso, goob muhiim ah oo tijaabo iyo ururinta xog lagu sameeyo.' },
        ],
        objectives: [
          'In laga soo ururiyo tijaabo jir ahaaneed iyo hidde-side kalluunka tuna huruudda ah ee la soo dhoofiyay.',
          'In la qiimeeyo xaalada kaydka hadda jira marka loo eego heerarka aasaasiga ah ee Badweynta Hindiya gobolka.',
          'In la go’aamiyo sida hidde-sidaha dad-weynaha EEZ Soomaaliya uga kala duwan yahay kuwa kale.',
          'In natiijooyinka la daabaco si loo wax ku baro siyaasadda xaddidaadda qabashada ee waara.',
        ],
        findings: [
          { title: 'Kayd ku dhex jira heer waara', description: 'Qiyaasyada baayoomaska waxay dhigayaan kaydka tuna-ga huruudda ah ee EEZ Soomaaliya heer waara sida ay ahayd qiimaynta 2025, in kasta oo la soo jeedinayo in la sii socodsiiyo la socodka marka la eego cadaadiska kalluumeysiga gobolka.', source: 'Blue Ocean Fisheries Science Team, Published Stock Assessment, 2025' },
        ],
        conservationThemes: ['Wuxuu saldhig u yahay Shahaadada Ganacsiga Cadaaladda ah ee Kalluumeysiga Gacanta ee Kalluumeysatada Soomaaliyeed'],
      },
    },
  },
  {
    id: 'lobster-sustainable-yield',
    slug: 'lobster-sustainable-yield',
    title: 'Horn of Africa Spiny Lobster Biomass & Catch-Per-Unit-Effort Study',
    area: 'fisheries',
    status: 'Completed',
    region: 'Puntland',
    startDate: '2022',
    endDate: '2024',
    summary: 'A completed biomass and catch-effort study of spiny lobster fisheries across the Eyl and Hafun escarpments.',
    editorialStatement: 'Measuring the health of a fishery that sustains a coast.',
    researchQuestion: 'Is current artisanal lobster harvest along the Bari escarpments within sustainable biomass limits?',
    purpose: 'To measure spiny lobster biomass and catch-per-unit-effort in order to recommend sustainable local harvest guidelines.',
    geographicScope: 'Rocky coastal escarpments of Eyl, Hafun, and Bargaal.',
    expectedOutcomes: 'A biomass baseline and catch-effort dataset used to establish seasonal closures and size limits.',
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Limestone escarpments where spiny lobster surveys were conducted.' },
      { url: '/exp_scuba_diving.jpg', caption: 'Survey diver documenting lobster density in reef crevices.' },
      { url: '/eyl1.jpg', caption: 'Eyl, a primary artisanal lobster landing site included in the study.' },
    ],
    objectives: [
      'Survey lobster density across representative escarpment transects.',
      'Record catch-per-unit-effort data from participating artisanal fishing crews.',
      'Identify size distribution of harvested versus egg-bearing females.',
      'Recommend sustainable seasonal closure windows.',
    ],
    methodology: ['underwater-surveys', 'fisheries-data', 'community-knowledge'],
    findings: [
      { title: 'Seasonal closure recommendation adopted', description: 'Study findings informed a community-adopted closed season for egg-bearing females, now observed by participating Puntland fishing cooperatives.', source: 'Blue Ocean Fisheries Science Team, Final Study Report, 2024' },
    ],
    speciesSlugs: ['spiny-lobster'],
    destinationSlugs: ['eyl', 'bargaal', 'hafun'],
    researchTeamSlug: 'fisheries-science-team',
    conservationThemes: ['Established the Community Berried Female Release & Size-Limit Accord'],
    featured: false,
    translations: {
      so: {
        title: 'Daraasadda Baayoomaska Aargoosto-yaqaanka & Dadaalka-Qabashada ee Geeska Afrika',
        summary: 'Daraasad dhammaystiran oo baayooma iyo dadaal-qabasho ah oo ku saabsan kalluumeysiga aargoosto-yaqaanka ee ku fidsan jiirarka Eyl iyo Hafun.',
        editorialStatement: 'Cabbiridda caafimaadka kalluumeysi xeeb ku noolaato.',
        researchQuestion: 'Ma ku jirtaa qabashada aargoosto-yaqaanka ee dhaqameed ee jiirarka Bari xadka baayoomaska waara?',
        purpose: 'In la cabbiro baayoomaska aargoosto-yaqaanka iyo dadaalka-qabashada si loo soo jeediyo tilmaamo qabasho maxalli ah oo waara.',
        geographicScope: 'Jiirarka xeebaha dhagaxa ah ee Eyl, Hafun, iyo Bargaal.',
        expectedOutcomes: 'Aasaas baayooma iyo xog dadaal-qabasho oo la isticmaalay si loo dejiyo xannibaadaha xilliyeed iyo xaddidaadda cabbirka.',
        gallery: [
          { url: '/exp_coastal_cliff.jpg', caption: 'Jiirarka dhagaxa ah ee lagu sameeyay sahannada aargoosto-yaqaanka.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Quusaha sahanka oo diiwaan gelinaya cufnaanta aargoosto-yaqaanka ee jarjarka jiirifka.' },
          { url: '/eyl1.jpg', caption: 'Eyl, goob koowaad oo lagu dejiyo aargoosto-yaqaanka dhaqameed oo ku jirtay daraasadda.' },
        ],
        objectives: [
          'In la sahamiyo cufnaanta aargoosto-yaqaanka ee jiirarka matalaya.',
          'In laga diiwaan geliyo xogta dadaalka-qabashada shirkadaha kalluumeysiga dhaqameed ee ka qaybqaataya.',
          'In la aqoonsado qeybinta cabbirka dhexdiisa kuwa la qabtay iyo kuwa ugxanta sida.',
          'In la soo jeediyo waqtiyada xannibaadda xilliyeed ee waara.',
        ],
        findings: [
          { title: 'Talooyinka xannibaadda xilliyeed ayaa la aqbalay', description: 'Natiijooyinka daraasadda waxay wax ku baraan xannibaad xilliyeed oo bulshadu aqbashay oo loogu talagalay dhaddigyada sita ugxanta, oo hadda ay dhawraan iskaashatooyinka kalluumeysiga Puntland ee ka qaybqaataya.', source: 'Blue Ocean Fisheries Science Team, Final Study Report, 2024' },
        ],
        conservationThemes: ['Wuxuu aasaas u yahay Heshiiska Sii-deynta Dhaddigyada Ugxanta Sita & Xaddidaadda Cabbirka ee Bulshada'],
      },
    },
  },
  {
    id: 'coral-thermal-study',
    slug: 'coral-thermal-study',
    title: 'Thermal Resilience & Coral Genotyping in the Horn of Africa',
    area: 'coral-reefs',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Genotyping and thermal-tolerance survey of Acropora coral colonies across the Bajuni and Qandala reef systems.',
    editorialStatement: 'Reading a reef’s genetic resilience before the water warms further.',
    researchQuestion: 'Which coral genotypes across the Bajuni and Qandala reefs show the greatest thermal tolerance, and can they inform future reef restoration?',
    purpose: 'To identify heat-resilient coral genotypes as a foundation for future assisted reef restoration efforts.',
    geographicScope: 'Bajuni Archipelago barrier reefs and Qandala patch reef systems.',
    expectedOutcomes: 'A genotype resilience map and a founding coral gene bank for future restoration nurseries.',
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'Pristine table and branching coral garden in the Bajuni Archipelago.' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Survey team sampling coral fragments for genetic analysis.' },
      { url: '/qandala_main.jpg', caption: 'Qandala patch reefs included in the thermal resilience survey.' },
    ],
    objectives: [
      'Sample coral fragments across Bajuni and Qandala reef sites for genetic analysis.',
      'Measure thermal tolerance thresholds for sampled genotypes.',
      'Map the geographic distribution of the most resilient genotypes.',
      'Establish a founding gene bank for future restoration nurseries.',
    ],
    methodology: ['underwater-surveys', 'species-identification', 'water-sampling', 'geographic-mapping'],
    findings: [
      { title: 'Resilient genotype cluster identified', description: 'Preliminary genotyping identified a cluster of Acropora colonies in the Qandala patch reefs with elevated thermal tolerance relative to Bajuni samples.', source: 'Blue Ocean Coral Reef Research Unit, 2025 Interim Report' },
    ],
    speciesSlugs: ['acropora-coral'],
    destinationSlugs: ['kismayo', 'qandala', 'bosaso'],
    researchTeamSlug: 'coral-coastal-ecosystems-unit',
    conservationThemes: ['Feeds the Somali Marine Protected Area (MPA) Framework & Reef Zoning'],
    featured: false,
    translations: {
      so: {
        title: 'U-adkaysiga Kulaylka & Hidde-siday Jiirifka ee Geeska Afrika',
        summary: 'Sahan hidde-side iyo u-adkaysi kulayl ah oo ku saabsan bulshooyinka jiirif Acropora ah ee ku fidsan nidaamyada jiirifka Baajuni iyo Qandala.',
        editorialStatement: 'Akhrinta u-adkaysiga hidde-sidaha ee jiirifka ka hor inta aan biyuhu sii kulaylin.',
        researchQuestion: 'Hidde-side kee ka mid ah kuwa jiirifka ee Baajuni iyo Qandala ayaa muujiya u-adkaysiga kulaylka ugu badan, ma wax ku baraan dib-u-soo-nooleynta jiirifka mustaqbalka?',
        purpose: 'In la aqoonsado hidde-sida jiirifka ee u-adkaysan kulaylka si ay aasaas u noqdaan dadaallada dib-u-soo-celinta jiirifka ee la caawiyay ee mustaqbalka.',
        geographicScope: 'Xeebaha jiirifka ee gadaasha Baajuni iyo nidaamyada jiirifka ee jaqta ee Qandala.',
        expectedOutcomes: 'Khariidad u-adkaysiga hidde-sida iyo kayd hidde-side jiirif ah oo aasaas u ah nurserida dib-u-soo-celinta ee mustaqbalka.',
        gallery: [
          { url: '/marine_coral.jpg', caption: 'Beer jiirif oo miis ah iyo mid laamood leh oo nadiif ah oo ku yaal Baajuni.' },
          { url: '/exp_coral_snorkeling.jpg', caption: 'Koox sahan ah oo qaadaya qaybo jiirif ah si loo falanqeeyo hidde-side.' },
          { url: '/qandala_main.jpg', caption: 'Jiirarka jaqta ee Qandala ee ku jira sahanka u-adkaysiga kulaylka.' },
        ],
        objectives: [
          'In laga qaado qaybo jiirif ah goobaha Baajuni iyo Qandala si loo falanqeeyo hidde-side.',
          'In la cabbiro heerarka u-adkaysiga kulaylka ee hidde-sida la tijaabiyay.',
          'In la khariidadeeyo qeybinta juqraafiga ee hidde-sida ugu adkaysan.',
          'In la aasaaso kayd hidde-side oo loogu talagalay nurserida dib-u-celinta ee mustaqbalka.',
        ],
        findings: [
          { title: 'La aqoonsaday koox hidde-side oo adkaysan', description: 'Hidde-sidaynta hordhaca ahi waxay aqoonsatay koox ka mid ah bulshooyinka Acropora ee jiirarka Qandala oo leh u-adkaysi kulayl oo sare marka loo eego muunadaha Baajuni.', source: 'Blue Ocean Coral Reef Research Unit, 2025 Interim Report' },
        ],
        conservationThemes: ['Wuxuu wax ku baraa Qaabdhismeedka Aagagga Ilaalinta Badda (MPA) Soomaaliyeed & Qeybinta Jiirifka'],
      },
    },
  },
  {
    id: 'blue-carbon-audit',
    slug: 'blue-carbon-audit',
    title: 'Somali Southern Coast Blue Carbon Sequestration & Soil Core Audit',
    area: 'coastal-ecosystems',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Measuring carbon sequestration in seagrass meadows across the Lower Juba Archipelago as a blue carbon baseline.',
    editorialStatement: 'Some of the ocean’s best carbon storage is invisible from the surface.',
    researchQuestion: 'How much carbon is stored in the seagrass meadows of the Lower Juba Archipelago, and how does this compare to regional blue carbon benchmarks?',
    purpose: 'To establish a verified blue carbon baseline for Somalia’s southern seagrass meadows.',
    geographicScope: 'Lower Juba Archipelago seagrass meadows, Kismayo Lagoon, and Hafun Bay.',
    expectedOutcomes: 'A published carbon sequestration estimate and a soil core reference dataset for future climate financing proposals.',
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'Sub-tidal seagrass meadow sampled for the blue carbon audit.' },
      { url: '/jubaland.jpg', caption: 'Lower Juba Archipelago, the primary study area.' },
      { url: '/marine_turtles.jpg', caption: 'Green sea turtle foraging within the surveyed seagrass beds.' },
    ],
    objectives: [
      'Extract sediment soil cores from representative seagrass meadow sites.',
      'Measure organic carbon content across core depth profiles.',
      'Estimate total carbon storage across the surveyed meadow extent.',
      'Compare findings against regional Western Indian Ocean blue carbon benchmarks.',
    ],
    methodology: ['water-sampling', 'field-surveys', 'geographic-mapping'],
    findings: [],
    speciesSlugs: ['ribbon-seagrass', 'dugong'],
    destinationSlugs: ['kismayo', 'hafun'],
    researchTeamSlug: 'coral-coastal-ecosystems-unit',
    conservationThemes: ['Supports No-Anchor Marine Seagrass Conservation Zones'],
    featured: false,
    translations: {
      so: {
        title: 'Baaritaanka Keydinta Kaarboonka Buluuga & Kolonyada Ciidda ee Xeebta Koonfureed ee Soomaaliya',
        summary: 'Cabbiridda keydinta kaarboonka ee doogga badda ee ku fidsan Gadaasha Jubada Hoose oo loo isticmaalayo aasaaska kaarboonka buluuga.',
        editorialStatement: 'Qaar ka mid ah kaydinta kaarboonka ugu fiican badda waa mid aan laga arki karin dushiisa.',
        researchQuestion: 'Immisa kaarboon ayaa ku kaydsan doogga badda ee Gadaasha Jubada Hoose, sideese isbarbardhig ula yeeshaa heerarka kaarboonka buluuga ee gobolka?',
        purpose: 'In la dejiyo aasaas kaarboon buluug ah oo la xaqiijiyay oo loogu talagalay doogga badda ee koonfurta Soomaaliya.',
        geographicScope: 'Doogga badda ee Gadaasha Jubada Hoose, Buundada Kismaayo, iyo Bay Hafun.',
        expectedOutcomes: 'Qiyaas keydinta kaarboonka oo la daabacay iyo xog kolon ciid ah oo loogu talagalay soo jeedinta maalgelinta cimilada ee mustaqbalka.',
        gallery: [
          { url: '/marine_seagrass.jpg', caption: 'Doog badeed oo hoosta biyaha ah oo la muunad qaaday baaritaanka kaarboonka buluuga.' },
          { url: '/jubaland.jpg', caption: 'Gadaasha Jubada Hoose, aagga ugu weyn ee daraasadda.' },
          { url: '/marine_turtles.jpg', caption: 'Diin badda cagaaran oo daaqaya gudaha beeraha doogga badda ee la sahamiyay.' },
        ],
        objectives: [
          'In laga soo saaro kolonyo ciid oo dhulka hoose ee goobaha doogga badda matalaya.',
          'In la cabbiro heerka kaarboonka dabiiciga ah ee qotada kolonka oo dhan.',
          'In la qiyaaso wadarta kaydinta kaarboonka ee ballaarinta doogga la sahamiyay.',
          'In natiijooyinka lala barbardhigo heerarka kaarboonka buluuga ee Badweynta Hindiya galbeed ee gobolka.',
        ],
        conservationThemes: ['Wuxuu taageerayaa Aagagga Ilaalinta Doogga Badda ee Aan Barbar-lahayn'],
      },
    },
  },
  {
    id: 'dugong-aerial-survey',
    slug: 'dugong-aerial-survey',
    title: 'Bajuni Archipelago Dugong Drone Acoustic & Population Survey',
    area: 'marine-biodiversity',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Drone-based aerial survey estimating dugong population size and distribution across the Bajuni seagrass channels.',
    editorialStatement: 'Counting one of East Africa’s last dugong strongholds from above.',
    researchQuestion: 'How many dugongs remain in the Bajuni Archipelago’s seagrass channels, and how is the population distributed seasonally?',
    purpose: 'To produce the first drone-based population estimate for dugongs in Somali waters, supporting habitat protection planning.',
    geographicScope: 'Sheltered seagrass channels and mangrove creeks of the Lower Juba and Bajuni Archipelago.',
    expectedOutcomes: 'A population estimate, distribution map, and habitat-use dataset to guide dugong protection zoning.',
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'Dugong feeding trail visible in a shallow seagrass meadow.' },
      { url: '/jubaland.jpg', caption: 'Sheltered mangrove creeks surveyed by drone transect.' },
      { url: '/somalia_coast.jpg', caption: 'Southern coastal waters included in the survey extent.' },
    ],
    objectives: [
      'Fly systematic drone transects across known dugong seagrass habitat.',
      'Estimate total population size from aerial sighting data.',
      'Map seasonal distribution across the surveyed channels.',
      'Identify priority zones for dugong habitat protection.',
    ],
    methodology: ['geographic-mapping', 'species-identification', 'community-knowledge'],
    findings: [
      { title: 'Small resident population confirmed', description: 'Aerial survey data confirm a small, resident dugong population using the Bajuni seagrass channels year-round, among the last known strongholds in East Africa.', source: 'Blue Ocean Marine Biodiversity Unit, 2025 Drone Survey Report' },
    ],
    speciesSlugs: ['dugong'],
    destinationSlugs: ['kismayo'],
    researchTeamSlug: 'cetacean-marine-mammal-unit',
    conservationThemes: ['Supports Zero-Gillnet Protected Corridors for Somali Sirenians'],
    featured: false,
    translations: {
      so: {
        title: 'Sahanka Diron-ka Dhawaaqa & Tirada Dugongyada ee Gadaasha Baajuni',
        summary: 'Sahan hawada ah oo diron lagu sameeyay oo qiyaasaya cabbirka iyo qaybinta dugongyada ee ku fidsan kanaalada doogga badda ee Baajuni.',
        editorialStatement: 'Tirinta mid ka mid ah kaladii ugu dambeeyay ee dugongyada Bariga Afrika, hawada laga eegayo.',
        researchQuestion: 'Immisa dugong ayaa weli ku hara kanaalada doogga badda ee Baajuni, sideese qaybintoodu u kala duwan tahay xilliyada?',
        purpose: 'In la soo saaro qiyaasta ugu horreysa ee dugongyada biyaha Soomaaliya iyada oo la isticmaalayo diron, taasoo taageeraysa qorshaynta ilaalinta deegaanka.',
        geographicScope: 'Kanaalada doogga badda ee ilaashan iyo webiyada mangrove-ka ee Jubada Hoose iyo Gadaasha Baajuni.',
        expectedOutcomes: 'Qiyaas tiro, khariidad qaybin, iyo xog isticmaalka deegaanka oo hagta qeybinta ilaalinta dugongyada.',
        gallery: [
          { url: '/marine_seagrass.jpg', caption: 'Raadka quudinta dugong oo ka muuqda doog badeed oo hoose.' },
          { url: '/jubaland.jpg', caption: 'Webiyada mangrove-ka ee ilaashan ee lagu sahamiyay diron.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebaha koonfureed ee ku jira ballaarinta sahanka.' },
        ],
        objectives: [
          'In lagu duulo diron xariiqyo joogto ah oo ku saabsan deegaanka doogga badda ee dugongyadu yaqaanaan.',
          'In laga qiyaaso wadarta tirada iyadoo la eegayo xogta aragga hawada.',
          'In la khariidadeeyo qaybinta xilliyeed ee kanaalada la sahamiyay.',
          'In la aqoonsado aagagga mudnaanta ilaalinta deegaanka dugongyada.',
        ],
        findings: [
          { title: 'La xaqiijiyay dad-weyne yar oo joogto ah', description: 'Xogta sahanka hawada ayaa xaqiijinaysa dad-weyne dugong ah oo yar oo joogto ah kana isticmaalaya kanaalada doogga badda ee Baajuni sanadka oo dhan, oo ka mid ah kaladii ugu dambeeyay ee la yaqaan ee Bariga Afrika.', source: 'Blue Ocean Marine Biodiversity Unit, 2025 Drone Survey Report' },
        ],
        conservationThemes: ['Wuxuu taageerayaa Marinada Ilaalinta ee Aan Shabag-Toos Lahayn ee Sirenians-ka Soomaaliyeed'],
      },
    },
  },
  {
    id: 'kismayo-beach-cleanup',
    slug: 'marine-debris-microplastics-mapping',
    title: 'Southern Coast Marine Debris & Microplastics Mapping',
    area: 'ocean-pollution',
    status: 'Active',
    region: 'Jubaland',
    startDate: '2024',
    endDate: null,
    summary: 'Community-partnered mapping of marine debris and microplastic contamination along Kismayo and Liido Beach.',
    editorialStatement: 'You can’t clean what you haven’t mapped.',
    researchQuestion: 'Where along the southern Somali coastline is marine debris and microplastic contamination most concentrated, and what are its likely sources?',
    purpose: 'To build the first debris density map for Somalia’s most heavily used public beaches, in partnership with local communities.',
    geographicScope: 'Kismayo shoreline and Liido Beach, Mogadishu.',
    expectedOutcomes: 'A debris density map and a community beach-monitoring protocol for ongoing tracking.',
    heroImage: '/con_beach_cleanup.jpg',
    gallery: [
      { url: '/con_beach_cleanup.jpg', caption: 'Community beach cleanup and debris sorting event.' },
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, one of two sites included in the debris survey.' },
      { url: '/jubaland.jpg', caption: 'Kismayo coastline surveyed for debris density.' },
    ],
    objectives: [
      'Conduct standardized debris transect counts at both survey beaches.',
      'Sample sand for microplastic contamination at set intervals.',
      'Identify likely debris source categories (land-based vs. marine).',
      'Train community volunteers in a repeatable monitoring protocol.',
    ],
    methodology: ['field-surveys', 'water-sampling', 'community-knowledge'],
    findings: [
      { title: 'Land-based debris dominant', description: 'Debris composition surveys found land-based sources — packaging and household waste — to be the dominant contributor at both survey sites, ahead of fishing-gear debris.', source: 'Blue Ocean Pollution & Water Quality Team, 2025 Survey Summary' },
    ],
    speciesSlugs: [],
    destinationSlugs: ['kismayo', 'liido-beach'],
    researchTeamSlug: 'pollution-water-quality-team',
    conservationThemes: ['Directly resourced by community beach cleanup partnerships'],
    featured: false,
    translations: {
      so: {
        title: 'Khariidadaynta Qashinka Badda & Walxaha Plastikada Yaryar ee Xeebta Koonfureed',
        summary: 'Khariidadayn iskaashi bulsho ah oo qashinka badda iyo wasakhowga walxaha plastikada yaryar ee ku fidsan Kismaayo iyo Xeebta Liido.',
        editorialStatement: 'Ma nadiifin kartid wax aadan khariidadayn.',
        researchQuestion: 'Xaggee ayaa xeebta koonfureed ee Soomaaliya ugu badan tahay uruurinta qashinka badda iyo walxaha plastikada yaryar, waase maxay ilaha suurtagalka ah?',
        purpose: 'In la dhiso khariidadda ugu horreysa ee cufnaanta qashinka ee xeebaha ugu isticmaalka badan Soomaaliya, iyadoo lala shaqeynayo bulshooyinka maxalliga ah.',
        geographicScope: 'Xeebta Kismaayo iyo Xeebta Liido, Muqdisho.',
        expectedOutcomes: 'Khariidad cufnaanta qashinka iyo hab-raac la socod bulsho oo joogto ah oo xeebaha.',
        gallery: [
          { url: '/con_beach_cleanup.jpg', caption: 'Munaasabad nadiifinta xeebaha bulshada iyo kala saarista qashinka.' },
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, mid ka mid ah labada goob ee sahanka qashinka lagu sameeyay.' },
          { url: '/jubaland.jpg', caption: 'Xeebta Kismaayo ee la sahamiyay cufnaanta qashinka.' },
        ],
        objectives: [
          'In la sameeyo tirakoobyo qashin oo caadi ah oo labada xeeb ee sahanka lagu sameeyo.',
          'In laga qaado muunado ciid xagaal marmar ah si loo tijaabiyo walxaha plastikada yaryar.',
          'In la aqoonsado noocyada ilaha qashinka ee suurtagalka ah (dhulka ka yimid iyo kuwa badda ka yimid).',
          'In la tababaro mutadawiciinta bulshada hab-raac la socod oo dib loo celin karo.',
        ],
        findings: [
          { title: 'Qashinka dhulka ka yimid ayaa ugu badan', description: 'Sahannada qaybinta qashinka waxay heleen in ilaha dhulka ka yimid — baakadaha iyo qashinka guryaha — ay yihiin kuwa ugu waxqabadka badan ee labada goob, kuwaas oo ka horreeya qashinka qalabka kalluumeysiga.', source: 'Blue Ocean Pollution & Water Quality Team, 2025 Survey Summary' },
        ],
        conservationThemes: ['Wuxuu si toos ah u helaa kheyraadka iskaashiga nadiifinta xeebaha ee bulshada'],
      },
    },
  },
  {
    id: 'banaadir-coastal-water',
    slug: 'banaadir-coastal-water-quality-monitoring',
    title: 'Banaadir Coastal Water Quality & Oceanographic Monitoring',
    area: 'water-quality',
    status: 'Active',
    region: 'Somalia',
    startDate: '2023',
    endDate: null,
    summary: 'Continuous monitoring of salinity, dissolved oxygen, and temperature along Mogadishu’s urban coastline.',
    editorialStatement: 'A capital city’s ocean deserves the same scrutiny as its water supply.',
    researchQuestion: 'How do salinity, dissolved oxygen, and temperature along the Banaadir coastline vary through the year, and what does that mean for swimmers and coastal fisheries?',
    purpose: 'To establish continuous baseline water quality monitoring for Somalia’s most heavily used urban coastline.',
    geographicScope: 'Mogadishu coastline, including Liido Beach and the central harbor waters.',
    expectedOutcomes: 'A continuously updated water quality baseline supporting public health guidance and fisheries monitoring.',
    heroImage: '/mogadishu_beach.jpg',
    gallery: [
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, Mogadishu — the primary continuous monitoring site.' },
      { url: '/somalia_coast.jpg', caption: 'Banaadir coastal waters included in the monitoring program.' },
      { url: '/marine_fish.jpg', caption: 'Fish market catch data referenced alongside water quality trends.' },
    ],
    objectives: [
      'Maintain continuous salinity, dissolved oxygen, and temperature sensing.',
      'Establish a seasonal baseline for Banaadir coastal water conditions.',
      'Flag anomalies that may indicate pollution or runoff events.',
      'Share findings with public health and fisheries stakeholders.',
    ],
    methodology: ['water-sampling', 'field-surveys'],
    findings: [],
    speciesSlugs: [],
    destinationSlugs: ['mogadishu', 'liido-beach'],
    researchTeamSlug: 'pollution-water-quality-team',
    conservationThemes: ['Informs Blue Ocean’s public coastal health guidance'],
    featured: false,
    translations: {
      so: {
        title: 'La Socodka Tayada Biyaha Xeebaha & Cilmi-badeedka ee Banaadir',
        summary: 'La socodka joogtada ah ee cusbada, ogsijiinta ku milmay, iyo heerkulka xeebta magaalada Muqdisho.',
        editorialStatement: 'Badda caasimadda ah waxay u qalantaa in la baaro sida biyaha la cabbo.',
        researchQuestion: 'Sidee cusbada, ogsijiinta ku milmay, iyo heerkulka xeebta Banaadir ugu kala duwan yihiin sanadka gudihiisa, wax maxayse ka dhigan tahay dabaashada iyo kalluumeysiga xeebaha?',
        purpose: 'In la dejiyo la socod aasaasi ah oo joogto ah oo tayada biyaha ee xeebta ugu isticmaalka badan magaalada Soomaaliya.',
        geographicScope: 'Xeebta Muqdisho, oo ay ku jiraan Xeebta Liido iyo biyaha deked dhexe.',
        expectedOutcomes: 'Aasaas tayada biyaha oo si joogto ah loo cusboonaysiiyo oo taageeraya talobixinta caafimaadka bulshada iyo la socodka kalluumeysiga.',
        gallery: [
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, Muqdisho — goobta koowaad ee la socodka joogtada ah.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebaha Banaadir ee ku jira barnaamijka la socodka.' },
          { url: '/marine_fish.jpg', caption: 'Xogta suuqa kalluunka oo lala barbardhigay isbedelka tayada biyaha.' },
        ],
        objectives: [
          'In la sii wado dareemayaasha joogtada ah ee cusbada, ogsijiinta ku milmay, iyo heerkulka.',
          'In la dejiyo aasaas xilliyeed oo ku saabsan xaaladaha biyaha xeebta Banaadir.',
          'In la calaamadeeyo wax-ka-baxsan oo tilmaamaya wasakhowga ama daadinta biyaha.',
          'In natiijooyinka lala wadaago xiriirka caafimaadka bulshada iyo kalluumeysiga.',
        ],
        conservationThemes: ['Wuxuu wax ku baraa hagitaanka caafimaadka xeebaha ee Blue Ocean bulshada'],
      },
    },
  },
];

export const researchTeams = [
  {
    id: 'cetacean-marine-mammal-unit',
    slug: 'cetacean-marine-mammal-unit',
    name: 'Cetacean & Marine Mammal Research Unit',
    focusAreas: ['dolphins-whales', 'marine-biodiversity'],
    description: 'Coordinates acoustic monitoring, photo-identification, and population survey work for dolphins, whales, and dugongs across the Somali coast.',
    icon: 'Anchor',
    translations: {
      so: {
        name: 'Xarunta Cilmi-baarista Dhurwaagyada & Xayawaanka Badda',
        description: 'Isku duwaysa la socodka dhawaqa, aqoonsiga sawirka, iyo shaqada sahannada tirada ee dhurwaagyada, nibiriyada, iyo dugongyada ku dhex jira xeebta Soomaaliyeed.',
      },
    },
  },
  {
    id: 'elasmobranch-research-unit',
    slug: 'elasmobranch-research-unit',
    name: 'Elasmobranch Research Unit',
    focusAreas: ['sharks-rays'],
    description: 'Leads satellite tagging, photo-ID, and cleaning-station research for sharks and rays across Somalia’s pelagic waters.',
    icon: 'Waves',
    translations: {
      so: {
        name: 'Xarunta Cilmi-baarista Sharka & Rayska',
        description: 'Hoggaamisa calaamadaynta dayax-gacmeed, aqoonsiga sawirka, iyo cilmi-baarista goobaha nadiifinta ee sharka iyo rayska ee biyaha badweynta Soomaaliya.',
      },
    },
  },
  {
    id: 'sea-turtle-research-unit',
    slug: 'sea-turtle-research-unit',
    name: 'Sea Turtle Research Unit',
    focusAreas: ['sea-turtles'],
    description: 'Runs satellite telemetry and nest-monitoring programs across Somalia’s two primary turtle nesting rookeries.',
    icon: 'Compass',
    translations: {
      so: {
        name: 'Xarunta Cilmi-baarista Diinka Badda',
        description: 'Wadata barnaamijyada calaamadaynta dayax-gacmeed iyo la socodka ugxanta ee laba goobood oo weyn oo ugxanta diinka ee Soomaaliya.',
      },
    },
  },
  {
    id: 'fisheries-science-team',
    slug: 'fisheries-science-team',
    name: 'Fisheries Science Team',
    focusAreas: ['fisheries'],
    description: 'Conducts stock assessments, catch-effort studies, and genetic sampling in partnership with artisanal fishing cooperatives.',
    icon: 'Fish',
    translations: {
      so: {
        name: 'Kooxda Sayniska Kalluumeysiga',
        description: 'Waxay fulisaa qiimaynta kaydka, daraasadaha dadaalka-qabashada, iyo tijaabooyinka hidde-sidaha, iyada oo la shaqaynaysa iskaashatooyinka kalluumeysiga hoose.',
      },
    },
  },
  {
    id: 'coral-coastal-ecosystems-unit',
    slug: 'coral-coastal-ecosystems-unit',
    name: 'Coral Reef & Coastal Ecosystems Unit',
    focusAreas: ['coral-reefs', 'coastal-ecosystems'],
    description: 'Studies coral thermal resilience, seagrass blue carbon storage, and mangrove ecosystem health.',
    icon: 'Sprout',
    translations: {
      so: {
        name: 'Xarunta Jiirifka & Nidaamyada Deegaanka Xeebaha',
        description: 'Waxay bartaa u-adkaysiga kulaylka ee jiirifka, keydinta kaarboonka doogga badda, iyo caafimaadka nidaamka deegaanka mangrove.',
      },
    },
  },
  {
    id: 'pollution-water-quality-team',
    slug: 'pollution-water-quality-team',
    name: 'Ocean Pollution & Water Quality Monitoring Team',
    focusAreas: ['ocean-pollution', 'water-quality'],
    description: 'Tracks marine debris, microplastics, and coastal water quality across Somalia’s most heavily used shorelines.',
    icon: 'Droplets',
    translations: {
      so: {
        name: 'Kooxda La Socodka Wasakhowga Badda & Tayada Biyaha',
        description: 'Waxay la socotaa qashinka badda, walxaha plastikada ee yaryar, iyo tayada biyaha xeebaha ee ugu isticmaalka badan Soomaaliya.',
      },
    },
  },
];

const rawExpeditions = [
  {
    id: 'whale-shark-tagging-expedition',
    slug: 'whale-shark-tagging-expedition',
    title: 'Guardafui Whale Shark Tagging Expedition',
    location: 'Cap Guardafui, Puntland',
    region: 'Puntland',
    dates: 'To Be Announced',
    duration: '7 Days',
    purpose: 'Join the Elasmobranch Research Unit for satellite tagging and photo-ID fieldwork during the seasonal whale shark aggregation.',
    area: 'sharks-rays',
    speciesSlugs: ['whale-shark'],
    researchTeamSlug: 'elasmobranch-research-unit',
    requirements: ['Advanced open-water diving certification', 'Comfortable in open-ocean conditions'],
    status: 'coming-soon',
    translations: {
      so: {
        title: 'Safarka Calaamadaynta Sharka Nibiriga ee Guardafui',
        dates: 'Weli Lama Go’aamin',
        duration: '7 Maalmood',
        purpose: 'Ku biir Xarunta Cilmi-baarista Sharka & Rayska si aad uga qaybqaadato calaamadaynta dayax-gacmeed iyo shaqada sawir-aqoonsiga xilliga isu-imaatinka xilliyeed ee sharka nibiriga.',
        requirements: ['Shahaadada quusidda hoose ee sare', 'Ku raaxaysan xaaladaha badweynta furan'],
      },
    },
  },
  {
    id: 'coral-reef-survey-expedition',
    slug: 'coral-reef-survey-expedition',
    title: 'Bajuni Coral Reef Survey Expedition',
    location: 'Bajuni Archipelago, Jubaland',
    region: 'Jubaland',
    dates: 'To Be Announced',
    duration: '6 Days',
    purpose: 'Assist the Coral Reef & Coastal Ecosystems Unit with genotype sampling and thermal resilience field surveys.',
    area: 'coral-reefs',
    speciesSlugs: ['acropora-coral'],
    researchTeamSlug: 'coral-coastal-ecosystems-unit',
    requirements: ['Open-water diving certification', 'Underwater survey training provided on arrival'],
    status: 'coming-soon',
    translations: {
      so: {
        title: 'Safarka Sahanka Jiirifka ee Baajuni',
        dates: 'Weli Lama Go’aamin',
        duration: '6 Maalmood',
        purpose: 'Ka caawi Xarunta Jiirifka & Nidaamyada Deegaanka Xeebaha shaqada hidde-sidaynta iyo sahannada duurka ee u-adkaysiga kulaylka.',
        requirements: ['Shahaadada quusidda biyaha furan', 'Tababarka sahanka hoosta biyaha ayaa la siin doonaa marka la yimaado'],
      },
    },
  },
  {
    id: 'turtle-nesting-fieldwork',
    slug: 'turtle-nesting-fieldwork',
    title: 'Hafun Sea Turtle Nesting Season Fieldwork',
    location: 'Hafun Peninsula, Puntland',
    region: 'Puntland',
    dates: 'To Be Announced',
    duration: '10 Days',
    purpose: 'Support nest monitoring, hatchling release, and community beach guardian training during the peak nesting season.',
    area: 'sea-turtles',
    speciesSlugs: ['green-sea-turtle', 'hawksbill-turtle'],
    researchTeamSlug: 'sea-turtle-research-unit',
    requirements: ['No diving certification required', 'Comfortable with early-morning and overnight beach fieldwork'],
    status: 'coming-soon',
    translations: {
      so: {
        title: 'Shaqada Duurka ee Xilliga Ugxanta Diinka Badda ee Hafun',
        dates: 'Weli Lama Go’aamin',
        duration: '10 Maalmood',
        purpose: 'Taageer la socodka ugxanta, sii deynta dhalaalka, iyo tababarka ilaaliyayaasha xeebaha bulshada xilliga ugu sarreeya ee ugxanta.',
        requirements: ['Shahaado quusid lama baahna', 'Ku raaxaysan shaqada xeebaha ee aroortii hore iyo habeenkii'],
      },
    },
  },
  {
    id: 'cetacean-acoustic-voyage',
    slug: 'cetacean-acoustic-voyage',
    title: 'Gulf of Aden Cetacean Acoustic Monitoring Voyage',
    location: 'Bosaso to Qandala, Puntland',
    region: 'Puntland',
    dates: 'To Be Announced',
    duration: '5 Days',
    purpose: 'Join a boat-based survey deploying hydrophones and conducting dolphin photo-ID along the Gulf of Aden corridor.',
    area: 'dolphins-whales',
    speciesSlugs: ['bottlenose-dolphin', 'humpback-whale'],
    researchTeamSlug: 'cetacean-marine-mammal-unit',
    requirements: ['No diving certification required', 'Comfortable with multi-day boat travel'],
    status: 'coming-soon',
    translations: {
      so: {
        title: 'Safarka Badda ee La Socodka Dhawaaqa Cetaceans-ka ee Gacanka Cadmeed',
        dates: 'Weli Lama Go’aamin',
        duration: '5 Maalmood',
        purpose: 'Ku biir sahan lagu sameeyo doon oo dejinaya hydrophone-yo isla markaana samaynaya sawir-aqoonsiga dhurwaagyada ee marinka Gacanka Cadmeed.',
        requirements: ['Shahaado quusid lama baahna', 'Ku raaxaysan socdaalka doonta ee dhowr maalmood ah'],
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

const DEFAULT_TEAM_NAME = { en: 'Blue Ocean Research Team', so: 'Kooxda Cilmi-baarista Blue Ocean' };
const REPORT_TITLE_SUFFIX = { en: 'Progress Summary', so: 'Soo Koobka Horumarka' };

// --- Language-aware builders ------------------------------------------

export function getResearchAreas(language = 'en') {
  return localizeList(researchAreas, language);
}

export function getResearchMethodologies(language = 'en') {
  return localizeList(RESEARCH_METHODOLOGIES, language);
}

export function getResearchTeamsBase(language = 'en') {
  return localizeList(researchTeams, language);
}

function buildProjects(language = 'en') {
  const areas = getResearchAreas(language);
  const teams = getResearchTeamsBase(language);
  const methodologies = getResearchMethodologies(language);
  const defaultTeamName = DEFAULT_TEAM_NAME[language] || DEFAULT_TEAM_NAME.en;

  return localizeList(rawProjects, language).map((p) => {
    const area = areas.find((a) => a.id === p.area);
    const team = teams.find((t) => t.id === p.researchTeamSlug);
    return {
      ...p,
      areaName: area?.title || p.area,
      areaTag: area?.tag,
      researchTeamName: team?.name || defaultTeamName,
      destinations: resolveDestinations(p.destinationSlugs),
      species: resolveSpecies(p.speciesSlugs),
      methodologyDetails: (p.methodology || [])
        .map((id) => methodologies.find((m) => m.id === id))
        .filter(Boolean),
    };
  });
}

function buildExpeditions(language = 'en') {
  const areas = getResearchAreas(language);
  const teams = getResearchTeamsBase(language);
  const defaultTeamName = DEFAULT_TEAM_NAME[language] || DEFAULT_TEAM_NAME.en;

  return localizeList(rawExpeditions, language).map((e) => {
    const area = areas.find((a) => a.id === e.area);
    const team = teams.find((t) => t.id === e.researchTeamSlug);
    return {
      ...e,
      areaName: area?.title || e.area,
      researchTeamName: team?.name || defaultTeamName,
      species: resolveSpecies(e.speciesSlugs),
    };
  });
}

function buildTeamsResolved(language = 'en') {
  const teams = getResearchTeamsBase(language);
  const areas = getResearchAreas(language);
  const projects = buildProjects(language);
  return teams.map((t) => ({
    ...t,
    focusAreaDetails: t.focusAreas.map((id) => areas.find((a) => a.id === id)).filter(Boolean),
    projects: projects.filter((p) => p.researchTeamSlug === t.id),
  }));
}

// Reports — all status: 'coming-soon' since no publishable documents exist yet.
function buildReports(language = 'en') {
  const projects = buildProjects(language);
  const suffix = REPORT_TITLE_SUFFIX[language] || REPORT_TITLE_SUFFIX.en;
  return projects
    .filter((p) => ['Active', 'Completed', 'Published'].includes(p.status))
    .map((p) => ({
      id: `${p.id}-report`,
      slug: `${p.slug}-report`,
      title: `${p.title} — ${suffix}`,
      author: p.researchTeamName,
      publicationYear: p.startDate,
      projectSlug: p.slug,
      projectTitle: p.title,
      area: p.area,
      areaName: p.areaName,
      category: p.areaName,
      summary: p.summary,
      status: 'coming-soon',
    }));
}

// English-default eager exports — kept for backward compatibility with
// consumers (e.g. src/data/news.js, src/data/conservation.js) that
// cross-reference this raw, unlocalized data.
export const researchProjects = buildProjects('en');
export const expeditions = buildExpeditions('en');
export const researchTeamsResolved = buildTeamsResolved('en');
export const researchReports = buildReports('en');

// --- Public helpers -----------------------------------------------------

export function getAllProjects(language = 'en') {
  return language === 'en' ? researchProjects : buildProjects(language);
}

export function getProjectBySlug(slug, language = 'en') {
  return getAllProjects(language).find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedProject(language = 'en') {
  const projects = getAllProjects(language);
  return projects.find((p) => p.featured) || projects[0];
}

export function getProjectsByArea(areaId, language = 'en') {
  const projects = getAllProjects(language);
  if (!areaId || areaId === 'all') return projects;
  return projects.filter((p) => p.area === areaId);
}

export function getRelatedProjects(currentSlug, limit = 3, language = 'en') {
  const projects = getAllProjects(language);
  const current = projects.find((p) => p.slug === currentSlug || p.id === currentSlug);
  if (!current) return projects.slice(0, limit);
  return projects
    .filter((p) => p.slug !== currentSlug && (p.area === current.area || p.region === current.region))
    .slice(0, limit);
}

export function getAreaBySlug(slug, language = 'en') {
  return getResearchAreas(language).find((a) => a.slug === slug || a.id === slug);
}

export function getProjectCountByArea(areaId) {
  return researchProjects.filter((p) => p.area === areaId).length;
}

export function getAllReports(language = 'en') {
  return language === 'en' ? researchReports : buildReports(language);
}

export function getReportBySlug(slug, language = 'en') {
  return getAllReports(language).find((r) => r.slug === slug);
}

export function getAllTeams(language = 'en') {
  return language === 'en' ? researchTeamsResolved : buildTeamsResolved(language);
}

export function getTeamBySlug(slug, language = 'en') {
  return getAllTeams(language).find((t) => t.slug === slug || t.id === slug);
}

export function getAllExpeditions(language = 'en') {
  return language === 'en' ? expeditions : buildExpeditions(language);
}

export function getExpeditionBySlug(slug, language = 'en') {
  return getAllExpeditions(language).find((e) => e.slug === slug || e.id === slug);
}

export function getResearchStats() {
  const uniqueSpecies = new Set();
  const uniqueDestinations = new Set();
  researchProjects.forEach((p) => {
    p.speciesSlugs.forEach((s) => uniqueSpecies.add(s));
    p.destinationSlugs.forEach((d) => uniqueDestinations.add(d));
  });

  return {
    totalProjects: researchProjects.length,
    activeProjects: researchProjects.filter((p) => p.status === 'Active').length,
    speciesObserved: uniqueSpecies.size,
    researchSites: uniqueDestinations.size,
    researchAreasCount: researchAreas.length,
    researchTeamsCount: researchTeams.length,
  };
}
