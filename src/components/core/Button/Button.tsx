import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import './Button.css';

/**
 * Button (Core · Figma 246:1816)
 * Type × Appearance mirror the Figma variants. Hover and focus are CSS
 * states; Disabled and Loading are functional states (props).
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Type` */
  variant?: 'filled' | 'outlined';
  /** Figma `Appearance` */
  appearance?: 'primary' | 'secondary';
  /** Figma `Leading icon` + `Icon` (instance swap) */
  leadingIcon?: ReactNode;
  /** Proposal: Loading state (missing in Figma 1.4.0). Disables the button. */
  loading?: boolean;
  /** Stretch to the container width (mobile action bars, side cards). */
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'filled',
  appearance = 'primary',
  leadingIcon,
  loading = false,
  fullWidth = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      className={cx(
        'lms-button',
        `lms-button--${variant}-${appearance}`,
        fullWidth && 'lms-button--full',
        loading && 'lms-button--loading',
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 className="lms-button__icon lms-button__spinner" aria-hidden />
      ) : (
        leadingIcon && <span className="lms-button__icon" aria-hidden>{leadingIcon}</span>
      )}
      <span className="lms-button__label">{children}</span>
    </button>
  );
}

/**
 * Same look as Button, rendered as a router link (navigation is not an
 * action, agent.md: "Not for navigation between pages").
 */
export interface ButtonLinkProps extends Omit<ButtonProps, 'loading' | 'type' | 'onClick'> {
  to: string;
}

export function ButtonLink({
  to, variant = 'filled', appearance = 'primary', leadingIcon, fullWidth, className, children,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cx('lms-button', `lms-button--${variant}-${appearance}`, fullWidth && 'lms-button--full', className)}
    >
      {leadingIcon && <span className="lms-button__icon" aria-hidden>{leadingIcon}</span>}
      <span className="lms-button__label">{children}</span>
    </Link>
  );
}
