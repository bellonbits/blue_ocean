import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Fish, Waves, Microscope, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listDestinations } from '../../lib/contentApi';
import { getSpeciesBySlug } from '../../data/marineLife';
import { getExperienceBySlug } from '../../data/experiences';
import { getProjectBySlug } from '../../data/research';

const TABS = [
  { key: 'all', label: 'All', icon: Heart },
  { key: 'destination', label: 'Destinations', icon: MapPin },
  { key: 'species', label: 'Marine Life', icon: Fish },
  { key: 'experience', label: 'Experiences', icon: Waves },
  { key: 'research', label: 'Research', icon: Microscope },
];

const TYPE_LABEL = {
  destination: 'Destination',
  species: 'Marine Life',
  experience: 'Experience',
  research: 'Research',
};

function resolveSavedItem(item, destinationsBySlug) {
  switch (item.content_type) {
    case 'destination': {
      const d = destinationsBySlug.get(item.content_slug);
      if (!d) return null;
      return { title: d.name, subtitle: d.region, image: d.heroImage, path: `/explore-the-coast/${d.slug}` };
    }
    case 'species': {
      const s = getSpeciesBySlug(item.content_slug);
      if (!s) return null;
      return { title: s.commonName, subtitle: s.scientificName, image: s.heroImage, path: `/marine-life/species/${s.slug}` };
    }
    case 'experience': {
      const e = getExperienceBySlug(item.content_slug);
      if (!e) return null;
      return { title: e.title, subtitle: e.categoryName, image: e.heroImage, path: `/experiences/${e.slug}` };
    }
    case 'research': {
      const p = getProjectBySlug(item.content_slug);
      if (!p) return null;
      return { title: p.title, subtitle: p.areaName, image: p.heroImage, path: `/research/projects/${p.slug}` };
    }
    default:
      return null;
  }
}

export default function SavedPage() {
  const { savedItems, toggleSaved } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [destinationsBySlug, setDestinationsBySlug] = useState(new Map());

  useEffect(() => {
    document.title = 'Saved — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (savedItems.some((item) => item.content_type === 'destination')) {
      listDestinations()
        .then((list) => {
          if (!cancelled) setDestinationsBySlug(new Map(list.map((d) => [d.slug, d])));
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedItems.length]);

  const resolved = useMemo(
    () =>
      savedItems
        .filter((item) => activeTab === 'all' || item.content_type === activeTab)
        .map((item) => ({ item, view: resolveSavedItem(item, destinationsBySlug) }))
        .filter((entry) => entry.view !== null),
    [savedItems, activeTab, destinationsBySlug]
  );

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>Saved</h1>
        <p>Everything you've bookmarked across the coast, marine life, experiences, and research.</p>
      </div>

      <div className="user-dash-tabs">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`user-dash-tab ${activeTab === key ? 'user-dash-tab--active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {resolved.length === 0 ? (
        <div className="user-dash-empty">
          <Heart size={28} />
          <p>Nothing saved here yet — tap the heart icon on any destination, species, experience, or research project to bookmark it.</p>
          <Link to="/explore-the-coast" className="btn btn-primary btn-sm">
            <span>Start Exploring</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="user-dash-recent-grid">
          {resolved.map(({ item, view }) => (
            <div key={item.id} className="user-dash-recent-card user-dash-recent-card--removable">
              <button
                type="button"
                className="user-dash-recent-card__remove"
                aria-label="Remove from Saved"
                onClick={() => toggleSaved(item.content_type, item.content_slug)}
              >
                <X size={14} />
              </button>
              <Link to={view.path} className="user-dash-recent-card__inner">
                <div className="user-dash-recent-card__media">
                  {view.image && <img src={view.image} alt="" loading="lazy" />}
                </div>
                <div className="user-dash-recent-card__body">
                  <span className="user-dash-recent-card__type">{TYPE_LABEL[item.content_type]}</span>
                  <h3>{view.title}</h3>
                  {view.subtitle && <p>{view.subtitle}</p>}
                  <span className="user-dash-recent-card__cta">
                    <span>View</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
