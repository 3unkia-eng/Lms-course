import type { ComponentType, SVGProps } from 'react';
import { Lightbulb, Palette, Sparkles, Type } from 'lucide-react';
import { BookOpen, Layers, PlayCircle } from '../../icons';
import type { CoverIcon, Course } from '../../../data/types';
import { cx } from '../../../lib/cx';
import './CourseCard.css';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<CoverIcon, IconComponent> = {
  layers: Layers,
  lightbulb: Lightbulb as IconComponent,
  play: PlayCircle,
  type: Type as IconComponent,
  palette: Palette as IconComponent,
  sparkles: Sparkles as IconComponent,
  book: BookOpen,
};

/** Cover images from the Figma "Courses" screen (Course card › Cover image fill), keyed by course id. */
const FIGMA_COVERS: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob('../../../assets/course-covers/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>)
    .map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]),
);

export function coverImage(course: Course): string | undefined {
  return course.cover?.url ?? FIGMA_COVERS[course.id];
}

/**
 * Course cover (Figma Course card › Cover): the uploaded image wins, then the Figma
 * cover image for the sample courses, otherwise the placeholder with the Cover icon.
 */
export function CourseCover({ course, size = 'card', className }: { course: Course; size?: 'card' | 'preview'; className?: string }) {
  const src = coverImage(course);
  const Icon = ICONS[course.coverIcon] ?? Layers;
  return (
    <div className={cx('lms-course-cover', `lms-course-cover--${size}`, className)}>
      {src ? (
        <img src={src} alt="" className="lms-course-cover__image" />
      ) : (
        <Icon className="lms-course-cover__icon" aria-hidden />
      )}
    </div>
  );
}
