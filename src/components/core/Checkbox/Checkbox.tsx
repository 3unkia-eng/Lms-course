import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cx } from '../../../lib/cx';
import './Checkbox.css';

/** Checkbox (Core · Figma 247:1854). Native input, custom box. */
export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label: ReactNode;
  readOnly?: boolean;
  className?: string;
}

export function Checkbox({ checked, onChange, label, readOnly, className }: CheckboxProps) {
  return (
    <label className={cx('lms-checkbox', readOnly && 'lms-checkbox--readonly', className)}>
      <input
        type="checkbox"
        className="lms-checkbox__input"
        checked={checked}
        readOnly={readOnly}
        aria-readonly={readOnly || undefined}
        onChange={(e) => !readOnly && onChange?.(e.target.checked)}
        onClick={(e) => readOnly && e.preventDefault()}
      />
      <span className={cx('lms-checkbox__box', checked && 'lms-checkbox__box--checked')} aria-hidden>
        {checked && <Check />}
      </span>
      <span className="lms-checkbox__label">{label}</span>
    </label>
  );
}
