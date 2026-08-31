import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import '../experiences/ExperienceGallery.css';

export default function CommunityGallery({ community, story }) {
  const [lightboxImg, setLightboxImg] = useState(null);
  const images = community?.gallery && community.gallery.length >= 3
    ? community.gallery
    : [{ url: story.featuredImage, caption: story.title }];

  return (
    <section className="exp-gallery-section section" aria-label={`${story.title} Photo Gallery`}>
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">Visual Preview</span>
          <div className="divider" />
          <h2 className="section-heading">Field Photography</h2>
          <p className="section-subheading">
            A preview of the people and places connected to {story.communityName || story.title}.
          </p>
        </div>

        <div className="exp-gallery-layout reveal">
          <div className="exp-gallery-item exp-gallery-item--featured" onClick={() => setLightboxImg(images[0])}>
            <img src={images[0].url} alt={images[0].caption} className="exp-gallery-img" loading="lazy" />
            <div className="exp-gallery-overlay">
              <span className="exp-gallery-zoom">
                <Maximize2 size={16} />
                <span>View Full Photo</span>
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="exp-gallery-stacked">
              {images.slice(1, 3).map((img, i) => (
                <div key={i} className="exp-gallery-item" onClick={() => setLightboxImg(img)}>
                  <img src={img.url} alt={img.caption} className="exp-gallery-img" loading="lazy" />
                  <div className="exp-gallery-overlay">
                    <span className="exp-gallery-zoom">
                      <Maximize2 size={16} />
                      <span>View Full Photo</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightboxImg && (
        <div className="exp-lightbox" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true">
          <button className="exp-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close photo preview">
            <X size={24} />
          </button>
          <figure className="exp-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg.url} alt={lightboxImg.caption} className="exp-lightbox-img" />
            {lightboxImg.caption && <figcaption className="exp-lightbox-caption">{lightboxImg.caption}</figcaption>}
          </figure>
        </div>
      )}
    </section>
  );
}
