import { HelpCircle, Waves, MapPin, ShieldCheck, Users } from 'lucide-react';
import './ResearchIntro.css';

const points = [
  {
    icon: HelpCircle,
    title: 'What we research',
    text: 'Marine biodiversity, fisheries, coral reefs, sharks and rays, cetaceans, sea turtles, ocean pollution, water quality, and coastal ecosystems.',
  },
  {
    icon: Waves,
    title: 'Why it matters',
    text: 'Somalia has one of Africa’s longest and least-studied coastlines — every survey fills a real gap in what is known about it.',
  },
  {
    icon: MapPin,
    title: 'Where research happens',
    text: 'From the deep pelagic upwellings off Puntland to the coral atolls and mangrove estuaries of Jubaland.',
  },
  {
    icon: ShieldCheck,
    title: 'How it drives conservation',
    text: 'Findings feed directly into marine protected area proposals, sustainable fishing guidelines, and species protection programs.',
  },
  {
    icon: Users,
    title: 'How it connects to communities',
    text: 'Fishing cooperatives, beach guardians, and traditional maritime knowledge holders are partners in the fieldwork itself.',
  },
];

export default function ResearchIntro() {
  return (
    <section className="research-intro section" aria-labelledby="research-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Why we research</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-intro-heading">
            Every expedition begins with a question.
          </h2>
        </div>

        <div className="research-intro__grid reveal">
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
