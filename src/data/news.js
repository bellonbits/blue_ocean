// =========================================================
// News & Discoveries Data Model
// Blue Ocean Somalia — Sprint 7: News, About & Contact
//
// Follows the same convention as research.js / conservation.js:
// institutional attribution (a team, a unit), not fabricated named
// individuals with invented biographical detail.
//
// i18n: article title/excerpt/content/gallery-caption/readTime fields
// carry a `translations: { so: {...} }` override merged in at read
// time via localize()/localizeList() from lib/i18n/localizeData.js.
// `category` (the enum key used for filtering/CSS) is never
// translated — only its display label (via NEWS_CATEGORIES /
// getNewsCategories) is. Cross-referenced destination/species/
// research/conservation/experience/community display fields are
// resolved from their own data files and are out of scope here.
// =========================================================

import { destinations } from './destinations.js';
import { speciesList } from './marineLife.js';
import { researchProjects } from './research.js';
import { conservationProjects } from './conservation.js';
import { communities } from './communities.js';
import { getAllExperiences } from './experiences.js';
import { localize, localizeList } from '../lib/i18n/localizeData.js';

export const NEWS_CATEGORIES = [
  {
    id: 'marine-life',
    slug: 'marine-life',
    label: 'Marine Life',
    badgeClass: 'badge-turquoise',
    translations: { so: { label: 'Noolaha Badda' } },
  },
  {
    id: 'research',
    slug: 'research',
    label: 'Research',
    badgeClass: 'badge-research',
    translations: { so: { label: 'Cilmi-baaris' } },
  },
  {
    id: 'tourism',
    slug: 'tourism',
    label: 'Tourism',
    badgeClass: 'badge-turquoise',
    translations: { so: { label: 'Dalxiis' } },
  },
  {
    id: 'conservation',
    slug: 'conservation',
    label: 'Conservation',
    badgeClass: 'badge-conservation',
    translations: { so: { label: 'Ilaalinta' } },
  },
  {
    id: 'coastal-communities',
    slug: 'coastal-communities',
    label: 'Coastal Communities',
    badgeClass: 'badge-turquoise',
    translations: { so: { label: 'Bulshooyinka Xeebaha' } },
  },
  {
    id: 'ocean-news',
    slug: 'ocean-news',
    label: 'Ocean News',
    badgeClass: 'badge-coming-soon',
    translations: { so: { label: 'Wararka Badweynta' } },
  },
];

