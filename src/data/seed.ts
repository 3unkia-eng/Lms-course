import type { Course, CoverIcon, Session } from './types';

let counter = 0;
export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`;

function lessons(count: number): Session[] {
  return Array.from({ length: count }, (_, i) => ({
    id: uid('s'),
    title: `Lesson ${i + 1}`,
    type: 'video' as const,
    duration: 10 + ((i * 3) % 7),
    freePreview: i === 0,
  }));
}

function course(
  id: string,
  title: string,
  status: Course['status'],
  count: number,
  students: number,
  coverIcon: CoverIcon,
  daysAgo: number,
): Course {
  return {
    id,
    title,
    subtitle: '',
    category: 'Design',
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
    sessions: lessons(count),
    status,
    students,
    lastStep: status === 'draft' ? 'sessions' : 'preview',
    updatedAt: Date.now() - daysAgo * 86_400_000,
  };
}

/** Sample data from the Figma screens (01 Dashboard, 02 Courses). */
export const seedCourses = (): Course[] => [
  course('design-systems-101', 'Design Systems 101', 'published', 12, 486, 'layers', 1),
  course('ux-research-basics', 'UX Research Basics', 'published', 9, 372, 'lightbulb', 3),
  course('advanced-figma-prototyping', 'Advanced Figma Prototyping', 'draft', 6, 0, 'play', 2),
  course('typography-for-screens', 'Typography for Screens', 'published', 8, 214, 'type', 9),
  course('color-theory-in-ui', 'Color Theory in UI', 'published', 7, 176, 'palette', 12),
  course('motion-design-essentials', 'Motion Design Essentials', 'draft', 2, 0, 'sparkles', 15),
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
