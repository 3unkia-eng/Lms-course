import type { ComponentType, SVGProps } from 'react';
import { Lightbulb, Palette, Sparkles, Type } from 'lucide-react';
import { BookOpen, Layers, PlayCircle } from '../../icons';
import type { CoverIcon, Course } from '../../../data/types';
import { cx } from '../../../lib/cx';
import { slugify } from '../../../data/rules';
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

/** The cover the course really has: its upload, else the Figma cover for a sample course (by id or title). */
export function coverImage(course: Course): string | undefined {
  return course.cover?.url ?? FIGMA_COVERS[course.id] ?? (course.title ? FIGMA_COVERS[slugify(course.title)] : undefined);
}

/** What a card shows: the course's cover, else the default 3D illustration (same style as the Figma covers). */
export function displayCover(course: Course): string | undefined {
  return coverImage(course) ?? FIGMA_COVERS.default;
}

/** Courses list (Figma Step 02): only the upload or the course's own Figma image, never a generated cover. */
export function listCover(course: Course): string | undefined {
  return course.cover?.url ?? FIGMA_COVERS[course.id];
}

/**
 * Course cover (Figma Course card › Cover). In the create-course flow (cover step, preview, published)
 * the upload wins, then the Figma or 3D cover for the course, then the default 3D cover.
 * On the Courses list (`list`) only the upload or the Figma image is shown, otherwise the icon.
 */
export function CourseCover({ course, size = 'card', list = false, className }: { course: Course; size?: 'card' | 'preview'; list?: boolean; className?: string }) {
  const src = list ? listCover(course) : displayCover(course);
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
