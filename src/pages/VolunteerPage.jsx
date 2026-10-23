import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, CheckCircle2, X, Sparkles, Info, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import EnquiryForm from '../components/shared/EnquiryForm';
import { submitApplication } from '../lib/dashboardApi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './SpeciesDirectoryPage.css';
import '../components/experiences/ExperienceCard.css';
import '../components/experiences/ExperienceGrid.css';
import '../components/shared/EnquiryForm.css';
import './GetInvolvedCards.css';

const VOLUNTEER_ROLES = [
  {
    id: 'coral-reef-diver',
    title: 'Coral Reef & Seagrass Survey Diver',
    titleSo: 'Quusiyaha Sahminta Dhagax-madheedhka & Caws-badeedka',
    interestCategory: 'Research',
    location: 'Bajuni Archipelago & Kismayo',
    locationSo: 'Jasiiradaha Baajuuniga & Kismaayo',
    commitment: '2–4 weeks (Expedition cycles)',
    commitmentSo: '2–4 toddobaad (Wareegyada Socdaalka)',
    image: '/exp_scuba_diving.webp',
    summary: 'Join our scientific research team in benthic surveys, coral bleaching assessments, and seagrass transect documentation.',
    summarySo: 'Ku biir kooxdayada cilmi-baarista ee sahminaya caafimaadka dhagax-madheedhka iyo xaaladda caws-badeedka.',
    responsibilities: [
      'Conduct underwater transect surveys using photographic quadrat protocols.',
      'Log benthic biodiversity data and fish biomass estimates.',
      'Assist senior marine biologists with sea surface temperature sensor deployments.',
      'Coordinate gear maintenance and post-dive data uploads.'
    ],
    requirements: [
      'PADI Advanced Open Water (or CMAS equivalent) with 30+ logged dives.',
      'Comfortable swimming in moderate coastal currents.',
      'Previous marine biology or citizen-science experience preferred.',
      'Commitment to reef-friendly, leave-no-trace diving ethics.'
    ],
    benefits: [
      'Full accommodation and vessel meals during expedition weeks.',
      'Official Somalia Blue Heaven Scientific Research Diver certification.',
      'Hands-on training in western Indian Ocean coral taxonomy.'
    ]
  },
  {
    id: 'sea-turtle-guardian',
    title: 'Sea Turtle Nest Guardian',
    titleSo: 'Ilaaliyaha Buulasha Diindiinka Badda',
    interestCategory: 'Conservation',
    location: 'Warsheikh & Cadale Beaches',
    locationSo: 'Xeebaha Warsheekh & Cadale',
    commitment: 'Weekend shifts / 1 month seasonal rotation',
    commitmentSo: 'Dhammaadka usbuuca / 1 bil inta lagu jiro xilliga ukumaynta',
    image: '/images/img_08.webp',
    summary: 'Patrol critical nesting beaches at night to protect green and hawksbill turtles, track clutch coordinates, and assist hatchlings.',
    summarySo: 'Ilaali xeebaha muhiimka ah habeenkii si loo ilaaliyo diindiinka badda ee halista ku jira iyo ukumahooda.',
    responsibilities: [
      'Conduct nightly shoreline sweeps with red-light torches to locate nesting turtles.',
      'GPS-tag clutch locations and install predator deterrent netting.',
      'Assist stranded or disoriented hatchlings on their seaward journey.',
      'Engage with local fishing families and educate beach visitors.'
    ],
    requirements: [
      'Ability to walk 5–8 km along sandy shorelines at night.',
      'High attention to detail and patience with wildlife.',
      'Passion for endangered marine species protection.',
      'Basic Somali language skills for community engagement.'
    ],
    benefits: [
      'Direct hands-on experience in sea turtle conservation biology.',
      'Field gear provided (night headlamps, survey logbooks, waterproof kit).',
      'Letter of commendation and certificate of coastal stewardship.'
    ]
  },
  {
    id: 'ghost-net-cleaner',
    title: 'Ghost-Net Retrieval & Marine Debris Crew',
    titleSo: 'Kooxda Soo Saarista Shabaagaha Luntay & Qashinka Badda',
    interestCategory: 'Community',
    location: 'Mogadishu & Liido Coastal Strip',
    locationSo: 'Muqdisho & Xeebta Liido',
    commitment: 'Bi-weekly weekend cleanups',
    commitmentSo: 'Labadii toddobaadba mar dhammaadka usbuuca',
    image: '/images/img_01.webp',
    summary: 'Coordinate with artisanal fishers and youth clubs to remove abandoned drift-nets and plastics choking shallow reefs.',
    summarySo: 'La shaqee kalluumaysatada iyo dhallinyarada deegaanka si looga saaro shabaagaha halista ah iyo bacaha qashinka.',
    responsibilities: [
      'Free entangled marine life from discarded monofilament fishing gear.',
      'Catalog and weigh collected marine debris according to national survey protocol.',
      'Coordinate public sorting hubs and plastic recycling handoffs.',
      'Distribute biodegradable catch bags to local coastal fishers.'
    ],
    requirements: [
      'Enthusiasm for outdoor community action.',
      'Good teamwork and communication skills.',
      'Snorkeling skills welcome for shallow water net retrieval; non-swimmers welcome for shore sorting.',
      'No previous experience required — training provided on site.'
    ],
    benefits: [
      'Community leadership and event management experience.',
      'Protective gear, gloves, cutting tools, and hydration provided.',
      'Direct visible transformation of local public shorelines.'
    ]
  },
  {
    id: 'youth-marine-educator',
    title: 'Youth Marine Educator & School Ambassador',
    titleSo: 'Macallinka Barnaamijyada Badda ee Dhallinyarada',
    interestCategory: 'Education',
    location: 'Berbera & Bosaso Hubs',
    locationSo: 'Xarumaha Berbera & Boosaaso',
    commitment: '4–6 hours per week (Academic terms)',
    commitmentSo: '4–6 saacadood usbuucii (Muddada waxbarashada)',
    image: '/images/img_12.webp',
    summary: 'Bring the wonders of the Somali ocean into classrooms through mobile touch-tanks, interactive workshops, and beach field trips.',
    summarySo: 'Gaadhsii ardayda dugsiyada aqoonta iyo mucjisooyinka badda Soomaaliya adigoo adeegsanaya casharro tijaabo ah.',
    responsibilities: [
      'Facilitate interactive marine ecology modules in primary and secondary schools.',
      'Lead guided low-tide rock pool discovery tours for students.',
      'Create bilingual educational flashcards and activity worksheets.',
      'Host monthly ocean science film screenings and quizzes.'
    ],
    requirements: [
      'Excellent verbal presentation skills in Somali and basic English.',
      'Background or strong interest in education, biology, or communication.',
      'Enthusiasm for inspiring children and young adults.',
      'Reliable time management and friendly personality.'
    ],
    benefits: [
      'Formal teacher-training certificate in environmental science education.',
      'Teaching stipend allowance for travel to participating schools.',
      'Access to SBH scientific library and media collections.'
    ]
  },
  {
    id: 'ocean-telemetry-analyst',
    title: 'Ocean AIS & Satellite Telemetry Analyst',
    titleSo: 'Falanqeeyaha Xogta Dayax-gacmeedka & Socodka Maraakiibta',
    interestCategory: 'Technology',
    location: 'Remote / Hybrid (SBH Data Lab)',
    locationSo: 'Masaafada / Xarunta Xogta SBH',
    commitment: 'Flexible (5–8 hours / week)',
    commitmentSo: 'Fudud (5–8 saacadood usbuucii)',
    image: '/exp_ocean_research.webp',
    summary: 'Analyze satellite AIS maritime feeds, acoustic hydrophone logs, and SST thermal anomalies across the 3,330 km coastline.',
    summarySo: 'Falanqee xogta dayax-gacmeedyada ee socodka maraakiibta badda iyo heerkulka biyaha ee 3,330 km oo xeeb ah.',
    responsibilities: [
      'Process automated AIS feeds to identify vessel movements inside artisanal fishing zones.',
      'Plot acoustic receiver pings tracking tagged whale sharks and pelagic fish.',
      'Generate weekly geospatial heatmaps for our conservation patrol teams.',
      'Assist in maintaining the open-access Somalia Ocean Data portal.'
    ],
    requirements: [
      'Experience with Python, R, or GIS software (QGIS/ArcGIS).',
      'Basic understanding of spatial coordinates and timeseries data.',
      'Interest in maritime surveillance and open-source data.',
      'Self-motivated with strong analytical problem-solving skills.'
    ],
    benefits: [
      'Real-world portfolio contribution to sovereign maritime intelligence.',
      'Co-authorship on annual state-of-the-ocean technical reports.',
      'Remote flexibility with compute resources provided by SBH.'
    ]
  },
  {
    id: 'marine-media-storyteller',
    title: 'Marine Media & Coastal Storyteller',
    titleSo: 'Soo Saare Warbaahinta & Sheekooyinka Xeebta',
    interestCategory: 'Media',
    location: 'Puntland & Jubaland Coastal Hubs',
    locationSo: 'Xeebaha Puntland & Jubaland',
    commitment: 'Expedition-based (2–5 day field shoots)',
    commitmentSo: 'Ku salaysan safarrada shaqada (2–5 maalmood)',
    image: '/images/img_05.webp',
    summary: 'Document traditional maritime culture, coastal women cooperatives, and frontline biodiversity expeditions through photo and video.',
    summarySo: 'Duub sawirro iyo fiidiyowyo tayo sare leh oo muujinaya nolosha xeebta, ilaalinta badda, iyo dhaqanka badda.',
    responsibilities: [
      'Capture high-resolution imagery and video during research cruises and community events.',
      'Interview artisanal fishers, elder navigators, and youth conservationists.',
      'Produce short-form social reels and mini-documentaries for public awareness.',
      'Curate image archives with comprehensive metadata and captions.'
    ],
    requirements: [
      'Demonstrated portfolio in documentary photography, videography, or sound recording.',
      'Comfortable working aboard small watercraft in open sea conditions.',
      'Respectful and culturally attuned interviewing skills.',
      'Basic video editing abilities (Premiere Pro, DaVinci Resolve, or Final Cut).'
    ],
    benefits: [
      'Access to exclusive offshore expeditions and remote islands.',
      'Broad international media exposure and creator credits on SBH publications.',
      'Expedition travel, lodging, and production stipend covered.'
    ]
  }
];

