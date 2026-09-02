// =========================================================
// Conservation Data Model
// Blue Ocean Somalia — Sprint 6: Conservation & Coastal Communities
//
// Follows the same pattern as data/research.js: institutional
// attribution rather than named individuals, and impact figures are
// computed from this data model (getConservationImpact) rather than
// hand-typed, so nothing here is a fabricated statistic.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';
import { researchProjects } from './research.js';
import { communities } from './communities.js';

export const CONSERVATION_STATUSES = ['Planned', 'Active', 'Completed', 'Coming Soon'];

export const conservationFocusAreas = [
  {
    id: 'marine-wildlife',
    slug: 'marine-wildlife',
    title: 'Marine Wildlife',
    description: 'Protecting endangered and vulnerable marine species — from sea turtles to sharks and cetaceans — across Somali waters.',
    image: '/marine_turtles.jpg',
  },
  {
    id: 'coral-habitat',
    slug: 'coral-habitat',
    title: 'Coral & Habitat Protection',
    description: 'Safeguarding coral reefs, seagrass meadows, and mangrove nurseries against degradation and unregulated development.',
    image: '/marine_coral.jpg',
  },
  {
    id: 'illegal-fishing',
    slug: 'illegal-fishing',
    title: 'Illegal Fishing',
    description: 'Documenting illegal and destructive fishing activity in Somali waters and supporting evidence-based, sustainable management of the resources coastal communities depend on.',
    image: '/marine_fish.jpg',
  },
  {
    id: 'sustainable-fishing',
    slug: 'sustainable-fishing',
    title: 'Sustainable Fishing',
    description: 'Working with artisanal fleets to protect fish stocks, nursery grounds, and livelihoods for the long term.',
    image: '/exp_dhow_sailing.jpg',
  },
  {
    id: 'ocean-pollution',
    slug: 'ocean-pollution',
    title: 'Ocean Pollution',
    description: 'Mapping marine debris, microplastics, and coastal pollution sources to guide cleanup and prevention.',
    image: '/mogadishu_beach.jpg',
  },
  {
    id: 'beach-cleanup',
    slug: 'beach-cleanup',
    title: 'Beach Cleanup',
    description: 'Organizing community-led shoreline cleanups along Somalia\'s most heavily used coastlines.',
    image: '/con_beach_cleanup.jpg',
  },
  {
    id: 'marine-education',
    slug: 'marine-education',
    title: 'Marine Education',
    description: 'Building ocean literacy in coastal schools and communities to grow the next generation of stewards.',
    image: '/con_youth_education.jpg',
  },
  {
    id: 'community-conservation',
    slug: 'community-conservation',
    title: 'Community Conservation',
    description: 'Partnering with coastal communities so conservation is led by the people who depend on the ocean most.',
    image: '/puntland.jpg',
  },
];

// Controlled vocabulary of issues a project can address — selected per
// project, not free text, so the Problem section only ever shows
// issues Blue Ocean actually works on.
export const CONSERVATION_ISSUES = [
  { id: 'habitat-degradation', label: 'Habitat Degradation', icon: 'TreePine' },
  { id: 'plastic-pollution', label: 'Plastic & Marine Debris', icon: 'Trash2' },
  { id: 'unsustainable-fishing', label: 'Unsustainable Fishing', icon: 'Fish' },
  { id: 'illegal-fishing', label: 'Illegal & Unregulated Fishing', icon: 'AlertTriangle' },
  { id: 'bycatch', label: 'Bycatch & Entanglement', icon: 'AlertTriangle' },
  { id: 'wildlife-trade', label: 'Illegal Wildlife Trade', icon: 'ShieldOff' },
  { id: 'vessel-strikes', label: 'Vessel Strikes', icon: 'Ship' },
  { id: 'water-quality', label: 'Declining Water Quality', icon: 'Droplets' },
  { id: 'climate-warming', label: 'Warming & Bleaching', icon: 'Thermometer' },
  { id: 'low-awareness', label: 'Limited Ocean Literacy', icon: 'BookOpen' },
];

// Blue Ocean's shared conservation methodology — the same five steps
// apply across every project, so this is defined once and reused on
// the Conservation landing page and every project detail page.
export const CONSERVATION_APPROACH_STEPS = [
  {
    step: '01',
    title: 'Research',
    desc: 'Every initiative starts with data — field surveys, species monitoring, and habitat assessments that establish an evidence baseline.',
  },
  {
    step: '02',
    title: 'Understand',
    desc: 'Raw findings are translated into a clear picture of what is actually threatening a species, habitat, or coastal livelihood.',
  },
  {
    step: '03',
    title: 'Engage',
    desc: 'Coastal communities, fishing cooperatives, and local authorities are brought in as partners in the response, not bystanders to it.',
  },
  {
    step: '04',
    title: 'Protect',
    desc: 'Findings become action — protected corridors, gear changes, seasonal closures, cleanup networks, or policy proposals.',
  },
  {
    step: '05',
    title: 'Measure',
    desc: 'We track whether an intervention is actually working, and adjust the approach as new field data comes in.',
  },
];

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
    focusAreaName: area?.title || p.focusArea,
    destinations: resolveDestinations(p.destinationSlugs),
    species: resolveSpecies(p.speciesSlugs),
    researchLinks: resolveResearchProjects(p.researchProjectSlugs),
    communityLinks: resolveCommunities(p.communitySlugs),
    issues: (p.issueSlugs || []).map((id) => CONSERVATION_ISSUES.find((i) => i.id === id)).filter(Boolean),
  };
});

// --- Public helpers -----------------------------------------------------

export function getAllConservationProjects() {
  return conservationProjects;
}

export function getConservationProjectBySlug(slug) {
  return conservationProjects.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedConservationProject() {
  return conservationProjects.find((p) => p.featured) || conservationProjects[0];
}

export function getConservationProjectsByFocusArea(focusAreaId) {
  if (!focusAreaId || focusAreaId === 'all') return conservationProjects;
  return conservationProjects.filter((p) => p.focusArea === focusAreaId);
}

export function getRelatedConservationProjects(currentSlug, limit = 3) {
  const current = getConservationProjectBySlug(currentSlug);
  if (!current) return conservationProjects.slice(0, limit);
  return conservationProjects
    .filter((p) => p.slug !== currentSlug && (p.focusArea === current.focusArea || p.region === current.region))
    .slice(0, limit);
}

export function getFocusAreaBySlug(slug) {
  return conservationFocusAreas.find((a) => a.slug === slug || a.id === slug);
}

export function getFocusAreaProjectCount(focusAreaId) {
  return conservationProjects.filter((p) => p.focusArea === focusAreaId).length;
}

// Reverse relationships — used by Research, Marine Life, and Coast
// detail pages to surface the conservation work connected to them.
export function getConservationProjectsForResearch(researchSlug) {
  return conservationProjects.filter((p) => p.researchProjectSlugs.includes(researchSlug));
}

export function getConservationProjectsForSpecies(speciesSlug) {
  return conservationProjects.filter((p) => p.speciesSlugs.includes(speciesSlug));
}

export function getConservationProjectsForDestination(destinationSlug) {
  return conservationProjects.filter((p) => p.destinationSlugs.includes(destinationSlug));
}

export function getConservationProjectsForCommunity(communitySlug) {
  return conservationProjects.filter((p) => p.communitySlugs.includes(communitySlug));
}

// Impact figures are computed directly from the data above — nothing
// here is a hand-typed statistic.
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
