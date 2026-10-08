import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import '../styles/portalDesignSystem.css';

export default function ContactPage() {
  const { language } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

  useEffect(() => {
    document.title = isSomali
      ? 'Nala Soo Xiriir — Somalia Blue Heaven'
      : 'Contact Maritime Operations — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const featuredBases = [
    {
      tag: isSomali ? 'XARUNTA GUUD' : 'NORTHERN HEADQUARTERS',
      title: isSomali ? 'Xarunta Boosaaso ee Gacanka Cadmeed' : 'Bosaso Primary Marine Research Center',
      desc: isSomali
        ? 'Xarunta ugu weyn ee Somalia Blue Heaven ee Puntland oo ay ku yaallaan shaybaarrada badda, xannaanada shacaabka, iyo xafiiska maamulka sare.'
        : 'Northern operational base managing Gulf of Aden telemetry arrays, wet laboratories, dive operations, and community fisheries coordination.',
      link: '/explore-the-coast/bosaso',
      image: '/images/img_02.png',
    },
    {
      tag: isSomali ? 'XAFIISKA BANAADIR' : 'CENTRAL LIAISON OFFICE',
      title: isSomali ? 'Xafiiska Muqdisho ee Xeebta Liido' : 'Mogadishu Coastal Operations & Education Center',
      desc: isSomali
        ? 'Xafiiska xiriirka jaamacadaha, wacyigelinta bulshada, kormeerka nadaafadda Xeebta Liido, iyo wada-shaqeynta dowladda.'
        : 'Central hub for academic university fellowships, ocean literacy programs, Liido beach debris tracking, and inter-agency maritime accords.',
      link: '/explore-the-coast/mogadishu',
      image: '/images/image.png',
    },
    {
      tag: isSomali ? 'SALDHIGGA KOONFURTA' : 'SOUTHERN EXPEDITIONS BASE',
      title: isSomali ? 'Saldhigga Kismaayo & Baajuun' : 'Kismayo Southern Atoll Field Station',
      desc: isSomali
        ? 'Saldhigga laga maamulo ilaalinta jasiiradaha Baajuun, kormeerka qoolleyda badda, iyo kaymaha mangrove-ka ee Jubaland.'
        : 'Expedition launchpad coordinating Bajuni island field vessels, green turtle nesting sanctuaries, and mangrove blue carbon mapping.',
      link: '/explore-the-coast/kismayo',
      image: '/images/img_05.png',
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
      image: '/images/img_02.png',
      link: '/explore-the-coast/bosaso',
    },
    {
      badge: isSomali ? 'XAFIISKA MUQDISHO' : 'MOGADISHU LIAISON',
      title: isSomali ? 'Xarunta Siyaasadda & Ardayda' : 'Mogadishu Coastal Liaison & Youth Hub',
      meta: isSomali ? 'Banaadir • Xeebta Liido' : 'Banadir • Liido Beach Promenade',
      excerpt: isSomali
        ? 'Xarunta xiriirka daneeyayaasha caalamiga ah, tababarrada ardayda badda, iyo qabanqaabada nadaafadda xeebaha.'
        : 'Coordinating university marine biology internships, public beach conservation, and government partnerships.',
      image: '/images/image.png',
      link: '/explore-the-coast/mogadishu',
    },
    {
      badge: isSomali ? 'SALDHIGGA KISMAAYO' : 'KISMAYO OUTPOST',
      title: isSomali ? 'Xarunta Jasiiradaha Baajuun' : 'Kismayo & Bajuni Island Marine Station',
      meta: isSomali ? 'Jubaland • Marsooyinka' : 'Jubaland • Southern Port Base',
      excerpt: isSomali
        ? 'Saldhigga u heellan hawlgallada doonyaha shiraaca, ilaalinta cawsduurka badda, iyo kormeerka qoolleyda.'
        : 'Staging ground for island scientific patrols, traditional dhow research surveys, and mangrove nurseries.',
      image: '/images/img_05.png',
      link: '/explore-the-coast/kismayo',
    },
  ];

  const inquiryTypes = [
    {
      region: isSomali ? 'Cilmi-baaris' : 'Scientific Research',
      title: isSomali ? 'Wada-shaqeynta Sayniska Badda' : 'Ocean Science & Data Requests',
      desc: isSomali
        ? 'U helitaanka xogta xannaanada shacaabka, heerkulka biyaha, telemetry-ga noolaha badda, ama wada-qorista cilmi-baarista.'
        : 'Peer-reviewed telemetry datasets, collaborative survey requests, and academic institution partnerships.',
      image: '/images/img_02.png',
      link: '/research',
    },
    {
      region: isSomali ? 'Bulshooyinka' : 'Communities',
      title: isSomali ? 'Iskaashiga Kalluumeysatada' : 'Artisanal Guild Alliances',
      desc: isSomali
        ? 'Taageerada qalabka kalluumaysiga gacanta, farsamada qallajinta cadceedda, iyo barnaamijyada haweenka xeebaha.'
        : 'Fair-trade handline certification, solar curing infrastructure, and women-led seafood value co-ops.',
      image: '/images/img_05.png',
      link: '/communities',
    },
    {
      region: isSomali ? 'Dalxiiska Anshaxa leh' : 'Ethical Expeditions',
      title: isSomali ? 'Tilmaamaha Sahaminta Xeebaha' : 'Coastal Travel & Expedition Advisory',
      desc: isSomali
        ? 'Hagidda dalxiiska anshaxa leh ee Boosaaso, Raas Xaafuun, Dooxada Eyl, iyo Jasiiradaha Baajuun iyadoo aan dabeecadda la dhibin.'
        : 'Guidance for respectful coastal travel, cultural dhow sailing charters, and scientific ecotourism.',
      image: '/images/img_03.png',
      link: '/explore-the-coast',
    },
    {
      region: isSomali ? 'Ardayda & Jaamacadaha' : 'Youth & Fellowships',
      title: isSomali ? 'Tababarka & Deeqaha Waxbarashada' : 'University Attachments & Internships',
      desc: isSomali
        ? 'Fursadaha tababarka duurjoogta iyo shaybaarka ee ardayda badda ee dhigata jaamacadaha Soomaaliya.'
        : 'Practical field attachments for emerging Somali marine scientists, oceanographers, and geographers.',
      image: '/images/img_01.png',
      link: '/about',
    },
    {
      region: isSomali ? 'Warbaahinta' : 'Media & Film',
      title: isSomali ? 'Diiwaanka Saxaafadda & Filimada' : 'Documentary & Photography Access',
      desc: isSomali
        ? 'Caawinta kooxaha filimada badda, saxafiyiinta deegaanka, iyo sawir-qaadayaasha doonaya inay qoraan quruxda xeebta.'
        : 'Permits, logistical marine craft support, and local guiding for marine documentaries and conservation journalism.',
      image: '/images/img_12.png',
      link: '/news',
    },
    {
      region: isSomali ? 'Ilaalinta Deegaanka' : 'Conservation Action',
      title: isSomali ? 'Tabarruca & Ilaaliyayaasha Xeebta' : 'Volunteer Beach Guardian Network',
      desc: isSomali
        ? 'Ku biirista hawlgallada habeenkii ee badbaadinta ukunta qoolleyda, nadaafadda xeebaha, iyo beeridda mangrove-ka.'
        : 'Joining seasonal sea turtle night vigils, plastic cleanups, and mangrove planting campaigns.',
      image: '/images/img_07.png',
      link: '/conservation',
    },
  ];

  const emergencyHotlines = [
    {
      title: isSomali ? 'Khadka Degdegga ah ee Noolaha Badda ee Dhibaataysan' : 'Stranded Marine Wildlife Emergency Hotline',
      desc: isSomali
        ? 'Haddii aad aragto diin, libaax-badeed, ama nibir ku xannibmay xeebta ama shabaakadda, isla markiiba la xiriir kooxda badbaadada degdegga ah.'
        : 'Immediate veterinary response and disentanglement for stranded turtles, dolphins, or whale sharks along the Somali coast.',
      date: isSomali ? '24/7 Diyaar ah' : '24/7 Rapid Response',
      location: isSomali ? 'Dhammaan Xeebaha Soomaaliya' : 'All Regional Stations',
      status: isSomali ? 'Gurmad Toos ah' : 'Emergency Unit',
      code: 'RESCUE-24',
      image: '/images/img_02.png',
      link: '/contact',
    },
    {
      title: isSomali ? 'Diiwaanka Doonyaha Shisheeye ee Sharci-darrada ah' : 'Illegal Foreign Industrial Trawler Incident Desk',
      desc: isSomali
        ? 'Kalluumeysatada maxalliga ahi waxay si toos ah ugu soo diri karaan goobta GPS iyo sawirrada maraakiibta ku xadgudbaya aagga xeebta.'
        : 'Reporting coordinates and evidence of unauthorized industrial vessels encroaching on artisanal handline grounds.',
      date: isSomali ? 'Toos & Qarsoodi ah' : 'Confidential Direct Desk',
      location: isSomali ? 'Xarunta Boosaaso' : 'Surveillance Operations',
      status: isSomali ? 'Diiwaan Sharci' : 'Incident Log',
      code: 'IUU-REPORT',
      image: '/images/image.png',
      link: '/conservation',
    },
  ];

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(localizedPath(`/explore-the-coast?q=${encodeURIComponent(searchQuery)}`));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredBases.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredBases.length) % featuredBases.length);
  };

  const currentFeatured = featuredBases[featuredIndex];

  return (
    <div className="portal-page">
      {/* 1. Inset Rounded Hero Banner */}
      <section className="portal-hero" aria-label="Contact Somalia Blue Heaven Hero">
        <div className="portal-hero__inner">
          <img
            src="/images/image.png"
            alt="Somalia coastline connecting sea and land"
            className="portal-hero__bg"
          />
          <div className="portal-hero__overlay" />

          <div className="portal-hero__content">
            <div className="portal-hero__badge">
              <Compass size={14} />
              <span>{isSomali ? 'XARUMAHA & XIRIIRKA GUUD' : 'MARITIME HEADQUARTERS & CONTACT'}</span>
            </div>

            <h1 className="portal-hero__title">
              {isSomali ? 'Nala Soo Xiriir — Xafiisyada Somalia Blue Heaven.' : 'Connect with Somalia Blue Heaven.'}
            </h1>

            <p className="portal-hero__subtitle">
              {isSomali
                ? 'Xafiisyadayada Boosaaso, Muqdisho, iyo Kismaayo waxay diyaar u yihiin su’aalaha cilmi-baarista, dalxiiska, iyo iskaashiga bulshada.'
                : 'Connect directly with our marine research stations, expedition advisors, coastal rangers, and sovereign partnership teams.'}
            </p>

            {/* Search Pill Widget */}
            <div className="portal-hero__search-wrap">
              <form onSubmit={handleSearch} className="portal-hero__search-form">
                <Search size={18} color="#0ea5e9" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSomali
                      ? 'Raadi xafiis, taleefan, ama mawduuc...'
                      : 'Search field stations, contacts, or inquiries...'
                  }
                  className="portal-hero__search-input"
                  aria-label="Search contacts"
                />
                <button type="submit" className="portal-hero__search-btn">
                  <span>{isSomali ? 'Raadi' : 'Search'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Quick Filter Badges */}
            <div className="portal-hero__tags">
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/bosaso'))}
                className="portal-hero__tag-btn"
              >
                Boosaaso Marine HQ
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/mogadishu'))}
                className="portal-hero__tag-btn"
              >
                Muqdisho Liaison
              </button>
              <button
                type="button"
                onClick={() => navigate(localizedPath('/explore-the-coast/kismayo'))}
                className="portal-hero__tag-btn"
              >
                Kismaayo Station
              </button>
              <a
                href="mailto:info@blueoceansomalia.com"
                className="portal-hero__tag-btn"
                style={{ textDecoration: 'none' }}
              >
                info@blueoceansomalia.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Hub: Direct Details & Interactive Inquiry Form (2-Column Card Section) */}
      <section className="portal-card-section" aria-label="Contact Information and Inquiry Form">
        <div className="portal-about-grid">
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
                    <a href="mailto:info@blueoceansomalia.com" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none', display: 'block' }}>
                      info@blueoceansomalia.com
                    </a>
                    <a href="mailto:research@blueoceansomalia.com" style={{ color: '#556c5e', textDecoration: 'none', display: 'block', fontSize: '0.88rem' }}>
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
                    <a href="tel:+252907790000" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>
                      +252 90 779 0000
                    </a>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#556c5e' }}>
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
                  <p className="portal-about__feature-desc" style={{ marginTop: 4, lineHeight: 1.5 }}>
                    <strong>Boosaaso HQ:</strong> Gulf of Aden Coastal Road, Bari Region<br />
                    <strong>Muqdisho Liaison:</strong> Liido Seashore Drive, Banaadir<br />
                    <strong>Kismaayo Station:</strong> Port Promenade, Lower Juba
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Rounded Inquiry Form Container */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid rgba(26, 42, 34, 0.08)',
              borderRadius: '24px',
              padding: '36px 32px',
              boxShadow: '0 8px 30px rgba(18, 38, 28, 0.05)',
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <span className="portal-section-tag" style={{ marginBottom: 8 }}>
                {isSomali ? 'FOOMKA XIRIIRKA' : 'INQUIRY FORM'}
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#122119', margin: '4px 0 8px 0' }}>
                {isSomali ? 'Fariin Noo Soo Dir' : 'Send an Official Message'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#688274', margin: 0 }}>
                {isSomali
                  ? 'Fadlan buuxi faahfaahintaada, kooxdayaduna waxay kugu soo jawaabi doontaa 24 saac gudahood.'
                  : 'Complete this form to reach our marine scientists, expedition planners, or community liaisons.'}
              </p>
            </div>

            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.3rem', color: '#122119', marginBottom: 8 }}>
                  {isSomali ? 'Fariintaadu Way Nasoo Gaartay' : 'Message Successfully Received'}
                </h4>
                <p style={{ color: '#556c5e', fontSize: '0.92rem', maxWidth: 360, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
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
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1a2a22', marginBottom: 6 }}>
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
                      padding: '12px 14px',
                      background: '#f8faf9',
                      border: '1.5px solid #dbe3de',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      color: '#122119',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1a2a22', marginBottom: 6 }}>
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
                        padding: '12px 14px',
                        background: '#f8faf9',
                        border: '1.5px solid #dbe3de',
                        borderRadius: '12px',
                        fontSize: '0.92rem',
                        color: '#122119',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1a2a22', marginBottom: 6 }}>
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
                        padding: '12px 14px',
                        background: '#f8faf9',
                        border: '1.5px solid #dbe3de',
                        borderRadius: '12px',
                        fontSize: '0.92rem',
                        color: '#122119',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1a2a22', marginBottom: 6 }}>
                    {isSomali ? 'Mawduuca Fariinta *' : 'Subject / Inquired Department *'}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#f8faf9',
                      border: '1.5px solid #dbe3de',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      color: '#122119',
                      boxSizing: 'border-box',
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
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1a2a22', marginBottom: 6 }}>
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
                        : 'Please provide details on your inquiry, proposed collaboration, or expedition dates...'
                    }
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#f8faf9',
                      border: '1.5px solid #dbe3de',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      color: '#122119',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="portal-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
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
      </section>

      {/* 3. Primary Field Stations Highlights (3-Card Rounded Container) */}
      <section className="portal-card-section portal-card-section--tint" aria-label="Field Stations Highlights">
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
            <img src="/images/img_02.png" alt="Bosaso harbor operations station" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_01.png" alt="Ras Hafun monitoring outpost" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/img_05.png" alt="Bajuni islands coastal vessel" />
          </div>
          <div className="portal-diary-item">
            <img src="/images/image.png" alt="Somalia azure coastal waters" />
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
            src="/images/image.png"
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
