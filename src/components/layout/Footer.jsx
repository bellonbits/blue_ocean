import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';
import { socialLinks } from '../../data/organization';
import { ICON_MAP } from '../shared/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const footerColumns = [
  {
    headingKey: 'footer.exploreHeading',
    links: [
      { labelKey: 'nav.exploreCoast', path: '/explore-the-coast' },
      { labelKey: 'nav.oceanExperiences', path: '/experiences' },
      { labelKey: 'nav.marineLife', path: '/marine-life' },
      { label: 'Puntland', path: '/explore-the-coast/bosaso' },
      { label: 'Jubaland', path: '/explore-the-coast/kismayo' },
    ],
  },
  {
    headingKey: 'footer.researchHeading',
    links: [
      { labelKey: 'footer.ourResearch', path: '/research' },
      { labelKey: 'footer.projects', path: '/research/projects' },
      { labelKey: 'footer.expeditions', path: '/research/expeditions' },
      { labelKey: 'footer.publications', path: '/research/publications' },
      { labelKey: 'footer.dataReports', path: '/research/data' },
    ],
  },
  {
    headingKey: 'footer.protectHeading',
    links: [
      { labelKey: 'nav.conservation', path: '/conservation' },
      { labelKey: 'nav.communities', path: '/communities' },
      { labelKey: 'nav.getInvolved', path: '/get-involved' },
      { labelKey: 'footer.volunteer', path: '/get-involved/volunteer' },
      { labelKey: 'footer.partnerWithUs', path: '/get-involved/partner' },
    ],
  },
  {
    headingKey: 'footer.orgHeading',
    links: [
      { labelKey: 'footer.aboutUs', path: '/about' },
      { labelKey: 'nav.contact', path: '/contact' },
      { labelKey: 'nav.news', path: '/news' },
      { labelKey: 'footer.press', path: '/press' },
      { labelKey: 'footer.privacyPolicy', path: '/privacy' },
    ],
  },
];

const footerSocialLinks = socialLinks.map((s) => ({ ...s, icon: ICON_MAP[s.icon] }));

export default function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const localizedPath = (path) => `/${language}${path}`;
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
              <Link to={localizedPath('')} className="footer__logo" aria-label="Blue Ocean">
                <img
                  src={logoSrc}
                  alt="Blue Ocean Somalia"
                  className="footer__logo-img"
                />
              </Link>
              <p className="footer__tagline">
                {t('footer.tagline')}
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
                <div key={col.headingKey} className="footer__col">
                  <h3 className="footer__col-heading">{t(col.headingKey)}</h3>
                  <ul className="footer__col-list">
                    {col.links.map((link) => (
                      <li key={link.path}>
                        <Link to={localizedPath(link.path)} className="footer__col-link">
                          {link.labelKey ? t(link.labelKey) : link.label}
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
              {t('footer.copyright', currentYear)}
            </p>
            <p className="footer__mission">
              {t('footer.mission')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
