import { Fish, Users, Trash2, Compass, Shield, Anchor, Footprints } from 'lucide-react';
import '../research/ResearchIntro.css';

const topics = [
  { icon: Fish, title: 'Protect marine wildlife', text: 'Keep a respectful distance from sea turtles, dolphins, and reef life — observe without disturbing.' },
  { icon: Users, title: 'Respect coastal communities', text: 'Coastal towns are home to fishing families first — visit with the same respect you would want shown to your own community.' },
  { icon: Trash2, title: 'Reduce plastic', text: 'Carry out what you carry in. Somalia\'s coastline is still remarkably clean — help keep it that way.' },
  { icon: Compass, title: 'Follow local guidance', text: 'Local knowledge of currents, seasons, and safe access routes exists for a reason — follow it.' },
  { icon: Shield, title: 'Protect coral & habitats', text: 'Never stand on or touch coral. A single careless fin kick can undo decades of growth.' },
  { icon: Anchor, title: 'Support sustainable fishing', text: 'Choose operators and communities practicing sustainable, traceable fishing wherever possible.' },
  { icon: Footprints, title: 'Leave no trace', text: 'The goal is to leave every stretch of coast exactly as remarkable as you found it.' },
];

export default function TourismResponsible() {
  return (
    <section className="research-intro section" aria-labelledby="tourism-responsible-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Responsible Tourism</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-responsible-heading">
            Explore responsibly.
          </h2>
        </div>

        <div className="research-intro__grid reveal">
          {topics.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{t.title}</h3>
                <p className="research-intro__card-text">{t.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
