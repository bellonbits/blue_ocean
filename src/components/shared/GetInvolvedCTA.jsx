import { Link } from 'react-router-dom';
import { ArrowRight, HandHeart, Handshake, HeartHandshake } from 'lucide-react';
import '../experiences/ExperienceCategories.css';

const pathways = [
  {
    id: 'volunteer',
    title: 'Volunteer',
    tagline: 'Give your time and skills.',
    cta: 'Become a Volunteer',
    path: '/get-involved/volunteer',
    image: '/con_youth_education.jpg',
    icon: HandHeart,
  },
  {
    id: 'partner',
    title: 'Partner',
    tagline: 'Work with Blue Ocean to create lasting impact.',
    cta: 'Partner With Us',
    path: '/get-involved/partner',
    image: '/exp_dhow_sailing.jpg',
    icon: Handshake,
  },
  {
    id: 'support',
    title: 'Support',
    tagline: 'Help advance ocean research and conservation.',
    cta: 'Support a Project',
    path: '/get-involved/support',
    image: '/con_beach_cleanup.jpg',
    icon: HeartHandshake,
  },
];

export default function GetInvolvedCTA() {
  return (
    <section className="exp-cats section" aria-labelledby="get-involved-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">GET INVOLVED</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="get-involved-heading">
            Be part of the story.
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            The future of Somalia's ocean depends on people who are willing to explore, learn and act.
          </p>
        </div>

        <div className="exp-cats__grid">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <Link key={p.id} to={p.path} className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={p.image} alt={p.title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{p.title}</h3>
                  <p className="exp-cat-card__tagline">{p.tagline}</p>

                  <span className="exp-cat-card__cta">
                    <span>{p.cta}</span>
                    <ArrowRight size={14} className="exp-cat-card__arrow" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
