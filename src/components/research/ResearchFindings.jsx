import { BookOpen, Sparkles } from 'lucide-react';
import './ResearchFindings.css';

export default function ResearchFindings({ project }) {
  const hasFindings = project.findings && project.findings.length > 0;

  return (
    <section className="research-findings section" aria-labelledby="research-findings-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>KEY FINDINGS</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-findings-heading">
            What we're discovering
          </h2>
        </div>

        {hasFindings ? (
          <div className="research-findings__grid reveal">
            {project.findings.map((f, i) => (
              <div key={i} className="research-findings__card">
                <div className="research-findings__card-badge">
                  <Sparkles size={13} />
                  <span>KEY FINDING</span>
                </div>
                <h3 className="research-findings__card-title">{f.title}</h3>
                <p className="research-findings__card-desc">{f.description}</p>
                <span className="research-findings__card-source">{f.source}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="research-findings__empty reveal">
            <BookOpen size={28} />
            <p>
              This project is still in its data collection phase. Verified findings will be published here as
              results are confirmed by the {project.researchTeamName}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
