import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { listDestinations } from '../../lib/contentApi';
import LuxuryDestinationCard from '../coast/LuxuryDestinationCard';
import '../coast/DestinationGrid.css';

export default function TourismFeaturedDestinations() {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    listDestinations({ featured: true })
      .then((data) => setDestinations(data.slice(0, 6)))
      .catch(() => setDestinations([]));
  }, []);

  if (destinations === null || destinations.length === 0) return null;

  return (
    <section className="section" aria-labelledby="tourism-featured-destinations-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Featured Destinations</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-featured-destinations-heading">
            Places worth discovering.
          </h2>
        </div>

        <div className="dest-grid reveal">
          {destinations.map((destination) => (
            <LuxuryDestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/explore-the-coast" className="btn btn-primary btn-lg">
            <span>Explore All Destinations</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
