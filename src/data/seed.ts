import type { Course, CoverIcon, Session } from './types';

let counter = 0;
export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`;

/** `count` lessons whose durations add up to exactly `total` minutes (Figma card shows the total). */
function lessons(count: number, total: number): Session[] {
  const base = Math.floor(total / count);
  const extra = total - base * count;
  return Array.from({ length: count }, (_, i) => ({
    id: uid('s'),
    title: `Lesson ${i + 1}`,
    type: 'video' as const,
    duration: base + (i < extra ? 1 : 0),
    freePreview: i === 0,
  }));
}

function course(
  id: string,
  title: string,
  status: Course['status'],
  category: string,
  count: number,
  minutes: number,
  students: number,
  coverIcon: CoverIcon,
  daysAgo: number,
): Course {
  return {
    id,
    title,
    subtitle: '',
    category,
    level: 'Beginner',
    language: 'English',
    tags: '',
    description: `${title} teaches practical, hands-on skills with real product examples. Each lesson ends with a short exercise so you can apply it right away.`,
    outcomes: '',
    requirements: '',
    cover: { fileName: 'cover.png' },
    coverIcon,
    isFree: true,
    price: '',
    sessions: lessons(count, minutes),
    status,
    students,
    lastStep: status === 'draft' ? (count ? 'sessions' : 'basic') : 'preview',
    updatedAt: Date.now() - daysAgo * 86_400_000,
  };
}

/** Sample data from the Figma "Courses" screen (250:2276), in its grid order (newest first). */
export const seedCourses = (): Course[] => [
  course('advanced-figma-prototyping', 'Advanced Figma Prototyping', 'published', 'Design', 12, 550, 342, 'play', 1),
  course('design-systems-101', 'Design Systems 101', 'published', 'Design', 10, 465, 518, 'layers', 2),
  course('ux-research-basics', 'UX Research Basics', 'draft', 'Research', 6, 260, 0, 'lightbulb', 3),
  course('typography-for-screens', 'Typography for Screens', 'published', 'Design', 8, 305, 211, 'type', 5),
  course('motion-design-essentials', 'Motion Design Essentials', 'draft', 'Animation', 0, 0, 0, 'sparkles', 8),
  course('color-theory-in-ui', 'Color Theory in UI', 'archived', 'Design', 7, 290, 177, 'palette', 12),
];

export function blankCourse(): Course {
  return {
    id: uid('course'),
    title: '',
    subtitle: '',
    category: '',
    level: '',
    language: 'English',
    tags: '',
    description: '',
    outcomes: '',
    requirements: '',
    cover: null,
    coverIcon: 'layers',
    isFree: true,
    price: '',
    sessions: [],
    status: 'draft',
    students: 0,
    lastStep: 'basic',
    updatedAt: Date.now(),
  };
}

/** "Introduction to UI Design" sample from the Figma flow, for quick demos. */
export function sampleCourse(): Partial<Course> {
  return {
    title: 'Introduction to UI Design',
    category: 'Design',
    level: 'Beginner',
    language: 'English',
    tags: 'UI, Figma, Visual design',
    description:
      'Learn the foundations of user interface design: layout, typography, color and components. By the end you will design a complete mobile screen in Figma.',
    outcomes: 'Build clean layouts with grids and spacing',
    requirements: 'No prior design experience needed',
    cover: { fileName: 'ui-design-cover.png' },
    sessions: [
      { id: uid('s'), title: 'What is UI design?', type: 'video', duration: 10, freePreview: true },
      { id: uid('s'), title: 'Layout, grids & spacing', type: 'video', duration: 14, freePreview: true },
      { id: uid('s'), title: 'Typography basics', type: 'video', duration: 13, freePreview: false },
      { id: uid('s'), title: 'Color in interfaces', type: 'video', duration: 15, freePreview: false },
    ],
  };
}
