// =========================================================
// Coastal Communities Data Model
// Blue Ocean Somalia — Sprint 6: Conservation & Coastal Communities
//
// Following the same convention as data/research.js: institutional
// and collective attribution (a cooperative, a guardian network, a
// business alliance) rather than named individuals — no real personal
// photos, quotes, or biographical claims exist, so none are invented
// here either.
//
// i18n: narrative/display fields carry a `translations: { so: {...} }`
// override merged in at read time via localize()/localizeList() from
// lib/i18n/localizeData.js. `category` and `region` values are left
// untranslated since they double as filter/enum keys elsewhere.
// =========================================================

import { speciesList } from './marineLife.js';
import { localize, localizeList } from '../lib/i18n/localizeData.js';

export const COMMUNITY_CATEGORIES = [
  {
    id: 'fishermen',
    label: 'Fishermen & Fishing Communities',
    icon: 'Anchor',
    translations: { so: { label: 'Kalluumaystayaasha iyo Bulshooyinka Kalluumaysiga' } },
  },
  {
    id: 'traditional-knowledge',
    label: 'Traditional Marine Knowledge',
    icon: 'Leaf',
    translations: { so: { label: 'Aqoonta Dhaqameed ee Badda' } },
  },
  {
    id: 'coastal-business',
    label: 'Coastal Businesses',
    icon: 'Briefcase',
    translations: { so: { label: 'Ganacsiyada Xeebaha' } },
  },
  {
    id: 'youth',
    label: 'Youth',
    icon: 'GraduationCap',
    translations: { so: { label: 'Dhallinyarada' } },
  },
  {
    id: 'women',
    label: 'Women in Coastal Communities',
    icon: 'Heart',
    translations: { so: { label: 'Haweenka Bulshooyinka Xeebaha' } },
  },
  {
    id: 'livelihoods',
    label: 'Sustainable Livelihoods',
    icon: 'Users',
    translations: { so: { label: 'Nolol-maalmeedka Waarta' } },
  },
];

export function getCommunityCategories(language = 'en') {
  return localizeList(COMMUNITY_CATEGORIES, language);
}

