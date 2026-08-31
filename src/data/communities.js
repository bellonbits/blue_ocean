// =========================================================
// Coastal Communities Data Model
// Blue Ocean Somalia — Sprint 6: Conservation & Coastal Communities
//
// Following the same convention as data/research.js: institutional
// and collective attribution (a cooperative, a guardian network, a
// business alliance) rather than named individuals — no real personal
// photos, quotes, or biographical claims exist, so none are invented
// here either.
// =========================================================

import { speciesList } from './marineLife.js';

export const COMMUNITY_CATEGORIES = [
  { id: 'fishermen', label: 'Fishermen & Fishing Communities', icon: 'Anchor' },
  { id: 'traditional-knowledge', label: 'Traditional Marine Knowledge', icon: 'Leaf' },
  { id: 'coastal-business', label: 'Coastal Businesses', icon: 'Briefcase' },
  { id: 'youth', label: 'Youth', icon: 'GraduationCap' },
  { id: 'women', label: 'Women in Coastal Communities', icon: 'Heart' },
  { id: 'livelihoods', label: 'Sustainable Livelihoods', icon: 'Users' },
];

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

export const communities = [
  {
    id: 'bosaso-fishing-cooperative',
    slug: 'bosaso-fishing-cooperative',
    name: 'Bosaso Fishing Cooperative',
    category: 'fishermen',
    location: 'Bosaso, Bari Region',
    region: 'Puntland',
    heroImage: '/bosaso1.jpg',
    description: 'A cooperative of artisanal handline fishing crews operating out of Bosaso harbor, working Gulf of Aden waters for yellowfin tuna and kingfish.',
    livelihoods: ['Artisanal handline fishing', 'Fish market trading', 'Vessel maintenance and dhow building'],
    marineConnection: 'The cooperative\'s fleet fishes the same Gulf of Aden corridor Blue Ocean surveys for dolphin and whale movement, making it a direct partner in both fisheries and cetacean conservation work.',
    conservationActivities: ['Fair Trade Handline Certification pilot fleet', 'Reporting cetacean sightings during fishing trips'],
    gallery: [
      { url: '/bosaso1.jpg', caption: 'Handline vessels docked in Bosaso harbor.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso\'s coastal fish market.' },
      { url: '/exp_dhow_sailing.jpg', caption: 'A traditional dhow under sail off the Bari coast.' },
    ],
  },
  {
    id: 'eyl-traditional-knowledge-keepers',
    slug: 'eyl-traditional-knowledge-keepers',
    name: 'Eyl Traditional Knowledge Keepers',
    category: 'traditional-knowledge',
    location: 'Eyl, Bari Region',
    region: 'Puntland',
    heroImage: '/eyl1.jpg',
    description: 'Multi-generational fishing families along the Eyl escarpments whose knowledge of lobster behavior, breeding cycles, and seasonal patterns predates any formal survey.',
    livelihoods: ['Spiny lobster harvesting', 'Reef-edge net fishing'],
    marineConnection: 'Their observations of egg-bearing ("berried") female lobster behavior directly shaped the size-limit and release protocol adopted across the Bari escarpment fishery.',
    conservationActivities: ['Co-designed the Berried Female Release & Size-Limit Accord', 'Seasonal closure monitoring'],
    gallery: [
      { url: '/eyl1.jpg', caption: 'Eyl\'s escarpment coastline, the primary lobster fishing ground.' },
      { url: '/eyl2.jpg', caption: 'Traditional fishing boats at rest in Eyl.' },
      { url: '/eyl3.jpg', caption: 'The rocky Bari escarpments where lobster surveys were conducted.' },
    ],
  },
  {
    id: 'kismayo-womens-fish-processing',
    slug: 'kismayo-womens-fish-processing',
    name: "Kismayo Women's Fish Processing Collective",
    category: 'women',
    location: 'Kismayo, Lower Juba',
    region: 'Jubaland',
    heroImage: '/jubaland.jpg',
    description: 'A women-led collective processing and selling fish catch from Kismayo\'s landing sites, turning what was once discarded by-catch into a stable source of household income.',
    livelihoods: ['Fish processing and drying', 'Local market trading', 'Small-scale fish trading routes to inland markets'],
    marineConnection: 'The collective works the same Kismayo landings connected to Blue Ocean\'s seagrass and sirenian protection work in the surrounding Bajuni Archipelago waters.',
    conservationActivities: ['Reduced-waste processing practices', 'Local awareness sessions on sustainable catch handling'],
    gallery: [
      { url: '/jubaland.jpg', caption: 'Kismayo\'s coastal waters and landing sites.' },
      { url: '/marine_fish.jpg', caption: 'Fresh catch ready for processing.' },
      { url: '/marine_seagrass.jpg', caption: 'Seagrass channels near the collective\'s working waters.' },
    ],
  },
  {
    id: 'hafun-youth-beach-guardians',
    slug: 'hafun-youth-beach-guardians',
    name: 'Hafun Youth Beach Guardians',
    category: 'youth',
    location: 'Hafun, Bari Region',
    region: 'Puntland',
    heroImage: '/hafun1.jpg',
    description: 'A trained network of young residents monitoring sea turtle nesting beaches around the Hafun Peninsula through the full nesting season.',
    livelihoods: ['Seasonal beach guardian stipends', 'Ecotourism guiding during nesting season'],
    marineConnection: 'The Hafun tombolo beaches are one of Somalia\'s two most significant green and hawksbill turtle nesting rookeries, and guardians are present through the entire incubation window.',
    conservationActivities: ['Community Beach Guardian Nest Protection Program', 'Hatchling release supervision', 'Ocean literacy peer education'],
    gallery: [
      { url: '/hafun1.jpg', caption: 'The Hafun Peninsula coastline.' },
      { url: '/hafun2.jpg', caption: 'Hafun tombolo beach, one of the monitored nesting rookeries.' },
      { url: '/marine_turtles.jpg', caption: 'A green sea turtle in the waters off Hafun.' },
    ],
  },
  {
    id: 'mogadishu-coastal-business-alliance',
    slug: 'mogadishu-coastal-business-alliance',
    name: 'Mogadishu Coastal Business Alliance',
    category: 'coastal-business',
    location: 'Mogadishu, Banaadir',
    region: 'Somalia',
    heroImage: '/mogadishu_beach.jpg',
    description: 'Beachfront restaurants, cafes, and tour operators along Liido Beach who jointly fund and staff the quarterly cleanup calendar for Mogadishu\'s most visited shoreline.',
    livelihoods: ['Beachfront hospitality and tourism', 'Small watercraft rental and tours'],
    marineConnection: 'Liido Beach is both the Alliance\'s commercial center and one of the two sites in Blue Ocean\'s ongoing debris-density mapping and water-quality monitoring work.',
    conservationActivities: ['Southern Coast Community Beach Cleanup Network funding partner', 'Hosting public water-quality guidance postings'],
    gallery: [
      { url: '/mogadishu_beach.jpg', caption: "Liido Beach, Mogadishu's most visited shoreline." },
      { url: '/con_beach_cleanup.jpg', caption: 'A quarterly community cleanup event.' },
      { url: '/somalia_coast.jpg', caption: "Banaadir's coastal waters." },
    ],
  },
];

