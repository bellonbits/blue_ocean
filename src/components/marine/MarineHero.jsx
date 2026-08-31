import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, Fish, Shield, Waves } from 'lucide-react';
import './MarineHero.css';

export default function MarineHero() {
  return (
    <section className="marine-hero" aria-label="Marine Life of Somalia">
      {/* Background Visual */}
      <div className="marine-hero__media" aria-hidden="true">
        <img
          src="/Blue%20and%20White%20Modern%20Save%20Our%20Ocean%20Video.gif"
          alt="Animated ocean scene celebrating Somalia's marine life"
          className="marine-hero__img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="marine-hero__overlay" />
        <div className="marine-hero__gradient" />
      </div>

      <div className="container marine-hero__content">
        {/* Badge */}
        <motion.div
          className="marine-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Waves size={14} className="marine-hero__badge-icon" />
          <span>FIELD GUIDE & SPECIES KNOWLEDGE BASE</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="marine-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Life beneath <br />
          <span className="marine-hero__title-accent">the surface.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="marine-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover the marine species and coastal ecosystems that make Somalia’s 3,025 km maritime frontier extraordinary — from gentle oceanic giants to pristine barrier reefs.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="marine-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link to="/marine-life/species" className="marine-hero__btn-primary">
            <span>Explore Species Directory</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#ecosystems-section" className="marine-hero__btn-secondary">
            <span>Explore Ecosystems</span>
          </a>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          className="marine-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>500+ Documented Taxa</span>
          </div>
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>08 Classification Groups</span>
          </div>
          <div className="marine-hero__pill">
            <span className="marine-hero__pill-dot" />
            <span>Verified IUCN Red List Data</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
