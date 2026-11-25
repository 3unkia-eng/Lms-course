import { cx } from '../../../lib/cx';
import './ProgressBar.css';

/** Progress bar (Core · Figma 398:2011): track + indicator + fixed, right-aligned % label. */
export interface ProgressBarProps {
  value: number;
  /** Accessible name, e.g. "Sara Ahmadi progress" */
  label: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <span className={cx('lms-progress', className)}>
      <span className="lms-progress__track" role="progressbar" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <span className="lms-progress__indicator" style={{ width: `${v}%` }} />
      </span>
      <span className="lms-progress__label" aria-hidden>{v}%</span>
    </span>
  );
}
