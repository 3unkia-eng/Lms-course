import type { ReactNode } from 'react';
import { Banknote, BookOpen, GraduationCap, PlayCircle, Plus, Users } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { ActionBar, ActivityTable, AppShell } from '../components/composite';
import type { ActivityRow } from '../components/composite/ActivityTable/ActivityTable';
import { Button, Card, EmptyState } from '../components/core';
import { useStore } from '../data/store';
import type { Course } from '../data/types';
import { CourseCompletion } from '../features/dashboard/CourseCompletion';
import { EnrollmentChart } from '../features/dashboard/EnrollmentChart';
import { LearnerActivity } from '../features/dashboard/LearnerActivity';
import './pages.css';

/**
 * 01 · Dashboard (Figma 250:1946) + State · Dashboard · New instructor.
 * Layout and sizes follow the Figma frame exactly (1440 × 1024: nothing scrolls). On shorter
 * desktop screens every element stays and the charts scale down within their Figma maximums
 * so the whole dashboard still fits the first view. Courses live only on the Courses page.
 */
export function courseLink(c: Course) {
  return c.status === 'draft' ? `/courses/${c.id}/${c.lastStep}` : `/courses/${c.id}`;
}

export function useStartCourse() {
  const { createCourse } = useStore();
  const navigate = useNavigate();
  return () => {
    const c = createCourse();
    navigate(`/courses/${c.id}/basic`);
  };
}

/** Stat card (Figma Stat Card 144:147): Label + Icon box on top, Value 30/40 bold, Trend (+n success, "this month" tertiary). */
function Stat({ title, value, icon, trend, caption }: { title: string; value: string; icon: ReactNode; trend?: string; caption: string }) {
  return (
    <section className="stat" aria-label={title}>
      <div className="stat__top">
        <h3 className="stat__label">{title}</h3>
        <span className="stat__icon" aria-hidden>{icon}</span>
      </div>
      <span className="stat__value">{value}</span>
      <span className="stat__trend">
        {trend && <strong className="stat__trend-value">{trend}</strong>}
        <span className="stat__trend-caption">{caption}</span>
      </span>
    </section>
  );
}

// Figma Recent activity rows (Activity table 659:6120), names as written in the design.
const ACTIVITY: ActivityRow[] = [
  { learner: 'kimiya kalhor', course: 'Design Systems 101', progress: 100, lastActive: 'Nov 23', status: 'completed' },
  { learner: 'sheida bakhshi', course: 'UX Research Basics', progress: 64, lastActive: 'Nov 23', status: 'in-progress' },
  { learner: 'neda maleki', course: 'Design Systems 101', progress: 0, lastActive: 'Nov 22', status: 'enrolled' },
  { learner: 'ali parsa', course: 'UX Research Basics', progress: 88, lastActive: 'Nov 22', status: 'in-progress' },
];

export default function Dashboard() {
  const { courses } = useStore();
  const start = useStartCourse();
  const students = courses.reduce((s, c) => s + c.students, 0);
  const sessions = courses.reduce((s, c) => s + c.sessions.length, 0);
  const isNew = courses.length === 0;

  const createButton = (full = false) => (
    <Button leadingIcon={<Plus />} onClick={start} fullWidth={full}>Create course</Button>
  );

  return (
    <AppShell
      title="Dashboard"
      subtitle={isNew ? 'Welcome, Sanaz. Let’s set up your first course.' : 'Welcome back, Sanaz. Here’s how your courses are doing.'}
      mobileTitle="Dashboard"
    >
      <section className="stats-grid" aria-label="Overview">
        {/* Stats with no data show "—" and a caption, never "0 $" alone (UX doc §9) */}
        <Stat title="Total courses" icon={<BookOpen />} value={isNew ? '—' : String(courses.length)} trend={isNew ? undefined : '+2'} caption={isNew ? 'No courses yet' : 'this month'} />
        <Stat title="Active students" icon={<Users />} value={isNew ? '—' : students.toLocaleString('en-US')} trend={isNew ? undefined : '+86'} caption={isNew ? 'No data yet' : 'this month'} />
        <Stat title="Total sessions" icon={<PlayCircle />} value={isNew ? '—' : String(sessions)} trend={isNew ? undefined : '+14'} caption={isNew ? 'No sessions yet' : 'this month'} />
        <Stat title="Earnings" icon={<Banknote />} value={isNew ? '—' : '$8,420'} trend={isNew ? undefined : '+12%'} caption={isNew ? 'No earnings yet' : 'this month'} />
      </section>

      {isNew ? (
        <Card className="dashboard-empty">
          <EmptyState
            icon={<GraduationCap />}
            title="Create your first course"
            description="Turn what you know into a course. It takes about 30 minutes to publish your first one."
            action={createButton()}
          />
        </Card>
      ) : (
        <div className="dashboard-grid">
          {/* Figma: Insights row (Enrollment fills, Course completion 360) and Activity row (Learner activity 360, table fills) */}
          <div className="dashboard-row dashboard-row--insights">
            <EnrollmentChart />
            <CourseCompletion />
          </div>
          <div className="dashboard-row dashboard-row--activity">
            <LearnerActivity />
            <ActivityTable rows={ACTIVITY} />
          </div>
        </div>
      )}

      <ActionBar className="only-mobile" end={createButton(true)} />
    </AppShell>
  );
}
