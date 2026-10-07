import { Users, Anchor, Briefcase, GraduationCap, Leaf, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './CoastalCommunities.css';

const communities = [
  {
    id: 'fishermen',
    icon: Anchor,
    title: 'Fishermen & Fishing Communities',
    desc: 'Somalia\'s fishermen carry centuries of marine knowledge. Blue Ocean works alongside them — protecting their livelihoods while conserving the ocean they depend on.',
    color: 'rgba(14,165,233,0.1)',
    border: 'rgba(14,165,233,0.2)',
    iconColor: '#7DD3FC',
  },
  {
    id: 'traditional-knowledge',
    icon: Leaf,
    title: 'Traditional Marine Knowledge',
    desc: 'Coastal communities hold invaluable knowledge about fish behaviour, weather patterns, and ocean ecosystems — wisdom we document and integrate into our research.',
    color: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.2)',
    iconColor: '#86EFAC',
  },
  {
    id: 'coastal-business',
    icon: Briefcase,
    title: 'Coastal Businesses',
    desc: 'Supporting sustainable ocean-based businesses that bring economic opportunity to coastal towns across Puntland, Jubaland, and beyond.',
    color: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.2)',
    iconColor: '#FCA5A5',
  },
  {
    id: 'youth',
    icon: GraduationCap,
    title: 'Youth Employment',
    desc: 'Creating real career pathways in marine tourism, research, and conservation for young Somalis living along the coast.',
    color: 'rgba(167,139,250,0.1)',
    border: 'rgba(167,139,250,0.2)',
    iconColor: '#C4B5FD',
  },
  {
    id: 'women',
    icon: Heart,
    title: 'Women in Coastal Communities',
    desc: 'Amplifying the role of women in fish processing, marine education, and conservation leadership throughout Somalia\'s coastal regions.',
    color: 'rgba(244,114,182,0.1)',
    border: 'rgba(244,114,182,0.2)',
    iconColor: '#F9A8D4',
  },
  {
    id: 'livelihoods',
    icon: Users,
    title: 'Sustainable Livelihoods',
    desc: 'Building lasting economic alternatives to destructive fishing practices, anchored in ocean health and community resilience.',
    color: 'rgba(0,201,177,0.1)',
    border: 'rgba(0,201,177,0.2)',
    iconColor: '#4DDFD0',
  },
];

export default function CoastalCommunities() {
  const { t } = useLanguage();

  return (
    <section className="communities section" aria-labelledby="communities-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">{t('coastalCommunitiesPreview.eyebrow')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="communities-heading">
            {t('coastalCommunitiesPreview.heading')}
          </h2>
          <p className="section-subheading">
            {t('coastalCommunitiesPreview.subheading')}
          </p>
        </div>

        {/* Layout */}
        <div className="communities__layout">
          {/* Featured image column */}
          <div className="communities__image reveal">
            <div className="communities__image-stack">
              <img
                src="/puntland.jpg"
                alt="Puntland fishing coast community"
                className="communities__img communities__img--main"
                loading="lazy"
              />
              <img
                src="/jubaland.jpg"
                alt="Jubaland coastal community"
                className="communities__img communities__img--secondary"
                loading="lazy"
              />
              <div className="communities__image-badge">
                <span className="communities__image-badge-number">3,025 km</span>
                <span className="communities__image-badge-label">{t('coastalCommunitiesPreview.coastlineLabel')}</span>
              </div>
            </div>
          </div>

          {/* Community cards */}
          <div className="communities__cards">
            {communities.map((com, i) => {
              const Icon = com.icon;
              return (
                <div
                  key={com.id}
                  className={`community-card reveal reveal-delay-${(i % 3) + 1}`}
                  style={{
                    '--com-bg':     com.color,
                    '--com-border': com.border,
                    '--com-icon':   com.iconColor,
                  }}
                >
                  <div className="community-card__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="community-card__content">
                    <h3 className="community-card__title">{com.title}</h3>
                    <p className="community-card__desc">{com.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
