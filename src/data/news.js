// =========================================================
// News & Discoveries Data Model
// Blue Ocean Somalia — Sprint 7: News, About & Contact
//
// Follows the same convention as research.js / conservation.js:
// institutional attribution (a team, a unit), not fabricated named
// individuals with invented biographical detail.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';
import { researchProjects } from './research.js';
import { conservationProjects } from './conservation.js';
import { communities } from './communities.js';
import { getAllExperiences } from './experiences.js';

export const NEWS_CATEGORIES = [
  { id: 'marine-life', slug: 'marine-life', label: 'Marine Life', badgeClass: 'badge-turquoise' },
  { id: 'research', slug: 'research', label: 'Research', badgeClass: 'badge-research' },
  { id: 'tourism', slug: 'tourism', label: 'Tourism', badgeClass: 'badge-turquoise' },
  { id: 'conservation', slug: 'conservation', label: 'Conservation', badgeClass: 'badge-conservation' },
  { id: 'coastal-communities', slug: 'coastal-communities', label: 'Coastal Communities', badgeClass: 'badge-turquoise' },
  { id: 'ocean-news', slug: 'ocean-news', label: 'Ocean News', badgeClass: 'badge-coming-soon' },
];

function paragraph(text) { return { type: 'paragraph', text }; }
function heading(text) { return { type: 'heading', text }; }
function pullquote(text, attribution) { return { type: 'pullquote', text, attribution }; }
function image(url, caption) { return { type: 'image', url, caption }; }

