import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { socialLinks } from '../../data/organization';
import { ICON_MAP } from '../shared/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const isSomali = language === 'so';

  const footerSocials = socialLinks.map((s) => ({
    ...s,
    icon: ICON_MAP[s.icon] || Compass,
  }));

  const quickLinks = [
    { label: isSomali ? 'Bogga Hore' : 'Home', path: '/' },
    { label: isSomali ? 'Dalxiiska Xeebaha' : 'Coastal Tourism', path: '/tourism' },
    { label: isSomali ? 'Nagu Saabsan' : 'About Us', path: '/about' },
    { label: isSomali ? 'Sahami Xeebaha' : 'Explore Coast', path: '/explore-the-coast' },
    { label: isSomali ? 'Khibradaha Badda' : 'Ocean Experiences', path: '/experiences' },
    { label: isSomali ? 'Nolosha Badda' : 'Marine Life', path: '/marine-life' },
    { label: isSomali ? 'Cilmi-Baarista' : 'Research & Expeditions', path: '/research' },
    { label: isSomali ? 'Ilaalinta Deegaanka' : 'Conservation', path: '/conservation' },
    { label: isSomali ? 'Bulshooyinka Xeebaha' : 'Coastal Communities', path: '/communities' },
  ];

  const topDestinations = [
    { label: isSomali ? 'Boosaaso (Puntland)' : 'Bosaso Port & Sanctuaries', path: '/explore-the-coast/bosaso' },
    { label: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Coral Archipelago', path: '/explore-the-coast/kismayo' },
    { label: isSomali ? 'Raas Xaafuun' : 'Ras Hafun Peninsula', path: '/explore-the-coast/hafun' },
    { label: isSomali ? 'Dooxada Eyl' : 'Eyl Ocean Cliffs & Cove', path: '/explore-the-coast/eyl' },
    { label: isSomali ? 'Liido & Muqdisho' : 'Lido & Mogadishu Coast', path: '/explore-the-coast/mogadishu' },
    { label: isSomali ? 'Seylac & Berbera' : 'Zeila & Gulf of Aden', path: '/explore-the-coast/zeila' },
    { label: isSomali ? 'Baraawe' : 'Barawe Historic Seashore', path: '/explore-the-coast/barawe' },
  ];

  return (
    <footer className="nature-footer" role="contentinfo" id="footer-section">
      <div className="nature-footer__container">
        {/* Top 4-Column Grid */}
        <div className="nature-footer__grid">
          {/* Column 1: Brand & Newsletter */}
          <div className="nature-footer__col nature-footer__col--brand">
            <Link to={localizedPath('/')} className="nature-footer__logo-link" aria-label="Somalia Blue Heaven">
              <img
                src="/Somalia Blue Heaven Wave Logo.png"
                alt="Somalia Blue Heaven"
                className="nature-footer__logo-img"
              />
            </Link>

            <p className="nature-footer__tagline">
              {isSomali
                ? 'Sahami, dabbaaldeg, oo ilaali 3,330 km oo xeebaha quruxda badan ee Soomaaliya — biyo nadiif ah, noolaha badda, iyo dhaqanka qani ah ee bulshooyinka xeebaha.'
                : "Discover, celebrate, and preserve Somalia's breathtaking 3,330 km coastline — pristine waters, thriving coral reefs, and vibrant maritime heritage."}
            </p>

            {/* Circular Social Buttons */}
            <div className="nature-footer__social-row" aria-label="Social links">
              {footerSocials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nature-footer__social-btn"
                  aria-label={label}
                  id={`footer-social-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Newsletter Input Box */}
            <div className="nature-footer__newsletter">
              <p className="nature-footer__newsletter-label">
                {isSomali ? 'Ku biir wargeyska xeebaha' : 'Subscribe to Coastal Updates'}
              </p>
              <form onSubmit={handleSubscribe} className="nature-footer__newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSomali ? 'Gali email-kaaga...' : 'Enter your email...'}
                  className="nature-footer__newsletter-input"
                  required
                  aria-label="Email subscription input"
                />
                <button
                  type="submit"
                  className="nature-footer__newsletter-btn"
                  aria-label="Submit newsletter subscription"
                >
                  {subscribed ? <CheckCircle2 size={18} /> : (isSomali ? 'Ku biir' : 'Go')}
                </button>
              </form>
              {subscribed && (
                <span className="nature-footer__subscribed-msg">
                  {isSomali ? 'Mahadsanid! Waad ku biirtay.' : 'Thank you for subscribing!'}
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="nature-footer__col">
            <h3 className="nature-footer__heading">
              {isSomali ? 'Xiriirrada Degdegga Ah' : 'Quick Links'}
            </h3>
            <ul className="nature-footer__list">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={localizedPath(item.path)} className="nature-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div className="nature-footer__col">
            <h3 className="nature-footer__heading">
              {isSomali ? 'Deegaannada Xeebaha' : 'Top Destinations'}
            </h3>
            <ul className="nature-footer__list">
              {topDestinations.map((dest) => (
                <li key={dest.path}>
                  <Link to={localizedPath(dest.path)} className="nature-footer__link">
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="nature-footer__col nature-footer__col--contact">
            <h3 className="nature-footer__heading">
              {isSomali ? 'Nala Soo Xiriir' : 'Contact Us'}
            </h3>
            <div className="nature-footer__contact-items">
              <a href="tel:+252907790000" className="nature-footer__contact-link">
                <span className="nature-footer__contact-icon">
                  <Phone size={15} />
                </span>
                <span>+252 90 779 0000 / +252 61 500 0000</span>
              </a>

              <a href="mailto:contact@blueoceansomalia.com" className="nature-footer__contact-link">
                <span className="nature-footer__contact-icon">
                  <Mail size={15} />
                </span>
                <span>contact@blueoceansomalia.com</span>
              </a>

              <div className="nature-footer__contact-info">
                <span className="nature-footer__contact-icon">
                  <MapPin size={15} />
                </span>
                <span>Boosaaso Port, Puntland & Mogadishu Coast, Somalia</span>
              </div>

              <div className="nature-footer__contact-info">
                <span className="nature-footer__contact-icon">
                  <Clock size={15} />
                </span>
                <span>Maritime Field Operations: 24/7 Monitoring</span>
              </div>
            </div>

            <div className="nature-footer__action-box">
              <Link to={localizedPath('/explore-the-coast')} className="nature-footer__badge-pill">
                <span>{isSomali ? 'Sahami Xeebaha 3,330 KM' : 'Explore 3,330 KM Coast'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="nature-footer__bottom">
          <p className="nature-footer__copyright">
            © {currentYear} Somalia Blue Heaven. {isSomali ? 'Dhammaan xuquuqda waa la dhowray.' : 'All rights reserved.'} Somalia's Living Coastline.
          </p>

          <div className="nature-footer__legal-links">
            <Link to={localizedPath('/privacy')} className="nature-footer__legal-link">
              {isSomali ? 'Xogta Khaaska Ah' : 'Privacy Policy'}
            </Link>
            <span className="nature-footer__legal-sep">•</span>
            <Link to={localizedPath('/terms')} className="nature-footer__legal-link">
              {isSomali ? 'Shuruudaha Isticmaalka' : 'Terms of Service'}
            </Link>
            <span className="nature-footer__legal-sep">•</span>
            <Link to={localizedPath('/research')} className="nature-footer__legal-link">
              {isSomali ? 'Xogta Cilmi-baarista' : 'Maritime Guidelines'}
            </Link>
            <span className="nature-footer__legal-sep">•</span>
            <Link to={localizedPath('/contact')} className="nature-footer__legal-link">
              {isSomali ? 'Caawinaad' : 'Contact Support'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