export function getNewsCategories(language = 'en') {
  return localizeList(NEWS_CATEGORIES, language);
}

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
    translations: {
      so: {
        title: 'Arag Naadir ah oo Sharka Weyn (Whale Shark) Laga Diiwaan Geliyay Xeebta Puntland',
        excerpt: 'Cilmi-baarayaasha Blue Ocean waxay diiwaan geliyeen shark weyn oo 9 mitir dhererkiisu yahay oo u dhow Boosaaso — kani waa aragtidii ugu horreysay ee la diiwaan geliyo dhabtan xeebeed in ka badan tobankii sano ee la soo dhaafay, taasoo muujinaysa hodantinimada nolosha badda ee waqooyiga Soomaaliya.',
        readTime: '4 Daqiiqo Akhris',
        content: [
          paragraph('Shark weyn oo yar (juvenile) oo qiyaastii sagaal mitir dherer ah ayaa lagu sawiray oo lagu diiwaan geliyay Xarunta Cilmi-baarista Elasmobranch-ka ee Blue Ocean intii lagu jiray sahan caadi ah oo u dhow Boosaaso usbuucan — tanina waa aragtidii ugu horreysay ee la xaqiijiyay ee ku beegan meeshan u fog waqooyiga xeebta Gacanka Cadmeed in ka badan tobankii sano ee la soo dhaafay.'),
          paragraph('Xayawaanka wuxuu wax ka cunayay dushiisa biyaha, taasoo laga yaabo inay sababtay kobaca xilliyeed ee plankton-ka ee la xiriira upwelling-ka ka socda xeebta Bari. Kooxdu waxay sawiran kartay tiro ku filan oo sawirro ah oo muujinaya qaabka baraha jirka si loo isku dayo in lagu barbardhigo diiwaanka gobolka ee aqoonsiga sawirka ee laga dhisay daraasadda calaamadaynta ee socota ee koonfurta ka fog, Cap Guardafui.'),
          pullquote('Aragti ku beegan meel u fog dhinaca waqooyi waxay noo sheegeysaa in aagga daaqa ay ku ballaaran tahay in ka badan waxa xogtayada calaamadaynta oo keliya ay muujisay.', 'Blue Ocean Elasmobranch Research Unit'),
          paragraph('Sharka weyn waxaa lagu qeexay nooc halis ku jira, aragti kasta oo la xaqiijiyaana waxay ku kordhisaa xog dheeraad ah nooc aan wali si buuxda loo khariidayn socodkiisa ku beegan xeebta Soomaaliya. Aragtidan waxaa lagu daray xogta gobolka ee taageerta Hindisaha Ilaalinta Elasmobranch-ka ee Geeska Afrika.'),
          heading('Waxa xiga'),
          paragraph('Kooxda cilmi-baarista ayaa hadda isbarbar dhigaysa sawirka aqoonsiga ee Boosaaso iyo diiwaanka Guardafui ee jira si ay u ogaadaan haddii tani tahay xayawaan hore loo calaamadeeyay oo ballaarinaya aaggiisa la yaqaan, ama uu yahay xayawaan gebi ahaanba cusub.'),
        ],
        gallery: [
          { url: '/marine_sharks.jpg', caption: 'Sharka weyn oo lagu diiwaan geliyay isagoo wax ka cunaya dushiisa biyaha u dhow Boosaaso.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Kooxda cilmi-baarista oo u soo dhawaanaysa si ay u qaadato sawir aqoonsi.' },
          { url: '/bargaal_main.jpg', caption: 'Bargaal, oo ah meel la yaqaan oo xilliyeen isugu imaanaan daaqa u dhow.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Safar Cilmi-baaris oo Cusub ayaa ka Bilaabmay Gacanka Cadmeed',
        excerpt: 'Sahan ku salaysan doonyaha ayaa ka baxay Boosaaso si loo la socdo dhaqdhaqaaqa delfiinka iyo nibiriga ee waddada Gacanka Cadmeed, taasoo balaadhinaysa xogta aasaasiga ah ee ka dambeysa hindisaha Waddooyinka Ammaanka ee Socodka Xayawaanka Naaska Leh ee Badda.',
        readTime: '5 Daqiiqo Akhris',
        content: [
          paragraph('Xarunta Cilmi-baarista Nibiriga iyo Xayawaanka Naaska Leh ee Blue Ocean ayaa bilowday sahan doonyo ku salaysan oo dhowr toddobaad socon doona oo ku socda waddada Gacanka Cadmeed, iyagoo dejinaya qalab dhagaysi (hydrophones) ah oo sameynaya sahano indho-indhayn ah oo u dhexeeya Boosaaso iyo Qandala.'),
          paragraph('Sahankani wuxuu si toos ah ugu dhisan yahay shaqada kormeerka dhawaqa ee socota ee xarunta, isagoo ku daraya sawirro cusub oo aqoonsi ah diiwaanka quruumaha (pods) iyo ogaanshaha dhawaqyada dheeraadka ah ee jadwalka dhaqdhaqaaqa xilliyeed ee loo isticmaalo qorshaynta soo jeedinnada waddooyinka ammaanka ee mustaqbalka.'),
          heading('Sababta dhabtan xeebeed'),
          paragraph('Waddada Boosaaso–Qandala waxay leedahay mid ka mid ah isku-dhacyada ugu culus ee xeebta Soomaaliya oo u dhexeeya dhaqdhaqaaqa maraakiibta, goobaha kalluumeysiga dhaqameed, iyo dhaqdhaqaaqa xayawaanka naaska leh ee deggan — kaas oo ah nooca isku-dhac ee Hindisaha Waddooyinka Ammaanka ee Socodka Xayawaanka Naaska Leh ee Badda uu isku dayayo inuu si rasmi ah u khariideeyo oo yareeyo.'),
          pullquote('Ogaansho dhawaq kasta iyo isku-ekaansho sawir aqoonsi kastaaba waxay ka dhigaan soo jeedinta waddada ugu dambaysa mid loo adkeysan karo si sax ah.', 'Blue Ocean Cetacean & Marine Mammal Research Unit'),
          paragraph('Indho-indhaynta hore ayaa horeba u xaqiijisay in quruux delfiin (bottlenose dolphin) ah oo deggan ay si joogto ah u isticmaasho waddada — taasoo waafaqsan xilliyadii sahannada hore — iyo sidoo kale dhawaqyo marmar ah oo ka yimaada nibiriga guuraaga (humpback whale) oo caadi ku ah xilligan jadwalka socodka.'),
        ],
        gallery: [
          { url: '/marine_dolphins.jpg', caption: 'Quruux delfiin oo deggan oo la kulmay intii sahanka socday.' },
          { url: '/bosaso2.jpg', caption: 'Deked Boosaaso, oo ah bilowga safarka.' },
          { url: '/exp_coastal_cliff.jpg', caption: 'Biyaha xeebeed ee ku teedsan waddada sahanka ee Bari.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Nadaafadda Xeebaha Jubbaland ayaa Saartay Tan Plastik ah',
        excerpt: 'Mutadawiciin ka socda bulshooyinka xeebaha Kismaayo iyo Muqdisho ayaa ka qayb qaatay nadaafadda saddex-biloodlaha ah ee Blue Ocean, iyagoo saaray qadar aad u weyn oo qashin plastik ah oo sidoo kale xoojiyay khariidada cufnaanta qashinka ee dadaalkan ka dambeysa.',
        readTime: '3 Daqiiqo Akhris',
        content: [
          paragraph('Wareegga ugu dambeeyay ee Shabakada Nadaafadda Xeebaha Bulshada Koonfurta ee Blue Ocean ayaa soo jiitay mutadawiciin ka socda Kismaayo iyo Xeebta Liido, Muqdisho, si loo sameeyo nadaafad hal-maalin ah oo isku duwan oo daboolaysa labada goob ee qashinku ugu badan yahay ee uu aqoonsaday barnaamijka khariidaynta ee socota.'),
          paragraph('Qashinka la kala saaray waxaa loo diiwaan geliyay nooc kasta oo gaar ah — iyadoo la raacayo isla habka lagu isticmaalo shaqada sahanka hoosta ka socota — taasoo ka dhigaysa nadaafaddan xog dheeraad ah oo lagu daro khariidada cufnaanta qashinka, halkii ay ka noqon lahayd dhacdo hal-mar ah oo keliya.'),
          heading('Jadwal ku soo noqnoqda, ee aan ahayn hal-mar'),
          paragraph('Shabakada nadaafadda, oo qayb ahaan lacag ka helaysa Isbahaysiga Ganacsiga Xeebaha Muqdisho, hadda waxay ku socotaa jadwal saddex-biloodle ah oo labada goobood ah. Habaynayaashu waxay sheegayaan in ujeeddadu aysan ahayn hal dhacdo, ee ay tahay in laga hortago in qashinku ku joogo meel dheer si aan uga ekaanin inuu kala jajabo microplastics.'),
          pullquote('Ma nadiifin kartid wax aadan khariidayn — mana sii nadiifin kartid iyadoon aad dib usoo noqon rubuca soo socda.', 'Blue Ocean Pollution & Water Quality Team'),
        ],
        gallery: [
          { url: '/con_beach_cleanup.jpg', caption: 'Mutadawiciin kala saaraya qashinka noocyadiisa intii nadaafaddu socotay.' },
          { url: '/jubaland.jpg', caption: 'Xeebta Kismaayo, oo ah mid ka mid ah labada goob ee la daboolay.' },
          { url: '/mogadishu_beach.jpg', caption: 'Xeebta Liido, Muqdisho — oo ah goobta waqooyi ee shabakadda.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Soomaaliya Wali Ma Laha Aagag Badeed oo la Ilaaliyo — Soo Jeedintan ayaa Beddeli Doonta Taas',
        excerpt: 'Soo jeedin qaybineed oo ku dhisan laba sano oo xog ah oo ku saabsan adkaanta kulaylka jiirka ayaa ujeeddo uga leh in ugu dambeyntii la xiro faraq markii ugu horreysay lagu calaamadiyay daraasad xeebeed oo taariikhi ah oo sanadkii 2000: Soomaaliya sharci ahaan gebi ahaanba ma laha aagag badeed oo la ilaaliyo.',
        readTime: '5 Daqiiqo Akhris',
        content: [
          paragraph('Waa faraq la yaqaan in ka badan labaatan sano: Soomaaliya ma laha Aagag Badeed oo la Ilaaliyo, mana laha sharci xukuma sida mid loo dhisi lahaa. Xarunta Jiirka Badda iyo Deegaannada Xeebaha ee Blue Ocean ayaa hadda qorsheysay soo jeedin qaybineed oo ujeeddadeedu tahay in la xiro faraqaas.'),
          paragraph('Soo jeedintu waxay mudnaanta siisaa goobaha jiirka ee Jasiiradaha Baajuun iyo nidaamyada jiirka ee Qandala iyadoo lagu salaynayo adkaanta kulaylka la cabbiray — jiirada la aqoonsaday inay ugu badan yihiin inay ka badbaadaan sii kordhinta kulaylka badweynta ayaa ah kuwa ugu mudnaanta badan ee ilaalinta.'),
          heading('Faraq lagu calaamadiyay jiil ka hor'),
          paragraph('Sahan sayniseed oo sanadkii 2000 lagu sameeyay xeebta Soomaaliya ayaa lagu calaamadiyay maqnaanshaha Aagag Badeed oo la Ilaaliyo inuu yahay faraq halis ah, wuxuuna si gaar ah u tilmaamay dhabta Kismaayo-ilaa-Ras-Chiambone — oo hadda ah Jasiiradaha Baajuun — inay tahay mudnaanta ilaalinta ugu sarreysa ee dalka. Rubuc qarni ka dib, faraqaasi weli waa furan yahay.'),
          pullquote('Jiirada awoodda u leh inay ka badbaadaan waxa soo socda ayaa ah kuwa ugu horreeya ee ay tahay inaan ilaalino.', 'Blue Ocean Coral Reef & Coastal Ecosystems Unit'),
          paragraph('Qaab-dhismeedka qaybinta hadda wuxuu diyaar u yahay in loo gudbiyo maamullada xeebaha ee khuseeya. Baaxaddiisu si toos ah ayey ula soo dhacdaa soo jeedin kale oo ballaarinaysa Beerta Qaranka ee Lac Badana ee jirta oo ku fidsan qayb ka mid ah jasiiradaha — talo 1987 ah oo weli jirta oo aan waligeed si rasmi ah loo fulin.'),
        ],
        gallery: [
          { url: '/marine_coral.jpg', caption: 'Beer jiir ah oo ku taal Jasiiradaha Baajuun.' },
          { url: '/qandala_main.jpg', caption: 'Jiirada Qandala ee ku jira soo jeedinta qaybinta.' },
          { url: '/exp_coral_snorkeling.jpg', caption: 'Kooxda sahanka oo soo ururinaysa qaybo jiir ah si loo cabbiro adkaanta kulaylka.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Doonyaha Xadhigga ee Boosaaso waa Kuwii ugu Horreeyay ee la Siiyo Shahaadada Heerka Ganacsiga Caadilka ah ee Cusub',
        excerpt: 'Iskaashatada Kalluumeysiga Boosaaso waxay noqotay kooxda tijaabada ah ee Shahaadada Ganacsiga Caadilka ah ee Kalluumeysiga Xadhigga ee Blue Ocean, taasoo siisa iibsadayaasha dibadda hab ay markii ugu horreysay ku aqoonsan karaan tuna-ga Soomaaliyeed ee si waara loo qabtay.',
        readTime: '4 Daqiiqo Akhris',
        content: [
          paragraph('Iskaashatada Kalluumeysiga Boosaaso ayaa dhammaystay marxaladdii tijaabada ee barnaamijka Shahaadada Ganacsiga Caadilka ah ee Kalluumeysiga Xadhigga ee Blue Ocean, iyagoo noqday kooxdii ugu horreysay ee Soomaaliyeed ee si rasmi ah ugu calaamadin karta kaydkooda tuna-ga yellowfin-ka inuu yahay mid la shahaaday oo waara.'),
          paragraph('Shahaadadu waxay ku dhisan tahay qiimeyn kaydka oo la daabacay oo muujinaysa in tirada tuna-ga yellowfin-ka ee maxaliga ahi ay ku jirto xadka waara ee cadaadiska xadhigga hadda jira — xaaladdan shahaadadu waxay ujeeddo uga leedahay inay ku caawiso sii wadista, iyadoo abaal marinaysa halkii ay ciqaabi lahayd, doonyaha horeba u kalluumeysanaya habkan.'),
          heading('Waxa isbeddela kooxda'),
          paragraph('Ashkarta shahaadaysan hadda waxay diiwaan geliyaan xogta kaydka waxayna u gudbiyaan hubinta dibadda — isbeddel dhab ah oo ka soocan kalluumeysi ku shaqeeyay ku dhawaad kaliya dareen iyo aqoon jiil-jiil ah. Isu-dhaafsiga, tiro sii kordheysa oo iibsadayaal dibadda ah ayaa kala sooci kara kaydka la shahaaday iyo tartanka aan shahaadaysnayn.'),
          pullquote('Kalluumeysiga xadhigga horeba wuxuu ahaa mid ka mid ah habab ugu doorbidan. Hadda suuqu runtii wax ka garan karaa.', 'Blue Ocean Fisheries Science Team'),
        ],
        gallery: [
          { url: '/exp_dhow_sailing.jpg', caption: 'Doonyaha xadhigga ee Iskaashatada Kalluumeysiga Boosaaso.' },
          { url: '/marine_fish.jpg', caption: 'Tuna yellowfin ah oo la soo dejiyay si loo qaado tijaabo baayoolaji.' },
          { url: '/bosaso2.jpg', caption: 'Suuqa kalluunka Boosaaso, oo ah meel hubinta shahaadada.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Gudaha Jasiiradaha Baajuun: Xuduudda Quusidda ee ugu Yaraan Loo Yaqaan ee Soomaaliya',
        excerpt: 'Silsilad jasiiro, jasiiro yaryar, iyo dhagxaan badeed oo koonfurta Kismaayo ku yaal ayaa ku hayaan qaar ka mid ah nidaamyada jiirka ugu buuxa ee xeebta Soomaaliya — iyo ku dhawaad wax booqdayaal ah. Waa tan waxa ka dhigaysa mid mudan safarka.',
        readTime: '6 Daqiiqo Akhris',
        content: [
          paragraph('Koonfurta Kismaayo, xeebta Soomaaliya si buuxda ayay isbeddeshaa. Jasiiradaha Baajuun — oo ah silsilad jasiiro murjaan ah oo ka soocan berriga waxaana kala qaybiya marin badeed oo dhow — waxay ku hayaan qaar ka mid ah nidaamyada jiirka ugu buuxa ee ka hara xeebta, waxayna weli ku dhawaad gebi ahaanba ahaanaan mid aan booqdayaashu heli.'),
          paragraph('Quusidda jiirka ee dhabta ah ee ku xeeran (fringing reef) waa naadir intiisa badan xeebta Soomaaliya, halkaas oo koritaanka jiirku badanaa u dhacdo qaybo kala firdhisan. Jasiiradaha Baajuun waa ka reeban: jasiiradaha sida Ilisi waxay leeyihiin qaab jiir oo buuxa — dhabaan, siman, iyo darbi hore — oo ay ku noolyihiin Acropora laamaysan, tuulmooyin Porites ah, iyo dooxyo dhaadheer oo cawska badda Thalassodendron ah oo hoosaadka biyaha ku yaal.'),
          heading('Waxa la filan karo'),
          paragraph('Xaaladaha jira waxay u fiican yihiin dabaasha hoosta biyaha (snorkeling) iyo quusid xasilloon oo ka fog qulqulka gudaha marinka, halka darbiga jiirka ee bannaanka lagu quuso qulqulku ku badan yahay ay ku fiican tahay kuwa quusidda khibradda u leh. Gaadhista goobtu wali way xaddidan tahay oo aan si weyn loo horumarin — tani waa quusid xuduud ah, mana ahan mid xarumo dalxiis ah.'),
          pullquote('Tani waa mid ka mid ah dhabaha jiirka Soomaaliyeed ee ugu dambeeya ee quusidiinta badankood ayan waligood maqal.', 'Blue Ocean Editorial Team'),
          paragraph('Jasiiradahani sidoo kale waxay ku yaalliin aagga lagu calaamadiyay mudnaanta ugu sarreysa ee ilaalinta jiirka ee Soomaaliya, taasoo micnaheedu yahay booqasho kastaa waxay noqonaysaa fursad si toos ah loogu arko jiirada uu ku dhisan yahay soo jeedinta qaybinta MPA ee Blue Ocean.'),
        ],
        gallery: [
          { url: '/jubaland.jpg', caption: 'Jidadka biyaha turquoise ee dhawrsan ee Jasiiradaha Baajuun.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Quusid oo sahamin ku jira buur-jiir oo Baajuun ah.' },
          { url: '/marine_coral.jpg', caption: 'Qaababka jiirka ee caadiga u ah jiirada bannaanka ee jasiiradaha.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Xilliga Ugxansiga ee Hufun ayaa ku Dhammaaday Daboolid Ilaaliye oo Diiwaan ah',
        excerpt: 'Xilliga ugxansiga ee sannadkan ee Hufun ayaa ku dhammaaday iyadoo ugxan kasta oo firfircoon uu ilaaliye daboolayo markii ugu horreysay — natiijadan waa tii ugu xoogga badneyd ee ka timid Barnaamijka Ilaaliyaha Xeebaha Bulshada ee Ilaalinta Ugxanta.',
        readTime: '4 Daqiiqo Akhris',
        content: [
          paragraph('Xilliga ugxansiga ee diinta cagaaran iyo diinta hawksbill ee Hufun ayaa ku dhammaaday farac muhiim ah: markii ugu horreysay tan iyo bilowgii barnaamijka, ugxan kasta oo firfircoon oo ku taal xeebaha tombolo-ga waxaa daboolay ilaaliye intii lagu jiray xilliga koritaanka oo dhan.'),
          paragraph('Ilaaliyayaasha Xeebaha Dhallinyarada Hufun — oo ah shabakad tababaran oo dad dhalinyaro ah oo deggan oo socda xeebaha jadwal habeenle oo isbeddela — waxay diiwaan geliyeen dhacdooyin carqalad ah oo aad uga yar heerkii xilliyada hore, waxayna la socdeen sii daynta dhalanka diinta goob kasta oo la xaqiijiyay in ay ka dhalatay.'),
          heading('Sababta daboolku uu saas u muhiim u yahay'),
          paragraph('Hufun waa mid ka mid ah labada goobood ee muhiimka ah ee ugxansiga diinta cagaaran iyo hawksbill ee laga diiwaan geliyay xeebta Soomaaliya. Carqalad kali ah oo aan la ogaan intii koritaanka socday ayaa baabi\'in kara dhammaan ugxan la isku daray — kaas oo ah faraqa kormeerka joogtada ah ee goobta lagu sameeyo loogu talagalay in la xiro.'),
          pullquote('Kooxda cilmi-baaristu ma joogi karto xeeb habeen kasta xilli oo dhan. Shabakad maxalli ah oo tababaran waa awoodaa.', 'Blue Ocean Sea Turtle Research Unit'),
          paragraph('Dhowr ilaaliye oo xilligan ka mid ah ayaa horeba loo codsaday inay ku soo noqdaan xilliga soo socda, qaarna waxay bilaabeen inay hagaan cilmi-baarayaasha booqda xilliga aan firfircoonayn — calaamad hore oo muujinaysa in barnaamijku u dhisayo wax ka waara mid xilli-hal ah.'),
        ],
        gallery: [
          { url: '/marine_turtles.jpg', caption: 'Diin bad oo cagaaran oo ku dhex jirta biyaha u dhow Hufun.' },
          { url: '/hafun2.jpg', caption: 'Xeebta tombolo ee Hufun, oo ah goobta ugu weyn ee ugxansiga xilligan.' },
          { url: '/con_youth_education.jpg', caption: 'Ilaaliye xeeb ah oo ku jira wareegyada habeenle ee kormeerka ugxanta.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Sababta Xeebta Soomaaliya ay Labo Jeer Sanadkiiba u Rogto Jihada Qulqulka Badda',
        excerpt: 'Labo jeer sannadkiiba, Qulqulka Badda ee Soomaaliya wuxuu sameeyaa wax aan qulqul badeed kale samayn — inuu si buuxda u rogo jihadiisa. Waa tan waxa keena, iyo sababta ay xeebtan aad ugu hodmisay.',
        readTime: '5 Daqiiqo Akhris',
        content: [
          paragraph('Inta badan qulqulka badweynta ee waaweyn waxay u socdaan jiho joogto ah sanadka oo dhan. Qulqulka Badda ee Soomaaliya waa mid naadir ah oo ka reeban: iyadoo uu wado wareegga monsoon-ka, wuxuu labo jeer sanadkiiba u rogaa jihadiisa, koonfur u socda xilliga monsoon-ka waqooyi-bari, wuxuuna u leexdaa woqooyi — isagoo noqda mid ka mid ah qulqulada ugu dhaqsaha badan badweynta adduunka — xilliga monsoon-ka koonfur-galbeed.'),
          paragraph('Rogitaankaasi waa sababta xeebta Soomaaliya ay aad ugu hodantahay. Marka qulqulku xawaare u kordho xagga woqooyi xilli kasta oo xagaaga ah, wuxuu soo jiitaa biyo qabow oo hodan ku ah nafaqo ka yimaada qoto dheer ee badweynta ee ku teedsan xeebta — geeddi-socod loo yaqaan upwelling — kaas oo quudiya kobaca plankton-ka oo isna taageera kalluumeysiga xeebta.'),
          heading('Qulqul leh laba dabeecadood'),
          paragraph('Xilliga monsoon-ka koonfur-galbeed, wareeg biyood oo la yaqaan Great Whirl-ka ayaa ka samaysma xeebta woqooyi, oo la socda wareeg kale oo ka yar oo ka fog. Labada nidaam midkoodna waxay qaabeeyaan halka nafaqadu ku ururto — taas oo keentaba halka kalluunka, iyo xayawaanka wax ka cunaya, ay isugu imaan doonaan.'),
          pullquote('Isla qulqulka labo jeer sanadkiiba rogaya jihadiisa ayaa ah sababta xeebtani ay awood u leedahay inay quudiso nolol tiro badan sida ay hadda u leedahay.', 'Blue Ocean Editorial Team'),
          paragraph('Mishiinkan xilliyeed waa qayb weyn oo ka mid ah sababta xilliyada duurka ee cilmi-baarista Blue Ocean laftiisa — laga bilaabo calaamadaynta sharka weyn ilaa tijaabinta tuna-ga — loogu dhisay jadwalka monsoon-ka halkii ay ka noqon lahaayeen kan Gregorian-ka.'),
        ],
        gallery: [
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebeed ee ku teedsan waddada Qulqulka Badda ee Soomaaliya.' },
          { url: '/exp_coastal_cliff.jpg', caption: 'Biyaha ka faa\'iidaysta upwelling-ka ee u dhow xeebta Bari.' },
          { url: '/marine_fish.jpg', caption: 'Kalluunka badweynta ee soo jiita hodannimada xilliyeed ee upwelling-ka.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Sahan Drone ah ayaa Xaqiijiyay Mid ka mid ah Kooxaha Dugong-ga Deggan ee ugu Dambeeyay ee Bariga Afrika',
        excerpt: 'Sahan drone ah oo si nidaam leh loo sameeyay ayaa xaqiijiyay kooxo yar oo dugong ah oo sannad-dhan ku degan jidadka cawska badda ee Jasiiradaha Baajuun — kuwaas oo ka mid ah qalcadaha ugu dambeeya ee nooca laga yaqaan meel kasta oo Bariga Afrika ah.',
        readTime: '4 Daqiiqo Akhris',
        content: [
          paragraph('Xarunta Kala-duwanaanta Noolaha Badda ee Blue Ocean ayaa dhammaystay sahan hawada ah oo si nidaam leh loo sameeyay oo lagu sahamiyay jidadka cawska badda ee Jasiiradaha Baajuun, iyadoo xaqiijisay kooxo yar oo dugong ah oo deggan oo sannad-dhan isticmaala jidadkaas — mid ka mid ah qalcadaha ugu dambeeya ee noocaas oo laga diiwaan geliyay meel kasta oo Bariga Afrika ah.'),
          paragraph('Dugong-ga si caan ah ayay u adagtahay in lagu sahamiyo doonyo; indho-indhaynta drone-ku waxay u oggolaatay kooxda inay daboosho aad ubadan nidaamka jidadka iyadoo aad u yaraynaysa carqaladda gaadha xayawaanka.'),
          heading('Kooxo aan lahayn meel ay ku lumaan karaan'),
          paragraph('Qiyaasta tirada ee sahanku waxay si toos ah ugu wargelisay soo jeedinta Waddooyinka la Ilaaliyo ee Aan Shabag-Dhaadheer Lahayn ee Naasleyda Badda ee Soomaaliya — ku xidhmidda shabagyada dhaadheer waa sababta ugu weyn ee dhimashada dugong-ga gobolka oo dhan, kooxo sidan u yaruna waxay leeyihiin awood yar oo ay ku qaadan karaan lumis.'),
          pullquote('Helitaankoodu wuxuu ahaa qaybta ugu adkeyd. Halkan ku hayntoodu waa qaybta hadda muhiimka ah.', 'Blue Ocean Marine Biodiversity Unit'),
          paragraph('Jidadka la sahamiyay waxay la xiriiraan goobaha dejinta ee ay isticmaasho Ururka Haweenka Kismaayo ee Habaynta Kalluunka, kuwaas oo xubnahoodu noqday lammaane aan rasmi ahayn oo ka qaybqaata kormeerka caafimaadka jidadka maalin kasta.'),
        ],
        gallery: [
          { url: '/marine_seagrass.jpg', caption: 'Wadada raaca ee dugong-ga oo lagu arki karo doox caws bad oo hoosaadka biyaha ah.' },
          { url: '/jubaland.jpg', caption: 'Jidadka cawska badda ee dhawrsan ee Jasiiradaha Baajuun.' },
          { url: '/somalia_coast.jpg', caption: 'Biyaha xeebeed ee koonfureed ee ku jira sahanka hawada.' },
        ],
      },
    },
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
    translations: {
      so: {
        title: 'Laba Sano Ka Dib, Heshiiska Lobster-ka ee Eyl Weli wuu Socdaa',
        excerpt: 'Heshiiska Sii-daynta Dheddigyada Ukunta Sita iyo Xadka Cabbirka — oo ay wada naqshadeeyeen qoysaska kalluumeysiga ee Eyl laftooda — ayaa hadda socday laba xilli oo buuxa, iyadoon jirin calaamad ah in iskaashatooyinku ka gaabsanayaan.',
        readTime: '3 Daqiiqo Akhris',
        content: [
          paragraph('Laba xilli ka dib markii ay iskaashatooyinka kalluumeysiga ee Eyl aqbaleen heshiis ay iyagu naqshadeeyeen si loo sii daayo dheddigyada lobster-ka ee ukunta sita loona fuliyo cabbirka ugu yar ee la qaadan karo, dhaqankani weli wuu socdaa — iyadoon jirin qalab fulin oo rasmi ah oo ka baxsan heshiiska iskaashatooyinku ku heshiiyeen.'),
          paragraph('Heshiisku wuxuu ka soo baxay daraasad la dhammeeyay oo ku saabsanayd miisaanka noolaha iyo dadaalka ururinta, taas oo xaqiijisay waxa jiillo badan oo ururiyayaal maxalli ah horeba u shakiyeen: ilaalinta dheddigyada dhalanaya ayaa ka muhiimsan ku dhawaad tallaabo kasta oo kale oo loo heli karo kalluumeysigan.'),
          heading('Sababta ay u sii jirtay'),
          paragraph('Si ka duwan xeer dibadda laga soo rogay, heshiiskan waxaa wada naqshadeeyay isla ashkarta hadda raacaysa — farqigan ayaa Kooxda Sayniska Kalluumeysiga ee Blue Ocean si toos ah ugu tiriyaan sababta uu u sii jiray labadan xilli.'),
          pullquote('Wuu sii jiray sababtoo ah iyagaa qoray, ee ma ahan sababtoo ah qof baa ku qasbay inay raacaan.', 'Blue Ocean Fisheries Science Team'),
        ],
        gallery: [
          { url: '/eyl1.jpg', caption: 'Xeebta jibaale ee Eyl, oo ah goobta ugu weyn ee kalluumeysiga lobster-ka.' },
          { url: '/exp_coastal_cliff.jpg', caption: 'Jibaalayaasha Bari ee lagu sahamiyay daraasaddii asalka ahayd ee miisaanka.' },
          { url: '/exp_scuba_diving.jpg', caption: 'Quusid sahan ah oo diiwaan gelinaya cufnaanta lobster-ka ee godadka jiirka.' },
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

// --- Localization ---------------------------------------------------

function localizeArticle(article, language = 'en') {
  if (!article) return article;
  const localized = localize(article, language);
  const cat = NEWS_CATEGORIES.find((c) => c.id === article.category);
  const localizedCat = cat ? localize(cat, language) : null;
  return {
    ...localized,
    categoryLabel: localizedCat?.label || localized.categoryLabel,
  };
}

function localizeArticles(list, language = 'en') {
  return (list || []).map((a) => localizeArticle(a, language));
}

// --- Public helpers -----------------------------------------------------

export function getAllArticles(language = 'en') {
  const list = articles.filter((a) => a.published).sort((a, b) => new Date(b.date) - new Date(a.date));
  return localizeArticles(list, language);
}

export function getArticleBySlug(slug, language = 'en') {
  const article = articles.find((a) => a.slug === slug || a.id === slug);
  return article ? localizeArticle(article, language) : undefined;
}

export function getFeaturedArticle(language = 'en') {
  const all = getAllArticles(language);
  return all.find((a) => a.featured) || all[0];
}

export function getLatestArticles(limit = 3, excludeSlug = null, language = 'en') {
  return getAllArticles(language).filter((a) => a.slug !== excludeSlug).slice(0, limit);
}

export function getArticlesByCategory(categoryId, language = 'en') {
  if (!categoryId || categoryId === 'all') return getAllArticles(language);
  return getAllArticles(language).filter((a) => a.category === categoryId);
}

export function getRelatedArticles(currentSlug, limit = 3, language = 'en') {
  const current = getArticleBySlug(currentSlug, language);
  if (!current) return getAllArticles(language).slice(0, limit);
  return getAllArticles(language)
    .filter((a) => a.slug !== currentSlug && (a.category === current.category || a.destinationSlugs.some((d) => current.destinationSlugs.includes(d))))
    .slice(0, limit);
}

export function getCategoryInfo(id, language = 'en') {
  return getNewsCategories(language).find((c) => c.id === id || c.slug === id);
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
