import { Shield, AlertCircle, Heart, Anchor, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSpeciesStatusInfo } from '../../data/marineLife';
import { getConservationProjectsForSpecies } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import './ConservationStatusSection.css';

export default function ConservationStatusSection({ species }) {
  const { language } = useLanguage();
  const statusInfo = getSpeciesStatusInfo(species.conservationStatus, language);
  const linkedProjects = getConservationProjectsForSpecies(species.slug, language);

  return (
    <section className="con-status-sec section" aria-labelledby="con-status-heading">
      <div className="container">
        <div className="con-status-sec__card reveal">
          {/* Top Pill & Title */}
          <div className="con-status-sec__header">
            <span className="label-text" style={{ color: '#02CCFE' }}>
              IUCN RED LIST ASSESSMENT
            </span>
            <h2 className="con-status-sec__title" id="con-status-heading">
              Conservation matters
            </h2>
          </div>

          <div className="con-status-sec__content-grid">
            {/* Left: Big Status Badge Box */}
            <div
              className="con-status-sec__status-box"
              style={{
                background: statusInfo.bg,
                borderColor: statusInfo.border,
              }}
            >
              <Shield size={36} color={statusInfo.text} />
              <div className="con-status-sec__status-meta">
                <span className="con-status-sec__status-prefix">GLOBAL STATUS</span>
                <span className="con-status-sec__status-name" style={{ color: statusInfo.text }}>
                  {statusInfo.label}
                </span>
                <span className="con-status-sec__status-authority">Verified Marine Database</span>
              </div>
            </div>

            {/* Right: Explanation & Protective Measures */}
            <div className="con-status-sec__narrative-wrap">
              <p className="con-status-sec__explanation">
                {species.statusExplanation ||
                  `The ${species.commonName} is tracked under active marine conservation programs along the Somali coast to mitigate bycatch risks and preserve crucial breeding grounds.`}
              </p>

              {linkedProjects.length > 0 && (
                <div className="con-status-sec__initiatives">
                  <h4 className="con-status-sec__init-title">Active Protective Actions in Somalia:</h4>
                  <div className="con-status-sec__init-list">
                    {linkedProjects.map((p) => (
                      <Link key={p.id} to={`/conservation/projects/${p.slug}`} className="con-status-sec__init-item">
                        <CheckCircle2 size={16} className="con-status-sec__check-icon" />
                        <div className="con-status-sec__init-text">
                          <strong>{p.title}</strong> — <span>{p.region}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="con-status-sec__cta-row">
                <Link
                  to={linkedProjects.length === 1 ? `/conservation/projects/${linkedProjects[0].slug}` : '/conservation'}
                  className="con-status-sec__action-btn"
                >
                  <span>Learn About Our Conservation Work</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
