import { Link } from 'react-router-dom';
import { Compass, BookOpen, Heart, Handshake, ArrowRight } from 'lucide-react';
import '../research/ResearchIntro.css';

const paths = [
  { icon: Compass, title: 'Visit', text: 'Explore the coast.', to: '/explore-the-coast' },
  { icon: BookOpen, title: 'Learn', text: 'Discover marine life and research.', to: '/marine-life' },
  { icon: Heart, title: 'Support', text: 'Support conservation.', to: '/get-involved/support' },
  { icon: Handshake, title: 'Partner', text: 'Work with Blue Ocean.', to: '/get-involved/partner' },
];

export default function TourismGetInvolved() {
  return (
    <section className="research-intro section" aria-labelledby="tourism-get-involved-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Get Involved</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-get-involved-heading">
            Your path into Blue Ocean.
          </h2>
        </div>

        <div className="research-intro__grid reveal" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {paths.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link key={i} to={p.to} className="research-intro__card" style={{ textDecoration: 'none' }}>
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{p.title}</h3>
                <p className="research-intro__card-text">{p.text}</p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: 'var(--space-3)',
                    color: 'var(--color-turquoise)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
