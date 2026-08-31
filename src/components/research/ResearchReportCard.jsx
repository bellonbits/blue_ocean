import { Link } from 'react-router-dom';
import { FileText, Sparkles, Calendar } from 'lucide-react';
import './ResearchReportCard.css';

export default function ResearchReportCard({ report }) {
  return (
    <article className="report-card">
      <div className="report-card__icon">
        <FileText size={22} />
      </div>

      <div className="report-card__body">
        <div className="report-card__top">
          <span className="report-card__area">{report.areaName}</span>
          <span className="badge badge-coming-soon">
            <Sparkles size={11} />
            <span>Coming Soon</span>
          </span>
        </div>

        <h3 className="report-card__title">{report.title}</h3>
        <p className="report-card__summary">{report.summary}</p>

        <div className="report-card__meta">
          <span className="report-card__meta-item">
            <Calendar size={12} />
            <span>{report.publicationYear}</span>
          </span>
          <span className="report-card__meta-item">{report.author}</span>
        </div>

        <Link to={`/research/projects/${report.projectSlug}`} className="report-card__link">
          <span>View related project</span>
        </Link>
      </div>
    </article>
  );
}
