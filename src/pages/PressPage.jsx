import { useEffect } from 'react';
import { Download, Mail } from 'lucide-react';
import { organization, contactDetails } from '../data/organization';
import './StaticContentPage.css';

const LOGO_ASSETS = [
  { label: 'Logo — Light background', file: '/logo_sky_blue.png', preview: '#F5FAFC' },
  { label: 'Logo — Dark background', file: '/logo.png', preview: '#06141C' },
];

export default function PressPage() {
  useEffect(() => {
    document.title = 'Press — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="static-page" aria-label="Press">
      <div className="container">
        <div className="static-page__header">
          <span className="label-text">Media & Press</span>
          <h1 className="static-page__title">Press Kit</h1>
          <p className="static-page__subtitle">
            Boilerplate, brand assets, and a direct line to the team for journalists and partners
            covering Blue Ocean Somalia.
          </p>
        </div>

        <div className="static-page__body">
          <h2>About Blue Ocean Somalia</h2>
          <p>{organization.mission.description}</p>

          <h2>Boilerplate</h2>
          <p>
            <strong>{organization.name}</strong> — {organization.mission.statement} Blue Ocean
            works across Somalia's coastline, from Puntland to Jubaland, combining marine research,
            conservation, and coastal community partnership.
          </p>

          <h2>Brand Assets</h2>
          <div className="press-kit-grid">
            {LOGO_ASSETS.map((asset) => (
              <a key={asset.file} href={asset.file} download className="press-kit-card">
                <span className="press-kit-card__swatch" style={{ background: asset.preview }}>
                  <img src={asset.file} alt={asset.label} />
                </span>
                <span>{asset.label}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--color-turquoise)' }}>
                  <Download size={14} />
                  Download
                </span>
              </a>
            ))}
          </div>

          <h2>Media Contact</h2>
          <p>
            For interviews, quotes, or high-resolution imagery, reach the Blue Ocean team directly:
          </p>
          <p>
            <a
              href={`mailto:${contactDetails.email}?subject=Press Inquiry`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', marginTop: 'var(--space-2)' }}
            >
              <Mail size={16} />
              <span>{contactDetails.email}</span>
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
