import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listMyMessages } from '../../lib/dashboardApi';

export default function MessagesPage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Messages — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) return;
    listMyMessages(token)
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>Messages</h1>
        <p>Enquiries you've sent us through the Contact page.</p>
      </div>

      {!loading && messages.length === 0 ? (
        <div className="user-dash-empty">
          <Mail size={28} />
          <p>No messages yet — anything you send through the Contact page while signed in will show up here.</p>
          <Link to="/contact" className="btn btn-primary btn-sm">
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="user-dash-msg-list">
          {messages.map((m) => (
            <div key={m.id} className="user-dash-msg-row">
              <div className={`user-dash-msg-row__status ${m.is_read ? 'user-dash-msg-row__status--read' : ''}`}>
                {m.is_read ? <CheckCircle2 size={16} /> : <Clock size={16} />}
              </div>
              <div className="user-dash-msg-row__body">
                <div className="user-dash-msg-row__top">
                  <h3>{m.subject}</h3>
                  <span className="user-dash-msg-row__date">
                    {new Date(m.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p>{m.message}</p>
                <span className="user-dash-msg-row__tag">{m.is_read ? 'Reviewed by our team' : 'Awaiting review'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
