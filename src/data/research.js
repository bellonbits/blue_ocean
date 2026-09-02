// =========================================================
// Research & Scientific Discovery Data Model
// Blue Ocean Somalia — Sprint 4: Research
//
// Research team & report content is intentionally institutional
// (e.g. "Blue Ocean Fisheries Science Team") rather than named
// individuals — no real researcher photos/bios exist yet. Reports
// ship with status: 'coming-soon' since no publishable documents
// exist yet — do not add live PDF links until real files exist.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';

export const PROJECT_STATUSES = ['Planned', 'Active', 'Completed', 'Published'];

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
  },
];

// Controlled methodology vocabulary — selected per project, not free text.
export const RESEARCH_METHODOLOGIES = [
  { id: 'field-surveys', label: 'Field Surveys', icon: 'ClipboardList' },
  { id: 'underwater-surveys', label: 'Underwater Surveys', icon: 'Waves' },
  { id: 'species-identification', label: 'Species Identification', icon: 'Fingerprint' },
  { id: 'water-sampling', label: 'Water Sampling', icon: 'TestTube' },
  { id: 'fisheries-data', label: 'Fisheries Data Collection', icon: 'Fish' },
  { id: 'acoustic-monitoring', label: 'Acoustic Monitoring', icon: 'AudioLines' },
  { id: 'photography', label: 'Photography & Photo-ID', icon: 'Camera' },
  { id: 'geographic-mapping', label: 'Geographic Mapping', icon: 'Map' },
  { id: 'community-knowledge', label: 'Community Knowledge', icon: 'Users' },
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
  },
  {
    id: 'elasmobranch-research-unit',
    slug: 'elasmobranch-research-unit',
    name: 'Elasmobranch Research Unit',
    focusAreas: ['sharks-rays'],
    description: 'Leads satellite tagging, photo-ID, and cleaning-station research for sharks and rays across Somalia’s pelagic waters.',
    icon: 'Waves',
  },
  {
    id: 'sea-turtle-research-unit',
    slug: 'sea-turtle-research-unit',
    name: 'Sea Turtle Research Unit',
    focusAreas: ['sea-turtles'],
    description: 'Runs satellite telemetry and nest-monitoring programs across Somalia’s two primary turtle nesting rookeries.',
    icon: 'Compass',
  },
  {
    id: 'fisheries-science-team',
    slug: 'fisheries-science-team',
    name: 'Fisheries Science Team',
    focusAreas: ['fisheries'],
    description: 'Conducts stock assessments, catch-effort studies, and genetic sampling in partnership with artisanal fishing cooperatives.',
    icon: 'Fish',
  },
  {
    id: 'coral-coastal-ecosystems-unit',
    slug: 'coral-coastal-ecosystems-unit',
    name: 'Coral Reef & Coastal Ecosystems Unit',
    focusAreas: ['coral-reefs', 'coastal-ecosystems'],
    description: 'Studies coral thermal resilience, seagrass blue carbon storage, and mangrove ecosystem health.',
    icon: 'Sprout',
  },
  {
    id: 'pollution-water-quality-team',
    slug: 'pollution-water-quality-team',
    name: 'Ocean Pollution & Water Quality Monitoring Team',
    focusAreas: ['ocean-pollution', 'water-quality'],
    description: 'Tracks marine debris, microplastics, and coastal water quality across Somalia’s most heavily used shorelines.',
    icon: 'Droplets',
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

export const researchProjects = rawProjects.map((p) => {
  const area = researchAreas.find((a) => a.id === p.area);
  const team = researchTeams.find((t) => t.id === p.researchTeamSlug);
  return {
    ...p,
    areaName: area?.title || p.area,
    areaTag: area?.tag,
    researchTeamName: team?.name || 'Blue Ocean Research Team',
    destinations: resolveDestinations(p.destinationSlugs),
    species: resolveSpecies(p.speciesSlugs),
    methodologyDetails: (p.methodology || [])
      .map((id) => RESEARCH_METHODOLOGIES.find((m) => m.id === id))
      .filter(Boolean),
  };
});

export const expeditions = rawExpeditions.map((e) => {
  const area = researchAreas.find((a) => a.id === e.area);
  const team = researchTeams.find((t) => t.id === e.researchTeamSlug);
  return {
    ...e,
    areaName: area?.title || e.area,
    researchTeamName: team?.name || 'Blue Ocean Research Team',
    species: resolveSpecies(e.speciesSlugs),
  };
});

export const researchTeamsResolved = researchTeams.map((t) => ({
  ...t,
  focusAreaDetails: t.focusAreas.map((id) => researchAreas.find((a) => a.id === id)).filter(Boolean),
  projects: researchProjects.filter((p) => p.researchTeamSlug === t.id),
}));

// Reports — all status: 'coming-soon' since no publishable documents exist yet.
export const researchReports = researchProjects
  .filter((p) => ['Active', 'Completed', 'Published'].includes(p.status))
  .map((p) => ({
    id: `${p.id}-report`,
    slug: `${p.slug}-report`,
    title: `${p.title} — Progress Summary`,
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

// --- Public helpers -----------------------------------------------------

export function getAllProjects() {
  return researchProjects;
}

export function getProjectBySlug(slug) {
  return researchProjects.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedProject() {
  return researchProjects.find((p) => p.featured) || researchProjects[0];
}

export function getProjectsByArea(areaId) {
  if (!areaId || areaId === 'all') return researchProjects;
  return researchProjects.filter((p) => p.area === areaId);
}

export function getRelatedProjects(currentSlug, limit = 3) {
  const current = getProjectBySlug(currentSlug);
  if (!current) return researchProjects.slice(0, limit);
  return researchProjects
    .filter((p) => p.slug !== currentSlug && (p.area === current.area || p.region === current.region))
    .slice(0, limit);
}

export function getAreaBySlug(slug) {
  return researchAreas.find((a) => a.slug === slug || a.id === slug);
}

export function getProjectCountByArea(areaId) {
  return researchProjects.filter((p) => p.area === areaId).length;
}

export function getAllReports() {
  return researchReports;
}

export function getReportBySlug(slug) {
  return researchReports.find((r) => r.slug === slug);
}

export function getAllTeams() {
  return researchTeamsResolved;
}

export function getTeamBySlug(slug) {
  return researchTeamsResolved.find((t) => t.slug === slug || t.id === slug);
}

export function getAllExpeditions() {
  return expeditions;
}

export function getExpeditionBySlug(slug) {
  return expeditions.find((e) => e.slug === slug || e.id === slug);
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