export function getCommunityCategoryInfo(id, language = 'en') {
  return getCommunityCategories(language).find((c) => c.id === id);
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
    translations: {
      so: {
        name: 'Iskaashatada Kalluumaysiga Boosaaso',
        location: 'Boosaaso, Gobolka Bari',
        description: 'Iskaashato ka kooban kooxo kalluumaystayaal dhaqameed oo isticmaala xadhig-gacmeed, kuwaas oo ka shaqeeya deked Boosaaso oo ka kalluumaysta biyaha Khaliijka Cadmeed sugidda tuna huruudda ah iyo kalluunka king.',
        livelihoods: ['Kalluumaysiga xadhig-gacmeed ee dhaqameed', 'Ka ganacsiga suuqa kalluunka', 'Dayactirka doonyaha iyo dhisidda huurida'],
        marineConnection: 'Doonyaha iskaashatadu waxay ku kalluumaystaan isla marinka Khaliijka Cadmeed ee Blue Ocean ku sahamiso dhaqdhaqaaqa dhurwaaga badda iyo nibiriga, taasoo ka dhigaysa lammaane toos ah oo ku lug leh kalluumaysiga iyo ilaalinta xayawaanka badda.',
        conservationActivities: ['Duulaanka tijaabada ee Shahaadada Ganacsiga Cadaaladda ah ee Xadhig-gacmeedka', 'Soo sheegidda arag dhurwaag/nibiri intii lagu jiray safarrada kalluumaysiga'],
        gallery: [
          { url: '/bosaso1.jpg', caption: 'Doonyo xadhig-gacmeed oo ku xiran deked Boosaaso.' },
          { url: '/bosaso2.jpg', caption: 'Suuqa kalluunka ee xeebta Boosaaso.' },
          { url: '/exp_dhow_sailing.jpg', caption: 'Huuri dhaqameed oo shiraacyadeeda kor u qaaday xeebta Bari.' },
        ],
      },
    },
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
    translations: {
      so: {
        name: 'Ilaaliyayaasha Aqoonta Dhaqameed ee Cayl',
        location: 'Cayl, Gobolka Bari',
        description: 'Qoysas kalluumaystayaal ah oo jiil ka jiil ku noolaa jarralayaasha Cayl, kuwaas oo aqoontooda ku saabsan dabeecadda lobster-ka, wareegyada dhalmada, iyo qaababka xilliyeed ay ka horreysay sahan kasta oo rasmi ah.',
        livelihoods: ['Ururinta lobster-ka qodxaha leh', 'Kalluumaysiga shabagga cirifka jasiiradda'],
        marineConnection: 'Aragtidooda dabeecadda dheddigga lobster-ka ay ugxan sido ("berried") ayaa si toos ah u qaabeeyay xeerka xadka cabbirka iyo sii deynta lagu shaqeeyo jarralayaasha Bari oo dhan.',
        conservationActivities: ['Wada-naqshadeyntii Heshiiska Sii Deynta Dheddigga Ugxanta Sida & Xadka Cabbirka', 'Kormeerka xilliga xannibaadda'],
        gallery: [
          { url: '/eyl1.jpg', caption: 'Xeebta jarralayaasha Cayl, oo ah goobta ugu weyn ee lobster-ka lagu kalluumaysto.' },
          { url: '/eyl2.jpg', caption: 'Doonyo kalluumaysi oo dhaqameed oo Cayl ku nasanaya.' },
          { url: '/eyl3.jpg', caption: 'Jarralayaasha dhagaxa ah ee Bari halkaas oo sahannada lobster-ka lagu sameeyay.' },
        ],
      },
    },
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
    translations: {
      so: {
        name: 'Ururka Haweenka Farsameynta Kalluunka ee Kismaayo',
        location: 'Kismaayo, Jubada Hoose',
        description: 'Urur haween hoggaaminayaan oo farsameeya oo iibiya kalluunka laga soo qabtay marsooyinka Kismaayo, kaasoo beddelay wixii hore loo tuuri jiray ilo joogto ah oo dakhli qoys.',
        livelihoods: ['Farsameynta iyo qallajinta kalluunka', 'Ka ganacsiga suuqyada maxalliga ah', 'Waddooyinka ganacsiga kalluunka yaryar ee gaadhaya suuqyada gudaha'],
        marineConnection: 'Ururku wuxuu ka shaqeeyaa isla marsooyinka Kismaayo ee la xiriira shaqada Blue Ocean ee ilaalinta cawsduurka badda iyo xayawaanka sirenian-ka ee biyaha ku hareeraysan Jasiiradaha Bajuun.',
        conservationActivities: ['Habab farsameyn oo yareeya khasaaraha', 'Kulamo wacyi-gelin oo maxalli ah oo ku saabsan xamaalka kalluunka ee waara'],
        gallery: [
          { url: '/jubaland.jpg', caption: 'Biyaha xeebta iyo marsooyinka Kismaayo.' },
          { url: '/marine_fish.jpg', caption: 'Kalluun cusub oo diyaar u ah farsameynta.' },
          { url: '/marine_seagrass.jpg', caption: 'Marinnada cawsduurka badda ee u dhow biyaha ay ururku ka shaqeeyo.' },
        ],
      },
    },
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
    translations: {
      so: {
        name: 'Ilaaliyayaasha Dhallinyarada ee Xeebta Xaafuun',
        location: 'Xaafuun, Gobolka Bari',
        description: 'Shabakad dhallinyaro deggan oo tababaran oo kormeerta xeebaha ay diinyada badeedku ugu ugxamaan ee ku hareeraysan Cirifka Xaafuun, intii ay socoto xilliga ugxanta oo dhan.',
        livelihoods: ['Mushaarka xilliyeed ee ilaaliyeyaasha xeebta', 'Hagida dalxiiska deegaanka intii ugxantu socoto'],
        marineConnection: 'Xeebaha tombolo-ga Xaafuun waa mid ka mid ah labada goob ee ugu muhiimsan ee Soomaaliya ay ku ugxamaan diinyada badeedka cagaaran iyo tan hawksbill-ka, ilaaliyayaashuna waxay joogaan xilliga sifayntu socoto oo dhan.',
        conservationActivities: ['Barnaamijka Bulshada ee Ilaalinta Ugxanta Xeebta', 'Kormeerka sii deynta dhalanka cusub', 'Waxbarashada wacyiga badda ee da\'da isku dhow'],
        gallery: [
          { url: '/hafun1.jpg', caption: 'Xeebta Cirifka Xaafuun.' },
          { url: '/hafun2.jpg', caption: 'Xeebta tombolo-ga Xaafuun, mid ka mid ah goobaha ugxanta ee la kormeero.' },
          { url: '/marine_turtles.jpg', caption: 'Diinyo badeed oo cagaaran oo ku sugan biyaha Xaafuun.' },
        ],
      },
    },
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
    translations: {
      so: {
        name: 'Isbahaysiga Ganacsiga Xeebaha ee Muqdisho',
        location: 'Muqdisho, Banaadir',
        description: 'Maqaayadaha, kafateeriyada, iyo hagayaasha dalxiiska ee ku teedsan Xeebta Liido, kuwaas oo si wadajir ah u maalgeliya oo shaqaale u qaba jadwalka nadaafadda saddex bilood mar ee xeebta ugu dadka badan ee Muqdisho.',
        livelihoods: ['Martigelinta iyo dalxiiska xeebta', 'Kirada iyo dalxiiska huuraha yaryar'],
        marineConnection: 'Xeebta Liido waa xarunta ganacsi ee Isbahaysiga isla markaana ah mid ka mid ah labada goobood ee Blue Ocean ku sahamiso qiyaasta qashinka badda iyo kormeerka tayada biyaha.',
        conservationActivities: ['Lammaane maalgeliya Shabakada Bulshada Nadaafadda Xeebta ee Koonfurta', 'Martigelinta dhagayska tayada biyaha ee dadweynaha loo dhigo'],
        gallery: [
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, xeebta ugu dadka badan ee Muqdisho.' },
          { url: '/con_beach_cleanup.jpg', caption: 'Dhacdo nadaafad bulsho oo saddex bilood mar ah.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebta Banaadir.' },
        ],
      },
    },
  },
];

