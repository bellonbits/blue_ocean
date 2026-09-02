import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, ArrowRight, Users, Handshake, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listMyApplications } from '../../lib/dashboardApi';

const TYPE_META = {
  volunteer: { label: 'Volunteer', icon: Users },
  partner: { label: 'Partner', icon: Handshake },
  support: { label: 'Support', icon: HeartHandshake },
};

const STATUS_META = {
  submitted: { label: 'Submitted', className: '' },
  reviewing: { label: 'Reviewing', className: 'user-dash-app-row__status--reviewing' },
  accepted: { label: 'Accepted', className: 'user-dash-app-row__status--accepted' },
  declined: { label: 'Declined', className: 'user-dash-app-row__status--declined' },
};

const WAYS_TO_HELP = [
  { to: '/get-involved/volunteer', label: 'Volunteer', desc: 'Offer your time and skills.', icon: Users },
  { to: '/get-involved/partner', label: 'Partner', desc: 'Partner with Blue Ocean.', icon: Handshake },
  { to: '/get-involved/support', label: 'Support', desc: 'Support a conservation project.', icon: HeartHandshake },
];

export default function GetInvolvedPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Get Involved — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) return;
    listMyApplications(token)
      .then(setApplications)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>Get Involved</h1>
        <p>Track the applications you've submitted, or find a new way to help.</p>
      </div>

      <section className="user-dash-section" style={{ marginTop: 0 }}>
        <h2>Ways to Help</h2>
        <div className="user-dash-ways-grid">
          {WAYS_TO_HELP.map(({ to, label, desc, icon: Icon }) => (
            <Link key={to} to={to} className="user-dash-way-card">
              <Icon size={20} />
              <div>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
              <ArrowRight size={16} className="user-dash-way-card__arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="user-dash-section">
        <h2>My Applications</h2>

        {!loading && applications.length === 0 ? (
          <div className="user-dash-empty">
            <HandHeart size={28} />
            <p>You haven't submitted an application yet — pick a way to help above to get started.</p>
          </div>
        ) : (
          <div className="user-dash-app-list">
            {applications.map((app) => {
              const type = TYPE_META[app.application_type] || TYPE_META.volunteer;
              const statusMeta = STATUS_META[app.status] || STATUS_META.submitted;
              const TypeIcon = type.icon;
              return (
                <div key={app.id} className="user-dash-app-row">
                  <div className="user-dash-app-row__icon">
                    <TypeIcon size={18} />
                  </div>
                  <div className="user-dash-app-row__body">
                    <h3>{type.label} Application</h3>
                    <span className="user-dash-app-row__date">
                      Submitted {new Date(app.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <span className={`user-dash-app-row__status ${statusMeta.className}`}>{statusMeta.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
