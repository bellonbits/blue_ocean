import CoverFlowGallery from '../gallery/CoverFlowGallery';

export default function DestinationGallery({ destination }) {
  if (!destination) return null;

  // Collect images for this destination
  const rawImages = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [
        destination.heroImage,
        '/bosaso_beach_thumb.webp',
        '/bosaso_1005_thumb.webp',
        '/images/img_02.webp',
        '/bosaso_harbor_thumb.webp',
      ];

  // Prepare standard 5 items matching user reference Cover Flow
  const coverFlowItems = [
    {
      id: 'gallery-1',
      title: `${destination.name} Shoreline`,
      subtitle: `${destination.region || 'Somali Coast'} Pristine Sands`,
      tag: destination.region || 'SANCTUARY',
      year: '1918',
      desc:
        destination.description ||
        `Sunlit turquoise waters and rolling surf along the pristine shores of ${destination.name}.`,
      image: rawImages[1] || rawImages[0] || '/bosaso_1005_thumb.webp',
      avatar: destination.heroImage || rawImages[0],
      author: destination.name,
      authorMeta: `${destination.region || 'Somali Coastline'} • 3,330 KM Sanctuary`,
      link: `/explore-the-coast/${destination.slug || 'bosaso'}`,
    },
    {
      id: 'gallery-2',
      title: `${destination.name} Coastal Panorama`,
      subtitle: 'Living Barrier Reefs & Lagoons',
      tag: 'PANORAMA',
      year: 'COAST',
      desc:
        'Dramatic panoramic vistas overlooking untouched barrier reefs, calm lagoons, and vibrant marine biodiversity.',
      image: rawImages[2] || rawImages[0] || '/images/image.webp',
      avatar: destination.heroImage || rawImages[0],
      author: destination.name,
      authorMeta: `${destination.region || 'Somali Coastline'} • Living Coral Atolls`,
      link: `/explore-the-coast/${destination.slug || 'bosaso'}`,
    },
    {
      id: 'gallery-3',
      title: `${destination.name} Waters`,
      subtitle: 'Crystal Turquoise Depths',
      tag: 'DEEP SEA',
      year: 'PELAGIC',
      desc:
        'Deep cobalt blue marine channel sheltering rich pelagic fish populations and seasonal whale shark migrations.',
      image: rawImages[0] || destination.heroImage || '/gallery_center_lake.webp',
      avatar: destination.heroImage || rawImages[0],
      author: destination.name,
      authorMeta: `${destination.region || 'Somali Coastline'} • Marine Reserve`,
      link: `/explore-the-coast/${destination.slug || 'bosaso'}`,
    },
    {
      id: 'gallery-4',
      title: `${destination.name} Maritime Fleet`,
      subtitle: 'Traditional Dhow Seafaring',
      tag: 'HERITAGE',
      year: 'MARITIME',
      desc:
        'Centuries of Swahili-Somali maritime culture where handcrafted wooden dhows sail across turquoise morning breezes.',
      image: rawImages[3] || rawImages[1] || '/images/img_02.webp',
      avatar: destination.heroImage || rawImages[0],
      author: destination.name,
      authorMeta: `${destination.region || 'Somali Coastline'} • Seafaring Haven`,
      link: `/explore-the-coast/${destination.slug || 'bosaso'}`,
    },
    {
      id: 'gallery-5',
      title: `${destination.name} Horizon`,
      subtitle: 'Endless Oceanic Vista',
      tag: 'HORIZON',
      year: 'HORIZON',
      desc:
        'Where sheer coastal sandstone headlands meet the uninterrupted Indian Ocean and Gulf of Aden horizons.',
      image: rawImages[4] || rawImages[2] || '/images/img_05.webp',
      avatar: destination.heroImage || rawImages[0],
      author: destination.name,
      authorMeta: `${destination.region || 'Somali Coastline'} • Headlands`,
      link: `/explore-the-coast/${destination.slug || 'bosaso'}`,
    },
  ];

  return (
    <CoverFlowGallery
      items={coverFlowItems}
      eyebrow="GALLERY"
      title={`${destination.name} Visual Diary`}
      subtitle={`See ${destination.name} through our lens: high-definition 3D photography along the coast.`}
      whiteBackground={true}
    />
  );
}
