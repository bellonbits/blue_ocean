import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  const scrollToContent = () => {
    const el = document.getElementById('explore-coast');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-label="Hero — Discover Somalia's Blue Ocean">
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
            Discover Somalia's
            <br />
            <span className="hero__headline-accent">Blue Ocean</span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            className="hero__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Explore Somalia's coast, discover its marine life, support ocean research,
            and help protect one of Africa's remarkable marine environments.
          </motion.p>

          {/* CTA Pairs */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hero__cta-group">
              <Link to="/explore-the-coast" className="btn btn-primary btn-lg" id="hero-explore-coast">
                Explore the Coast
                <ArrowRight size={18} />
              </Link>
              <Link to="/marine-life" className="btn btn-outline btn-lg" id="hero-discover-marine">
                Discover Marine Life
              </Link>
            </div>
            <div className="hero__cta-group">
              <Link to="/research/expeditions" className="btn btn-ghost btn-lg" id="hero-join-expedition">
                Join a Research Expedition
              </Link>
              <Link to="/research" className="btn btn-ghost btn-lg" id="hero-learn-research">
                Learn About Our Research
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
