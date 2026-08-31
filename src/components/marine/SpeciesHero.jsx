import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft, MapPin, Layers, Waves, Calendar, Compass, Heart } from 'lucide-react';
import { getStatusInfo } from './SpeciesCard';
import './SpeciesHero.css';

export default function SpeciesHero({ species }) {
  const statusInfo = getStatusInfo(species.conservationStatus);

  return (
    <section className="species-hero" aria-label={`${species.commonName} Field Profile`}>
      {/* Background Visual */}
      <div className="species-hero__media" aria-hidden="true">
        <img
          src={species.heroImage}
          alt={species.commonName}
          className="species-hero__img"
        />
        <div className="species-hero__overlay" />
        <div className="species-hero__gradient" />
      </div>

      <div className="container species-hero__content">
        {/* Breadcrumbs */}
        <motion.div
          className="species-hero__breadcrumb"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/marine-life" className="species-hero__crumb-link">Marine Life</Link>
          <span className="species-hero__crumb-sep">/</span>
          <Link to="/marine-life/species" className="species-hero__crumb-link">Species Directory</Link>
          <span className="species-hero__crumb-sep">/</span>
          <span className="species-hero__crumb-current">{species.commonName}</span>
        </motion.div>

        {/* Badges / Taxa Meta */}
        <motion.div
          className="species-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="species-hero__group-badge">
            <Layers size={13} />
            <span>{species.group}</span>
          </span>

          <span
            className="species-hero__status-badge"
            style={{
              background: statusInfo.bg,
              borderColor: statusInfo.border,
              color: statusInfo.text,
            }}
          >
            <Shield size={13} />
            <span>{statusInfo.label}</span>
          </span>

          {species.somaliName && (
            <span className="species-hero__somali-badge">
              <span>SOMALI:</span>
              <strong>{species.somaliName}</strong>
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="species-hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {species.commonName}
        </motion.h1>

        {/* Scientific Name */}
        <motion.p
          className="species-hero__scientific"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {species.scientificName}
        </motion.p>

        {/* Editorial Statement */}
        {species.tagline && (
          <motion.p
            className="species-hero__tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            "{species.tagline}"
          </motion.p>
        )}
      </div>
    </section>
  );
}
