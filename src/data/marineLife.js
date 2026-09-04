// =========================================================
// Marine Life Data Model & Classification Library
// Blue Ocean Somalia — Sprint 3: Marine Life Field Guide
//
// i18n note: each translatable record carries a `translations.so`
// block with only the Somali overrides for that record (see
// ../lib/i18n/localizeData.js for merge semantics). Fields used as
// filter/lookup keys (`category`, `habitat`, `conservationStatus`)
// stay in English on the record itself — their translated display
// labels are served through the getter functions below instead.
// =========================================================

import { localize, localizeList } from '../lib/i18n/localizeData.js';

export const marineCategories = [
  {
    id: 'dolphins-whales',
    slug: 'dolphins-whales',
    title: 'Dolphins & Whales',
    description: 'Resident spinner dolphins, migratory humpback whales, and elusive blue whales patrolling deep pelagic upwellings.',
    image: '/marine_dolphins.jpg',
    count: 14,
    countLabel: '14+ Documented Species',
    group: 'Cetaceans',
    translations: {
      so: {
        title: 'Dhurwaaga & Nibiriyada',
        description: 'Dhurwaagyada wareega ee deggan, nibiriyada guuritaanka ah ee Humpback-ka, iyo nibiriyada buluugga ah ee aan sida fudud loo arki karin oo dhex mara moolalka badda ee qoto dheer.',
        countLabel: '14+ Nooc oo la Diiwaan Geliyay',
        group: 'Cetacea (Xayawaanka Naaska leh ee Badda)',
      },
    },
  },
  {
    id: 'sharks-rays',
    slug: 'sharks-rays',
    title: 'Sharks & Rays',
    description: 'Gentle oceanic whale sharks, reef apex predators, and majestic pelagic manta rays congregating in nutrient-rich channels.',
    image: '/marine_sharks.jpg',
    count: 28,
    countLabel: '28+ Documented Species',
    group: 'Elasmobranchs',
    translations: {
      so: {
        title: 'Libaaxyada Badda & Diinka Baalasha Leh',
        description: 'Libaaxyada badda ee nibiriga ah oo qaboobsan, ugaarsadayaasha ugu sarreeya qalcadaha dhagax-mareenka, iyo diinka manta-ha ee weyn ee isugu yimaadda marinnada hodanka ku ah nafaqada.',
        countLabel: '28+ Nooc oo la Diiwaan Geliyay',
        group: 'Elasmobranchs (Kalluunka Qalfoofka Cartilage-ka ah)',
      },
    },
  },
  {
    id: 'sea-turtles',
    slug: 'sea-turtles',
    title: 'Sea Turtles',
    description: 'Green turtles, hawksbills, loggerheads, and olive ridleys utilizing ancient nesting beaches across Hafun and Bajuni.',
    image: '/marine_turtles.jpg',
    count: 5,
    countLabel: '5 Documented Species',
    group: 'Marine Reptiles',
    translations: {
      so: {
        title: 'Diinka Badeedka',
        description: 'Diinka cagaaran, diinka qolof-dhexaadka ah, diinka madaxa weyn, iyo diinka saytuunka ah oo isticmaala xeebaha ugxan-dhigashada ee qadiimiga ah ee ku yaal Hufun iyo Bajuni.',
        countLabel: '5 Nooc oo la Diiwaan Geliyay',
        group: 'Xamaaratada Badda',
      },
    },
  },
  {
    id: 'fish',
    slug: 'fish',
    title: 'Fish',
    description: 'Vibrant reef dwellers, schooling pelagic tuna, sailfish, and giant groupers thriving in Africa’s richest maritime upwellings.',
    image: '/exp_coral_snorkeling.jpg',
    count: 420,
    countLabel: '420+ Documented Species',
    group: 'Actinopterygii',
    translations: {
      so: {
        title: 'Kalluunka',
        description: 'Kalluun midab dhalaalaya oo ku nool qalcadaha dhagax-mareenka, jeedarka iyo tuna-ha isku ururiya, kalluunka dayimaha leh, iyo kalluunka waaweyn ee ku barwaaqoobaya moolalka badda ee ugu hodan badan Afrika.',
        countLabel: '420+ Nooc oo la Diiwaan Geliyay',
        group: 'Actinopterygii (Kalluunka Baalasha Adag leh)',
      },
    },
  },
  {
    id: 'coral-reefs',
    slug: 'coral-reefs',
    title: 'Coral Reefs',
    description: 'Thriving brain corals, tabular acropora, and massive coral gardens sheltering over 80% of coastal biodiversity.',
    image: '/marine_coral.jpg',
    count: 180,
    countLabel: '180+ Coral Types',
    group: 'Cnidarians',
    translations: {
      so: {
        title: 'Dhagax-Mareenka Badda',
        description: 'Dhagax-mareenka maskaxda u eg, dhagax-mareenka miiska u eg, iyo beeraha dhagax-mareenka ee waaweyn oo hoy u ah in ka badan 80% kala duwanaanshaha noolaha xeebaha.',
        countLabel: '180+ Nooc oo Dhagax-Mareen ah',
        group: 'Cnidaria (Xayawaanka Qanjiraha Sunta leh)',
      },
    },
  },
  {
    id: 'seagrass',
    slug: 'seagrass',
    title: 'Seagrass',
    description: 'Expansive underwater meadows acting as critical blue carbon sinks and crucial foraging grounds for dugongs and green turtles.',
    image: '/marine_seagrass.jpg',
    count: 12,
    countLabel: '12 Seagrass Types',
    group: 'Marine Angiosperms',
    translations: {
      so: {
        title: 'Doogga Badda',
        description: 'Dooxooyin balaadhan oo badda hoosteeda ah kuwaas oo u shaqeeya sidii meelo muhiim ah oo lagu ururiyo kaarboonka buluuga ah, waxayna sidoo kale u ahaan meelo muhiim ah oo ay wax ka daaqaan doonbadeedyada iyo diinka cagaaran.',
        countLabel: '12 Nooc oo Doog Badeed ah',
        group: 'Dhirta Badda ee Ubaxa Dhalaya',
      },
    },
  },
  {
    id: 'crustaceans',
    slug: 'crustaceans',
    title: 'Crustaceans',
    description: 'Spiny lobsters, deep-water crabs, ghost crabs, and cleaner shrimp forming vital foundations of the benthic food web.',
    image: '/exp_scuba_diving.jpg',
    count: 85,
    countLabel: '85+ Documented Species',
    group: 'Crustacea',
    translations: {
      so: {
        title: 'Xayawaanka Qolofta Adag leh',
        description: 'Aargoosto qodxaha leh, dhooddi biyaha qoto dheer ku nool, dhooddiga "ashaarad", iyo qololaha nadiifiyaha ah, kuwaas oo sameeya saldhig muhiim ah oo shabakadda cuntada guntinka badda.',
        countLabel: '85+ Nooc oo la Diiwaan Geliyay',
        group: 'Crustacea (Xayawaanka Qolofta Adag leh)',
      },
    },
  },
  {
    id: 'other',
    slug: 'other',
    title: 'Other Marine Life',
    description: 'Echinoderms, cephalopods, sea cucumbers, giant clams, and pelagic jellyfish populating the Somali continental shelf.',
    image: '/exp_dhow_sailing.jpg',
    count: 65,
    countLabel: '65+ Documented Species',
    group: 'Invertebrates',
    translations: {
      so: {
        title: 'Noolaha Badda Kale',
        description: 'Xayawaanka qodxaha leh (Echinoderms), xayawaanka sida foosxaska ah (cephalopods), khiyaarka badda, sabaayada waaweyn, iyo qallanjada badda oo ku badan qarticka qaaradeed ee Soomaaliya.',
        countLabel: '65+ Nooc oo la Diiwaan Geliyay',
        group: 'Xayawaanka Laf-dhabarta La\'aan',
      },
    },
  },
];