const rawStories = [
  {
    id: 'bosaso-handline-fleet-story',
    slug: 'bosaso-handline-fleet-story',
    title: "The Handline Fleet Betting on Certification",
    category: 'fishermen',
    communitySlug: 'bosaso-fishing-cooperative',
    location: 'Bosaso, Bari Region',
    region: 'Puntland',
    featuredImage: '/bosaso1.jpg',
    author: 'Blue Ocean Coastal Communities Team',
    date: '2025',
    storyContent: [
      'For generations, Bosaso\'s handline crews have fished the Gulf of Aden the same way — one line, one hook, one fish at a time. It is one of the most selective fishing methods there is, but until recently, that selectivity carried no market recognition at all.',
      'That changed when the cooperative became the pilot fleet for Blue Ocean\'s Fair Trade Handline Certification program, built on a published stock assessment showing the local yellowfin tuna population sitting within sustainable limits — as long as fishing pressure stays where it is.',
      'Certification means paperwork, catch logging, and outside verification — a real shift for crews used to working entirely on instinct and experience. But it also means a growing number of export buyers can now tell the difference between their catch and less sustainably sourced tuna, and are starting to pay for that difference.',
      'The cooperative has also become an informal early-warning network for Blue Ocean\'s cetacean research — crews now report dolphin and whale sightings from their daily routes, feeding directly into the corridor mapping used for the Marine Mammal Migration Safe Corridors initiative.',
    ],
    marineConnection: 'Bosaso\'s handline fleet works the same Gulf of Aden waters where Blue Ocean tracks resident dolphin pods and migratory humpback whales.',
    conservationProjectSlug: 'fair-trade-handline-certification',
    speciesSlugs: ['yellowfin-tuna'],
    featured: true,
    published: true,
  },
  {
    id: 'eyl-lobster-accord-story',
    slug: 'eyl-lobster-accord-story',
    title: "Why Eyl's Fishermen Started Releasing Berried Females",
    category: 'traditional-knowledge',
    communitySlug: 'eyl-traditional-knowledge-keepers',
    location: 'Eyl, Bari Region',
    region: 'Puntland',
    featuredImage: '/eyl1.jpg',
    author: 'Blue Ocean Coastal Communities Team',
    date: '2024',
    storyContent: [
      'Long before any research team arrived in Eyl, local fishing families already knew which lobsters were carrying eggs, and roughly when. That knowledge — passed down rather than published — became the starting point for what eventually turned into a formal biomass and catch-effort study.',
      'When Blue Ocean\'s Fisheries Science Team began surveying the Bari escarpments in 2022, it was Eyl\'s fishermen who pointed researchers toward the density patterns worth measuring first. The resulting study confirmed what generations of harvesters had suspected: protecting egg-bearing females mattered more than almost any other single intervention available.',
      'What came out of that collaboration wasn\'t a regulation imposed from outside — it was an accord the cooperatives helped design themselves: release any berried female, and observe a minimum harvest size. Two years on, it\'s still being followed, season after season, by the same crews who helped write it.',
    ],
    marineConnection: 'Eyl\'s escarpment waters are the primary spiny lobster fishing ground behind the Berried Female Release & Size-Limit Accord.',
    conservationProjectSlug: 'berried-female-release-accord',
    speciesSlugs: ['spiny-lobster'],
    featured: false,
    published: true,
  },
  {
    id: 'hafun-beach-guardians-story',
    slug: 'hafun-beach-guardians-story',
    title: "The Teenagers Guarding Hafun's Turtle Nests",
    category: 'youth',
    communitySlug: 'hafun-youth-beach-guardians',
    location: 'Hafun, Bari Region',
    region: 'Puntland',
    featuredImage: '/hafun1.jpg',
    author: 'Blue Ocean Coastal Communities Team',
    date: '2025',
    storyContent: [
      'A research team can\'t be on a beach every night for an entire nesting season — but a trained local guardian network can. That simple gap in coverage is what the Hafun Youth Beach Guardians program was built to close.',
      'Young residents of the Hafun Peninsula now walk the tombolo beaches on a rotating schedule through the nesting months, watching for disturbed nests, deterring predators and interference, and logging what they find for Blue Ocean\'s Sea Turtle Research Unit.',
      'The role comes with a stipend during the season, but guardians consistently describe the hatchling releases — walking newly emerged turtles down to the surf line — as the part that keeps them coming back the following year. Several have gone on to guide visiting researchers and ecotourism groups during the rest of the year.',
      'Hafun is one of only two significant green and hawksbill nesting rookeries documented along the Somali coast. Without consistent monitoring, a single undetected disturbance can wipe out an entire clutch — which is exactly the gap this program exists to close.',
    ],
    marineConnection: 'The Hafun tombolo beaches are one of Somalia\'s two primary sea turtle nesting rookeries, monitored season-round by the guardian network.',
    conservationProjectSlug: 'beach-guardian-nest-protection',
    speciesSlugs: ['green-sea-turtle', 'hawksbill-turtle'],
    featured: true,
    published: true,
  },
  {
    id: 'mogadishu-cleanup-partners-story',
    slug: 'mogadishu-cleanup-partners-story',
    title: "The Businesses Funding Liido Beach's Cleanup Calendar",
    category: 'coastal-business',
    communitySlug: 'mogadishu-coastal-business-alliance',
    location: 'Mogadishu, Banaadir',
    region: 'Somalia',
    featuredImage: '/mogadishu_beach.jpg',
    author: 'Blue Ocean Coastal Communities Team',
    date: '2025',
    storyContent: [
      'Liido Beach is Mogadishu\'s busiest stretch of coastline — and for the restaurants, cafes, and tour operators lining it, a clean shoreline isn\'t a nice-to-have, it\'s the entire business.',
      'When Blue Ocean\'s debris-mapping work confirmed Liido as one of the two highest-concentration sites on the southern coast, a group of beachfront operators organized into the Mogadishu Coastal Business Alliance to fund and staff a recurring cleanup calendar rather than wait for outside support.',
      'The Alliance now underwrites the equipment and local labor for quarterly cleanups, and hosts the public postings of Blue Ocean\'s ongoing water-quality guidance for the beach — giving swimmers and visitors a source of information that used to exist only in research files.',
      'It\'s a straightforward alignment of interest and impact: a cleaner beach keeps customers coming, and every cleanup keeps that much more debris from breaking down into the microplastics the mapping work is tracking.',
    ],
    marineConnection: 'Liido Beach is one of two sites in Blue Ocean\'s ongoing marine debris and water-quality monitoring program.',
    conservationProjectSlug: 'southern-coast-beach-cleanup-network',
    speciesSlugs: [],
    featured: false,
    published: true,
  },
  {
    id: 'kismayo-fish-processing-story',
    slug: 'kismayo-fish-processing-story',
    title: "The Women Turning By-Catch Into a Business",
    category: 'women',
    communitySlug: 'kismayo-womens-fish-processing',
    location: 'Kismayo, Lower Juba',
    region: 'Jubaland',
    featuredImage: '/jubaland.jpg',
    author: 'Blue Ocean Coastal Communities Team',
    date: '2024',
    storyContent: [
      'At Kismayo\'s landing sites, a portion of every day\'s catch was once simply discarded — too small, too mixed, or too much for buyers looking only for premium fish. The Kismayo Women\'s Fish Processing Collective was built around exactly that overlooked portion.',
      'By processing and drying catch that would otherwise go to waste, the Collective turned a discard problem into a stable source of household income for its members, with trading routes now reaching inland markets beyond the coast itself.',
      'The Collective\'s working waters sit at the edge of the Bajuni Archipelago\'s seagrass channels — the same waters where Blue Ocean surveys one of East Africa\'s last resident dugong populations — and members have become informal partners in keeping an eye on the health of the channels they depend on daily.',
    ],
    marineConnection: "The Collective's landing sites border the Bajuni Archipelago seagrass channels surveyed for the sirenian protection corridor.",
    conservationProjectSlug: 'sirenian-protected-corridors',
    speciesSlugs: ['dugong'],
    featured: false,
    published: true,
  },
];

