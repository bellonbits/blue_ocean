import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trash2, Recycle, TreePine, Users, BookOpen, Heart, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import FramerCarousel from '../ui/FramerCarousel';
import './ConservationSection.css';

const conservationPillars = [
  {
    id: 'wildlife-protection',
    title: 'Marine Wildlife Protection',
    region: 'Somali Waters',
    status: 'High Priority',
    impact: '12+ Species Tracked',
    desc: 'Safeguarding endangered whale sharks, green sea turtles, and resident spinner dolphins across the Somali basin.',
    image: '/marine_turtles.jpg',
    target: 'Zero Poaching & Safe Corridors',
    stat: '3,025 km',
    statLbl: 'Monitored Shore',
  },
  {
    id: 'coral-habitat',
    title: 'Coral & Habitat Protection',
    region: 'Bajuni & Guardafui',
    status: 'Active Reserve',
    impact: '480 km² Reef Surveyed',
    desc: 'Protecting fragile deep pelagic drop-offs, pristine coral gardens, and mangrove nurseries from illegal dredging.',
    image: '/exp_coral_snorkeling.jpg',
    target: 'Marine Protected Areas (MPAs)',
    stat: '94%',
    statLbl: 'Reef Health Target',
  },
  {
    id: 'beach-cleanup',
    title: 'Coastal Cleanups & Waste',
    region: 'Mogadishu to Bosaso',
    status: 'Community Action',
    impact: '45+ Tons Removed',
    desc: 'Quarterly shoreline cleanups and marine debris interceptor networks operated by local volunteer networks.',
    image: '/con_beach_cleanup.jpg',
    target: 'Plastic-Free Coastlines',
    stat: '1,200+',
    statLbl: 'Volunteers',
  },
  {
    id: 'sustainable-fishing',
    title: 'Artisanal Sustainable Fishing',
    region: 'Puntland & Jubaland',
    status: 'Co-op Program',
    impact: '24 Fishing Villages',
    desc: 'Working with traditional dhow fleets to deploy selective gear, prevent overfishing, and protect nursery grounds.',
    image: '/exp_dhow_sailing.jpg',
    target: 'Fair Trade Blue Economy',
    stat: '100%',
    statLbl: 'Locally Governed',
  },
  {
    id: 'youth-education',
    title: 'Youth Ocean Education',
    region: 'Coastal Schools',
    status: 'Youth Academy',
    impact: '3,500+ Students',
    desc: 'Empowering the next generation of Somali marine biologists, oceanographers, and environmental leaders.',
    image: '/con_youth_education.jpg',
    target: 'Ocean Literacy Curriculum',
    stat: '18',
    statLbl: 'Coastal Academies',
  },
  {
    id: 'plastic-reduction',
    title: 'Circular Waste & Recycling',
    region: 'Urban Seaports',
    status: 'Tech Initiative',
    impact: 'Port Waste Audits',
    desc: 'Transforming recovered ocean plastics into construction materials and maritime gear to prevent sea dumping.',
    image: '/somalia_coast.jpg',
    target: 'Circular Port Systems',
    stat: '85%',
    statLbl: 'Port Diversion',
  },
];

export default function ConservationSection() {
  return (
    <section className="conservation section" aria-labelledby="conservation-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header centered reveal">
          <span className="label-text">Ocean Conservation & Guardianship</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="conservation-heading">
            Protecting Our Living Ocean
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            From safeguarding endangered marine species to empowering coastal communities, explore active initiatives protecting Somalia’s 3,025 km maritime frontier.
          </p>
        </div>

        {/* Moving Framer Carousel */}
        <div className="conservation__carousel-wrap">
          <FramerCarousel
            items={conservationPillars}
            itemWidth={360}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4500}
            renderItem={(pillar) => (
              <div className="con-lux-card">
                {/* Background Image */}
                <div className="con-lux-card__bg">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="con-lux-card__img"
                    loading="lazy"
                  />
                  <div className="con-lux-card__overlay" />
                </div>

                {/* Top Bar: Specs & Status */}
                <div className="con-lux-card__top">
                  <div className="con-lux-card__badge-top">
                    <div className="con-lux-card__status-dot" />
                    <span>{pillar.status}</span>
                  </div>
                  <span className="con-lux-card__region-badge">{pillar.region}</span>
                </div>

                {/* Bottom Card Content with Horizontal Title */}
                <div className="con-lux-card__bottom">
                  <div className="con-lux-card__stat-box">
                    <div>
                      <span className="con-lux-card__stat-num">{pillar.stat}</span>
                      <span className="con-lux-card__stat-lbl">{pillar.statLbl}</span>
                    </div>
                    <div className="con-lux-card__impact-pill">
                      <Sparkles size={12} />
                      <span>{pillar.impact}</span>
                    </div>
                  </div>

                  <h3 className="con-lux-card__title">{pillar.title}</h3>
                  <p className="con-lux-card__desc">{pillar.desc}</p>

                  <Link to="/conservation" className="con-lux-card__cta">
                    <span>Explore Initiative</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          />
        </div>

        {/* Get Involved Banner */}
        <div className="conservation__banner reveal">
          <div className="conservation__banner-inner">
            <div className="conservation__banner-text">
              <Heart size={26} color="#02CCFE" />
              <div>
                <h3 className="conservation__banner-title">Join the Ocean Stewardship Network</h3>
                <p className="conservation__banner-sub">
                  Every action protects Somalia’s marine future — volunteer, partner, or sponsor an initiative.
                </p>
              </div>
            </div>
            <div className="conservation__banner-actions">
              <Link to="/get-involved/volunteer" className="btn btn-primary" id="con-volunteer-btn">
                Volunteer With Us
              </Link>
              <Link to="/get-involved/partner" className="btn btn-outline" id="con-partner-btn">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
