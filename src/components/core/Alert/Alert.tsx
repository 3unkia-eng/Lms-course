import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { cx } from '../../../lib/cx';
import './Alert.css';

/** Alert (Core · Figma 263:2027). Inline banner. Tone: info/success/warning/error. */
export type Tone = 'info' | 'success' | 'warning' | 'error';
export const toneIcon: Record<Tone, ReactNode> = {
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <TriangleAlert />,
  error: <AlertCircle />,
};

export interface AlertProps {
  tone?: Tone;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({ tone = 'info', title, description, action, onClose, className }: AlertProps) {
  return (
    <div className={cx('lms-alert', `lms-alert--${tone}`, className)} role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}>
      <span className="lms-alert__icon" aria-hidden>{toneIcon[tone]}</span>
      <div className="lms-alert__text">
        <p className="lms-alert__title">{title}</p>
        {description && <p className="lms-alert__description">{description}</p>}
      </div>
      {action}
      {onClose && (
        <button type="button" className="lms-alert__close" aria-label="Dismiss" onClick={onClose}>
          <X aria-hidden />
        </button>
      )}
    </div>
  );
}