export const marineEcosystems = [
  {
    id: 'coral-reefs',
    title: 'Pristine Coral Reefs',
    somaliName: 'Qalcadaha Dhagax-mareenka',
    image: '/marine_coral.jpg',
    description: 'High-energy barrier reefs and sheltered patch reefs with exceptional thermal tolerance, particularly around Bajuni and Cap Guardafui.',
    keyRegions: ['Bajuni Archipelago', 'Cap Guardafui', 'Qandala Coves'],
    healthMetric: '94% Structural Integrity',
    speciesSupported: 'Over 600 species',
    translations: {
      so: {
        title: 'Dhagax-Mareenka Saafiga ah',
        description: 'Dhagax-mareen xoog badan oo xannibaya hirarka iyo dhagax-mareen ilaalisan oo leh awood gaar ah oo u dulqaadan kulaylka, gaar ahaan aagagga Bajuni iyo Cap Guardafui.',
        healthMetric: '94% Dhisme oo Dhammaystiran',
        speciesSupported: 'In ka badan 600 oo nooc',
      },
    },
  },
  {
    id: 'seagrass-meadows',
    title: 'Blue Carbon Seagrass Meadows',
    somaliName: 'Dooga Badda',
    image: '/marine_seagrass.jpg',
    description: 'Dense sub-tidal seagrass meadows absorbing carbon at 35x the rate of tropical rainforests and nurturing juvenile fish.',
    keyRegions: ['Lower Juba Coast', 'Kismayo Lagoon', 'Hafun Bay'],
    healthMetric: '620 km² Documented Extent',
    speciesSupported: 'Dugongs, Green Turtles, Juvenile Snappers',
    translations: {
      so: {
        title: 'Dooxooyinka Doogga Badda ee Kaarboonka Buluuga ah',
        description: 'Dooxooyin doog badeed oo qaro weyn ah oo hoos yimaada heerka mowjadaha, kuwaas oo nuugaya kaarboon 35 jibbaar ka badan xawaaraha kaymaha roobabka kulaylaha, waxayna sidoo kale koriyaan kalluunka yaryar.',
        healthMetric: '620 km² oo Baaxad ah oo la Diiwaan Geliyay',
        speciesSupported: 'Doonbadeedyada, Diinka Cagaaran, Kalluunka Snapper ee Yaryar',
      },
    },
  },
  {
    id: 'deep-pelagic-upwellings',
    title: 'Deep Pelagic Upwellings',
    somaliName: 'Badda Moolka Dheer',
    image: '/exp_scuba_diving.jpg',
    description: 'The Somali Current creates one of Earth’s four major ocean upwellings, pulling icy, nutrient-packed deep water to the surface.',
    keyRegions: ['Ras Asir (Cap Guardafui)', 'Bari Pelagic Shelf', 'Nugaal Trough'],
    healthMetric: 'Top 5 Marine Upwellings Globally',
    speciesSupported: 'Whale Sharks, Yellowfin Tuna, Humpbacks',
    translations: {
      so: {
        title: 'Moolalka Badda ee Qoto Dheer',
        description: 'Qulqulka Badda Soomaaliya wuxuu sameeyaa mid ka mid ah afarta molal ee ugu waaweyn adduunka, isagoo soo jiidaya biyo qabow oo qoto dheer ah, kuwaas oo nafaqo aad u badan sidda, ilaa dusha sare.',
        healthMetric: 'Kow ilaa Shan ee Moolalka Badda ee Adduunka',
        speciesSupported: 'Libaaxa Nibiriga ah, Jeedarka, Nibiriga Humpback-ka',
      },
    },
  },
  {
    id: 'mangrove-forests',
    title: 'Coastal Mangrove Forests',
    somaliName: 'Kaymaha Dhirta Badda',
    image: '/jubaland.jpg',
    description: 'Stilt-rooted Rhizophora mucronata forests defending coastal villages against storm surges while providing nursery shelters.',
    keyRegions: ['Bajuni Barrier Islands', 'Lower Juba Estuary', 'Eyl Gorge Mouth'],
    healthMetric: 'Vital Shoreline Defense',
    speciesSupported: 'Mud Crabs, Sea Bass, Herons, Reef Sharks',
    translations: {
      so: {
        title: 'Kaymaha Cawska Badda (Mangrove) ee Xeebta',
        description: 'Kaymaha xididada dhaadheer leh ee nooca Rhizophora mucronata ayaa ilaaliya tuulooyinka xeebta ka hortagga duufaannada, iyagoo sidoo kale u ah meelo koriya dhalaanka kalluunka.',
        healthMetric: 'Difaac Muhiim ah oo Xeebta ah',
        speciesSupported: 'Dhooddiga Dhoobka, Kalluunka Bass-ka, Haadka Calaanle, Libaaxyada Dhagax-mareenka',
      },
    },
  },
  {
    id: 'sandy-tombolos-dunes',
    title: 'Tombolos & Sandy Shoals',
    somaliName: 'Ciidda & Dhaadaha Xeebta',
    image: '/hafun2.jpg',
    description: 'Vast natural sandspits and coastal dunes providing undisturbed nesting rookeries for ancient sea turtle lineages.',
    keyRegions: ['Hafun Peninsula', 'Bargaal Shoreline', 'Mogadishu Coastal Arc'],
    healthMetric: 'Critical Nesting Habitat',
    speciesSupported: 'Loggerheads, Hawksbills, Ghost Crabs',
    translations: {
      so: {
        title: 'Ciidda iyo Dhaadhaha Xeebta',
        description: 'Ciid dabiici ah oo balaadhan iyo buurooyin ciid xeebeed ah oo ah meelo ugxan-dhigasho aan la carqaladeynin oo u ah abtirsiinta qadiimiga ah ee diinka badeedka.',
        healthMetric: 'Deegaan Ugxan-dhigasho oo Muhiim ah',
        speciesSupported: 'Diinka Madaxa Weyn, Diinka Qolof-dhexaadka ah, Dhooddiga Ashaaradda',
      },
    },
  },
  {
    id: 'rocky-cliffs-coves',
    title: 'Limestone Cliffs & Headlands',
    somaliName: 'Qarka Dhagaxa & Buuraha Xeebta',
    image: '/exp_coastal_cliff.jpg',
    description: 'Towering Karkaar limestone formations plunging into cobalt ocean water, creating cavernous habitats and roosts.',
    keyRegions: ['Bari Headlands', 'Eyl Escarpment', 'Qandala Sea Caves'],
    healthMetric: 'Unspoiled Frontier',
    speciesSupported: 'Rock Lobsters, Moray Eels, Seabird Colonies',
    translations: {
      so: {
        title: 'Buuraha Dhagaxa Nuurad ah iyo Dhinacyada Xeebta',
        description: 'Qaababka dhagaxa nuurad ah ee Karkaar ee dhaadheer ayaa gala biyaha badda ee buluug-madow ah, iyagoo sameeya deegaano god-god ah iyo meelo hoyasho ah.',
        healthMetric: 'Xudduud aan Weli la Xumeyn',
        speciesSupported: 'Aargoosto Dhagaxa, Maraakiibta Moray, Kooxaha Haadka Badda',
      },
    },
  },
];

