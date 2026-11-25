import { useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { BookOpen, Clock, Globe, GraduationCap, Rocket } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { ActionBar, CourseCard, CourseCover, SessionRow } from '../components/composite';
import { Badge, Button, Card, Checkbox } from '../components/core';
import { wait } from '../data/prototype';
import { useStore } from '../data/store';
import type { Course } from '../data/types';
import { STATUS_LABEL, formatMinutes, publishChecklist, totalMinutes } from '../data/rules';
import { useToast } from '../app/toast';
import { useWizard } from '../features/wizard/useWizard';
import { WizardFrame } from '../features/wizard/WizardFrame';
import './pages.css';

export function CourseHeader({ course }: { course: Course }) {
  const n = course.sessions.length;
  return (
    <Card>
      <div className="course-header">
        <CourseCover course={course} size="preview" />
        <div className="course-header__info">
          <Badge status={course.status}>{STATUS_LABEL[course.status]}</Badge>
          <h2 className="course-header__title">{course.title || 'Untitled course'}</h2>
          {course.description && <p className="course-header__description clamp-2">{course.description}</p>}
          <ul className="meta-list" aria-label="Course facts">
            {course.level && <li className="meta-list__item"><GraduationCap aria-hidden />{course.level}</li>}
            {course.language && <li className="meta-list__item"><Globe aria-hidden />{course.language}</li>}
            <li className="meta-list__item"><BookOpen aria-hidden />{n} {n === 1 ? 'session' : 'sessions'}</li>
            <li className="meta-list__item"><Clock aria-hidden />{formatMinutes(totalMinutes(course))}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function Curriculum({ course }: { course: Course }) {
  return (
    <Card title="Curriculum" description="What students will see on the course page.">
      {course.sessions.length === 0 ? (
        <p className="text-body color-secondary">No sessions yet.</p>
      ) : (
        <ol className="session-list">
          {course.sessions.map((s, i) => (
            <SessionRow key={s.id} session={s} index={i} total={course.sessions.length} />
          ))}
        </ol>
      )}
    </Card>
  );
}

/** 06 · Preview, step 4 (Figma 252:3073) + Publish disabled / Publish failed */
export default function Preview() {
  const { course, save, goTo, settings } = useWizard('preview');
  const { updateCourse } = useStore();
  const toast = useToast();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const inFlight = useRef(false);

  if (!course) return <WizardFrame step="preview" course={course} save={save} goTo={goTo} back="/courses">{null}</WizardFrame>;

  const checks = publishChecklist(course);
  const firstUnmet = checks.find((c) => !c.ok);
  const reason = settings.offline ? 'You’re offline. Connect to publish.' : firstUnmet?.fix;
  const canPublish = !reason;

  const publish = async () => {
    // F5: idempotent; a double click doesn't publish twice
    if (inFlight.current || !canPublish) return;
    inFlight.current = true;
    setPublishing(true);
    await wait(settings.latency + 600);
    if (settings.publishFails) {
      inFlight.current = false;
      setPublishing(false);
      // U5: status stays Draft, error toast with Retry
      toast.show({ tone: 'error', message: 'Couldn’t publish. Your course is still a draft.', actionLabel: 'Retry', onAction: publish });
      return;
    }
    updateCourse(course.id, { status: 'published', publishedAt: Date.now(), lastStep: 'preview' });
    navigate(`/courses/${course.id}/published`);
  };

  const checklistCard = (
    <Card
      title="Ready to publish?"
      description={canPublish ? 'Everything looks good. Check the list before going live.' : `${checks.filter((c) => !c.ok).length} item${checks.filter((c) => !c.ok).length === 1 ? '' : 's'} left before you can publish.`}
      as="aside"
    >
      <ul className="checklist" aria-label="Publish checklist">
        {checks.map((c) => (
          <li key={c.key} className="checklist__item">
            <Checkbox checked={c.ok} readOnly label={<>{c.label}<span className="visually-hidden">{c.ok ? ' (done)' : ' (not done)'}</span></>} />
            {!c.ok && (
              <button type="button" className="checklist__fix" onClick={() => goTo(c.step)}>{c.fix}</button>
            )}
          </li>
        ))}
      </ul>
      <div className="status-row">
        <span>Current status</span>
        <Badge status={course.status}>{STATUS_LABEL[course.status]}</Badge>
      </div>
      <div className="publish-actions only-desktop">
        {reason && (
          <p className="publish-reason" id="publish-reason"><Info aria-hidden className="lms-button__icon" />{reason}</p>
        )}
        <Button
          fullWidth
          leadingIcon={<Rocket />}
          loading={publishing}
          disabled={!canPublish}
          aria-describedby={reason ? 'publish-reason' : undefined}
          onClick={publish}
        >
          {publishing ? 'Publishing…' : 'Publish course'}
        </Button>
        <Button fullWidth appearance="outlined" intent="neutral" onClick={() => goTo('sessions')}>Back to edit</Button>
      </div>
    </Card>
  );

  return (
    <WizardFrame step="preview" course={course} save={save} goTo={goTo} back={`/courses/${course.id}/sessions`}>
      <div className="wizard-grid">
        <div className="stack gap-xl">
          <div className="only-desktop"><CourseHeader course={course} /></div>
          <div className="only-mobile"><CourseCard course={course} meta="duration" /></div>
          <div className="only-desktop"><Curriculum course={course} /></div>
        </div>
        {checklistCard}
      </div>

      <ActionBar
        className="only-mobile"
        note={reason}
        start={<Button appearance="outlined" intent="neutral" onClick={() => goTo('sessions')}>Back</Button>}
        end={<Button loading={publishing} disabled={!canPublish} onClick={publish}>{publishing ? 'Publishing…' : 'Publish course'}</Button>}
      />
    </WizardFrame>
  );
}
