import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import './Button.css';

/**
 * Button (Core · Figma 246:1816, design system 2.0.0)
 * Appearance × Intent × Size mirror the Figma variants. hover, pressed and
 * focus are CSS states; disabled and loading are functional states (props).
 */
export type ButtonAppearance = 'filled' | 'outlined';
export type ButtonIntent = 'brand' | 'neutral' | 'danger' | 'warning' | 'info' | 'success';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Appearance` */
  appearance?: ButtonAppearance;
  /** Figma `Intent` */
  intent?: ButtonIntent;
  /** Figma `Size`: md 44, sm 32 */
  size?: ButtonSize;
  /** Figma `Leading icon` + `Leading icon swap` */
  leadingIcon?: ReactNode;
  /** Figma `Trailing icon` + `Trailing icon swap` */
  trailingIcon?: ReactNode;
  /** Figma `State=loading`: Spinner centered, label kept for width and screen readers. */
  loading?: boolean;
  /** Stretch to the container width (mobile action bars, side cards). */
  fullWidth?: boolean;
  children: ReactNode;
}

function classes(appearance: ButtonAppearance, intent: ButtonIntent, size: ButtonSize, fullWidth?: boolean, loading?: boolean, className?: string) {
  return cx(
    'lms-button',
    `lms-button--${appearance}-${intent}`,
    size === 'sm' && 'lms-button--sm',
    fullWidth && 'lms-button--full',
    loading && 'lms-button--loading',
    className,
  );
}

function Content({ leadingIcon, trailingIcon, loading, children }: Pick<ButtonProps, 'leadingIcon' | 'trailingIcon' | 'loading' | 'children'>) {
  return (
    <>
      {leadingIcon && <span className="lms-button__icon" aria-hidden>{leadingIcon}</span>}
      <span className="lms-button__label">{children}</span>
      {trailingIcon && <span className="lms-button__icon" aria-hidden>{trailingIcon}</span>}
      {loading && <Loader2 className="lms-button__spinner" aria-hidden />}
    </>
  );
}

export function Button({
  appearance = 'filled',
  intent = 'brand',
  size = 'md',
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes(appearance, intent, size, fullWidth, loading, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon} loading={loading}>{children}</Content>
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
  to, appearance = 'filled', intent = 'brand', size = 'md', leadingIcon, trailingIcon, fullWidth, className, children,
}: ButtonLinkProps) {
  return (
    <Link to={to} className={classes(appearance, intent, size, fullWidth, false, className)}>
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon}>{children}</Content>
    </Link>
  );
}
