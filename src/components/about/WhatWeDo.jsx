import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { organization } from '../../data/organization';
import '../research/ResearchObjectives.css';
import './WhatWeDo.css';

export default function WhatWeDo() {
  return (
    <section className="research-obj section" aria-labelledby="what-we-do-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">OUR APPROACH</span>
          <div className="divider" />
          <h2 className="section-heading" id="what-we-do-heading">
            What We Do
          </h2>
        </div>

        <div className="research-obj__list what-we-do__list reveal">
          {organization.whatWeDo.map((item) => (
            <Link key={item.step} to={item.path} className="research-obj__item what-we-do__item">
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
