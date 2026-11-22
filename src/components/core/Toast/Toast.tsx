import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../../../lib/cx';
import { toneIcon } from '../Alert/Alert';
import './Toast.css';

/** Toast (Core · Figma 263:2057). Tone: success / error / info. Message, Action, Close. */
export interface ToastProps {
  tone?: 'success' | 'error' | 'info';
  message: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export function Toast({ tone = 'info', message, actionLabel, onAction, onClose }: ToastProps) {
  return (
    <div className={cx('lms-toast', `lms-toast--${tone}`)} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="lms-toast__icon" aria-hidden>{toneIcon[tone]}</span>
      <p className="lms-toast__message">{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="lms-toast__action" onClick={onAction}>{actionLabel}</button>
      )}
      {onClose && (
        <button type="button" className="lms-toast__close" aria-label="Dismiss notification" onClick={onClose}>
          <X aria-hidden />
        </button>
      )}
    </div>
  );
}
