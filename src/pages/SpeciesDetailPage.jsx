import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesTemplate from '../components/marine/SpeciesTemplate';
import { getSpeciesBySlug } from '../data/marineLife';

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

  return <SpeciesTemplate />;
}
