import { Avatar, Badge, Card, ProgressBar } from '../../core';
import './ActivityTable.css';

/**
 * Activity table (Composite · Figma 659:6120): Card + Table header + Table rows
 * (Avatar, course, Progress bar, last active, status Badge).
 * Columns: Learner (fill), Course, Progress, Last active, Status. Header and rows share widths.
 */
export interface ActivityRow {
  learner: string;
  course: string;
  progress: number;
  lastActive: string;
  status: 'completed' | 'in-progress' | 'enrolled';
}

const STATUS = {
  completed: { badge: 'published', label: 'Completed' },
  'in-progress': { badge: 'info', label: 'In progress' },
  enrolled: { badge: 'neutral', label: 'Enrolled' },
} as const;

export function ActivityTable({ title = 'Recent activity', rows }: { title?: string; rows: ActivityRow[] }) {
  return (
    <Card title={title} className="lms-activity">
      <div className="lms-activity__scroll">
        <table className="lms-activity__table">
          <thead>
            <tr>
              <th scope="col">Learner</th>
              <th scope="col">Course</th>
              <th scope="col">Progress</th>
              <th scope="col">Last active</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.learner + r.course}>
                <td><span className="lms-activity__learner"><Avatar name={r.learner} size="sm" />{r.learner}</span></td>
                <td>{r.course}</td>
                <td><ProgressBar value={r.progress} label={`${r.learner} progress`} /></td>
                <td className="lms-activity__meta">{r.lastActive}</td>
                <td><Badge status={STATUS[r.status].badge}>{STATUS[r.status].label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
