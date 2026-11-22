import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, CloudOff, Loader2 } from 'lucide-react';
import type { Course, WizardStep } from '../../data/types';
import { STEPS } from '../../data/types';
import { useStore } from '../../data/store';
import { usePrototype } from '../../data/prototype';
import './wizard.css';

export type SaveState = 'idle' | 'saving' | 'saved' | 'local';

/**
 * Shared wizard logic for steps 1–4: loads the draft from the URL, writes
 * changes to the store, shows the autosave indicator (UX doc F6) and
 * moves between steps.
 */
export function useWizard(step: WizardStep) {
  const { id } = useParams();
  const { getCourse, updateCourse } = useStore();
  const { settings } = usePrototype();
  const navigate = useNavigate();
  const course = getCourse(id);
  const [save, setSave] = useState<SaveState>('idle');
  const timer = useRef<number | undefined>(undefined);
  const index = STEPS.findIndex((s) => s.key === step);

  useEffect(() => {
    if (course && course.status === 'draft' && STEPS.findIndex((s) => s.key === course.lastStep) < index) {
      updateCourse(course.id, { lastStep: step });
    }
  // Only when a different course opens.
  }, [course?.id]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = useCallback(
    (patch: Partial<Course>) => {
      if (!course) return;
      updateCourse(course.id, patch);
      if (settings.offline) {
        setSave('local');
        return;
      }
      setSave('saving');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setSave('saved'), Math.min(settings.latency, 1200) + 300);
    },
    [course, updateCourse, settings.offline, settings.latency],
  );

  const goTo = useCallback(
    (target: WizardStep) => {
      if (!course) return;
      const ti = STEPS.findIndex((s) => s.key === target);
      const li = STEPS.findIndex((s) => s.key === course.lastStep);
      if (ti > li) updateCourse(course.id, { lastStep: target });
      navigate(`/courses/${course.id}/${target}`);
      window.scrollTo({ top: 0 });
    },
    [course, navigate, updateCourse],
  );

  return { course, update, save, setSave, goTo, stepIndex: index, settings };
}

export function SaveIndicator({ state }: { state: SaveState }) {
  if (state === 'idle') return null;
  const content = {
    saving: { icon: <Loader2 className="save-indicator__spin" />, text: 'Saving…' },
    saved: { icon: <CheckCircle2 />, text: 'All changes saved' },
    local: { icon: <CloudOff />, text: 'Saved on this device' },
  }[state];
  return (
    <span className="save-indicator" role="status" aria-live="polite">
      <span aria-hidden>{content.icon}</span>
      {content.text}
    </span>
  );
}

export function stepSubtitle(step: WizardStep) {
  const i = STEPS.findIndex((s) => s.key === step);
  return `Step ${i + 1} of ${STEPS.length} · ${STEPS[i].title}`;
}
