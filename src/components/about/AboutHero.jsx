import { motion } from 'framer-motion';
import { Waves, ArrowRight } from 'lucide-react';
import '../experiences/ExperiencesHero.css';

export default function AboutHero() {
  return (
    <section className="exp-hero" aria-label="About Blue Ocean">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/hero_ocean.jpg"
          alt="Somalia's open ocean waters"
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
          <Waves size={14} />
          <span>ABOUT BLUE OCEAN</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A deeper connection <br />
          <span className="exp-hero__title-accent">to Somalia's ocean.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Blue Ocean explores, studies, protects and shares the marine environment of Somalia.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#our-story" className="exp-hero__btn-primary">
            <span>Our Story</span>
            <ArrowRight size={18} />
          </a>
          <a href="/contact" className="exp-hero__btn-secondary">
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