const rawArticles = [
  {
    id: 'whale-shark-puntland',
    slug: 'whale-shark-puntland',
    title: 'Rare Whale Shark Sighting Recorded Off Puntland Coast',
    category: 'marine-life',
    author: 'Blue Ocean Elasmobranch Research Unit',
    date: '2026-08-22',
    displayDate: 'August 22, 2026',
    readTime: '4 min read',
    featuredImage: '/marine_sharks.jpg',
    gallery: [
      { url: '/marine_sharks.jpg', caption: 'The whale shark documented feeding near the surface off Bosaso.' },
      { url: '/exp_scuba_diving.jpg', caption: 'The research team approaching for photo-ID capture.' },
      { url: '/bargaal_main.jpg', caption: 'Bargaal, a known seasonal feeding aggregation site nearby.' },
    ],
    excerpt: 'Blue Ocean researchers documented a 9-metre whale shark near Bosaso — the first recorded sighting in this stretch of coast in over a decade, highlighting the rich marine biodiversity of northern Somalia.',
    content: [
      paragraph('A juvenile whale shark, measured at roughly nine metres, was photographed and logged by Blue Ocean\'s Elasmobranch Research Unit during a routine survey off Bosaso this week — the first confirmed sighting this far north along the Gulf of Aden coast in over a decade.'),
      paragraph('The animal was feeding at the surface, likely drawn by a seasonal plankton bloom associated with the current upwelling along the Bari coast. The team was able to capture enough spot-pattern photography to attempt a match against the regional photo-ID catalog built through the ongoing tagging study further south at Cap Guardafui.'),
      pullquote('A sighting this far north tells us the feeding range may be wider than our tagging data alone has shown.', 'Blue Ocean Elasmobranch Research Unit'),
      paragraph('Whale sharks are listed as endangered, and every confirmed sighting adds a data point to a species whose migratory range along the Somali coast remains only partially mapped. The sighting has been added to the same regional dataset feeding the Horn of Africa Elasmobranch Protection Initiative.'),
      heading('What happens next'),
      paragraph('The research team is now cross-referencing the Bosaso photo-ID capture against the existing Guardafui catalog to determine whether this is a previously tagged individual expanding its known range, or a new animal entirely.'),
    ],
    destinationSlugs: ['bosaso', 'bargaal'],
    speciesSlugs: ['whale-shark'],
    researchProjectSlugs: ['whale-shark-satellite'],
    conservationProjectSlugs: ['elasmobranch-protection-initiative'],
    experienceSlugs: ['diving'],
    communitySlugs: [],
    featured: true,
    published: true,
  },
  {
    id: 'gulf-aden-expedition',
    slug: 'gulf-aden-expedition',
    title: 'New Research Expedition Launches in the Gulf of Aden',
    category: 'research',
    author: 'Blue Ocean Cetacean & Marine Mammal Research Unit',
    date: '2026-08-18',
    displayDate: 'August 18, 2026',
    readTime: '5 min read',
    featuredImage: '/marine_dolphins.jpg',
    gallery: [
      { url: '/marine_dolphins.jpg', caption: 'A resident dolphin pod encountered during the survey.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso harbor, the expedition\'s staging point.' },
      { url: '/exp_coastal_cliff.jpg', caption: 'Coastal waters along the Bari survey corridor.' },
    ],
    excerpt: 'A boat-based survey has departed Bosaso to track dolphin and whale movement along the Gulf of Aden corridor, extending the baseline data behind the Marine Mammal Migration Safe Corridors initiative.',
    content: [
      paragraph('Blue Ocean\'s Cetacean & Marine Mammal Research Unit has launched a multi-week boat-based survey along the Gulf of Aden corridor, deploying hydrophones and conducting visual transects between Bosaso and Qandala.'),
      paragraph('The survey builds directly on the unit\'s ongoing acoustic monitoring work, adding fresh photo-ID captures to the pod catalog and additional acoustic detections to the seasonal activity calendar used to plan future safe-corridor proposals.'),
      heading('Why this stretch of coast'),
      paragraph('The Bosaso–Qandala corridor sees some of the heaviest overlap anywhere on the Somali coast between shipping traffic, artisanal fishing grounds, and resident cetacean activity — exactly the kind of overlap the Marine Mammal Migration Safe Corridors initiative is trying to formally map and reduce.'),
      pullquote('Every acoustic detection and every photo-ID match makes the eventual corridor proposal more defensible.', 'Blue Ocean Cetacean & Marine Mammal Research Unit'),
      paragraph('Early observations already confirm a resident bottlenose dolphin pod using the corridor consistently — consistent with prior survey seasons — alongside occasional humpback whale acoustic activity typical for this point in the migration calendar.'),
    ],
    destinationSlugs: ['bosaso', 'qandala', 'eyl'],
    speciesSlugs: ['bottlenose-dolphin', 'humpback-whale'],
    researchProjectSlugs: ['cetacean-monitoring', 'acoustic-hydrophone'],
    conservationProjectSlugs: ['marine-mammal-safe-corridors'],
    experienceSlugs: ['dolphin-watching'],
    communitySlugs: ['bosaso-fishing-cooperative'],
    featured: false,
    published: true,
  },
  {
    id: 'jubaland-beach-cleanup',
    slug: 'jubaland-beach-cleanup',
    title: 'Jubaland Beach Cleanup Removes Tonnes of Plastic',
    category: 'conservation',
    author: 'Blue Ocean Pollution & Water Quality Team',
    date: '2026-08-10',
    displayDate: 'August 10, 2026',
    readTime: '3 min read',
    featuredImage: '/con_beach_cleanup.jpg',
    gallery: [
      { url: '/con_beach_cleanup.jpg', caption: 'Volunteers sorting debris by category during the cleanup.' },
      { url: '/jubaland.jpg', caption: 'Kismayo shoreline, one of the two sites covered.' },
      { url: '/mogadishu_beach.jpg', caption: 'Liido Beach, Mogadishu — the network\'s northern site.' },
    ],
    excerpt: 'Volunteers from coastal communities in Kismayo and Mogadishu joined Blue Ocean\'s quarterly cleanup, removing a significant volume of plastic waste and reinforcing the debris-density map behind the effort.',
    content: [
      paragraph('The latest round of Blue Ocean\'s Southern Coast Community Beach Cleanup Network drew volunteers from Kismayo and Liido Beach, Mogadishu, for a coordinated single-day cleanup across both debris-density hotspots identified by the ongoing mapping program.'),
      paragraph('Sorted debris was logged by category — the same protocol used in the underlying survey work — so this cleanup doubles as another data point in the debris-density map rather than a one-off event.'),
      heading('A recurring calendar, not a one-off'),
      paragraph('The cleanup network, funded in part by the Mogadishu Coastal Business Alliance, now runs on a quarterly calendar at both sites. Organizers say the goal is less about any single event and more about keeping debris from sitting long enough to break down into microplastics.'),
      pullquote('You can\'t clean what you haven\'t mapped — and you can\'t keep it clean without showing up again next quarter.', 'Blue Ocean Pollution & Water Quality Team'),
    ],
    destinationSlugs: ['kismayo', 'liido-beach'],
    speciesSlugs: [],
    researchProjectSlugs: ['marine-debris-microplastics-mapping'],
    conservationProjectSlugs: ['southern-coast-beach-cleanup-network', 'southern-coast-debris-mapping'],
    experienceSlugs: [],
    communitySlugs: ['mogadishu-coastal-business-alliance'],
    featured: false,
    published: true,
  },
  {
    id: 'mpa-framework-proposal',
    slug: 'mpa-framework-proposal',
    title: "Somalia Still Has No Marine Protected Areas — This Proposal Aims to Change That",
    category: 'conservation',
    author: 'Blue Ocean Coral Reef & Coastal Ecosystems Unit',
    date: '2026-08-05',
    displayDate: 'August 5, 2026',
    readTime: '5 min read',
    featuredImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'A coral garden in the Bajuni Archipelago.' },
      { url: '/qandala_main.jpg', caption: 'Qandala patch reefs included in the zoning proposal.' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Survey team sampling coral fragments for thermal-resilience genotyping.' },
    ],
    excerpt: 'A zoning proposal built on two years of coral thermal-resilience data aims to finally close a gap first flagged in a landmark 2000 coastal study: Somalia has no legally protected marine areas at all.',
    content: [
      paragraph('It has been a known gap for more than two decades: Somalia has no Marine Protected Areas, and no legislation governing how one would be established. Blue Ocean\'s Coral Reef & Coastal Ecosystems Unit has now drafted a zoning proposal aimed at closing that gap.'),
      paragraph('The proposal prioritizes reef sites across the Bajuni Archipelago and Qandala patch reef systems based on measured thermal tolerance — reefs identified as most likely to survive continued ocean warming get first priority for protection.'),
      heading('A gap flagged a generation ago'),
      paragraph('A 2000 scientific survey of the Somali coast flagged the absence of any Marine Protected Area as a critical gap, and specifically called out the Kisimayo-to-Ras-Chiambone stretch — now the Bajuni Archipelago — as the country\'s single highest conservation priority. A quarter-century later, that gap remains open.'),
      pullquote('The reefs that can survive what\'s coming are exactly the ones we should be protecting first.', 'Blue Ocean Coral Reef & Coastal Ecosystems Unit'),
      paragraph('The zoning framework is now ready for submission to relevant coastal authorities. Its scope directly overlaps with a separate proposal to extend the existing Lac Badana National Park across part of the archipelago — a standing 1987 recommendation that has never been formally acted on.'),
    ],
    destinationSlugs: ['kismayo', 'qandala', 'bosaso'],
    speciesSlugs: ['acropora-coral'],
    researchProjectSlugs: ['coral-thermal-study'],
    conservationProjectSlugs: ['mpa-framework-reef-zoning'],
    experienceSlugs: ['snorkeling', 'diving'],
    communitySlugs: [],
    featured: true,
    published: true,
  },
  {
    id: 'handline-certification-launch',
    slug: 'handline-certification-launch',
    title: "Bosaso's Handline Fleet Becomes First Certified Under New Fair Trade Standard",
    category: 'coastal-communities',
    author: 'Blue Ocean Fisheries Science Team',
    date: '2026-07-28',
    displayDate: 'July 28, 2026',
    readTime: '4 min read',
    featuredImage: '/exp_dhow_sailing.jpg',
    gallery: [
      { url: '/exp_dhow_sailing.jpg', caption: 'Handline vessels of the Bosaso Fishing Cooperative.' },
      { url: '/marine_fish.jpg', caption: 'Yellowfin tuna landed for biometric sampling.' },
      { url: '/bosaso2.jpg', caption: 'Bosaso fish market, a certification checkpoint.' },
    ],
    excerpt: 'The Bosaso Fishing Cooperative has become the pilot fleet for Blue Ocean\'s Fair Trade Handline Certification, giving export buyers a way to recognize sustainably caught Somali tuna for the first time.',
    content: [
      paragraph('The Bosaso Fishing Cooperative has completed the pilot phase of Blue Ocean\'s Fair Trade Handline Certification program, becoming the first Somali fleet able to formally label its yellowfin tuna catch as certified sustainable.'),
      paragraph('The certification is built on a published stock assessment showing the local yellowfin population sitting within sustainable limits under current handline pressure — a status certification is designed to help maintain by rewarding, rather than penalizing, the fleets already fishing this way.'),
      heading('What changes for the fleet'),
      paragraph('Certified crews now log catch data and submit to outside verification — a real shift from a fishery that has operated almost entirely on instinct and generational knowledge. In exchange, a growing number of export buyers can distinguish certified catch from uncertified competition.'),
      pullquote('Handline was already one of the most selective methods there is. Now the market can actually tell.', 'Blue Ocean Fisheries Science Team'),
    ],
    destinationSlugs: ['bosaso', 'bargaal', 'kismayo'],
    speciesSlugs: ['yellowfin-tuna'],
    researchProjectSlugs: ['fisheries-stock'],
    conservationProjectSlugs: ['fair-trade-handline-certification'],
    experienceSlugs: [],
    communitySlugs: ['bosaso-fishing-cooperative'],
    featured: false,
    published: true,
  },
  {
    id: 'bajuni-archipelago-diving-guide',
    slug: 'bajuni-archipelago-diving-guide',
    title: "Inside the Bajuni Archipelago: Somalia's Least-Known Dive Frontier",
    category: 'tourism',
    author: 'Blue Ocean Editorial Team',
    date: '2026-07-20',
    displayDate: 'July 20, 2026',
    readTime: '6 min read',
    featuredImage: '/jubaland.jpg',
    gallery: [
      { url: '/jubaland.jpg', caption: 'The Bajuni Archipelago\'s sheltered turquoise channels.' },
      { url: '/exp_scuba_diving.jpg', caption: 'A diver exploring a Bajuni reef pinnacle.' },
      { url: '/marine_coral.jpg', caption: 'Coral formations typical of the archipelago\'s outer reefs.' },
    ],
    excerpt: 'A chain of islands, islets and skerries south of Kismayo holds some of the most intact reef systems on the Somali coast — and almost none of the visitors. Here is what makes it worth the trip.',
    content: [
      paragraph('South of Kismayo, the Somali coast changes character entirely. The Bajuni Archipelago — a barrier-island chain of coral islets separated from the mainland by a shallow marine sound — holds some of the most intact reef systems left on the coast, and remains almost entirely undiscovered by visitors.'),
      paragraph('True fringing-reef diving is rare along most of the Somali coast, where reef growth tends toward scattered patches. The Bajuni Archipelago is the exception: islands like Ilisi have a full reef profile — crest, flat, and fore-reef wall — colonized by branching Acropora, Porites knobs, and dense Thalassodendron seagrass meadows in the shallows.'),
      heading('What to expect'),
      paragraph('Conditions favor calm, current-sheltered snorkeling and diving inside the sound, with more current-exposed reef-wall diving on the outer shelf edge for experienced divers. Access remains limited and largely undeveloped — this is frontier diving, not resort diving.'),
      pullquote('This is one of the last stretches of Somali reef most divers have never heard of.', 'Blue Ocean Editorial Team'),
      paragraph('The archipelago also sits inside the zone flagged as Somalia\'s highest coral-conservation priority, which means every visit here doubles as a first-hand look at exactly the reefs Blue Ocean\'s MPA zoning proposal is built around.'),
    ],
    destinationSlugs: ['kismayo', 'bajuni-islands'],
    speciesSlugs: ['acropora-coral'],
    researchProjectSlugs: ['coral-thermal-study'],
    conservationProjectSlugs: ['mpa-framework-reef-zoning'],
    experienceSlugs: ['diving', 'snorkeling', 'island-exploration'],
    communitySlugs: [],
    featured: false,
    published: true,
  },
  {
    id: 'hafun-turtle-nesting-season',
    slug: 'hafun-turtle-nesting-season',
    title: "Hafun's Nesting Season Closes With Record Guardian Coverage",
    category: 'marine-life',
    author: 'Blue Ocean Sea Turtle Research Unit',
    date: '2026-07-12',
    displayDate: 'July 12, 2026',
    readTime: '4 min read',
    featuredImage: '/marine_turtles.jpg',
    gallery: [
      { url: '/marine_turtles.jpg', caption: 'A green sea turtle in the waters off Hafun.' },
      { url: '/hafun2.jpg', caption: 'Hafun tombolo beach, the season\'s primary nesting site.' },
      { url: '/con_youth_education.jpg', caption: 'A beach guardian on nightly nest-monitoring rounds.' },
    ],
    excerpt: "This year's nesting season at Hafun closed with every active nest under guardian coverage for the first time — the strongest result yet from the Community Beach Guardian Nest Protection Program.",
    content: [
      paragraph('The green and hawksbill turtle nesting season at Hafun has closed with a milestone: for the first time since the program began, every active nest on the tombolo beaches had guardian coverage through its full incubation window.'),
      paragraph('The Hafun Youth Beach Guardians — a trained network of young residents walking the beaches on a rotating nightly schedule — logged disturbance incidents at a fraction of prior seasons\' rate, and supervised hatchling releases at every confirmed hatch site.'),
      heading('Why coverage matters this much'),
      paragraph('Hafun is one of only two significant green and hawksbill nesting rookeries documented along the Somali coast. A single undetected disturbance during incubation can wipe out an entire clutch — which is exactly the gap consistent, on-the-ground monitoring is designed to close.'),
      pullquote('A research team can\'t be on a beach every night for an entire season. A trained local network can.', 'Blue Ocean Sea Turtle Research Unit'),
      paragraph('Several guardians from this season have already been asked to return for the next, and some have started guiding visiting researchers during the off-season — an early sign the program is building toward something more durable than a single-season initiative.'),
    ],
    destinationSlugs: ['hafun', 'kismayo', 'eyl'],
    speciesSlugs: ['green-sea-turtle', 'hawksbill-turtle'],
    researchProjectSlugs: ['turtle-telemetry'],
    conservationProjectSlugs: ['beach-guardian-nest-protection'],
    experienceSlugs: [],
    communitySlugs: ['hafun-youth-beach-guardians'],
    featured: true,
    published: true,
  },
  {
    id: 'somali-current-upwelling-explainer',
    slug: 'somali-current-upwelling-explainer',
    title: 'Why Somalia\'s Coast Flips Current Direction Twice a Year',
    category: 'ocean-news',
    author: 'Blue Ocean Editorial Team',
    date: '2026-07-02',
    displayDate: 'July 2, 2026',
    readTime: '5 min read',
    featuredImage: '/somalia_coast.jpg',
    gallery: [
      { url: '/somalia_coast.jpg', caption: 'Coastal waters along the Somali Current corridor.' },
      { url: '/exp_coastal_cliff.jpg', caption: 'Upwelling-fed waters off the Bari coast.' },
      { url: '/marine_fish.jpg', caption: 'Pelagic fish drawn by seasonal upwelling productivity.' },
    ],
    excerpt: "Twice a year, the Somali Current does something almost no other ocean current does — reverses direction entirely. Here's what drives it, and why it makes this coast so productive.",
    content: [
      paragraph('Most major ocean currents run in a fairly constant direction year-round. The Somali Current is a rare exception: driven by the monsoon cycle, it reverses direction twice a year, running south during the northeast monsoon and swinging north — intensifying into one of the fastest currents in the world\'s oceans — during the southwest monsoon.'),
      paragraph('That reversal is why the Somali coast is so productive. As the current accelerates northward each summer, it pulls cold, nutrient-rich water up from the deep ocean along the coast — a process called upwelling — feeding the plankton blooms that in turn support the coast\'s fisheries.'),
      heading('A current with a split personality'),
      paragraph('During the southwest monsoon, a rotating gyre known as the Great Whirl forms off the northern coast, alongside a smaller secondary eddy further out. Both systems shape where nutrients concentrate — and, in turn, where fish, and the animals that feed on them, congregate.'),
      pullquote('The same current that reverses direction twice a year is the reason this coast can feed as much life as it does.', 'Blue Ocean Editorial Team'),
      paragraph('This seasonal engine is a large part of why field seasons for Blue Ocean\'s own research — from whale shark tagging to tuna sampling — are built around the monsoon calendar rather than the Gregorian one.'),
    ],
    destinationSlugs: ['bosaso', 'eyl'],
    speciesSlugs: [],
    researchProjectSlugs: [],
    conservationProjectSlugs: [],
    experienceSlugs: [],
    communitySlugs: [],
    featured: false,
    published: true,
  },
  {
    id: 'dugong-survey-results',
    slug: 'dugong-survey-results',
    title: 'Drone Survey Confirms One of the Last Resident Dugong Populations in East Africa',
    category: 'research',
    author: 'Blue Ocean Marine Biodiversity Unit',
    date: '2026-06-24',
    displayDate: 'June 24, 2026',
    readTime: '4 min read',
    featuredImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'A dugong feeding trail visible in a shallow seagrass meadow.' },
      { url: '/jubaland.jpg', caption: 'The Bajuni Archipelago\'s sheltered seagrass channels.' },
      { url: '/somalia_coast.jpg', caption: 'Southern coastal waters included in the aerial survey.' },
    ],
    excerpt: "A systematic drone survey has confirmed a small, year-round resident dugong population in the Bajuni Archipelago's seagrass channels — among the last known strongholds for the species anywhere in East Africa.",
    content: [
      paragraph('Blue Ocean\'s Marine Biodiversity Unit has completed a systematic drone-based aerial survey of the Bajuni Archipelago\'s seagrass channels, confirming a small, resident dugong population using the channels year-round — one of the last such strongholds documented anywhere in East Africa.'),
      paragraph('Dugongs are notoriously difficult to survey by boat; drone transects allowed the team to cover far more of the channel system with far less disturbance to the animals themselves.'),
      heading('A population with almost no margin for loss'),
      paragraph('The survey\'s population estimate directly informed the Zero-Gillnet Protected Corridors for Somali Sirenians proposal — gillnet entanglement is the leading cause of dugong mortality region-wide, and a population this small has little capacity to absorb losses.'),
      pullquote('Finding them was the hard part. Keeping them here is the part that matters now.', 'Blue Ocean Marine Biodiversity Unit'),
      paragraph('The channels surveyed border landing sites used by the Kismayo Women\'s Fish Processing Collective, whose members have become informal partners in monitoring channel health day to day.'),
    ],
    destinationSlugs: ['kismayo'],
    speciesSlugs: ['dugong'],
    researchProjectSlugs: ['dugong-aerial-survey'],
    conservationProjectSlugs: ['sirenian-protected-corridors'],
    experienceSlugs: [],
    communitySlugs: ['kismayo-womens-fish-processing'],
    featured: false,
    published: true,
  },
  {
    id: 'lobster-accord-two-years-on',
    slug: 'lobster-accord-two-years-on',
    title: 'Two Years On, Eyl\'s Lobster Accord Is Still Holding',
    category: 'coastal-communities',
    author: 'Blue Ocean Fisheries Science Team',
    date: '2026-06-10',
    displayDate: 'June 10, 2026',
    readTime: '3 min read',
    featuredImage: '/eyl1.jpg',
    gallery: [
      { url: '/eyl1.jpg', caption: 'Eyl\'s escarpment coastline, the primary lobster fishing ground.' },
      { url: '/exp_coastal_cliff.jpg', caption: 'The Bari escarpments surveyed for the original biomass study.' },
      { url: '/exp_scuba_diving.jpg', caption: 'A survey diver documenting lobster density in reef crevices.' },
    ],
    excerpt: "The Berried Female Release & Size-Limit Accord — co-designed by Eyl's own fishing families — has now held for two full seasons, with no sign of the cooperatives stepping back from it.",
    content: [
      paragraph('Two seasons after Eyl\'s fishing cooperatives adopted a self-designed accord to release egg-bearing female lobsters and observe a minimum harvest size, the practice is still holding — with no formal enforcement mechanism beyond the cooperatives\' own agreement to it.'),
      paragraph('The accord grew out of a completed biomass and catch-effort study that confirmed what generations of local harvesters already suspected: protecting breeding females mattered more than almost any other single intervention available to the fishery.'),
      heading('Why it has lasted'),
      paragraph('Unlike a regulation imposed from outside, the accord was co-designed by the same crews now following it — a distinction Blue Ocean\'s Fisheries Science Team credits directly for its durability two seasons in.'),
      pullquote('It held because they wrote it, not because someone made them follow it.', 'Blue Ocean Fisheries Science Team'),
    ],
    destinationSlugs: ['eyl', 'bargaal', 'hafun'],
    speciesSlugs: ['spiny-lobster'],
    researchProjectSlugs: ['lobster-sustainable-yield'],
    conservationProjectSlugs: ['berried-female-release-accord'],
    experienceSlugs: [],
    communitySlugs: ['eyl-traditional-knowledge-keepers'],
    featured: false,
    published: true,
  },
];

