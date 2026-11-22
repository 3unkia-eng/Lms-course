import { BookOpen, Clock, MoreHorizontal, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../../../data/types';
import { formatMinutes, totalMinutes } from '../../../data/rules';
import { Badge } from '../../core';
import { CourseCover } from './CourseCover';
import './CourseCard.css';

/**
 * Course card (Composite · Figma 248:2024). The whole card is one link;
 * the title is the link text. No buttons inside (agent.md).
 */
export interface CourseCardProps {
  course: Course;
  to?: string;
  /** Second meta item: students (default) or total duration (preview) */
  meta?: 'students' | 'duration';
}

export function CourseCard({ course, to, meta = 'students' }: CourseCardProps) {
  const sessions = course.sessions.length;
  const title = course.title || 'Untitled course';
  const body = (
    <>
      <CourseCover course={course} />
      <div className="lms-course-card__body">
        <div className="lms-course-card__top">
          <Badge status={course.status}>{course.status === 'draft' ? 'Draft' : 'Published'}</Badge>
          <MoreHorizontal className="lms-course-card__more" aria-hidden />
        </div>
        <h3 className="lms-course-card__title clamp-2" title={title}>{title}</h3>
        <div className="lms-course-card__meta">
          <span className="lms-course-card__meta-item">
            <BookOpen aria-hidden /> {sessions} {sessions === 1 ? 'session' : 'sessions'}
          </span>
          {meta === 'students' ? (
            <span className="lms-course-card__meta-item">
              <Users aria-hidden /> {course.students.toLocaleString('en-US')} students
            </span>
          ) : (
            <span className="lms-course-card__meta-item">
              <Clock aria-hidden /> {formatMinutes(totalMinutes(course))}
            </span>
          )}
        </div>
      </div>
    </>
  );
  return to ? (
    <Link to={to} className="lms-course-card lms-course-card--link">{body}</Link>
  ) : (
    <article className="lms-course-card">{body}</article>
  );
}
