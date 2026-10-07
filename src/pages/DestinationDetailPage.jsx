import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useScrollReveal, useTrackRecentlyViewed } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import { getDestination, listDestinations } from '../lib/contentApi';
import { destinations as staticDestinations } from '../data/destinations';
import VideoEmbed from '../components/shared/VideoEmbed';
import CoverFlowGallery from '../components/gallery/CoverFlowGallery';
import {
  Compass,
  ArrowLeft,
  MapPin,
  Waves,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  ChevronRight,
  Fish,
  Anchor,
} from 'lucide-react';
import '../styles/portalDesignSystem.css';

// Rich, curated coastal dispatch presets for destinations matching reference 3D Cover Flow layout
const DESTINATION_PHOTO_PRESETS = {
  bosaso: [
    {
      title: 'Bosaso Harbor & Seaport',
      subtitle: 'Deep Water Commercial Gateway',
      tag: 'GULF',
      year: '1918',
      image: '/bosaso_harbor_thumb.jpg',
      desc: 'Northern commercial shipping terminal and marine research sanctuary anchoring the Gulf of Aden acoustic array.',
    },
    {
      title: 'Crystal Shoreline & Surf',
      subtitle: 'Puntland White Sand Dunes',
      tag: 'SURF',
      year: 'COAST',
      image: '/bosaso_1005_thumb.jpg',
      desc: 'Sunlit turquoise waters and gentle rolling breakers stretching along the pristine outer beaches of Bosaso.',
    },
    {
      title: 'Bosaso Beach & Turquoise Waters',
      subtitle: 'Calm Gulf of Aden Coast',
      tag: 'BEACH',
      year: 'PELAGIC',
      image: '/bosaso_beach_thumb.jpg',
      desc: 'Clear turquoise shallows where local dhow sailors and coastal communities gather during calm morning sea breezes.',
    },
    {
      title: 'Artisanal Dhow Fleet',
      subtitle: 'Heritage Maritime Culture',
      tag: 'HERITAGE',
      year: 'MARITIME',
      image: '/bosaso_life_thumb.jpg',
      desc: 'Traditional handcrafted wooden dhows setting sail past living fringing reefs into the nutrient-rich Aden channel.',
    },
    {
      title: 'Karkaar Mountain Slopes',
      subtitle: 'Volcanic Ridges Meeting Sea',
      tag: 'CLIFFS',
      year: 'KHOOR',
      image: '/images/img_02.png',
      desc: 'Dramatic coastal topography where jagged limestone and volcanic escarpments plunge directly into deep pelagic waters.',
    },
  ],
  eyl: [
    {
      title: 'Dooxada Eyl Canyon Gorge',
      subtitle: 'Freshwater Springs Meeting Sea',
      tag: 'NUGAAL',
      year: '1918',
      image: '/eyl1.jpg',
      desc: 'Where crystalline freshwater springs cascade through sheer limestone canyon gorges directly into the cobalt swells of the Indian Ocean.',
    },
    {
      title: 'Dervish Historic Fortress',
      subtitle: 'Sayid Fort Coastal Bluff',
      tag: 'HERITAGE',
      year: '1905',
      image: '/eyl2.jpg',
      desc: 'Centuries-old stone battlements guarding the maritime entrance to the natural freshwater canyon of Eyl.',
    },
    {
      title: 'Eyl Fishing Village & Shallows',
      subtitle: 'Artisanal Seafaring Haven',
      tag: 'SANCTUARY',
      year: 'COAST',
      image: '/eyl3.jpg',
      desc: 'Traditional fishing boats sheltered in calm turquoise shallows between limestone bluffs.',
    },
    {
      title: 'Pristine Nugaal Headlands',
      subtitle: 'Indian Ocean Swell Line',
      tag: 'CLIFFS',
      year: 'SWELL',
      image: '/images/img_03.png',
      desc: 'Dramatic headland overlooks offering sweeping views across the untouched Somali Indian Ocean horizon.',
    },
    {
      title: 'Canyon Stream Oasis',
      subtitle: 'Lush Riparian Greenery',
      tag: 'OASIS',
      year: 'ESTUARY',
      image: '/images/image.png',
      desc: 'Lush date palms and emerald pools thriving within the dramatic sheltered microclimate of Eyl gorge.',
    },
  ],
  hafun: [
    {
      title: 'Ras Hafun Continental Tip',
      subtitle: 'Easternmost Point of Africa',
      tag: 'BARI',
      year: '1918',
      image: '/hafun1.jpg',
      desc: 'Africa’s easternmost continental peninsula where sheer sandstone bluffs drop into wild oceanic swells.',
    },
    {
      title: 'Opone Ancient Spice Tombolo',
      subtitle: 'Maritime Spice Route Ruins',
      tag: 'ANCIENT',
      year: 'OPONE',
      image: '/hafun2.jpg',
      desc: 'Natural sand tombolo connecting the massive peninsula to the mainland, host to millennia of Greco-Roman maritime trade.',
    },
    {
      title: 'Hafun Indian Ocean Swells',
      subtitle: 'Deep Water Upwelling Channel',
      tag: 'PELAGIC',
      year: 'SWELLS',
      image: '/hafun3.jpg',
      desc: 'Unbroken oceanic swells generated across thousands of miles of open Indian Ocean breaking on white sand bars.',
    },
    {
      title: 'Ras Hafun Coastal Cliffs',
      subtitle: 'Sheer Limestone Escarpment',
      tag: 'CLIFFS',
      year: 'HORN',
      image: '/images/img_01.png',
      desc: 'Vast sedimentary terraces carved by centuries of southwest monsoon wind patterns.',
    },
    {
      title: 'Hafun Salt Lagoon & Flats',
      subtitle: 'Pristine Tidal Wetlands',
      tag: 'LAGOON',
      year: 'TIDAL',
      image: '/images/img_04.png',
      desc: 'Extensive mineral-rich coastal lagoons supporting migratory pelicans, flamingos, and green sea turtles.',
    },
  ],
  kismayo: [
    {
      title: 'Kismayo Coral Coastline',
      subtitle: 'Jubaland Southern Shore',
      tag: 'JUBALAND',
      year: '1918',
      image: '/kismayo1.png',
      desc: 'Pristine white sandy expanses and turquoise shallows along the fertile southern Jubaland shoreline.',
    },
    {
      title: 'Historic Island Anchorage',
      subtitle: 'Swahili-Somali Port Ruins',
      tag: 'HERITAGE',
      year: 'COAST',
      image: '/kismayo2.png',
      desc: 'Sheltered island channels facilitating peaceful anchorage for traditional deep-water trading dhows.',
    },
    {
      title: 'Juba River Ocean Estuary',
      subtitle: 'Mangrove Marine Nursery',
      tag: 'ESTUARY',
      year: 'MANGROVE',
      image: '/kismayo3.png',
      desc: 'Where the nutrient-laden waters of the Juba River meet the coral reefs of the Indian Ocean.',
    },
    {
      title: 'Kismayo Coastal Barrier Reef',
      subtitle: 'Living Coral Biodiversity',
      tag: 'CORAL',
      year: 'REEF',
      image: '/kismayo4.png',
      desc: 'Vibrant hard and soft coral colonies supporting dolphins, dugongs, and five species of sea turtles.',
    },
    {
      title: 'Southern Mangrove Estuary',
      subtitle: 'Protected Tidal Habitats',
      tag: 'NURSERY',
      year: 'HABITAT',
      image: '/images/img_05.png',
      desc: 'Lush coastal mangrove forests forming natural barriers against ocean storms while nurturing juvenile fish.',
    },
  ],
  'bajuni-islands': [
    {
      title: 'Bajuni Coral Atoll Chain',
      subtitle: 'Untouched Island Constellation',
      tag: 'ATOLL',
      year: '1918',
      image: '/images/img_05.png',
      desc: 'Crystal turquoise lagoons ringed by pristine sandbars, living barrier reefs, and historic stone ruins.',
    },
    {
      title: 'Chula Island Lagoon',
      subtitle: 'Emerald Shallows & Coral Heads',
      tag: 'CHULA',
      year: 'ISLAND',
      image: '/kismayo1.png',
      desc: 'Sheltered atoll waters where green sea turtles graze on expansive seagrass meadows.',
    },
    {
      title: 'Traditional Dhow Navigation',
      subtitle: 'Centuries of Seafaring',
      tag: 'DHOW',
      year: 'SAILING',
      image: '/images/img_02.png',
      desc: 'Artisanal wooden vessels gliding effortlessly between coral passages under white canvas sails.',
    },
    {
      title: 'Mangrove Labyrinth & Channels',
      subtitle: 'Blue Carbon Ecological Haven',
      tag: 'MANGROVE',
      year: 'SANCTUARY',
      image: '/images/img_05.png',
      desc: 'Extensive tidal waterways teeming with juvenile barracuda, snappers, and rare coastal avifauna.',
    },
    {
      title: 'Koyama Island Coral Stone',
      subtitle: 'Historic Pillar Tombs',
      tag: 'HERITAGE',
      year: 'SWAHILI',
      image: '/images/image.png',
      desc: 'Ancient carved coral architecture standing in silent testament to maritime civilizations.',
    },
  ],
  berbera: [
    {
      title: 'Berbera Deep Harbor',
      subtitle: 'Gulf of Aden Strategic Port',
      tag: 'GULF',
      year: '1918',
      image: '/berbera1.png',
      desc: 'Historic maritime port known for calm natural deep-water anchorage and ancient seafaring trade.',
    },
    {
      title: 'Bathela Beach & Shallows',
      subtitle: 'Pristine Turquoise Shore',
      tag: 'BATHELA',
      year: 'BEACH',
      image: '/berbera2.png',
      desc: 'Expansive golden-white sands bathed in calm Gulf of Aden waters, ideal for coastal swimming.',
    },
    {
      title: 'Historic Ottoman Coral Town',
      subtitle: 'Ottoman-Somali Architecture',
      tag: 'HERITAGE',
      year: 'HISTORIC',
      image: '/berbera3.png',
      desc: 'Streets lined with carved wooden shutters, limestone masonry, and centuries of maritime trading history.',
    },
    {
      title: 'Berbera Marine Outpost',
      subtitle: 'Coastal Monitoring Array',
      tag: 'RESEARCH',
      year: 'ARRAY',
      image: '/images/img_02.png',
      desc: 'Marine biology field stations recording seasonal whale shark and dolphin pods.',
    },
    {
      title: 'Sunset Over Gulf Waters',
      subtitle: 'Warm Evening Horizons',
      tag: 'HORIZON',
      year: 'GULF',
      image: '/images/image.png',
      desc: 'Dazzling sunset reflections across the tranquil surface of northern Somali waters.',
    },
  ],
  'liido-beach': [
    {
      title: 'Lido Beach Promenade',
      subtitle: 'Banadir Vibrant Coastline',
      tag: 'BANADIR',
      year: '1918',
      image: '/liido1.png',
      desc: 'Somalia’s iconic seaside boulevard where community life, fresh coastal cuisine, and ocean surf unite.',
    },
    {
      title: 'Indian Ocean Breakers',
      subtitle: 'Warm Turquoise Surf',
      tag: 'SURF',
      year: 'OCEAN',
      image: '/liido2.png',
      desc: 'Gentle oceanic swell lines washing over fine golden sands under bright equatorial sunshine.',
    },
    {
      title: 'Lido Coastal Architecture',
      subtitle: 'Coral Stone & Modern Cafes',
      tag: 'PROMENADE',
      year: 'HORIZON',
      image: '/liido3.png',
      desc: 'Bustling coastal esplanades offering panoramic views across the Mogadishu shoreline.',
    },
    {
      title: 'Evening Surf & Sea Breeze',
      subtitle: 'Gathering Place of Mogadishu',
      tag: 'COMMUNITY',
      year: 'EVENING',
      image: '/liido4.png',
      desc: 'Warm ocean breezes welcoming thousands of families and swimmers at sunset.',
    },
    {
      title: 'Banadir Coral Shallows',
      subtitle: 'Reef Flats Outside Breakers',
      tag: 'REEF',
      year: 'MARINE',
      image: '/images/image.png',
      desc: 'Living reef flats providing natural wave attenuation and sheltering coastal fish.',
    },
  ],
  mogadishu: [
    {
      title: 'Mogadishu Coastal Panorama',
      subtitle: 'Historic Pearl of the Indian Ocean',
      tag: 'BANADIR',
      year: '1918',
      image: '/mogadishu1.png',
      desc: 'Centuries of white coral-stone minarets and coastal promenades overlooking the Indian Ocean.',
    },
    {
      title: 'Old Harbor & Dhow Haven',
      subtitle: 'Ancient Seafaring Anchorage',
      tag: 'PORT',
      year: 'DHOW',
      image: '/mogadishu2.png',
      desc: 'The historic port where merchant fleets from Arabia, Persia, and India traded frankincense and textiles.',
    },
    {
      title: 'Jazeera Turquoise Lagoon',
      subtitle: 'Southern Mogadishu Coral Coves',
      tag: 'JAZEERA',
      year: 'LAGOON',
      image: '/mogadishu3.png',
      desc: 'Calm turquoise coves sheltered by offshore coral outcrops just south of the capital.',
    },
    {
      title: 'Lido Ocean Beachfront',
      subtitle: 'Golden Sands & Surf',
      tag: 'LIDO',
      year: 'SURF',
      image: '/mogadishu_beach.jpg',
      desc: 'Warm turquoise waters and endless sands framing Somalia’s legendary coastline.',
    },
    {
      title: 'Banadir Sea Horizon',
      subtitle: 'Southern Heritage Coast',
      tag: 'HERITAGE',
      year: 'OCEAN',
      image: '/images/image.png',
      desc: 'Where ancient Swahili-Somali coastal architecture meets pristine ocean reefs.',
    },
  ],
  barawe: [
    {
      title: 'Bravanese Coral Architecture',
      subtitle: 'Centuries-Old Coastal Stone City',
      tag: 'BARAWE',
      year: '1918',
      image: '/barawe1.png',
      desc: 'Carved coral-rag houses and winding alleys built by generations of seafaring Bravanese merchants.',
    },
    {
      title: 'Coastal Dunes & White Sands',
      subtitle: 'Towering Southern Sand Formations',
      tag: 'DUNES',
      year: 'COAST',
      image: '/barawe2.png',
      desc: 'Magnificent golden sand dunes rolling down into warm turquoise Indian Ocean breakers.',
    },
    {
      title: 'Artisanal Seaport & Dhow Anchorage',
      subtitle: 'Traditional Southern Seafaring',
      tag: 'MARITIME',
      year: 'PORT',
      image: '/barawe3.png',
      desc: 'Artisanal tuna and kingfish fishermen bringing in their daily catch on historic wooden dhows.',
    },
    {
      title: 'Barawe Coral Shallows',
      subtitle: 'Living Barrier Reef Line',
      tag: 'CORAL',
      year: 'REEF',
      image: '/images/img_05.png',
      desc: 'Protected coral lagoons shielding the ancient city from heavy open-ocean swells.',
    },
    {
      title: 'Historic Coastal Watchtowers',
      subtitle: 'Maritime Defense Heritage',
      tag: 'HERITAGE',
      year: 'WATCHTOWER',
      image: '/images/image.png',
      desc: 'Ancient lookout towers situated on promontories along the southern Somali coast.',
    },
  ],
  bargaal: [
    {
      title: 'Bargaal Date Palm Oasis',
      subtitle: 'Coastal Spring Estuary',
      tag: 'BARGAAL',
      year: '1918',
      image: '/bargaal_1.jpg',
      desc: 'Vast groves of freshwater-fed date palms meeting the turquoise shores of the northern Guardafui coast.',
    },
    {
      title: 'Coral Cliff Ocean Anchorage',
      subtitle: 'Deep Water Seafaring Haven',
      tag: 'CLIFFS',
      year: 'ANCHOR',
      image: '/bargaal_2.jpg',
      desc: 'Sheltered oceanic anchorages historically used by frankincense trade fleets under the Bari Sultanate.',
    },
    {
      title: 'Northern Guardafui Coastline',
      subtitle: 'Where Gulf Meets Ocean',
      tag: 'BARI',
      year: 'COAST',
      image: '/bargaal_main.jpg',
      desc: 'Wild, windswept promontories where nutrient-rich pelagic currents nourish marine life.',
    },
    {
      title: 'Guardafui Channel Swells',
      subtitle: 'Deep Pelagic Marine Highway',
      tag: 'PELAGIC',
      year: 'CHANNEL',
      image: '/images/img_04.png',
      desc: 'Powerful ocean currents linking the Horn of Africa to the Arabian Sea.',
    },
    {
      title: 'Coastal Dhow Fishing Haven',
      subtitle: 'Traditional Artisanal Fishery',
      tag: 'HERITAGE',
      year: 'DHOW',
      image: '/images/img_01.png',
      desc: 'Centuries of sustainable artisanal tuna fishing practiced along pristine limestone shores.',
    },
  ],
  qandala: [
    {
      title: 'Qandala Coastal Gorge',
      subtitle: 'Limestone Canyon Meeting Gulf',
      tag: 'QANDALA',
      year: '1918',
      image: '/qandala_1.jpg',
      desc: 'Stunning rocky fjord-like gorge where freshwater runoffs meet the calm turquoise waters of the Gulf of Aden.',
    },
    {
      title: 'Historic Frankincense Port',
      subtitle: 'Ancient Spice & Resin Gateway',
      tag: 'INCENSE',
      year: 'HERITAGE',
      image: '/qandala_2.jpg',
      desc: 'Natural harbor historically world-renowned for harvesting and exporting the finest Maydi frankincense.',
    },
    {
      title: 'Karkaar Sea Escarpment',
      subtitle: 'Towering Mountain Headlands',
      tag: 'KARKAAR',
      year: 'CLIFFS',
      image: '/qandala_main.jpg',
      desc: 'Where towering limestone escarpments plunge directly into cobalt waters rich in coral biodiversity.',
    },
    {
      title: 'Gulf of Aden Deep Shallows',
      subtitle: 'Artisanal Seafaring Haven',
      tag: 'GULF',
      year: 'SHALLOWS',
      image: '/images/img_02.png',
      desc: 'Pristine coastal lagoons with crystal clarity, ideal for marine research and coastal observation.',
    },
    {
      title: 'Coastal Mountain Oasis',
      subtitle: 'Sheltered Date Groves',
      tag: 'OASIS',
      year: 'NATURE',
      image: '/images/img_04.png',
      desc: 'Emerald palm oases nestled directly at the foot of dramatic coastal canyons.',
    },
  ],
  zeila: [
    {
      title: 'Sa’ad ad-Din Coral Islands',
      subtitle: 'Ancient Trading Archipelago',
      tag: 'ZEILA',
      year: '1918',
      image: '/zeila1.png',
      desc: 'Untouched island constellation boasting shallow turquoise reefs, mangrove channels, and pelagic bird colonies.',
    },
    {
      title: 'Ancient Port & Mosque Ruins',
      subtitle: 'First-Century Seafaring Crossroads',
      tag: 'HERITAGE',
      year: 'ANCIENT',
      image: '/zeila2.png',
      desc: 'Historic coral-stone ruins dating back to the medieval Adal Sultanate and ancient incense trade.',
    },
    {
      title: 'Emerald Marine Flats',
      subtitle: 'Tidal Lagoon & Seagrass',
      tag: 'LAGOON',
      year: 'MARINE',
      image: '/zeila3.png',
      desc: 'Vast shallow sandbars and crystalline waters sheltering feeding dugongs and sea turtles.',
    },
    {
      title: 'Zeila Coastal Mangroves',
      subtitle: 'Tidal Nursery Channels',
      tag: 'MANGROVE',
      year: 'ECOLOGY',
      image: '/images/img_07.png',
      desc: 'Dense coastal mangrove forests stabilizing the shoreline and providing sanctuary for marine wildlife.',
    },
    {
      title: 'Seafaring Dhow Haven',
      subtitle: 'Red Sea & Gulf Convergence',
      tag: 'RED SEA',
      year: 'PORT',
      image: '/images/img_02.png',
      desc: 'Calm sheltered waters where traditional wooden sailing dhows rest during low tide.',
    },
  ],
  hobyo: [
    {
      title: 'Hobyo Sandy Headlands',
      subtitle: 'Galmudug Central Coastline',
      tag: 'HOBYO',
      year: '1918',
      image: '/hobyo1.png',
      desc: 'Sweeping coastal headlands and pristine turquoise surf along Somalia’s central Indian Ocean littoral.',
    },
    {
      title: 'Galmudug Marine Coast',
      subtitle: 'Unbroken Oceanic Breakers',
      tag: 'SURF',
      year: 'COAST',
      image: '/hobyo2.png',
      desc: 'Endless rolling waves and golden sand dunes untouched by modern development.',
    },
    {
      title: 'Historic Sultanate Harbor',
      subtitle: 'Hobyo Sultanate Seaport',
      tag: 'HERITAGE',
      year: 'SULTANATE',
      image: '/hobyo3.png',
      desc: 'Historic port that served as the commercial and cultural capital of the 19th-century Hobyo Sultanate.',
    },
    {
      title: 'Open Ocean Wave Energy',
      subtitle: 'Deep Marine Horizons',
      tag: 'OCEAN',
      year: 'PELAGIC',
      image: '/images/img_03.png',
      desc: 'Vast uninterrupted swells sweeping across thousands of miles of cobalt Indian Ocean waters.',
    },
    {
      title: 'Central Coast Dunes',
      subtitle: 'Coastal Wilderness Dunes',
      tag: 'DUNES',
      year: 'WILDERNESS',
      image: '/images/image.png',
      desc: 'Pristine wind-sculpted sand dunes meeting clear turquoise coastal waters.',
    },
  ],
};

