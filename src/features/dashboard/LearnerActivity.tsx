import type { CSSProperties } from 'react';
import { Card, HeatmapCell } from '../../components/core';
import type { HeatmapLevel } from '../../components/core';
import './LearnerActivity.css';

/**
 * Learner activity (Figma Step 01 · Dashboard, Card/Learner activity 399:5686 with
 * the Activity heatmap composite 400:5995): when learners study, days × time of day,
 * built from Heatmap cell. One use only, so it lives in features/ (agent.md rule 5).
 * Entrance: cells grow and fade in column by column (Figma motion on 400:5995);
 * off under prefers-reduced-motion.
 */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIMES = ['6a', '9a', '12p', '3p', '6p', '9p'] as const;
const TIME_NAMES = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
const LEVEL_NAMES = ['No activity', 'Low', 'Medium', 'High', 'Highest'];

// Same values as the Figma component (rows = days, columns = times).
const LEVELS: HeatmapLevel[][] = [
  [0, 2, 1, 1, 3, 4],
  [0, 1, 2, 1, 3, 3],
  [1, 2, 1, 2, 4, 3],
  [0, 1, 1, 2, 3, 4],
  [0, 1, 2, 1, 2, 2],
  [1, 2, 3, 3, 2, 1],
  [0, 1, 2, 2, 3, 2],
];

export function LearnerActivity() {
  return (
    <Card title="Learner activity" className="learner-activity" headingLevel={2}>
      <div className="activity-heatmap">
        <table className="activity-heatmap__table">
          <caption className="visually-hidden">Learner activity by day and time of day, last 4 weeks</caption>
          <thead className="visually-hidden">
            <tr>
              <td />
              {TIME_NAMES.map((t) => <th key={t} scope="col">{t}</th>)}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((d, row) => (
              <tr key={d}>
                <th scope="row" className="activity-heatmap__day">
                  <span aria-hidden="true">{d}</span>
                  <span className="visually-hidden">{DAY_NAMES[row]}</span>
                </th>
                {LEVELS[row].map((level, col) => (
                  <td key={col} title={`${DAY_NAMES[row]} ${TIME_NAMES[col]}: ${LEVEL_NAMES[level]}`}>
                    <HeatmapCell
                      level={level}
                      className="activity-heatmap__cell"
                      style={{ '--hm-col': col, '--hm-row': row } as CSSProperties}
                    />
                    <span className="visually-hidden">{LEVEL_NAMES[level]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot aria-hidden="true">
            <tr>
              <td />
              {TIMES.map((t) => <td key={t} className="activity-heatmap__time">{t}</td>)}
            </tr>
          </tfoot>
        </table>
        <div className="activity-heatmap__scale" aria-hidden="true">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as HeatmapLevel[]).map((l) => <HeatmapCell key={l} level={l} size="sm" />)}
          <span>More</span>
        </div>
      </div>
    </Card>
  );
}
