import { Mail, MapPin } from 'lucide-react';
import { contactDetails, organization } from '../../data/organization';
import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '../shared/SocialLinks';
import './ContactDetails.css';

export default function ContactDetails() {
  const { t } = useLanguage();

  return (
    <div className="contact-details reveal">
      <span className="label-text">{t('contact.details.label')}</span>
      <div className="divider" />
      <h2 className="section-heading">{t('contact.details.heading')}</h2>
      <p className="contact-details__intro">{t('contact.details.intro')}</p>

      <div className="contact-details__rows">
        <div className="contact-details__row">
          <div className="contact-details__icon">
            <Mail size={18} />
          </div>
          <div>
            <span className="contact-details__row-label">{t('contact.details.emailLabel')}</span>
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
            <span className="contact-details__row-label">{t('contact.details.officesLabel')}</span>
            {contactDetails.locations.map((loc) => (
              <span key={loc.value} className="contact-details__row-value" style={{ display: 'block' }}>
                {loc.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-details__social">
        <span className="contact-details__row-label">{t('contact.details.followLabel')}</span>
        <SocialLinks />
      </div>

      <p className="contact-details__org-name">{organization.name}</p>
    </div>
  );
}
