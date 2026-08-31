import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Compass } from 'lucide-react';
import './CoastHero.css';

export default function CoastHero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="coast-hero" aria-label="Explore Somalia's Coast">
      {/* Background Image with dark ocean gradient */}
      <div className="coast-hero__bg">
        <img
          src="/Green%20and%20Blue%20Scenic%20Travel%20Landscape%20Video.gif"
          alt="Animated scenic landscape of Somalia's coastline"
          className="coast-hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="coast-hero__overlay" aria-hidden="true" />
      </div>

      <div className="container coast-hero__container">
        <div className="coast-hero__content">
          <motion.div
            className="coast-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Compass size={14} className="coast-hero__badge-icon" />
            <span>3,025 KM COASTLINE · HORN OF AFRICA</span>
          </motion.div>

          <motion.h1
            className="coast-hero__title display-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Explore Somalia's
            <br />
            <span className="coast-hero__title-accent">Blue Frontier</span>
          </motion.h1>

          <motion.p
            className="coast-hero__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From remote islands and coral-rich waters to historic coastal towns,
            discover the places that define Somalia's extraordinary coastline.
          </motion.p>

          <motion.div
            className="coast-hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button
              onClick={() => scrollToSection('destinations-grid')}
              className="btn btn-primary btn-lg"
              id="cta-explore-destinations"
            >
              Explore Destinations
              <ArrowDown size={18} />
            </button>
            <button
              onClick={() => scrollToSection('coast-map')}
              className="btn btn-outline btn-lg"
              id="cta-view-map"
            >
              <MapPin size={18} />
              View Map
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

