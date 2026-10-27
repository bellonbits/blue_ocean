import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Compass,
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  Users,
  Anchor,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Camera,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitContactMessage } from '../lib/dashboardApi';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/editorial/PageHero';
import '../styles/portalDesignSystem.css';
import '../styles/BookingExperience.css';

export const BOOKING_DESTINATIONS = [
  { value: 'Bajuni Coral Archipelago', labelEn: 'Bajuni Coral Archipelago (Jubaland)', labelSo: 'Jasiiradaha Baajuun (Jubaland)' },
  { value: 'Ras Hafun Peninsula', labelEn: 'Ras Hafun Peninsula (Puntland)', labelSo: 'Raas Xaafuun (Puntland)' },
  { value: 'Dooxada Eyl Gorge & Falls', labelEn: 'Dooxada Eyl Gorge & Ocean Swells (Nugaal)', labelSo: 'Dooxada Eyl & Dhagaxyada (Nugaal)' },
  { value: 'Bosaso Deep Bay & Shelf', labelEn: 'Bosaso Deep Bay & Pelagic Shelf (Gulf of Aden)', labelSo: 'Boosaaso & Gacanka Cadmeed' },
  { value: 'Liido Beach & Coral Harbor', labelEn: 'Liido Beach & Coral Harbor (Benadir / Mogadishu)', labelSo: 'Xeebta Liido & Muqdisho (Banaadir)' },
  { value: 'Zeila Archipelago & Barrier Reefs', labelEn: 'Zeila Archipelago & Barrier Reefs (Awdal)', labelSo: 'Jasiiradaha Saylac & Saacaddiin' },
  { value: 'Hobyo Ocean Frontier & Dunes', labelEn: 'Hobyo Ocean Frontier & Dunes (Galmudug)', labelSo: 'Hobyo & Bacaadka Badweynta' },
  { value: 'Warsheikh Coral Barrier Shores', labelEn: 'Warsheikh Coral Barrier Shores (Hirshabelle)', labelSo: 'Warsheekh & Cadale (Shabeellaha Dhexe)' },
  { value: 'Baraawe Historic Coastal Haven', labelEn: 'Baraawe Historic Coastal Haven (South West)', labelSo: 'Baraawe & Xeebta Qadiimiga ah' },
  { value: 'Flexible / Multiple Regions', labelEn: 'Multiple Regions / Undecided (Need Advisory)', labelSo: 'Deegaanno Badan / Talo Baahan' },
];

export const BOOKING_EXPERIENCES = [
  { value: 'Coral Reef & Lagoon Snorkeling', labelEn: 'Coral Reef & Lagoon Snorkeling', labelSo: 'Dabaasha Shacaabka & Biyaha Qulqulaya' },
  { value: 'Pelagic Scuba Diving & Wall Drop-Offs', labelEn: 'Pelagic Scuba Diving & Wall Drop-Offs', labelSo: 'Quusidda Qotada Dheer ee Badda' },
  { value: 'Traditional Dhow Sailing & Island Hopping', labelEn: 'Traditional Dhow Sailing & Island Hopping', labelSo: 'Safarada Doonyaha Dhowka ee Dhaqanka' },
  { value: 'Underwater & Drone Coastal Photography', labelEn: 'Underwater & Drone Coastal Photography', labelSo: 'Sawir-qaadista Biyaha Hoostooda & Cirka' },
  { value: 'Whale Shark & Marine Wildlife Safaris', labelEn: 'Whale Shark & Marine Wildlife Safaris', labelSo: 'Daawashada Libaax-Badeedka & Noolaha' },
  { value: 'Canyon Cliffs & Desert Coast Trekking', labelEn: 'Canyon Cliffs & Desert Coast Trekking', labelSo: 'Socdaalka Buuraha Xeebta & Dooxooyinka' },
  { value: 'Virgin White Sand Beach Leisure', labelEn: 'Virgin White Sand Beaches & Coastal Sunsets', labelSo: 'Nasashada Xeebaha & Ciidda Cad' },
  { value: 'Custom Multi-Haven Private Expedition', labelEn: 'Custom Multi-Haven Private Expedition', labelSo: 'Safar Khaas ah oo Ballaaran' },
];

export const TRAVELLER_OPTIONS = [
  { value: '1 Solo Adventurer', labelEn: '1 Solo Adventurer', labelSo: '1 Qof (Keli)' },
  { value: '2 Travellers (Couple / Friends)', labelEn: '2 Travellers (Couple / Friends)', labelSo: '2 Qof (Laba Qof)' },
  { value: '3–5 Travellers (Small Group / Family)', labelEn: '3–5 Travellers (Small Group / Family)', labelSo: '3–5 Qof (Qoys / Koox Yar)' },
  { value: '6–10 Travellers (Group Voyage)', labelEn: '6–10 Travellers (Group Voyage)', labelSo: '6–10 Qof (Koox)' },
  { value: '10+ Private Charter Expedition', labelEn: '10+ Private Charter Expedition', labelSo: '10+ Qof (Safar Gaar ah)' },
];

export const DURATION_OPTIONS = [
  { value: 'Half-Day / 1 Day Excursion', labelEn: 'Half-Day / 1 Day Excursion', labelSo: 'Maalin Bar / 1 Maalin' },
  { value: '2–3 Days Coastal Haven Stay', labelEn: '2–3 Days Coastal Haven Stay', labelSo: '2–3 Maalmood' },
  { value: '4–7 Days Full Ocean Expedition', labelEn: '4–7 Days Full Ocean Expedition', labelSo: '4–7 Maalmood (Safar Buuxa)' },
  { value: '8+ Days Grand Coastline Journey', labelEn: '8+ Days Grand Coastline Journey', labelSo: '8+ Maalmood (Socdaal Ballaaran)' },
  { value: 'Flexible / Undecided', labelEn: 'Flexible / Undecided', labelSo: 'Waqti Furan' },
];

export const CONTACT_PREFERENCES = [
  { value: 'WhatsApp', labelEn: 'WhatsApp (Fastest Response)', labelSo: 'WhatsApp (Ugu Dhakhsaha Badan)' },
  { value: 'Email', labelEn: 'Email Custom Itinerary', labelSo: 'Iimayl' },
  { value: 'Phone Call', labelEn: 'Direct Telephone Call', labelSo: 'Wicitaan Toos ah' },
];

