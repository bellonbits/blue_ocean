import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import PageHero from '../components/editorial/PageHero';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import ConservationImpact from '../components/conservation/ConservationImpact';

export default function GetInvolvedPage() {
  useScrollReveal();
  const { language } = useLanguage();
  const isSomali = language === 'so';

  useEffect(() => {
    document.title = isSomali
      ? 'Ka Qayb Qaado — Somalia Blue Heaven'
      : 'Get Involved & Volunteer — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, [isSomali]);

  return (
    <main id="main-content" aria-label="Get Involved with Somalia Blue Heaven">
      <PageHero
        pageId="get-involved"
        image="/images/img_04.webp"
        titleTop={isSomali ? 'Ka Qayb Qaado' : 'Be Part Of'}
        titleHighlight={isSomali ? 'Ilaalinta Badda' : 'The Ocean Story'}
        titleBottom={isSomali ? 'ee Soomaaliya' : 'Across 3,330 KM'}
        desc={
          isSomali
            ? 'Mustaqbalka badda Soomaaliya waxay ku xiran tahay dadka diyaar u ah inay sahmiyaan, bartaan, oo ficil sameeyaan.'
            : 'The future of Somalia’s ocean depends on people who are willing to explore, learn, volunteer, and act in sovereign partnership.'
        }
        primaryCta={{
          label: isSomali ? 'Eeg Fursadaha' : 'Explore Action Pathways',
          path: '#get-involved-heading',
          icon: <ArrowRight size={17} />,
        }}
        cutout={{
          title: isSomali ? 'Fursadaha Furan' : 'Action Pathways',
          path: '#get-involved-heading',
          thumbnails: ['/images/img_08.webp', '/images/img_12.webp', '/images/img_01.webp'],
          info: isSomali
            ? 'Tabarruc, iskaashi caalami ah, iyo taageero toos ah oo loogu talagalay deegaanka badda.'
            : 'Volunteer Reef Cleanups, Institutional Partnerships, and Direct Ocean Stewardship.',
          rating: '500+',
          tagline: isSomali ? 'Ilaaliyayaal Firfircoon' : 'Ocean Stewards & Volunteers',
        }}
      />
      <GetInvolvedCTA />
      <ConservationImpact />
    </main>
  );
}
