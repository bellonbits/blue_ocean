import { socialLinks } from '../../data/organization';
import { ICON_MAP } from './SocialIcons';
import './SocialLinks.css';

export default function SocialLinks({ size = 'md', className = '' }) {
  return (
    <div className={`social-links social-links--${size} ${className}`}>
      {socialLinks.map(({ label, href, icon }) => {
        const Icon = ICON_MAP[icon];
        if (!Icon) return null;
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-links__item"
            aria-label={label}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
