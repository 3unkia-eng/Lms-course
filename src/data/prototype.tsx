import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Prototype controls: design-system modes and simulated conditions for
 * usability tests (UX doc sections 7 and 9). A moderator can set them from
 * the Prototype panel or with URL params, e.g. `?theme=dark&scenario=offline`.
 */
export type ListState = 'ready' | 'loading' | 'error';

export interface PrototypeSettings {
  theme: 'light' | 'dark';
  brand: 'default' | 'red-brand';
  radius: 'default' | 'none-radius';
  font: 'default' | 'new-font';
  /** Courses list response */
  listState: ListState;
  /** Simulated network latency for lists and saves (ms) */
  latency: number;
  offline: boolean;
  sessionExpired: boolean;
  publishFails: boolean;
  uploadFails: boolean;
}

const DEFAULTS: PrototypeSettings = {
  theme: 'light',
  brand: 'default',
  radius: 'default',
  font: 'default',
  listState: 'ready',
  latency: 700,
  offline: false,
  sessionExpired: false,
  publishFails: false,
  uploadFails: false,
};

const STORAGE_KEY = 'lms-prototype:settings:v1';

/** Named scenarios for test scripts. */
export const SCENARIOS: Record<string, Partial<PrototypeSettings>> = {
  default: {},
  loading: { listState: 'loading' },
  'load-error': { listState: 'error' },
  offline: { offline: true },
  'session-expired': { sessionExpired: true },
  'publish-fails': { publishFails: true },
  'upload-fails': { uploadFails: true },
};

function initial(): PrototypeSettings {
  let saved: Partial<PrototypeSettings> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    /* ignore */
  }
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const base: PrototypeSettings = { ...DEFAULTS, theme: prefersDark ? 'dark' : 'light', ...saved };
  // URL params win (HashRouter: read from both search and hash).
  const params = new URLSearchParams(window.location.search || window.location.hash.split('?')[1] || '');
  const scenario = params.get('scenario');
  if (scenario && SCENARIOS[scenario]) Object.assign(base, SCENARIOS[scenario]);
  const theme = params.get('theme');
  if (theme === 'dark' || theme === 'light') base.theme = theme;
  return base;
}

interface PrototypeValue {
  settings: PrototypeSettings;
  set: (patch: Partial<PrototypeSettings>) => void;
  resetSettings: () => void;
}

const PrototypeContext = createContext<PrototypeValue | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PrototypeSettings>(initial);

  // Design-system modes are attributes on <html> (tokens.css, agent.md 3).
  useEffect(() => {
    const root = document.documentElement;
    const attr = (name: string, value: string, off: string) =>
      value === off ? root.removeAttribute(name) : root.setAttribute(name, value);
    attr('data-theme', settings.theme, 'light');
    attr('data-brand', settings.brand, 'default');
    attr('data-radius', settings.radius, 'default');
    attr('data-font', settings.font, 'default');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const set = useCallback((patch: Partial<PrototypeSettings>) => setSettings((s) => ({ ...s, ...patch })), []);
  const resetSettings = useCallback(() => setSettings((s) => ({ ...DEFAULTS, theme: s.theme })), []);
  const value = useMemo(() => ({ settings, set, resetSettings }), [settings, set, resetSettings]);
  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) throw new Error('usePrototype must be used inside <PrototypeProvider>');
  return ctx;
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
