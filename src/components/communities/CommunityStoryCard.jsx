import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { getCommunityCategoryInfo } from '../../data/communities';
import '../experiences/ExperienceCard.css';

export default function CommunityStoryCard({ story, priority = false }) {
  const categoryInfo = getCommunityCategoryInfo(story.category);

  return (
    <article className="exp-card">
      <Link to={`/communities/${story.slug}`} className="exp-card__link" aria-label={`Read ${story.title}`}>
        <div className="exp-card__media-wrap">
          <img
            src={story.featuredImage}
            alt={story.title}
            className="exp-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="exp-card__gradient" />

          <div className="exp-card__top-bar">
            <span className="exp-card__category-badge">{categoryInfo?.label || 'Community Story'}</span>
          </div>
        </div>

        <div className="exp-card__body">
          <h3 className="exp-card__title">{story.title}</h3>
          <p className="exp-card__tagline">{story.communityName}</p>
          <p className="exp-card__desc">{story.storyContent[0]}</p>

          <div className="exp-card__meta-row">
            <span className="exp-card__meta-item">
              <MapPin size={12} />
              <span>{story.location}</span>
            </span>
          </div>

          <div className="exp-card__footer">
            <span className="exp-card__cta">
              <span>Read Story</span>
              <ArrowRight size={14} className="exp-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
