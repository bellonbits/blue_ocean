import { ArrowRight, Shield, Waves, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const MARINE_STORIES = [
  {
    id: 'coral-reefs',
    titleEn: 'Pristine Barrier & Fringing Coral Atolls',
    titleSo: 'Dhagax-badeedka & Reef-ka Nool ee Jasiiradaha',
    locationEn: 'Bajuni Archipelago & Zeila Reefs',
    locationSo: 'Jasiiradaha Baajuun & Xeebta Saylac',
    statusEn: 'Protected Marine Habitat',
    statusSo: 'Aag la Dhowro',
    image: '/images/img_07.webp',
    descEn: 'Over 140 recorded scleractinian coral species forming vibrant undersea bastions along untouched continental shelves.',
    descSo: 'In ka badan 140 nooc oo dhagax-badeed ah oo dhisaya guryaha noolaha badda ee biyaha hoostooda.',
  },
  {
    id: 'dolphins',
    titleEn: 'Spinner & Bottlenose Dolphin Pods',
    titleSo: 'Kooxaha Doolfinka Badda',
    locationEn: 'Guardafui Channel & Eyl Waters',
    locationSo: 'Geeska Afrika & Biyaha Eyl',
    statusEn: 'Resident Oceanic Megafauna',
    statusSo: 'Noolaha Joogtada ah',
    image: '/images/img_09.webp',
    descEn: 'Superpods of hundreds of dolphins navigating the nutrient-rich cold upwellings where the Gulf of Aden meets the Indian Ocean.',
    descSo: 'Boqollaal doolfin ah oo dabaalanaya biyaha qabow ee hodanka ku ah nafaqada ee Geeska Afrika.',
  },
  {
    id: 'sea-turtles',
    titleEn: 'Green & Hawksbill Sea Turtle Sanctuaries',
    titleSo: 'Diidiinka Cagaaran ee Xeebaha',
    locationEn: 'Ras Hafun & Bosaso Sands',
    locationSo: 'Raas Xaafuun & Xeebaha Boosaaso',
    statusEn: 'Endangered Species Protection',
    statusSo: 'Nooc Khatar Ku Jira',
    image: '/images/img_10.webp',
    descEn: 'Ancient nesting shores hosting breeding green sea turtles, monitored continuously by local artisanal beach wardens.',
    descSo: 'Xeebo qadiimi ah oo ay ku dhashaan diidiinka badda, kuwaas oo ay ilaaliyaan ilaalada xeebaha deegaanka.',
  },
];

export default function EditorialMarineLife() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section id="editorial-marine-life" className="editorial-marine" aria-label="Somali Living Seas & Marine Life">
      <div className="editorial-marine__container">
        {/* Header */}
        <div className="editorial-marine__header">
          <div className="editorial-marine__title-group">
            <span className="editorial-eyebrow">
              {isSomali ? 'NOOLAHA BADDA' : 'THE LIVING OCEAN'}
            </span>
            <h2 className="editorial-section-title">
              {isSomali ? (
                <>Mucjisooyinka Biyaha <span className="editorial-italic">Hoostooda</span></>
              ) : (
                <>Biodiversity Across <span className="editorial-italic">3,330 Kilometres</span></>
              )}
            </h2>
          </div>
          <Link
            to={localizedPath('/marine-life')}
            className="editorial-marine__explore-btn"
          >
            <span>{isSomali ? 'Galka Noolaha Badda oo Dhan' : 'Explore Marine Life Library'}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cinematic 3-Panel Editorial Grid */}
        <div className="editorial-marine__grid">
          {MARINE_STORIES.map((item) => (
            <div key={item.id} className="editorial-marine-card">
              <div className="editorial-marine-card__media">
                <img
                  src={item.image}
                  alt={isSomali ? item.titleSo : item.titleEn}
                  className="editorial-marine-card__img"
                  loading="lazy"
                />
                <span className="editorial-marine-card__badge">
                  <Shield size={12} />
                  <span>{isSomali ? item.statusSo : item.statusEn}</span>
                </span>
              </div>

              <div className="editorial-marine-card__body">
                <span className="editorial-marine-card__location">
                  {isSomali ? item.locationSo : item.locationEn}
                </span>
                <h3 className="editorial-marine-card__title">
                  {isSomali ? item.titleSo : item.titleEn}
                </h3>
                <p className="editorial-marine-card__desc">
                  {isSomali ? item.descSo : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
