import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getOrganization } from '../../data/organization';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchObjectives.css';
import './WhatWeDo.css';

export default function WhatWeDo() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const organization = getOrganization(language);

  return (
    <section className="research-obj section" aria-labelledby="what-we-do-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">{t('about.whatWeDo.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="what-we-do-heading">
            {t('about.whatWeDo.heading')}
          </h2>
        </div>

        <div className="research-obj__list what-we-do__list reveal">
          {organization.whatWeDo.map((item) => (
            <Link key={item.step} to={localizedPath(item.path)} className="research-obj__item what-we-do__item">
              <span className="research-obj__num">{item.step}</span>
              <div>
                <h3 className="what-we-do__title">{item.title}</h3>
                <p className="research-obj__text">{item.desc}</p>
                <span className="what-we-do__cta">
                  <span>{item.cta}</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
