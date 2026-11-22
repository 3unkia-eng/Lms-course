import { cx } from '../../../lib/cx';
import './Toggle.css';

/** Toggle (Core · Figma 247:1849). Native switch semantics via role="switch". */
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  /** Visible description id for aria-describedby */
  describedBy?: string;
  disabled?: boolean;
  id?: string;
}

export function Toggle({ checked, onChange, label, describedBy, disabled, id }: ToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      className={cx('lms-toggle', checked && 'lms-toggle--on')}
      onClick={() => onChange(!checked)}
    >
      <span className="lms-toggle__thumb" aria-hidden />
    </button>
  );
}