export const speciesList = [
  // 1. Bottlenose Dolphin (Dolphins & Whales)
  {
    id: 'bottlenose-dolphin',
    slug: 'bottlenose-dolphin',
    commonName: 'Bottlenose Dolphin',
    somaliName: 'Danyeer Badeed',
    scientificName: 'Tursiops truncatus',
    category: 'dolphins-whales',
    categoryName: 'Dolphins & Whales',
    group: 'Marine Mammal',
    tagline: 'Intelligent. Social. Built for the open sea.',
    editorialStatement: 'Revered by Somali coastal fishermen for guiding seasonal schools of fish, these highly intelligent cetaceans form close-knit pods navigating both shallow lagoons and deep coastal shelves.',
    description: 'The common bottlenose dolphin is one of the most recognizable marine mammals in the world. Along Somalia’s 3,025 km coastline, resident populations thrive in the confluence of the Gulf of Aden and the warm Indian Ocean.',
    heroImage: '/marine_dolphins.jpg',
    gallery: [
      { url: '/marine_dolphins.jpg', caption: 'Pod of bottlenose dolphins riding the bow wake in the Gulf of Aden near Bosaso.', photographer: 'Blue Ocean Marine Survey' },
      { url: '/somalia_coast.jpg', caption: 'Coastal waters near Cap Guardafui where resident pods feed at dawn.', photographer: 'Somali Oceanographic Initiative' },
      { url: '/exp_dhow_sailing.jpg', caption: 'Traditional dhow encounters with inquisitive dolphin pods.', photographer: 'Maritime Heritage Project' },
    ],
    habitat: 'Coastal Waters',
    depth: '1 - 100 meters',
    distribution: 'Widely distributed along the entire Somali coast, with high density in the Gulf of Aden corridor and Bajuni archipelago shallows.',
    diet: 'Squid, schooling mackerel, yellowfin fry, mullet, and benthic crustaceans.',
    size: '2.5 – 3.8 meters (8 – 12.5 ft)',
    weight: '200 – 500 kg',
    lifespan: '40 – 50 years',
    conservationStatus: 'Least Concern',
    statusExplanation: 'Globally listed as Least Concern (IUCN), though local Somali populations face emerging pressures from unmonitored gillnets and maritime traffic in shipping lanes.',
    interestingFacts: [
      'Somali artisanal fishermen have maintained cooperative traditions with dolphin pods for generations.',
      'They can swim at burst speeds exceeding 35 km/h (22 mph) when hunting pelagic prey.',
      'Each bottlenose dolphin develops a unique signature whistle that acts like an individual name.',
      'Their brains possess a high encephalization quotient, allowing complex problem-solving and social cooperation.',
    ],
    featured: true,
    destinations: [
      { id: 'bosaso', name: 'Bosaso', slug: 'bosaso', region: 'Puntland' },
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'qandala', name: 'Qandala', slug: 'qandala', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'cetacean-monitoring', title: 'Somali Cetacean Acoustic & Population Survey', location: 'Gulf of Aden Corridor', status: 'Active Field Project' },
      { id: 'bycatch-mitigation', title: 'Artisanal Gillnet Bycatch Mitigation Program', location: 'Bari & Lower Juba', status: 'Ongoing Conservation Study' },
    ],
    conservationProjects: [
      { id: 'safe-corridors', title: 'Marine Mammal Migration Safe Corridors', region: 'Somali Basin' },
    ],
    translations: {
      so: {
        commonName: 'Dhurwaanka Sanka Gaaban',
        categoryName: 'Dhurwaaga & Nibiriyada',
        group: 'Xayawaanka Naaska leh ee Badda',
        tagline: 'Caqli badan. Bulsheed. Loo abuuray badda furan.',
        editorialStatement: 'Kalluumeystayaasha xeebta Soomaaliyeed ayaa aad u ixtiraama sababtoo ah waxay hagaan kooxaha kalluunka xilliyeed, xayawaankan naaska leh ee caqliga badan waxay sameeyaan kooxo isku dhow oo dhex mara haróorooyinka gaagaaban iyo jiirarka xeebta ee qoto dheer.',
        description: 'Dhurwaanka sanka gaaban ee caadiga ah waa mid ka mid ah xayawaanka naaska leh ee badda ee ugu caansan adduunka. Waqooyiga xeebta Soomaaliya ee dherer ahaan 3,025 km, dadka deggan halkaas waxay ku barwaaqoobaan halka ay ku kulmaan Gacanka Cadmeed iyo Badweynta Hindiya ee diiran.',
        distribution: 'Waxay si ballaaran ugu faafaan xeebta Soomaaliya oo dhan, iyagoo aad ugu badan marinka Gacanka Cadmeed iyo biyaha gaagaaban ee jasiiradaha Bajuni.',
        diet: 'Xarshinbiro, kalluunka mackerel-ka ee isugu urura, dhalaanka jeedarka, kalluunka mullet-ka, iyo xayawaanka qolofta leh ee guntinka badda.',
        statusExplanation: 'Caalamka ahaan waxaa lagu qeexaa Halis Yar (IUCN), inkastoo dadyowga Soomaaliyeed ay wajahaan cadaadis soo kordhaya oo ka imanaya shabagyada aan la kormeerin iyo socodka maraakiibta ee marinnada badda.',
        interestingFacts: [
          'Kalluumeystayaasha Soomaaliyeed ayaa ka wada shaqeeya dhurwaanka jiilba jiil.',
          'Waxay dabbaali karaan xawaare dhaafaya 35 km/h markay ugaarsanayaan.',
          'Dhurwaan kastaa wuxuu leeyahay foodhi gaar ah oo u shaqeeya sida magac shakhsi ah.',
          'Maskaxdoodu waxay leedahay awood sare, taasoo u oggolaanaysa xalinta dhibaatooyinka kakan iyo iskaashiga bulsheed.',
        ],
      },
    },
  },

  // 2. Whale Shark (Sharks & Rays)
  {
    id: 'whale-shark',
    slug: 'whale-shark',
    commonName: 'Whale Shark',
    somaliName: 'Libax Baddoodka Weyn',
    scientificName: 'Rhincodon typus',
    category: 'sharks-rays',
    categoryName: 'Sharks & Rays',
    group: 'Elasmobranch (Cartilaginous Fish)',
    tagline: 'Gentle giants of the nutrient-rich deep upwellings.',
    editorialStatement: 'Gliding silently through the plankton-rich upwellings off the Horn of Africa, the world’s largest fish is a testament to the untamed bounty of Somalia’s deep maritime corridor.',
    description: 'The whale shark is the largest known living fish species. Reaching lengths over 12 meters, these slow-moving filter feeders migrate thousands of kilometers to follow seasonal plankton blooms generated by the powerful Somali Current upwelling between October and April.',
    heroImage: '/marine_sharks.jpg',
    gallery: [
      { url: '/marine_sharks.jpg', caption: 'Juvenile whale shark feeding near the surface off Cap Guardafui.', photographer: 'Blue Ocean Survey Team' },
      { url: '/exp_scuba_diving.jpg', caption: 'Scuba researchers observing a whale shark along the deep pelagic drop-off.', photographer: 'Puntland Marine Explorer' },
      { url: '/bargaal_main.jpg', caption: 'Bargaal coastal waters where seasonal upwellings attract feeding aggregations.', photographer: 'Horn of Africa Maritime Institute' },
    ],
    habitat: 'Open Ocean',
    depth: 'Surface to 1,900 meters',
    distribution: 'Concentrated in deep oceanic drop-offs along the Puntland coast, Ras Asir upwelling zones, and southern migratory routes toward Kenya.',
    diet: 'Plankton, krill, fish eggs, crab larvae, and small schooling fish like sardines.',
    size: 'Up to 14 meters (46 ft)',
    weight: 'Up to 20 metric tons',
    lifespan: '80 – 130 years',
    conservationStatus: 'Endangered',
    statusExplanation: 'Listed as Endangered on the IUCN Red List due to historical targeted fishing in international waters, vessel strikes in busy shipping corridors, and accidental bycatch.',
    interestingFacts: [
      'Despite their colossal size, whale sharks are completely harmless to humans, feeding solely through filter pads in their mouths.',
      'Every whale shark possesses a unique pattern of white spots and stripes behind its gills, functioning like a human fingerprint.',
      'Their skin can be up to 15 centimeters (6 inches) thick, making it one of the toughest hides in the animal kingdom.',
      'They can filter more than 6,000 liters of seawater every single hour while feeding.',
    ],
    featured: true,
    destinations: [
      { id: 'bosaso', name: 'Bosaso', slug: 'bosaso', region: 'Puntland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
      { id: 'bargaal', name: 'Bargaal', slug: 'bargaal', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'whale-shark-satellite', title: 'Bari Coast Whale Shark Acoustic & Tagging Study', location: 'Cap Guardafui / Ras Asir', status: 'Active Satellite Telemetry' },
      { id: 'upwelling-dynamics', title: 'Somali Current Plankton & Pelagic Biomass Model', location: 'Puntland Shelf', status: 'Active Multi-Year Research' },
    ],
    conservationProjects: [
      { id: 'shark-sanctuary', title: 'Horn of Africa Elasmobranch Protection Initiative', region: 'Gulf of Aden & Guardafui Channel' },
    ],
    translations: {
      so: {
        commonName: 'Libaaxa Nibiriga ah ee Badda',
        categoryName: 'Libaaxyada Badda & Diinka Baalasha Leh',
        group: 'Elasmobranch (Kalluunka Qalfoofka Cartilage-ka ah)',
        tagline: 'Waaweynta qaboobsan ee moolalka qoto dheer ee hodanka ku ah nafaqada.',
        editorialStatement: 'Isagoo aamusnaan ku sii socda moolalka hodanka ku ah plankton-ka ee Geeska Afrika, kalluunka ugu weyn adduunka wuxuu marag u yahaan barwaaqada aan la taaban ee marinka badda ee Soomaaliya ee qoto dheer.',
        description: 'Libaaxa nibiriga ah waa nooca kalluunka ugu weyn ee la yaqaan ee nool. Wuxuu gaadhaa dherer ka badan 12 mitir, xayawaankan si tartiib ah u dhaqaaqa oo cuntada shaandheeya wuxuu u guuraa kumanaan kiiloomitir si uu u raaco kobaca plankton-ka xilliyeed ee ka dhasha molalka xooggan ee Qulqulka Badda Soomaaliya intii u dhaxaysa Oktoobar iyo Abriil.',
        distribution: 'Waxay ku badan yihiin qarka badda ee qoto dheer ee xeebta Puntland, aagagga molalka Raas Caseyr, iyo jidadka guuritaanka koonfureed ee xagga Kenya.',
        diet: 'Plankton, krill, ukumaha kalluunka, dirxiga dhooddiga, iyo kalluun yaryar oo isugu urura sida sardhiinka.',
        statusExplanation: 'Waxaa lagu qeexay Halis Xoogan liiska IUCN, sababo la xiriira kalluumeysiga taariikhiga ah ee ku beegan biyaha caalamiga ah, dhaawac uga yimaada maraakiibta marinnada mashquulka ah, iyo qabashada kama-dambeysta ah.',
        interestingFacts: [
          'In kasta oo ay waaweyn yihiin, libaaxyada nibiriga ah waxba uma dhimayaan bini-aadamka, waxayna wax ku cunaan oo keliya shaandhaha afkooda.',
          'Libaax kasta wuxuu leeyahay qaab u gaar ah oo dhibco cad ah iyo xariiqyo ah oo ka danbeeya dhuxushiisa, sida faraha bini-aadamka.',
          'Maqaarkoodu wuxuu gaadhaa dhererka 15 santimitir, kana dhigaya mid ka mid ah maqaarka ugu adag xayawaanka.',
          'Waxay shaandheyn karaan in ka badan 6,000 litir oo biyo badeed ah saacad kasta intay wax cunayaan.',
        ],
      },
    },
  },

  // 3. Green Sea Turtle (Sea Turtles)
  {
    id: 'green-sea-turtle',
    slug: 'green-sea-turtle',
    commonName: 'Green Sea Turtle',
    somaliName: 'Diin-Badeedka Cagaaran',
    scientificName: 'Chelonia mydas',
    category: 'sea-turtles',
    categoryName: 'Sea Turtles',
    group: 'Marine Reptile',
    tagline: 'Ancient voyagers nesting along pristine sandspits.',
    editorialStatement: 'Navigating across ocean basins to return to the very sands where they hatched, green sea turtles represent millions of years of living maritime history along the Somali coast.',
    description: 'The green sea turtle is an iconic herbivorous marine reptile that plays a foundational role in maintaining healthy seagrass meadows. Somalia’s undisturbed sandy tombolos, particularly around Hafun and the Bajuni archipelago, serve as critical nesting sanctuaries.',
    heroImage: '/marine_turtles.jpg',
    gallery: [
      { url: '/marine_turtles.jpg', caption: 'Adult green sea turtle grazing on seagrass in Bajuni shallows.', photographer: 'Blue Ocean Turtle Project' },
      { url: '/hafun2.jpg', caption: 'Hafun tombolo beach, where hundreds of nesting crawls are recorded annually.', photographer: 'Somali Coastal Guard' },
      { url: '/marine_seagrass.jpg', caption: 'Sub-tidal seagrass beds in Lower Juba providing vital grazing habitat.', photographer: 'Marine Ecology Survey' },
    ],
    habitat: 'Seagrass',
    depth: '1 - 50 meters',
    distribution: 'Nesting rookeries on Hafun Peninsula and Bajuni Islands; foraging widely in seagrass beds from Kismayo to Bosaso.',
    diet: 'Adults feed almost exclusively on seagrass (Thalassia) and algae; juveniles are omnivorous.',
    size: '1.0 – 1.2 meters shell length',
    weight: '150 – 200 kg',
    lifespan: '70 – 90 years',
    conservationStatus: 'Endangered',
    statusExplanation: 'Listed as Endangered on the IUCN Red List due to historic egg harvesting, loss of nesting beaches, plastic ingestion, and accidental entanglement in fishing nets.',
    interestingFacts: [
      'Green turtles get their name not from their shell color, but from the greenish layer of fat beneath their carapace.',
      'Female sea turtles return to the exact beach where they were born decades earlier to lay their own eggs.',
      'By grazing seagrass meadows, they prevent the beds from becoming overgrown and dying, maintaining vital fish nurseries.',
      'They can hold their breath underwater for up to five hours while resting or sleeping.',
    ],
    featured: true,
    destinations: [
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'eyl', name: 'Eyl', slug: 'eyl', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'turtle-telemetry', title: 'Indian Ocean Sea Turtle Satellite Telemetry & Nest Monitoring', location: 'Hafun & Bajuni Archipelagos', status: 'Active Field Telemetry' },
    ],
    conservationProjects: [
      { id: 'turtle-patrol', title: 'Community Beach Guardian Nest Protection Program', region: 'Hafun Sandspit' },
    ],
    translations: {
      so: {
        commonName: 'Diinta Badeedka ee Cagaaran',
        categoryName: 'Diinka Badeedka',
        group: 'Xamaarad Badeed',
        tagline: 'Safarayaasha qadiimiga ah oo ugxan ka dhiga ciidda saafiga ah.',
        editorialStatement: 'Iyagoo dhex maraya badaha si ay ugu noqdaan xeebihii ay ka dhasheen, diinta badeedka ee cagaaran waxay matalaan malaayiin sano oo taariikh badeed oo nool ah oo ku teedsan xeebta Soomaaliya.',
        description: 'Diinta badeedka ee cagaaran waa xamaarad badeed caan ah oo cunta doogga oo door muhiim ah ka ciyaarta ilaalinta doogga badda ee caafimaadka qaba. Ciidda xeebaha Soomaaliya ee aan la carqaladeynin, gaar ahaan Hufun iyo jasiiradaha Bajuni, waxay u shaqeeyaan sidii meelo ugxan-dhigasho oo muhiim ah.',
        distribution: 'Meelaha ugxan-dhigashada ee Jasiirad-gacanka Hufun iyo Jasiiradaha Bajuni; waxayna wax ka daaqaan doogga badda intii u dhaxaysa Kismaayo iyo Boosaaso.',
        diet: 'Kuwa waaweyn waxay ugu badnaan wax ka cunaan doogga badda (Thalassia) iyo algae-ga; kuwa yaryar waxay cunaan cunto kasta.',
        statusExplanation: 'Waxaa lagu qeexay Halis Xoogan liiska IUCN, sababo la xiriira ururinta ukumaha taariikhiga ah, luminta xeebaha ugxan-dhigashada, cunista caagga (plastic-ka), iyo ku dhex xayirmis shabagyada kalluumeysiga.',
        interestingFacts: [
          'Diinta cagaaran magaceeda kama iman midabka qolofteeda, ee wuxuu ka yimid dufanka cagaaran ee hoosta qolofteeda ku yaal.',
          'Diinta dhaddigga ah waxay ku noqotaa xeebtii ay ku dhalatay tobanaan sano ka hor si ay u dhigato ukumaheeda.',
          'Iyagoo wax ka daaqaya doogga badda, waxay ka hortagaan in doogga xad-dhaafo oo dhinto, iyagoo ilaalinaya meelaha ay ku koraan kalluunka.',
          'Waxay hakin karaan neefsigooda ilaa shan saacadood iyagoo hurda ama nasanaya.',
        ],
      },
    },
  },

  // 4. Yellowfin Tuna (Fish)
  {
    id: 'yellowfin-tuna',
    slug: 'yellowfin-tuna',
    commonName: 'Yellowfin Tuna',
    somaliName: 'Jeedar',
    scientificName: 'Thunnus albacares',
    category: 'fish',
    categoryName: 'Fish',
    group: 'Actinopterygii (Ray-Finned Fish)',
    tagline: 'High-speed pelagic powerhouse of the Indian Ocean.',
    editorialStatement: 'Slicing through ocean currents at astonishing speed, the yellowfin tuna is the ecological heartbeat and economic backbone of Somalia’s artisanal coastal fisheries.',
    description: 'Yellowfin tuna are apex pelagic predators renowned for their streamlined hydrodynamic bodies, striking bright yellow dorsal and anal finlets, and exceptional endurance.',
    heroImage: '/exp_coral_snorkeling.jpg',
    gallery: [
      { url: '/exp_coral_snorkeling.jpg', caption: 'Yellowfin tuna hunting along the coral reef drop-off.', photographer: 'Blue Ocean Fisheries Team' },
      { url: '/exp_dhow_sailing.jpg', caption: 'Traditional handline fishing for yellowfin from wooden dhows.', photographer: 'Puntland Fishermen Cooperative' },
      { url: '/bosaso2.jpg', caption: 'Bosaso fish markets where fresh yellowfin is landed daily.', photographer: 'Maritime Trade Documentation' },
    ],
    habitat: 'Open Ocean',
    depth: '1 - 250 meters',
    distribution: 'Throughout all Somali pelagic waters, with major seasonal concentrations along the Bari coast and Guardafui Channel.',
    diet: 'Sardines, anchovies, flying fish, squid, cuttlefish, and pelagic crab larvae.',
    size: 'Up to 2.4 meters (7.9 ft)',
    weight: 'Up to 200 kg (440 lbs)',
    lifespan: '7 – 9 years',
    conservationStatus: 'Near Threatened',
    statusExplanation: 'Listed as Near Threatened by the IUCN due to industrial foreign longline fishing pressure in international waters adjacent to the Somali Exclusive Economic Zone.',
    interestingFacts: [
      'They can swim at speeds of up to 75 km/h (47 mph), making them one of the fastest animals in the ocean.',
      'Unlike most fish, yellowfin tuna have warm-blooded muscles (endothermy), allowing their swimming muscles to operate at peak efficiency.',
      'Somali artisanal fishermen utilize traditional sustainable handline techniques that cause zero seafloor damage.',
      'They have specialized grooved depressions where fins fold flush against their bodies to achieve near-zero drag.',
    ],
    featured: true,
    destinations: [
      { id: 'bosaso', name: 'Bosaso', slug: 'bosaso', region: 'Puntland' },
      { id: 'bargaal', name: 'Bargaal', slug: 'bargaal', region: 'Puntland' },
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
    ],
    researchProjects: [
      { id: 'fisheries-stock', title: 'Somali EEZ Pelagic Tuna Stock Assessment & Genetic Mapping', location: 'Somali Basin', status: 'Active Stock Survey' },
    ],
    conservationProjects: [
      { id: 'sustainable-catch', title: 'Fair Trade Handline Certification for Somali Artisanal Fleets', region: 'Puntland Coast' },
    ],
    translations: {
      so: {
        commonName: 'Jeedarka Baalasha Huruudda ah',
        categoryName: 'Kalluunka',
        group: 'Actinopterygii (Kalluunka Baalasha Adag leh)',
        tagline: 'Awood weyn oo xawaare sare leh oo ka mid ah Badweynta Hindiya.',
        editorialStatement: 'Isagoo xawaare cajiib ah ku jarjaraya qulqulka badda, jeedarku wuxuu yahay wadnaha deegaanka iyo laf-dhabarta dhaqaale ee kalluumeysiga xeebta Soomaaliya.',
        description: 'Jeedarku waa ugaarsadayaal badda ku caan baxay jidhkooda si fiican u qaabaysan, baalashooda huruudda ah ee dhalaalaya, iyo awoodooda dulqaadka aad u sarreysa.',
        distribution: 'Waxay ku baahsan yihiin dhammaan biyaha badweynta Soomaaliya, iyagoo si gaar ah ugu badan xeebta Bari iyo Marinka Guardafui xilliyeed.',
        diet: 'Sardhiin, kalluun yaryar, kalluunka duula, xarshinbiro, iyo dirxiga dhooddiga badda.',
        statusExplanation: 'Waxaa lagu qeexay Halis u Dhow liiska IUCN, sababo la xiriira cadaadiska kalluumeysiga warshadaha shisheeye ee khadadka dhaadheer ee ku dhow xuduudda dhaqaale ee gaarka u ah Soomaaliya.',
        interestingFacts: [
          'Waxay dabbaali karaan xawaare gaadhaya 75 km/h, taasoo ka dhigaysa mid ka mid ah xayawaanka ugu dheereeya badda.',
          'Si ka duwan kalluunka intiisa kale, jeedarku wuxuu leeyahay muruqyo dugsi sida xayawaanka dhiiga diirran, taasoo u oggolaanaysa dabbaalka si ugu wanaagsan.',
          'Kalluumeystayaasha Soomaaliyeed waxay isticmaalaan xadhig kalluumeysi oo dhaqameed ah oo aan waxyeello u geysan guntinka badda.',
          'Waxay leeyihiin god gaar ah oo baalashoodu ku dhex dhacaan si ay u yareeyaan caqabadaha biyaha.',
        ],
      },
    },
  },

  // 5. Staghorn & Table Coral (Coral Reefs)
  {
    id: 'acropora-coral',
    slug: 'acropora-coral',
    commonName: 'Staghorn & Table Coral',
    somaliName: 'Dhagax-Mareenka Laamaha Leh',
    scientificName: 'Acropora muricata',
    category: 'coral-reefs',
    categoryName: 'Coral Reefs',
    group: 'Cnidarian (Scleractinia)',
    tagline: 'Living architecture of the Somali barrier reefs.',
    editorialStatement: 'Building intricate three-dimensional underwater cities that shelter thousands of marine species, Somalia’s resilient coral reefs represent pristine reef ecosystems.',
    description: 'Acropora corals are the primary reef-building species of the Western Indian Ocean. Forming branching antlers and sprawling flat tables, these colonies support massive biomass in the Bajuni Archipelago and Gulf of Aden.',
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'Pristine table and branching coral garden in Bajuni Archipelago.', photographer: 'Blue Ocean Coral Survey' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Snorkeler observing healthy coral structures in shallow turquoise waters.', photographer: 'Reef Ecology Team' },
      { url: '/exp_scuba_diving.jpg', caption: 'Deep reef walls covered in hard and soft corals.', photographer: 'Diving Explorer Group' },
    ],
    habitat: 'Coral Reef',
    depth: '2 - 30 meters',
    distribution: 'Extensive barrier systems off Bajuni Islands, patch reefs around Qandala, and sheltered coves in Bari.',
    diet: 'Photosynthetic zooxanthellae symbionts and filter-feeding on zooplankton at night.',
    size: 'Colonies can span over 3 meters across',
    weight: 'Colonies weigh hundreds of kilograms',
    lifespan: 'Individual colonies live for decades to centuries',
    conservationStatus: 'Vulnerable',
    statusExplanation: 'Listed as Vulnerable due to global ocean acidification, localized destructive fishing, and marine heatwaves.',
    interestingFacts: [
      'Corals are animals, not plants; their stunning colors come from microscopic symbiotic algae living inside their tissues.',
      'The Somali coastal upwellings provide cooler water pulses that help protect local reefs against thermal bleaching.',
      'A single hectare of healthy coral reef can produce up to 35 tons of fish biomass annually.',
      'Corals spawn synchronously once or twice a year, releasing millions of gametes in a synchronized underwater event.',
    ],
    featured: true,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'qandala', name: 'Qandala', slug: 'qandala', region: 'Puntland' },
      { id: 'bosaso', name: 'Bosaso', slug: 'bosaso', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'coral-thermal-study', title: 'Thermal Resilience & Coral Genotyping in the Horn of Africa', location: 'Bajuni & Qandala Reefs', status: 'Active Biodiversity Survey' },
    ],
    conservationProjects: [
      { id: 'mpa-zoning', title: 'Somali Marine Protected Area (MPA) Framework & Reef Zoning', region: 'Bajuni Marine Reserve' },
    ],
    translations: {
      so: {
        commonName: 'Dhagax-Mareenka Laamaha iyo Miiska u eg',
        categoryName: 'Dhagax-Mareenka Badda',
        group: 'Cnidaria (Dhagax-mareenka Adag)',
        tagline: 'Dhisme nool oo ka mid ah dhagax-mareenka xannibaya ee Soomaaliya.',
        editorialStatement: 'Iyagoo dhisaya magaalooyin badda hoosteeda ah oo qaab saddex-geesoodka ah leh, kuwaas oo hoy u ah kumanaan nooc oo badda ah, dhagax-mareenka adkaysiga leh ee Soomaaliya waxay matalaan deegaanno dhagax-mareen oo saafi ah.',
        description: 'Dhagax-mareenka Acropora waa nooca ugu horreeya ee dhisa dhagax-mareenka Badweynta Hindiya ee Galbeed. Iyagoo sameeya laamo u eg geesaha deerada iyo miisas fidsan, kooxahan waxay taageeraan noolaha ballaaran ee jasiiradaha Bajuni iyo Gacanka Cadmeed.',
        distribution: 'Nidaamyo dhagax-mareen oo waaweyn oo ku yaal jasiiradaha Bajuni, dhagax-mareenka Qandala, iyo dooxyada ilaalisan ee Bari.',
        diet: 'Algae-ga hoos degga ee iftiin-kariyaha ah iyo shaandheynta zooplankton-ka habeenkii.',
        statusExplanation: 'Waxaa lagu qeexay Halis, sababo la xiriira aashitada badweynta caalamiga ah, kalluumeysiga burburiya ee goobaha qaarkood, iyo kuleylka badda.',
        interestingFacts: [
          'Dhagax-mareenku waa xayawaan, ma aha dhir; midabkooda qurxoon wuxuu ka yimaadaa algae-ga aan la arki karin ee ku nool unugyadooda.',
          'Molalka xeebta Soomaaliya waxay keenaan biyo qabow oo gargaara ilaalinta dhagax-mareenka ka hortagga kuleylka.',
          'Hektar keliya oo dhagax-mareen caafimaad qaba ah wuxuu soo saari karaa ilaa 35 tan oo kalluun ah sannad kasta.',
          'Dhagax-mareenku waxay dhalaan isku mar sannadkiiba hal ama laba jeer, iyagoo sii daaya malaayiin ukun ah dhacdo isku waqti ah.',
        ],
      },
    },
  },

  // 6. Humpback Whale (Dolphins & Whales)
  {
    id: 'humpback-whale',
    slug: 'humpback-whale',
    commonName: 'Humpback Whale',
    somaliName: 'Nibiriga Booda',
    scientificName: 'Megaptera novaeangliae',
    category: 'dolphins-whales',
    categoryName: 'Dolphins & Whales',
    group: 'Marine Mammal (Mysticeti)',
    tagline: 'Oceanic giants singing across underwater canyons.',
    editorialStatement: 'Migrating along Somalia’s deep oceanic trenches each winter, humpback whales breach dramatically into the sky, filling the deep acoustic channels with haunting whale song.',
    description: 'Humpback whales are baleen whales famed for their enormous pectoral fins, complex vocalizations, and extraordinary breaching behavior along the Somali maritime corridor.',
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Humpback whales breaching off the cliffs of Bari during winter migration.', photographer: 'Blue Ocean Cetacean Unit' },
      { url: '/marine_dolphins.jpg', caption: 'Mixed pod of cetaceans navigating the Guardafui Channel.', photographer: 'Somali Marine Mammal Survey' },
      { url: '/somalia_coast.jpg', caption: 'Deep coastal waters off Eyl where humpback songs are recorded.', photographer: 'Ocean Acoustic Research' },
    ],
    habitat: 'Open Ocean',
    depth: 'Surface to 400 meters',
    distribution: 'Migratory corridor along the entire eastern seaboard of Somalia, with resting aggregations off Eyl and Ras Asir.',
    diet: 'Krill, small schooling fish (sardines, herring, capelin) using bubble-net feeding.',
    size: '14 – 17 meters (46 – 56 ft)',
    weight: '30 – 40 metric tons',
    lifespan: '80 – 90 years',
    conservationStatus: 'Least Concern',
    statusExplanation: 'The global population is Least Concern; however, the sub-population in the Northern Indian Ocean is critically endangered and numbers fewer than 250 individuals.',
    interestingFacts: [
      'Humpback songs can travel thousands of kilometers through the deep ocean sound channel (SOFAR).',
      'Their pectoral flippers can measure up to one-third of their entire body length—the largest limbs of any animal on Earth.',
      'They practice cooperative bubble-net feeding, blowing rings of air bubbles to herd prey before lunging upward.',
      'A newborn humpback calf can drink up to 600 liters of rich maternal milk every day.',
    ],
    featured: true,
    destinations: [
      { id: 'eyl', name: 'Eyl', slug: 'eyl', region: 'Puntland' },
      { id: 'bosaso', name: 'Bosaso', slug: 'bosaso', region: 'Puntland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'acoustic-hydrophone', title: 'Somali Deep Hydrophone Acoustic Corridor Mapping', location: 'Eyl Trench & Guardafui Channel', status: 'Active Passive Acoustic Monitoring' },
    ],
    conservationProjects: [
      { id: 'ship-strike-warning', title: 'Maritime Route Whale Collision Advisory System', region: 'Gulf of Aden Transit Lanes' },
    ],
    translations: {
      so: {
        commonName: 'Nibiriga Weyn ee Booda',
        categoryName: 'Dhurwaaga & Nibiriyada',
        group: 'Xayawaanka Naaska leh ee Badda (Nibiriyada Balleennada leh)',
        tagline: 'Waaweynta badda oo ku heesa dooxooyinka badda hoosteeda ah.',
        editorialStatement: 'Iyagoo xilliga qabow guuraya jiirarka badda ee qoto dheer ee Soomaaliya, nibiriyada Humpback-ku waxay si xoog leh ugu boodaan cirka, iyagoo ka buuxiya marinnada dhawaqa qoto dheer heeso xayawaanimo oo taban.',
        description: 'Nibiriyada Humpback-ku waa nibiriyo caan ku ah baalashooda waaweyn, codadkooda kakan, iyo dabeecaddooda gaarka ah ee ay ku booddaan marinka badda Soomaaliya.',
        distribution: 'Marin guuritaan ah oo ku teedsan xeebta bari ee Soomaaliya oo dhan, iyagoo isugu urura si ay u nastaan agagaarka Ceel iyo Raas Caseyr.',
        diet: 'Krill, kalluun yaryar oo isugu urura (sardhiin, herring, capelin) iyagoo isticmaalaya shabag-buufin si ay wax u cunaan.',
        statusExplanation: 'Tirada caalamiga ah waa Halis Yar; hase yeeshee, koox-hoosaadka ku nool Badweynta Hindiya ee Waqooyi ayaa halis xoogan ku jirta, waxaana ka yar 250 xayawaan ah.',
        interestingFacts: [
          'Heesaha nibiriga Humpback-ku waxay dhex mari karaan kumanaan kiiloomitir oo badda ah iyagoo maraya marinka dhawaqa ee qoto dheer (SOFAR).',
          'Baalashoodu waxay gaadhi karaan saddex meelood meel dhererka jidhkooda oo dhan, kuwaas oo ah addimada ugu waaweyn xayawaan kasta oo Dhulka ku nool.',
          'Waxay ku cunaan iskaashi, iyagoo buufinaya bulbulo hawo si ay ugaarta u kaxeeyaan ka hor inta aysan xagga sare u boodin.',
          'Ilmaha nibiriga Humpback-ka ee dhawaan dhashay wuxuu maalin kasta cabbi karaa ilaa 600 litir oo caano hooyo ah.',
        ],
      },
    },
  },

  // 7. Oceanic Manta Ray (Sharks & Rays)
  {
    id: 'manta-ray',
    slug: 'manta-ray',
    commonName: 'Oceanic Manta Ray',
    somaliName: 'Diin-Badeedka Baalasha Leh',
    scientificName: 'Mobula birostris',
    category: 'sharks-rays',
    categoryName: 'Sharks & Rays',
    group: 'Elasmobranch (Myliobatiformes)',
    tagline: 'Gentle giants flying through the turquoise sea.',
    editorialStatement: 'With wingspans exceeding seven meters, oceanic manta rays glide with hypnotic grace over deep cleaning stations and plankton-rich reef drop-offs along Somalia’s outer islands.',
    description: 'The giant oceanic manta ray is the largest ray species on Earth. Possessing the largest brain-to-body ratio of any fish, they exhibit remarkable curiosity and complex social behavior in Somali waters.',
    heroImage: '/exp_scuba_diving.jpg',
    gallery: [
      { url: '/exp_scuba_diving.jpg', caption: 'Giant oceanic manta ray hovering at a reef cleaning station in Bajuni.', photographer: 'Blue Ocean Expedition' },
      { url: '/marine_coral.jpg', caption: 'Coral pinnacle drop-offs where manta rays congregate during morning tides.', photographer: 'Marine Survey Team' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Manta ray feeding on surface plankton in shallow coastal lagoons.', photographer: 'Jubaland Marine Project' },
    ],
    habitat: 'Coral Reef',
    depth: '0 - 1,000 meters',
    distribution: 'Outer barrier reefs of Bajuni archipelago, Ras Asir pinnacle mounts, and deep drop-offs off Hafun.',
    diet: 'Microscopic zooplankton, fish eggs, and small pelagic crustaceans.',
    size: 'Wingspan up to 7 meters (23 ft)',
    weight: 'Up to 2,000 kg (4,400 lbs)',
    lifespan: '45 – 50 years',
    conservationStatus: 'Endangered',
    statusExplanation: 'Listed as Endangered on the IUCN Red List due to high targeted fishing for gill plates in unsustainable international markets and slow reproductive rates.',
    interestingFacts: [
      'Manta rays have passed the mirror self-recognition test, indicating high levels of self-awareness.',
      'Unlike stingrays, manta rays possess no poisonous tail stinger and are completely harmless to divers.',
      'Each manta has a distinct spot pattern on its ventral belly that remains unchanged throughout its entire lifetime.',
      'They must swim continuously to keep oxygenated water flowing over their gills.',
    ],
    featured: true,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
      { id: 'qandala', name: 'Qandala', slug: 'qandala', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'manta-photo-id', title: 'Somali Manta Ray Photo-ID Database & Cleaning Station Registry', location: 'Bajuni Archipelago', status: 'Active Photo-ID Registry' },
    ],
    conservationProjects: [
      { id: 'elasmobranch-ban', title: 'National Mobulid & Ray Trade Ban Enforcement', region: 'Somalia Waters' },
    ],
    translations: {
      so: {
        commonName: 'Diinka Baalasha Weyn ee Badda',
        categoryName: 'Libaaxyada Badda & Diinka Baalasha Leh',
        group: 'Elasmobranch (Diinka Baalasha Leh)',
        tagline: 'Waaweynta qaboobsan oo ku duulaysa badda cagaaran ee bilicsan.',
        editorialStatement: 'Iyagoo leh baalal dhaadheer oo dhaafaya toddoba mitir, diinka manta-ha ee badda waxay si nimco leh u duulaan korka goobaha nadaafadda qoto dheer iyo qarka dhagax-mareenka ee hodanka ku ah plankton-ka, ku teedsan jasiiradaha dibedda ee Soomaaliya.',
        description: 'Diinka manta-ha ee badda waa nooca diinka ugu weyn Dhulka. Waxay leeyihiin saamiga maskaxda ugu weyn marka loo eego jidhka kalluunka kale, waxayna muujiyaan xiisaha iyo dabeecadaha bulsheed ee kakan ee biyaha Soomaaliya.',
        distribution: 'Dhagax-mareenka dibedda ee jasiiradaha Bajuni, buuraha badda ee Raas Caseyr, iyo qarka qoto dheer ee Hufun.',
        diet: 'Zooplankton aan la arki karin, ukumaha kalluunka, iyo xayawaanka yaryar ee qolofta leh ee badda.',
        statusExplanation: 'Waxaa lagu qeexay Halis Xoogan liiska IUCN, sababo la xiriira kalluumeysiga sarreeya ee lagu bartilmaameedsanayo dhuxusha, suuqyada caalamiga ah ee aan waarin, iyo tirada tarmidda ee gaabis ah.',
        interestingFacts: [
          'Diinka manta-ha waxay gudbeen imtixaanka is-aqoonsiga muraayadda, taasoo muujinaysa heer sare oo is-fahamka ah.',
          'Si ka duwan diinka qaba sunta, diinka manta-hu ma laha dabo sun leh, waxayna gabi ahaanba khatar u yihiin dabbaashayaasha.',
          'Manta kasta wuxuu leeyahay qaab dhibco ah oo caalamka gudihiisa u gaar ah oo aan is-bedelin nolosha oo dhan.',
          'Waa inay si joogto ah u dabbaalaan si biyo oksijiin leh ugu qulqulaan dhuxushooda.',
        ],
      },
    },
  },

  // 8. Hawksbill Sea Turtle (Sea Turtles)
  {
    id: 'hawksbill-turtle',
    slug: 'hawksbill-turtle',
    commonName: 'Hawksbill Sea Turtle',
    somaliName: 'Diin-Badeedka Qolof-Dhexe',
    scientificName: 'Eretmochelys imbricata',
    category: 'sea-turtles',
    categoryName: 'Sea Turtles',
    group: 'Marine Reptile',
    tagline: 'Critically endangered reef gardeners with intricate shells.',
    editorialStatement: 'Crucial for maintaining healthy coral gardens by keeping sponges in check, the hawksbill is one of the most stunning yet endangered creatures in the Somali sea.',
    description: 'The hawksbill sea turtle is distinguished by its narrow, pointed beak and overlapping carapace scutes. They reside almost exclusively among vibrant coral reefs in the Bajuni Archipelago and Guardafui.',
    heroImage: '/marine_turtles.jpg',
    gallery: [
      { url: '/marine_turtles.jpg', caption: 'Hawksbill turtle foraging for sponges along a coral pinnacle.', photographer: 'Blue Ocean Coral Unit' },
      { url: '/marine_coral.jpg', caption: 'Bajuni reef systems providing vital food sources for resident hawksbills.', photographer: 'Reef Ecology Expedition' },
      { url: '/hafun2.jpg', caption: 'Protected nesting dunes along the eastern Somali shoreline.', photographer: 'Turtle Conservation Alliance' },
    ],
    habitat: 'Coral Reef',
    depth: '1 - 30 meters',
    distribution: 'Coral reefs and rocky shallows throughout the Bajuni archipelago, Guardafui coves, and Eyl coastal reefs.',
    diet: 'Reef sponges (Porifera), sea anemones, soft corals, and jellyfish.',
    size: '0.7 – 0.9 meters shell length',
    weight: '60 – 80 kg',
    lifespan: '50 – 60 years',
    conservationStatus: 'Critically Endangered',
    statusExplanation: 'Listed as Critically Endangered on the IUCN Red List due to heavy historical poaching for tortoiseshell jewelry, habitat loss, and accidental netting.',
    interestingFacts: [
      'Their diet consists mainly of toxic glass-like sponges, which contain high levels of silica and toxins that would kill other animals.',
      'Their feeding behavior helps clear space on the reef for slow-growing corals to settle and thrive.',
      'They possess serrated edges along the rear of their shell, aiding hydrodynamic propulsion through tight reef crevices.',
      'Nesting females crawl into low coastal vegetation and dunes, laying between 100 and 150 eggs per clutch.',
    ],
    featured: true,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
      { id: 'bargaal', name: 'Bargaal', slug: 'bargaal', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'hawksbill-nest-mapping', title: 'Horn of Africa Critical Turtle Rookery & Nest Temperature Audit', location: 'Hafun Sandspit & Bajuni Atolls', status: 'Active Climate Research' },
    ],
    conservationProjects: [
      { id: 'tortoiseshell-trade-ban', title: 'Zero-Tolerance Wildlife Trafficking & Beach Ranger Patrols', region: 'National Somali Seaboard' },
    ],
    translations: {
      so: {
        commonName: 'Diinta Badeedka ee Qolof-Dhexaadka ah',
        categoryName: 'Diinka Badeedka',
        group: 'Xamaarad Badeed',
        tagline: 'Beerayaasha dhagax-mareenka ee halista xoogan ku jira, kuwaas oo leh qolof aad u qurux badan.',
        editorialStatement: 'Muhiim u ah ilaalinta beeraha dhagax-mareenka ee caafimaadka qaba iyagoo xakameynaya isbaarjooyinka, diinta qolof-dhexaadka ah waa mid ka mid ah xayawaanka ugu qurxoon ee ugu haliska badan ee badda Soomaaliya.',
        description: 'Diinta qolof-dhexaadka ah waxaa lagu garanayaa afkeeda cidhiidhsan ee af-badan iyo qolofteeda isku dul saaran. Waxay ku noolaan meesha ugu badan dhagax-mareenka nool ee jasiiradaha Bajuni iyo Guardafui.',
        distribution: 'Dhagax-mareenka iyo biyaha gaagaaban ee dhagaxa leh ee jasiiradaha Bajuni, dooxyada Guardafui, iyo dhagax-mareenka xeebta Ceel.',
        diet: 'Isbaarjooyinka dhagax-mareenka (Porifera), ubaxa badda, dhagax-mareenka jilicsan, iyo qallanjada.',
        statusExplanation: 'Waxaa lagu qeexay Halis Xoogan oo Aad U Sarreysa liiska IUCN, sababo la xiriira ugaarsiga taariikhiga ah ee qolofteeda dahabka ah, luminta deegaanka, iyo ku dhex xayirmis shabagyada.',
        interestingFacts: [
          'Cuntadoodu badanaa waxay ka kooban tahay isbaarjooyin sun leh oo silika badan, kuwaas oo dili kara xayawaanka kale.',
          'Habka ay wax u cunaan wuxuu gargaaraa in bannaan looga sameeyo dhagax-mareenka si kuwa si tartiib ah u koraya ay u degaan oo u barwaaqoobaan.',
          'Waxay leeyihiin qarka qolofteeda oo faro leh, kaas oo gargaara dhaqdhaqaaqooda godadka cidhiidhsan ee dhagax-mareenka.',
          'Dhaddigyada ugxan-dhigasho ah waxay galaan geedaha hooseeya ee xeebta iyo buurooyinka ciidda, kuwaas oo dhiga u dhaxeeya 100 ilaa 150 ukun.',
        ],
      },
    },
  },

  // 9. Spiny Lobster (Crustaceans)
  {
    id: 'spiny-lobster',
    slug: 'spiny-lobster',
    commonName: 'Somali Spiny Lobster',
    somaliName: 'Aargoosto',
    scientificName: 'Panulirus homarus',
    category: 'crustaceans',
    categoryName: 'Crustaceans',
    group: 'Crustacea (Decapoda)',
    tagline: 'Nocturnal reef dwellers of limestone caves and rocky ledges.',
    editorialStatement: 'Revered as a cornerstone of coastal Somali artisanal economies, the spiny lobster thrives in cavernous limestone crevices and shallow wave-swept reefs along the eastern seaboard.',
    description: 'The Somali spiny lobster lacks the large front claws of Atlantic lobsters, relying instead on long, spiny antennae and a robust armored carapace for defense. They emerge at night to forage across rocky headlands and coral ledges from Eyl to Kismayo.',
    heroImage: '/exp_coastal_cliff.jpg',
    gallery: [
      { url: '/exp_coastal_cliff.jpg', caption: 'Limestone sea cliffs where spiny lobsters shelter in submerged caves.', photographer: 'Bari Marine Biology Unit' },
      { url: '/exp_scuba_diving.jpg', caption: 'Spiny lobster antennae protruding from a coral crevice.', photographer: 'Reef Survey Team' },
      { url: '/bargaal_main.jpg', caption: 'Artisanal lobster landing cove in Bargaal.', photographer: 'Somali Artisanal Fisheries' },
    ],
    habitat: 'Rocky Coast',
    depth: '1 - 50 meters',
    distribution: 'Extensively distributed along the rocky coastal escarpments of Puntland (Eyl, Hafun, Bargaal) and Bajuni reef fringes.',
    diet: 'Bivalves, sea urchins, mollusks, worms, and benthic carrion.',
    size: '20 – 35 cm body length',
    weight: '0.8 – 2.5 kg',
    lifespan: '15 – 20 years',
    conservationStatus: 'Least Concern',
    statusExplanation: 'Assessed as Least Concern globally, though seasonal closed seasons and size limits are managed locally by Somali fishing cooperatives to prevent overharvesting of egg-bearing females.',
    interestingFacts: [
      'They produce loud acoustic squeaks (stridulation) by rubbing the base of their antennae against a specialized rasp on their head to deter predators.',
      'During migration, spiny lobsters form continuous single-file queues of up to 50 individuals walking across the seabed.',
      'Somali fishermen use traditional baited hoop traps and freediving techniques without destructive bottom dredging.',
    ],
    featured: false,
    destinations: [
      { id: 'eyl', name: 'Eyl', slug: 'eyl', region: 'Puntland' },
      { id: 'bargaal', name: 'Bargaal', slug: 'bargaal', region: 'Puntland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'lobster-sustainable-yield', title: 'Horn of Africa Spiny Lobster Biomass & Catch-Per-Unit-Effort Study', location: 'Eyl & Hafun Escarpments', status: 'Active Fisheries Research' },
    ],
    conservationProjects: [
      { id: 'egg-bearing-release', title: 'Community Berried Female Release & Size-Limit Accord', region: 'Puntland Fishermen Union' },
    ],
    translations: {
      so: {
        commonName: 'Aargoosto Qodxaha Leh',
        categoryName: 'Xayawaanka Qolofta Adag leh',
        group: 'Crustacea (Xayawaan Lugo Toban leh)',
        tagline: 'Deggan habeenkii ee godadka dhagaxa nuurad ah iyo qarka dhagaxa ah.',
        editorialStatement: 'Loo tixgeliyaa saldhig muhiim ah oo dhaqaalaha kalluumeysiga xeebta Soomaaliya, aargoostada qodxaha leh waxay ku barwaaqoowdaa godadka dhagaxa nuurad ah iyo dhagax-mareenka hirarku garaacaan ee xeebta bari.',
        description: 'Aargoostada Soomaaliyeed ma laha cadhada waaweyn ee aargoostada Atlantic-ka, waxayna isku halleeyaan tiirar dhaadheer oo qodxo leh iyo qolof adag oo isdifaacid. Waxay soo baxaan habeenkii si ay wax uga raadiyaan qarka dhagaxa ah iyo dhagax-mareenka intii u dhaxaysa Ceel iyo Kismaayo.',
        distribution: 'Waxay si ballaaran ugu faafaan qarka dhagaxa ah ee xeebta Puntland (Ceel, Hufun, Bargaal) iyo dhagax-mareenka Bajuni.',
        diet: 'Xayawaanka labada qolofood leh, canjeelada badda, xayawaanka jilicsan, dixiriga, iyo hilibka qudhmay ee guntinka badda.',
        statusExplanation: 'Caalamka ahaan waxaa lagu qeexay Halis Yar, inkastoo xilliyada xayirka iyo xaddidaadaha cabbirka ay maamulaan ururrada kalluumeysiga Soomaaliyeed si looga hortago in xad-dhaaf lagu qabto dumarka sida ukumaha.',
        interestingFacts: [
          'Waxay soo saaraan dhawaq xoog leh iyagoo isku duubaya salka tiirarkooda si ay uga hortagaan ugaarsadayaasha.',
          'Xilliga guuritaanka, aargoostada qodxaha leh waxay sameeyaan safaf isku xigxiga oo ilaa 50 xayawaan ah oo dhex socda guntinka badda.',
          'Kalluumeystayaasha Soomaaliyeed waxay isticmaalaan dabinno dhaqameed iyo dabbaal-qoto ah oo aan waxyeello u geysan guntinka badda.',
        ],
      },
    },
  },

  // 10. Ribbon Seagrass & Dugong Forage (Seagrass)
  {
    id: 'ribbon-seagrass',
    slug: 'ribbon-seagrass',
    commonName: 'Ribbon Seagrass',
    somaliName: 'Dooga Dhaadheer ee Badda',
    scientificName: 'Cymodocea serrulata',
    category: 'seagrass',
    categoryName: 'Seagrass',
    group: 'Marine Angiosperm (Flowering Plant)',
    tagline: 'Vast blue carbon meadows stabilizing coastal shallows.',
    editorialStatement: 'Forming underwater prairies across Lower Juba and Bajuni lagoons, ribbon seagrass meadows capture carbon while providing nurseries for juvenile reef fish and grazing havens for dugongs.',
    description: 'Ribbon seagrass is a true flowering marine plant that forms dense sub-tidal meadows along Somalia’s sheltered southern coastline. Anchored by complex rhizome networks, it stabilizes coastal sediments, filters runoff, and serves as the primary food source for endangered green sea turtles.',
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'Vast sub-tidal seagrass meadow in clear shallow waters of Bajuni.', photographer: 'Blue Ocean Carbon Project' },
      { url: '/jubaland.jpg', caption: 'Sheltered lagoons in Jubaland supporting extensive seagrass growth.', photographer: 'Lower Juba Marine Institute' },
      { url: '/marine_turtles.jpg', caption: 'Green sea turtle actively foraging in dense Cymodocea beds.', photographer: 'Turtle Conservation Alliance' },
    ],
    habitat: 'Seagrass',
    depth: '0.5 - 15 meters',
    distribution: 'Extensive coverage across the shallow lagoons of Jubaland, Kismayo bay, and sheltered bays in Hafun and Qandala.',
    diet: 'Photosynthesis utilizing sunlight, seawater minerals, and carbon dioxide.',
    size: 'Leaf blades 15 – 40 cm in length',
    weight: 'Forms mats yielding up to 5 kg biomass per m²',
    lifespan: 'Perennial rhizomes live for decades',
    conservationStatus: 'Least Concern',
    statusExplanation: 'Listed as Least Concern by the IUCN, though vulnerable to port dredging, coastal runoff, and illegal bottom trawling.',
    interestingFacts: [
      'Seagrass meadows can capture carbon up to 35 times faster than tropical Amazonian rainforests.',
      'Unlike algae and seaweeds, seagrasses are true flowering plants with roots, stems, leaves, flowers, and seeds.',
      'A single acre of seagrass can support upwards of 40,000 fish and 50 million small invertebrates.',
    ],
    featured: false,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'hafun', name: 'Hafun Peninsula', slug: 'hafun', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'blue-carbon-audit', title: 'Somali Southern Coast Blue Carbon Sequestration & Soil Core Audit', location: 'Lower Juba Archipelago', status: 'Active Carbon Research' },
    ],
    conservationProjects: [
      { id: 'seagrass-protection', title: 'No-Anchor Marine Seagrass Conservation Zones', region: 'Bajuni Archipelago' },
    ],
    translations: {
      so: {
        commonName: 'Doogga Badda ee Xariiqda ah',
        categoryName: 'Doogga Badda',
        group: 'Dhirta Badda ee Ubaxa Dhalaysa',
        tagline: 'Dooxooyin balaadhan oo kaarboon buluug ah, kuwaas oo xasilliyaya biyaha xeebta ee gaagaaban.',
        editorialStatement: 'Iyagoo sameeya dooxooyin badda hoosteeda ah oo ka tarsan Jubada Hoose iyo haróorooyinka Bajuni, dooxooyinka doogga badda ee xariiqda ah waxay qabtaan kaarboon, waxayna sidoo kale u ahaan meelo koriya kalluunka yaryar iyo meelo ay wax ka daaqaan doonbadeedyada.',
        description: 'Doogga badda ee xariiqda ah waa dhir badeed oo dhab ah oo ubax dhalaysa, kuwaas oo sameeya dooxooyin qaro weyn oo ku teedsan xeebta koonfureed ee ilaalisan ee Soomaaliya. Iyadoo ku xidhan xididdo kakan, waxay xasilisaa ciidda xeebta, shaandheysaa biyaha, waxayna u ahaan ilaha ugu weyn ee cuntada diinta badeedka ee cagaaran ee halista ku jirta.',
        distribution: 'Waxay si weyn u daboolaan haróorooyinka gaagaaban ee Jubbaland, gacanka Kismaayo, iyo gacamada ilaalisan ee Hufun iyo Qandala.',
        diet: 'Iftiin-kariye isticmaala iftiinka qorraxda, macdanaha biyaha badda, iyo kaarbon-dioxide-ka.',
        statusExplanation: 'Waxaa lagu qeexay Halis Yar IUCN, inkastoo ay khatar ugu jiraan qodista deked, biyaha xeebta ee qulqulaya, iyo shabagyada sharci-darrada ah ee guntinka badda.',
        interestingFacts: [
          'Dooxooyinka doogga badda waxay ururin karaan kaarboon ilaa 35 jeer ka dhakhso badan kaymaha kulaylaha ee Amazon.',
          'Si ka duwan algae-ga, doogga badda waa dhir dhab ah oo leh xidid, jir, caleen, ubax, iyo abuur.',
          'Hal eeker oo doog badeed ah wuxuu taageeri karaa ilaa 40,000 kalluun iyo 50 malyan xayawaan yaryar oo laf-dhabar la\'aan ah.',
        ],
      },
    },
  },

  // 11. Giant Clam (Other Marine Life)
  {
    id: 'giant-clam',
    slug: 'giant-clam',
    commonName: 'Fluted Giant Clam',
    somaliName: 'Lul-Badeedka Weyn',
    scientificName: 'Tridacna squamosa',
    category: 'other',
    categoryName: 'Other Marine Life',
    group: 'Mollusca (Bivalvia)',
    tagline: 'Living jewel of the outer barrier reefs.',
    editorialStatement: 'Embedded permanently into living coral heads with iridescent turquoise and violet mantles, giant clams act as natural bio-filters and micro-habitats on healthy Somali barrier reefs.',
    description: 'The fluted giant clam is renowned for its large scalloped shell and brightly colored mantle filled with photosynthetic zooxanthellae. In the pristine, clear waters of the Bajuni Archipelago, these ancient bivalves thrive in shallow coral heads, filtering hundreds of liters of water daily.',
    heroImage: '/marine_coral.jpg',
    gallery: [
      { url: '/marine_coral.jpg', caption: 'Fluted giant clam embedded in a pristine Acropora reef head.', photographer: 'Blue Ocean Invertebrate Survey' },
      { url: '/exp_coral_snorkeling.jpg', caption: 'Snorkeler admiring iridescent blue mantle patterns in shallow reef.', photographer: 'Jubaland Eco-Tourism' },
      { url: '/exp_scuba_diving.jpg', caption: 'Deep coral pinnacle supporting mature giant clams.', photographer: 'Reef Expedition' },
    ],
    habitat: 'Coral Reef',
    depth: '1 - 20 meters',
    distribution: 'Outer barrier reefs and sheltered coral patch reefs throughout Jubaland and Cap Guardafui coves.',
    diet: 'Symbiotic photosynthetic zooxanthellae and filter feeding on microscopic phytoplankton.',
    size: 'Up to 40 cm shell width',
    weight: 'Up to 15 kg',
    lifespan: '50 – 100+ years',
    conservationStatus: 'Vulnerable',
    statusExplanation: 'Listed as Vulnerable on the IUCN Red List due to heavy historical international harvesting for decorative shells and aquarium trade, now protected in Somali reserves.',
    interestingFacts: [
      'Each clam’s mantle features an intricate, iridescent coloration pattern that acts like a solar panel for its symbiotic algae.',
      'They are hermaphroditic, capable of releasing both eggs and sperm into the water column during synchronized full moon spawning.',
      'Contrary to myth, giant clams do not trap humans—their closing motion is gentle, slow, and purely defensive.',
    ],
    featured: false,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
      { id: 'qandala', name: 'Qandala', slug: 'qandala', region: 'Puntland' },
    ],
    researchProjects: [
      { id: 'bivalve-mapping', title: 'Western Indian Ocean Tridacna Density & Genotype Inventory', location: 'Bajuni Marine Reserve', status: 'Active Genetic Survey' },
    ],
    conservationProjects: [
      { id: 'clam-sanctuary', title: 'Community Giant Clam Seed Stock & Reef Restoration Accord', region: 'Bajuni Islands' },
    ],
    translations: {
      so: {
        commonName: 'Sabaayada Weyn ee Qolofta Faraqa leh',
        categoryName: 'Noolaha Badda Kale',
        group: 'Mollusca (Xayawaanka Labada Qolofood leh)',
        tagline: 'Dahab nool oo ka mid ah dhagax-mareenka dibedda ah.',
        editorialStatement: 'Si joogto ah ugu dhex jira madaxa dhagax-mareenka nool, iyagoo leh maro dabiici ah oo midab bilicsan leh, sabaayada waaweyn waxay u shaqeeyaan sidii shaandheeye dabiici ah iyo deegaano yaryar oo ku yaal dhagax-mareenka caafimaadka qaba ee Soomaaliya.',
        description: 'Sabaayada waaweyn ee qolof-faraqleh waxay caan ku tahay qolofteeda weyn ee qaabaysan iyo maradeeda midabka dhalaalaya oo sido nafaqo ka soo jeeda algae-ga hoos deggan. Biyaha saafiga ah ee jasiiradaha Bajuni, xayawaankan qadiimiga ah waxay ku barwaaqoobaan madaxa dhagax-mareenka ee gaagaaban, iyagoo maalin kasta shaandheynaya boqollaal litir oo biyo ah.',
        distribution: 'Dhagax-mareenka dibedda iyo dhagax-mareenka ilaalisan ee ku teedsan Jubbaland iyo dooxyada Cap Guardafui.',
        diet: 'Algae-ga hoos degga ee iftiin-kariyaha ah iyo shaandheynta phytoplankton-ka aan la arki karin.',
        statusExplanation: 'Waxaa lagu qeexay Halis liiska IUCN, sababo la xiriira ururinta taariikhiga ah ee qolofaha qurxinta iyo ganacsiga aquarium-ka, hadda waxaa lagu ilaaliyaa kaydka Soomaaliyeed.',
        interestingFacts: [
          'Maradda sabaayo kastaa waxay leedahay qaab midab oo kakan oo u shaqeeya sida solar panel algae-geeda.',
          'Waa labo-jinsi, waxayna sii daayaan ukumo iyo shahwo labaduba xilliga dhalidda ee dayaxa buuxa.',
          'Si ka duwan sheekooyinka, sabaayada waaweyni ma qabtaan bini-aadamka — xirkoodu waa mid tartiib ah oo isdifaac ah oo keliya.',
        ],
      },
    },
  },

  // 12. Dugong (Dolphins & Whales / Marine Mammal)
  {
    id: 'dugong',
    slug: 'dugong',
    commonName: 'Dugong (Sea Cow)',
    somaliName: 'Doonbadeed',
    scientificName: 'Dugong dugon',
    category: 'dolphins-whales',
    categoryName: 'Dolphins & Whales',
    group: 'Marine Mammal (Sirenia)',
    tagline: 'Gentle marine herbivores of shallow mangrove channels.',
    editorialStatement: 'Referred to in Somali folklore as the peaceful spirit of the coastal shallows, the rare dugong grazes silently on expansive seagrass beds in the sheltered lagoons of southern Somalia.',
    description: 'The dugong is the only strictly herbivorous marine mammal, closely related to manatees and elephants. They rely exclusively on sub-tidal seagrass meadows in warm, sheltered coastal waters. The remote, undisturbed mangrove channels of the Bajuni Archipelago represent one of the last secure refuges for dugongs in East Africa.',
    heroImage: '/marine_seagrass.jpg',
    gallery: [
      { url: '/marine_seagrass.jpg', caption: 'Dugong feeding in shallow seagrass meadow in Lower Juba.', photographer: 'Blue Ocean Sirenia Project' },
      { url: '/jubaland.jpg', caption: 'Sheltered mangrove creeks where dugong mothers nurse calves.', photographer: 'Kismayo Coastal Guard' },
      { url: '/somalia_coast.jpg', caption: 'Southern coastal waters supporting critical seagrass ecosystems.', photographer: 'Marine Ecology Survey' },
    ],
    habitat: 'Seagrass',
    depth: '1 - 25 meters',
    distribution: 'Restricted to sheltered seagrass meadows and mangrove channels in Lower Juba and Bajuni archipelago.',
    diet: 'Exclusively seagrasses, especially Halophila ovalis and Cymodocea rhizomes.',
    size: '2.4 – 3.0 meters (8 – 10 ft)',
    weight: '300 – 500 kg',
    lifespan: '70+ years',
    conservationStatus: 'Vulnerable',
    statusExplanation: 'Listed as Vulnerable globally (and Critically Endangered in East Africa) due to gillnet entanglement, boat strikes, and seagrass habitat destruction.',
    interestingFacts: [
      'Dugongs are more closely related to elephants than to whales or dolphins, sharing similar dense bone structures.',
      'A mature dugong can consume up to 40 kg (88 lbs) of seagrass every single day.',
      'Their slow reproductive rate (giving birth to a single calf every 3 to 7 years) makes population recovery delicate.',
    ],
    featured: false,
    destinations: [
      { id: 'kismayo', name: 'Kismayo', slug: 'kismayo', region: 'Jubaland' },
    ],
    researchProjects: [
      { id: 'dugong-aerial-survey', title: 'Bajuni Archipelago Dugong Drone Acoustic & Population Survey', location: 'Lower Juba Coast', status: 'Active Drone Survey' },
    ],
    conservationProjects: [
      { id: 'dugong-safe-zones', title: 'Zero-Gillnet Protected Corridors for Somali Sirenians', region: 'Bajuni Marine Reserve' },
    ],
    translations: {
      so: {
        commonName: 'Doonbadeedka (Sac-Sida Badda)',
        categoryName: 'Dhurwaaga & Nibiriyada',
        group: 'Xayawaanka Naaska leh ee Badda (Sirenia)',
        tagline: 'Xayawaan qaboobsan oo cunta doogga ku nool marinnada mangrove-ka ee gaagaaban.',
        editorialStatement: 'Sheekooyinka dhaqanka Soomaaliyeed waxaa lagu tilmaamaa ruuxa nabadda ee biyaha gaagaaban, doonbadeedka naadirka ah wuxuu si aamusnaan leh wax uga daaqaa dooxooyinka doogga badda ee balaadhan ee haróorooyinka ilaalisan ee koonfurta Soomaaliya.',
        description: 'Doonbadeedku waa xayawaanka naaska leh ee badda ee kaliya cunta doogga, waxaana ay xigasho dhow la leeyihiin maanuuska iyo maroodiga. Waxay ku tiirsan yihiin oo keliya dooxooyinka doogga badda ee biyaha diiran ee ilaalisan. Marinnada mangrove-ka ee fog ee jasiiradaha Bajuni waxay ka mid yihiin meelaha ugu dambeeya ee ammaanka ah ee doonbadeedyada ku hadha Bariga Afrika.',
        distribution: 'Waxay ku xaddidan yihiin dooxooyinka doogga badda ee ilaalisan iyo marinnada mangrove-ka ee Jubada Hoose iyo jasiiradaha Bajuni.',
        diet: 'Wuxuu keliya cunaa doogga badda, gaar ahaan Halophila ovalis iyo xididdada Cymodocea.',
        statusExplanation: 'Caalamka ahaan waxaa lagu qeexay Halis (Bariga Afrika-na waxaa lagu qeexay Halis Xoogan oo Aad U Sarreysa), sababo la xiriira ku dhex xayirmis shabagyada, dhaawaca huurayaasha, iyo burburinta deegaanka doogga badda.',
        interestingFacts: [
          'Doonbadeedku wuxuu xigasho la leeyahay maroodiga marka loo eego nibiriyada ama dhurwaanka, iyagoo wadaaga qaab lafo oo isku eg.',
          'Doonbadeed qaan gaadhay wuxuu maalin kasta cuni karaa ilaa 40 kg oo doog badeed ah.',
          'Tirada tarmiddoodu waa gaabis (hal ilmo ayay dhashaan 3 ilaa 7 sano), taasoo ka dhigaysa soo kabashada tiradoodu mid adag.',
        ],
      },
    },
  },
];

