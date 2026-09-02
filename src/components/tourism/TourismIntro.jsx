import { Compass, BookOpen, Shield } from 'lucide-react';
import '../research/ResearchIntro.css';

const points = [
  {
    icon: Compass,
    title: 'Explore',
    text: 'Discover remarkable coastal destinations across three regions — from dramatic cliffs to tropical atolls and historic harbors.',
  },
  {
    icon: BookOpen,
    title: 'Learn',
    text: "Understand the marine environment and the wildlife that depends on it, grounded in Blue Ocean's own field research.",
  },
  {
    icon: Shield,
    title: 'Protect',
    text: 'Experience the coast responsibly and help support its future — tourism as part of the conservation mission, not separate from it.',
  },
];

export default function TourismIntro() {
  return (
    <section className="research-intro section" aria-labelledby="tourism-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Blue Ocean Tourism</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-intro-heading">
            A coastline waiting to be discovered.
          </h2>
          <p className="section-subheading">
            Somalia's coastline stretches across thousands of kilometres of Indian Ocean waters, connecting diverse
            marine ecosystems, coastal landscapes, and communities. Blue Ocean brings these places together through
            responsible tourism, marine education, and exploration.
          </p>
        </div>

        <div className="research-intro__grid reveal" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{p.title}</h3>
                <p className="research-intro__card-text">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
