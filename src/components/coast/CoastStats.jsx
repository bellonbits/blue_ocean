import { Compass, Waves, MapPin, Fish } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './CoastStats.css';

const statsMeta = [
  { key: 'regions', value: '3', icon: MapPin },
  { key: 'destinations', value: '14+', icon: Compass },
  { key: 'coastline', value: '3,025', unit: 'km', icon: Waves },
  { key: 'species', value: '500+', icon: Fish },
];

export default function CoastStats() {
  const { t } = useLanguage();

  return (
    <section className="coast-stats-section section-sm" aria-label={t('exploreCoast.stats.ariaLabel')}>
      <div className="container">
        <div className="coast-stats-grid">
          {statsMeta.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className={`coast-stat-card reveal reveal-delay-${i + 1}`}
              >
                <div className="coast-stat-icon" aria-hidden="true">
                  <Icon size={20} />
                </div>

                <div className="coast-stat-number-wrap">
                  <span className="coast-stat-value">{stat.value}</span>
                  {stat.unit && <span className="coast-stat-unit">{stat.unit}</span>}
                </div>

                <h3 className="coast-stat-label">{t(`exploreCoast.stats.items.${stat.key}.label`)}</h3>
                <p className="coast-stat-detail">{t(`exploreCoast.stats.items.${stat.key}.detail`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
