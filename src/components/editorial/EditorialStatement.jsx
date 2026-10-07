import { useLanguage } from '../../context/LanguageContext';

export default function EditorialStatement() {
  const { language } = useLanguage();
  const isSomali = language === 'so';

  return (
    <section id="editorial-statement" className="editorial-statement" aria-label="Blue Ocean Vision Statement">
      <div className="editorial-statement__container">
        <div className="editorial-statement__header">
          <span className="editorial-eyebrow">
            {isSomali ? 'UJEEDDADA & ARAGTIDA' : 'AN UNBROKEN OCEAN HORIZON'}
          </span>
          <h2 className="editorial-statement__lead">
            {isSomali ? (
              <>
                <strong>3,330 kiilomitir oo xeeb ah.</strong> Hal badweyn oo <span className="editorial-italic">mucjiso ah.</span>
              </>
            ) : (
              <>
                <strong>3,330 kilometres of coastline.</strong> One <span className="editorial-italic">extraordinary</span> ocean.
              </>
            )}
          </h2>
          <p className="editorial-statement__body">
            {isSomali
              ? "Laga bilaabo Gacanka Cadmeed ilaa Badweynta Hindiya, Blue Ocean waxay sahamisaa deegaannada badda ee qaniga ah, bulshooyinka kalluumeysatada, iyo muuqaallada dabiiciga ah ee Soomaaliya ee aan wali dunidu arag."
              : "From the Gulf of Aden to the Indian Ocean, Blue Ocean explores Somalia's extraordinary marine environments, coastal communities and hidden landscapes. We bring scientific rigor, conservation stewardship and sustainable travel to Africa's longest national coastline."}
          </p>
        </div>

        {/* 4 Essential Coastal Pillars / Metrics */}
        <div className="editorial-statement__metrics">
          <div className="editorial-metric">
            <span className="editorial-metric__num">3,330</span>
            <span className="editorial-metric__unit">KM</span>
            <span className="editorial-metric__label">
              {isSomali ? 'Dhererka xeebta ugu dheer Afrika' : 'Africa’s longest mainland coastline'}
            </span>
          </div>

          <div className="editorial-metric">
            <span className="editorial-metric__num">2</span>
            <span className="editorial-metric__unit">{isSomali ? 'BADWEYN' : 'SEAS'}</span>
            <span className="editorial-metric__label">
              {isSomali ? 'Gacanka Cadmeed & Badweynta Hindiya' : 'Gulf of Aden & Indian Ocean confluence'}
            </span>
          </div>

          <div className="editorial-metric">
            <span className="editorial-metric__num">500+</span>
            <span className="editorial-metric__unit">{isSomali ? 'NOOC' : 'SPECIES'}</span>
            <span className="editorial-metric__label">
              {isSomali ? 'Noolaha badda ee diiwaangashan' : 'Documented marine megafauna & fish'}
            </span>
          </div>

          <div className="editorial-metric">
            <span className="editorial-metric__num">10</span>
            <span className="editorial-metric__unit">{isSomali ? 'GOBOL' : 'REGIONS'}</span>
            <span className="editorial-metric__label">
              {isSomali ? 'Laga bilaabo Saylac ilaa Baajuun' : 'From Zeila Archipelago to Bajuni Islands'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
