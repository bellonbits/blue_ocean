import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import RajaNavbar from '../components/raja/RajaNavbar';
import RajaHero from '../components/raja/RajaHero';
import RajaFeaturedCards from '../components/raja/RajaFeaturedCards';
import RajaBentoGrid from '../components/raja/RajaBentoGrid';
import RajaBubbleCollage from '../components/raja/RajaBubbleCollage';
import RajaDiscoverPlans from '../components/raja/RajaDiscoverPlans';
import RajaBestPrice from '../components/raja/RajaBestPrice';
import VisualDiaryGallery from '../components/gallery/VisualDiaryGallery';
import '../components/raja/RajaExperience.css';

export default function Home() {
  // Activate scroll reveal
  useScrollReveal();

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent('open-main-nav'));
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('discover-destination');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="raja-page">
      <main id="main-content" className="raja-canvas" aria-label="Blue Heaven Somalia Showcase">
        {/* 1. Floating Pill Navbar */}
        <RajaNavbar
          onOpenMenu={handleOpenMenu}
          onGetStarted={handleScrollToPlans}
        />

        {/* 2. Hero Section */}
        <RajaHero onLetsGo={handleScrollToPlans} />

        {/* 3. Four Cards Destination Showcase */}
        <RajaFeaturedCards />

        {/* 4. Bento Grid: The Unmatched Beauty of Somalia's Coastline */}
        <RajaBentoGrid />

        {/* 5. 3D Coverflow Visual Diary Gallery */}
        <VisualDiaryGallery />

        {/* 6. Celestial Bubble Collage: Visit Somalia with Us */}
        <RajaBubbleCollage onBookTicket={handleScrollToPlans} />

        {/* 7. Discover Somalia's Marine Regions & Expeditions */}
        <RajaDiscoverPlans />

        {/* 8. Preserving Somalia's Living Oceans: Multi-plane Composition */}
        <RajaBestPrice />
      </main>
    </div>
  );
}