export const communityStories = rawStories.map((s) => {
  const community = communities.find((c) => c.slug === s.communitySlug);
  return {
    ...s,
    communityName: community?.name || null,
    species: resolveSpecies(s.speciesSlugs),
  };
});

// --- Public helpers -----------------------------------------------------

export function getAllCommunities() {
  return communities;
}

export function getCommunityBySlug(slug) {
  return communities.find((c) => c.slug === slug || c.id === slug);
}

export function getAllCommunityStories() {
  return communityStories.filter((s) => s.published);
}

export function getCommunityStoryBySlug(slug) {
  return communityStories.find((s) => s.slug === slug || s.id === slug);
}

export function getFeaturedCommunityStory() {
  return communityStories.find((s) => s.featured) || communityStories[0];
}

export function getStoriesByCommunity(communitySlug) {
  return communityStories.filter((s) => s.communitySlug === communitySlug);
}

export function getRelatedCommunityStories(currentSlug, limit = 3) {
  const current = getCommunityStoryBySlug(currentSlug);
  if (!current) return communityStories.slice(0, limit);
  return communityStories
    .filter((s) => s.slug !== currentSlug && (s.category === current.category || s.region === current.region))
    .slice(0, limit);
}

export function getCommunityCategoryInfo(id) {
  return COMMUNITY_CATEGORIES.find((c) => c.id === id);
}
