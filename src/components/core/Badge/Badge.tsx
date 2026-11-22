import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './Badge.css';

/** Badge (Core · Figma 246:1825). `status` mirrors the Figma Status variant. */
export interface BadgeProps {
  status?: 'draft' | 'published' | 'info' | 'neutral';
  children: ReactNode;
  className?: string;
}

export function Badge({ status = 'neutral', children, className }: BadgeProps) {
  const text = typeof children === 'string' ? children : undefined;
  return (
    <span className={cx('lms-badge', `lms-badge--${status}`, className)} title={text}>
      {children}
    </span>
  );
}
