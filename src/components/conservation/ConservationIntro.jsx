import { Fish, Shield, Anchor, Trash2, GraduationCap, Users, Microscope } from 'lucide-react';
import '../research/ResearchIntro.css';

const points = [
  {
    icon: Fish,
    title: 'Marine wildlife protection',
    text: 'Safeguarding endangered and vulnerable species — sea turtles, sharks, dugongs, and cetaceans — across Somali waters.',
  },
  {
    icon: Shield,
    title: 'Habitat protection',
    text: 'Defending coral reefs, seagrass meadows, and mangrove nurseries against degradation and unregulated development.',
  },
  {
    icon: Anchor,
    title: 'Sustainable fishing',
    text: 'Working directly with artisanal fleets to protect fish stocks and nursery grounds without undermining livelihoods.',
  },
  {
    icon: Trash2,
    title: 'Pollution reduction',
    text: 'Mapping marine debris and water quality, then organizing the cleanup and prevention work that data points toward.',
  },
  {
    icon: GraduationCap,
    title: 'Ocean education',
    text: 'Building ocean literacy in coastal schools and communities to grow the next generation of stewards.',
  },
  {
    icon: Users,
    title: 'Community conservation',
    text: 'Partnering with coastal communities so conservation is led by the people who depend on the ocean most.',
  },
  {
    icon: Microscope,
    title: 'Research-driven conservation',
    text: 'Every initiative here is built directly on Blue Ocean\'s own field research — not assumption.',
  },
];

export default function ConservationIntro() {
  return (
    <section className="research-intro section" aria-labelledby="conservation-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">Our Approach</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-intro-heading">
            The ocean gives us life. Protecting it is everyone's responsibility.
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
