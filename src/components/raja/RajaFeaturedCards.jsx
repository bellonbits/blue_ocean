import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaFeaturedCards({ onSelectCard }) {
  const { language } = useLanguage();
  const isSomali = language === 'so';

  const cards = [
    {
      id: 'bosaso',
      title: isSomali ? 'Boosaaso' : 'Bosaso',
      desc: isSomali
        ? 'Albaabka Gacanka Cadmeed oo buuraha Karkaar ay badda buluugga ah ku darsamaan.'
        : 'Where rugged volcanic ridges meet the deep pelagic waters of the Gulf of Aden.',
      image: '/bosaso1.jpg',
      slug: 'bosaso',
    },
    {
      id: 'bajuni-islands',
      title: isSomali ? 'Jasiiradaha Baajuun' : 'Bajuni Islands',
      desc: isSomali
        ? 'Jasiirado qurux badan oo leh biyo saafi ah, reef-yo dhagaxeed iyo xeebo cadcad.'
        : 'Pristine coral archipelago with turquoise lagoons, white sandbars and mangroves.',
      image: '/kismayo1.png',
      slug: 'bajuni-islands',
    },
    {
      id: 'hafun',
      title: isSomali ? 'Raas Xaafuun' : 'Ras Hafun',
      desc: isSomali
        ? 'Cirifka ugu bari ee qaaradda Afrika, buuro dhaadheer iyo marin qadiimi ah.'
        : "Africa's easternmost horn with dramatic sandstone headlands and ancient trade routes.",
      image: '/hafun1.jpg',
      slug: 'hafun',
    },
    {
      id: 'eyl',
      title: isSomali ? 'Dooxada Eyl' : 'Eyl Canyon',
      desc: isSomali
        ? 'Dooxo cajiib ah oo dhex marta buuro dhaadheer kuna darsanta Badweynta Hindiya.'
        : 'A breathtaking canyon gorge meeting the open Indian Ocean and historic fortifications.',
      image: '/eyl1.jpg',
      slug: 'eyl',
    },
  ];

  return (
    <section className="raja-cards-row" aria-label={isSomali ? 'Goobaha Caanka ah' : 'Featured Destinations'}>
      {cards.map((card) => (
        <Link
          key={card.id}
          to={`/${language}/explore-the-coast/${card.slug}`}
          className="raja-card"
          onClick={() => onSelectCard && onSelectCard(card)}
        >
          <div className="raja-card__thumb-wrap">
            <img
              src={card.image}
              alt={card.title}
              className="raja-card__thumb"
              loading="lazy"
            />
          </div>
          <h3 className="raja-card__title">{card.title}</h3>
          <p className="raja-card__desc">{card.desc}</p>
        </Link>
      ))}
    </section>
  );
}
