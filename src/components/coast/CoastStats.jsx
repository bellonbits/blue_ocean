import { Compass, Waves, MapPin, Fish } from 'lucide-react';
import './CoastStats.css';

const stats = [
  {
    value: '3',
    label: 'Coastal Regions',
    detail: 'Puntland, Jubaland, and Central/Southern Coastline',
    icon: MapPin,
  },
  {
    value: '14+',
    label: 'Documented Destinations',
    detail: 'Ports, islands, bays, and marine sanctuaries',
    icon: Compass,
  },
  {
    value: '3,025',
    unit: 'km',
    label: 'Longest National Coast',
    detail: 'Longest continuous coastline on mainland Africa',
    icon: Waves,
  },
  {
    value: '500+',
    label: 'Documented Marine Species',
    detail: 'From coral reef biodiversity to apex pelagic hunters',
    icon: Fish,
  },
];

export default function CoastStats() {
  return (
    <section className="coast-stats-section section-sm" aria-label="Somalia Coastline Statistics">
      <div className="container">
        <div className="coast-stats-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`coast-stat-card reveal reveal-delay-${i + 1}`}
              >
                <div className="coast-stat-icon" aria-hidden="true">
                  <Icon size={20} />
                </div>

                <div className="coast-stat-number-wrap">
                  <span className="coast-stat-value">{stat.value}</span>
                  {stat.unit && <span className="coast-stat-unit">{stat.unit}</span>}
                </div>

                <h3 className="coast-stat-label">{stat.label}</h3>
                <p className="coast-stat-detail">{stat.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
