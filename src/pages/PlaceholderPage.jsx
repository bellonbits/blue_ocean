import { Link } from 'react-router-dom';
import { Waves, ArrowLeft } from 'lucide-react';
import './Placeholder.css';

export default function PlaceholderPage({ title, description, emoji = '🌊' }) {
  return (
    <main className="placeholder-page" aria-label={title}>
      <div className="placeholder-page__content">
        <div className="placeholder-page__emoji" aria-hidden="true">{emoji}</div>
        <div className="placeholder-page__icon" aria-hidden="true">
          <Waves size={32} strokeWidth={1.5} />
        </div>
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__desc">{description}</p>
        <div className="placeholder-page__badge">
          <span>Coming in the next sprint</span>
        </div>
        <Link to="/" className="btn btn-outline" id="placeholder-back-home">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
      {/* Background decoration */}
      <div className="placeholder-page__bg" aria-hidden="true" />
    </main>
  );
}
