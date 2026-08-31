import { motion } from 'framer-motion';
import { Newspaper, ArrowRight } from 'lucide-react';
import { getAllArticles } from '../../data/news';
import '../experiences/ExperiencesHero.css';

export default function NewsHero() {
  const count = getAllArticles().length;

  return (
    <section className="exp-hero" aria-label="Blue Ocean News & Discoveries">
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
          <Newspaper size={14} />
          <span>NEWS & DISCOVERIES</span>
        </motion.div>

        <motion.h1
          className="exp-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Latest discoveries. <br />
          <span className="exp-hero__title-accent">Stories from the coast.</span>
        </motion.h1>

        <motion.p
          className="exp-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Follow Blue Ocean's latest research, marine discoveries, conservation work and stories from Somalia's
          coastal communities.
        </motion.p>

        <motion.div
          className="exp-hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href="#news-categories" className="exp-hero__btn-primary">
            <span>Explore Stories</span>
            <ArrowRight size={18} />
          </a>
          <a href="/news/articles" className="exp-hero__btn-secondary">
            <span>All Articles</span>
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
            <span>{count} Published Stories</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
