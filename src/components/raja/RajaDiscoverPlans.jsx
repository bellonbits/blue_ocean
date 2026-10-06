import { useState } from 'react';
import { Check, Compass, Star, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaDiscoverPlans() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const [activeRegion, setActiveRegion] = useState('puntland');

  const regionTabs = [
    { id: 'puntland', label: isSomali ? 'Xeebta Puntland' : 'Puntland Coast' },
    { id: 'jubaland', label: isSomali ? 'Jubaland & Baajuun' : 'Jubaland & Bajuni' },
    { id: 'central', label: isSomali ? 'Banaadir & Bartamaha' : 'Banadir & Central' },
    { id: 'aden', label: isSomali ? 'Gacanka Cadmeed' : 'Gulf of Aden' },
  ];

  const regionalDestinations = {
    puntland: [
      {
        id: 'dest-bosaso',
        title: isSomali ? 'Boosaaso: Albaabka Gacanka Cadmeed' : 'Bosaso: Gulf of Aden Seaport & Shelf',
        image: '/bosaso1.jpg',
        slug: 'bosaso',
        zone: isSomali ? 'Gobolka Bari' : 'Bari Region, Puntland',
        rating: '4.9',
        features: [
          isSomali ? 'Marin muhiim u ah noocyada tuna-da iyo whale shark-ga' : 'Pelagic migration corridor for yellowfin tuna & whale sharks',
          isSomali ? 'Buuraha Karkaar oo badda ku darsama' : 'Rugged Karkaar mountain drop-offs into deep ocean',
          isSomali ? 'Doonyaha dhowka ee taariikhiga ah' : 'Centuries-old wooden dhow boatbuilding tradition',
        ],
      },
      {
        id: 'dest-hafun',
        title: isSomali ? 'Raas Xaafuun: Cirifka Bariga Afrika' : 'Ras Hafun: Africa’s Easternmost Horn',
        image: '/hafun1.jpg',
        slug: 'hafun',
        zone: isSomali ? 'Gacanka Xaafuun' : 'Hafun Peninsula',
        rating: '5.0',
        features: [
          isSomali ? 'Mowjadaha xooggan ee Badweynta Hindiya' : 'Dramatic sandstone cliffs facing open Indian Ocean',
          isSomali ? 'Dekeddii qadiimiga ahayd ee Opone' : 'Ancient maritime trading port of Opone',
          isSomali ? 'Deegaanka dabiiciga ah ee qoolleyda badda' : 'Key nesting beaches for endangered marine turtles',
        ],
      },
      {
        id: 'dest-eyl',
        title: isSomali ? 'Dooxada Eyl: Badda & Buuraha Nugaal' : 'Eyl: Canyon Gorge & Historic Bay',
        image: '/eyl1.jpg',
        slug: 'eyl',
        zone: isSomali ? 'Gobolka Nugaal' : 'Nugaal Estuary',
        rating: '4.9',
        features: [
          isSomali ? 'Dooxo cajiib ah oo biyo macaan iyo badda isugu yimaadaan' : 'Stunning freshwater canyon meeting turquoise ocean surf',
          isSomali ? 'Qalcado taariikhi ah oo xeebta ku yaal' : 'Historic stone fortress overlooking protected natural bay',
          isSomali ? 'Reef-yo hodan ku ah aargoosatada iyo kalluunka' : 'Productive lobster reef flats and humpback whale corridor',
        ],
      },
    ],
    jubaland: [
      {
        id: 'dest-bajuni',
        title: isSomali ? 'Jasiiradaha Baajuun: Jannada Biyaha Buluugga' : 'Bajuni Archipelago: Turquoise Atolls',
        image: '/kismayo1.png',
        slug: 'bajuni-islands',
        zone: isSomali ? 'Jubada Hoose' : 'Lower Juba, Jubaland',
        rating: '5.0',
        features: [
          isSomali ? 'Jasiirado dabiici ah oo leh coral reef-yo caafimaad qaba' : 'Pristine barrier coral reefs and sheltered lagoons',
          isSomali ? 'Dugong & qoolleyda badda oo lagu daryeelo' : 'Critical habitat for rare dugongs and green turtles',
          isSomali ? 'Kaymaha mangroves ee badbaadiya xeebaha' : 'Expansive mangrove channels and white sand spits',
        ],
      },
      {
        id: 'dest-kismayo',
        title: isSomali ? 'Xeebta Kismaayo & Gobweyn' : 'Kismayo & Gobweyn River Mouth',
        image: '/kismayo2.png',
        slug: 'kismayo',
        zone: isSomali ? 'Wabiga Jubba & Badda' : 'Juba River Estuary',
        rating: '4.8',
        features: [
          isSomali ? 'Meesha wabiga Jubba uu kaga darsamo Badweynta Hindiya' : 'Where the Juba river meets the azure Indian Ocean',
          isSomali ? 'Nolosha hodanka ah ee shimbiraha biyaha' : 'Rich coastal avifauna and fish breeding nurseries',
          isSomali ? 'Dekedda ganacsiga ee koonfurta Soomaaliya' : 'Historic deep-water maritime trade hub',
        ],
      },
      {
        id: 'dest-kamboni',
        title: isSomali ? 'Raas Kamboni: Xadka Koonfureed' : 'Ras Kamboni: Southern Marine Sanctuary',
        image: '/kamboni1.png',
        slug: 'kamboni',
        zone: isSomali ? 'Koonfurta Fog' : 'Southern Border Coast',
        rating: '4.9',
        features: [
          isSomali ? 'Xeebo dabiici ah oo aan la taaban' : 'Untouched coral gardens and sea meadows',
          isSomali ? 'Kormeerka noolaha badda ee xuduudda' : 'Cross-border marine conservation initiatives',
          isSomali ? 'Mowjado dabiici ah oo caan ku ah nolosha badda' : 'Abundant pelagic game fish and dolphin pods',
        ],
      },
    ],
    central: [
      {
        id: 'dest-liido',
        title: isSomali ? 'Xeebaha Liido & Jasiira ee Banaadir' : 'Lido & Jazeera: Banadir Oceanfront',
        image: '/liido1.png',
        slug: 'liido-jazeera',
        zone: isSomali ? 'Muqdisho & Banaadir' : 'Mogadishu Coastal Zone',
        rating: '4.9',
        features: [
          isSomali ? 'Xeebta caanka ah ee Liido oo leh mowjado buluug ah' : 'Iconic white sandy beaches and breaking Indian Ocean swell',
          isSomali ? 'Lagoon-ka deggan ee Jasiira iyo reef-ka dabiiciga ah' : 'Calm shallow lagoons and limestone reef outcrops at Jazeera',
          isSomali ? 'Nolosha firfircoon ee bulshada xeebta ku nool' : 'Vibrant coastal culture, artisan fishermen, and youth sports',
        ],
      },
      {
        id: 'dest-barawe',
        title: isSomali ? 'Baraawe: Magaalo-Xeebedda Qadiimiga ah' : 'Barawe: Ancient Swahili-Somali Port',
        image: '/barawe1.png',
        slug: 'barawe',
        zone: isSomali ? 'Shabeellaha Hoose' : 'Lower Shabelle Coast',
        rating: '4.8',
        features: [
          isSomali ? 'Dhismaha qadiimiga ah ee dhagax-dhagaxda badda' : 'Distinctive coral-stone architecture and historic towers',
          isSomali ? 'Kalluumeysiga dabiiciga ah ee dhowka' : 'Heritage sailing communities and artisanal fisheries',
          isSomali ? 'Mowjadaha Badweynta Hindiya ee xawliga ku socda' : 'Open ocean breakers with expansive coastal dunes',
        ],
      },
      {
        id: 'dest-hobyo',
        title: isSomali ? 'Hobyo: Dekeddii Saldanadda Qadiimiga' : 'Hobyo: Sultanate Seaport & Central Sands',
        image: '/hobyo1.png',
        slug: 'hobyo',
        zone: isSomali ? 'Gobolka Mudug' : 'Mudug Central Coast',
        rating: '4.8',
        features: [
          isSomali ? 'Taariikh facweyn oo ku saabsan ganacsiga badda' : 'Rich historic anchorages linking the Horn to global maritime routes',
          isSomali ? 'Dabaylaha xooggan ee Somali Current' : 'Powerful seasonal Somali Current upwelling zone',
          isSomali ? 'Xeeb dabiici ah oo fidsan' : 'Expansive wild beaches and marine monitoring projects',
        ],
      },
    ],
    aden: [
      {
        id: 'dest-berbera',
        title: isSomali ? 'Berbera: Dekedda Gacanka Cadmeed' : 'Berbera: Historic Coral Gateway',
        image: '/berbera1.png',
        slug: 'berbera',
        zone: isSomali ? 'Gacanka Cadmeed' : 'Gulf of Aden Coast',
        rating: '4.9',
        features: [
          isSomali ? 'Biyo deggan iyo reef-yo hodan ku ah noolaha' : 'Sheltered deep-water harbor with extensive coral reef fringes',
          isSomali ? 'Taariikh dheer oo dhismo Ottoman iyo coral ah' : 'Heritage coral-stone architecture and ancient maritime routes',
          isSomali ? 'Mashaariicda ilaalinta noolaha badda' : 'Coral restoration and marine biodiversity research stations',
        ],
      },
      {
        id: 'dest-zeila',
        title: isSomali ? 'Saylac & Jasiiradda Sa’ad ad-Din' : 'Zeila & Sa’ad ad-Din Archipelago',
        image: '/zeila1.png',
        slug: 'zeila',
        zone: isSomali ? 'Gobolka Awdal' : 'Awdal Island Archipelago',
        rating: '5.0',
        features: [
          isSomali ? 'Jasiirado coral ah oo ku teedsan xadka waqooyi' : 'Pristine coral island archipelago with mangrove shallows',
          isSomali ? 'Magaaladii qadiimiga ahayd ee ganacsiga geeska' : 'Centuries-old Islamic and maritime heritage ruins',
          isSomali ? 'Biyo saafi ah oo ku habboon cilmibaarista badda' : 'Crystal turquoise flats ideal for scientific marine surveys',
        ],
      },
    ],
  };

  const currentItems = regionalDestinations[activeRegion] || regionalDestinations.puntland;

  return (
    <section className="raja-discover-section" id="discover-destination" aria-label={isSomali ? 'Sahami Gobollada Xeebaha' : "Discover Somalia's Marine Regions"}>
      {/* Header */}
      <div className="raja-discover__header">
        <div>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0284c7',
              display: 'block',
              marginBottom: 4,
            }}
          >
            {isSomali ? 'Gobollada Badda Soomaaliya' : 'Somalia Marine Regions'}
          </span>
          <h2 className="raja-discover__title">
            {isSomali ? 'Sahami Gobollada Badda Soomaaliya' : "Discover Somalia's Marine Regions"}
          </h2>
          <p className="raja-discover__subtext">
            {isSomali
              ? 'Baro gobollada kala duwan ee xeebta 3,330 km, noolaha ku nool, iyo mashaariicda cilmibaarista ee Blue Heaven.'
              : "Explore the distinctive marine zones along Somalia's 3,330 km coastline, from coral atolls to deep pelagic trenches."}
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="raja-plan-tabs" role="tablist">
          {regionTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`raja-plan-tab ${activeRegion === tab.id ? 'raja-plan-tab--active' : ''}`}
              onClick={() => setActiveRegion(tab.id)}
              role="tab"
              aria-selected={activeRegion === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Cards Grid - No Pricing */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--color-surface, #f8fafc)',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="raja-card"
          >
            <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <MapPin size={11} color="#38bdf8" />
                <span>{item.zone}</span>
              </span>
            </div>

            <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f59e0b', fontSize: '0.84rem', fontWeight: 700 }}>
                  <Star size={14} fill="currentColor" />
                  <span>{item.rating}</span>
                </div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0284c7',
                    background: 'rgba(2, 132, 199, 0.1)',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  {isSomali ? 'Cilmibaaris' : 'Research Site'}
                </span>
              </div>

              <h4 style={{ fontFamily: "var(--font-editorial, 'Playfair Display', serif)", fontSize: '1.25rem', margin: 0, lineHeight: 1.3, color: '#0f172a' }}>
                {item.title}
              </h4>

              <ul style={{ listStyle: 'none', padding: 0, margin: '6px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {item.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                    <Check size={14} color="#0284c7" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '11px 18px',
                  borderRadius: 9999,
                  background: '#090d16',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onClick={() => navigate(`/${language}/explore-the-coast/${item.slug}`)}
              >
                <span>{isSomali ? 'Sahami Goobtan' : 'Explore Destination'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
