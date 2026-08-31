import { useState } from 'react';
import { Camera, Maximize2, X } from 'lucide-react';
import './DestinationGallery.css';

export default function DestinationGallery({ destination }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  const images = destination.gallery && destination.gallery.length >= 3
    ? destination.gallery
    : [destination.heroImage, '/marine_coral.jpg', '/marine_fish.jpg'];

  return (
    <section className="dest-gallery-section section" aria-label={`${destination.name} Photo Gallery`}>
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">Visual Documentation</span>
          <div className="divider" />
          <h2 className="section-heading">
            Coastal Perspectives
          </h2>
          <p className="section-subheading">
            Photographic surveys capturing the topography, seascapes, and coastal life of {destination.name}.
          </p>
        </div>

        {/* Editorial Asymmetrical Composition (1 large left, 2 stacked right) */}
        <div className="dest-gallery-layout reveal">
          {/* Main Large Image */}
          <div
            className="dest-gallery-item dest-gallery-item--featured"
            onClick={() => setLightboxImg(images[0])}
          >
            <img
              src={images[0]}
              alt={`${destination.name} coastal landscape`}
              className="dest-gallery-img"
              loading="lazy"
            />
            <div className="dest-gallery-overlay">
              <span className="dest-gallery-zoom">
                <Maximize2 size={16} />
                <span>View Full Photo</span>
              </span>
            </div>
          </div>

          {/* Stacked Right Images */}
          <div className="dest-gallery-stacked">
            <div
              className="dest-gallery-item"
              onClick={() => setLightboxImg(images[1])}
            >
              <img
                src={images[1]}
                alt={`${destination.name} marine environment`}
                className="dest-gallery-img"
                loading="lazy"
              />
              <div className="dest-gallery-overlay">
                <span className="dest-gallery-zoom">
                  <Maximize2 size={16} />
                  <span>View Full Photo</span>
                </span>
              </div>
            </div>

            <div
              className="dest-gallery-item"
              onClick={() => setLightboxImg(images[2])}
            >
              <img
                src={images[2]}
                alt={`${destination.name} marine biodiversity`}
                className="dest-gallery-img"
                loading="lazy"
              />
              <div className="dest-gallery-overlay">
                <span className="dest-gallery-zoom">
                  <Maximize2 size={16} />
                  <span>View Full Photo</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="dest-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="dest-lightbox-close"
            onClick={() => setLightboxImg(null)}
            aria-label="Close photo preview"
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt={`${destination.name} photographic detail`}
            className="dest-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
