import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink } from 'lucide-react';
import { geomorphologySections, figureCredits, articleSource } from '../../data/coastalGeomorphology';
import './CoastalGeomorphology.css';

function figureFor(id) {
  return figureCredits.find((f) => f.id === id);
}

export default function CoastalGeomorphology() {
  return (
    <section className="coastal-geo section" aria-labelledby="coastal-geo-heading">
      <div className="container">
        <div className="coastal-geo__archive-notice reveal">
          <BookOpen size={16} />
          <span>
            This page summarizes findings from a peer-reviewed 2000 geological study of the Somali coast — an
            authoritative pre-war scientific baseline, not current field data. A handful of the paper's original
            figures are reproduced below with full credit; all narrative text is written independently from its
            findings, not copied from the source.
          </span>
        </div>

        <div className="section-header reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>SCIENTIFIC REFERENCE</span>
          <div className="divider" />
          <h2 className="section-heading" id="coastal-geo-heading">
            How Somalia's coastline was built
          </h2>
          <p className="section-subheading">
            The geology, currents, and habitats behind Somalia's 3,025 km coastline — from the Merka dune complex
            to the Bajuni Archipelago's barrier reefs.
          </p>
        </div>

        <div className="coastal-geo__sections">
          {geomorphologySections.map((sec) => {
            const fig = sec.figureId ? figureFor(sec.figureId) : null;
            return (
              <article className="coastal-geo__section reveal" key={sec.id} id={sec.id}>
                <div className="coastal-geo__section-body">
                  <span className="coastal-geo__section-label">{sec.label}</span>
                  <h3 className="coastal-geo__section-title">{sec.title}</h3>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {fig && (
                  <figure className="coastal-geo__figure">
                    <img src={fig.image} alt={fig.caption} loading="lazy" />
                    <figcaption>
                      <strong>{fig.figureLabel}.</strong> {fig.caption}
                      <span className="coastal-geo__figure-credit">{fig.credit}</span>
                    </figcaption>
                  </figure>
                )}
              </article>
            );
          })}
        </div>

        <div className="coastal-geo__sources reveal">
          <h3>Source & citation</h3>
          <p>{articleSource.citation}</p>
          <p className="coastal-geo__doi">
            DOI:{' '}
            <a
              href={`https://doi.org/${articleSource.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="coastal-geo__def-link"
            >
              {articleSource.doi} <ExternalLink size={12} />
            </a>
          </p>
          <p className="coastal-geo__related">
            See also our <Link to="/research/statistics">Coastal & Marine Statistics reference</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
