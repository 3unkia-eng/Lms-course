import { useRef, type KeyboardEvent } from 'react';
import { cx } from '../../../lib/cx';
import './Tab.css';

/**
 * Tab (Core · Figma 247:1859) and a Tabs group. Arrow keys move between
 * tabs (WAI-ARIA tabs pattern, automatic activation).
 */
export interface TabItem<T extends string> { value: T; label: string; count?: number }

export interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  panelId?: string;
}

export function Tabs<T extends string>({ items, value, onChange, label, panelId }: TabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKey = (e: KeyboardEvent, index: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (index + dir + items.length) % items.length;
    refs.current[next]?.focus();
    onChange(items[next].value);
  };
  return (
    <div className="lms-tabs" role="tablist" aria-label={label}>
      {items.map((item, i) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`tab-${item.value}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            className={cx('lms-tab', active && 'lms-tab--active')}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {item.label}
            {item.count !== undefined && ` (${item.count})`}
          </button>
        );
      })}
    </div>
  );
}
