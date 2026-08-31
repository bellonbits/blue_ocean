import { Mail, MapPin } from 'lucide-react';
import { contactDetails, organization } from '../../data/organization';
import SocialLinks from '../shared/SocialLinks';
import './ContactDetails.css';

export default function ContactDetails() {
  return (
    <div className="contact-details reveal">
      <span className="label-text">Get in Touch</span>
      <div className="divider" />
      <h2 className="section-heading">Let's connect.</h2>
      <p className="contact-details__intro">
        Whether you're interested in research, conservation, partnerships, ocean experiences or simply want to
        learn more, we'd love to hear from you.
      </p>

      <div className="contact-details__rows">
        <div className="contact-details__row">
          <div className="contact-details__icon">
            <Mail size={18} />
          </div>
          <div>
            <span className="contact-details__row-label">Email</span>
            <a href={`mailto:${contactDetails.email}`} className="contact-details__row-value">
              {contactDetails.email}
            </a>
          </div>
        </div>

        <div className="contact-details__row">
          <div className="contact-details__icon">
            <MapPin size={18} />
          </div>
          <div>
            <span className="contact-details__row-label">Field Offices</span>
            {contactDetails.locations.map((loc) => (
              <span key={loc.value} className="contact-details__row-value" style={{ display: 'block' }}>
                {loc.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-details__social">
        <span className="contact-details__row-label">Follow Blue Ocean</span>
        <SocialLinks />
      </div>

      <p className="contact-details__org-name">{organization.name}</p>
    </div>
  );
}
