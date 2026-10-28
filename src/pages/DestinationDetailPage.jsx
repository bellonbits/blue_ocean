import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useScrollReveal, useTrackRecentlyViewed } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import { getDestination, listDestinations } from '../lib/contentApi';
import { destinations as staticDestinations } from '../data/destinations';
import VideoEmbed from '../components/shared/VideoEmbed';
import CoverFlowGallery from '../components/gallery/CoverFlowGallery';
import PageHero from '../components/editorial/PageHero';
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
// Every destination features 5 distinct, authentic field photographs of the location
const DESTINATION_PHOTO_PRESETS = {
  bosaso: [
    {
      title: 'Bosaso Harbor & Seaport',
      subtitle: 'Deep Water Commercial Gateway',
      tag: 'GULF',
      year: '1918',
      image: '/bosaso_harbor_thumb.webp',
      desc: 'Northern commercial shipping terminal and marine research sanctuary anchoring the Gulf of Aden acoustic array.',
    },
    {
      title: 'Crystal Shoreline & Surf',
      subtitle: 'Puntland White Sand Dunes',
      tag: 'SURF',
      year: 'COAST',
      image: '/bosaso_1005_thumb.webp',
      desc: 'Sunlit turquoise waters and gentle rolling breakers stretching along the pristine outer beaches of Bosaso.',
    },
    {
      title: 'Bosaso Beach & Turquoise Waters',
      subtitle: 'Calm Gulf of Aden Coast',
      tag: 'BEACH',
      year: 'PELAGIC',
      image: '/bosaso_beach_thumb.webp',
      desc: 'Clear turquoise shallows where local dhow sailors and coastal communities gather during calm morning sea breezes.',
    },
    {
      title: 'Artisanal Dhow Fleet',
      subtitle: 'Heritage Maritime Culture',
      tag: 'HERITAGE',
      year: 'MARITIME',
      image: '/bosaso_life_thumb.webp',
      desc: 'Traditional handcrafted wooden dhows setting sail past living fringing reefs into the nutrient-rich Aden channel.',
    },
    {
      title: 'Bender Qassim Coastal Vista',
      subtitle: 'Historic Gulf of Aden Horizon',
      tag: 'COAST',
      year: 'GULF',
      image: '/WebsiteImagery_1920x1080_SisterCities_BosasoSomalia-mtime20180108165841_2021-11-01-121110_grsn_91852798b59be8b28fc00edfe4aec23a.webp',
      desc: 'Sweeping panoramic vista overlooking the Gulf of Aden where coastal ridges meet vibrant maritime waters.',
    },
  ],
  eyl: [
    {
      title: 'Dooxada Eyl Canyon Gorge',
      subtitle: 'Freshwater Springs Meeting Sea',
      tag: 'NUGAAL',
      year: '1918',
      image: '/eyl1.webp',
      desc: 'Where crystalline freshwater springs cascade through sheer limestone canyon gorges directly into the cobalt swells of the Indian Ocean.',
    },
    {
      title: 'Dervish Historic Fortress',
      subtitle: 'Sayid Fort Coastal Bluff',
      tag: 'HERITAGE',
      year: '1905',
      image: '/eyl2.webp',
      desc: 'Centuries-old stone battlements guarding the maritime entrance to the natural freshwater canyon of Eyl.',
    },
    {
      title: 'Eyl Fishing Village & Shallows',
      subtitle: 'Artisanal Seafaring Haven',
      tag: 'SANCTUARY',
      year: 'COAST',
      image: '/eyl3.webp',
      desc: 'Traditional fishing boats sheltered in calm turquoise shallows between limestone bluffs.',
    },
    {
      title: 'Nugaal Canyon Limestone Bluffs',
      subtitle: 'Prehistoric Rock Formations',
      tag: 'GEOLOGY',
      year: 'CANYON',
      image: '/eyl/Screenshot 2026-09-02 at 11.57.19.webp',
      desc: 'Towering amber limestone canyon walls carved over geological epochs by the perennial Nugaal valley river.',
    },
    {
      title: 'Daawad Riverside & Coast',
      subtitle: 'Estuary Meets Indian Ocean',
      tag: 'ESTUARY',
      year: 'SANCTUARY',
      image: '/eyl/Screenshot 2026-09-02 at 11.57.35.webp',
      desc: 'Crystalline waters winding past dramatic plateaus before converging with the oceanic swell.',
    },
  ],
  hafun: [
    {
      title: 'Ras Hafun Continental Tip',
      subtitle: 'Easternmost Point of Africa',
      tag: 'BARI',
      year: '1918',
      image: '/hafun1.webp',
      desc: 'Africa’s easternmost continental peninsula where sheer sandstone bluffs drop into wild oceanic swells.',
    },
    {
      title: 'Opone Ancient Spice Tombolo',
      subtitle: 'Maritime Spice Route Ruins',
      tag: 'ANCIENT',
      year: 'OPONE',
      image: '/hafun2.webp',
      desc: 'Natural sand tombolo connecting the massive peninsula to the mainland, host to millennia of Greco-Roman maritime trade.',
    },
    {
      title: 'Hafun Indian Ocean Swells',
      subtitle: 'Deep Water Upwelling Channel',
      tag: 'PELAGIC',
      year: 'SWELLS',
      image: '/hafun3.webp',
      desc: 'Unbroken oceanic swells generated across thousands of miles of open Indian Ocean breaking on white sand bars.',
    },
    {
      title: 'Ras Hafun Coastal Tombolo',
      subtitle: 'Natural Sand Isthmus',
      tag: 'TOMBOLO',
      year: 'HORN',
      image: '/hafun/Screenshot 2026-09-02 at 12.03.09.webp',
      desc: 'The great white sand isthmus connecting the high cliffs of Hafun peninsula to the continental mainland.',
    },
    {
      title: 'Cape Hafun Ocean Escarpment',
      subtitle: 'Eastern Continental Edge',
      tag: 'PENINSULA',
      year: 'OCEAN',
      image: '/hafun/Screenshot 2026-09-02 at 12.04.47.webp',
      desc: 'Sheer sandstone promontories jutting into deep pelagic waters where the Somali Current creates powerful upwellings.',
    },
  ],
  bargaal: [
    {
      title: 'Northern Guardafui Coastline',
      subtitle: 'Where Gulf Meets Ocean',
      tag: 'BARI',
      year: 'COAST',
      image: '/bargaal_main.webp',
      desc: 'Wild, windswept promontories where nutrient-rich pelagic currents nourish marine life.',
    },
    {
      title: 'Bargaal Date Palm Oasis',
      subtitle: 'Coastal Spring Estuary',
      tag: 'BARGAAL',
      year: '1918',
      image: '/bargaal_1.webp',
      desc: 'Vast groves of freshwater-fed date palms meeting the turquoise shores of the northern Guardafui coast.',
    },
    {
      title: 'Coral Cliff Ocean Anchorage',
      subtitle: 'Deep Water Seafaring Haven',
      tag: 'CLIFFS',
      year: 'ANCHOR',
      image: '/bargaal_2.webp',
      desc: 'Sheltered oceanic anchorages historically used by frankincense trade fleets under the Bari Sultanate.',
    },
    {
      title: 'Bargaal Mountain Backdrop',
      subtitle: 'Coastal Date Groves & Ridges',
      tag: 'OASIS',
      year: 'PALMS',
      image: '/Bargaal/Screenshot 2026-09-02 at 12.00.30.webp',
      desc: 'Freshwater springs emerging at the foot of mountain ridges nurturing lush coastal date palm plantations.',
    },
    {
      title: 'Guardafui Shoreline & Shallows',
      subtitle: 'Sultanate Coast & Crystal Seas',
      tag: 'SHORE',
      year: 'SULTANATE',
      image: '/Bargaal/Screenshot 2026-09-02 at 12.01.17.webp',
      desc: 'Pristine turquoise waters washing over ancient coral terraces along the historic Guardafui coast.',
    },
  ],
  qandala: [
    {
      title: 'Karkaar Sea Escarpment',
      subtitle: 'Towering Mountain Headlands',
      tag: 'KARKAAR',
      year: 'CLIFFS',
      image: '/qandala_main.webp',
      desc: 'Where towering limestone escarpments plunge directly into cobalt waters rich in coral biodiversity.',
    },
    {
      title: 'Qandala Coastal Gorge',
      subtitle: 'Limestone Canyon Meeting Gulf',
      tag: 'QANDALA',
      year: '1918',
      image: '/qandala1.webp',
      desc: 'Stunning rocky fjord-like gorge where freshwater runoffs meet the calm turquoise waters of the Gulf of Aden.',
    },
    {
      title: 'Historic Frankincense Port',
      subtitle: 'Ancient Spice & Resin Gateway',
      tag: 'INCENSE',
      year: 'HERITAGE',
      image: '/qandala2.webp',
      desc: 'Natural harbor historically world-renowned for harvesting and exporting the finest Maydi frankincense.',
    },
    {
      title: 'Aden Thermal Springs & Coast',
      subtitle: 'Geothermal Coastal Shallows',
      tag: 'SPRINGS',
      year: 'THERMAL',
      image: '/qandala3.webp',
      desc: 'Natural thermal mineral springs bubbling up along the coastline where mountain valleys reach the sea.',
    },
    {
      title: 'Mountain Cove Haven',
      subtitle: 'Sheltered Artisanal Seafaring',
      tag: 'HAVEN',
      year: 'SANCTUARY',
      image: '/Qandala/Screenshot 2026-09-02 at 12.08.33.webp',
      desc: 'Sheltered cove waters providing safe natural anchorage for artisanal fishing vessels along Mount Cal Madow.',
    },
  ],
  hurdiya: [
    {
      title: 'Hurdiya Rocky Headland',
      subtitle: 'Current-Swept Coastline',
      tag: 'HURDIYA',
      year: '1918',
      image: '/hafun/Screenshot 2026-09-02 at 12.03.44.webp',
      desc: 'Rugged rocky promontory where the Somali Current brings nutrient-rich deep ocean upwelling.',
    },
    {
      title: 'Puntland Outer Reef Shelf',
      subtitle: 'Pristine Benthic Coral Formations',
      tag: 'CORAL',
      year: 'REEF',
      image: '/images/img_07.webp',
      desc: 'Vibrant rocky reef ecosystems supporting diverse reef fish, spiny lobsters, and pelagic species.',
    },
    {
      title: 'Bari Coastal Escarpment',
      subtitle: 'Limestone Ocean Bluffs',
      tag: 'CLIFFS',
      year: 'COAST',
      image: '/exp_coastal_cliff.webp',
      desc: 'Dramatic vertical cliffs carved by centuries of southwest monsoon wind patterns and ocean swell.',
    },
    {
      title: 'Artisanal Seafaring Coast',
      subtitle: 'Traditional Dhow Fishing Grounds',
      tag: 'DHOW',
      year: 'MARITIME',
      image: '/Somalia,_Puntland,_Bari,_Bargal_(01).webp',
      desc: 'Generations of seafaring fishermen venturing out past the breakers in handcrafted wooden craft.',
    },
    {
      title: 'Eastern Ocean Horizon',
      subtitle: 'Untouched Coastal Wilderness',
      tag: 'HORIZON',
      year: 'WILDERNESS',
      image: '/somalia_coast.webp',
      desc: 'Vast uninterrupted swells sweeping across thousands of miles of cobalt Indian Ocean waters.',
    },
  ],
  berbera: [
    {
      title: 'Berbera Deep Harbor',
      subtitle: 'Gulf of Aden Strategic Port',
      tag: 'GULF',
      year: '1918',
      image: '/berbera1.webp',
      desc: 'Historic maritime port known for calm natural deep-water anchorage and ancient seafaring trade.',
    },
    {
      title: 'Bathela Beach & Shallows',
      subtitle: 'Pristine Turquoise Shore',
      tag: 'BATHELA',
      year: 'BEACH',
      image: '/berbera2.webp',
      desc: 'Expansive golden-white sands bathed in calm Gulf of Aden waters, ideal for coastal swimming.',
    },
    {
      title: 'Historic Ottoman Coral Town',
      subtitle: 'Ottoman-Somali Architecture',
      tag: 'HERITAGE',
      year: 'HISTORIC',
      image: '/berbera3.webp',
      desc: 'Streets lined with carved wooden shutters, limestone masonry, and centuries of maritime trading history.',
    },
    {
      title: 'Saaxil Coastline & Turquoise Bay',
      subtitle: 'Calm Gulf of Aden Anchorage',
      tag: 'SAAXIL',
      year: 'BAY',
      image: '/Berbera/Screenshot 2026-09-02 at 12.15.37.webp',
      desc: 'Calm turquoise coastal waters sheltered from ocean swells, providing peaceful haven for marine life and shipping.',
    },
    {
      title: 'Berbera Maritime Horizon',
      subtitle: 'Sunlit Coastal Panorama',
      tag: 'HORIZON',
      year: 'COAST',
      image: '/Berbera/Screenshot 2026-09-02 at 12.15.58.webp',
      desc: 'Golden shoreline stretching toward distant desert hills along the strategic southern entrance of the Red Sea.',
    },
  ],
  zeila: [
    {
      title: 'Sa’ad ad-Din Coral Islands',
      subtitle: 'Ancient Trading Archipelago',
      tag: 'ZEILA',
      year: '1918',
      image: '/zeila1.webp',
      desc: 'Untouched island constellation boasting shallow turquoise reefs, mangrove channels, and pelagic bird colonies.',
    },
    {
      title: 'Ancient Port & Mosque Ruins',
      subtitle: 'First-Century Seafaring Crossroads',
      tag: 'HERITAGE',
      year: 'ANCIENT',
      image: '/zeila2.webp',
      desc: 'Historic coral-stone ruins dating back to the medieval Adal Sultanate and ancient incense trade.',
    },
    {
      title: 'Emerald Marine Flats',
      subtitle: 'Tidal Lagoon & Seagrass',
      tag: 'LAGOON',
      year: 'MARINE',
      image: '/zeila3.webp',
      desc: 'Vast shallow sandbars and crystalline waters sheltering feeding dugongs and sea turtles.',
    },
    {
      title: 'Awdal Tidal Sands & Flats',
      subtitle: 'Seagrass & Dugong Sanctuary',
      tag: 'LAGOON',
      year: 'AWDAL',
      image: '/zeila/Screenshot 2026-09-02 at 12.17.24.webp',
      desc: 'Expansive shallow tidal flats where green sea turtles graze on nutrient-dense marine vegetation.',
    },
    {
      title: 'Red Sea Gateway Archipelago',
      subtitle: 'Historic Adal Sultanate Waters',
      tag: 'ARCHIPELAGO',
      year: 'HERITAGE',
      image: '/zeila/Screenshot 2026-09-02 at 12.18.19.webp',
      desc: 'Untouched offshore coral atolls and turquoise shallows along the northernmost maritime frontier of Somalia.',
    },
  ],
  kismayo: [
    {
      title: 'Kismayo Coral Coastline',
      subtitle: 'Jubaland Southern Shore',
      tag: 'JUBALAND',
      year: '1918',
      image: '/kismayo1.webp',
      desc: 'Pristine white sandy expanses and turquoise shallows along the fertile southern Jubaland shoreline.',
    },
    {
      title: 'Historic Island Anchorage',
      subtitle: 'Swahili-Somali Port Ruins',
      tag: 'HERITAGE',
      year: 'COAST',
      image: '/kismayo2.webp',
      desc: 'Sheltered island channels facilitating peaceful anchorage for traditional deep-water trading dhows.',
    },
    {
      title: 'Juba River Ocean Estuary',
      subtitle: 'Mangrove Marine Nursery',
      tag: 'ESTUARY',
      year: 'MANGROVE',
      image: '/kismayo3.webp',
      desc: 'Where the nutrient-laden waters of the Juba River meet the coral reefs of the Indian Ocean.',
    },
    {
      title: 'Kismayo Coastal Barrier Reef',
      subtitle: 'Living Coral Biodiversity',
      tag: 'CORAL',
      year: 'REEF',
      image: '/kismayo4.webp',
      desc: 'Vibrant hard and soft coral colonies supporting dolphins, dugongs, and five species of sea turtles.',
    },
    {
      title: 'Jubaland Coast & White Sand Dunes',
      subtitle: 'Southern Maritime Frontier',
      tag: 'DUNES',
      year: 'JUBALAND',
      image: '/kismayo/Screenshot 2026-09-02 at 12.21.20.webp',
      desc: 'Sweeping coastal dunes and turquoise shallows where the fertile southern coastline meets rich Indian Ocean currents.',
    },
  ],
  'bajuni-islands': [
    {
      title: 'Bajuni Coral Atoll Chain',
      subtitle: 'Untouched Island Constellation',
      tag: 'ATOLL',
      year: '1918',
      image: '/images/img_01.webp',
      desc: 'Crystal turquoise lagoons ringed by pristine sandbars, living barrier reefs, and historic stone ruins.',
    },
    {
      title: 'Chula Island Lagoon',
      subtitle: 'Emerald Shallows & Coral Heads',
      tag: 'CHULA',
      year: 'ISLAND',
      image: '/images/img_05.webp',
      desc: 'Sheltered atoll waters where green sea turtles graze on expansive seagrass meadows.',
    },
    {
      title: 'Barrier Reef Marine Life',
      subtitle: 'Biodiverse Coral Ecosystem',
      tag: 'BIODIVERSITY',
      year: 'REEF',
      image: '/images/img_11.webp',
      desc: 'Vibrant hard coral ramparts teeming with reef fish, pelagic jacks, and docile whitetip reef sharks.',
    },
    {
      title: 'Turquoise Coral Snorkeling',
      subtitle: 'Crystalline Shallow Waters',
      tag: 'SNORKELING',
      year: 'CORAL',
      image: '/exp_coral_snorkeling.webp',
      desc: 'Exceptional 30-meter visibility revealing dense coral colonies and thriving sea turtle nurseries.',
    },
    {
      title: 'Traditional Bajuni Ngalawa',
      subtitle: 'Outrigger Seafaring Heritage',
      tag: 'SAILING',
      year: 'DHOW',
      image: '/exp_dhow_sailing.webp',
      desc: 'Traditional outrigger sailing vessels navigating shallow reef channels under equatorial trade winds.',
    },
  ],
  'ras-kamboni': [
    {
      title: 'Ras Kamboni Wilderness Cape',
      subtitle: 'Southernmost Frontier Headland',
      tag: 'KAMBONI',
      year: '1918',
      image: '/kamboni1.webp',
      desc: 'Somalia’s wild southernmost coastal landmark where pristine thicket forests meet rolling ocean surf.',
    },
    {
      title: 'Virgin Turtle Nesting Beaches',
      subtitle: 'Undisturbed Marine Sanctuary',
      tag: 'SANCTUARY',
      year: 'TURTLE',
      image: '/kamboni2.webp',
      desc: 'Miles of untouched golden sand beaches providing prime nesting habitat for green and olive ridley sea turtles.',
    },
    {
      title: 'Southern Frontier Coral Reef',
      subtitle: 'Protected Transboundary Marine Corridors',
      tag: 'CORAL',
      year: 'REEF',
      image: '/kamboni3.webp',
      desc: 'Intact barrier coral reefs linking seamlessly into the transboundary marine conservation ecosystems.',
    },
    {
      title: 'Kamboni Coastal Dunes & Shallows',
      subtitle: 'Pristine Sand Formations',
      tag: 'DUNES',
      year: 'COAST',
      image: '/Kamboni/Screenshot 2026-09-02 at 12.25.24.webp',
      desc: 'Windswept dunes sloping into crystal-clear turquoise waters along an isolated wilderness shoreline.',
    },
    {
      title: 'Frontier Ocean Horizon',
      subtitle: 'Where Coast Meets Open Ocean',
      tag: 'HORIZON',
      year: 'OCEAN',
      image: '/Kamboni/Screenshot 2026-09-02 at 12.25.51.webp',
      desc: 'Spectacular oceanic expanses with zero industrial footprint, offering a glimpse of the untamed Somali coast.',
    },
  ],
  mogadishu: [
    {
      title: 'Mogadishu Coastal Panorama',
      subtitle: 'Historic Pearl of the Indian Ocean',
      tag: 'BANADIR',
      year: '1918',
      image: '/mogadishu1.webp',
      desc: 'Centuries of white coral-stone minarets and coastal promenades overlooking the Indian Ocean.',
    },
    {
      title: 'Old Harbor & Dhow Haven',
      subtitle: 'Ancient Seafaring Anchorage',
      tag: 'PORT',
      year: 'DHOW',
      image: '/mogadishu2.webp',
      desc: 'The historic port where merchant fleets from Arabia, Persia, and India traded frankincense and textiles.',
    },
    {
      title: 'Indian Ocean Swells & Reefs',
      subtitle: 'Banadir Coastal Marine Habitat',
      tag: 'BANADIR',
      year: 'OCEAN',
      image: '/mogadishu3.webp',
      desc: 'Deep marine waters directly off the Mogadishu shelf supporting diverse schools of kingfish and pelagic species.',
    },
    {
      title: 'Lido Ocean Beachfront',
      subtitle: 'Golden Sands & Surf',
      tag: 'LIDO',
      year: 'SURF',
      image: '/mogadishu_beach.webp',
      desc: 'Warm turquoise waters and endless sands framing Somalia’s legendary coastline.',
    },
    {
      title: 'Hamar Weyne Historic Coast',
      subtitle: 'Ancient Swahili-Somali Pearl',
      tag: 'HERITAGE',
      year: 'HISTORIC',
      image: '/mogadishu/Screenshot 2026-09-02 at 12.44.48.webp',
      desc: 'Ancient whitewashed coral buildings and centuries-old minarets rising majestically along the Banadir coast.',
    },
  ],
  'liido-beach': [
    {
      title: 'Lido Beach Promenade',
      subtitle: 'Banadir Vibrant Coastline',
      tag: 'BANADIR',
      year: '1918',
      image: '/liido1.webp',
      desc: 'Somalia’s iconic seaside boulevard where community life, fresh coastal cuisine, and ocean surf unite.',
    },
    {
      title: 'Indian Ocean Breakers',
      subtitle: 'Warm Turquoise Surf',
      tag: 'SURF',
      year: 'OCEAN',
      image: '/liido2.webp',
      desc: 'Gentle oceanic swell lines washing over fine golden sands under bright equatorial sunshine.',
    },
    {
      title: 'Lido Coastal Architecture',
      subtitle: 'Coral Stone & Modern Cafes',
      tag: 'PROMENADE',
      year: 'HORIZON',
      image: '/liido3.webp',
      desc: 'Bustling coastal esplanades offering panoramic views across the Mogadishu shoreline.',
    },
    {
      title: 'Evening Surf & Sea Breeze',
      subtitle: 'Gathering Place of Mogadishu',
      tag: 'COMMUNITY',
      year: 'EVENING',
      image: '/liido4.webp',
      desc: 'Warm ocean breezes welcoming thousands of families and swimmers at sunset.',
    },
    {
      title: 'Lido Golden Sands & Shallows',
      subtitle: 'Vibrant Banadir Seaside',
      tag: 'SHORELINE',
      year: 'BANADIR',
      image: '/Liido beach/Screenshot 2026-09-02 at 12.43.32.webp',
      desc: 'Expansive golden shores and rolling turquoise breakers where families and ocean lovers gather daily.',
    },
  ],
  jazeera: [
    {
      title: 'Jazeera Offshore Coral Island',
      subtitle: 'Iconic Coastal Landmark',
      tag: 'ISLAND',
      year: '1918',
      image: '/jazeera1.webp',
      desc: 'Picturesque rocky coral islet situated just 500 meters offshore in calm, crystal-clear turquoise shallows.',
    },
    {
      title: 'Sheltered Barrier Lagoon',
      subtitle: 'Natural Juvenile Nursery',
      tag: 'LAGOON',
      year: 'REEF',
      image: '/jazeera2.webp',
      desc: 'Calm tidal lagoon protected by an outer barrier reef, teeming with colorful reef fish and octopus.',
    },
    {
      title: 'Solar Salt Evaporation Pans',
      subtitle: 'Sustainable Artisanal Heritage',
      tag: 'SALT',
      year: 'HERITAGE',
      image: '/jazeera3.webp',
      desc: 'Centuries-old sea salt pans where pristine ocean brine is naturally crystallized by equatorial sunshine.',
    },
    {
      title: 'Jazeera Coastal Dhow Anchorage',
      subtitle: 'Traditional Wooden Vessels',
      tag: 'DHOW',
      year: 'MARITIME',
      image: '/Jazeera/Screenshot 2026-09-02 at 12.41.41.webp',
      desc: 'Artisanal boats ferrying visitors and fishermen across the emerald channel to the offshore island.',
    },
    {
      title: 'Jazeera Beach & Shallows',
      subtitle: 'Pristine Southern Coast',
      tag: 'BEACH',
      year: 'COAST',
      image: '/Jazeera/Screenshot 2026-09-02 at 12.41.54.webp',
      desc: 'Golden sands and gentle incoming breakers offering an idyllic escape just south of the capital.',
    },
  ],
  marka: [
    {
      title: 'Marka Whitewashed Coral City',
      subtitle: 'Historic Lower Shabelle Port',
      tag: 'MARKA',
      year: '1918',
      image: '/marka1.webp',
      desc: 'Ancient Ajuran and Swahili-Somali port city known for distinctive whitewashed coral-stone buildings and arches.',
    },
    {
      title: 'Towering Coastal Sand Dunes',
      subtitle: 'Golden Dunes Meeting Turquoise Sea',
      tag: 'DUNES',
      year: 'COAST',
      image: '/marka2.webp',
      desc: 'Spectacular orange-gold dunes sweeping directly into warm Indian Ocean surf.',
    },
    {
      title: 'Artisanal Beach Fishery',
      subtitle: 'Open-Beach Dhow Launches',
      tag: 'FISHERY',
      year: 'HARBOR',
      image: '/marka3.webp',
      desc: 'Skilled coastal fishermen launching swift vessels through open ocean breakers to harvest tuna and mackerel.',
    },
    {
      title: 'Marka Historic Old Town',
      subtitle: 'Centuries of Seafaring Heritage',
      tag: 'HERITAGE',
      year: 'ADJURAN',
      image: '/marka/Screenshot 2026-09-02 at 12.33.26.webp',
      desc: 'Winding alleys, coral-stone battlements, and historic merchant residences overlooking the sea.',
    },
    {
      title: 'Lower Shabelle Ocean Swells',
      subtitle: 'Productive Coastal Bank Waters',
      tag: 'HORIZON',
      year: 'OCEAN',
      image: '/marka/Screenshot 2026-09-02 at 12.33.55.webp',
      desc: 'Pristine turquoise breakers rolling onto expansive sandy flats along southern Somalia.',
    },
  ],
  barawe: [
    {
      title: 'Bravanese Coral Architecture',
      subtitle: 'Centuries-Old Coastal Stone City',
      tag: 'BARAWE',
      year: '1918',
      image: '/barawe1.webp',
      desc: 'Carved coral-rag houses and winding alleys built by generations of seafaring Bravanese merchants.',
    },
    {
      title: 'Coastal Dunes & White Sands',
      subtitle: 'Towering Southern Sand Formations',
      tag: 'DUNES',
      year: 'COAST',
      image: '/barawe2.webp',
      desc: 'Magnificent golden sand dunes rolling down into warm turquoise Indian Ocean breakers.',
    },
    {
      title: 'Artisanal Seaport & Dhow Anchorage',
      subtitle: 'Traditional Southern Seafaring',
      tag: 'MARITIME',
      year: 'PORT',
      image: '/barawe3.webp',
      desc: 'Artisanal tuna and kingfish fishermen bringing in their daily catch on historic wooden dhows.',
    },
    {
      title: 'Barawe Coral Stone Battlements',
      subtitle: 'Medieval Maritime Watchtowers',
      tag: 'WATCHTOWERS',
      year: 'HERITAGE',
      image: '/Baraawe/Screenshot 2026-09-02 at 12.30.28.webp',
      desc: 'Ancient stone fortifications guarding the natural island-sheltered harbor of medieval Brava.',
    },
    {
      title: 'Bravanese Shoreline & Island Reefs',
      subtitle: 'Protected Natural Anchorage',
      tag: 'SHORELINE',
      year: 'REEF',
      image: '/Baraawe/Screenshot 2026-09-02 at 12.30.48.webp',
      desc: 'Offshore coral reefs providing natural barrier protection and tranquil turquoise shallows.',
    },
  ],
  hobyo: [
    {
      title: 'Hobyo Sandy Headlands',
      subtitle: 'Galmudug Central Coastline',
      tag: 'HOBYO',
      year: '1918',
      image: '/hobyo1.webp',
      desc: 'Sweeping coastal headlands and pristine turquoise surf along Somalia’s central Indian Ocean littoral.',
    },
    {
      title: 'Galmudug Marine Coast',
      subtitle: 'Unbroken Oceanic Breakers',
      tag: 'SURF',
      year: 'COAST',
      image: '/hobyo2.webp',
      desc: 'Endless rolling waves and golden sand dunes untouched by modern development.',
    },
    {
      title: 'Historic Sultanate Harbor',
      subtitle: 'Hobyo Sultanate Seaport',
      tag: 'HERITAGE',
      year: 'SULTANATE',
      image: '/hobyo3.webp',
      desc: 'Historic port that served as the commercial and cultural capital of the 19th-century Hobyo Sultanate.',
    },
    {
      title: 'Hobyo Coastal Dune Formations',
      subtitle: 'Vast Windswept Dunes',
      tag: 'DUNES',
      year: 'GALMUDUG',
      image: '/hobyo/Screenshot 2026-09-02 at 12.38.06.webp',
      desc: 'Towering golden dunes shaped by the powerful monsoon winds of the central Somali coast.',
    },
    {
      title: 'Great Whirl Upwelling Horizon',
      subtitle: 'Epicenter of Somali Current Upwelling',
      tag: 'UPWELLING',
      year: 'PELAGIC',
      image: '/hobyo/Screenshot 2026-09-02 at 12.38.40.webp',
      desc: 'Nutrient-rich deep oceanic upwelling fueling immense schools of pelagic fish and marine life.',
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

  // Dynamic generator for any destination without a full preset
  const destImages = [
    dest.heroImage,
    ...(dest.gallery || []),
    ...(dest.galleryImages || []),
  ].filter(Boolean);

  const uniqueImages = Array.from(new Set(destImages));

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
          heroImage: bridge.heroImage || d.heroImage,
          gallery: bridge.gallery || d.gallery || [],
          marineSpecies: bridge.marineSpecies || [],
          researchProjects: bridge.researchProjects || [],
          experiences: bridge.experiences || [],
          galleryImages: bridge.gallery || bridge.galleryImages || (bridge.heroImage ? [bridge.heroImage] : []),
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
  const galleryItems = getDestinationGalleryItems(destination, isSomali);

  return (
    <div className="portal-page">
      {/* 1. Page Hero: Unified Reference Modern Layout with Single High-Definition Photo & Cutout */}
      <PageHero
        pageId={`destination-${destination.slug}`}
        image={destination.heroImage || (galleryItems[0]?.image) || '/images/image.webp'}
        titleTop={isSomali ? 'Sahami Xeebta' : 'Explore Coastal'}
        titleHighlight={destination.name}
        titleBottom={destination.region || ''}
        desc={destination.description || destination.tagline || destination.overview}
        backLink={{
          label: isSomali ? 'Ku Noqo Xeebaha Soomaaliya' : "Explore Somalia’s Coast",
          path: '/explore-the-coast',
        }}
        primaryCta={{
          label: isSomali ? 'Faahfaahinta Deegaanka' : 'Explore Haven Details',
          path: '#destination-overview',
          icon: <ArrowRight size={17} />,
        }}
        cutout={{
          title: isSomali ? `Kala Soco ${destination.name}` : `Discover ${destination.name}`,
          path: '#destination-overview',
          thumbnails: galleryItems.length >= 3
            ? [galleryItems[0].image, galleryItems[1].image, galleryItems[2].image]
            : [destination.heroImage, ...(destination.gallery || [])].filter(Boolean).slice(0, 3),
          info: destination.destinationType
            ? `${destination.destinationType} • ${destination.region || 'Somalia Coast'} • ${destination.coordinates ? formatCoordinates(destination.coordinates) : '3,330 KM Coastline'}`
            : 'Pristine marine sanctuary, crystal turquoise waters, and living coral barrier reefs.',
          rating: '5.0',
          tagline: isSomali ? 'Goob Dalxiis oo Shahaado Haysata' : 'Certified Coastal Destination',
        }}
      />

      {/* 2. 2-Column About & Interactive Details */}
      <section id="destination-overview" className="portal-card-section" aria-label="Destination Overview">
        {/* Geographic Metadata Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <span className="portal-hero__tag-btn portal-hero__tag-btn--active" style={{ background: '#0284c7', color: '#ffffff', borderColor: '#0284c7' }}>
            <MapPin size={13} style={{ marginRight: 6 }} /> {destination.region || 'Somalia Coast'}
          </span>
          {destination.coordinates && (
            <span className="portal-hero__tag-btn" style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#e2e8f0' }}>
              <Compass size={13} style={{ marginRight: 6, color: '#0284c7' }} /> {formatCoordinates(destination.coordinates)}
            </span>
          )}
          {destination.destinationType && (
            <span className="portal-hero__tag-btn" style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#e2e8f0' }}>
              <Anchor size={13} style={{ marginRight: 6, color: '#0284c7' }} /> {destination.destinationType}
            </span>
          )}
        </div>

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
              src={destination.heroImage || '/images/image.webp'}
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
                  <img src={sp.image || '/images/img_11.webp'} alt={sp.name} className="portal-attraction-card__img" />
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
                  <img src={rel.heroImage || '/images/image.webp'} alt={rel.name} className="portal-highlight-card__img" />
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
            src="/images/image.webp"
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
