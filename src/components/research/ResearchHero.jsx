import { motion } from 'framer-motion';
import { Microscope, ArrowRight } from 'lucide-react';
import { getResearchStats } from '../../data/research';
import '../experiences/ExperiencesHero.css';

export default function ResearchHero() {
  const stats = getResearchStats();

  return (
    <section className="exp-hero" aria-label="Blue Ocean Research">
      <div className="exp-hero__media" aria-hidden="true">
        <img
          src="/Blue%20Simple%20Beauty%20Of%20The%20Ocean%20Video.gif"
          alt="Blue Ocean field researchers surveying Somalia's coastal waters"
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
          <Microscope size={14} />
          <span>SCIENTIFIC RESEARCH & DISCOVERY</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Understanding the ocean. <br />
          <span className="exp-hero__title-accent">Protecting its future.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Explore Blue Ocean's research into Somalia's marine biodiversity, fisheries, ecosystems and coastal environment.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#research-areas" className="exp-hero__btn-primary">
            <span>Explore Research</span>
            <ArrowRight size={18} />
          </a>
          <a href="/research/projects" className="exp-hero__btn-secondary">
            <span>View Projects</span>
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
            <span>{stats.totalProjects} Research Projects</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.researchAreasCount} Research Areas</span>
          </div>
          <div className="exp-hero__pill">
            <span className="exp-hero__pill-dot" />
            <span>{stats.researchSites} Field Sites</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
