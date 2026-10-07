import { useState } from 'react';
import { ArrowRight, MapPin, Compass, Shield, Fish, Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const COASTLINE_SEGMENTS = [
  {
    id: 'zeila',
    labelEn: 'Zeila / Border',
    labelSo: 'Saylac & Xadka',
    coords: '11.35° N, 43.47° E',
    regionEn: 'Awdal / Gulf of Aden',
    regionSo: 'Awdal / Gacanka Cadmeed',
    titleEn: 'Zeila Archipelago & Barrier Reefs',
    titleSo: 'Jasiiradaha Saylac & Dhagax-badeedka',
    descEn: 'Historical coral atolls, the Sa’ad ad-Din island chain, and shallow mangrove lagoons hosting rare dugongs and Hawksbill sea turtles.',
    descSo: 'Jasiiradaha qadiimiga ah ee Sacadaddiin iyo aagagga mangrove-ka oo ay ku nool yihiin noocyada naadirka ah ee noolaha badda.',
    towns: ['Zeila (Saylac)', 'Aibat Island', 'Lughaya'],
    species: ['Hawksbill Turtle', 'Dugong', 'Fringing Corals'],
    conservation: 'Zeila Marine Sanctuary Initiative',
    image: '/images/img_09.png',
  },
  {
    id: 'somaliland',
    labelEn: 'Somaliland',
    labelSo: 'Somaliland',
    coords: '10.43° N, 45.01° E',
    regionEn: 'Sahil & Sanaag Coast',
    regionSo: 'Saaxil & Sanaag',
    titleEn: 'Berbera & The Frankincense Coast',
    titleSo: 'Xeebta Berbera & Buuraha Maydh',
    descEn: 'Deep-water natural shipping harbors transitioning into dramatic red sandstone cliffs where ancient frankincense routes meet the sea.',
    descSo: 'Dekado dabiici ah oo qoto dheer iyo buuro dhaadheer oo ay ku darsamaan ganacsiga fooxa iyo biyaha badda.',
    towns: ['Berbera', 'Maydh', 'Xiis', 'Bullaxaar'],
    species: ['Yellowfin Tuna', 'Spinner Dolphin', 'Pelagic Rays'],
    conservation: 'Berbera Coastal Habitat Reserve',
    image: '/images/img_03.png',
  },
  {
    id: 'puntland',
    labelEn: 'Puntland',
    labelSo: 'Puntland',
    coords: '11.28° N, 50.50° E',
    regionEn: 'Bari, Guardafui & Nugaal',
    regionSo: 'Bari, Gardafuul & Nugaal',
    titleEn: 'Guardafui Channel & Ras Hafun Tombolo',
    titleSo: 'Geeska Afrika, Xaafuun & Eyl',
    descEn: 'Africa’s easternmost headland. Cold upwelling currents create one of the planet’s richest feeding grounds for whale sharks and pelagic megafauna.',
    descSo: 'Geeska bari ee Afrika. Dhaqdhaqaaqa biyaha qabow wuxuu abuuraa goobta ugu qanisan ee quudashada noolaha waaweyn.',
    towns: ['Ras Hafun', 'Bosaso', 'Bargaal', 'Eyl', 'Qandala'],
    species: ['Whale Shark', 'Hammerhead Shark', 'Green Sea Turtle'],
    conservation: 'Hafun Marine Sanctuary & Eyl Canyon MPA',
    image: '/images/img_01.png',
  },
  {
    id: 'galmudug',
    labelEn: 'Galmudug',
    labelSo: 'Galmudug',
    coords: '5.35° N, 48.52° E',
    regionEn: 'Mudug Coast',
    regionSo: 'Xeebta Mudug',
    titleEn: 'Hobyo & The Central Dunes',
    titleSo: 'Hobyo & Bacaadka Badweynta',
    descEn: 'Historic sultanate maritime port with towering white coastal dunes meeting the open Indian Ocean surf, famed for artisanal spiny lobster fisheries.',
    descSo: 'Dekaddii saldanadda qadiimiga ah iyo duni cad oo ku teedsan badweynta furan, oo caan ku ah kalluunka qaaliga ah.',
    towns: ['Hobyo', 'Harardhere', 'Ceeldheer'],
    species: ['Spiny Lobster', 'Sailfish', 'Sperm Whale'],
    conservation: 'Hobyo Artisanal Co-management Zone',
    image: '/images/img_06.png',
  },
  {
    id: 'hirshabelle',
    labelEn: 'Hirshabelle',
    labelSo: 'Hirshabeelle',
    coords: '2.61° N, 45.78° E',
    regionEn: 'Middle Shabelle Coast',
    regionSo: 'Shabeellaha Dhexe',
    titleEn: 'Warsheikh & Coral Barrier Shores',
    titleSo: 'Warsheekh & Xeebaha Cadale',
    descEn: 'Pristine wide white-sand beaches with offshore reef breakers, historic stone watchtowers, and migratory pelagic bird sanctuaries.',
    descSo: 'Xeebo bacaad cad oo ballaaran, munaarado dhagax ah oo qadiimi ah iyo goobaha ay ku nastaan shimbiraha badda.',
    towns: ['Warsheikh', 'Cadale', 'Mareegh'],
    species: ['Giant Trevally', 'Barracuda', 'Bridled Tern'],
    conservation: 'Warsheikh Fishermen Cooperative',
    image: '/images/img_12.png',
  },
  {
    id: 'benadir',
    labelEn: 'Benadir',
    labelSo: 'Banaadir',
    coords: '2.04° N, 45.34° E',
    regionEn: 'Mogadishu & Jazeera',
    regionSo: 'Muqdisho & Jasiira',
    titleEn: 'The Pearl of the Indian Ocean',
    titleSo: 'Luulkii Badweynta Hindiya',
    descEn: 'A thousand years of Indian Ocean maritime history. Coral shelf tide pools at Jazeera and vibrant Lido shoreline connecting city and sea.',
    descSo: 'Kun sano oo taariikh badmareen ah. Biyaha Jasiira iyo xeebta Liido oo isku xira magaalada iyo badweynta ballaaran.',
    towns: ['Mogadishu', 'Jazeera Beach', 'Lido Beach'],
    species: ['Bottlenose Dolphin', 'Blacktip Reef Shark', 'Parrotfish'],
    conservation: 'Jazeera Marine Education Center',
    image: '/images/img_08.png',
  },
  {
    id: 'jubaland',
    labelEn: 'Jubaland',
    labelSo: 'Jubaland',
    coords: '0.35° S, 42.54° E',
    regionEn: 'Lower Juba & Bajuni',
    regionSo: 'Jubbada Hoose & Baajuun',
    titleEn: 'Bajuni Archipelago & Tropical Barrier',
    titleSo: 'Jasiiradaha Baajuun & Kismaayo',
    descEn: 'Over 50 coral islands stretching south toward Kenya. Pristine mangrove channels, sea grass meadows, and untouched tropical coral reefs.',
    descSo: 'In ka badan 50 jasiiradood oo dhagax-badeed ah, keymo mangrove ah, iyo daaqsimeedka badda ee dugong-ka.',
    towns: ['Kismayo', 'Baraawe', 'Bajuni Islands', 'Kamboni'],
    species: ['Dugong', 'Humpback Whale', 'Manta Ray'],
    conservation: 'Bajuni Marine National Park Proposal',
    image: '/images/img_05.png',
  },
];

export default function EditorialCoastlineMap() {
  const [activeSegmentId, setActiveSegmentId] = useState('puntland');
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const currentSegment = COASTLINE_SEGMENTS.find((s) => s.id === activeSegmentId) || COASTLINE_SEGMENTS[2];

  return (
    <section id="editorial-coastline" className="editorial-coastline" aria-label="Interactive Coastline of Somalia">
      <div className="editorial-coastline__container">
        {/* Header */}
        <div className="editorial-coastline__header">
          <span className="editorial-eyebrow">
            {isSomali ? 'XEEBTA SOOMAALIYEED' : 'THE SOMALI COAST'}
          </span>
          <h2 className="editorial-section-title">
            {isSomali ? (
              <>3,330 KM oo Lagu <span className="editorial-italic">Sahmin Karo</span></>
            ) : (
              <>3,330 KM of Coastline <span className="editorial-italic">to Explore</span></>
            )}
          </h2>
          <p className="editorial-coastline__subtitle">
            {isSomali
              ? 'Guji gobol kasta si aad u hesho xogta xeebaha, noolaha badda, magaalooyinka taariikhiga ah iyo aagagga la dhowro.'
              : 'Traverse Somalia’s coast from north to south. Select any coastal region to inspect reefs, marine species, historic ports and conservation sites.'}
          </p>
        </div>

        {/* Interactive Horizontal Coastline Bar */}
        <div className="editorial-coastline__timeline-track" role="tablist" aria-label="Coastline Regions">
          {COASTLINE_SEGMENTS.map((seg, idx) => {
            const isActive = seg.id === activeSegmentId;
            return (
              <button
                key={seg.id}
                role="tab"
                aria-selected={isActive}
                className={`editorial-coastline__node ${isActive ? 'editorial-coastline__node--active' : ''}`}
                onClick={() => setActiveSegmentId(seg.id)}
              >
                <span className="editorial-coastline__node-dot" />
                <span className="editorial-coastline__node-label">
                  {isSomali ? seg.labelSo : seg.labelEn}
                </span>
                {idx < COASTLINE_SEGMENTS.length - 1 && (
                  <span className="editorial-coastline__connector" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Region Detail Panel */}
        <div className="editorial-coastline__panel">
          <div className="editorial-coastline__panel-media">
            <img
              src={currentSegment.image}
              alt={isSomali ? currentSegment.titleSo : currentSegment.titleEn}
              className="editorial-coastline__panel-img"
            />
            <div className="editorial-coastline__panel-coords">
              <Compass size={13} />
              <span>{currentSegment.coords}</span>
            </div>
          </div>

          <div className="editorial-coastline__panel-info">
            <div className="editorial-coastline__panel-meta">
              <span className="editorial-coastline__panel-region">
                <MapPin size={14} />
                <span>{isSomali ? currentSegment.regionSo : currentSegment.regionEn}</span>
              </span>
            </div>

            <h3 className="editorial-coastline__panel-title">
              {isSomali ? currentSegment.titleSo : currentSegment.titleEn}
            </h3>

            <p className="editorial-coastline__panel-desc">
              {isSomali ? currentSegment.descSo : currentSegment.descEn}
            </p>

            {/* Key Information Chips */}
            <div className="editorial-coastline__attributes">
              <div className="editorial-attribute">
                <span className="editorial-attribute__label">
                  <Anchor size={13} />
                  <span>{isSomali ? 'Magaalooyinka & Dekadaha' : 'Historic Ports & Towns'}</span>
                </span>
                <span className="editorial-attribute__val">
                  {currentSegment.towns.join(' · ')}
                </span>
              </div>

              <div className="editorial-attribute">
                <span className="editorial-attribute__label">
                  <Fish size={13} />
                  <span>{isSomali ? 'Noolaha Badda' : 'Key Marine Species'}</span>
                </span>
                <span className="editorial-attribute__val">
                  {currentSegment.species.join(' · ')}
                </span>
              </div>

              <div className="editorial-attribute">
                <span className="editorial-attribute__label">
                  <Shield size={13} />
                  <span>{isSomali ? 'Dhowridda Badda' : 'Conservation Status'}</span>
                </span>
                <span className="editorial-attribute__val editorial-attribute__val--badge">
                  {currentSegment.conservation}
                </span>
              </div>
            </div>

            <div className="editorial-coastline__panel-actions">
              <Link
                to={localizedPath('/explore-the-coast')}
                className="editorial-btn-dark"
              >
                <span>{isSomali ? 'Sahmi Gobolkan' : 'Explore This Region'}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
