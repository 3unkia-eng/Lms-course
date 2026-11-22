export type CourseStatus = 'draft' | 'published';
export type SessionType = 'video' | 'article' | 'quiz' | 'live';
export type CoverIcon = 'layers' | 'lightbulb' | 'play' | 'type' | 'palette' | 'sparkles' | 'book';
export type WizardStep = 'basic' | 'details' | 'sessions' | 'preview';

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  /** minutes */
  duration: number;
  freePreview: boolean;
}

export interface Cover {
  fileName: string;
  /** Object URL for an uploaded image (prototype only, not persisted) */
  url?: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  language: string;
  tags: string;
  description: string;
  outcomes: string;
  requirements: string;
  cover: Cover | null;
  coverIcon: CoverIcon;
  isFree: boolean;
  price: string;
  sessions: Session[];
  status: CourseStatus;
  students: number;
  lastStep: WizardStep;
  updatedAt: number;
  publishedAt?: number;
}

export const CATEGORIES = ['Design', 'Development', 'Business', 'Marketing', 'Photography'];
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const LANGUAGES = ['English', 'Persian', 'German', 'French', 'Spanish'];
export const SESSION_TYPES: { value: SessionType; label: string }[] = [
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'live', label: 'Live session' },
];

export const STEPS: { key: WizardStep; title: string; description: string }[] = [
  { key: 'basic', title: 'Basic info', description: 'Title & category' },
  { key: 'details', title: 'Course details', description: 'Description & cover' },
  { key: 'sessions', title: 'Sessions', description: 'Add lessons' },
  { key: 'preview', title: 'Review & publish', description: 'Preview & go live' },
];