export function getAllCommunities(language = 'en') {
  return localizeList(communities, language);
}

export function getCommunityBySlug(slug, language = 'en') {
  const community = communities.find((c) => c.slug === slug || c.id === slug);
  return localize(community, language);
}

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
    translations: {
      so: {
        title: 'Doonyaha Xadhig-gacmeedka ee ku Sharraxaya Shahaadada',
        location: 'Boosaaso, Gobolka Bari',
        storyContent: [
          'Jiillo badan, kooxaha xadhig-gacmeedka ee Boosaaso waxay si isku mid ah uga kalluumaysteen Khaliijka Cadmeed — xadhig, jirriddo, iyo hal kalluun mar walba. Waa mid ka mid ah hababka kalluumaysiga ugu takoorka badan ee jira, laakiin ilaa dhawaan, takoorkaas suuqa gebi ahaanba loo aqoonsan waayay.',
          'Taasi way beddelantay markii iskaashatadu ay noqotay doonyaha tijaabada ee barnaamijka Shahaadada Ganacsiga Cadaaladda ah ee Xadhig-gacmeedka ee Blue Ocean, kaasoo ku dhisan qiimeyn kaydka la daabacay oo muujinaysa in dadka tuna huruudda ah ee maxalliga ah ay ku jiraan xadka waarta — haddii cadaadiska kalluumaysiga uu sii ahaado sida uu hadda yahay.',
          'Shahaadaynta waxay la timaadaa waraaqo, diiwaangelinta hantida la qabtay, iyo xaqiijin dibadeed — isbeddel dhab ah oo ku yimid kooxo caadi ahaan ku shaqayn jiray dareen iyo khibrad. Laakiin waxay sidoo kale la timaadaa in tiro sii kordheysa oo iibiyayaal dhoofin ah ay hadda kala saari karaan hantidooda iyo tuna aan si waara loo qabanin, waxayna bilaabeen inay lacag u bixiyaan farqigaas.',
          'Iskaashatadu waxay sidoo kale noqotay shabakad digniin hore oo aan rasmi ahayn oo u adeegta cilmi-baarista Blue Ocean ee xayawaanka badda — kooxuhu hadda waxay ka soo sheegaan arag dhurwaag iyo nibiri intii ay socdaan safarradooda maalinlaha ah, taasoo si toos ah ugu darsanaysa khariidadda marinka ee loo isticmaalo hindisaha Marinnada Ammaanka ee Haajirka Xayawaanka Badda.',
        ],
        marineConnection: 'Doonyaha xadhig-gacmeedka ee Boosaaso waxay ka shaqeeyaan isla biyaha Khaliijka Cadmeed ee Blue Ocean ku raadraaco dhurwaagyada badda deggan iyo nibiriyada haajirka ah.',
      },
    },
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
    translations: {
      so: {
        title: 'Sababta Kalluumaystayaasha Cayl ay u Bilaabeen Sii Deynta Dheddigga Ugxanta Sida',
        location: 'Cayl, Gobolka Bari',
        storyContent: [
          'Wakhti dheer ka hor intaan koox cilmi-baaris ahi timaadin Cayl, qoysaska kalluumaystayaasha maxalliga ahi horay bay u ogaayeen lobster-ka ugxanta sida iyo goorta ay taasi dhici karto. Aqoontaas — oo laysu gudbin jiray jiil ka jiil intii aan la daabicin — ayaa noqotay tallaabada bilowga ah ee ugu dambeyntii u beddelantay daraasad rasmi ah oo ku saabsan tirada kaydka iyo dadaalka kalluumaysiga.',
          'Markii Kooxda Sayniska Kalluumaysiga ee Blue Ocean ay bilaabeen sahaminta jarralayaasha Bari sanadkii 2022, waxaa cilmi-baarayaasha tilmaamay kalluumaystayaasha Cayl qaababka cufnaanta ee ugu horreeya ee la qiyaasi lahaa. Daraasaddii soo baxday waxay xaqiijisay wixii jiillo badan oo urursanayaasha lobster-ka ay shaki ku qabeen: ilaalinta dheddigga ugxanta sida ayaa ka muhiimsanayd kaqab kasta oo kale oo laga heli karo.',
          'Waxa ka soo baxay wada-shaqeyntaas ma ahayn xeer dibadda laga soo saaray — waxay ahayd heshiis iskaashatooyinku iyaga qudhoodu ka qayb-qaateen naqshadaynteeda: sii dayn dheddig kasta oo ugxan sida, iyo la fiirsasho cabbir ugu yaraan lagu qabto. Laba sano ka dib, weli waa la raacayaa, xilli ka xilli, isla kooxihii ka qayb qaatay qorista heshiiskaas.',
        ],
        marineConnection: 'Biyaha jarralayaasha Cayl waa goobta ugu weyn ee lobster-ka qodxaha leh lagu kalluumaysto, taasoo ka dambaysa Heshiiska Sii Deynta Dheddigga Ugxanta Sida & Xadka Cabbirka.',
      },
    },
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
    translations: {
      so: {
        title: 'Dhallinyarada Ilaalinaya Ugxanta Diinyada Badeedka ee Xaafuun',
        location: 'Xaafuun, Gobolka Bari',
        storyContent: [
          'Koox cilmi-baaris ahi ma joogi karto xeeb habeen kasta xilli ugxan oo dhan — laakiin shabakad ilaaliyayaal maxalli ah oo tababaran way awoodaan. Farqigaas fudud ee daboolka ayaa ah waxa uu barnaamijka Ilaaliyayaasha Dhallinyarada ee Xeebta Xaafuun loogu talagalay in la xidho.',
          'Dadka dhallinyarada ah ee ku dhaqan Cirifka Xaafuun ayaa hadda socda xeebaha tombolo-ga jadwal wareeg ah oo dhan bilaha ugxanta, iyagoo eegaya ugxan la khalkhaliyay, ka hortagaya ugaadhsatada iyo faragelinta, oo diiwaangelinaya waxay helaan Xarunta Cilmi-baarista Diinyada Badeedka ee Blue Ocean.',
          'Doorkani wuxuu la yimaadaa mushaar xilliyeed, laakiin ilaaliyayaashu si joogto ah ayay u sharraxaan sii deynta dhalanka cusub — socodka diinyada dhawaan soo baxay ilaa xeebta hirarka — inuu yahay qaybta ugu dambeeya ee sababta ay sanadka soo socda dib ugu soo laabtaan. Dhawr ka mid ah ayaa noqday hage cilmi-baarayaal booqan iyo kooxaha dalxiiska deegaanka intii sanadka soo hara.',
          'Xaafuun waa mid ka mid ah oo kaliya labada goobood ee ugu muhiimsan ee ugxanta diinyada cagaaran iyo hawksbill-ka ee laga diiwaangeliyay xeebta Soomaaliya. Kormeer joogto ah la\'aantiis, khalkhal aan la ogaan hal mar ayaa tirtiri kara ugxan dhan — taasoo ah farqiga ay barnaamijkani u yimid inuu xidho.',
        ],
        marineConnection: 'Xeebaha tombolo-ga Xaafuun waa mid ka mid ah labada goobood ee ugu weyn ee diinyada badeedku ku ugxamaan Soomaaliya, oo shabakada ilaaliyayaashu kormeeraan xilliga oo dhan.',
      },
    },
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
    translations: {
      so: {
        title: 'Ganacsatada Maalgelinaya Jadwalka Nadaafadda ee Xeebta Liido',
        location: 'Muqdisho, Banaadir',
        storyContent: [
          'Xeebta Liido waa xagga xeebta ee ugu mashquulsan Muqdisho — maqaayadaha, kafateeriyada, iyo hagayaasha dalxiiska ee ku teedsanna, xeeb nadiif ah ma ahan wax door bidi ah, waa ganacsigooda oo dhan.',
          'Markii shaqada khariidaynta qashinka ee Blue Ocean ay xaqiijisay in Liido ay tahay mid ka mid ah labada goobood ee ugu badan qashinka xeebta koonfureed, koox ganacsato xeebta ku teedsan ayaa isugu urursaday Isbahaysiga Ganacsiga Xeebaha ee Muqdisho si ay u maalgeliyaan oo u shaqaaleeyaan jadwal nadaafad oo soo noqnoqda, halkii ay ka sugi lahaayeen taageero dibadeed.',
          'Isbahaysigu hadda wuxuu bixiyaa qalabka iyo shaqaalaha maxalliga ah ee nadaafadaha saddex bilood mar ah, wuxuuna martigeliyaa dhagayska tayada biyaha ee Blue Ocean ee dadweynaha loo dhigo xeebta — isagoo dabbaasha iyo booqdayaasha siinaya isha macluumaad ee hore u koobnayd faylalka cilmi-baarista.',
          'Waa isku-duub fudud oo danaha iyo saameynta ah: xeeb nadiif ah ayaa macaamiisha sii soo jiidata, nadaafad kastana waxay ka hortagtaa in qashin dheeraad ah uu u kala jajabo maadada plastikada yaryar ee shaqada khariidaynta la socoto.',
        ],
        marineConnection: 'Xeebta Liido waa mid ka mid ah labada goobood ee barnaamijka Blue Ocean ee kormeerka qashinka badda iyo tayada biyaha uu socdo.',
      },
    },
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
    translations: {
      so: {
        title: 'Haweenka Beddelaya Hadhaagga Kalluunka Ganacsi',
        location: 'Kismaayo, Jubada Hoose',
        storyContent: [
          'Marsooyinka Kismaayo, qayb ka mid ah wixii maalin kasta la soo qaban jiray hore ayaa si fudud loo tuuri jiray — aad bay u yaraayeen, ay isku dartamayeen, ama aad bay u badnaayeen iibiyayaasha oo doonaya kaliya kalluun tayo sare leh. Ururka Haweenka Farsameynta Kalluunka ee Kismaayo waxaa lagu dhisay isla qaybtaas la iska indhatiray.',
          'Iyagoo farsameeya oo qallajinaya hantida haddii kale la tuuri lahaa, Ururku wuxuu dhibaatadii tuurista u beddelay ilo joogto ah oo dakhli qoys, waddooyinka ganacsiguna hadda waxay gaadhaan suuqyada gudaha ee ka baxsan xeebta laftirkeeda.',
          'Biyaha ay Ururku ka shaqeeyo waxay ku yaalaan cirifka marinnada cawsduurka badda ee Jasiiradaha Bajuun — isla biyahaas oo Blue Ocean ku sahamiso mid ka mid ah dadyowga dugong-ga ugu dambeeya ee Bariga Afrika ku nool — xubnuhuna waxay noqdeen lammaane aan rasmi ahayn oo ilaaliya caafimaadka marinnada ay maalin walba ku tiirsan yihiin.',
        ],
        marineConnection: 'Marsooyinka Ururku waxay ku xeeran yihiin marinnada cawsduurka badda ee Jasiiradaha Bajuun, kuwaas oo loo sahamiyay marinka ilaalinta sirenian-ka.',
      },
    },
  },
];

