import { useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Badge, Card, ProgressBar } from '../../core';
import './ActivityTable.css';

/**
 * Activity table (Composite · Figma 659:6120): Card + Table header + Table rows
 * (Avatar, course, Progress bar, status Badge).
 * Columns (Figma 659:6198): Learner, Course, Progress, Status, equal widths. Header and rows share widths.
 * `fitHeight` (code-only, layout behaviour): when the page gives the card a fixed height
 * (the table area has `overflow: hidden`), show only the rows that fit in full, never a cut row.
 */
export interface ActivityRow {
  learner: string;
  course: string;
  progress: number;
  /** Kept for data; not shown since the Figma update (659:6198 has no Last active column) */
  lastActive?: string;
  status: 'completed' | 'in-progress' | 'enrolled';
}

const STATUS = {
  completed: { badge: 'published', label: 'Completed' },
  'in-progress': { badge: 'info', label: 'In progress' },
  enrolled: { badge: 'neutral', label: 'Enrolled' },
} as const;

export function ActivityTable({
  title = 'Recent activity', rows, fitHeight = false,
}: { title?: string; rows: ActivityRow[]; fitHeight?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(rows.length);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!fitHeight || !el) { setVisible(rows.length); return; }
    const measure = () => {
      // Only limit rows when the page has fixed the table's height (fill layout on desktop).
      if (getComputedStyle(el).overflowY !== 'hidden') { setVisible(rows.length); return; }
      const head = el.querySelector('thead')?.getBoundingClientRect().height ?? 0;
      const rowHeight = el.querySelector('tbody tr')?.getBoundingClientRect().height || 1;
      setVisible(Math.max(1, Math.min(rows.length, Math.floor((el.clientHeight - head) / rowHeight))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitHeight, rows.length]);

  return (
    <Card title={title} className={fitHeight ? 'lms-activity lms-activity--fit' : 'lms-activity'}>
      <div ref={scrollRef} className="lms-activity__scroll">
        <table className="lms-activity__table">
          <thead>
            <tr>
              <th scope="col">Learner</th>
              <th scope="col">Course</th>
              <th scope="col">Progress</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, visible).map((r) => (
              <tr key={r.learner + r.course}>
                <td><span className="lms-activity__learner"><Avatar name={r.learner} size="sm" />{r.learner}</span></td>
                <td>{r.course}</td>
                <td><ProgressBar value={r.progress} label={`${r.learner} progress`} /></td>
                <td><Badge status={STATUS[r.status].badge}>{STATUS[r.status].label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
