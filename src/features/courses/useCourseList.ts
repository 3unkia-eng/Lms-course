import { useCallback, useEffect, useState } from 'react';
import { usePrototype } from '../../data/prototype';

/**
 * Simulates fetching the courses list so Loading and Load error states can
 * be tested (UX doc: skeletons, never blank; error with Retry).
 * `listState=error`: first load fails, Retry succeeds.
 */
export function useCourseList() {
  const { settings } = usePrototype();
  const [state, setState] = useState<'loading' | 'error' | 'ready'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (settings.listState === 'loading') {
      setState('loading');
      return;
    }
    setState('loading');
    const t = window.setTimeout(() => {
      setState(settings.listState === 'error' && attempt === 0 ? 'error' : 'ready');
    }, settings.latency);
    return () => window.clearTimeout(t);
  }, [settings.listState, settings.latency, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { state, retry };
}
