import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, Leaf, Briefcase, GraduationCap, Heart, Users } from 'lucide-react';
import { getAllCommunities, getCommunityCategoryInfo, getStoriesByCommunity } from '../../data/communities';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

const ICONS = { Anchor, Leaf, Briefcase, GraduationCap, Heart, Users };

export default function CommunitiesDirectory() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const allCommunities = getAllCommunities(language);

  return (
    <section className="exp-cats section" aria-labelledby="communities-directory-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('communities.directory.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="communities-directory-heading">
            {t('communities.directory.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('communities.directory.subheading')}
          </p>
        </div>

        <div className="exp-cats__grid">
          {allCommunities.map((com) => {
            const categoryInfo = getCommunityCategoryInfo(com.category, language);
            const Icon = ICONS[categoryInfo?.icon] || Users;
            const stories = getStoriesByCommunity(com.slug);
            const link = stories[0] ? `/communities/${stories[0].slug}` : '/communities';

            return (
              <Link key={com.id} to={localizedPath(link)} className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={com.heroImage} alt={com.name} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">{com.region}</span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{com.name}</h3>
                  <p className="exp-cat-card__tagline">{com.description}</p>

                  <span className="exp-cat-card__cta">
                    <span>{stories[0] ? t('communities.directory.ctaStory') : t('communities.directory.ctaLearnMore')}</span>
                    <ArrowRight size={14} className="exp-cat-card__arrow" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