function getDestinationGalleryItems(dest, isSomali) {
  if (!dest) return [];
  const slug = dest.slug || '';
  const presets = DESTINATION_PHOTO_PRESETS[slug];

  if (presets && presets.length >= 5) {
    return presets.map((p, idx) => ({
      id: `${slug}-photo-${idx}`,
      title: p.title,
      subtitle: p.subtitle,
      tag: p.tag,
      year: p.year || '1918',
      desc: p.desc,
      image: p.image,
      avatar: dest.heroImage || p.image,
      author: dest.name,
      authorMeta: `${dest.region || 'Somali Coastline'} • ${formatCoordinates(dest.coordinates) || '3,330 KM Sanctuary'}`,
      link: `/explore-the-coast/${slug}`,
    }));
  }

  // Dynamic generator for any other destination with gallery/galleryImages
  const rawList = [
    ...(dest.gallery || []),
    ...(dest.galleryImages || []),
    dest.heroImage,
    '/images/img_02.png',
    '/images/img_01.png',
    '/images/img_05.png',
    '/images/image.png',
  ].filter(Boolean);

  const uniqueImages = Array.from(new Set(rawList));
  while (uniqueImages.length < 5) {
    uniqueImages.push('/images/img_02.png', '/images/img_01.png', '/images/img_05.png');
  }

  const aspects = [
    { title: isSomali ? 'Xeebta & Biyaha Nadiifka ah' : 'Shoreline & Pristine Waters', sub: 'Coastal Shallows & Coral Reefs', tag: 'SHORELINE' },
    { title: isSomali ? 'Bilicda Badda & Dhul-badeedka' : 'Coastal Panorama & Marine Life', sub: 'Living Marine Sanctuary', tag: 'PANORAMA' },
    { title: isSomali ? 'Biyaha Qotada Dheer ee Badda' : 'Deep Marine Channel & Pelagic Waters', sub: 'Pelagic Upwelling Channel', tag: 'PELAGIC' },
    { title: isSomali ? 'Doonyaha Dhaqanka & Nolosha Xeebta' : 'Heritage Maritime Seafaring Fleet', sub: 'Traditional Dhow Vessels', tag: 'MARITIME' },
    { title: isSomali ? 'Cirifka & Muuqaalka Fog ee Badda' : 'Oceanic Horizon & Sand Dunes', sub: 'Untouched Coastal Wilderness', tag: 'HORIZON' },
  ];

  return uniqueImages.slice(0, 5).map((img, idx) => ({
    id: `${slug}-gen-${idx}`,
    title: `${dest.name} ${aspects[idx % aspects.length].title}`,
    subtitle: aspects[idx % aspects.length].sub,
    tag: dest.region || aspects[idx % aspects.length].tag,
    year: '1918',
    desc: dest.shortDescription || dest.description || `High-definition field photography captured across ${dest.name} and surrounding coastal waters.`,
    image: img,
    avatar: dest.heroImage || img,
    author: dest.name,
    authorMeta: `${dest.region || 'Somali Coastline'} • ${formatCoordinates(dest.coordinates) || '3,330 KM Sanctuary'}`,
    link: `/explore-the-coast/${slug}`,
  }));
}

