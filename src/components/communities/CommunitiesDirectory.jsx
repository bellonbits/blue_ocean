import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, Leaf, Briefcase, GraduationCap, Heart, Users } from 'lucide-react';
import { getAllCommunities, getCommunityCategoryInfo, getStoriesByCommunity } from '../../data/communities';
import '../experiences/ExperienceCategories.css';

const ICONS = { Anchor, Leaf, Briefcase, GraduationCap, Heart, Users };

export default function CommunitiesDirectory() {
  const allCommunities = getAllCommunities();

  return (
    <section className="exp-cats section" aria-labelledby="communities-directory-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">WHO WE WORK WITH</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="communities-directory-heading">
            People of the Coast
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Blue Ocean is not just about the ocean — it's about the people who live by it.
          </p>
        </div>

        <div className="exp-cats__grid">
          {allCommunities.map((com) => {
            const categoryInfo = getCommunityCategoryInfo(com.category);
            const Icon = ICONS[categoryInfo?.icon] || Users;
            const stories = getStoriesByCommunity(com.slug);
            const link = stories[0] ? `/communities/${stories[0].slug}` : '/communities';

            return (
              <Link key={com.id} to={link} className="exp-cat-card">
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
                    <span>{stories[0] ? 'Read Their Story' : 'Learn More'}</span>
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
