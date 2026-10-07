import { motion } from 'framer-motion';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import '../experiences/ExperiencesHero.css';

export default function GetInvolvedHero() {
  return (
    <section className="exp-hero" aria-label="Get Involved with Blue Ocean">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/exp_scuba_diving.jpg"
          alt="A volunteer diver surveying a Somali reef"
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
          <HeartHandshake size={14} />
          <span>GET INVOLVED</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Be part <br />
          <span className="exp-hero__title-accent">of the story.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The future of Somalia's ocean depends on people who are willing to explore, learn and act.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#get-involved-heading" className="exp-hero__btn-primary">
            <span>See the Pathways</span>
            <ArrowRight size={18} />
          </a>
          <a href="/conservation" className="exp-hero__btn-secondary">
            <span>Explore Conservation</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
