import { useEffect, useRef, type ReactNode } from 'react';
import './Dialog.css';

/**
 * Dialog (structural · proposal). Not a Figma component yet: the Session
 * expired screen composes it by hand. Uses the native <dialog> element,
 * which traps focus and closes on Esc (when `dismissible`).
 * Slot: `children` (body) and `actions`.
 */
export interface DialogProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

export function Dialog({ open, title, children, actions, onClose, dismissible = true }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="lms-dialog"
      aria-labelledby="lms-dialog-title"
      onCancel={(e) => { if (!dismissible) e.preventDefault(); else onClose?.(); }}
    >
      <div className="lms-dialog__body">
        <h2 id="lms-dialog-title" className="lms-dialog__title">{title}</h2>
        {children && <div className="lms-dialog__content">{children}</div>}
      </div>
      {actions && <div className="lms-dialog__actions">{actions}</div>}
    </dialog>
  );
}
