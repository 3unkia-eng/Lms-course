import { FilePlus2, Plus, SearchX, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ActionBar, AppShell, CourseCard } from '../components/composite';
import { Button, Card, EmptyState, Tabs } from '../components/core';
import { useStore } from '../data/store';
import { CourseGridError, CourseGridSkeleton } from '../features/courses/CourseGridStates';
import { useCourseList } from '../features/courses/useCourseList';
import { courseLink, useStartCourse } from './Dashboard';
import './pages.css';

type Tab = 'all' | 'published' | 'draft';

/** 02 · Courses (Figma 250:2185) + Loading / Empty drafts / Load error states */
export default function Courses() {
  const { courses } = useStore();
  const { state, retry } = useCourseList();
  const start = useStartCourse();
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab) || 'all';
  const q = (params.get('q') ?? '').trim().toLowerCase();

  const counts = {
    all: courses.length,
    published: courses.filter((c) => c.status === 'published').length,
    draft: courses.filter((c) => c.status === 'draft').length,
  };
  const list = courses
    .filter((c) => tab === 'all' || c.status === tab)
    .filter((c) => !q || c.title.toLowerCase().includes(q))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const setTab = (t: Tab) => {
    const next = new URLSearchParams(params);
    if (t === 'all') next.delete('tab');
    else next.set('tab', t);
    setParams(next, { replace: true });
  };

  const empty = () => {
    if (q) {
      return (
        <EmptyState
          icon={<SearchX />}
          title={`No courses match “${params.get('q')}”`}
          description="Check the spelling or try a shorter search."
          action={<Button variant="outlined" appearance="secondary" onClick={() => setParams({}, { replace: true })}>Clear search</Button>}
        />
      );
    }
    if (tab === 'draft') {
      return (
        <EmptyState
          icon={<FilePlus2 />}
          title="No drafts right now"
          description="Courses you start but haven’t published yet will appear here."
          action={<Button onClick={start}>Create course</Button>}
        />
      );
    }
    if (tab === 'published') {
      return (
        <EmptyState
          icon={<Send />}
          title="Nothing published yet"
          description="Publish a draft to make it visible to students."
          action={<Button variant="outlined" appearance="secondary" onClick={() => setTab('draft')}>See drafts</Button>}
        />
      );
    }
    return (
      <EmptyState
        icon={<FilePlus2 />}
        title="Create your first course"
        description="Turn what you know into a course. It takes about 30 minutes to publish your first one."
        action={<Button onClick={start}>Create course</Button>}
      />
    );
  };

  return (
    <AppShell title="My courses" subtitle="Create, edit and publish your courses.">
      <div className="toolbar">
        <Tabs<Tab>
          label="Filter courses by status"
          value={tab}
          onChange={setTab}
          panelId="courses-panel"
          items={[
            { value: 'all', label: 'All', count: counts.all },
            { value: 'published', label: 'Published', count: counts.published },
            { value: 'draft', label: 'Drafts', count: counts.draft },
          ]}
        />
        <Button leadingIcon={<Plus />} onClick={start}>New course</Button>
      </div>

      <div id="courses-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {state === 'loading' && <CourseGridSkeleton />}
        {state === 'error' && <Card><CourseGridError onRetry={retry} /></Card>}
        {state === 'ready' && list.length === 0 && <Card>{empty()}</Card>}
        {state === 'ready' && list.length > 0 && (
          <div className="course-grid">
            {list.map((c) => <CourseCard key={c.id} course={c} to={courseLink(c)} />)}
          </div>
        )}
      </div>

      <ActionBar className="only-mobile" end={<Button fullWidth onClick={start}>New course</Button>} />
    </AppShell>
  );
}
