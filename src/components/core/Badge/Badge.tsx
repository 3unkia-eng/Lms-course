import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './Badge.css';

/** Badge (Core · Figma 246:1825). `status` mirrors the Figma Status variant; `dot` shows the leading 6px Dot (Figma Course card › status). */
export interface BadgeProps {
  status?: 'draft' | 'published' | 'archived' | 'info' | 'neutral';
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export function Badge({ status = 'neutral', dot = false, children, className }: BadgeProps) {
  const text = typeof children === 'string' ? children : undefined;
  return (
    <span className={cx('lms-badge', `lms-badge--${status}`, dot && 'lms-badge--dot', className)} title={text}>
      {dot && <span className="lms-badge__dot" aria-hidden />}
      {children}
    </span>
  );
}
