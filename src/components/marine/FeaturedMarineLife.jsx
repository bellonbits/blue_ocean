import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Compass, Heart } from 'lucide-react';
import { getFeaturedSpecies } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import FramerCarousel from '../ui/FramerCarousel';
import SpeciesCard from './SpeciesCard';
import './FeaturedMarineLife.css';

export default function FeaturedMarineLife() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const featured = getFeaturedSpecies(language);

  return (
    <section className="featured-marine section" aria-labelledby="featured-marine-heading">
      <div className="container">
        {/* Header */}
        <div className="featured-marine__header reveal">
          <div className="featured-marine__header-left">
            <span className="label-text">{t('marineLife.featured.eyebrow')}</span>
            <div className="divider" />
            <h2 className="section-heading" id="featured-marine-heading">
              {t('marineLife.featured.heading')}
            </h2>
            <p className="section-subheading">
              {t('marineLife.featured.subheading')}
            </p>
          </div>

          <div className="featured-marine__header-right">
            <Link to={localizedPath('/marine-life/species')} className="featured-marine__view-all-btn">
              <span>{t('marineLife.featured.viewAllCta')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Moving Framer Carousel */}
        <div className="featured-marine__carousel-wrap">
          <FramerCarousel
            items={featured}
            itemWidth={370}
            gap={24}
            autoPlay={true}
            autoPlayInterval={5000}
            renderItem={(species, idx) => (
              <div className="featured-marine__card-wrap">
                <SpeciesCard species={species} priority={idx === 0} />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
