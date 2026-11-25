import { GraduationCap, Plus } from 'lucide-react';
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
 * Everything fits in the first view on desktop (1280 × 800 and up): stats, then a
 * 3-column grid that fills the rest of the viewport. Courses live only on the Courses page.
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

function Stat({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <Card title={title} className="stat" headingLevel={3}>
      <span className="stat__value">{value}</span>
      <span className="stat__caption">{caption}</span>
    </Card>
  );
}

const ACTIVITY: ActivityRow[] = [
  { learner: 'Sara Ahmadi', course: 'Design Systems 101', progress: 100, lastActive: 'Nov 23', status: 'completed' },
  { learner: 'Omid Rezaei', course: 'UX Research Basics', progress: 64, lastActive: 'Nov 23', status: 'in-progress' },
  { learner: 'Lena Park', course: 'Design Systems 101', progress: 0, lastActive: 'Nov 22', status: 'enrolled' },
  { learner: 'Arash Karimi', course: 'UX Research Basics', progress: 88, lastActive: 'Nov 22', status: 'in-progress' },
  { learner: 'Mina Tehrani', course: 'Design Systems 101', progress: 42, lastActive: 'Nov 21', status: 'in-progress' },
  { learner: 'Daniel Cho', course: 'UX Research Basics', progress: 100, lastActive: 'Nov 20', status: 'completed' },
];

export default function Dashboard() {
  const { courses } = useStore();
  const start = useStartCourse();
  const published = courses.filter((c) => c.status === 'published').length;
  const drafts = courses.length - published;
  const students = courses.reduce((s, c) => s + c.students, 0);
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
        <Stat title="Active courses" value={isNew ? '—' : String(courses.length)} caption={isNew ? 'No courses yet' : `${published} published · ${drafts} drafts`} />
        <Stat title="Total students" value={isNew ? '—' : students.toLocaleString('en-US')} caption={isNew ? 'No data yet' : '+86 this month'} />
        <Stat title="Average rating" value={isNew ? '—' : '4.8'} caption={isNew ? 'No reviews yet' : 'from 312 reviews'} />
        <Stat title="Earnings" value={isNew ? '—' : '$8,420'} caption={isNew ? 'No earnings yet' : '+12% vs last month'} />
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
          <EnrollmentChart />
          <CourseCompletion />
          <LearnerActivity />
          <ActivityTable fitHeight rows={ACTIVITY} />
        </div>
      )}

      <ActionBar className="only-mobile" end={createButton(true)} />
    </AppShell>
  );
}
