import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { getStoriesByCommunity, getCommunityCategoryInfo } from '../../data/communities';
import '../experiences/ExperienceLocations.css';

export default function ConservationCommunityConnection({ project }) {
  if (!project.communityLinks || project.communityLinks.length === 0) return null;

  return (
    <section className="exp-locations-sec section" aria-labelledby="conservation-community-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">PEOPLE OF THE COAST</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-community-heading">
            Conservation works when communities are part of the solution.
          </h2>
          <p className="section-subheading">
            Communities partnering directly on {project.title}.
          </p>
        </div>

        <div className="exp-locations-dest-grid">
          {project.communityLinks.map((com) => {
            const categoryInfo = getCommunityCategoryInfo(com.category);
            const stories = getStoriesByCommunity(com.slug);
            const storyLink = stories[0] ? `/communities/${stories[0].slug}` : '/communities';
            return (
              <Link key={com.slug} to={storyLink} className="exp-locations-dest-card">
                <div className="exp-locations-dest-card-content">
                  <span className="exp-locations-dest-region">
                    <Users size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} />
                    {categoryInfo?.label || 'Community'}
                  </span>
                  <h4 className="exp-locations-dest-name">{com.name}</h4>
                  <span className="exp-locations-dest-link-text">
                    <span>{stories[0] ? 'Read Their Story' : 'Meet the Communities'}</span>
                    <ArrowRight size={13} />
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
