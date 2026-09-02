import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../experiences/ExperiencesHero.css';
import '../../pages/SpeciesDirectoryPage.css';

export default function IllegalFishingHero() {
  return (
    <section className="exp-hero" aria-label="Illegal Fishing — Blue Ocean Conservation">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/marine_fish.jpg"
          alt="Reef fish in Somali coastal waters"
          className="exp-hero__img"
        />
        <div className="exp-hero__overlay" />
        <div className="exp-hero__gradient" />
      </div>

      <div className="container exp-hero__content">
        <Link to="/conservation" className="species-dir-hero__crumb-link" style={{ marginBottom: 'var(--space-4)' }}>
          <ArrowLeft size={14} />
          <span>Conservation Overview</span>
        </Link>

        <motion.div
          className="exp-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AlertTriangle size={14} />
          <span>CONSERVATION FOCUS</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Protecting <span className="exp-hero__title-accent">Somalia's waters.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Illegal and destructive fishing can threaten marine ecosystems, fisheries, and the livelihoods of coastal
          communities. Blue Ocean works to increase awareness, support research, and promote sustainable management
          of Somalia's marine resources.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#illegal-fishing-projects" className="exp-hero__btn-primary">
            <span>See Our Projects</span>
            <ArrowRight size={18} />
          </a>
          <a href="/research" className="exp-hero__btn-secondary">
            <span>Explore Our Research</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
