import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { Toast, type ToastProps } from '../components/core/Toast/Toast';
import './toast.css';

type ToastInput = Omit<ToastProps, 'onClose'> & { duration?: number };
interface ToastValue { show: (t: ToastInput) => void; dismiss: () => void }

const ToastContext = createContext<ToastValue | null>(null);

/** One toast at a time, bottom right (Figma: Edge · Preview · Publish failed). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastInput | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);
  const show = useCallback((t: ToastInput) => {
    window.clearTimeout(timer.current);
    setToast(t);
    // Error toasts with an action stay until dismissed.
    if (!(t.tone === 'error' && t.onAction)) timer.current = window.setTimeout(() => setToast(null), t.duration ?? 4000);
  }, []);
  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite">
        {toast && (
          <Toast
            {...toast}
            onAction={toast.onAction ? () => { dismiss(); toast.onAction?.(); } : undefined}
            onClose={dismiss}
          />
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