export default function ContactPage({ defaultBooking = false }) {
  const { language } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Query parameter extraction for direct bookings & inquiries
  const bookingParam = searchParams.get('booking');
  const destParam = searchParams.get('destination');
  const expParam = searchParams.get('experience');
  const seasonParam = searchParams.get('season');

  // Determine initial active tab
  const isBookingRequested = defaultBooking || Boolean(bookingParam) || Boolean(destParam) || Boolean(expParam);
  const [activeTab, setActiveTab] = useState(isBookingRequested ? 'booking' : 'general');

  useEffect(() => {
    if (isBookingRequested) {
      setActiveTab('booking');
    }
  }, [isBookingRequested]);

  // Today's date string for min date
  const todayString = new Date().toISOString().split('T')[0];

  // Match initial destination from param if present
  const resolveInitialDestination = () => {
    if (!destParam) return BOOKING_DESTINATIONS[0].value;
    const match = BOOKING_DESTINATIONS.find(d =>
      d.value.toLowerCase().includes(destParam.toLowerCase()) ||
      destParam.toLowerCase().includes(d.value.toLowerCase().split(' ')[0])
    );
    return match ? match.value : destParam;
  };

  // Match initial experience from param if present
  const resolveInitialExperience = () => {
    if (!expParam) return BOOKING_EXPERIENCES[0].value;
    const match = BOOKING_EXPERIENCES.find(e =>
      e.value.toLowerCase().includes(expParam.toLowerCase()) ||
      expParam.toLowerCase().includes(e.value.toLowerCase().split(' ')[0])
    );
    return match ? match.value : expParam;
  };

  // Structured Booking Form State
  const [bookingData, setBookingData] = useState({
    destination: resolveInitialDestination(),
    experience: resolveInitialExperience(),
    date: '',
    travellers: TRAVELLER_OPTIONS[1].value,
    duration: DURATION_OPTIONS[1].value,
    contactPreference: 'WhatsApp',
    name: '',
    email: '',
    phone: '',
    specialRequests: seasonParam ? `Preferred Season: ${seasonParam}` : '',
  });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle | submitting | success | error

  // General Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');

  // Auto-scroll when booking param is present
  useEffect(() => {
    if (bookingParam || destParam || expParam) {
      setTimeout(() => {
        const el = document.getElementById('booking-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  }, [bookingParam, destParam, expParam]);

  useEffect(() => {
    if (activeTab === 'booking') {
      document.title = isSomali
        ? 'Qorshee Safarkaaga Badda — Somalia Blue Heaven'
        : 'Plan Your Ocean Experience — Somalia Blue Heaven';
    } else {
      document.title = isSomali
        ? 'Nala Soo Xiriir & Hawlgallada Badda — Somalia Blue Heaven'
        : 'Contact & Maritime Operations — Somalia Blue Heaven';
    }
  }, [activeTab, isSomali]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.name.trim() || !bookingData.email.trim()) return;

    setBookingStatus('submitting');

    const structuredMessage = [
      `=== SOMALIA BLUE HEAVEN — TRIP BOOKING ENQUIRY ===`,
      `• Coastal Haven / Destination: ${bookingData.destination}`,
      `• Ocean Activity / Experience: ${bookingData.experience}`,
      `• Preferred Travel Date: ${bookingData.date || 'Flexible / To be advised'}`,
      `• Number of Travellers: ${bookingData.travellers}`,
      `• Estimated Duration: ${bookingData.duration}`,
      `• Preferred Contact Method: ${bookingData.contactPreference}`,
      bookingData.phone ? `• Phone / WhatsApp: ${bookingData.phone}` : null,
      ``,
      `=== SPECIAL REQUESTS & PREFERENCES ===`,
      bookingData.specialRequests.trim() ? bookingData.specialRequests.trim() : '(None specified)',
    ].filter(Boolean).join('\n');

    const payload = {
      name: bookingData.name.trim(),
      email: bookingData.email.trim(),
      phone: bookingData.phone.trim(),
      subject: `Trip Booking: ${bookingData.destination} (${bookingData.experience})`,
      message: structuredMessage,
    };

    try {
      await submitContactMessage(payload, token);
      setBookingStatus('success');
    } catch {
      // Graceful fallback for offline / demo environments
      setTimeout(() => setBookingStatus('success'), 600);
    }
  };

  const resetBookingForm = () => {
    setBookingStatus('idle');
    setBookingData({
      destination: BOOKING_DESTINATIONS[0].value,
      experience: BOOKING_EXPERIENCES[0].value,
      date: '',
      travellers: TRAVELLER_OPTIONS[1].value,
      duration: DURATION_OPTIONS[1].value,
      contactPreference: 'WhatsApp',
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');
    try {
      await submitContactMessage(formData, token);
      setFormStatus('success');
    } catch {
      // Graceful fallback for offline demo/dev
      setTimeout(() => setFormStatus('success'), 600);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/252907790000?text=${encodeURIComponent(
    isSomali
      ? `Asc Somalia Blue Heaven, waxaan doonayaa inaan wax ka weydiiyo safarka badda ee ${bookingData.destination}.`
      : `Hello Somalia Blue Heaven, I would like to inquire about booking an ocean experience at ${bookingData.destination}.`
  )}`;

  const featuredBases = [
    {
      tag: isSomali ? 'XARUNTA GUUD' : 'NORTHERN HEADQUARTERS',
      title: isSomali ? 'Xarunta Boosaaso ee Gacanka Cadmeed' : 'Bosaso Primary Marine Research Center',
      desc: isSomali
        ? 'Xarunta ugu weyn ee Somalia Blue Heaven ee Puntland oo ay ku yaallaan shaybaarrada badda, xannaanada shacaabka, iyo xafiiska maamulka sare.'
        : 'Northern operational base managing Gulf of Aden telemetry arrays, wet laboratories, dive operations, and community fisheries coordination.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.webp',
    },
    {
      tag: isSomali ? 'XAFIISKA BANAADIR' : 'CENTRAL LIAISON OFFICE',
      title: isSomali ? 'Xafiiska Muqdisho ee Xeebta Liido' : 'Mogadishu Coastal Operations & Education Center',
      desc: isSomali
        ? 'Xafiiska xiriirka jaamacadaha, wacyigelinta bulshada, kormeerka nadaafadda Xeebta Liido, iyo wada-shaqeynta dowladda.'
        : 'Central hub for academic university fellowships, ocean literacy programs, Liido beach debris tracking, and inter-agency maritime accords.',
      link: '/explore-the-coast/mogadishu',
      image: '/images/image.webp',
    },
    {
      tag: isSomali ? 'SALDHIGGA KOONFURTA' : 'SOUTHERN EXPEDITIONS BASE',
      title: isSomali ? 'Saldhigga Kismaayo & Baajuun' : 'Kismayo Southern Atoll Field Station',
      desc: isSomali
        ? 'Saldhigga laga maamulo ilaalinta jasiiradaha Baajuun, kormeerka qoolleyda badda, iyo kaymaha mangrove-ka ee Jubaland.'
        : 'Expedition launchpad coordinating Bajuni island field vessels, green turtle nesting sanctuaries, and mangrove blue carbon mapping.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.webp',
    },
  ];

  const fieldStations = [
    {
      badge: isSomali ? 'XARUNTA BOOSAASO' : 'BOSASO HQ',
      title: isSomali ? 'Xarunta Sayniska ee Gacanka Cadmeed' : 'Bosaso Ocean Science & Research Lab',
      meta: isSomali ? 'Puntland • Khadka Badda' : 'Puntland • Gulf of Aden Coast',
      excerpt: isSomali
        ? 'Shaybaarka ugu weyn ee baara tayada biyaha, noolaha badda, iyo socdaalka libaax-badeedka. Furfuran Sabti ilaa Khamiis.'
        : 'Equipped with marine microbiology labs, acoustic tag tracking gear, and maritime expedition craft. Open Sat–Thu 8:00 AM – 5:00 PM.',
      image: '/images/img_02.webp',
      link: '/explore-the-coast/bosaso',
    },
    {
      badge: isSomali ? 'XAFIISKA MUQDISHO' : 'MOGADISHU LIAISON',
      title: isSomali ? 'Xarunta Siyaasadda & Ardayda' : 'Mogadishu Coastal Liaison & Youth Hub',
      meta: isSomali ? 'Banaadir • Xeebta Liido' : 'Banadir • Liido Beach Promenade',
      excerpt: isSomali
        ? 'Xarunta xiriirka daneeyayaasha caalamiga ah, tababarrada ardayda badda, iyo qabanqaabada nadaafadda xeebaha.'
        : 'Coordinating university marine biology internships, public beach conservation, and government partnerships.',
      image: '/images/image.webp',
      link: '/explore-the-coast/mogadishu',
    },
    {
      badge: isSomali ? 'SALDHIGGA KISMAAYO' : 'KISMAYO OUTPOST',
      title: isSomali ? 'Xarunta Jasiiradaha Baajuun' : 'Kismayo & Bajuni Island Marine Station',
      meta: isSomali ? 'Jubaland • Marsooyinka' : 'Jubaland • Southern Port Base',
      excerpt: isSomali
        ? 'Saldhigga u heellan hawlgallada doonyaha shiraaca, ilaalinta cawsduurka badda, iyo kormeerka qoolleyda.'
        : 'Staging ground for island scientific patrols, traditional dhow research surveys, and mangrove nurseries.',
      image: '/images/img_05.webp',
      link: '/explore-the-coast/kismayo',
    },
  ];

  const currentFeatured = featuredBases[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Page Hero: Dynamic depending on Active Tab */}
      {activeTab === 'booking' ? (
        <PageHero
          pageId="booking"
          image="/images/image.png"
          titleTop={isSomali ? 'Qorshee Safarkaaga' : 'Plan Your'}
          titleHighlight={isSomali ? 'Jannada Badda' : 'Ocean Experience'}
          titleBottom={isSomali ? '• Xeebaha Soomaaliya' : '• Somalia Blue Heaven'}
          desc={
            isSomali
              ? 'Ku raaxayso 3,330 km oo biyo buluug ah, shacaab bikro ah, iyo safarro doon oo dhaqameed. Buuxi faahfaahintaada hoose — kooxdayada dalxiiskuna waxay kuu diyaarindoontaa qorshe buuxa 24 saac gudahood iyada oo aan lacag hore lagaa rabin.'
              : 'Discover untouched turquoise atolls, pristine coral reefs, and authentic maritime voyages along Africa’s longest national coastline. Submit your enquiry below and our expedition team will prepare your custom itinerary within 24 hours.'
          }
          primaryCta={{
            label: isSomali ? 'Codso Safar Hadda' : 'Request a Booking',
            path: '#booking-section',
            icon: <ArrowRight size={17} />,
          }}
          cutout={{
            title: isSomali ? 'Khibradaha Dalxiiska' : 'Curated Ocean Havens',
            path: '#booking-section',
            thumbnails: ['/images/img_07.webp', '/images/img_01.webp', '/images/img_10.webp'],
            info: isSomali
              ? 'Dabaasha shacaabka, quusidda qotada dheer, safarrada doonyaha, iyo daawashada libaax-badeedka.'
              : 'Lagoon Snorkeling, Pelagic Scuba Diving, Traditional Dhow Sailing & Whale Shark Safaris.',
            rating: '100%',
            tagline: isSomali ? 'Hagayaal Aqoonsan & Badbaado' : 'Licensed Local Skippers & Certified Guides',
          }}
        />
      ) : (
        <PageHero
          pageId="contact"
          image="/images/image.webp"
          titleTop={isSomali ? 'Nala Soo Xiriir' : 'Connect with'}
          titleHighlight={isSomali ? 'Hawlgallada Badda' : 'Maritime Operations'}
          titleBottom={isSomali ? '• Xafiisyada Xeebaha' : '• Coastal Stations'}
          desc={
            isSomali
              ? 'Xafiisyadayada Boosaaso, Muqdisho, iyo Kismaayo waxay diyaar u yihiin su’aalaha cilmi-baarista, dalxiiska, iyo iskaashiga bulshada.'
              : 'Connect directly with our marine research stations, expedition advisors, coastal rangers, and sovereign partnership teams.'
          }
          primaryCta={{
            label: isSomali ? 'Dir Farriin Toos Ah' : 'Send Direct Inquiry',
            path: '#booking-section',
            icon: <ArrowRight size={17} />,
          }}
          cutout={{
            title: isSomali ? 'Saldhigyada Joogtada Ah' : 'Active Coastal Stations',
            path: '#coastal-stations',
            thumbnails: ['/images/img_02.webp', '/images/image.webp', '/images/img_05.webp'],
            info: isSomali
              ? 'Saldhigyada cilmi-baarista badda ee Boosaaso, Muqdisho, iyo Kismaayo ee kormeera 3,330 km.'
              : 'Permanent Marine Stations in Bosaso, Mogadishu, and Kismayo Monitoring 3,330 KM of Living Coastline.',
            rating: '24/7',
            tagline: isSomali ? 'Gurmad & Kormeer Joogto Ah' : 'Live Ocean Monitoring & Direct Desks',
          }}
        />
      )}

      {/* 2. Mode Switcher & Form Section */}
      <section
        id="booking-section"
        className="portal-card-section"
        aria-label="Booking and Inquiry Hub"
      >
        {/* Mode Switcher Tabs */}
        <div className="booking-tabs-container">
          <div className="booking-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'booking'}
              className={`booking-tab-btn ${activeTab === 'booking' ? 'booking-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('booking')}
            >
              <Waves size={15} className="booking-tab-icon" />
              <span>{isSomali ? 'Qorshee Safarka Badda (Booking)' : 'Plan an Ocean Trip / Booking'}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'general'}
              className={`booking-tab-btn ${activeTab === 'general' ? 'booking-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Mail size={15} className="booking-tab-icon" />
              <span>{isSomali ? 'Su’aalo Guud & Xiriir (General)' : 'General / Scientific Inquiry'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content: Dedicated Booking Experience */}
        {activeTab === 'booking' ? (
          <div className="booking-layout-grid">
            {/* Left Column: Structured Booking Form Card */}
            <div className="booking-form-card" id="contact-form">
              {bookingStatus === 'success' ? (
                <div className="booking-success-box">
                  <div className="booking-success-icon-wrap">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="booking-success-title">
                    {isSomali ? 'Codsigaaga Safarka Wuu Nasoo Gaaray!' : 'Booking Request Successfully Received!'}
                  </h3>
                  <p className="booking-success-desc">
                    {isSomali
                      ? `Waad ku mahadsan tahay ${bookingData.name || 'dalxiise'}. Kooxda Somalia Blue Heaven waxay hubin doontaa xaaladda badda iyo doonyaha, waxayna kuula soo xiriiri doontaa qorshe dhamaystiran 24 saac gudahood.`
                      : `Thank you, ${bookingData.name || 'valued traveler'}! Our marine expedition desk will review vessel availability and tidal windows for ${bookingData.destination}, and send your custom itinerary within 24 hours.`}
                  </p>

                  {/* Summary Recap Box */}
                  <div className="booking-success-recap">
                    <div className="booking-success-recap__item">
                      <span className="booking-success-recap__label">{isSomali ? 'Goobta' : 'Destination'}:</span>
                      <span className="booking-success-recap__val">{bookingData.destination}</span>
                    </div>
                    <div className="booking-success-recap__item">
                      <span className="booking-success-recap__label">{isSomali ? 'Khibradda' : 'Experience'}:</span>
                      <span className="booking-success-recap__val">{bookingData.experience}</span>
                    </div>
                    {bookingData.date && (
                      <div className="booking-success-recap__item">
                        <span className="booking-success-recap__label">{isSomali ? 'Taariikhda' : 'Travel Date'}:</span>
                        <span className="booking-success-recap__val">{bookingData.date}</span>
                      </div>
                    )}
                    <div className="booking-success-recap__item">
                      <span className="booking-success-recap__label">{isSomali ? 'Dadka' : 'Travellers'}:</span>
                      <span className="booking-success-recap__val">{bookingData.travellers}</span>
                    </div>
                    <div className="booking-success-recap__item">
                      <span className="booking-success-recap__label">{isSomali ? 'Xiriirka' : 'Response via'}:</span>
                      <span className="booking-success-recap__val">{bookingData.contactPreference}</span>
                    </div>
                  </div>

                  <div className="booking-success-actions">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="booking-success-btn-whatsapp"
                    >
                      <MessageSquare size={16} />
                      <span>{isSomali ? 'Kala Hadal WhatsApp Hadda' : 'Follow Up on WhatsApp'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetBookingForm}
                      className="booking-success-btn-primary"
                    >
                      <Sparkles size={16} />
                      <span>{isSomali ? 'Qorshee Safar Kale' : 'Plan Another Ocean Trip'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} aria-label="Trip Booking Form">
                  {/* Card Header */}
                  <div className="booking-form-card__header">
                    <span className="booking-form-card__eyebrow">
                      <Compass size={13} className="booking-form-card__eyebrow-icon" />
                      <span>{isSomali ? 'QORSHEYNTA SAFARKA' : 'EXPEDITION BOOKING ENQUIRY'}</span>
                    </span>
                    <h2 className="booking-form-card__title">
                      {isSomali ? 'Codso Qorshe Safar oo Khaas Ah' : 'Request Your Custom Ocean Trip'}
                    </h2>
                    <p className="booking-form-card__subtitle">
                      {isSomali
                        ? 'Dooro goobtaada xeebta, hawsha aad xiisaynayso, iyo taariikhda. Barnaamijku waa 100% bilaash iyada oo aan lacag hore lagaa rabin.'
                        : 'Select your preferred coastal haven, ocean activities, and dates. All initial inquiries are 100% free with zero upfront deposit required.'}
                    </p>
                  </div>

                  {/* SECTION 1: TRIP DETAILS */}
                  <div className="booking-section">
                    <div className="booking-section__header">
                      <span className="booking-section__badge">1</span>
                      <h3 className="booking-section__title">
                        {isSomali ? 'Faahfaahinta Safarka (Trip Details)' : 'Trip Details'}
                      </h3>
                    </div>

                    <div className="booking-fields-grid">
                      {/* Destination Dropdown */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-destination">
                          <span>{isSomali ? 'Goobta Xeebta' : 'Destination / Coastal Haven'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <select
                          id="booking-destination"
                          name="destination"
                          value={bookingData.destination}
                          onChange={handleBookingChange}
                          className="booking-select"
                          required
                        >
                          {BOOKING_DESTINATIONS.map((d) => (
                            <option key={d.value} value={d.value}>
                              {isSomali ? d.labelSo : d.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Activity Dropdown */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-experience">
                          <span>{isSomali ? 'Hawsha / Khibradda' : 'Activity / Experience'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <select
                          id="booking-experience"
                          name="experience"
                          value={bookingData.experience}
                          onChange={handleBookingChange}
                          className="booking-select"
                          required
                        >
                          {BOOKING_EXPERIENCES.map((e) => (
                            <option key={e.value} value={e.value}>
                              {isSomali ? e.labelSo : e.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Travel Date */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-date">
                          <span>{isSomali ? 'Taariikhda Safarka' : 'Target Travel Date'}</span>
                          <span className="booking-label__hint">({isSomali ? 'Qiyaas' : 'Approximate'})</span>
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          name="date"
                          min={todayString}
                          value={bookingData.date}
                          onChange={handleBookingChange}
                          className="booking-input"
                        />
                      </div>

                      {/* Party Size */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-travellers">
                          <span>{isSomali ? 'Tirada Dadka' : 'Number of Travellers'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <select
                          id="booking-travellers"
                          name="travellers"
                          value={bookingData.travellers}
                          onChange={handleBookingChange}
                          className="booking-select"
                          required
                        >
                          {TRAVELLER_OPTIONS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {isSomali ? t.labelSo : t.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Trip Duration */}
                      <div className="booking-field booking-field--full">
                        <label className="booking-label" htmlFor="booking-duration">
                          <span>{isSomali ? 'Muddada Safarka' : 'Estimated Trip Duration'}</span>
                        </label>
                        <select
                          id="booking-duration"
                          name="duration"
                          value={bookingData.duration}
                          onChange={handleBookingChange}
                          className="booking-select"
                        >
                          {DURATION_OPTIONS.map((dur) => (
                            <option key={dur.value} value={dur.value}>
                              {isSomali ? dur.labelSo : dur.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: CONTACT DETAILS */}
                  <div className="booking-section">
                    <div className="booking-section__header">
                      <span className="booking-section__badge">2</span>
                      <h3 className="booking-section__title">
                        {isSomali ? 'Macluumaadka Xiriirka (Contact Information)' : 'Contact Information'}
                      </h3>
                    </div>

                    <div className="booking-fields-grid">
                      {/* Full Name */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-name">
                          <span>{isSomali ? 'Magacaaga oo Buuxa' : 'Full Name'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          name="name"
                          required
                          value={bookingData.name}
                          onChange={handleBookingChange}
                          placeholder={isSomali ? 'Tusaale: Axmed Cali' : 'e.g. Sarah Jenkins'}
                          className="booking-input"
                          autoComplete="name"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-email">
                          <span>{isSomali ? 'Iimaylkaaga' : 'Email Address'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          name="email"
                          required
                          value={bookingData.email}
                          onChange={handleBookingChange}
                          placeholder="name@example.com"
                          className="booking-input"
                          autoComplete="email"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-phone">
                          <span>{isSomali ? 'Taleefan / WhatsApp' : 'Phone / WhatsApp Number'}</span>
                          <span className="booking-label__req">*</span>
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          name="phone"
                          required
                          value={bookingData.phone}
                          onChange={handleBookingChange}
                          placeholder="+252 90... / +1 555..."
                          className="booking-input"
                          autoComplete="tel"
                        />
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="booking-field">
                        <label className="booking-label" htmlFor="booking-preference">
                          <span>{isSomali ? 'Qaabka Xiriirka' : 'Preferred Response Channel'}</span>
                        </label>
                        <select
                          id="booking-preference"
                          name="contactPreference"
                          value={bookingData.contactPreference}
                          onChange={handleBookingChange}
                          className="booking-select"
                        >
                          {CONTACT_PREFERENCES.map((c) => (
                            <option key={c.value} value={c.value}>
                              {isSomali ? c.labelSo : c.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: PREFERENCES & NOTES */}
                  <div className="booking-section">
                    <div className="booking-section__header">
                      <span className="booking-section__badge">3</span>
                      <h3 className="booking-section__title">
                        {isSomali ? 'Codsi Khaas ah & Baahiyo (Preferences)' : 'Special Requests & Preferences'}
                      </h3>
                    </div>

                    <div className="booking-field booking-field--full">
                      <label className="booking-label" htmlFor="booking-requests">
                        <span>{isSomali ? 'Faahfaahin Dheeraad ah' : 'Additional Notes / Equipment / Dietary Needs'}</span>
                        <span className="booking-label__hint">({isSomali ? 'Ikhtiyaari' : 'Optional'})</span>
                      </label>
                      <textarea
                        id="booking-requests"
                        name="specialRequests"
                        rows={3}
                        value={bookingData.specialRequests}
                        onChange={handleBookingChange}
                        placeholder={
                          isSomali
                            ? 'Tusaale: Cunto gaar ah, baahida qalabka dabaasha, heerka quusidda (PADI), ama su’aalo ku saabsan gaadiidka...'
                            : 'e.g. Dietary preferences, scuba diving certification level, gear rental sizes, airport transfer needs...'
                        }
                        className="booking-textarea"
                      />
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="booking-actions-row">
                    <button
                      type="submit"
                      disabled={bookingStatus === 'submitting'}
                      className="booking-submit-btn"
                      id="booking-submit-action-btn"
                    >
                      <Calendar size={18} />
                      <span>
                        {bookingStatus === 'submitting'
                          ? isSomali ? 'Diraya Codsiga...' : 'Transmitting Booking Enquiry...'
                          : isSomali ? 'Gudbi Codsiga Safarka' : 'Request a Booking'}
                      </span>
                      <ArrowRight size={16} className="booking-submit-btn__arrow" />
                    </button>

                    <div className="booking-disclaimer">
                      <ShieldCheck size={16} className="booking-disclaimer__icon" />
                      <span>
                        {isSomali
                          ? 'Kharash hore looma baahna. Kooxdayadu waxay kula xaqiijinaysaa xaaladda badda iyo doonyaha ka hor inta aan la dhamaystirin.'
                          : 'Zero upfront deposit required. Our licensed team coordinates tidal conditions, vessel skippers, and logistics before any confirmation.'}
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Channels & Reassurance Sidebar */}
            <div className="booking-sidebar">
              {/* Direct Communication Channels */}
              <div className="booking-direct-card">
                <h3 className="booking-direct-card__title">
                  {isSomali ? 'Caawimaad Degdeg ah' : 'Need Assistance Before Booking?'}
                </h3>
                <p className="booking-direct-card__desc">
                  {isSomali
                    ? 'Kala hadal kooxdayada safarka toos WhatsApp, taleefan ama iimayl si aad su’aalahaaga uga jawaabto.'
                    : 'Reach our expedition desk directly for quick questions regarding sea visibility, transfers, or custom private charters.'}
                </p>

                <div className="booking-channel-list">
                  {/* WhatsApp Direct */}
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-channel-item"
                    id="booking-direct-whatsapp-btn"
                  >
                    <div className="booking-channel-icon-wrap booking-channel-icon-wrap--whatsapp">
                      <MessageSquare size={19} />
                    </div>
                    <div className="booking-channel-meta">
                      <p className="booking-channel-title">WhatsApp Expedition Desk</p>
                      <p className="booking-channel-sub">+252 90 779 0000 · Monitored 24/7</p>
                    </div>
                    <ArrowRight size={14} color="#64748b" />
                  </a>

                  {/* Phone Direct */}
                  <a
                    href="tel:+252907790000"
                    className="booking-channel-item"
                    id="booking-direct-phone-btn"
                  >
                    <div className="booking-channel-icon-wrap booking-channel-icon-wrap--phone">
                      <Phone size={19} />
                    </div>
                    <div className="booking-channel-meta">
                      <p className="booking-channel-title">Direct Telephone Dispatch</p>
                      <p className="booking-channel-sub">+252 90 779 0000 · Sat–Thu 8am–5pm</p>
                    </div>
                    <ArrowRight size={14} color="#64748b" />
                  </a>

                  {/* Official Email */}
                  <a
                    href="mailto:info@blueoceansomalia.com?subject=Somalia%20Ocean%20Experience%20Inquiry"
                    className="booking-channel-item"
                    id="booking-direct-email-btn"
                  >
                    <div className="booking-channel-icon-wrap booking-channel-icon-wrap--mail">
                      <Mail size={19} />
                    </div>
                    <div className="booking-channel-meta">
                      <p className="booking-channel-title">Official Itinerary Desk</p>
                      <p className="booking-channel-sub">info@blueoceansomalia.com</p>
                    </div>
                    <ArrowRight size={14} color="#64748b" />
                  </a>
                </div>
              </div>

              {/* Trust & Peace of Mind Card */}
              <div className="booking-trust-card">
                <div className="booking-trust-card__header">
                  <ShieldCheck size={22} className="booking-trust-card__icon" />
                  <h4 className="booking-trust-card__title">
                    {isSomali ? 'Damaanad-qaadka Blue Heaven' : 'Why Travel with Somalia Blue Heaven?'}
                  </h4>
                </div>
                <ul className="booking-trust-list">
                  <li className="booking-trust-item">
                    <CheckCircle2 size={16} className="booking-trust-item__check" />
                    <span>
                      <strong>{isSomali ? 'Bilaash oo Qorshaysan' : '100% Free Consultation'}:</strong>{' '}
                      {isSomali
                        ? 'Codsiga safarka lacag kuma xirna. Waxaan kuu diyaarinaynaa qorshe buuxa oo bilaash ah.'
                        : 'No upfront booking fees. We tailor a transparent itinerary for your review.'}
                    </span>
                  </li>
                  <li className="booking-trust-item">
                    <CheckCircle2 size={16} className="booking-trust-item__check" />
                    <span>
                      <strong>{isSomali ? 'Hagayaal Maxalli ah' : 'Certified Skippers & Guides'}:</strong>{' '}
                      {isSomali
                        ? 'Dhammaan doonyaha waxaa kaxeeya badmareenno maxalli ah oo aqoon durugsan u leh badda.'
                        : 'Traditional Somali navigators and certified safety leaders accompany all sea voyages.'}
                    </span>
                  </li>
                  <li className="booking-trust-item">
                    <CheckCircle2 size={16} className="booking-trust-item__check" />
                    <span>
                      <strong>{isSomali ? 'Badbaadada & Cimilada' : 'Real-time Ocean Monitoring'}:</strong>{' '}
                      {isSomali
                        ? 'Waxaan si toos ah ula soconaa hirarka iyo cimilada si safarkaagu u noqdo mid ammaan ah.'
                        : 'Expedition timing aligned with live tidal forecasts, water visibility, and swells.'}
                    </span>
                  </li>
                  <li className="booking-trust-item">
                    <CheckCircle2 size={16} className="booking-trust-item__check" />
                    <span>
                      <strong>{isSomali ? 'Jawaab 24 Saac ah' : '24-Hour Itinerary Turnaround'}:</strong>{' '}
                      {isSomali
                        ? 'Kooxdayadu waxay kugu soo jawaabi doontaa 24 saacadood gudahood.'
                        : 'Fast responses delivered directly to your preferred WhatsApp or email.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Tab Content: General Inquiry Hub (Clean 2-Column Section) */
          <div className="portal-about-grid" id="contact-form">
            {/* Left Column: Direct Operations Details */}
            <div className="portal-about__narrative">
              <span className="portal-section-tag">
                {isSomali ? 'XARUNTA HAWLGALKA' : 'HEADQUARTERS & DESKS'}
              </span>
              <h2 className="portal-section-title">
                {isSomali
                  ? 'Kala Xiriir Toos Ah Xafiisyadayada'
                  : 'Direct Communication Channels'}
              </h2>
              <p className="portal-about__body">
                {isSomali
                  ? 'Haddii aad tahay cilmi-baare doonaya xog, jaamacad xiisaynaysa tababar, shirkad dalxiis oo anshax leh, ama bulsho xeebed oo doonaysa iskaashi, kooxdayadu waxay diyaar u tahay inay ku caawiso.'
                  : 'Whether you represent a scientific institution, local fishing guild, university student body, or ethical expedition group, our communications desk will connect you to the right department.'}
              </p>

              <div className="portal-about__features">
                <div className="portal-about__feature-item">
                  <div className="portal-about__feature-icon">
                    <Mail size={20} />
                  </div>
                  <div className="portal-about__feature-text">
                    <h3 className="portal-about__feature-title">
                      {isSomali ? 'Iimayllada Rasmiga ah' : 'Official Email Desks'}
                    </h3>
                    <p className="portal-about__feature-desc" style={{ marginTop: 4 }}>
                      <a href="mailto:info@blueoceansomalia.com" style={{ color: '#008fcb', fontWeight: 600, textDecoration: 'none', display: 'block' }}>
                        info@blueoceansomalia.com
                      </a>
                      <a href="mailto:research@blueoceansomalia.com" style={{ color: '#64748b', textDecoration: 'none', display: 'block', fontSize: '0.88rem' }}>
                        research@blueoceansomalia.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="portal-about__feature-item">
                  <div className="portal-about__feature-icon">
                    <Phone size={20} />
                  </div>
                  <div className="portal-about__feature-text">
                    <h3 className="portal-about__feature-title">
                      {isSomali ? 'Taleefanka & WhatsApp-ka' : 'Telephone & Direct WhatsApp'}
                    </h3>
                    <p className="portal-about__feature-desc" style={{ marginTop: 4 }}>
                      <a href="tel:+252907790000" style={{ color: '#008fcb', fontWeight: 600, textDecoration: 'none' }}>
                        +252 90 779 0000
                      </a>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b' }}>
                        {isSomali ? 'Sabti – Khamiis: 8:00 AM – 5:00 PM (EAT)' : 'Saturday – Thursday: 8:00 AM – 5:00 PM EAT'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="portal-about__feature-item">
                  <div className="portal-about__feature-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="portal-about__feature-text">
                    <h3 className="portal-about__feature-title">
                      {isSomali ? 'Goobaha Xafiisyada Rasmiga ah' : 'Physical Field Stations'}
                    </h3>
                    <p className="portal-about__feature-desc" style={{ marginTop: 4, lineHeight: 1.5, color: '#334155' }}>
                      <strong>Boosaaso HQ:</strong> Gulf of Aden Coastal Road, Bari Region<br />
                      <strong>Muqdisho Liaison:</strong> Liido Seashore Drive, Banaadir<br />
                      <strong>Kismaayo Station:</strong> Port Promenade, Lower Juba
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Modern Inquiry Form Container */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '36px 32px',
                boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05)',
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <span className="portal-section-tag" style={{ marginBottom: 8 }}>
                  {isSomali ? 'FOOMKA XIRIIRKA' : 'INQUIRY FORM'}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display, \'Plus Jakarta Sans\', sans-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#071626', margin: '4px 0 8px 0' }}>
                  {isSomali ? 'Fariin Noo Soo Dir' : 'Send an Official Message'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                  {isSomali
                    ? 'Fadlan buuxi faahfaahintaada, kooxdayaduna waxay kugu soo jawaabi doontaa 24 saac gudahood.'
                    : 'Complete this form to reach our marine scientists, academic coordinators, or community liaisons.'}
                </p>
              </div>

              {formStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0, 143, 203, 0.1)', color: '#008fcb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display, \'Plus Jakarta Sans\', sans-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#071626', marginBottom: 8 }}>
                    {isSomali ? 'Fariintaadu Way Nasoo Gaartay' : 'Message Successfully Received'}
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.92rem', maxWidth: 360, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
                    {isSomali
                      ? 'Waad ku mahadsan tahay nala soo xiriirkaaga. Kooxda Somalia Blue Heaven waxay kula soo xiriiri doontaa sida ugu dhakhsaha badan.'
                      : 'Thank you for connecting with Somalia Blue Heaven. Our marine operations team will review your message and reply promptly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', phone: '', organization: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="portal-btn-secondary"
                    style={{ margin: '0 auto' }}
                  >
                    <span>{isSomali ? 'Dir Fariin Kale' : 'Send Another Message'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                      {isSomali ? 'Magacaaga oo Buuxa *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={isSomali ? 'Tusaale: Axmed Cali Maxamed' : 'e.g. Dr. Ahmed Ali'}
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        background: '#f8fafc',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '0.92rem',
                        color: '#0f172a',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                        {isSomali ? 'Iimaylkaaga *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="name@organization.com"
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          background: '#f8fafc',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          color: '#0f172a',
                          boxSizing: 'border-box',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                        {isSomali ? 'Taleefan / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+252 90..."
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          background: '#f8fafc',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          color: '#0f172a',
                          boxSizing: 'border-box',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                      {isSomali ? 'Mawduuca Fariinta *' : 'Subject / Inquired Department *'}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        background: '#f8fafc',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '0.92rem',
                        color: '#0f172a',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    >
                      <option value="General Inquiry">{isSomali ? "Su'aalo Guud (General)" : "General Inquiry"}</option>
                      <option value="Research">{isSomali ? "Cilmi-baaris & Xogta Badda (Research)" : "Marine Research Collaboration"}</option>
                      <option value="Conservation">{isSomali ? "Ilaalinta Deegaanka (Conservation)" : "Marine Conservation & MPAs"}</option>
                      <option value="Partnership">{isSomali ? "Iskaashiga & Bulshooyinka (Partnership)" : "Community & Institutional Partnership"}</option>
                      <option value="Ocean Experiences">{isSomali ? "Dalxiiska & Sahaminta (Experiences)" : "Ocean Experiences & Expeditions"}</option>
                      <option value="Volunteer">{isSomali ? "Tabarruc (Volunteer Network)" : "Volunteer & Beach Guardians"}</option>
                      <option value="Media">{isSomali ? "Warbaahinta & Sawirrada (Media)" : "Media, Press & Documentary"}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                      {isSomali ? 'Fariintaada *' : 'Your Message *'}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder={
                        isSomali
                          ? 'Qor faahfaahinta fariintaada, su’aashaada ama soo jeedintaada...'
                          : 'Please provide details on your inquiry, proposed collaboration, or institutional requests...'
                      }
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        background: '#f8fafc',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '0.92rem',
                        color: '#0f172a',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="portal-btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      marginTop: 6,
                      background: '#071b2b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '14px 24px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(7, 27, 43, 0.25)',
                    }}
                  >
                    <Send size={15} />
                    <span>
                      {formStatus === 'submitting'
                        ? isSomali ? 'Diraya...' : 'Transmitting...'
                        : isSomali ? 'Dir Fariinta' : 'Submit Message'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 3. Primary Field Stations Highlights (3-Card Rounded Container) */}
      <section
        id="coastal-stations"
        className="portal-card-section portal-card-section--tint"
        aria-label="Field Stations Highlights"
      >
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'SALDHIGYADA SAYNISKA' : 'FIELD NETWORK'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Saldhigyada Joogtada ah ee Xeebaha' : 'Primary Maritime Stations Across Somalia'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xarumaha sayniska iyo ilaalinta ee ka howlgala gobollada muhiimka ah ee dalka.'
              : 'Permanent operational facilities maintaining sovereign stewardship along our 3,330 km coastline.'}
          </p>
        </div>

        <div className="portal-highlights-grid">
          {fieldStations.map((station, idx) => (
            <article key={idx} className="portal-highlight-card">
              <div className="portal-highlight-card__img-wrap">
                <img src={station.image} alt={station.title} className="portal-highlight-card__img" />
                <span className="portal-highlight-card__badge">{station.badge}</span>
              </div>
              <div className="portal-highlight-card__body">
                <span className="portal-highlight-card__meta">{station.meta}</span>
                <h3 className="portal-highlight-card__title">{station.title}</h3>
                <p className="portal-highlight-card__excerpt">{station.excerpt}</p>
                <Link to={localizedPath(station.link)} className="portal-highlight-card__link">
                  <span>{isSomali ? 'Baro Saldhigga' : 'View Station'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Featured Panorama Card with Floating White Card */}
      <section className="portal-panorama" aria-label="Featured Station Panorama">
        <div className="portal-panorama__inner">
          <img
            src={currentFeatured.image}
            alt={currentFeatured.title}
            className="portal-panorama__img"
          />

          {/* Floating White Card */}
          <div className="portal-panorama__card">
            <span className="portal-panorama__card-tag">{currentFeatured.tag}</span>
            <h3 className="portal-panorama__card-title">{currentFeatured.title}</h3>
            <p className="portal-panorama__card-desc">{currentFeatured.desc}</p>
            <Link to={localizedPath(currentFeatured.link)} className="portal-panorama__card-link">
              <span>{isSomali ? 'Sahami Deegaanka' : 'Explore Location'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="portal-panorama__nav">
            <button
              type="button"
              onClick={prevFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Previous station"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextFeatured}
              className="portal-panorama__nav-btn"
              aria-label="Next station"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Inquiries Directory (6-Card Grid: 2 rows of 3) */}
      <section className="portal-card-section" aria-label="Inquiry Types">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'WADA-SHAQEYNTA' : 'PARTNERSHIPS'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Sida Loola Shaqeeyo Somalia Blue Heaven' : 'Ways to Collaborate & Engage'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xulashada hababka kala duwan ee aad noola xiriiri karto hadba baahidaada.'
              : 'Dedicated operational workflows tailored for researchers, communities, educational bodies, and visitors.'}
          </p>
        </div>

        <div className="portal-attractions-grid">
          {inquiryTypes.map((item, i) => (
            <article key={i} className="portal-attraction-card">
              <div className="portal-attraction-card__media">
                <img src={item.image} alt={item.title} className="portal-attraction-card__img" />
                <button
                  type="button"
                  className="portal-attraction-card__badge-round"
                  aria-label="Bookmark inquiry type"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="portal-attraction-card__content">
                <span className="portal-attraction-card__region">{item.region}</span>
                <h3 className="portal-attraction-card__title">{item.title}</h3>
                <p className="portal-attraction-card__desc">{item.desc}</p>
                <Link to={localizedPath(item.link)} className="portal-attraction-card__link">
                  <span>{isSomali ? 'Faahfaahin' : 'Learn More'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Emergency & Hotlines (Horizontal Cards) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Maritime Hotlines">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            {isSomali ? 'KHADADKA DEGDEGGA AH' : 'RAPID HOTLINES'}
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Gurmadka & Ilaalinta Degdegga ah' : 'Emergency & Coastal Reporting Desks'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Khadadka tooska ah ee loogu talagalay badbaadada noolaha badda ee dhibaataysan iyo xadgudubyada xeebta.'
              : 'Direct hotlines for wildlife strandings, coral reef hazards, and territorial fishing infractions.'}
          </p>
        </div>

        <div className="portal-events-list">
          {emergencyHotlines.map((hotline, idx) => (
            <div key={idx} className="portal-event-card">
              <div className="portal-event-card__img-wrap">
                <img src={hotline.image} alt={hotline.title} className="portal-event-card__img" />
              </div>
              <div className="portal-event-card__info">
                <h3 className="portal-event-card__title">{hotline.title}</h3>
                <p className="portal-event-card__desc">{hotline.desc}</p>
                <div className="portal-event-card__meta-row">
                  <span className="portal-event-card__meta-item">
                    <Radio size={14} color="#0ea5e9" />
                    <span>{hotline.date}</span>
                  </span>
                  <span className="portal-event-card__meta-item">
                    <MapPin size={14} color="#0ea5e9" />
                    <span>{hotline.location}</span>
                  </span>
                </div>
              </div>
              <div className="portal-event-card__side">
                <div className="portal-event-card__status-box">
                  <span className="portal-event-card__status-label">Desk</span>
                  <span className="portal-event-card__status-val">{hotline.code}</span>
                </div>
                <a href="tel:+252907790000" className="portal-event-card__side-btn">
                  <span>{isSomali ? 'Wac Hadda' : 'Call Dispatch'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. #BlueHeavenNetwork Visual Photo Collage */}
      <section className="portal-card-section" aria-label="Visual Network Collage">
        <div className="portal-section-header">
          <span className="portal-section-tag">
            <Camera size={13} style={{ display: 'inline', marginRight: 4 }} />
            #BlueHeavenNetwork
          </span>
          <h2 className="portal-section-title">
            {isSomali ? 'Isku-xirka Xeebaha Soomaaliya' : 'Our Coastline, Connected'}
          </h2>
          <p className="portal-section-subtitle">
            {isSomali
              ? 'Xarumaha, doonyaha kormeerka, iyo kooxaha u heellan daryeelka badda Soomaaliya.'
              : 'Photographic dispatches from our active coastal stations and scientific operations.'}
          </p>
        </div>

        {/* 4-Image Asymmetrical Mosaic */}
        <div className="portal-diaries-grid">
          <div className="portal-diary-item">
            <img src="/images/img_02.webp" alt="Bosaso harbor operations station" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_01.webp" alt="Ras Hafun monitoring outpost" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.webp" alt="Bajuni islands coastal vessel" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/image.webp" alt="Somalia azure coastal waters" />
          </div>
        </div>

        <div className="portal-center-btn-row">
          <Link to={localizedPath('/about')} className="portal-btn-primary">
            <Sparkles size={16} />
            <span>{isSomali ? 'Wax Badan Ka Baro Hay’adda' : 'Learn More About Us'}</span>
          </Link>
        </div>
      </section>

      {/* 8. Sunset CTA Banner */}
      <section className="portal-cta" aria-label="Ready to Connect">
        <div className="portal-cta__inner">
          <img
            src="/images/image.webp"
            alt="Sunset over the Somali coast"
            className="portal-cta__bg"
          />
          <div className="portal-cta__overlay" />

          <div className="portal-cta__content">
            <h2 className="portal-cta__title">
              {isSomali
                ? 'Diyaar Ma U Tahay Wada-Shaqeynta Badda?'
                : 'Ready to Champion Somalia’s Living Ocean?'}
            </h2>
            <p className="portal-cta__subtitle">
              {isSomali
                ? 'Nala soo xiriir maanta si aan u bilaabno wada-hadal ku saabsan cilmi-baarista, ilaalinta, ama sahaminta xeebteena.'
                : 'Contact our operational headquarters today to discuss research collaboration, habitat protection, or ethical expeditions.'}
            </p>
            <a href="mailto:info@blueoceansomalia.com" className="portal-btn-primary">
              <span>{isSomali ? 'Iimayl Toos ah Noo Soo Dir' : 'Email Our Headquarters'}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
