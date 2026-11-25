import type { CSSProperties } from 'react';
import { cx } from '../../../lib/cx';
import './Skeleton.css';

/** Skeleton (Core · Figma 263:1946). Shape: text / block / circle. Decorative. */
export interface SkeletonProps {
  shape?: 'text' | 'block' | 'circle';
  /** Width as a token-based CSS value, e.g. "var(--space-40)" or "60%" */
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ shape = 'text', width, height, className }: SkeletonProps) {
  const style: CSSProperties = { width, height };
  return <span className={cx('lms-skeleton', `lms-skeleton--${shape}`, className)} style={style} aria-hidden />;
}
