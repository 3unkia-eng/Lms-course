import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './ActionBar.css';

/**
 * Action bar (Composite · proposal). Figma "Footer actions" (desktop:
 * secondary left, Save as draft + primary right) and the mobile sticky
 * action bar (Figma 📱 Mobile · 375). Used on 4 wizard screens + mobile
 * lists, so it meets the 3+ reuse rule.
 */
export interface ActionBarProps {
  start?: ReactNode;
  end?: ReactNode;
  /** Short status line shown above the buttons on mobile, beside them on desktop */
  note?: ReactNode;
  /** Hide `start` on mobile (e.g. Cancel: the header back button covers it) */
  hideStartOnMobile?: boolean;
  className?: string;
}

export function ActionBar({ start, end, note, hideStartOnMobile, className }: ActionBarProps) {
  return (
    <div className={cx('lms-action-bar', hideStartOnMobile && 'lms-action-bar--hide-start', className)}>
      {start && <div className="lms-action-bar__start">{start}</div>}
      {note && <p className="lms-action-bar__note">{note}</p>}
      {end && <div className="lms-action-bar__end">{end}</div>}
    </div>
  );
}
