import { BookOpen, Layers, Lightbulb, Palette, PlayCircle, Sparkles, Type } from 'lucide-react';
import type { CoverIcon, Course } from '../../../data/types';
import { cx } from '../../../lib/cx';
import './CourseCard.css';

const ICONS: Record<CoverIcon, typeof Layers> = {
  layers: Layers,
  lightbulb: Lightbulb,
  play: PlayCircle,
  type: Type,
  palette: Palette,
  sparkles: Sparkles,
  book: BookOpen,
};

/**
 * Course cover: uploaded image when there is one, otherwise the Figma
 * placeholder (Course card/cover tokens + Cover icon instance swap).
 */
export function CourseCover({ course, size = 'card', className }: { course: Course; size?: 'card' | 'preview'; className?: string }) {
  const Icon = ICONS[course.coverIcon] ?? Layers;
  return (
    <div className={cx('lms-course-cover', `lms-course-cover--${size}`, className)}>
      {course.cover?.url ? (
        <img src={course.cover.url} alt="" className="lms-course-cover__image" />
      ) : (
        <Icon className="lms-course-cover__icon" aria-hidden />
      )}
    </div>
  );
}
