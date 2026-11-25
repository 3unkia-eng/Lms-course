import type { Course, CourseStatus } from './types';

/** Business rules from the UX strategy doc (section 10, acceptance criteria). */
export const TITLE_MIN = 5;
export const TITLE_MAX = 80;
export const SUBTITLE_MAX = 120;
export const DESCRIPTION_MIN = 100;
export const DESCRIPTION_MAX = 500;
export const MIN_SESSIONS = 3;
export const COVER_MAX_MB = 5;
export const COVER_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export type BasicErrors = Partial<Record<'title' | 'category' | 'level', string>>;

export function validateBasic(c: Course): BasicErrors {
  const errors: BasicErrors = {};
  const len = c.title.trim().length;
  if (len < TITLE_MIN || len > TITLE_MAX) errors.title = `Course title must be ${TITLE_MIN}–${TITLE_MAX} characters`;
  if (!c.category) errors.category = 'Choose a category to continue';
  if (!c.level) errors.level = 'Choose a level to continue';
  return errors;
}

export function validateDetails(c: Course): Partial<Record<'price', string>> {
  if (!c.isFree && !(Number(c.price) > 0)) return { price: 'Enter a price or switch to Free' };
  return {};
}

export function totalMinutes(c: Course) {
  return c.sessions.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
}

export interface CheckItem {
  key: string;
  label: string;
  ok: boolean;
  fix: string;
  step: 'basic' | 'details' | 'sessions';
}

/** Publish checklist (F4): live state of the draft; each unmet item links to its step. */
export function publishChecklist(c: Course): CheckItem[] {
  const missing = Math.max(0, MIN_SESSIONS - c.sessions.length);
  return [
    {
      key: 'basic',
      label: 'Title, category and level',
      ok: Object.keys(validateBasic(c)).length === 0,
      fix: 'Complete the basic info',
      step: 'basic',
    },
    {
      key: 'details',
      label: 'Description and cover image',
      ok: c.description.trim().length >= DESCRIPTION_MIN && !!c.cover,
      fix: !c.cover ? 'Add a cover image' : `Write a description of at least ${DESCRIPTION_MIN} characters`,
      step: 'details',
    },
    {
      key: 'sessions',
      label: `At least ${MIN_SESSIONS} sessions`,
      ok: missing === 0,
      fix: `Add ${missing} more session${missing === 1 ? '' : 's'} to publish`,
      step: 'sessions',
    },
    {
      key: 'pricing',
      label: c.isFree ? 'Pricing set (Free)' : `Pricing set (${formatPrice(c)})`,
      ok: Object.keys(validateDetails(c)).length === 0,
      fix: 'Enter a price or switch to Free',
      step: 'details',
    },
  ];
}

export function slugify(s: string) {
  const slug = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+)|(-+$)/g, '');
  return slug || 'untitled-course';
}

export function formatPrice(c: Course) {
  return c.isFree ? 'Free' : `$${Number(c.price || 0).toFixed(2)}`;
}

/** Course card duration, Figma format: "9h 10m", "5h 05m", "45m". */
export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m}m`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

export const STATUS_LABEL: Record<CourseStatus, string> = { draft: 'Draft', published: 'Published', archived: 'Archived' };

export function formatMinutes(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
