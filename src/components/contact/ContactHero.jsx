import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import '../experiences/ExperiencesHero.css';

export default function ContactHero() {
  return (
    <section className="exp-hero" aria-label="Contact Blue Ocean" style={{ minHeight: '60vh' }}>
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/exp_coastal_cliff.jpg"
          alt="Coastal cliffs along the Somali Bari coast"
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
          <MessageCircle size={14} />
          <span>CONTACT</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Let's <span className="exp-hero__title-accent">connect.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Whether you're interested in research, conservation, partnerships, ocean experiences or simply want to
          learn more, we'd love to hear from you.
        </motion.p>
      </div>
    </section>
  );
}
