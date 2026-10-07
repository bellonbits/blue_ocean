import { ArrowRight, Anchor, Compass, Camera, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const EXPERIENCES = [
  {
    slug: 'scuba-diving',
    titleEn: 'Pelagic Scuba & Coral Atoll Diving',
    titleSo: 'Quusidda Qoto-dheer & Sahaminta Reef-ka',
    categoryEn: 'Underwater Expedition',
    categorySo: 'Sahaminta Biyaha Hoostooda',
    durationEn: '4–7 Days',
    durationSo: '4–7 Maalmood',
    image: '/images/img_02.png',
    descEn: 'Descend into crystal-clear waters along steep continental drop-offs, interacting with manta rays, reef sharks and virgin coral.',
    descSo: 'U quuso biyaha nadiifka ah ee qotada dheer, la kulan kalluunka waaweyn iyo dhagax-badeedka aan waligood la taaban.',
  },
  {
    slug: 'dhow-sailing',
    titleEn: 'Traditional Dhow & Island Archipelago Voyages',
    titleSo: 'Safarada Doonyaha Qadiimiga & Jasiiradaha',
    categoryEn: 'Maritime Heritage',
    categorySo: 'Hidaha Badmareenka',
    durationEn: '3–5 Days',
    durationSo: '3–5 Maalmood',
    image: '/images/img_05.png',
    descEn: 'Sail under lateen sails through mangrove channels and untouched island chains guided by multi-generational Somali navigators.',
    descSo: 'Ku dhex safar jasiiradaha fog adigoo saaran doon dhaqameed ay hagayaan badmareenno khibrad leh oo maxalli ah.',
  },
  {
    slug: 'coastal-cliff',
    titleEn: 'Canyon Cliffs & Desert Coast Trekking',
    titleSo: 'Socdaalka Buuraha Xeebta & Dooxooyinka Eyl',
    categoryEn: 'Coastal Wilderness',
    categorySo: 'Dabeecadda Xeebta',
    durationEn: '2–4 Days',
    durationSo: '2–4 Maalmood',
    image: '/images/img_03.png',
    descEn: 'Trek where dramatic limestone canyons meet the crashing Indian Ocean surf, visiting historic forts and natural springs.',
    descSo: 'Kora buuraha dhagaxa ah ee ku teedsan badda, booqo qalcadihii taariikhiga ahaa iyo ilaha biyaha macaan ee Eyl.',
  },
];

export default function EditorialExperiences() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section id="editorial-experiences" className="editorial-exp" aria-label="Curated Ocean Experiences">
      <div className="editorial-exp__container">
        {/* Section Header */}
        <div className="editorial-exp__header">
          <div className="editorial-exp__title-group">
            <span className="editorial-eyebrow">
              {isSomali ? 'KHIBRADAHA BADDA' : 'OCEAN EXPERIENCES'}
            </span>
            <h2 className="editorial-section-title">
              {isSomali ? (
                <>Safarro Lagu Sahminayo <span className="editorial-italic">Biyaha Geeska Afrika</span></>
              ) : (
                <>Curated Expeditions Along the <span className="editorial-italic">Somali Current</span></>
              )}
            </h2>
          </div>
          <Link
            to={localizedPath('/experiences')}
            className="editorial-exp__view-all"
          >
            <span>{isSomali ? 'Dhammaan Khibradaha' : 'Explore All Ocean Experiences'}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Editorial Experience Cards */}
        <div className="editorial-exp__grid">
          {EXPERIENCES.map((exp) => (
            <Link
              key={exp.slug}
              to={localizedPath('/experiences')}
              className="editorial-exp-card"
            >
              <div className="editorial-exp-card__media">
                <img
                  src={exp.image}
                  alt={isSomali ? exp.titleSo : exp.titleEn}
                  className="editorial-exp-card__img"
                  loading="lazy"
                />
                <span className="editorial-exp-card__duration">
                  {isSomali ? exp.durationSo : exp.durationEn}
                </span>
              </div>

              <div className="editorial-exp-card__body">
                <span className="editorial-exp-card__category">
                  {isSomali ? exp.categorySo : exp.categoryEn}
                </span>
                <h3 className="editorial-exp-card__title">
                  {isSomali ? exp.titleSo : exp.titleEn}
                </h3>
                <p className="editorial-exp-card__desc">
                  {isSomali ? exp.descSo : exp.descEn}
                </p>
                <div className="editorial-exp-card__action">
                  <span>{isSomali ? 'Faahfaahinta Safarka' : 'Expedition Details'}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
