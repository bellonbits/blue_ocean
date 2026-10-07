import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronDown, Archive } from 'lucide-react';
import {
  statisticsTables,
  footnotes,
  definitions,
  dataSources,
  statsSource,
  NO_DATA,
} from '../../data/coastalStatistics';
import './CoastalStatistics.css';

function Cell({ value }) {
  return value === NO_DATA ? (
    <span className="coastal-stats__no-data" title="No data available in source">
      {NO_DATA}
    </span>
  ) : (
    value
  );
}

function StatTable({ table }) {
  const bodyRows = table.groups
    ? table.groups.flatMap((g) => [{ isGroupHeader: true, label: g.label }, ...g.rows])
    : table.rows;

  return (
    <div className="coastal-stats__table-card reveal">
      <div className="coastal-stats__table-head">
        <h3 className="coastal-stats__table-title">{table.title}</h3>
        {table.subtitle && <span className="coastal-stats__table-subtitle">{table.subtitle}</span>}
      </div>

      <div className="coastal-stats__table-scroll">
        <table className="coastal-stats__table">
          <thead>
            <tr>
              <th scope="col">Indicator</th>
              {table.columns.map((c) => (
                <th scope="col" key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, i) =>
              row.isGroupHeader ? (
                <tr className="coastal-stats__group-row" key={`g-${i}`}>
                  <th colSpan={table.columns.length + 1} scope="colgroup">{row.label}</th>
                </tr>
              ) : (
                <tr key={`${row.label}-${i}`}>
                  <th scope="row">
                    {row.label}
                    {row.footnote && <sup className="coastal-stats__footnote-ref">{row.footnote}</sup>}
                    {row.unit && <span className="coastal-stats__unit"> ({row.unit})</span>}
                  </th>
                  {row.values.map((v, vi) => (
                    <td key={vi}><Cell value={v} /></td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DefinitionsAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="coastal-stats__definitions reveal">
      <button
        type="button"
        className="coastal-stats__definitions-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>Indicator definitions & methodology</span>
        <ChevronDown size={18} className={`coastal-stats__chevron ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <dl className="coastal-stats__definitions-list">
          {definitions.map((d) => (
            <div className="coastal-stats__definition" key={d.term}>
              <dt>{d.term}</dt>
              <dd>
                {d.text}{' '}
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="coastal-stats__def-link">
                  Full technical note <ExternalLink size={12} />
                </a>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export default function CoastalStatistics() {
  return (
    <section className="coastal-stats section" aria-labelledby="coastal-stats-heading">
      <div className="container">
        <div className="coastal-stats__archive-notice reveal">
          <Archive size={16} />
          <span>
            The figures below are an archival reference dataset — reproduced from a {statsSource.year} international
            country profile with reference years mostly between 1990 and 2000. They are not current measurements and
            predate Blue Ocean's own field research; treat them as a historical baseline only.
          </span>
        </div>

        <div className="section-header reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>NATIONAL DATA</span>
          <div className="divider" />
          <h2 className="section-heading" id="coastal-stats-heading">
            Somalia's coast, by the numbers
          </h2>
          <p className="section-subheading">
            Somalia against Sub-Saharan African and global benchmarks — coastline length, marine territory,
            biodiversity, fisheries production, and trade.
          </p>
        </div>

        <div className="coastal-stats__tables">
          {statisticsTables.map((t) => (
            <StatTable table={t} key={t.id} />
          ))}
        </div>

        {footnotes.length > 0 && (
          <div className="coastal-stats__footnotes reveal">
            {footnotes.map((f) => (
              <p key={f.id}><sup>{f.id}</sup> {f.text}</p>
            ))}
            <p className="coastal-stats__no-data-key"><strong>{NO_DATA}</strong> — no data available in the source document.</p>
          </div>
        )}

        <DefinitionsAccordion />

        <div className="coastal-stats__sources reveal">
          <h3>Source & citation</h3>
          <p>{statsSource.citation}</p>
          <a href={statsSource.url} target="_blank" rel="noopener noreferrer" className="coastal-stats__def-link">
            {statsSource.url} <ExternalLink size={12} />
          </a>

          <h4>Underlying data sources</h4>
          <ul>
            {dataSources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p style={{ marginTop: 'var(--space-6)' }}>
            See also our{' '}
            <Link to="/research/coastal-geography" style={{ color: 'var(--color-turquoise)', fontWeight: 600 }}>
              Coastal Geomorphology & Habitats reference
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
