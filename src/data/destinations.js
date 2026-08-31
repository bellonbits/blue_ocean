export const destinations = [
  // --- PUNTLAND ---
  {
    id: 'bosaso',
    slug: 'bosaso',
    name: 'Bosaso',
    region: 'Puntland',
    regionId: 'puntland',
    location: 'Bari Region, Northern Somalia',
    coastlineArea: 'Gulf of Aden',
    destinationType: 'Commercial Port & Mountain Coast',
    tagline: 'Where the rugged Karkaar mountains meet the deep waters of the Gulf of Aden.',
    shortDescription: 'Somalia’s principal northern seaport, framed by dramatic volcanic ridges, deep pelagic upwelling zones, and active artisan tuna fishing fleets.',
    fullDescription: `Bosaso is the dynamic commercial gateway of northern Somalia, positioned where the stark limestone cliffs of the Karkaar mountain chain plunge directly into the cobalt depths of the Gulf of Aden.

Because the continental shelf drops rapidly just off the coast, Bosaso is uniquely situated near deep pelagic waters where powerful nutrient-rich seasonal upwellings nourish immense schools of yellowfin tuna, kingfish, and migrating whale sharks.

Along the shoreline, traditional wooden dhow builders continue heritage crafts that have linked the Horn of Africa to the Arabian Peninsula and Indian subcontinent for millennia. Blue Ocean’s research teams operate coastal monitoring stations here tracking fisheries health and marine mammal migrations along the Aden channel.`,
    heroImage: '/bosaso2.jpg',
    gallery: [
      '/bosaso2.jpg',
      '/bosaso1.jpg',
      '/marine_dolphins.jpg',
    ],
    coordinates: { lat: 11.2842, lng: 49.1813 },
    bestSeason: 'October to April (Calm seas & mild climate)',
    access: 'Bender Qassim International Airport (BSA) & coastal highway',
    featured: true,
    highlights: [
      'Deep pelagic drop-offs close to shore',
      'Historic coral-stone fortress overlooking Gulf of Aden',
      'Centuries-old wooden dhow harbor & maritime markets',
      'Seasonal whale shark migration corridor',
    ],
    marineSpecies: [
      {
        id: 'whale-shark',
        name: 'Whale Shark',
        scientificName: 'Rhincodon typus',
        image: '/marine_sharks.jpg',
        description: 'World’s largest fish, frequently feeding on seasonal plankton blooms off the Bosaso shelf.',
      },
      {
        id: 'spinner-dolphin',
        name: 'Spinner Dolphin',
        scientificName: 'Stenella longirostris',
        image: '/marine_dolphins.jpg',
        description: 'Resident pods numbering in the hundreds navigate the coastal Aden currents daily.',
      },
      {
        id: 'yellowfin-tuna',
        name: 'Yellowfin Tuna',
        scientificName: 'Thunnus albacares',
        image: '/marine_fish.jpg',
        description: 'Key pelagic species vital to local sustainable artisanal fisheries and ocean food webs.',
      },
    ],
    researchProjects: [
      {
        id: 'aden-pelagic-survey',
        title: 'Gulf of Aden Pelagic Biomass & Migration Survey',
        category: 'Fisheries Science',
        status: 'Active Field Project',
      },
      {
        id: 'whale-shark-satellite',
        title: 'Bari Coast Whale Shark Acoustic & Tagging Study',
        category: 'Marine Biodiversity',
        status: 'Ongoing Monitoring',
      },
    ],
    experiences: [
      { id: 'exp-dhow', title: 'Traditional Dhow Coastal Navigation', category: 'Water', active: false },
      { id: 'exp-dolphin', title: 'Pelagic Dolphin & Whale Watching', category: 'Wildlife', active: false },
      { id: 'exp-snork', title: 'Aden Shelf Snorkeling Expedition', category: 'Water', active: false },
    ],
  },
  {
    id: 'eyl',
    slug: 'eyl',
    name: 'Eyl',
    region: 'Puntland',
    regionId: 'puntland',
    location: 'Nugaal Region, Eastern Coast',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Canyon Estuary & Historic Anchorage',
    tagline: 'A breathtaking valley gorge cutting through high plateaus to meet the open Indian Ocean.',
    shortDescription: 'An ancient coastal haven set within the dramatic Nugaal Gorge, renowned for dramatic sandstone cliffs, seasonal freshwater lagoons, and pristine offshore lobster fisheries.',
    fullDescription: `Tucked into a dramatic fissure in the Somali plateau where the seasonal Nugaal River meets the Indian Ocean, Eyl is one of the most visually stunning natural amphitheaters on the African continent.

The town is split between Badey (the coastal fishing settlement on the beach) and Daawad (the historic upper town nestled beneath towering cliffs). Stone fortifications built over a century ago overlook a protected bay that has provided shelter to Indian Ocean navigators for generations.

The surrounding waters are celebrated for productive nearshore ecosystems, including rocky sub-tidal reefs that support healthy populations of spiny lobsters, green turtles, and seasonal migrations of humpback whales heading north through the Somali Current.`,
    heroImage: '/eyl1.jpg',
    gallery: [
      '/eyl1.jpg',
      '/eyl3.jpg',
      '/eyl2.jpg',
    ],
    coordinates: { lat: 7.9803, lng: 49.8164 },
    bestSeason: 'November to March',
    access: '4WD overland from Garowe (approx. 4 hours) or coastal airstrip',
    featured: true,
    highlights: [
      'Towering sandstone canyon walls meeting ocean waves',
      'Freshwater Nugaal estuary meeting turquoise Indian Ocean surf',
      'Historic stone forts and maritime architecture',
      'Artisanal spiny lobster fishery and reef flats',
    ],
    marineSpecies: [
      {
        id: 'green-turtle',
        name: 'Green Sea Turtle',
        scientificName: 'Chelonia mydas',
        image: '/marine_turtles.jpg',
        description: 'Grazes on rich algae and seagrass beds sheltering in Eyl’s rocky coves.',
      },
      {
        id: 'spiny-lobster',
        name: 'Painted Spiny Lobster',
        scientificName: 'Panulirus versicolor',
        image: '/marine_coral.jpg',
        description: 'Thrives in the crevices of Eyl’s submerged coastal canyon walls.',
      },
    ],
    researchProjects: [
      {
        id: 'eyl-lobster-assessment',
        title: 'Nugaal Shelf Sustainable Spiny Lobster Stock Assessment',
        category: 'Fisheries Science',
        status: 'Active Field Project',
      },
    ],
    experiences: [
      { id: 'exp-canyon', title: 'Nugaal Gorge Coastal Trekking', category: 'Land', active: false },
      { id: 'exp-fishing', title: 'Traditional Artisan Lobster & Reef Fishing', category: 'Water', active: false },
    ],
  },
  {
    id: 'hafun',
    slug: 'hafun',
    name: 'Hafun',
    region: 'Puntland',
    regionId: 'puntland',
    location: 'Bari Region (Ras Hafun Peninsula)',
    coastlineArea: 'Easternmost Point of Africa',
    destinationType: 'Tombolo Peninsula & Ancient Port',
    tagline: 'The easternmost projection of the African continent jutting 40 km into the Indian Ocean.',
    shortDescription: 'Ras Hafun is a world-famous geographic marvel connected to mainland Africa by a sweeping sand spit tombolo, home to the ancient trade port of Opone.',
    fullDescription: `Ras Hafun stands as the true eastern extremity of the African continent. This dramatic hammerhead-shaped peninsula is connected to the mainland by a 20-kilometre-long sand tombolo, flanked by sheltered lagoons on one side and the tempestuous open Indian Ocean on the other.

Identified by historians as the ancient trading emporium of 'Opone' documented in the 1st-century Periplus of the Erythraean Sea, Hafun has welcomed merchant vessels trading frankincense, spices, and pearls for over two thousand years.

Oceanographically, Hafun is ground zero for the intense Somali Current upwelling during the southwest monsoon, driving cold, nutrient-packed waters from the abyssal ocean to the sunlit surface and sparking one of the most explosive seasonal marine food chains on Earth.`,
    heroImage: '/hafun2.jpg',
    gallery: [
      '/hafun2.jpg',
      '/hafun1.jpg',
      '/hafun3.jpg',
    ],
    coordinates: { lat: 10.4222, lng: 51.2642 },
    bestSeason: 'December to April (Avoid peak summer monsoon)',
    access: 'Coastal trail via Iskushuban / overland expedition route',
    featured: true,
    highlights: [
      'The definitive easternmost point of Africa',
      'Sweeping 20 km sand tombolo joining peninsula to African continent',
      'Ancient Opone archaeological maritime ruins',
      'Crystal lagoons and artisanal fishing boat beach landings',
    ],
    marineSpecies: [
      {
        id: 'humpback-whale',
        name: 'Humpback Whale',
        scientificName: 'Megaptera novaeangliae',
        image: '/marine_dolphins.jpg',
        description: 'Uses the deep waters off Ras Hafun as a migratory highway across the Arabian Sea.',
      },
      {
        id: 'manta-ray',
        name: 'Oceanic Manta Ray',
        scientificName: 'Mobula birostris',
        image: '/marine_sharks.jpg',
        description: 'Feeds along the intense upwelling currents flanking the peninsula.',
      },
    ],
    researchProjects: [
      {
        id: 'hafun-upwelling',
        title: 'Somali Current Upwelling & Primary Productivity Dynamics',
        category: 'Oceanography',
        status: 'Key Priority Project',
      },
    ],
    experiences: [
      { id: 'exp-tombolo', title: 'Ras Hafun Continental Edge Expedition', category: 'Adventure', active: false },
      { id: 'exp-photo', title: 'Cape & Ocean Horizon Photography', category: 'Creative', active: false },
    ],
  },
  {
    id: 'bargaal',
    slug: 'bargaal',
    name: 'Bargaal',
    region: 'Puntland',
    regionId: 'puntland',
    location: 'Gardafu Region, Northeast Horn',
    coastlineArea: 'Arabian Sea / Guardafui Channel',
    destinationType: 'Historic Sultanate Port & Palm Oasis',
    tagline: 'A lush date palm oasis set against ancient coral terraces and cobalt seas.',
    shortDescription: 'Historically the seasonal capital of the Majeerteen Sultanate, Bargaal combines verdant date groves with crystal-clear coastal waters rich in pelagic fish.',
    fullDescription: `Set near the tip of the Horn of Africa, Bargaal is famous for its coastal date palm oases fed by freshwater springs emerging right at the base of the mountains.

During the 19th century, Bargaal served as a prominent maritime capital, with fortified stone watchtowers still standing sentinel along the beaches. Today, its waters are pristine and largely untouched by heavy industry, offering crystal-clear visibility and vibrant nearshore rocky reefs.

Blue Ocean works with local elders and fishing cooperatives in Bargaal to document traditional marine territorial rights and protect juvenile fish nurseries in coastal shallows.`,
    heroImage: '/bargaal_main.jpg',
    gallery: [
      '/bargaal_main.jpg',
      '/bargaal_1.jpg',
      '/bargaal_2.jpg',
    ],
    coordinates: { lat: 11.2833, lng: 50.9833 },
    bestSeason: 'November to March',
    access: 'Coastal marine route or unpaved route from Bosaso / Alula',
    featured: false,
    highlights: [
      'Coastal date palm plantations bordering turquoise beaches',
      'Historic sultanate fortifications and watchtowers',
      'High-clarity diving and snorkeling conditions',
      'Traditional wooden fishing fleet lining the white sand coast',
    ],
    marineSpecies: [
      {
        id: 'hawksbill-turtle',
        name: 'Hawksbill Turtle',
        scientificName: 'Eretmochelys imbricata',
        image: '/marine_turtles.jpg',
        description: 'Critically endangered species frequenting Bargaal’s sponge-rich rocky reef shelves.',
      },
    ],
    researchProjects: [
      {
        id: 'guardafui-turtle-survey',
        title: 'Guardafui Horn Sea Turtle Nesting Census',
        category: 'Marine Biodiversity',
        status: 'Seasonal Field Study',
      },
    ],
    experiences: [
      { id: 'exp-oasis', title: 'Date Oasis & Coast Walk', category: 'Land', active: false },
    ],
  },
  {
    id: 'qandala',
    slug: 'qandala',
    name: 'Qandala',
    region: 'Puntland',
    regionId: 'puntland',
    location: 'Bari Region, Northern Coast',
    coastlineArea: 'Gulf of Aden',
    destinationType: 'Fjord-like Coastal Bay & Frankincense Haven',
    tagline: 'A natural mountain cove renowned for frankincense exports and natural thermal springs.',
    shortDescription: 'Nestled between steep mountain bluffs along the Gulf of Aden, Qandala is a historic harbor town famed for frankincense commerce and thermal coastal springs.',
    fullDescription: `Qandala is situated on a sheltered cove along the Gulf of Aden coast, backed directly by the rugged frankincense-producing highland valleys of Mount Cal Madow.

The town possesses a unique microclimate and geothermal coastal springs that bubble up near the tide line. Historically an ancient port known in classical antiquity, Qandala remains an important hub for small-boat artisanal fishermen targeting snapper, grouper, and king mackerel.

The underwater topography features dramatic drop-offs with black coral formations, underwater caves, and deep-water gorgonian sea fans.`,
    heroImage: '/qandala_main.jpg',
    gallery: [
      '/qandala_main.jpg',
      '/qandala_1.jpg',
      '/qandala_2.jpg',
    ],
    coordinates: { lat: 11.4719, lng: 49.8728 },
    bestSeason: 'October to April',
    access: 'Boat from Bosaso (2 hours) or mountain road',
    featured: false,
    highlights: [
      'Dramatic coastal mountain bluffs dropping into clear turquoise sea',
      'Thermal mineral springs near the shoreline',
      'Deep underwater caverns and black coral colonies',
      'Proximity to Mount Cal Madow frankincense forests',
    ],
    marineSpecies: [
      {
        id: 'black-coral',
        name: 'Gorgonian & Black Coral',
        scientificName: 'Antipatharia',
        image: '/marine_coral.jpg',
        description: 'Ancient deep-water coral fans thriving in the shadowed drop-offs of the Aden basin.',
      },
    ],
    researchProjects: [
      {
        id: 'aden-deep-reef',
        title: 'Aden Sub-Tidal Benthic Survey',
        category: 'Coral Reef Health',
        status: 'Planning Phase',
      },
    ],
    experiences: [
      { id: 'exp-cove', title: 'Mountain Cove Marine Sightseeing', category: 'Water', active: false },
    ],
  },

  // --- JUBALAND ---
  {
    id: 'kismayo',
    slug: 'kismayo',
    name: 'Kismayo',
    region: 'Jubaland',
    regionId: 'jubaland',
    location: 'Lower Juba Region, Southern Somalia',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Major Maritime City & Island Gateway',
    tagline: 'Southern Somalia’s premier ocean city, surrounded by white sand beaches and mangrove estuaries.',
    shortDescription: 'The vibrant coastal capital of Jubaland, featuring a natural deep-water bay, rich mangrove ecosystems near the Jubba River, and the gateway to the Bajuni Archipelago.',
    fullDescription: `Kismayo is the economic and cultural heart of southern Somalia, blessed with an extraordinary natural harbor protected by a chain of nearshore barrier islands and headlands.

Located just south of where the fertile Jubba River empties into the Indian Ocean, Kismayo’s coastal waters are fed by nutrient-dense estuarine outflows that nourish immense mangrove forests, productive crustacean habitats, and vital nursery grounds for reef fish.

The beaches of Kismayo—stretching unbroken for tens of kilometers with powdery white sand—represent some of the finest natural coastlines in Eastern Africa. Blue Ocean conducts regular community beach cleanups, youth ocean education classes, and mangrove reforestation projects here.`,
    heroImage: '/jubaland.jpg',
    gallery: [
      '/jubaland.jpg',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      '/marine_turtles.jpg',
    ],
    coordinates: { lat: -0.3582, lng: 42.5454 },
    bestSeason: 'July to March (Year-round tropical climate)',
    access: 'Kismayo Airport (KMU) with direct flights from Mogadishu & Nairobi',
    featured: true,
    highlights: [
      'Expansive white sand beaches and turquoise swimming lagoons',
      'Jubba river delta mangrove forests and bird sanctuaries',
      'Gateway for expeditions into the Bajuni Archipelago',
      'Thriving artisan boatbuilding and coastal seafood culture',
    ],
    marineSpecies: [
      {
        id: 'dugong',
        name: 'Dugong (Sea Cow)',
        scientificName: 'Dugong dugon',
        image: '/marine_dolphins.jpg',
        description: 'Rare and endangered herbivorous marine mammal grazing in Jubaland seagrass meadows.',
      },
      {
        id: 'green-sea-turtle',
        name: 'Green Sea Turtle',
        scientificName: 'Chelonia mydas',
        image: '/marine_turtles.jpg',
        description: 'Regularly nests on the quiet sandy outer beaches flanking Kismayo.',
      },
      {
        id: 'mud-crab',
        name: 'Giant Mangrove Crab',
        scientificName: 'Scylla serrata',
        image: '/marine_coral.jpg',
        description: 'Keystone species in the Jubba River delta mangrove forest systems.',
      },
    ],
    researchProjects: [
      {
        id: 'jubba-mangrove-restoration',
        title: 'Jubba Estuary Mangrove Canopy & Carbon Sequestration Study',
        category: 'Coastal Ecosystems',
        status: 'Active Field Project',
      },
      {
        id: 'kismayo-beach-cleanup',
        title: 'Southern Coast Marine Debris & Microplastics Mapping',
        category: 'Ocean Pollution',
        status: 'Community Partnership',
      },
    ],
    experiences: [
      { id: 'exp-beach', title: 'Kismayo Coastline & Dunes Tour', category: 'Land', active: false },
      { id: 'exp-boat', title: 'Bajuni Channel Boat Cruise', category: 'Water', active: false },
      { id: 'exp-mangrove', title: 'Jubba River Estuary Mangrove Kayaking', category: 'Water', active: false },
    ],
  },
  {
    id: 'bajuni-islands',
    slug: 'bajuni-islands',
    name: 'Bajuni Islands',
    region: 'Jubaland',
    regionId: 'jubaland',
    location: 'Southern Jubaland Archipelago',
    coastlineArea: 'Bajuni Barrier Reef Channel',
    destinationType: 'Tropical Coral Archipelago',
    tagline: 'A chain of idyllic, reef-fringed islands extending along Somalia’s southernmost frontier.',
    shortDescription: 'Somalia’s premier coral archipelago: a stunning chain of barrier islands including Chovaye, Ngumi, and Koyama, renowned for untouched coral reefs and seafaring Bajuni culture.',
    fullDescription: `The Bajuni Archipelago is a breathtaking necklace of coral islands and islets that parallels the southern coast of Somalia from Kismayo all the way to Ras Kamboni near the Kenyan border.

Surrounded by crystal-clear turquoise lagoons and protected by a robust outer barrier reef, these islands harbor some of the most intact coral gardens, seagrass meadows, and sea turtle nesting rookeries in all of East Africa.

The indigenous Bajuni seafaring community has lived on these islands for centuries, navigating the complex reef passages in traditional 'ngalawa' outrigger canoes and lateen-rigged dhows. The islands are also one of the last confirmed refuges for the critically endangered dugong in Somali waters.`,
    heroImage: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      '/marine_sharks.jpg',
    ],
    coordinates: { lat: -0.8500, lng: 42.2000 },
    bestSeason: 'November to April (Optimal underwater visibility)',
    access: 'Boat charter from Kismayo harbor',
    featured: true,
    highlights: [
      'Pristine coral barrier reefs with exceptional marine biodiversity',
      'Untouched white-sand atolls and turquoise lagoons',
      'Historic stone settlements and traditional Bajuni maritime culture',
      'High-density sea turtle nesting beaches',
    ],
    marineSpecies: [
      {
        id: 'dugong-bajuni',
        name: 'Dugong',
        scientificName: 'Dugong dugon',
        image: '/marine_dolphins.jpg',
        description: 'Inhabits the calm, shallow seagrass banks between the islands.',
      },
      {
        id: 'reef-shark',
        name: 'Whitetip Reef Shark',
        scientificName: 'Triaenodon obesus',
        image: '/marine_sharks.jpg',
        description: 'Patrols the outer coral walls and drop-offs along the barrier reef.',
      },
      {
        id: 'staghorn-coral',
        name: 'Staghorn Coral',
        scientificName: 'Acropora cervicornis',
        image: '/marine_coral.jpg',
        description: 'Forms massive, vibrant underwater forests across the archipelago lagoons.',
      },
    ],
    researchProjects: [
      {
        id: 'bajuni-coral-census',
        title: 'Bajuni Barrier Reef Resilience & Coral Health Baseline',
        category: 'Coral Reef Health',
        status: 'Active Scientific Project',
      },
      {
        id: 'bajuni-dugong-tracking',
        title: 'Southern Somali Dugong Population & Habitat Mapping',
        category: 'Marine Biodiversity',
        status: 'Field Research',
      },
    ],
    experiences: [
      { id: 'exp-island-hop', title: 'Bajuni Island Hopping Expedition', category: 'Adventure', active: false },
      { id: 'exp-dive', title: 'Barrier Reef Scuba Diving & Snorkeling', category: 'Water', active: false },
      { id: 'exp-bajuni-culture', title: 'Traditional Seafarer Heritage Tour', category: 'Land', active: false },
    ],
  },
  {
    id: 'ras-kamboni',
    slug: 'ras-kamboni',
    name: 'Ras Kamboni',
    region: 'Jubaland',
    regionId: 'jubaland',
    location: 'Border of Somalia and Kenya',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Remote Frontier Cape & Wilderness Coast',
    tagline: 'Somalia’s southernmost coastal headland, where the wilderness reaches the surf.',
    shortDescription: 'A remote, wild coastal point at Somalia’s southern border, characterized by virgin beaches, dense coastal bush, and undisturbed sea turtle breeding grounds.',
    fullDescription: `Ras Kamboni marks the southernmost point of Somalia’s 3,025 km coastline. This remote headland is a true frontier wilderness where coastal thicket forests merge with pristine windswept dunes and dramatic coral headlands.

Because human activity is minimal here, Ras Kamboni’s beaches serve as vital, undisturbed nesting grounds for green and olive ridley sea turtles. The surrounding ocean waters support dense coral reefs that link seamlessly into the Lamu marine conservation corridors across the border.

Blue Ocean is actively working with regional rangers and community representatives to designate key stretches of Ras Kamboni as protected marine sanctuaries.`,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      '/marine_turtles.jpg',
      '/marine_fish.jpg',
    ],
    coordinates: { lat: -1.6406, lng: 41.5647 },
    bestSeason: 'December to March',
    access: 'Boat expedition from Kismayo / southern overland route',
    featured: false,
    highlights: [
      'Somalia’s southernmost coastal landmark',
      'Undisturbed virgin sea turtle nesting sanctuaries',
      'Wild coastal thicket and marine wilderness',
    ],
    marineSpecies: [
      {
        id: 'olive-ridley',
        name: 'Olive Ridley Turtle',
        scientificName: 'Lepidochelys olivacea',
        image: '/marine_turtles.jpg',
        description: 'Utilizes the dark, undisturbed sandy beaches for synchronized egg laying.',
      },
    ],
    researchProjects: [
      {
        id: 'kamboni-turtle-tagging',
        title: 'Transboundary Sea Turtle Migration & Telemetry',
        category: 'Marine Biodiversity',
        status: 'Conservation Initiative',
      },
    ],
    experiences: [
      { id: 'exp-wild', title: 'Frontier Coast Nature Walk', category: 'Adventure', active: false },
    ],
  },

  // --- SOMALIA CENTRAL & SOUTHERN ---
  {
    id: 'mogadishu',
    slug: 'mogadishu',
    name: 'Mogadishu',
    region: 'Somalia',
    regionId: 'somalia',
    location: 'Banaadir Region',
    coastlineArea: 'Central Indian Ocean',
    destinationType: 'Historic Maritime Capital',
    tagline: 'The historic White Pearl of the Indian Ocean, alive with vibrant coastal life.',
    shortDescription: 'Somalia’s legendary capital city, home to centuries-old Hamar Weyne coral-stone architecture, vibrant fish markets, and iconic Indian Ocean beachfronts.',
    fullDescription: `Known for centuries as the 'White Pearl of the Indian Ocean', Mogadishu is a historic maritime metropolis whose destiny has always been defined by the sea.

From the medieval minarets and coral-rag stone buildings of the ancient Hamar Weyne and Shangani districts to the bustling morning landings at the central fish market, ocean culture permeates every corner of the city.

The coastal shelf off Mogadishu supports rich pelagic fisheries including king mackerel, sailfish, and skipjack tuna. Today, Mogadishu’s shoreline is undergoing a vibrant revival, with coastal cafes, watersports enthusiasts, and ocean research institutes taking root.`,
    heroImage: '/mogadishu_beach.jpg',
    gallery: [
      '/mogadishu_beach.jpg',
      '/somalia_coast.jpg',
      '/marine_coral.jpg',
    ],
    coordinates: { lat: 2.0469, lng: 45.3182 },
    bestSeason: 'Year-round (Best: October to April)',
    access: 'Aden Adde International Airport (MGQ)',
    featured: true,
    highlights: [
      'Historic Hamar Weyne coral-stone district and maritime museum',
      'Vibrant central fish market with daily artisanal landings',
      'Bustling oceanfront promenades and fresh seafood restaurants',
      'Headquarters of Blue Ocean Marine Research and Education',
    ],
    marineSpecies: [
      {
        id: 'sailfish',
        name: 'Indo-Pacific Sailfish',
        scientificName: 'Istiophorus platypterus',
        image: '/marine_fish.jpg',
        description: 'Fast pelagic hunter frequently spotted by offshore artisanal fishermen.',
      },
      {
        id: 'bottlenose-dolphin',
        name: 'Indo-Pacific Bottlenose Dolphin',
        scientificName: 'Tursiops aduncus',
        image: '/marine_dolphins.jpg',
        description: 'Regularly seen breaching near Mogadishu harbor breakwaters.',
      },
    ],
    researchProjects: [
      {
        id: 'banaadir-coastal-water',
        title: 'Banaadir Coastal Water Quality & Oceanographic Monitoring',
        category: 'Water Quality',
        status: 'Continuous Monitoring',
      },
      {
        id: 'mogadishu-fish-market',
        title: 'Central Fish Market Catch Data & Species Indexing',
        category: 'Fisheries Science',
        status: 'Daily Data Collection',
      },
    ],
    experiences: [
      { id: 'exp-hamar-weyne', title: 'Hamar Weyne Maritime Heritage Walk', category: 'Land', active: false },
      { id: 'exp-boat-tour', title: 'Mogadishu Coastal Sightseeing Boat Tour', category: 'Water', active: false },
    ],
  },
  {
    id: 'liido-beach',
    slug: 'liido-beach',
    name: 'Liido Beach',
    region: 'Somalia',
    regionId: 'somalia',
    location: 'Abdiaziz District, Mogadishu',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Urban Beach & Recreation Strip',
    tagline: 'Somalia’s most famous shoreline, alive with evening strolls, swimming, and ocean breeze.',
    shortDescription: 'The beating heart of Mogadishu’s coastal recreation, featuring kilometers of golden sands, oceanfront dining, swimming, and vibrant community life.',
    fullDescription: `Liido Beach is more than just a stretch of sand—it is the living symbol of Somalia’s resilience and deep affection for the ocean.

Every weekend, thousands of families, students, entrepreneurs, and athletes gather on Liido’s expansive shoreline to swim in the warm Indian Ocean surf, play beach football, enjoy fresh seafood at oceanfront cafes, and watch the sun dip below the horizon.

The beach is protected by a series of nearshore sandbanks and submerged coral outcrops that create safe swimming conditions inside the surf zone. Blue Ocean conducts regular youth ocean literacy campaigns and community beach stewardship events right here.`,
    heroImage: '/mogadishu_beach.jpg',
    gallery: [
      '/mogadishu_beach.jpg',
      '/somalia_coast.jpg',
      '/marine_fish.jpg',
    ],
    coordinates: { lat: 2.0538, lng: 45.3689 },
    bestSeason: 'Year-round (Warm ocean temperatures constantly)',
    access: 'City transit from anywhere in central Mogadishu',
    featured: true,
    highlights: [
      'Somalia’s most vibrant public beach and social gathering point',
      'Oceanfront dining with fresh caught kingfish and lobster',
      'Warm Indian Ocean surf ideal for recreational swimming',
      'Weekly youth sports and marine education meetups',
    ],
    marineSpecies: [
      {
        id: 'flying-fish',
        name: 'Tropical Flying Fish',
        scientificName: 'Exocoetidae',
        image: '/marine_fish.jpg',
        description: 'Often seen gliding across the surface waters just beyond the Liido surf line.',
      },
    ],
    researchProjects: [
      {
        id: 'liido-microplastic',
        title: 'Liido Beach Sand & Microplastic Contaminant Index',
        category: 'Ocean Pollution',
        status: 'Community Science Project',
      },
    ],
    experiences: [
      { id: 'exp-liido-sunset', title: 'Liido Sunset & Seafood Experience', category: 'Land', active: false },
      { id: 'exp-swimming', title: 'Guided Ocean Swimming & Watersports', category: 'Water', active: false },
    ],
  },
  {
    id: 'jazeera',
    slug: 'jazeera',
    name: 'Jazeera',
    region: 'Somalia',
    regionId: 'somalia',
    location: '15 km South of Mogadishu',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Island Lagoon & Salt Pans',
    tagline: 'A scenic offshore island, tranquil coral lagoon, and traditional salt farming coastline.',
    shortDescription: 'Famous for its picturesque offshore island, pristine coral barrier lagoon, fresh seafood shacks, and historic natural salt production pans.',
    fullDescription: `Located just a short drive south of Mogadishu, Jazeera is a tranquil coastal escape characterized by a dramatic offshore coral island that sits just 500 meters from the mainland beach.

At low tide, calm shallow lagoons form behind the reef crest, providing an exceptional natural nursery for juvenile fish, octopus, and sea anemones. Traditional dhow boats ferry visitors across the tranquil channel to explore the rocky island and its sea caves.

Inland from the beach, extensive traditional solar salt evaporation pans have operated sustainably for decades, producing sea salt through the natural evaporation of Indian Ocean brine.`,
    heroImage: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      '/marine_coral.jpg',
    ],
    coordinates: { lat: 1.9547, lng: 45.2289 },
    bestSeason: 'October to May',
    access: 'Paved coastal road south from Mogadishu (25 minutes)',
    featured: false,
    highlights: [
      'Scenic offshore island reachable by traditional boat',
      'Shallow protected coral lagoon ideal for snorkeling',
      'Traditional solar sea salt evaporation flats',
      'Famous fresh seafood stalls serving grilled catch of the day',
    ],
    marineSpecies: [
      {
        id: 'reef-octopus',
        name: 'Day Octopus',
        scientificName: 'Octopus cyanea',
        image: '/marine_coral.jpg',
        description: 'Highly intelligent camouflage master inhabiting Jazeera’s tidal rock pools.',
      },
    ],
    researchProjects: [
      {
        id: 'jazeera-tidal-lagoon',
        title: 'Jazeera Tidal Lagoon Nursery Ecology & Biodiversity Index',
        category: 'Marine Biodiversity',
        status: 'Baseline Study',
      },
    ],
    experiences: [
      { id: 'exp-jazeera-boat', title: 'Island Crossing & Lagoon Snorkeling', category: 'Water', active: false },
      { id: 'exp-salt-pan', title: 'Solar Sea Salt Heritage Tour', category: 'Land', active: false },
    ],
  },
  {
    id: 'marka',
    slug: 'marka',
    name: 'Marka',
    region: 'Somalia',
    regionId: 'somalia',
    location: 'Lower Shabelle Region',
    coastlineArea: 'Indian Ocean',
    destinationType: 'Ancient Coral-Stone City',
    tagline: 'An ancient ocean trading town of whitewashed coral architecture and soaring sand dunes.',
    shortDescription: 'One of the oldest maritime settlements on the Swahili Coast, Marka is famed for its distinctive white coral buildings, sweeping orange sand dunes, and artisan weaving.',
    fullDescription: `Marka is an ancient port town steeped in centuries of Indian Ocean trade. Founded over a thousand years ago, the city was a vital center of the Ajuran Sultanate and a celebrated port of call for merchant vessels from Oman, Yemen, India, and China.

The town’s architecture is renowned for its whitewashed coral-stone buildings with ornate carved wooden doors, arched alleys, and tranquil interior courtyards. Directly behind the city, massive orange-gold sand dunes rise dramatically, creating a striking contrast against the turquoise Indian Ocean.

Marka’s fishermen operate from open sandy beaches, braving the powerful ocean breakers in agile fiberglass boats to harvest kingfish, tuna, and snappers from the fertile Shabelle coastal banks.`,
    heroImage: '/somalia_coast.jpg',
    gallery: [
      '/somalia_coast.jpg',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      '/marine_fish.jpg',
    ],
    coordinates: { lat: 1.7159, lng: 44.7719 },
    bestSeason: 'December to April',
    access: 'Coastal highway south from Mogadishu (approx. 70 km)',
    featured: true,
    highlights: [
      'Centuries-old whitewashed coral-stone architecture and alleys',
      'Spectacular towering coastal sand dunes',
      'Famous traditional Somali Alindi weaving craft',
      'Productive coastal shelf fisheries',
    ],
    marineSpecies: [
      {
        id: 'king-mackerel',
        name: 'King Mackerel',
        scientificName: 'Scomberomorus commerson',
        image: '/marine_fish.jpg',
        description: 'Fast predatory fish abundant in the offshore waters of Lower Shabelle.',
      },
    ],
    researchProjects: [
      {
        id: 'marka-artisanal-catch',
        title: 'Lower Shabelle Artisanal Catch Documentation & Gear Study',
        category: 'Fisheries Science',
        status: 'Community Survey',
      },
    ],
    experiences: [
      { id: 'exp-marka-heritage', title: 'Old Town Coral Architecture Tour', category: 'Land', active: false },
      { id: 'exp-dune-ocean', title: 'Sand Dune Coastal Safari', category: 'Adventure', active: false },
    ],
  },
  {
    id: 'barawe',
    slug: 'barawe',
    name: 'Barawe',
    region: 'Somalia',
    regionId: 'somalia',
    location: 'South West State (Lower Shabelle)',
    coastlineArea: 'Indian Ocean',
    destinationType: 'UNESCO-Grade Historic Port & Island Reefs',
    tagline: 'A jewel of the Swahili Coast, rich in maritime heritage, coral architecture, and coastal reefs.',
    shortDescription: 'A historic walled port town known for its unique Bravanese culture, coral-stone towers, offshore barrier reefs, and renowned seafaring traditions.',
    fullDescription: `Barawe (Brava) is one of the most culturally unique and historically significant coastal towns in the Horn of Africa. Established in the 10th century, it became a key port in the medieval Swahili trading network that linked East Africa to Persia and Arabia.

The town is home to the Bravanese people, who speak Chimwiini (a distinct Swahili dialect) and maintain famous crafts including hand-woven cotton textiles and the iconic 'Kofia Barawa' embroidered caps.

Barawe is protected by offshore coral reefs and barrier islands that provide calm anchorage for fishing boats. The surrounding marine ecosystems support rich coral gardens, sea turtle foraging areas, and abundant reef fish.`,
    heroImage: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
      '/somalia_coast.jpg',
      '/marine_coral.jpg',
    ],
    coordinates: { lat: 1.1133, lng: 44.0306 },
    bestSeason: 'December to March',
    access: 'Overland highway or coastal flight to Barawe Airport',
    featured: false,
    highlights: [
      'Centuries-old Swahili coral-stone architecture and watchtowers',
      'Unique Bravanese maritime heritage and textile craft',
      'Offshore barrier reef systems and calm natural harbour',
    ],
    marineSpecies: [
      {
        id: 'parrotfish',
        name: 'Bicolor Parrotfish',
        scientificName: 'Cetoscarus bicolor',
        image: '/marine_coral.jpg',
        description: 'Crucial reef herbivore maintaining the health of Barawe’s coral flats.',
      },
    ],
    researchProjects: [
      {
        id: 'barawe-reef-monitoring',
        title: 'South West Coastal Reef Community Assessment',
        category: 'Coral Reef Health',
        status: 'Active Survey',
      },
    ],
    experiences: [
      { id: 'exp-barawe-history', title: 'Bravanese Culture & Architecture Walk', category: 'Land', active: false },
    ],
  },
  {
    id: 'hobyo',
    slug: 'hobyo',
    name: 'Hobyo',
    region: 'Somalia',
    regionId: 'somalia',
    location: 'Mudug Region, Galmudug Coast',
    coastlineArea: 'Central Somali Basin',
    destinationType: 'Historical Sultanate Port & Upwelling Coast',
    tagline: 'The historic wind-swept harbor of central Somalia, famous for ancient trade and seasonal upwelling.',
    shortDescription: 'Historically the seat of the Sultanate of Hobyo, this central coastline is characterized by vast dunes, strong seasonal upwelling, and bountiful pelagic fisheries.',
    fullDescription: `Hobyo ('Here is water') is an ancient coastal town in the Mudug region of central Somalia, strategically positioned midway along Somalia’s vast coastline.

Founded as an essential freshwater replenishment port for Indian Ocean trading dhows traveling between the Persian Gulf and East Africa, Hobyo later became the capital of the historic Sultanate of Hobyo in the late 19th century.

Oceanographically, Hobyo sits at the epicenter of the Great Whirl and the powerful Somali Current upwelling system. In the summer months, cold, nutrient-rich deep water surges toward the coast, creating one of the highest concentrations of ocean biomass and pelagic fish in the Indian Ocean.`,
    heroImage: '/somalia_coast.jpg',
    gallery: [
      '/somalia_coast.jpg',
      'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ],
    coordinates: { lat: 5.3503, lng: 48.5269 },
    bestSeason: 'October to April (Milder coastal winds)',
    access: 'Overland road from Galkayo or coastal airstrip',
    featured: false,
    highlights: [
      'Historic 19th-century Sultanate of Hobyo ruins and architecture',
      'Vast coastal dune systems overlooking the Indian Ocean',
      'World-class pelagic fish biomass and upwelling research site',
    ],
    marineSpecies: [
      {
        id: 'spanish-mackerel',
        name: 'Narrow-barred Spanish Mackerel',
        scientificName: 'Scomberomorus commerson',
        image: '/marine_fish.jpg',
        description: 'Apex pelagic predator dominating the upwelling waters off Mudug.',
      },
    ],
    researchProjects: [
      {
        id: 'hobyo-great-whirl',
        title: 'Somali Current & Great Whirl Oceanographic Mapping',
        category: 'Oceanography',
        status: 'Regional Data Project',
      },
    ],
    experiences: [
      { id: 'exp-hobyo-dunes', title: 'Hobyo Coastal Dunes & History Trek', category: 'Adventure', active: false },
    ],
  },
];
