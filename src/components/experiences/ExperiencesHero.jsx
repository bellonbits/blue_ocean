import { motion } from 'framer-motion';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { getExperienceStats } from '../../data/experiences';
import './ExperiencesHero.css';

export default function ExperiencesHero() {
  const stats = getExperienceStats();

  return (
    <section className="exp-hero" aria-label="Ocean Experiences">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/Blue%20Minimalist%20Explore%20the%20Ocean%20Video.gif"
          alt="Animated ocean scene inviting exploration of Somalia's coast"
          className="exp-hero__img"
          loading="eager"
          fetchpriority="high"
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
          <Compass size={14} />
          <span>OCEAN EXPEDITIONS & ACTIVITIES</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Experience <br />
          <span className="exp-hero__title-accent">the ocean.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover the future of ocean exploration along Somalia's extraordinary coastline — boat tours, snorkeling, diving, fishing, island exploration and more, all coming to the Somali coast.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#experiences-grid" className="exp-hero__btn-primary">
            <span>Explore Experiences</span>
            <ArrowRight size={18} />
          </a>
          <a href="/explore-the-coast" className="exp-hero__btn-secondary">
            <span>Explore the Coast</span>
          </a>
        </motion.div>

        <motion.div
          className="exp-hero__pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="exp-hero__pill">
            <Sparkles size={13} className="exp-hero__pill-icon" />
            <span>{stats.totalExperiences} Experiences in Development</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.categoriesCount} Activity Categories</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.regionsCovered} Somali Regions</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
