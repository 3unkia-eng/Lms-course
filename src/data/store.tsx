import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { Course, Session } from './types';
import { blankCourse, seedCourses, uid } from './seed';

/**
 * Course store. In-memory + localStorage so a test participant can reload
 * and keep their draft (UX doc F6). Prototype only: no backend.
 */
const STORAGE_KEY = 'lms-prototype:courses:v2';
/** Before 2026-11-25 (PR #9). Courses the participant created there are carried over once. */
const LEGACY_KEY = 'lms-prototype:courses:v1';

type Action =
  | { type: 'set'; courses: Course[] }
  | { type: 'add'; course: Course }
  | { type: 'update'; id: string; patch: Partial<Course> }
  | { type: 'remove'; id: string };

function reducer(state: Course[], action: Action): Course[] {
  switch (action.type) {
    case 'set':
      return action.courses;
    case 'add':
      return [action.course, ...state];
    case 'update':
      return state.map((c) => (c.id === action.id ? { ...c, ...action.patch, updatedAt: Date.now() } : c));
    case 'remove':
      return state.filter((c) => c.id !== action.id);
  }
}

function load(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Course[];
    const seed = seedCourses();
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const seedIds = new Set(seed.map((c) => c.id));
      const own = (JSON.parse(legacy) as Course[]).filter((c) => !seedIds.has(c.id));
      return [...own, ...seed];
    }
    return seed;
  } catch {
    /* storage blocked: fall back to seed */
  }
  return seedCourses();
}

interface StoreValue {
  courses: Course[];
  getCourse: (id: string | undefined) => Course | undefined;
  createCourse: () => Course;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  removeCourse: (id: string) => void;
  addSession: (id: string, s: Omit<Session, 'id'>) => void;
  updateSession: (id: string, sessionId: string, patch: Partial<Session>) => void;
  removeSession: (id: string, sessionId: string) => void;
  moveSession: (id: string, sessionId: string, dir: -1 | 1) => void;
  reset: (empty?: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [courses, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      // Object URLs (blob:) die on reload; keep the file name. Data URLs (uploaded covers) are kept.
      const clean = courses.map((c) => (c.cover?.url?.startsWith('blob:') ? { ...c, cover: { fileName: c.cover.fileName } } : c));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      /* ignore */
    }
  }, [courses]);

  const getCourse = useCallback((id: string | undefined) => courses.find((c) => c.id === id), [courses]);

  const createCourse = useCallback(() => {
    const c = blankCourse();
    dispatch({ type: 'add', course: c });
    return c;
  }, []);

  const updateCourse = useCallback((id: string, patch: Partial<Course>) => dispatch({ type: 'update', id, patch }), []);
  const removeCourse = useCallback((id: string) => dispatch({ type: 'remove', id }), []);

  const withSessions = useCallback(
    (id: string, fn: (s: Session[]) => Session[]) => {
      const c = courses.find((x) => x.id === id);
      if (c) dispatch({ type: 'update', id, patch: { sessions: fn(c.sessions) } });
    },
    [courses],
  );

  const value = useMemo<StoreValue>(
    () => ({
      courses,
      getCourse,
      createCourse,
      updateCourse,
      removeCourse,
      addSession: (id, s) => withSessions(id, (list) => [...list, { ...s, id: uid('s') }]),
      updateSession: (id, sid, patch) => withSessions(id, (list) => list.map((s) => (s.id === sid ? { ...s, ...patch } : s))),
      removeSession: (id, sid) => withSessions(id, (list) => list.filter((s) => s.id !== sid)),
      moveSession: (id, sid, dir) =>
        withSessions(id, (list) => {
          const i = list.findIndex((s) => s.id === sid);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= list.length) return list;
          const next = [...list];
          [next[i], next[j]] = [next[j], next[i]];
          return next;
        }),
      reset: (empty) => dispatch({ type: 'set', courses: empty ? [] : seedCourses() }),
    }),
    [courses, getCourse, createCourse, updateCourse, removeCourse, withSessions],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