function formatCoordinates(coords) {
  if (!coords) return null;
  if (typeof coords === 'string') return coords;
  if (typeof coords === 'object') {
    if (coords.lat != null && coords.lng != null) {
      const latVal = Number(coords.lat);
      const lngVal = Number(coords.lng);
      const latDir = latVal >= 0 ? 'N' : 'S';
      const lngDir = lngVal >= 0 ? 'E' : 'W';
      return `${Math.abs(latVal).toFixed(2)}° ${latDir}, ${Math.abs(lngVal).toFixed(2)}° ${lngDir}`;
    }
    if (Array.isArray(coords)) {
      return coords.join(', ');
    }
  }
  return String(coords);
}

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [destination, setDestination] = useState(null);
  const [allDestinations, setAllDestinations] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useScrollReveal();

  useTrackRecentlyViewed(
    destination && {
      type: 'destination',
      slug: destination.slug,
      title: destination.name,
      subtitle: destination.region,
      image: destination.heroImage,
      path: `/explore-the-coast/${destination.slug}`,
    }
  );

  useEffect(() => {
    let cancelled = false;
    setDestination(null);
    setNotFound(false);

    getDestination(slug, language)
      .then((d) => {
        if (cancelled) return;
        const bridge = staticDestinations.find((s) => s.slug === slug) || {};
        setDestination({
          ...d,
          marineSpecies: bridge.marineSpecies || [],
          researchProjects: bridge.researchProjects || [],
          experiences: bridge.experiences || [],
          galleryImages: bridge.galleryImages || [d.heroImage, '/images/img_02.png', '/images/image.png'],
        });
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });

    listDestinations({ lang: language })
      .then((d) => {
        if (!cancelled) setAllDestinations(d);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  if (notFound) {
    return (
      <div className="portal-page">
        <main className="portal-card-section" style={{ minHeight: '60vh', textAlign: 'center', marginTop: '40px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Compass size={48} color="#0ea5e9" />
            <h1 className="portal-section-title">Destination Not Found</h1>
            <p className="portal-section-subtitle">
              The coastal destination you are looking for has not been charted yet. Explore our full catalog of Somali coastal destinations.
            </p>
            <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary" style={{ marginTop: '16px' }}>
              <ArrowLeft size={16} />
              <span>Return to Coastline Explorer</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!destination) {
    return <div className="portal-page" style={{ minHeight: '70vh' }} />;
  }

  const related = allDestinations.filter((d) => d.slug !== destination.slug).slice(0, 3);

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero portal-hero--destination" aria-label={`Destination: ${destination.name}`}>
        <div className="portal-hero__inner">
          <img
            src={destination.heroImage || '/images/image.png'}
            alt={destination.name}
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <Link to={localizedPath('/explore-the-coast')} className="portal-hero__badge" style={{ textDecoration: 'none' }}>
              <ArrowLeft size={13} />
              <span>{isSomali ? 'Ku Noqo Xeebaha' : 'Explore Somalia’s Coast'}</span>
            </Link>

            <h1 className="portal-hero__title">{destination.name}</h1>

            <p className="portal-hero__subtitle">{destination.description || destination.tagline}</p>

            <div className="portal-hero__tags">
              <span className="portal-hero__tag-btn portal-hero__tag-btn--active">
                <MapPin size={13} style={{ marginRight: 6 }} /> {destination.region || 'Puntland'}
              </span>
              {destination.coordinates && (
                <span className="portal-hero__tag-btn">
                  <Compass size={13} style={{ marginRight: 6 }} /> {formatCoordinates(destination.coordinates)}
                </span>
              )}
              {destination.destinationType && (
                <span className="portal-hero__tag-btn">
                  <Anchor size={13} style={{ marginRight: 6 }} /> {destination.destinationType}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2-Column About & Interactive Details */}
      <section className="portal-card-section" aria-label="Destination Overview">
        <div className="portal-about-grid">
          <div className="portal-about__narrative">
            <span className="portal-section-tag">
              {isSomali ? 'KU SAABSAN DEEGAANKA' : 'DESTINATION SPOTLIGHT'}
            </span>
            <h2 className="portal-section-title">
              {isSomali ? `Quruxda & Taariikhda ${destination.name}` : `The Natural Beauty of ${destination.name}`}
            </h2>
            <p className="portal-about__body">
              {destination.overview ||
                destination.description ||
                `Discover ${destination.name}, one of Somalia’s premier coastal destinations offering turquoise waters, pristine barrier reefs, and vibrant seafaring culture.`}
            </p>

            <div className="portal-about__features">
              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Anchor size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Xarunta Badda & Ganacsiga' : 'Maritime Port & Heritage'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Marin caalami ah oo kumanaan sano ahaa xarun ganacsi oo u dhaxeysa Afrika iyo dunida.'
                      : 'An ancient seafaring harbor connecting the Horn of Africa across the Indian Ocean and Gulf of Aden.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <Waves size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Biyo Nadiif Ah & Shacaabka' : 'Pristine Turquoise Waters & Corals'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Dhul dabiici ah oo ku habboon dabaasha, doonyaha, iyo daawashada noolaha badda.'
                      : 'Crystal clear visibility, healthy coral gardens, and safe seasonal ocean currents.'}
                  </p>
                </div>
              </div>

              <div className="portal-about__feature-item">
                <div className="portal-about__feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="portal-about__feature-text">
                  <h3 className="portal-about__feature-title">
                    {isSomali ? 'Dhowridda Noolaha Badda' : 'Marine Protected Area Sanctuary'}
                  </h3>
                  <p className="portal-about__feature-desc">
                    {isSomali
                      ? 'Libaax-badeedyo, qoolleyda badda, iyo kalluunka oo ay bulshadu si gaar ah u dhowrto.'
                      : 'Protected coastal sanctuaries safeguarding migratory species, marine turtles, and reef habitats.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map card highlighting this destination */}
          <div className="portal-about__map-card">
            <img
              src={destination.heroImage || '/images/image.png'}
              alt={`${destination.name} coastline view`}
              className="portal-about__map-img"
            />
            <div className="portal-about__map-badge">
              <MapPin size={14} color="#0ea5e9" />
              <span>{destination.region || 'Somalia Coast'}</span>
            </div>

            <div
              className="portal-about__map-pin"
              style={{ top: '40%', left: '30%', background: '#0284c7', color: '#ffffff' }}
            >
              <span>{destination.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Dispatches 3D Cover Flow Gallery (Bosaso & All Regions) */}
      <CoverFlowGallery
        items={getDestinationGalleryItems(destination, isSomali)}
        eyebrow={isSomali ? 'MUUQAALLADA XEEBTA' : 'VISUAL DISPATCHES'}
        title={isSomali ? `Sawirrada ${destination.name}` : `Photo Gallery: ${destination.name}`}
        subtitle={isSomali
          ? `Sawirro toos ah oo muujinaya biyaha nadiifka ah iyo dabeecadda ${destination.name}.`
          : `Authentic coastal photography captured across ${destination.name} and surrounding marine sanctuaries.`}
        whiteBackground={true}
      />

      {/* 4. Video Feature if present */}
      {(destination.videoUrl || (destination.videos && destination.videos.length > 0)) && (
        <section className="portal-card-section" aria-label="Destination Video Showcase">
          <div className="portal-section-header">
            <span className="portal-section-tag">
              {isSomali ? 'MUUQAALKA TOOSKA AH' : 'CINEMATIC VIDEO'}
            </span>
            <h2 className="portal-section-title">
              {destination.videoTitle || (isSomali ? `Daawo ${destination.name}` : `Experience ${destination.name}`)}
            </h2>
            <p className="portal-section-subtitle">
              {destination.videoDescription || 'High-definition 4K coastal documentary footage.'}
            </p>
          </div>

          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <VideoEmbed
              url={destination.videoUrl}
              thumbnail={destination.videoThumbnail}
              videos={destination.videos}
              title={destination.name}
              videoTitle={destination.videoTitle}
              videoDescription={destination.videoDescription}
              videoSource={destination.videoSource}
            />
          </div>
        </section>
      )}

      {/* 5. Marine Species at this Destination */}
      {destination.marineSpecies && destination.marineSpecies.length > 0 && (
        <section className="portal-card-section portal-card-section--tint" aria-label="Connected Marine Life">
          <div className="portal-section-header">
            <span className="portal-section-tag">
              {isSomali ? 'NOLOSHA BADDA' : 'KEYSTONE MARINE LIFE'}
            </span>
            <h2 className="portal-section-title">
              {isSomali ? `Noolaha Ku Nool ${destination.name}` : `Marine Life of ${destination.name}`}
            </h2>
            <p className="portal-section-subtitle">
              {isSomali
                ? 'Noocyada badda ee ugu caansan ee laga helo xeebahan.'
                : `Endemic species and migratory marine megafauna documented around ${destination.name}.`}
            </p>
          </div>

          <div className="portal-attractions-grid">
            {destination.marineSpecies.slice(0, 3).map((sp, i) => (
              <article key={i} className="portal-attraction-card">
                <div className="portal-attraction-card__media">
                  <img src={sp.image || '/images/img_11.png'} alt={sp.name} className="portal-attraction-card__img" />
                  <span className="portal-highlight-card__badge" style={{ position: 'absolute', top: 12, left: 12 }}>
                    {sp.status || 'PROTECTED'}
                  </span>
                </div>
                <div className="portal-attraction-card__content">
                  <span className="portal-attraction-card__region">{sp.somaliName || 'Noolaha Badda'}</span>
                  <h3 className="portal-attraction-card__title">{sp.name}</h3>
                  <p className="portal-attraction-card__desc">{sp.description || sp.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 6. Related Coastal Destinations */}
      {related.length > 0 && (
        <section className="portal-card-section" aria-label="Related Coastal Destinations">
          <div className="portal-section-header">
            <span className="portal-section-tag">
              {isSomali ? 'DEEGAANNO KALE' : 'EXPLORE MORE HAVENS'}
            </span>
            <h2 className="portal-section-title">
              {isSomali ? 'Goobaha Kale Ee Xeebaha' : 'More Coastal Havens to Explore'}
            </h2>
            <p className="portal-section-subtitle">
              {isSomali
                ? 'Sii wad safarkaaga xeebaha Soomaaliya ee 3,330 km.'
                : 'Continue your voyage across Africa’s longest and most breathtaking coastline.'}
            </p>
          </div>

          <div className="portal-highlights-grid">
            {related.map((rel, idx) => (
              <article key={idx} className="portal-highlight-card">
                <div className="portal-highlight-card__img-wrap">
                  <img src={rel.heroImage || '/images/image.png'} alt={rel.name} className="portal-highlight-card__img" />
                  <span className="portal-highlight-card__badge">{rel.region}</span>
                </div>
                <div className="portal-highlight-card__body">
                  <h3 className="portal-highlight-card__title">{rel.name}</h3>
                  <p className="portal-highlight-card__excerpt">{rel.tagline || rel.description}</p>
                  <Link to={localizedPath(`/explore-the-coast/${rel.slug}`)} className="portal-highlight-card__link">
                    <span>{isSomali ? 'Sahami Deegaanka' : 'Explore Haven'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 7. Panoramic Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Destination Detail CTA">
        <div className="portal-cta__inner">
          <img
            src="/images/image.png"
            alt="Warm sunset over Somalia coastline"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? `Diyaar Ma U Tahay Booqashada ${destination.name}?`
                : `Ready to Explore ${destination.name}?`}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'La kulan dabeecadda nadiifka ah, biyo buluugga ah, iyo taariikhda qaniga ah ee badda Soomaaliya.'
                : 'Experience untouched turquoise seas, ancient seafaring villages, and 3,330 km of living coast.'}
            </p>
            <Link to={localizedPath('/explore-the-coast')} className="portal-btn-primary">
              <span>{isSomali ? 'Eeg Dhammaan Xeebaha' : 'View All Coastal Destinations'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
