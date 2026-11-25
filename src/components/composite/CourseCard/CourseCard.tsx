import { Clock, MoreHorizontal, PlayCircle, Users } from '../../icons';
import { Link } from 'react-router-dom';
import type { Course } from '../../../data/types';
import { STATUS_LABEL, formatDuration, totalMinutes } from '../../../data/rules';
import { Badge } from '../../core';
import { CourseCover } from './CourseCover';
import './CourseCard.css';

/**
 * Course card (Composite · Figma 144:160): Cover slot (status badge + icon),
 * Category, Title, Meta (sessions, duration), Footer (students + action). The whole card is one link;
 * the title is the link text. No buttons inside (agent.md).
 */
export interface CourseCardProps {
  course: Course;
  to?: string;
  /** 'students' shows the Footer row; 'duration' (preview) hides it */
  meta?: 'students' | 'duration';
  /** On the Courses list: only Figma or uploaded images, no generated covers */
  list?: boolean;
}

export function CourseCard({ course, to, meta = 'students', list = false }: CourseCardProps) {
  const sessions = course.sessions.length;
  const title = course.title || 'Untitled course';
  const body = (
    <>
      <div className="lms-course-card__cover">
        <CourseCover course={course} list={list} />
        <Badge status={course.status} dot className="lms-course-card__badge">{STATUS_LABEL[course.status]}</Badge>
      </div>
      <div className="lms-course-card__body">
        {course.category && <span className="lms-course-card__category">{course.category}</span>}
        <h3 className="lms-course-card__title clamp-2" title={title}>{title}</h3>
        <div className="lms-course-card__meta">
          <span className="lms-course-card__meta-item">
            <PlayCircle aria-hidden /> {sessions} {sessions === 1 ? 'session' : 'sessions'}
          </span>
          <span className="lms-course-card__meta-item">
            <Clock aria-hidden /> {sessions ? formatDuration(totalMinutes(course)) : '—'}
          </span>
        </div>
      </div>
      {meta === 'students' && (
        <div className="lms-course-card__footer">
          <span className="lms-course-card__meta-item">
            <Users aria-hidden /> {course.students.toLocaleString('en-US')} students
          </span>
          {/* Figma Footer › Action: Icon button with the meatball icon. Decorative here:
              the whole card is one link, so no nested button (agent.md). */}
          <span className="lms-course-card__action" aria-hidden><MoreHorizontal /></span>
        </div>
      )}
    </>
  );
  return to ? (
    <Link to={to} className="lms-course-card lms-course-card--link">{body}</Link>
  ) : (
    <article className="lms-course-card">{body}</article>
  );
}
