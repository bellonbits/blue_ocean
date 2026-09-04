import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './HeroSection.css';

export default function HeroSection() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  const scrollToContent = () => {
    const el = document.getElementById('explore-coast');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-label={`${t('home.heroHeadline')} ${t('home.heroHeadlineAccent')}`}>
      {/* Background Image */}
      <div className="hero__bg">
        <img
          src="/hero_ocean.jpg"
          alt="Blue Ocean Somalia — Marine life and coastal waters"
          className="hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__inner">
          {/* Headline */}
          <motion.h1
            className="hero__headline display-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('home.heroHeadline')}
            <br />
            <span className="hero__headline-accent">{t('home.heroHeadlineAccent')}</span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            className="hero__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t('home.heroSubtext')}
          </motion.p>

          {/* CTA Pairs */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hero__cta-group">
              <Link to={localizedPath('/explore-the-coast')} className="btn btn-primary btn-lg" id="hero-explore-coast">
                {t('nav.exploreCoast')}
                <ArrowRight size={18} />
              </Link>
              <Link to={localizedPath('/marine-life')} className="btn btn-outline btn-lg" id="hero-discover-marine">
                {t('home.heroDiscoverMarineLife')}
              </Link>
            </div>
            <div className="hero__cta-group">
              <Link to={localizedPath('/research/expeditions')} className="btn btn-ghost btn-lg" id="hero-join-expedition">
                {t('home.heroJoinExpedition')}
              </Link>
              <Link to={localizedPath('/research')} className="btn btn-ghost btn-lg" id="hero-learn-research">
                {t('home.heroLearnResearch')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll-btn"
        onClick={scrollToContent}
        aria-label="Scroll to explore section"
        id="hero-scroll-btn"
      >
        <ChevronDown size={22} />
      </button>
    </section>
  );
}
