import { motion } from 'framer-motion';
import { Fish, Layers, Microscope, Waves, Shield } from 'lucide-react';
import { getMarineStats } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import './MarineStats.css';

export default function MarineStats() {
  const { t } = useLanguage();
  const stats = getMarineStats();

  const statItems = [
    {
      icon: Fish,
      val: `${stats.documentedSpecies}+`,
      label: t('marineLife.stats.documentedSpecies.label'),
      desc: t('marineLife.stats.documentedSpecies.desc'),
    },
    {
      icon: Layers,
      val: `0${stats.categoriesCount}`,
      label: t('marineLife.stats.classificationGroups.label'),
      desc: t('marineLife.stats.classificationGroups.desc'),
    },
    {
      icon: Waves,
      val: `0${stats.ecosystemsCount}`,
      label: t('marineLife.stats.coastalEcosystems.label'),
      desc: t('marineLife.stats.coastalEcosystems.desc'),
    },
    {
      icon: Microscope,
      val: `${stats.activeStudies}`,
      label: t('marineLife.stats.researchProjects.label'),
      desc: t('marineLife.stats.researchProjects.desc'),
    },
  ];

  return (
    <section className="marine-stats section" aria-label="Marine Life Statistics">
      <div className="container">
        <div className="marine-stats__card reveal">
          <div className="marine-stats__grid">
            {statItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="marine-stats__item">
                  <div className="marine-stats__icon-wrap">
                    <Icon size={22} />
                  </div>
                  <div className="marine-stats__number">{item.val}</div>
                  <div className="marine-stats__label">{item.label}</div>
                  <div className="marine-stats__desc">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
