import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesTemplate from '../components/marine/SpeciesTemplate';
import { getSpeciesBySlug } from '../data/marineLife';
import { useTrackRecentlyViewed } from '../lib/hooks';

export default function SpeciesDetailPage() {
  const { slug } = useParams();
  const species = getSpeciesBySlug(slug);

  useEffect(() => {
    if (species) {
      document.title = `${species.commonName} (${species.scientificName}) — Blue Ocean Marine Field Guide`;
    } else {
      document.title = 'Species Record — Blue Ocean Marine Life';
    }
  }, [species]);

  useTrackRecentlyViewed(
    species && {
      type: 'species',
      slug: species.slug,
      title: species.commonName,
      subtitle: species.categoryName,
      image: species.heroImage,
      path: `/marine-life/species/${species.slug}`,
    }
  );

  return <SpeciesTemplate />;
}