// --- Cross-link resolution -------------------------------------------

function resolveDestinations(slugs = []) {
  return slugs
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean)
    .map((d) => ({ id: d.id, slug: d.slug, name: d.name, region: d.region, heroImage: d.heroImage }));
}

function resolveSpecies(slugs = []) {
  return slugs
    .map((slug) => speciesList.find((s) => s.slug === slug))
    .filter(Boolean)
    .map((s) => ({ id: s.id, slug: s.slug, commonName: s.commonName, scientificName: s.scientificName, heroImage: s.heroImage, category: s.categoryName }));
}

function resolveResearch(slugs = []) {
  return slugs
    .map((slug) => researchProjects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ id: p.id, slug: p.slug, title: p.title, areaName: p.areaName, status: p.status, heroImage: p.heroImage }));
}

function resolveConservation(slugs = []) {
  return slugs
    .map((slug) => conservationProjects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ id: p.id, slug: p.slug, title: p.title, focusAreaName: p.focusAreaName, status: p.status, heroImage: p.heroImage }));
}

function resolveExperiences(slugs = []) {
  const all = getAllExperiences();
  return slugs
    .map((slug) => all.find((e) => e.slug === slug))
    .filter(Boolean)
    .map((e) => ({ id: e.id, slug: e.slug, title: e.title, category: e.category, heroImage: e.heroImage }));
}

