import { Link } from 'react-router-dom';
import { FlaskConical, Shield, Fish, MapPin, Compass, Users, ArrowRight } from 'lucide-react';
import './ArticleReferences.css';

function Group({ icon: Icon, label, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="article-refs__group">
      <span className="article-refs__group-label">
        <Icon size={14} />
        <span>{label}</span>
      </span>
      <div className="article-refs__links">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="article-refs__link">
            <span>{item.label}</span>
            <ArrowRight size={13} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ArticleReferences({ article }) {
  const hasAny =
    article.research.length || article.conservation.length || article.species.length ||
    article.destinations.length || article.experiences.length || article.communityLinks.length;

  if (!hasAny) return null;

  return (
    <section className="article-refs section" aria-labelledby="article-refs-heading">
      <div className="container">
        <div className="article-refs__col">
          <div className="section-header reveal">
            <span className="label-text">KEEP EXPLORING</span>
            <div className="divider" />
            <h2 className="section-heading" id="article-refs-heading">
              Related to this story
            </h2>
          </div>

          <div className="article-refs__groups reveal">
            <Group
              icon={FlaskConical}
              label="Related Research"
              items={article.research.map((r) => ({ to: `/research/projects/${r.slug}`, label: r.title }))}
            />
            <Group
              icon={Shield}
              label="Related Conservation"
              items={article.conservation.map((c) => ({ to: `/conservation/projects/${c.slug}`, label: c.title }))}
            />
            <Group
              icon={Fish}
              label="Species Mentioned"
              items={article.species.map((s) => ({ to: `/marine-life/species/${s.slug}`, label: s.commonName }))}
            />
            <Group
              icon={MapPin}
              label="Explore This Coastline"
              items={article.destinations.map((d) => ({ to: `/explore-the-coast/${d.slug}`, label: d.name }))}
            />
            <Group
              icon={Compass}
              label="Ocean Experiences"
              items={article.experiences.map((e) => ({ to: `/experiences/${e.slug}`, label: e.title }))}
            />
            <Group
              icon={Users}
              label="Community Connection"
              items={article.communityLinks.map((c) => ({ to: '/communities', label: c.name }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
