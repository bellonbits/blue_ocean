import { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './SpeciesGallery.css';

export default function SpeciesGallery({ gallery = [], commonName = 'Marine Species' }) {
  const [activeModalIdx, setActiveModalIdx] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="species-gal section" aria-labelledby="species-gal-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">VISUAL DOCUMENTATION</span>
          <div className="divider" />
          <h2 className="section-heading" id="species-gal-heading">
            Field Photography & Encounters
          </h2>
          <p className="section-subheading">
            Photographic records and scientific underwater documentation captured across the Somali maritime corridor.
          </p>
        </div>

        {/* Gallery Grid (Main large photo on left, stacked photos on right) */}
        <div className="species-gal__grid">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className={`species-gal__item ${idx === 0 ? 'is-primary' : 'is-secondary'}`}
              onClick={() => setActiveModalIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setActiveModalIdx(idx); }}
              aria-label={`View photo ${idx + 1}: ${item.caption || commonName}`}
            >
              <img src={item.url} alt={item.caption || commonName} className="species-gal__img" loading="lazy" />
              <div className="species-gal__overlay" />

              <div className="species-gal__caption-bar">
                {item.caption && <p className="species-gal__caption">{item.caption}</p>}
                {item.photographer && (
                  <span className="species-gal__credit">
                    <Camera size={12} />
                    <span>{item.photographer}</span>
                  </span>
                )}
              </div>

              <div className="species-gal__zoom-badge" aria-hidden="true">
                <Maximize2 size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalIdx !== null && (
        <div className="species-gal__modal" onClick={() => setActiveModalIdx(null)}>
          <button
            type="button"
            className="species-gal__modal-close"
            onClick={() => setActiveModalIdx(null)}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="species-gal__modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeModalIdx].url}
              alt={gallery[activeModalIdx].caption || commonName}
              className="species-gal__modal-img"
            />
            <div className="species-gal__modal-footer">
              <p className="species-gal__modal-caption">
                {gallery[activeModalIdx].caption}
              </p>
              {gallery[activeModalIdx].photographer && (
                <span className="species-gal__modal-credit">
                  Photo by: {gallery[activeModalIdx].photographer}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