function resolveCommunities(slugs = []) {
  return slugs
    .map((slug) => communities.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => ({ id: c.id, slug: c.slug, name: c.name, category: c.category, heroImage: c.heroImage }));
}

export const articles = rawArticles.map((a) => {
  const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
  return {
    ...a,
    categoryLabel: cat?.label || a.category,
    categoryBadgeClass: cat?.badgeClass || 'badge-turquoise',
    destinations: resolveDestinations(a.destinationSlugs),
    species: resolveSpecies(a.speciesSlugs),
    research: resolveResearch(a.researchProjectSlugs),
    conservation: resolveConservation(a.conservationProjectSlugs),
    experiences: resolveExperiences(a.experienceSlugs),
    communityLinks: resolveCommunities(a.communitySlugs),
  };
});

// --- Public helpers -----------------------------------------------------

export function getAllArticles() {
  return articles.filter((a) => a.published).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug || a.id === slug);
}

export function getFeaturedArticle() {
  return getAllArticles().find((a) => a.featured) || getAllArticles()[0];
}

export function getLatestArticles(limit = 3, excludeSlug = null) {
  return getAllArticles().filter((a) => a.slug !== excludeSlug).slice(0, limit);
}

export function getArticlesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return getAllArticles();
  return getAllArticles().filter((a) => a.category === categoryId);
}

export function getRelatedArticles(currentSlug, limit = 3) {
  const current = getArticleBySlug(currentSlug);
  if (!current) return getAllArticles().slice(0, limit);
  return getAllArticles()
    .filter((a) => a.slug !== currentSlug && (a.category === current.category || a.destinationSlugs.some((d) => current.destinationSlugs.includes(d))))
    .slice(0, limit);
}

export function getCategoryInfo(id) {
  return NEWS_CATEGORIES.find((c) => c.id === id || c.slug === id);
}

export function getCategoryArticleCount(categoryId) {
  return getAllArticles().filter((a) => a.category === categoryId).length;
}

// Backward-compatible alias for the pre-Sprint-7 homepage teaser shape.
export const newsArticles = articles.map((a) => ({
  id: a.id,
  title: a.title,
  excerpt: a.excerpt,
  category: a.categoryLabel,
  categoryColor: a.categoryBadgeClass,
  date: a.displayDate,
  readTime: a.readTime,
  image: a.featuredImage,
  path: `/news/${a.slug}`,
}));
