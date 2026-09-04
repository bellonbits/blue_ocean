import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedCommunityStories } from '../../data/communities';
import CommunityStoryCard from './CommunityStoryCard';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/RelatedExperiences.css';

export default function RelatedStories({ currentSlug }) {
  const { language } = useLanguage();
  const related = getRelatedCommunityStories(currentSlug, 3, language);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-exp section" aria-labelledby="related-stories-heading">
      <div className="container">
        <div className="related-exp__header reveal">
          <div className="related-exp__header-left">
            <span className="label-text">MORE STORIES</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-stories-heading">
              More voices from the coast
            </h2>
            <p className="section-subheading">
              Other stories in the same category or region.
            </p>
          </div>

          <div className="related-exp__header-right">
            <Link to="/communities" className="related-exp__btn">
              <span>View All Stories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="related-exp__grid reveal">
          {related.map((s) => (
            <div key={s.id} className="related-exp__item">
              <CommunityStoryCard story={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
