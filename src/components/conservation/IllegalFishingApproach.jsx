import { Microscope, GraduationCap, Users, Handshake } from 'lucide-react';
import '../research/ResearchIntro.css';

const points = [
  {
    icon: Microscope,
    title: 'Research & documentation',
    text: 'Publishing research findings, fisheries studies, marine biodiversity observations, documented threats, and coastal community knowledge as reports and conservation updates.',
  },
  {
    icon: GraduationCap,
    title: 'Awareness',
    text: 'Educational content explaining what illegal fishing is, how it affects marine ecosystems and local fishermen, how it affects food security, and why sustainable fishing matters.',
  },
  {
    icon: Users,
    title: 'Community engagement',
    text: 'Highlighting local fishermen, fishing communities, traditional knowledge, community monitoring, sustainable fishing initiatives, and youth education.',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    text: 'Working, over time, with relevant government institutions, research and conservation organizations, coastal communities, fisheries organizations, and international partners.',
  },
];

export default function IllegalFishingApproach() {
  return (
    <section className="research-intro section" aria-labelledby="illegal-fishing-approach-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Our Response</span>
          <div className="divider" />
          <h2 className="section-heading" id="illegal-fishing-approach-heading">
            What Blue Ocean is doing about it.
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            This isn't a claim that illegal fishing is a problem — it's an account of the work. Evidence-based
            conservation, not unsupported accusations against specific individuals or organizations.
          </p>
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
