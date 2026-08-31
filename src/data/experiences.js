// =========================================================
// Ocean Experiences Data Model & Discovery Library
// Blue Ocean Somalia — Sprint 5: Ocean Experiences
//
// All experiences ship with status: 'coming-soon' at launch —
// this is a discovery platform for future ocean activities,
// not a live booking system. Update `status` per experience
// as Blue Ocean operationalizes each activity.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';

export const EXPERIENCE_STATUSES = {
  'coming-soon': { label: 'Coming Soon', description: 'Planned for the Somali coast — not yet operating.' },
  'available': { label: 'Available', description: 'Currently operating and open to visitors.' },
  'seasonal': { label: 'Seasonal', description: 'Operates only during a specific seasonal window.' },
  'unavailable': { label: 'Unavailable', description: 'Currently paused or not operating.' },
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
  },
  {
    id: 'snorkeling',
    slug: 'snorkeling',
    title: 'Snorkeling',
    tagline: 'Discover life beneath the surface.',
    description: 'Shallow reef-top exploration above vibrant coral gardens and sheltered lagoons.',
    icon: 'Wind',
    image: '/exp_coral_snorkeling.jpg',
  },
  {
    id: 'diving',
    slug: 'diving',
    title: 'Diving',
    tagline: 'Go deeper.',
    description: 'Scuba expeditions into largely unexplored reef drop-offs and deep pelagic corridors.',
    icon: 'Waves',
    image: '/exp_scuba_diving.jpg',
  },
  {
    id: 'fishing',
    slug: 'fishing',
    title: 'Fishing',
    tagline: 'Experience the traditions of the coast.',
    description: 'Traditional handline and reef fishing alongside veteran Somali fishing cooperatives.',
    icon: 'Fish',
    image: '/marine_fish.jpg',
  },
  {
    id: 'island-exploration',
    slug: 'island-exploration',
    title: 'Island Exploration',
    tagline: 'Find the islands beyond the shore.',
    description: 'Multi-day expeditions into remote archipelagos, atolls, and untouched sandbars.',
    icon: 'Globe',
    image: '/jubaland.jpg',
  },
  {
    id: 'dolphin-watching',
    slug: 'dolphin-watching',
    title: 'Dolphin & Whale Watching',
    tagline: 'Witness giants of the deep.',
    description: 'Guided sightings of spinner dolphin pods and migrating humpback whales.',
    icon: 'Anchor',
    image: '/marine_dolphins.jpg',
  },
  {
    id: 'marine-photography',
    slug: 'marine-photography',
    title: 'Marine Photography',
    tagline: 'Capture the unseen coast.',
    description: 'Guided underwater and aerial expeditions documenting Somalia’s marine frontier.',
    icon: 'Camera',
    image: '/marine_coral.jpg',
  },
  {
    id: 'coastal-trekking',
    slug: 'coastal-trekking',
    title: 'Coastal Trekking',
    tagline: 'Walk the edge of the continent.',
    description: 'Cliffside and canyon treks along Somalia’s dramatic limestone and sandstone coastline.',
    icon: 'Mountain',
    image: '/exp_coastal_cliff.jpg',
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
  },
];

// --- Cross-link resolution -------------------------------------------

function resolveDestinations(slugs = []) {
  return slugs
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean)
    .map((d) => ({ id: d.id, slug: d.slug, name: d.name, region: d.region, tagline: d.tagline, heroImage: d.heroImage }));
}

function resolveMarineSpecies(slugs = []) {
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
    marineSpecies: resolveMarineSpecies(exp.marineSpeciesSlugs),
    researchProjects: resolveResearchProjects(exp.marineSpeciesSlugs),
  };
});

// --- Public helpers -----------------------------------------------------

export function getAllExperiences() {
  return experiences;
}

export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug || e.id === slug);
}

export function getFeaturedExperiences() {
  return experiences.filter((e) => e.featured);
}

export function getExperiencesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return experiences;
  return experiences.filter((e) => e.category === categoryId);
}

export function getRelatedExperiences(currentSlug, limit = 3) {
  const current = getExperienceBySlug(currentSlug);
  if (!current) return experiences.slice(0, limit);
  return experiences
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
