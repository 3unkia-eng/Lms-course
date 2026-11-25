import type { CSSProperties } from 'react';
import './HeatmapCell.css';

/**
 * Heatmap cell (Core · Figma 398:2026): one activity-intensity square, Level 0 (none) to 4 (highest).
 * Tokens: Heatmap cell/level N/background, Heatmap cell/radius.
 * Decorative by default; the parent table gives the level as text for screen readers.
 */
export type HeatmapLevel = 0 | 1 | 2 | 3 | 4;

export function HeatmapCell({ level, size = 'md', className, style }: {
  level: HeatmapLevel;
  size?: 'md' | 'sm';
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={['lms-heatmap-cell', `lms-heatmap-cell--${level}`, `lms-heatmap-cell--${size}`, className].filter(Boolean).join(' ')}
      style={style}
    />
  );
}
