import { ArrowRight, Compass, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const EXPERIENCES = [
  {
    slug: 'snorkeling-reefs',
    titleEn: 'Coral Reef & Lagoon Snorkeling',
    titleSo: 'Dabaasha Shacaabka & Biyaha Qulqulaya',
    categoryEn: 'Shallow Waters & Lagoons',
    categorySo: 'Biyaha Dhow & Shacaabka',
    durationEn: 'Half-Day / Full-Day',
    durationSo: 'Maalin Bar / Maalin Buuxda',
    skillEn: 'All Skill Levels & Families',
    skillSo: 'Heer Kasta & Qoysaska',
    image: '/images/img_01.webp',
    descEn: 'Glide effortlessly through warm, mirror-still turquoise lagoons. Swim alongside gentle green sea turtles, stingrays, and vibrant branching coral gardens in Bajuni and Zeila.',
    descSo: 'Ku dabaalo biyaha buluugga ah ee gacanka, adigoo la kulmaya qoolleyda badda, shacaabka midabada leh, iyo kalluunka quruxda badan ee jasiiradaha.',
    highlightsEn: ['25m+ Crystal Water Clarity', 'Sea Turtle Sanctuary Encounter', 'Professional Mask & Fins Provided'],
    highlightsSo: ['Biyo Nadiif ah oo 25m+ ah', 'Hoyga Qoolleyda Badda', 'Qalabka Dabaasha oo Dhan'],
  },
  {
    slug: 'scuba-diving',
    titleEn: 'Pelagic Scuba & Continental Drop-Offs',
    titleSo: 'Quusidda Qotada Dheer ee Reef-ka',
    categoryEn: 'Deep Marine Expedition',
    categorySo: 'Sahaminta Biyaha Qotada Dheer',
    durationEn: '3–7 Days Expedition',
    durationSo: '3–7 Maalmood Safar',
    skillEn: 'Open Water Certified & Advanced',
    skillSo: 'Kuwa Haysta Shahaadada Quusidda',
    image: '/images/img_04.webp',
    descEn: 'Descend along steep continental shelf drop-offs where the powerful Somali Current brings giant manta rays, schools of trevally, hammerheads, and virgin coral pinnacles.',
    descSo: 'U quuso buuraha hoose ee badda halka ay ku kulmaan kalluunka waaweyn, manta rays, iyo carwooyinka shacaabka ee aan waligood la taaban.',
    highlightsEn: ['Pristine Vertical Coral Walls', 'Manta Ray Aggregation Zones', 'PADI Dive Masters & Nitrox'],
    highlightsSo: ['Buuraha Shacaabka ee Hoose', 'Manta Rays & Noolaha Waaweyn', 'Khubaro Quusid oo Aqoonsan'],
  },
  {
    slug: 'dhow-sailing',
    titleEn: 'Traditional Dhow & Island Boat Tours',
    titleSo: 'Safarada Doonyaha Dhowka & Jasiiradaha',
    categoryEn: 'Maritime Heritage & Island Hopping',
    categorySo: 'Hidaha Badmareenka & Jasiiradaha',
    durationEn: '1–4 Days Voyages',
    durationSo: '1–4 Maalmood',
    skillEn: 'Relaxed / All Travelers',
    skillSo: 'Qof Kasta & Safarro Deggan',
    image: '/images/img_02.webp',
    descEn: 'Sail under lateen canvas aboard handcrafted wooden dhows through untouched archipelago chains, secluded white sandbars, and secret mangrove channels with local navigators.',
    descSo: 'Ku raaxayso safarka doonyaha qadiimiga ah ee shiraaca leh, sahaminta jasiiradaha cidla ah, iyo cuntooyinka badda ee macaan oo lagu dubay xeebta.',
    highlightsEn: ['Sunset Archipelago Cruises', 'Sandbar Beach Seafood Grills', 'Multi-Generational Somali Skippers'],
    highlightsSo: ['Safarada Qorrax-dhaca ee Badda', 'Cunto Xeebta ah oo Macaan', 'Badmareenno Khibrad Dheer Leh'],
  },
  {
    slug: 'underwater-photography',
    titleEn: 'Underwater & Drone Coastal Photography',
    titleSo: 'Sawir-qaadista Biyaha Hoostooda & Cirka',
    categoryEn: 'Creative Expedition',
    categorySo: 'Sawir-qaadista Hal-abuurka',
    durationEn: '2–5 Days Workshop',
    durationSo: '2–5 Maalmood',
    skillEn: 'Photographers & Content Creators',
    skillSo: 'Sawir-qaadayaasha & Abuurayaasha',
    image: '/images/img_09.webp',
    descEn: 'Capture world-class imagery with pristine 30m+ underwater visibility, dramatic limestone ocean canyons, sea cliffs, and uncrowded coastal vistas bathed in golden equatorial light.',
    descSo: 'Qaad sawirro heer caalami ah oo biyo nadiif ah, dooxooyinka dhagaxa leh ee badda ku darsanta, iyo muuqaallada dabiiciga ah ee xeebta Soomaaliya.',
    highlightsEn: ['30m+ Equatorial Water Clarity', 'Drone Permit & Coastal Access', 'Underwater Camera Housing Support'],
    highlightsSo: ['Biyo Nadiif ah oo 30m+ ah', 'Ogolaanshaha Duulista Diyaaradaha', 'Taageero Farsamo oo Buuxda'],
  },
  {
    slug: 'whale-shark-safari',
    titleEn: 'Whale Shark & Marine Megafauna Safaris',
    titleSo: 'Daawashada Libaax-Badeedka & Noolaha Waaweyn',
    categoryEn: 'Wildlife Encounters',
    categorySo: 'Daawashada Noolaha Badda',
    durationEn: '1–3 Days Safaris',
    durationSo: '1–3 Maalmood',
    skillEn: 'Swimmers & Snorkelers',
    skillSo: 'Dabbaasheeysata & Snorkelers',
    image: '/images/img_10.webp',
    descEn: 'Ethical, non-invasive snorkeling encounters alongside migrating whale sharks, spinner dolphin super-pods, and pilot whales in the Gulf of Aden and Puntland waters.',
    descSo: 'La kulan libaax-badeedka deggan iyo dolphins-ka ciyaaraya ee biyaha Gacanka Cadmeed iyadoo la dhowrayo badbaadada noolaha iyo deegaanka.',
    highlightsEn: ['Strict Wildlife Welfare Protocols', 'Marine Biologist Expedition Leader', 'High Sighting Success Rate'],
    highlightsSo: ['Dhowridda Badbaadada Noolaha', 'Saynisyahan Badda oo Weheliya', 'Fursad Sare oo Aragtida ah'],
  },
  {
    slug: 'coastal-cliff-trek',
    titleEn: 'Canyon Cliffs & Desert Coast Trekking',
    titleSo: 'Socdaalka Buuraha Xeebta & Dooxooyinka',
    categoryEn: 'Coastal Wilderness',
    categorySo: 'Dabeecadda Xeebta',
    durationEn: '2–4 Days Trek',
    durationSo: '2–4 Maalmood',
    skillEn: 'Moderate Fitness',
    skillSo: 'Socod Dhexdhexaad ah',
    image: '/images/img_11.webp',
    descEn: 'Trek where dramatic limestone canyons meet the crashing Indian Ocean surf. Explore ancient pirate watchtowers, hidden ocean springs, and historic fortresses in Eyl.',
    descSo: 'Kora buuraha dhagaxa ah ee ku teedsan badda, booqo qalcadihii taariikhiga ahaa iyo ilaha biyaha macaan ee dooxada Eyl ee Nugaal.',
    highlightsEn: ['Eyl Ocean Canyon Springs', 'Dervish Historic Fortifications', 'Spectacular Cliffside Vistas'],
    highlightsSo: ['Ilaha Biyaha Macaan ee Eyl', 'Qalcadihii Taariikhiga Ahaa', 'Muuqaallo Buureed oo Ballaaran'],
  },
  {
    slug: 'beach-experiences',
    titleEn: 'Virgin White Sand Beaches & Coastal Sunsets',
    titleSo: 'Xeebaha Ciidda Cad & Qorrax Dhaca Badda',
    categoryEn: 'Beach & Shoreline Leisure',
    categorySo: 'Nasashada Xeebaha & Ciidda Cad',
    durationEn: 'Half-Day / Multi-Day Stays',
    durationSo: 'Maalin Bar / Maalmood Badan',
    skillEn: 'All Travelers & Families',
    skillSo: 'Qof Kasta & Qoysaska',
    image: '/images/img_05.webp',
    descEn: 'Unwind along miles of sun-bleached sand, calm shallow lagoons, and authentic beach hospitality across Liido, Kismayo, and Mogadishu’s scenic coastline.',
    descSo: 'Ku naso xeebaha ciidda cad ee aan ciriiriga lahayn, biyaha diirran ee badda, iyo soo dhawaynta quruxda badan ee Liido iyo Kismaayo.',
    highlightsEn: ['Pristine Turquoise Bathing Waters', 'Fresh Seafood Beach Grills', 'Safe Guided Coastal Stays'],
    highlightsSo: ['Biyo Nadiif ah oo Lagu Dabaasho', 'Cunto Badda ah oo Macaan', 'Safarro Nabadgelyo Leh'],
  },
  {
    slug: 'reef-exploration',
    titleEn: 'Barrier Reef & Shallow Lagoon Safaris',
    titleSo: 'Sahaminta Shacaabka & Jasiiradaha Baajuun',
    categoryEn: 'Reef Ecology & Marine Safaris',
    categorySo: 'Nidaamka Shacaabka & Jasiiradaha',
    durationEn: '1–3 Days Island Cruises',
    durationSo: '1–3 Maalmood Safar',
    skillEn: 'All Swimmers & Explorers',
    skillSo: 'Dabbaasheeysata & Sahamiyeyaasha',
    image: '/images/img_06.webp',
    descEn: 'Navigate extensive barrier reef ecosystems in Bajuni and Zeila archipelagos. Discover vibrant brain corals, table corals, and hundreds of tropical reef fish species.',
    descSo: 'Sahmi beeraha shacaabka ee jasiiradaha Saacaddiin iyo Baajuun, halkaas oo ay ku nool yihiin noocyo badan oo kalluun iyo xayawaanno badeed ah.',
    highlightsEn: ['Untouched Coral Biodiversity', 'Protected Lagoon Snorkeling', 'Local Conservation Ranger Guides'],
    highlightsSo: ['Kala Duwanaanshaha Shacaabka', 'Biyo Deggan oo Ammaan ah', 'Hagayaal Ilaalinta Deegaanka'],
  },
];

export default function EditorialExperiences() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section id="editorial-experiences" className="editorial-exp" aria-label="Curated Ocean Experiences">
      <div className="editorial-exp__container">
        {/* Section Header */}
        <div className="editorial-exp__header">
          <div className="editorial-exp__title-group">
            <span className="editorial-eyebrow">
              <Compass size={14} className="editorial-eyebrow-icon" />
              {isSomali ? 'KHIBRADAHA BADDA EE SOOMAALIYA' : 'CURATED OCEAN EXPERIENCES'}
            </span>
            <h2 className="editorial-section-title">
              {isSomali ? (
                <>Safarro Lagu Sahminayo <span className="editorial-italic">Biyaha Geeska Afrika</span></>
              ) : (
                <>Snorkeling, Diving & Island Tours Along the <span className="editorial-italic">Somali Current</span></>
              )}
            </h2>
            <p className="editorial-section-subtitle">
              {isSomali
                ? 'Dooro khibradahaaga badda — dabaasha shacaabka bikro ah, quusidda qotada dheer, safarada doonyaha shiraaca, iyo sawir-qaadista xeebaha ugu quruxda badan Afrika.'
                : "Choose your ocean adventure — virgin coral snorkeling, pelagic wall diving, traditional Swahili dhow sailing, coastal drone photography, and ethical whale shark encounters."}
            </p>
          </div>
          <Link
            to={localizedPath('/experiences')}
            className="editorial-exp__view-all"
            id="experiences-view-all-btn"
          >
            <span>{isSomali ? 'Dhammaan Khibradaha' : 'View All Experiences'}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 6 Curated Activity Cards */}
        <div className="editorial-exp__grid">
          {EXPERIENCES.map((exp) => (
            <div key={exp.slug} className="editorial-exp-card">
              <div className="editorial-exp-card__media">
                <img
                  src={exp.image}
                  alt={isSomali ? exp.titleSo : exp.titleEn}
                  className="editorial-exp-card__img"
                  loading="lazy"
                />
                <span className="editorial-exp-card__duration">
                  {isSomali ? exp.durationSo : exp.durationEn}
                </span>
                <span className="editorial-exp-card__skill">
                  {isSomali ? exp.skillSo : exp.skillEn}
                </span>
              </div>

              <div className="editorial-exp-card__body">
                <span className="editorial-exp-card__category">
                  {isSomali ? exp.categorySo : exp.categoryEn}
                </span>
                <h3 className="editorial-exp-card__title">
                  {isSomali ? exp.titleSo : exp.titleEn}
                </h3>
                <p className="editorial-exp-card__desc">
                  {isSomali ? exp.descSo : exp.descEn}
                </p>

                {/* Highlights List */}
                <div className="editorial-exp-card__highlights-list">
                  {(isSomali ? exp.highlightsSo : exp.highlightsEn).map((hl, i) => (
                    <div key={i} className="editorial-exp-card__hl-item">
                      <CheckCircle2 size={13} className="editorial-exp-card__hl-icon" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Buttons: Book / Inquire + Details */}
                <div className="editorial-exp-card__actions-row">
                  <Link
                    to={`${localizedPath('/contact')}?booking=true&experience=${encodeURIComponent(exp.titleEn)}`}
                    className="editorial-exp-card__btn-book"
                    aria-label={`Inquire and book ${isSomali ? exp.titleSo : exp.titleEn}`}
                  >
                    <Calendar size={13} />
                    <span>{isSomali ? 'Qorshee / Inquire' : 'Book / Inquire'}</span>
                  </Link>

                  <Link
                    to={localizedPath('/experiences')}
                    className="editorial-exp-card__btn-details"
                  >
                    <span>{isSomali ? 'Faahfaahin' : 'Details'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
