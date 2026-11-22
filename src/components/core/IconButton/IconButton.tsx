import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './IconButton.css';

/**
 * Icon button (Core · Figma 246:1837). `label` is required: it becomes the
 * aria-label, because the button has no visible text.
 */
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: ReactNode;
  /** `ghost` drops the border (used for row actions and headers). */
  appearance?: 'outlined' | 'ghost';
  /** Shows a dot (e.g. unread notifications). */
  indicator?: boolean;
}

export function IconButton({
  label, icon, appearance = 'outlined', indicator, className, type = 'button', ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx('lms-icon-button', `lms-icon-button--${appearance}`, className)}
      {...rest}
    >
      <span className="lms-icon-button__icon" aria-hidden>{icon}</span>
      {indicator && <span className="lms-icon-button__indicator" aria-hidden />}
    </button>
  );
}
