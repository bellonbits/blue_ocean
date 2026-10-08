import { ArrowRight, Compass, Microscope, GraduationCap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const PILLARS = [
  {
    num: '01',
    icon: Compass,
    path: '/tourism',
    titleEn: 'Marine Tourism',
    titleSo: 'Dalxiiska Badda',
    descEn: 'Low-impact expeditions, island voyages and responsible coastal diving connecting travelers with virgin waters.',
    descSo: 'Safarro dabiici ah, jasiirado iyo quusid mas’uuliyad leh oo qofka xiriirinaya biyaha hodanka ah.',
  },
  {
    num: '02',
    icon: Microscope,
    path: '/research',
    titleEn: 'Scientific Research',
    titleSo: 'Cilmi-Baaris Badeed',
    descEn: 'Marine biodiversity surveys, coral reef mapping and water salinity studies across the Guardafui Channel.',
    descSo: 'Xog-ururin cilmiyeed, khariidaynta dhibcaha dhagax-badeedka iyo cabbirka tayada biyaha badda.',
  },
  {
    num: '03',
    icon: GraduationCap,
    path: '/communities',
    titleEn: 'Ocean Education',
    titleSo: 'Waxbarashada Badda',
    descEn: 'Training coastal youth, developing ocean literacy programs and supporting artisanal fishing communities.',
    descSo: 'Tababarka dhalinyarada xeebaha, waxbarashada deegaanka badda iyo taageerada kalluumeysatada jilicsan.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    path: '/conservation',
    titleEn: 'Marine Conservation',
    titleSo: 'Dhowridda Badda',
    descEn: 'Safeguarding green sea turtle nesting sanctuaries, protecting pristine coral ecosystems and monitoring illegal fishing.',
    descSo: 'Ilaalinta goobaha ay ku dhashaan diidiinka, dhowridda reef-ka badda iyo la-dagaallanka kalluumeysiga sharci-darrada ah.',
  },
];

export default function EditorialMission() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section id="editorial-mission" className="editorial-mission" aria-label="Somalia Blue Heaven Mission & Four Pillars">
      <div className="editorial-mission__container">
        {/* Editorial Mission Statement */}
        <div className="editorial-mission__header">
          <span className="editorial-eyebrow">
            {isSomali ? 'KALIYA SAFAR MA AHA' : 'MORE THAN A JOURNEY'}
          </span>
          <h2 className="editorial-mission__title">
            {isSomali ? (
              <>
                Waan sahaminnaa si aan u fahanno. <br />
                <span className="editorial-italic">Waan fahannaa si aan u dhowrno.</span>
              </>
            ) : (
              <>
                We explore to understand. <br />
                <span className="editorial-italic">We understand to protect.</span>
              </>
            )}
          </h2>
          <p className="editorial-mission__desc">
            {isSomali
              ? 'Somalia Blue Heaven waxay dadka ku xirtaa xeebaha cajiibka ah ee Soomaaliya iyada oo loo marayo dalxiis mas’uul ah, cilmi-baaris badeed, waxbarashada dhalinyarada iyo dhowridda kheyraadka noolaha.'
              : "Somalia Blue Heaven connects people with Somalia's extraordinary coastline through responsible travel, scientific marine research, ocean education and habitat conservation."}
          </p>
        </div>

        {/* 4 Minimal Editorial Pillar Cards */}
        <div className="editorial-mission__grid">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.num}
                to={localizedPath(pillar.path)}
                className="editorial-pillar-card"
              >
                <div className="editorial-pillar-card__top">
                  <span className="editorial-pillar-card__num">{pillar.num}</span>
                  <div className="editorial-pillar-card__icon-wrap">
                    <Icon size={20} className="editorial-pillar-card__icon" />
                  </div>
                </div>

                <div className="editorial-pillar-card__body">
                  <h3 className="editorial-pillar-card__title">
                    {isSomali ? pillar.titleSo : pillar.titleEn}
                  </h3>
                  <p className="editorial-pillar-card__desc">
                    {isSomali ? pillar.descSo : pillar.descEn}
                  </p>
                </div>

                <div className="editorial-pillar-card__footer">
                  <span className="editorial-pillar-card__link-text">
                    {isSomali ? 'Wax Badan Ka Baro' : 'Explore Initiative'}
                  </span>
                  <ArrowRight size={14} className="editorial-pillar-card__arrow" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
