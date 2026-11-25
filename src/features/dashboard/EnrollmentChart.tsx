import { useState } from 'react';
import { Card, Input } from '../../components/core';
import './EnrollmentChart.css';

/**
 * Enrollment activity (Figma Step 01 · Dashboard 250:1946): stacked column chart,
 * new learners (Chart column/primary) on the bottom, returning learners
 * (Chart column/secondary) on top. Built from Card + Input (select).
 * Total and time range sit in the card header, legend beside the range, so the plot
 * can grow to fill the card on desktop (Dashboard first-view layout).
 * One use only, so it lives in features/, not in components/composite (agent.md rule 5).
 */
interface Month { label: string; newLearners: number; returning: number }

const MONTHS: Month[] = [
  { label: 'Dec', newLearners: 22, returning: 24 },
  { label: 'Jan', newLearners: 28, returning: 28 },
  { label: 'Feb', newLearners: 35, returning: 30 },
  { label: 'Mar', newLearners: 45, returning: 36 },
  { label: 'Apr', newLearners: 30, returning: 42 },
  { label: 'May', newLearners: 58, returning: 56 },
  { label: 'Jun', newLearners: 46, returning: 58 },
  { label: 'Jul', newLearners: 92, returning: 70 },
  { label: 'Aug', newLearners: 78, returning: 78 },
  { label: 'Sep', newLearners: 107, returning: 74 },
  { label: 'Oct', newLearners: 88, returning: 75 },
  { label: 'Nov', newLearners: 121, returning: 65 },
];

const RANGES = [
  { value: '12', label: 'Last 12 months' },
  { value: '6', label: 'Last 6 months' },
];
const TICKS = [250, 200, 150, 100, 50, 0];
const MAX = TICKS[0];
const pct = (n: number) => `${(n / MAX) * 100}%`;

export function EnrollmentChart() {
  const [range, setRange] = useState('12');
  const data = MONTHS.slice(-Number(range));
  const [active, setActive] = useState(data.length - 1);
  const total = data.reduce((s, m) => s + m.newLearners + m.returning, 0);
  const current = data[Math.min(active, data.length - 1)];
  const rangeLabel = RANGES.find((r) => r.value === range)?.label.toLowerCase();

  return (
    <Card
      title="Enrollment activity"
      description={<span className="enrollment__total"><strong className="enrollment__value">{total.toLocaleString('en-US')}</strong> enrollments · {rangeLabel}</span>}
      className="enrollment"
      headingLevel={2}
      headerAside={
        <div className="enrollment__controls">
          <ul className="bar-chart__legend" aria-hidden>
            <li className="legend-item"><span className="legend-item__swatch legend-item__swatch--primary" />New learners</li>
            <li className="legend-item"><span className="legend-item__swatch legend-item__swatch--secondary" />Returning learners</li>
          </ul>
          <Input
            label="Time range"
            hideLabel
            value={range}
            onChange={(v) => { setRange(v); setActive(Number(v) - 1); }}
            options={RANGES}
            className="enrollment__range"
          />
        </div>
      }
    >
      <figure className="bar-chart" aria-label={`Enrollments per month, ${rangeLabel}`}>
        <div className="bar-chart__body">
          <ol className="bar-chart__axis" aria-hidden>
            {TICKS.map((t) => <li key={t}>{t}</li>)}
          </ol>
          <div className="bar-chart__plot">
            {TICKS.map((t) => <span key={t} className="bar-chart__grid" style={{ top: `calc(var(--bar-chart-plot-height) * ${1 - t / MAX})` }} aria-hidden />)}
            <ul className="bar-chart__columns">
              {data.map((m, i) => (
                <li key={m.label} className="chart-column">
                  <button
                    type="button"
                    className="chart-column__hit"
                    aria-label={`${m.label}: ${m.newLearners} new, ${m.returning} returning`}
                    aria-pressed={i === active}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="chart-column__stack" style={{ height: pct(m.newLearners + m.returning) }}>
                      <span className="chart-column__bar chart-column__bar--secondary" style={{ flexGrow: m.returning }} />
                      <span className="chart-column__bar chart-column__bar--primary" style={{ flexGrow: m.newLearners }} />
                      {current === m && (
                        <span className="chart-column__tooltip">
                          <span><i className="chart-column__swatch chart-column__swatch--primary" />{m.newLearners} new</span>
                          <span><i className="chart-column__swatch chart-column__swatch--secondary" />{m.returning} returning</span>
                        </span>
                      )}
                    </span>
                  </button>
                  <span className="chart-column__label" aria-hidden>{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </figure>
    </Card>
  );
}