// Conservation status display labels & badge colors, keyed by the
// English `conservationStatus` value stored on each species record.
// `conservationStatus` itself stays in English (it's used as a filter
// key in SpeciesGrid/SpeciesFilters) — use getSpeciesStatusInfo() to
// get the localized label for display.
const speciesStatusColors = {
  'critically endangered': { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#FCA5A5' },
  endangered: { bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)', text: '#FDBA74' },
  vulnerable: { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)', text: '#FDE047' },
  'near threatened': { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', text: '#93C5FD' },
  'least concern': { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#6EE7B7' },
};

const speciesStatusLabels = {
  en: {
    'critically endangered': 'Critically Endangered',
    endangered: 'Endangered',
    vulnerable: 'Vulnerable',
    'near threatened': 'Near Threatened',
    'least concern': 'Least Concern',
  },
  so: {
    'critically endangered': 'Halis Xoogan oo Aad U Sarreysa',
    endangered: 'Halis Xoogan',
    vulnerable: 'Halis',
    'near threatened': 'Halis u Dhow',
    'least concern': 'Halis Yar',
  },
};

// Status badge color + localized label helper (replaces the old
// English-only getStatusInfo that used to live in SpeciesCard.jsx).
export function getSpeciesStatusInfo(status, language = 'en') {
  const key = status?.toLowerCase() || 'least concern';
  const colors = speciesStatusColors[key] || speciesStatusColors['least concern'];
  const labels = speciesStatusLabels[language] || speciesStatusLabels.en;
  const label = labels[key] || status || speciesStatusLabels.en['least concern'];
  return { label, ...colors };
}

// Helper functions for dynamic lookups and statistics
export function getSpeciesCategories(language = 'en') {
  return localizeList(marineCategories, language);
}

export function getMarineEcosystems(language = 'en') {
  return localizeList(marineEcosystems, language);
}

export function getAllSpecies(language = 'en') {
  return localizeList(speciesList, language);
}

export function getSpeciesBySlug(slug, language = 'en') {
  const species = speciesList.find((s) => s.slug === slug || s.id === slug);
  return localize(species, language);
}

export function getFeaturedSpecies(language = 'en') {
  return localizeList(speciesList.filter((s) => s.featured), language);
}

export function getSpeciesByCategory(categoryId, language = 'en') {
  if (!categoryId || categoryId === 'all') return localizeList(speciesList, language);
  return localizeList(speciesList.filter((s) => s.category === categoryId), language);
}

export function getSpeciesByHabitat(habitat, language = 'en') {
  if (!habitat || habitat === 'all') return localizeList(speciesList, language);
  return localizeList(speciesList.filter((s) => s.habitat.toLowerCase().includes(habitat.toLowerCase())), language);
}

export function getRelatedSpecies(currentSlug, limit = 3, language = 'en') {
  const current = speciesList.find((s) => s.slug === currentSlug || s.id === currentSlug);
  if (!current) return localizeList(speciesList.slice(0, limit), language);
  const related = speciesList
    .filter((s) => s.slug !== currentSlug && (s.category === current.category || s.habitat === current.habitat))
    .slice(0, limit);
  return localizeList(related, language);
}

export function getMarineStats() {
  const totalSpecies = speciesList.length;
  const categoriesCount = marineCategories.length;
  const ecosystemsCount = marineEcosystems.length;
  const activeStudies = speciesList.reduce((acc, s) => acc + (s.researchProjects ? s.researchProjects.length : 0), 0);

  return {
    documentedSpecies: totalSpecies,
    categoriesCount,
    ecosystemsCount,
    activeStudies,
    coastlineKm: '3,025',
  };
}
