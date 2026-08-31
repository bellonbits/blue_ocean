import { motion } from 'framer-motion';
import { Fish, Layers, Microscope, Waves, Shield } from 'lucide-react';
import { getMarineStats } from '../../data/marineLife';
import './MarineStats.css';

export default function MarineStats() {
  const stats = getMarineStats();

  const statItems = [
    {
      icon: Fish,
      val: `${stats.documentedSpecies}+`,
      label: 'DOCUMENTED SPECIES',
      desc: 'Catalogued with verified scientific taxonomy',
    },
    {
      icon: Layers,
      val: `0${stats.categoriesCount}`,
      label: 'CLASSIFICATION GROUPS',
      desc: 'From marine mammals to benthic invertebrates',
    },
    {
      icon: Waves,
      val: `0${stats.ecosystemsCount}`,
      label: 'COASTAL ECOSYSTEMS',
      desc: 'Coral barriers, seagrass sinks & deep upwellings',
    },
    {
      icon: Microscope,
      val: `${stats.activeStudies}`,
      label: 'RESEARCH PROJECTS',
      desc: 'Active acoustic, genetic & field surveys',
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
