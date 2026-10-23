import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Handshake, Building2, CheckCircle2, X, Sparkles, Info, ShieldCheck } from 'lucide-react';
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

const PARTNER_TRACKS = [
  {
    id: 'academic-research',
    title: 'Academic & Marine Research Institutions',
    titleSo: 'Hay’adaha Tacliinta Sare & Cilmi-baarista Badda',
    partnershipType: 'Research Institution',
    collaborationModel: 'Joint Research & Field Expeditions',
    collaborationModelSo: 'Cilmi-baaris Wadajir ah & Safarro Shaqo',
    image: '/exp_ocean_research.webp',
    summary: 'Co-design scientific research projects, access our 3,330 km survey network, and publish open-access marine data.',
    summarySo: 'Wadajir u deji mashaariicda cilmi-baarista badda, ka faa’iidayso maraakiibteena sahanka, oo daabac xogta badda.',
    scope: 'Long-term research consortia focusing on coral genomics, cetacean migration corridors, deep-water upwelling zones, and blue carbon coastal ecosystems.',
    scopeSo: 'Iskaashi cilmi-baaris oo fog oo diiradda saaraya dhagax-madheedhka, socodka nibiriyada, iyo kaydinta kaarboonka badda.',
    deliverablesSBH: [
      'Facilitated research clearance and territorial marine survey permits.',
      'Access to SBH oceanographic vessels, scientific dive masters, and field stations.',
      'Logistical support and sample curation in Mogadishu, Berbera, and Kismayo.'
    ],
    deliverablesPartner: [
      'Specialized laboratory equipment, satellite tagging units, or genetic assay kits.',
      'Joint publication with co-authorship for Somali marine scientists.',
      'Capacity-building workshops and graduate student mentorship.'
    ],
    eligibleOrganizations: 'Universities, international ocean institutes, government research agencies, and peer-reviewed marine laboratories.'
  },
  {
    id: 'conservation-ngos',
    title: 'Global Conservation NGOs & Foundations',
    titleSo: 'Hay’adaha Caalamiga ah ee Ilaalinta Badda & Degaanka',
    partnershipType: 'Conservation Organization',
    collaborationModel: 'Strategic Program Co-Management',
    collaborationModelSo: 'Wada-maamulka Barnaamijyada Istiraatiijiga ah',
    image: '/images/img_08.webp',
    summary: 'Partner to scale grassroots conservation projects, deploy anti-poaching telemetry, and protect endangered marine mammals.',
    summarySo: 'Kala shaqee ballaarinta mashaariicda ilaalinta deegaanka, ilaalinta xayawaanka badda, iyo maamulka xeebaha.',
    scope: 'Implementing community-managed Marine Protected Areas (MPAs), mangrove afforestation, and sea turtle nesting sanctuary networks along Somalia’s coastline.',
    scopeSo: 'Hirgelinta goobaha badda ee la ilaaliyo ee bulshadu maamusho, beeridda geedaha mangroves, iyo ilaalinta diindiinka badda.',
    deliverablesSBH: [
      'Direct community trust and established grassroots networks across 18 coastal districts.',
      'Real-time field monitoring dashboards with verified GIS coordinates and photos.',
      'Strict compliance with sovereign environmental conservation guidelines.'
    ],
    deliverablesPartner: [
      'Multi-year grant co-funding or programmatic matching funds.',
      'International advocacy, technical conservation frameworks, and policy advisory.',
      'Independent impact evaluation and auditing collaboration.'
    ],
    eligibleOrganizations: 'Environmental NGOs, philanthropic funds, international climate resilience bodies, and conservation trusts.'
  },
  {
    id: 'universities-exchange',
    title: 'Universities & Student Exchange Programs',
    titleSo: 'Jaamacadaha & Barnaamijyada Is-dhaafsiga Ardayda',
    partnershipType: 'University',
    collaborationModel: 'Accredited Fieldwork & Faculty Exchanges',
    collaborationModelSo: 'Tababarka Goobta ee La Aqoonsan yahay',
    image: '/images/img_12.webp',
    summary: 'Host international and Somali marine biology students on fieldwork expeditions with accredited curriculum hours.',
    summarySo: 'U fur fursado ardayda Soomaaliyeed iyo kuwa caalamiga ah ee baranaya culuumta badda si ay u helaan tababar dhab ah.',
    scope: 'Curriculum-accredited field semesters, summer research schools, and joint faculty research on Indian Ocean biodiversity and artisanal fisheries.',
    scopeSo: 'Koorsooyin goobta ah oo la aqoonsan yahay, dugsiyo cilmi-baaris xagaaga, iyo waxbarashada noolaha badda Hindiya.',
    deliverablesSBH: [
      'Curated field learning modules, safety marshals, and local accommodation.',
      'Direct mentorship from resident marine scientists and community elders.',
      'Real-world dataset access for undergraduate and postgraduate dissertations.'
    ],
    deliverablesPartner: [
      'Academic accreditation credits for participating students.',
      'Scholarship opportunities or fee waivers for Somali marine science students.',
      'Guest lecture exchanges and open access to online journal databases.'
    ],
    eligibleOrganizations: 'Accredited universities, faculties of environmental science, maritime academies, and higher education consortia.'
  },
  {
    id: 'sustainable-tourism',
    title: 'Sustainable Coastal Tourism & Eco-Operators',
    titleSo: 'Dalxiiska Badda ee Joogtada ah & Hawl-wadeennada',
    partnershipType: 'Tourism Organization',
    collaborationModel: 'Eco-Certification & Verified Operator Network',
    collaborationModelSo: 'Shahaadada Deegaanka & Xubinnimada Shabakadda',
    image: '/exp_scuba_diving.webp',
    summary: 'Join our verified ethical tourism network, receive conservation certification, and co-market sustainable charters.',
    summarySo: 'Ku biir shabakadda dalxiiska badda ee mas’uuliyadda leh, qaado tababar, oo hel macaamiil jecel dabeecadda.',
    scope: 'Establishing high-standard, low-impact scuba diving, dhow sailing, and wildlife excursion standards that preserve pristine marine habitats.',
    scopeSo: 'Dhisidda heerar sare oo quusid ah, doonyaha shiraaca, iyo safarro dabeecadda ilaalinaya oo aan waxyeellayn nolosha badda.',
    deliverablesSBH: [
      'Somalia Blue Flag eco-certification badge and official verification seal.',
      'Featured placement on the Somalia Blue Heaven tourist discovery portal.',
      'Safety, first-aid, and marine-naturalist training for local boat skippers and guides.'
    ],
    deliverablesPartner: [
      'Strict adherence to no-anchor, no-touch, and wildlife-distance codes of conduct.',
      'Collection of tourist citizen-science wildlife sighting reports.',
      'Contribution of 5% of charter proceeds to local community marine reserves.'
    ],
    eligibleOrganizations: 'Dive centers, liveaboard operators, coastal charter companies, eco-lodges, and cultural tour agencies.'
  },
  {
    id: 'coastal-businesses',
    title: 'Coastal Businesses & Maritime Industry',
    titleSo: 'Ganacsiyada Xeebaha & Warshadaha Maraakiibta',
    partnershipType: 'Coastal Business',
    collaborationModel: 'Corporate Stewardship & Sustainable Supply Chains',
    collaborationModelSo: 'Taageerada Shirkadaha & Silsiladaha Ganacsiga Nadiifka ah',
    image: '/images/img_01.webp',
    summary: 'Adopt sustainable supply chains, fund local mangrove nurseries, and reduce maritime plastic pollution in Somali ports.',
    summarySo: 'Ilaali nadaafadda dekadaha, maalgeli beeridda geedaha mangroves, oo qaado nidaam ganacsi oo ilaaliya badda.',
    scope: 'Greening maritime supply chains, mitigating commercial port runoff, funding plastic buyback centers, and adopting responsible seafood sourcing.',
    scopeSo: 'Nadiifinta silsiladaha saadka, yaraynta qashinka dekadaha, iyo iibsiga kalluunka sida sharciga ah lagu qabtay.',
    deliverablesSBH: [
      'Independent environmental auditing and blue-economy ESG certification.',
      'Employee engagement days, corporate reef cleanup opportunities, and impact reports.',
      'Prominent corporate recognition across SBH annual summits and exhibitions.'
    ],
    deliverablesPartner: [
      'Direct investment in local coastal waste management and circular recycling.',
      'Adoption of sustainable fisheries procurement protocols.',
      'Corporate sponsorship of community surveillance patrols and youth training.'
    ],
    eligibleOrganizations: 'Shipping lines, port authorities, seafood processors, coastal hospitality groups, and telecommunications providers.'
  },
  {
    id: 'media-documentary',
    title: 'Media, Documentarians & Broadcast Partners',
    titleSo: 'Warbaahinta, Filim-duubayaasha & Weriyayaasha',
    partnershipType: 'Media',
    collaborationModel: 'Cinematic Production Access & Co-Storytelling',
    collaborationModelSo: 'Helitaanka Goobaha Duubista & Sheeko-wadaag',
    image: '/images/img_05.webp',
    summary: 'Access unprecedented cinematic permits, remote offshore locations, and expert guides for global blue-economy storytelling.',
    summarySo: 'Hel ruqsadaha duubista filimada caalamiga ah, hagayaal khubaro ah, iyo marin loogu tago jasiiradaha fog.',
    scope: 'Producing world-class documentary films, investigative journalism features, underwater VR experiences, and natural history specials about Somalia’s marine realm.',
    scopeSo: 'Soo saarista filimo tayo sare leh, baaritaanno saxaafadeed, iyo taxanayaal dabiici ah oo ku saabsan badda Soomaaliya.',
    deliverablesSBH: [
      'Expedited national media permits and security coordination for international crews.',
      'Scientific advisor guidance, historical maritime archives, and telemetry access.',
      'Logistical coordination with local fishing fleets, elders, and remote islanders.'
    ],
    deliverablesPartner: [
      'High-impact global broadcast placement highlighting Somali conservation leadership.',
      'Licensing of select B-roll and drone footage for SBH educational archives.',
      'Credit acknowledgments and public screening partnerships for Somali youth.'
    ],
    eligibleOrganizations: 'Documentary filmmakers, broadcast networks, scientific media publications, podcast creators, and photojournalists.'
  }
];

