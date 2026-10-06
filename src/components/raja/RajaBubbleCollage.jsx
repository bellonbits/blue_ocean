import { useState } from 'react';
import { Compass, Waves } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaBubbleCollage({ onBookTicket }) {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const [, setActiveBubble] = useState(null);

  const bubbles = [
    {
      id: 'center',
      className: 'bubble-node bubble-center-hero',
      image: '/somalia_hero_coast.jpg',
      label: isSomali ? 'Xeebta Boosaaso & Dhowka' : 'Bosaso Coast & Dhow',
    },
    {
      id: 'fish',
      className: 'bubble-node bubble-boxfish',
      image: '/marine_fish.jpg',
      label: isSomali ? 'Kalluunka Jeedaalka & Tuna' : 'Yellowfin Tuna & Pelagic Fish',
    },
    {
      id: 'turtles',
      className: 'bubble-node bubble-swimmer',
      image: '/marine_turtles.jpg',
      label: isSomali ? 'Digaag-badeedka Cagaaran' : 'Green Sea Turtles',
    },
    {
      id: 'cliff',
      className: 'bubble-node bubble-cliff-left',
      image: '/hafun1.jpg',
      label: isSomali ? 'Cirifka Raas Xaafuun' : 'Ras Hafun Headlands',
    },
    {
      id: 'sharks',
      className: 'bubble-node bubble-motors',
      image: '/marine_sharks.jpg',
      label: isSomali ? 'Libax-badeedka Whale Shark' : 'Whale Sharks of Gulf of Aden',
    },
    {
      id: 'dolphins',
      className: 'bubble-node bubble-small-top',
      image: '/marine_dolphins.jpg',
      label: isSomali ? 'Delfiinnada Badda Soomaaliya' : 'Spinner Dolphins of Somali Coast',
    },
    {
      id: 'coral',
      className: 'bubble-node bubble-diver-far-right',
      image: '/marine_coral.jpg',
      label: isSomali ? 'Reef-yada Dhagaxeedka Nool' : 'Living Coral Reef Systems',
    },
    {
      id: 'bargaal',
      className: 'bubble-node bubble-islet-bottom',
      image: '/bargaal_main.jpg',
      label: isSomali ? 'Xeebta Baargaal ee Bari' : 'Bargaal Coastal Oasis',
    },
    {
      id: 'seagrass',
      className: 'bubble-node bubble-reef-tiny',
      image: '/marine_seagrass.jpg',
      label: isSomali ? 'Doogga Badda ee Nolosha' : 'Seagrass Beds & Nurseries',
    },
    {
      id: 'kismayo',
      className: 'bubble-node bubble-bottom-left-slice',
      image: '/kismayo2.png',
      label: isSomali ? 'Kanaalada Jubada Hoose' : 'Jubaland Coastal Channels',
    },
  ];

  return (
    <section className="raja-bubble-section" aria-label={isSomali ? 'Nala Soo Booqo Xeebaha Soomaaliya' : "Visit Somalia's Coast With Us"}>
      <div className="raja-bubble-section__bg-glow" />

      {/* Header */}
      <div className="raja-bubble__header">
        <h2 className="raja-bubble__title">
          {isSomali ? 'Nala soo booqo xeebaha Soomaaliya' : "Visit Somalia's coast with us"}
        </h2>
        <p className="raja-bubble__subtext">
          {isSomali
            ? 'Nagu soo biir si aad u sahamiso quruxda dabiiciga ah ee xeebaha Soomaaliya iyo nolosha hodanka ah ee badda hoosteeda. Baro mashariicdayada cilmi-baarista iyo ilaalinta deegaanka badda.'
            : "Join Blue Heaven to discover Somalia's untouched marine wilderness, vibrant coral habitats, and community-led ocean conservation along 3,330 km of coastline."}
        </p>

        {/* Action Pills - No Pricing */}
        <div className="raja-bubble__actions">
          <button
            type="button"
            className="raja-bubble__btn-white"
            onClick={onBookTicket}
          >
            <span>{isSomali ? 'Bilow Socdaalka' : "Let's Go"}</span>
          </button>
          <button
            type="button"
            className="raja-bubble__btn-glass"
            onClick={onBookTicket}
            aria-label="Coastline length"
          >
            <Waves size={14} style={{ display: 'inline', marginRight: 6 }} />
            <span>{isSomali ? '3,330 KM Xeeb' : '3,330 KM Coast'}</span>
          </button>
        </div>
      </div>

      {/* Celestial Circular Bubble Galaxy */}
      <div className="raja-bubble-galaxy">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className={b.className}
            title={b.label}
            onMouseEnter={() => setActiveBubble(b.label)}
            onMouseLeave={() => setActiveBubble(null)}
            onClick={onBookTicket}
          >
            <img
              src={b.image}
              alt={b.label}
              className="bubble-node__img"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
