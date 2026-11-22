import { cx } from '../../../lib/cx';
import './Avatar.css';

/** Avatar (Core · Figma 246:1830). Initials from the first two words. */
export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const chars = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : [parts[0] ?? ''];
  return chars.map((p) => Array.from(p)[0] ?? '').join('').toUpperCase();
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <span className={cx('lms-avatar', `lms-avatar--${size}`, className)} role="img" aria-label={name}>
      {initials(name)}
    </span>
  );
}
