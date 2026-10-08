import { ArrowRight, Microscope, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function EditorialResearch() {
  const { language } = useLanguage();
  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  return (
    <section id="editorial-research" className="editorial-research" aria-label="Marine Research & Conservation Initiatives">
      <div className="editorial-research__container">
        {/* Editorial Split Header & Narrative */}
        <div className="editorial-research__intro">
          <div className="editorial-research__intro-left">
            <span className="editorial-eyebrow">
              {isSomali ? 'CILMI-BAARIS & DHOWRID' : 'RESEARCH & CONSERVATION'}
            </span>
            <h2 className="editorial-section-title">
              {isSomali ? (
                <>Dhowrista Badweynta Iyadoo Loo Marayo <br /><span className="editorial-italic">Xaqiiqo Cilmiyeed</span></>
              ) : (
                <>Science-Led Stewardship for a <br /><span className="editorial-italic">Living Ocean</span></>
              )}
            </h2>
          </div>

          <div className="editorial-research__intro-right">
            <p className="editorial-research__lead-text">
              {isSomali
                ? "Somalia Blue Heaven waxay iskaashi la leedahay jaamacadaha maxalliga ah, cilmi-baarayaasha caalamiga ah iyo kalluumeysatada xeebaha si loo ururiyo xog sax ah oo ku saabsan biyaha Soomaaliya loona ilaaliyo kheyraadka badda."
                : "Somalia Blue Heaven partners with Somali universities, international marine scientists and coastal cooperatives to gather baseline ecological data, combat illegal foreign fishing, and establish community-led marine protected areas across 3,330 km of open water."}
            </p>
            <div className="editorial-research__intro-links">
              <Link to={localizedPath('/research')} className="editorial-btn-dark">
                <span>{isSomali ? 'Xogta Cilmi-baarista' : 'Scientific Expeditions'}</span>
                <ArrowRight size={14} />
              </Link>
              <Link to={localizedPath('/conservation')} className="editorial-btn-ghost">
                <span>{isSomali ? 'Barnaamijyada Dhowridda' : 'Conservation Programs'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Scientific Programs */}
        <div className="editorial-research__grid">
          <div className="editorial-research-card">
            <div className="editorial-research-card__icon-wrap">
              <Microscope size={22} className="editorial-research-card__icon" />
            </div>
            <h3 className="editorial-research-card__title">
              {isSomali ? 'Khariidaynta Badda & Dhagax-badeedka' : 'Bathymetry & Coral Ecosystem Mapping'}
            </h3>
            <p className="editorial-research-card__desc">
              {isSomali
                ? 'Isticmaalka sonar-ka iyo sawirrada dayax-gacmeedka si loo khariideeyo reef-ka badda iyo meelaha qoto-dheer ee kalluunku ku tarmo.'
                : 'High-resolution acoustic sonar and satellite mapping documenting virgin reef topography and upwelling dynamics across the Horn of Africa.'}
            </p>
            <ul className="editorial-research-card__points">
              <li><CheckCircle2 size={14} /> <span>{isSomali ? '140+ Nooc oo reef ah' : '140+ Scleractinian coral species cataloged'}</span></li>
              <li><CheckCircle2 size={14} /> <span>{isSomali ? 'Baaritaanka qoto-dheerka badda' : 'Deep-water bathymetric transects completed'}</span></li>
            </ul>
          </div>

          <div className="editorial-research-card">
            <div className="editorial-research-card__icon-wrap">
              <Shield size={22} className="editorial-research-card__icon" />
            </div>
            <h3 className="editorial-research-card__title">
              {isSomali ? 'Ilaalinta Kalluumeysiga Sharci-darrada ah' : 'Artisanal Fisheries & Anti-IUU Defense'}
            </h3>
            <p className="editorial-research-card__desc">
              {isSomali
                ? 'Diiwaangelinta doonyaha shisheeye ee sharci-darrada ku gala biyaha dalka iyo taageeridda nidaamka xog-ururinta kalluumeysatada deegaanka.'
                : 'Supporting coastal cooperatives with GPS catch logging, monitoring illegal foreign trawlers, and establishing community fisheries co-management.'}
            </p>
            <ul className="editorial-research-card__points">
              <li><CheckCircle2 size={14} /> <span>{isSomali ? 'Xog-ururinta 12 dekedood' : 'Real-time catch monitoring across 12 landing sites'}</span></li>
              <li><CheckCircle2 size={14} /> <span>{isSomali ? 'Difaaca aagga 12-mayl ee maxalliga ah' : 'Defense of the 12-nautical-mile artisanal zone'}</span></li>
            </ul>
          </div>

          <div className="editorial-research-card">
            <div className="editorial-research-card__icon-wrap">
              <FileText size={22} className="editorial-research-card__icon" />
            </div>
            <h3 className="editorial-research-card__title">
              {isSomali ? 'Aagagga Badda ee La Dhowro (MPAs)' : 'Marine Protected Area Designations'}
            </h3>
            <p className="editorial-research-card__desc">
              {isSomali
                ? 'Qorsheynta aagagga badda ee u baahan dhowridda degdegga ah sida xeebaha diidiinka iyo keymaha mangrove-ka ee Jubaland.'
                : 'Working alongside coastal elders and maritime authorities to legally protect critical turtle nesting shores and southern mangrove archipelagos.'}
            </p>
            <ul className="editorial-research-card__points">
              <li><CheckCircle2 size={14} /> <span>{isSomali ? '4 Aag oo qabyo ah' : '4 Proposed Marine Sanctuaries submitted'}</span></li>
              <li><CheckCircle2 size={14} /> <span>{isSomali ? 'Ilaalada xeebaha deegaanka' : 'Community turtle wardens trained and deployed'}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
