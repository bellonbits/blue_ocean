import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';
import { socialLinks } from '../../data/organization';
import { ICON_MAP } from '../shared/SocialIcons';
import './Footer.css';

const footerColumns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Explore the Coast', path: '/explore-the-coast' },
      { label: 'Ocean Experiences', path: '/experiences' },
      { label: 'Marine Life', path: '/marine-life' },
      { label: 'Puntland', path: '/explore-the-coast/bosaso' },
      { label: 'Jubaland', path: '/explore-the-coast/kismayo' },
    ],
  },
  {
    heading: 'Research',
    links: [
      { label: 'Our Research', path: '/research' },
      { label: 'Projects', path: '/research/projects' },
      { label: 'Expeditions', path: '/research/expeditions' },
      { label: 'Publications', path: '/research/publications' },
      { label: 'Data & Reports', path: '/research/data' },
    ],
  },
  {
    heading: 'Protect',
    links: [
      { label: 'Conservation', path: '/conservation' },
      { label: 'Communities', path: '/communities' },
      { label: 'Get Involved', path: '/get-involved' },
      { label: 'Volunteer', path: '/get-involved/volunteer' },
      { label: 'Partner With Us', path: '/get-involved/partner' },
    ],
  },
  {
    heading: 'Blue Ocean',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'News', path: '/news' },
      { label: 'Press', path: '/press' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  },
];

const footerSocialLinks = socialLinks.map((s) => ({ ...s, icon: ICON_MAP[s.icon] }));

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // The footer is always rendered as a dark, immersive closing section
  // regardless of the active site theme, so it always uses the light logo.
  const logoSrc = '/logo.png';


  return (
    <footer className="footer" role="contentinfo">
      {/* Wave divider top */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#030D1A"
          />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          {/* Top — Brand + Social */}
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="footer__logo" aria-label="Blue Ocean">
                <img
                  src={logoSrc}
                  alt="Blue Ocean Somalia"
                  className="footer__logo-img"
                />
              </Link>
              <p className="footer__tagline">
                Exploring, researching, and protecting Somalia's remarkable marine environments — from Puntland to Jubaland.
              </p>

              {/* Social Icons */}
              <div className="footer__social">
                {footerSocialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={label}
                    id={`social-${label.toLowerCase().replace('/', '-')}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav Columns */}
            <div className="footer__columns">
              {footerColumns.map((col) => (
                <div key={col.heading} className="footer__col">
                  <h3 className="footer__col-heading">{col.heading}</h3>
                  <ul className="footer__col-list">
                    {col.links.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path} className="footer__col-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="footer__copy">
              © {currentYear} Blue Ocean Somalia. All rights reserved.
            </p>
            <p className="footer__mission">
              Protecting Somalia's ocean for future generations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
