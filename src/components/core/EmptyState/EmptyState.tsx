import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './EmptyState.css';

/** Empty state (Core · Figma 263:1947). Title, Description, Icon swap, optional Action. */
export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  tone?: 'brand' | 'error';
  className?: string;
}

export function EmptyState({ icon, title, description, action, tone = 'brand', className }: EmptyStateProps) {
  return (
    <div className={cx('lms-empty', `lms-empty--${tone}`, className)} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="lms-empty__icon" aria-hidden>{icon}</span>
      <div className="lms-empty__text">
        <h2 className="lms-empty__title">{title}</h2>
        {description && <p className="lms-empty__description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