function buildCommunityStories(language = 'en') {
  const localizedCommunities = language === 'en' ? communities : localizeList(communities, language);
  return rawStories.map((s) => {
    const localizedStory = localize(s, language);
    const community = localizedCommunities.find((c) => c.slug === localizedStory.communitySlug);
    return {
      ...localizedStory,
      communityName: community?.name || null,
      species: resolveSpecies(localizedStory.speciesSlugs),
    };
  });
}

export const communityStories = buildCommunityStories('en');

// --- Public helpers -----------------------------------------------------

export function getAllCommunityStories(language = 'en') {
  return buildCommunityStories(language).filter((s) => s.published);
}

export function getCommunityStoryBySlug(slug, language = 'en') {
  return buildCommunityStories(language).find((s) => s.slug === slug || s.id === slug);
}

export function getFeaturedCommunityStory(language = 'en') {
  const stories = buildCommunityStories(language);
  return stories.find((s) => s.featured) || stories[0];
}

export function getStoriesByCommunity(communitySlug, language = 'en') {
  return buildCommunityStories(language).filter((s) => s.communitySlug === communitySlug);
}

export function getRelatedCommunityStories(currentSlug, limit = 3, language = 'en') {
  const stories = buildCommunityStories(language);
  const current = stories.find((s) => s.slug === currentSlug || s.id === currentSlug);
  if (!current) return stories.slice(0, limit);
  return stories
    .filter((s) => s.slug !== currentSlug && (s.category === current.category || s.region === current.region))
    .slice(0, limit);
}
