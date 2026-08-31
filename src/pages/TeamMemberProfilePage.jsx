import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, FileText, Compass } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getTeamMember, listTeamMembers } from '../lib/contentApi';
import { ICON_MAP } from '../components/shared/SocialIcons';
import './TeamMemberProfilePage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function TeamMemberProfilePage() {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [relatedStories, setRelatedStories] = useState([]);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    setMember(null);
    setNotFound(false);

    getTeamMember(slug)
      .then(async (m) => {
        if (cancelled) return;
        setMember(m);
        document.title = `${m.name} — Blue Ocean Somalia`;

        // Related Stories: published news articles that reference any of
        // this person's research/conservation projects — a real
        // connection derived from existing data, not a stored relation.
        const projectIds = new Set([
          ...m.research_projects.map((p) => p.id),
          ...m.conservation_projects.map((p) => p.id),
        ]);
        if (projectIds.size === 0) return;
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/news-articles`);
          const articles = await res.json();
          const related = articles.filter((a) =>
            a.research_projects.some((p) => projectIds.has(p.id)) ||
            a.conservation_projects.some((p) => projectIds.has(p.id))
          );
          if (!cancelled) setRelatedStories(related.slice(0, 3));
        } catch {
          // Related stories are a bonus, not essential — fail quietly.
        }
      })
      .catch(() => { if (!cancelled) setNotFound(true); });

    return () => { cancelled = true; };
  }, [slug]);

  if (notFound) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Compass size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Profile Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            This team member's profile isn't published, or doesn't exist.
          </p>
          <Link to="/about/team" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Back to Team</span>
          </Link>
        </div>
      </main>
    );
  }

  if (!member) {
    return <main style={{ minHeight: '70vh' }} />;
  }

  const publications = member.research_projects.filter((p) => p.status === 'Published');

  return (
    <main id="main-content" aria-label={`Profile: ${member.name}`}>
      {/* Hero */}
      <section className="team-hero">
        {member.cover_image && (
          <div className="team-hero__bg">
            <img src={member.cover_image} alt="" />
            <div className="team-hero__overlay" />
          </div>
        )}
        <div className="container team-hero__container">
          <Link to="/about/team" className="team-hero__back anim-slide-up">
            <ArrowLeft size={16} />
            <span>Meet the Team</span>
          </Link>

          <div className="team-hero__content anim-slide-up anim-delay-200">
            {member.profile_image && (
              <img src={member.profile_image} alt={member.name} className="team-hero__portrait" />
            )}
            <div>
              <h1 className="team-hero__name display-heading">{member.name}</h1>
              <p className="team-hero__role">{member.role}</p>
              {member.location && (
                <span className="team-hero__location">
                  <MapPin size={14} />
                  {member.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      {member.biography && (
        <section className="section" aria-labelledby="team-about-heading">
          <div className="container">
            <div className="team-about reveal">
              <span className="label-text">About</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-about-heading">
                Working at the intersection of science, conservation, and coastal communities.
              </h2>
              <p className="team-about__bio">{member.biography}</p>
            </div>
          </div>
        </section>
      )}

      {/* Expertise */}
      {member.expertise.length > 0 && (
        <section className="section theme-section-dark" aria-labelledby="team-expertise-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Focus</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-expertise-heading">Areas of Expertise</h2>
            </div>
            <div className="team-expertise-grid reveal">
              {member.expertise.map((e) => (
                <span key={e} className="team-expertise-card">{e}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Research Projects */}
      {member.research_projects.length > 0 && (
        <section className="section" aria-labelledby="team-research-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Research</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-research-heading">Research Projects</h2>
            </div>
            <div className="team-project-grid reveal">
              {member.research_projects.map((p) => (
                <Link key={p.id} to={`/research/projects/${p.slug}`} className="team-project-card">
                  {p.hero_image && <img src={p.hero_image} alt="" />}
                  <div className="team-project-card__body">
                    <span>{p.title}</span>
                    <span className="team-project-card__cta">Explore <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conservation Projects */}
      {member.conservation_projects.length > 0 && (
        <section className="section theme-section-dark" aria-labelledby="team-conservation-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Conservation</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-conservation-heading">Conservation Projects</h2>
            </div>
            <div className="team-project-grid reveal">
              {member.conservation_projects.map((p) => (
                <Link key={p.id} to={`/conservation/projects/${p.slug}`} className="team-project-card">
                  {p.hero_image && <img src={p.hero_image} alt="" />}
                  <div className="team-project-card__body">
                    <span>{p.title}</span>
                    <span className="team-project-card__cta">Explore <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <section className="section" aria-labelledby="team-publications-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Publications</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-publications-heading">Publications &amp; Reports</h2>
            </div>
            <div className="publications-list reveal">
              {publications.map((p) => (
                <Link key={p.id} to={`/research/projects/${p.slug}`} className="publication-card">
                  <div className="publication-card__meta">
                    <FileText size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Research Report
                  </div>
                  <h3 className="publication-card__title">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Field Gallery */}
      {member.gallery.length > 0 && (
        <section className="section theme-section-dark" aria-labelledby="team-gallery-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Field Notes</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-gallery-heading">Field Gallery</h2>
            </div>
            <div className="team-gallery-grid reveal">
              {member.gallery.map((img, i) => (
                <figure key={i} className="team-gallery-item">
                  <img src={img.url} alt={img.caption || ''} />
                  {(img.caption || img.location || img.date) && (
                    <figcaption>
                      {img.caption}
                      {img.location && <span> · {img.location}</span>}
                      {img.date && <span> · {img.date}</span>}
                      {img.credit && <span className="team-gallery-item__credit"> · {img.credit}</span>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="section" aria-labelledby="team-stories-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="label-text">Featured In</span>
              <div className="divider" />
              <h2 className="section-heading" id="team-stories-heading">Related Stories</h2>
            </div>
            <div className="team-project-grid reveal">
              {relatedStories.map((a) => (
                <Link key={a.id} to={`/news/${a.slug}`} className="team-project-card">
                  {a.featured_image && <img src={a.featured_image} alt="" />}
                  <div className="team-project-card__body">
                    <span>{a.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact / Connect */}
      {(member.email || member.phone || member.social_links.length > 0) && (
        <section className="section theme-section-dark" aria-labelledby="team-contact-heading">
          <div className="container team-contact reveal">
            <span className="label-text">Connect</span>
            <div className="divider centered" />
            <h2 className="section-heading" id="team-contact-heading">Get in touch</h2>
            <div className="team-contact__links">
              {member.email && (
                <a href={`mailto:${member.email}`} className="btn btn-outline">
                  <Mail size={16} /><span>{member.email}</span>
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone}`} className="btn btn-outline">
                  <Phone size={16} /><span>{member.phone}</span>
                </a>
              )}
              {member.social_links.map((link) => {
                const Icon = ICON_MAP[link.label] || Compass;
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <Icon size={16} /><span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
