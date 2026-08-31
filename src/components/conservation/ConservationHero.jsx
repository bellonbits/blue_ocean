import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { getConservationImpact } from '../../data/conservation';
import '../experiences/ExperiencesHero.css';

export default function ConservationHero() {
  const impact = getConservationImpact();

  return (
    <section className="exp-hero" aria-label="Blue Ocean Conservation">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/marine_turtles.jpg"
          alt="A green sea turtle swimming over a Somali reef"
          className="exp-hero__img"
        />
        <div className="exp-hero__overlay" />
        <div className="exp-hero__gradient" />
      </div>

      <div className="container exp-hero__content">
        <motion.div
          className="exp-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Shield size={14} />
          <span>CONSERVATION</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Protect what lies <br />
          <span className="exp-hero__title-accent">beneath the surface.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From marine wildlife and habitats to sustainable coastal communities, discover how Blue Ocean is working
          toward a healthier Somali coast.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#conservation-focus" className="exp-hero__btn-primary">
            <span>Explore Conservation</span>
            <ArrowRight size={18} />
          </a>
          <a href="/get-involved" className="exp-hero__btn-secondary">
            <span>Get Involved</span>
          </a>
        </motion.div>

        <motion.div
          className="exp-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{impact.totalProjects} Conservation Projects</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{impact.focusAreas} Focus Areas</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{impact.locations} Locations</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