export default function PartnerPage() {
  useScrollReveal();
  const { token } = useAuth();
  const { language } = useLanguage();
  const isSomali = language === 'so';

  const [activeModalTrack, setActiveModalTrack] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    document.title = isSomali
      ? 'Nala Shaqee & Iskaashi — Somalia Blue Heaven'
      : 'Partner With Us — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  const handlePartnerFromModal = (track) => {
    setSelectedTrack(track);
    setActiveModalTrack(null);
    const formElement = document.getElementById('partner-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fields = [
    {
      name: 'organization',
      label: isSomali ? 'Magaca Hay’adda / Shirkadda' : 'Organization',
      type: 'text',
      required: true,
      placeholder: isSomali ? 'Magaca hay’addaada ama shirkadda' : 'Organization name'
    },
    {
      name: 'name',
      label: isSomali ? 'Magaca Qofka Xiriirka' : 'Contact Name',
      type: 'text',
      required: true,
      placeholder: isSomali ? 'Magacaaga oo buuxa' : 'Your full name'
    },
    {
      name: 'email',
      label: isSomali ? 'Iimaylkaaga Shaqada' : 'Email',
      type: 'email',
      required: true,
      placeholder: 'you@organization.org'
    },
    {
      name: 'phone',
      label: isSomali ? 'Telefoonka' : 'Phone',
      type: 'tel',
      placeholder: '+252 ...'
    },
    {
      name: 'partnershipType',
      label: isSomali ? 'Nooca Iskaashiga' : 'Partnership Type',
      type: 'select',
      required: true,
      placeholder: isSomali ? 'Dooro qayb' : 'Select a category',
      defaultValue: selectedTrack ? selectedTrack.partnershipType : '',
      options: [
        'Research Institution',
        'Conservation Organization',
        'University',
        'Tourism Organization',
        'Coastal Business',
        'NGO',
        'Media',
        'Corporate Partner',
      ],
    },
    {
      name: 'message',
      label: isSomali ? 'Farriinta & Soo-jeedinta' : 'Message',
      type: 'textarea',
      required: true,
      placeholder: selectedTrack
        ? (isSomali ? `Faahfaahin ku saabsan sida aad u doonaysaan inaad isaga kaashataan qaybta ${selectedTrack.titleSo}` : `Tell us how your organization would like to collaborate under the ${selectedTrack.title} track.`)
        : (isSomali ? 'Noo sheeg wax ku saabsan hay’addaada iyo waxa aad maanka ku haysaan.' : 'Tell us about your organization and what you have in mind.'),
      fullWidth: true
    },
  ];

  return (
    <main id="main-content" className="partner-page">
      <section className="species-dir-hero">
        <div className="container">
          <div className="species-dir-hero__breadcrumb">
            <Link to={`/${language}/get-involved`} className="species-dir-hero__crumb-link">
              <ArrowLeft size={14} />
              <span>{isSomali ? 'Dib ugu Noqo Ka Qayb Qaado' : 'Get Involved'}</span>
            </Link>
          </div>

          <span className="label-text">{isSomali ? 'ISKAASHIGA SOOMAALIYA' : 'PARTNER WITH US'}</span>
          <div className="divider" />
          <h1 className="species-dir-hero__title">
            {isSomali ? 'Wada-shaqayn abuureysa saameyn waarta.' : 'Work with Somalia Blue Heaven to create lasting impact.'}
          </h1>
          <p className="species-dir-hero__desc">
            {isSomali
              ? 'Hay’adaha cilmi-baarista, hay’adaha ilaalinta deegaanka, jaamacadaha, shirkadaha dalxiiska, iyo ganacsiyada xeebaha waxay ka ciyaaraan door lama huraan ah shaqadeena. Guji Faahfaahin kaadh kasta si aad u aragto qaabka wadashaqaynta.'
              : 'Research institutions, conservation organizations, universities, tourism operators, coastal businesses, NGOs, media, and corporate partners all play a vital role. Explore our partnership tracks below and click Learn More on any card to review mutual deliverables.'}
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
                ? 'Somalia Blue Heaven waxay dhistay heshiisyo rasmi ah oo ku salaysan is-aaminid, daah-furnaan buuxda, iyo ilaalinta madax-bannaanida badda Soomaaliya.'
                : 'All collaborations operate under formal Memorandums of Understanding (MoU) guaranteeing mutual scientific sovereignty, local capacity transfer, and verified ecological outcomes.'}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="exp-grid__results get-involved-grid-sec">
            {PARTNER_TRACKS.map((track) => {
              const title = isSomali ? track.titleSo : track.title;
              const summary = isSomali ? track.summarySo : track.summary;
              const model = isSomali ? track.collaborationModelSo : track.collaborationModel;

              return (
                <article
                  key={track.id}
                  className="exp-card track-card"
                  onClick={() => setActiveModalTrack(track)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalTrack(track);
                    }
                  }}
                  aria-label={`View details for ${title}`}
                >
                  <div className="exp-card__media-wrap">
                    <img src={track.image} alt={title} className="exp-card__img" loading="lazy" />
                    <div className="exp-card__gradient" />

                    <div className="exp-card__top-bar">
                      <span className="exp-card__category-badge">{track.partnershipType}</span>
                      <span className="badge exp-card__status-badge" style={{ background: 'rgba(2, 204, 254, 0.15)', color: '#7DD3FC', border: '1px solid rgba(2, 204, 254, 0.35)' }}>
                        <Sparkles size={11} />
                        <span>{isSomali ? 'Wada-shaqayn Furan' : 'Track Active'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="exp-card__body">
                    <h3 className="exp-card__title">{title}</h3>
                    <p className="exp-card__desc">{summary}</p>

                    <div className="exp-card__meta-row">
                      <span className="exp-card__meta-item">
                        <Handshake size={12} />
                        <span>{model}</span>
                      </span>
                    </div>

                    <div className="exp-card__footer">
                      <button
                        type="button"
                        className="track-card__cta-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalTrack(track);
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
              <span className="label-text">{isSomali ? 'XIRIIRKA ISKAASHIGA' : 'COLLABORATION ENQUIRY'}</span>
              <div className="divider" />
              <h2 className="section-heading">{isSomali ? 'Bilaab Wada-hadal Iskaashi' : 'Initiate Partnership Dialogue'}</h2>
              <p className="section-subheading">
                {isSomali
                  ? 'U sheeg kooxdayada wax ku saabsan hay’addaada iyo sida aad u doonayso inaad nala shaqeyso — waxaan kugu soo jawaabi doonnaa 2–3 maalmood gudahood.'
                  : 'Tell our partnerships team about your organization and how you envision collaborating. We will coordinate an initial discovery meeting.'}
              </p>
            </div>

            {selectedTrack && (
              <div className="form-selection-pill">
                <div className="form-selection-pill__text">
                  <ShieldCheck size={16} color="var(--color-turquoise)" />
                  <span>
                    {isSomali ? 'Dariiqa Iskaashiga La Doortay:' : 'Selected Track:'}{' '}
                    <strong>{isSomali ? selectedTrack.titleSo : selectedTrack.title}</strong> ({selectedTrack.partnershipType})
                  </span>
                </div>
                <button
                  type="button"
                  className="form-selection-pill__clear"
                  onClick={() => setSelectedTrack(null)}
                >
                  {isSomali ? 'Kala Noqo' : 'Clear'}
                </button>
              </div>
            )}

            <EnquiryForm
              formId="partner-form"
              fields={fields}
              submitLabel={isSomali ? 'Dir Codsiga Iskaashiga' : 'Submit Partnership Enquiry'}
              successMessage={isSomali ? 'Waad ku mahadsan tahay xiriirka — kooxdayada iskaashiga ayaa kula soo xiriiri doonta si looga wada hadlo tallaabooyinka xiga.' : 'Thanks for reaching out — our partnerships team will follow up to discuss next steps.'}
              onSubmit={(values) => submitApplication('partner', values, token)}
            />
          </div>
        </div>
      </section>

      {/* Track Details Modal ("Learn More") */}
      {activeModalTrack && (
        <div
          className="track-modal__backdrop"
          onClick={() => setActiveModalTrack(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-track-title"
        >
          <div className="track-modal__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="track-modal__close-btn"
              onClick={() => setActiveModalTrack(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="track-modal__header">
              <div className="track-modal__badge-row">
                <span className="track-modal__badge">{activeModalTrack.partnershipType}</span>
                <span className="badge" style={{ background: 'rgba(2, 204, 254, 0.15)', color: '#7DD3FC', border: '1px solid rgba(2, 204, 254, 0.35)', fontSize: '0.72rem' }}>
                  <Sparkles size={11} />
                  <span>{isSomali ? 'Wada-shaqayn Furan' : 'Co-Design Open'}</span>
                </span>
              </div>
              <h2 id="modal-track-title" className="track-modal__title">
                {isSomali ? activeModalTrack.titleSo : activeModalTrack.title}
              </h2>
            </div>

            <div className="track-modal__meta-grid">
              <div className="track-modal__meta-col">
                <Handshake size={16} color="var(--color-turquoise)" />
                <div>
                  <div>{isSomali ? 'Qaabka Iskaashiga:' : 'Collaboration Model:'}</div>
                  <strong>{isSomali ? activeModalTrack.collaborationModelSo : activeModalTrack.collaborationModel}</strong>
                </div>
              </div>
              <div className="track-modal__meta-col">
                <Building2 size={16} color="var(--color-turquoise)" />
                <div>
                  <div>{isSomali ? 'Hay’adaha U Qalmada:' : 'Eligible Entities:'}</div>
                  <strong>{activeModalTrack.partnershipType}</strong>
                </div>
              </div>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Ujeeddooyinka & Baaxadda' : 'Scope & Strategic Focus'}
              </h4>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                {isSomali ? activeModalTrack.scopeSo : activeModalTrack.scope}
              </p>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Waxa Somalia Blue Heaven Bixiso' : 'What Somalia Blue Heaven Provides'}
              </h4>
              <ul className="track-modal__list">
                {activeModalTrack.deliverablesSBH.map((item, idx) => (
                  <li key={idx} className="track-modal__list-item">
                    <CheckCircle2 size={16} className="track-modal__list-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Waxa Hay’adda Wada-shaqayntu Ku Biiriso' : 'What Partners Contribute'}
              </h4>
              <ul className="track-modal__list">
                {activeModalTrack.deliverablesPartner.map((item, idx) => (
                  <li key={idx} className="track-modal__list-item">
                    <CheckCircle2 size={16} className="track-modal__list-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="track-modal__section">
              <h4 className="track-modal__section-title">
                {isSomali ? 'Hay’adaha Ku Habboon' : 'Eligible Organizations'}
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
                {activeModalTrack.eligibleOrganizations}
              </p>
            </div>

            <div className="track-modal__footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveModalTrack(null)}
              >
                {isSomali ? 'Xidh' : 'Close'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handlePartnerFromModal(activeModalTrack)}
              >
                <span>{isSomali ? 'Bilaab Iskaashigan' : 'Initiate This Partnership'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