export default function VolunteerPage() {
  useScrollReveal();
  const { token } = useAuth();
  const { language } = useLanguage();
  const isSomali = language === 'so';

  const [activeModalRole, setActiveModalRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    document.title = isSomali
      ? 'Iskaa Wax U Qabso & Tabarruc — Somalia Blue Heaven'
      : 'Volunteer Opportunities — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const handleApplyFromModal = (role) => {
    setSelectedRole(role);
    setActiveModalRole(null);
    const formElement = document.getElementById('volunteer-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fields = [
    { name: 'name', label: isSomali ? 'Magacaaga' : 'Name', type: 'text', required: true, placeholder: isSomali ? 'Magacaaga oo buuxa' : 'Your full name' },
    { name: 'email', label: isSomali ? 'Iimaylkaaga' : 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
    { name: 'phone', label: isSomali ? 'Telefoonka' : 'Phone', type: 'tel', placeholder: '+252 ...' },
    {
      name: 'interest',
      label: isSomali ? 'Qaybta Aad Xiisaynayso' : 'Area of Interest',
      type: 'select',
      required: true,
      placeholder: isSomali ? 'Dooro qayb' : 'Select an area',
      defaultValue: selectedRole ? selectedRole.interestCategory : '',
      options: ['Research', 'Conservation', 'Education', 'Media', 'Community', 'Technology'],
    },
    {
      name: 'skills',
      label: isSomali ? 'Xirfadaha / Khibradda' : 'Skills / Experience',
      type: 'textarea',
      placeholder: selectedRole
        ? (isSomali ? `Faahfaahin ku saabsan khibraddaada ku aaddan ${selectedRole.titleSo}` : `Relevant qualifications or experience for ${selectedRole.title}`)
        : (isSomali ? 'Xirfadahaaga muhiimka ah, shahaadooyinka, ama khibradihii hore' : 'Relevant skills, certifications, or past experience'),
      fullWidth: true,
    },
    {
      name: 'availability',
      label: isSomali ? 'Waqtiga Aad Furan Tahay' : 'Availability',
      type: 'text',
      placeholder: selectedRole
        ? (isSomali ? `Tusaale: ${selectedRole.commitmentSo}` : `e.g. ${selectedRole.commitment}`)
        : (isSomali ? 'Tusaale: Dhammaadka usbuuca, 3 bilood laga bilaabo Juun' : 'e.g. Weekends, 3 months from June'),
    },
    {
      name: 'message',
      label: isSomali ? 'Farriin Dheeraad ah' : 'Message',
      type: 'textarea',
      placeholder: isSomali ? 'Wax kale oo aad jeclaan lahayd inaan ogaanno?' : 'Anything else we should know?',
      fullWidth: true,
    },
  ];

  return (
    <main id="main-content" className="volunteer-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to={`/${language}/get-involved`} className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>{isSomali ? 'Dib ugu Noqo Ka Qayb Qaado' : 'Get Involved'}</span>
            </Link>
          </div>

          <span className="label-text">{isSomali ? 'FURSADAHA TABARRUCA' : 'VOLUNTEER NETWORK'}</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">
            {isSomali ? 'Bixi waqtigaaga iyo aqoontaada badda.' : 'Give your time, skills, and energy.'}
          </h1>
          <p className="species-dir-hero__desc">
            {isSomali
              ? 'Sahmi jagooyinka furan ee iskaa wax u qabso ee ku baahsan 3,330 km oo xeebaha Soomaaliya ah. Guji Faahfaahin kaadh kasta si aad u barato shuruudaha iyo mas’uuliyadaha.'
              : 'Explore open volunteer positions across 3,330 km of Somali coastline. Click Learn More on any card below to review responsibilities, gear support, and submit your application.'}
          </p>
        </div>
      </section>

      <section className="species-dir-content-sec section">
        <div className="container">
          {/* Information Notice */}
          <div className="get-involved-notice">
            <Info size={18} className="get-involved-notice__icon" />
            <span>
              {isSomali
                ? 'Dhammaan tabarrucayaasha waxaa la siiyaa tababar badbaado, qalabka lagama maarmaanka ah, iyo shahaado rasmi ah oo ka socota Somalia Blue Heaven.'
                : 'All volunteer opportunities include comprehensive safety briefings, field kit, and official accreditation from Somalia Blue Heaven.'}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="exp-grid__results get-involved-grid-sec">
            {VOLUNTEER_ROLES.map((role) => {
              const title = isSomali ? role.titleSo : role.title;
              const location = isSomali ? role.locationSo : role.location;
              const commitment = isSomali ? role.commitmentSo : role.commitment;
              const summary = isSomali ? role.summarySo : role.summary;

              return (
                <article
                  key={role.id}
                  className="exp-card track-card"
                  onClick={() => setActiveModalRole(role)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalRole(role);
                    }
                  }}
                  aria-label={`View details for ${title}`}
                >
                  <div className="exp-card__media-wrap">
                    <img src={role.image} alt={title} className="exp-card__img" loading="lazy" />
                    <div className="exp-card__gradient" />

                    <div className="exp-card__top-bar">
                      <span className="exp-card__category-badge">{role.interestCategory}</span>
                      <span className="badge exp-card__status-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#86EFAC', border: '1px solid rgba(34, 197, 94, 0.35)' }}>
                        <Sparkles size={11} />
                        <span>{isSomali ? 'Furan' : 'Open'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="exp-card__body">
                    <h3 className="exp-card__title">{title}</h3>
                    <p className="exp-card__desc">{summary}</p>

                    <div className="exp-card__meta-row">
                      <span className="exp-card__meta-item">
                        <MapPin size={12} />
                        <span>{location}</span>
                      </span>
                      <span className="exp-card__meta-item">
                        <Clock size={12} />
                        <span>{commitment}</span>
                      </span>
                    </div>

                    <div className="exp-card__footer">
                      <button
                        type="button"
                        className="track-card__cta-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalRole(role);
                        }}
                        aria-haspopup="dialog"
                      >
                        <span>{isSomali ? 'Faahfaahin' : 'Learn More'}</span>
                        <ArrowRight size={14} className="exp-card__cta-arrow" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Application Form Section */}
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="section-header reveal" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="label-text">{isSomali ? 'FOOMKA CODSIGA' : 'APPLICATION FORM'}</span>
              <div className="divider" />
              <h2 className="section-heading">{isSomali ? 'Gudbi Xiisahaaga Tabarruc' : 'Submit Volunteer Interest'}</h2>
              <p className="section-subheading">
                {isSomali
                  ? 'Dooro doorka aad jeceshahay ama noo sheeg xirfadahaaga guud — kooxdayada ayaa kula soo xiriiri doonta.'
                  : 'Select an opportunity above or tell us where your skills lie — our coordinator will follow up with matches.'}
              </p>
            </div>

            {selectedRole && (
              <div className="form-selection-pill">
                <div className="form-selection-pill__text">
                  <ShieldCheck size={16} color="var(--color-turquoise)" />
                  <span>
                    {isSomali ? 'Doorka La Doortay:' : 'Selected Role:'}{' '}
                    <strong>{isSomali ? selectedRole.titleSo : selectedRole.title}</strong> ({selectedRole.interestCategory})
                  </span>
                </div>
                <button
                  type="button"
                  className="form-selection-pill__clear"
                  onClick={() => setSelectedRole(null)}
                >
                  {isSomali ? 'Kala Noqo' : 'Clear'}
                </button>
              </div>
            )}

            <EnquiryForm
              formId="volunteer-form"
              fields={fields}
              submitLabel={isSomali ? 'Gudbi Codsiga' : 'Submit Volunteer Application'}
              successMessage={isSomali ? 'Waad ku mahadsan tahay wakhtigaaga iyo xiisahaaga — kooxdayadu waxay kula soo xiriiri doontaa fursadaha kugu habboon.' : 'Thanks for offering your time — our team will reach out about opportunities matching your interests.'}
              onSubmit={(values) => submitApplication('volunteer', values, token)}
            />
          </div>
        </div>
      </section>

      {/* Role Details Modal ("Learn More") */}
      {activeModalRole && (
        <div
          className="track-modal__backdrop"
          onClick={() => setActiveModalRole(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-role-title"
        >
          <div className="track-modal__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="track-modal__close-btn"
              onClick={() => setActiveModalRole(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="track-modal__header">
              <div className="track-modal__badge-row">
                <span className="track-modal__badge">{activeModalRole.interestCategory}</span>
                <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#86EFAC', border: '1px solid rgba(34, 197, 94, 0.35)', fontSize: '0.72rem' }}>
                  <Sparkles size={11} />
                  <span>{isSomali ? 'Fursad Furan' : 'Actively Recruiting'}</span>
                </span>
              </div>
              <h2 id="modal-role-title" className="track-modal__title">
                {isSomali ? activeModalRole.titleSo : activeModalRole.title}
              </h2>
            </div>

            <div className="track-modal__meta-grid">
              <div className="track-modal__meta-col">
                <MapPin size={16} color="var(--color-turquoise)" />
                <div>
                  <div>{isSomali ? 'Goobta:' : 'Location:'}</div>
                  <strong>{isSomali ? activeModalRole.locationSo : activeModalRole.location}</strong>
                </div>
              </div>
              <div className="track-modal__meta-col">
                <Clock size={16} color="var(--color-turquoise)" />
                <div>
                  <div>{isSomali ? 'Muddada:' : 'Commitment:'}</div>
                  <strong>{isSomali ? activeModalRole.commitmentSo : activeModalRole.commitment}</strong>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
              {isSomali ? activeModalRole.summarySo : activeModalRole.summary}
            </p>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Mas’uuliyadaha Muhiimka ah' : 'Key Responsibilities'}
              </h4>
              <ul className="track-modal__list">
                {activeModalRole.responsibilities.map((resp, idx) => (
                  <li key={idx} className="track-modal__list-item">
                    <CheckCircle2 size={16} className="track-modal__list-icon" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Shuruudaha & Aqoonta' : 'Qualifications & Profile'}
              </h4>
              <ul className="track-modal__list">
                {activeModalRole.requirements.map((req, idx) => (
                  <li key={idx} className="track-modal__list-item">
                    <CheckCircle2 size={16} className="track-modal__list-icon" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Waxa Somalia Blue Heaven Bixiso' : 'What We Provide'}
              </h4>
              <ul className="track-modal__list">
                {activeModalRole.benefits.map((ben, idx) => (
                  <li key={idx} className="track-modal__list-item">
                    <CheckCircle2 size={16} className="track-modal__list-icon" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="track-modal__footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveModalRole(null)}
              >
                {isSomali ? 'Xidh' : 'Close'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleApplyFromModal(activeModalRole)}
              >
                <span>{isSomali ? 'U Codso Doorkan' : 'Apply for this Role'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
