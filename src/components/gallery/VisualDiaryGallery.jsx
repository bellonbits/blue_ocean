import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import CoverFlowGallery from './CoverFlowGallery';
import './VisualDiaryGallery.css';

export default function VisualDiaryGallery({ title, subtitle }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isSomali = language === 'so';

  const defaultTitle = isSomali ? 'Xusuus-qorkayga Muuqaalka ah' : 'My Visual Diary';
  const defaultSubtitle = isSomali
    ? 'Ku arag xeebaha Soomaaliya muraayaddayda: sawirro iyo muuqaallo cajiib ah'
    : 'See Somalia’s coast through our lens: adventures in photos and videos';

  const galleryTitle = title || defaultTitle;
  const gallerySubtitle = subtitle || defaultSubtitle;

  const filterPills = [
    { id: 'all', label: isSomali ? 'Dhammaan' : 'All Coast' },
    { id: 'bosaso', label: isSomali ? 'Boosaaso' : 'Bosaso' },
    { id: 'bajuni', label: isSomali ? 'Baajuun' : 'Bajuni' },
    { id: 'hafun', label: isSomali ? 'Xaafuun' : 'Hafun' },
    { id: 'eyl', label: isSomali ? 'Eyl' : 'Eyl' },
    { id: 'kismayo', label: isSomali ? 'Kismaayo' : 'Kismayo' },
    { id: 'berbera', label: isSomali ? 'Berbera' : 'Berbera' },
    { id: 'liido', label: isSomali ? 'Liido' : 'Lido' },
  ];

  const [activePill, setActivePill] = useState('all');

  const mediaCollections = {
    all: [
      {
        id: 'all-1',
        title: isSomali ? 'Dooxada Eyl Gorge' : 'Dooxada Eyl Ocean Springs',
        subtitle: isSomali ? 'Xeebta Nugaal' : 'Nugaal Valley Coast',
        tag: 'NUGAAL',
        year: '1918',
        desc: isSomali
          ? 'Halka ilaha biyaha macaan ay kaga soo daraan badda buluugga ah ee Badweynta Hindiya.'
          : 'Breathtaking freshwater springs cascade through sheer limestone canyon gorges directly into the cobalt swells of the Indian Ocean.',
        image: '/images/img_03.png',
        avatar: '/images/img_03.png',
        author: isSomali ? 'Dooxada Eyl' : 'Dooxada Eyl Sanctuary',
        authorMeta: 'Nugaal Valley, Indian Ocean Coast • 07°58′N 49°49′E',
      },
      {
        id: 'all-2',
        title: isSomali ? 'Raas Xaafuun Headlands' : 'Ras Hafun Continental Bluffs',
        subtitle: isSomali ? 'Barta Bariga Afrika' : 'Easternmost Point of Africa',
        tag: 'BARI',
        year: 'BARI',
        desc: isSomali
          ? 'Dhul qadiimi ah oo taariikhi ah, buuro dhaadheer oo badda dhex maquura.'
          : 'Towering continental sandstone cliffs plunge into deep oceanic trenches where centuries of monsoonal spice trading routes converge.',
        image: '/images/img_01.png',
        avatar: '/images/img_01.png',
        author: isSomali ? 'Raas Xaafuun' : 'Ras Hafun Headlands',
        authorMeta: 'Horn of Africa Continental Shelf • 10°25′N 51°16′E',
      },
      {
        id: 'all-3',
        title: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Coral Atoll Archipelago',
        subtitle: isSomali ? 'Jubaland Marine' : 'Jubaland Marine Archipelago',
        tag: 'SOUTH',
        year: 'SOUTH',
        desc: isSomali
          ? 'Jasiirado qadiimi ah oo leh biyaha ugu nadiifsan iyo doonyaha dhowka.'
          : 'An untouched constellation of coral atolls, turquoise lagoons, traditional Swahili-Somali dhow vessels, and green turtle hatcheries.',
        image: '/images/img_05.png',
        avatar: '/images/img_05.png',
        author: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Archipelago',
        authorMeta: 'Kismayo Coastal District • 00°21′S 42°32′E',
      },
      {
        id: 'all-4',
        title: isSomali ? 'Dekedda & Xeebta Boosaaso' : 'Bosaso Coral Coves & Seaport',
        subtitle: isSomali ? 'Gacanka Cadmeed' : 'Gulf of Aden Marine Outpost',
        tag: 'GULF',
        year: 'GULF',
        desc: isSomali
          ? 'Biyo deggan oo ku habboon dabaasha iyo daawashada noolaha badda.'
          : 'Where rugged volcanic ridges meet the deep pelagic waters of the Gulf of Aden, sheltering artisanal fleets and whale sharks.',
        image: '/images/img_02.png',
        avatar: '/images/img_02.png',
        author: isSomali ? 'Boosaaso' : 'Gulf of Aden Sanctuary',
        authorMeta: 'Bari Commercial Seaport • 11°17′N 49°11′E',
      },
      {
        id: 'all-5',
        title: isSomali ? 'Xeebta Liido ee Muqdisho' : 'Lido Ocean Horizon & Corniche',
        subtitle: isSomali ? 'Banaadir Coast' : 'Banadir Seashore Promenade',
        tag: 'BANADIR',
        year: 'BANADIR',
        desc: isSomali
          ? 'Xeebta caanka ah ee dalka, makhaayadaha badda, iyo qorrax-u-dhaca cajiibka ah.'
          : 'Somalia’s iconic golden coastline where warm ocean breezes, vibrant coastal dining, and historic coral-stone promenades greet the open sea.',
        image: '/images/image.png',
        avatar: '/images/image.png',
        author: isSomali ? 'Xeebta Liido' : 'Banadir Seashore',
        authorMeta: 'Mogadishu Coastal Haven • 02°02′N 45°21′E',
      },
    ],
  };

  const currentItems = mediaCollections[activePill] || mediaCollections.all;

  return (
    <div className="diary-gallery-unified-wrap">
      {/* Location Filter Pills */}
      <div className="diary-pills-track" role="tablist">
        {filterPills.map((pill) => (
          <button
            key={pill.id}
            type="button"
            className={`diary-pill ${activePill === pill.id ? 'diary-pill--active' : ''}`}
            onClick={() => setActivePill(pill.id)}
            role="tab"
            aria-selected={activePill === pill.id}
          >
            {pill.label}
          </button>
        ))}
        <button
          type="button"
          className="diary-pill diary-pill--view-more"
          onClick={() => navigate(`/${language}/explore-the-coast`)}
          aria-label={isSomali ? 'Sahami Dhammaan Xeebaha' : 'View more destinations'}
        >
          <span>{isSomali ? 'Sahami Dhammaan' : 'View More'}</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 3D Cover Flow Stage matching Monet reference design */}
      <CoverFlowGallery
        items={currentItems}
        title={galleryTitle}
        subtitle={gallerySubtitle}
        eyebrow={isSomali ? 'XUSUUS-QORKA MUUQAALKA AH' : 'MY VISUAL DIARY'}
        whiteBackground={true}
      />
    </div>
  );
}
