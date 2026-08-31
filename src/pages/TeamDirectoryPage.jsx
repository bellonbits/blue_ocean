import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { listTeamMembers } from '../lib/contentApi';
import './TeamDirectoryPage.css';

export default function TeamDirectoryPage() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollReveal();

  useEffect(() => {
    document.title = 'Our Team — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    listTeamMembers()
      .then(setMembers)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main id="main-content" className="team-directory" aria-label="Our Team">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Our People</span>
          <div className="divider centered" />
          <h1 className="section-heading">Meet the Team</h1>
          <p className="section-subheading">
            The researchers and staff working across Somalia's coastline.
          </p>
        </div>

        {isLoading && <div className="team-directory__empty">Loading…</div>}

        {!isLoading && members.length === 0 && (
          <div className="team-directory__empty">
            <Users size={32} />
            <p>No individual profiles published yet.</p>
            <Link to="/research/team" className="btn btn-outline">
              View Research Units instead
            </Link>
          </div>
        )}

        {!isLoading && members.length > 0 && (
          <div className="team-directory__grid reveal">
            {members.map((m) => (
              <Link key={m.id} to={`/about/team/${m.slug}`} className="team-directory-card">
                {m.profile_image && <img src={m.profile_image} alt={m.name} />}
                <div className="team-directory-card__body">
                  <h2>{m.name}</h2>
                  <p>{m.role}</p>
                  {m.location && (
                    <span className="team-directory-card__location">
                      <MapPin size={12} />
                      {m.location}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
