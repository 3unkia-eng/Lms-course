import { forwardRef, useId, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../../../lib/cx';
import './Input.css';

/**
 * Input (Core · Figma 247:1844)
 * One component for the Figma variants: single line, Multiline (textarea)
 * and Select (Input + Trailing icon). States: default, hover, focus (CSS),
 * error, disabled (props). Every state is a variant, no slots.
 */
type Option = { value: string; label: string };

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Helper text under the field (Figma: Helper Text) */
  helper?: ReactNode;
  /** Error message; switches to the Error state and replaces the helper */
  error?: string;
  /** Shows "n / max characters" as helper when no error */
  maxLength?: number;
  multiline?: boolean;
  /** Renders a select (Figma: Trailing icon = chevron-down) */
  options?: Option[];
  leadingIcon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Visually hide the label (it stays for screen readers) */
  hideLabel?: boolean;
  type?: 'text' | 'number' | 'search' | 'url';
  inputMode?: 'text' | 'decimal' | 'numeric';
  trailing?: ReactNode;
  id?: string;
  name?: string;
  className?: string;
  autoFocus?: boolean;
}

export const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement, InputProps>(
  function Input(
    {
      label, value, onChange, placeholder, helper, error, maxLength, multiline, options, leadingIcon,
      disabled, readOnly, required, hideLabel, type = 'text', inputMode, trailing, id, name, className, autoFocus,
    },
    ref,
  ) {
    const autoId = useId();
    const fieldId = id ?? `input-${autoId}`;
    const helperId = `${fieldId}-helper`;
    const counter = maxLength !== undefined ? `${value.length} / ${maxLength} characters` : undefined;
    const helperText = error ?? helper ?? counter;
    const shared = {
      id: fieldId,
      name,
      value,
      disabled,
      readOnly,
      required,
      autoFocus,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': helperText ? helperId : undefined,
      className: 'lms-input__control',
    } as const;

    return (
      <div
        className={cx(
          'lms-input',
          error && 'lms-input--error',
          disabled && 'lms-input--disabled',
          multiline && 'lms-input--multiline',
          className,
        )}
      >
        <label htmlFor={fieldId} className={cx('lms-input__label', hideLabel && 'visually-hidden')}>
          {label}
        </label>
        <div className="lms-input__field">
          {leadingIcon && <span className="lms-input__icon" aria-hidden>{leadingIcon}</span>}
          {options ? (
            <select {...shared} ref={ref} onChange={(e) => onChange(e.target.value)}>
              {placeholder && <option value="" disabled>{placeholder}</option>}
              {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : multiline ? (
            <textarea
              {...shared}
              ref={ref}
              placeholder={placeholder}
              maxLength={maxLength}
              rows={4}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              {...shared}
              ref={ref}
              type={type}
              inputMode={inputMode}
              placeholder={placeholder}
              maxLength={maxLength}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
          {options && <ChevronDown className="lms-input__icon lms-input__chevron" aria-hidden />}
          {trailing}
        </div>
        {helperText && (
          <p id={helperId} className="lms-input__helper" role={error ? 'alert' : undefined}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
