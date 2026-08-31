import LuxuryDestinationCard from './LuxuryDestinationCard';
import './RelatedDestinations.css';

export default function RelatedDestinations({ currentDestination, destinations = [] }) {
  // Find other destinations in the same region first, or other featured ones
  const related = destinations
    .filter((d) => d.id !== currentDestination.id)
    .sort((a, b) => (a.regionId === currentDestination.regionId ? -1 : 1))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="related-dest-section section" aria-labelledby="related-dest-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">Continue Exploring</span>
          <div className="divider" />
          <h2 className="section-heading" id="related-dest-heading">
            More along this coast.
          </h2>
          <p className="section-subheading">
            Discover other remarkable coastal landscapes and maritime centers in Somalia.
          </p>
        </div>

        {/* Grid */}
        <div className="related-dest-grid">
          {related.map((dest) => (
            <LuxuryDestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
