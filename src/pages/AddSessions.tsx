import { useRef, useState } from 'react';
import { Clock, ListVideo, Plus } from 'lucide-react';
import { ActionBar, SessionRow } from '../components/composite';
import { Button, Card, EmptyState, Input, Toggle } from '../components/core';
import { useStore } from '../data/store';
import { SESSION_TYPES, type Session, type SessionType } from '../data/types';
import { MIN_SESSIONS, formatMinutes, totalMinutes } from '../data/rules';
import { useToast } from '../app/toast';
import { useWizard } from '../features/wizard/useWizard';
import { WizardFrame } from '../features/wizard/WizardFrame';
import './pages.css';

type Draft = { title: string; type: SessionType; duration: string; freePreview: boolean };
const EMPTY: Draft = { title: '', type: 'video', duration: '', freePreview: false };

/** 05 · Add Sessions, step 3 (Figma 252:2712) + Empty / Session expired states */
export default function AddSessions() {
  const { course, save, goTo, update, settings } = useWizard('sessions');
  const { addSession, updateSession, removeSession, moveSession, updateCourse } = useStore();
  const toast = useToast();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<'title' | 'duration', string>>>({});
  const titleRef = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null);
  const durationRef = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null);

  if (!course) return <WizardFrame step="sessions" course={course} save={save} goTo={goTo} back="/courses">{null}</WizardFrame>;

  const count = course.sessions.length;
  const focusForm = () => {
    titleRef.current?.focus();
    titleRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const onSave = () => {
    // F3: each session needs a title and a duration; type defaults to Video
    const e: typeof errors = {};
    if (!draft.title.trim()) e.title = 'Give the session a title';
    if (!(Number(draft.duration) > 0)) e.duration = 'Enter the duration in minutes';
    setErrors(e);
    if (e.title) return titleRef.current?.focus();
    if (e.duration) return durationRef.current?.focus();
    const data: Omit<Session, 'id'> = {
      title: draft.title.trim(), type: draft.type, duration: Number(draft.duration), freePreview: draft.freePreview,
    };
    if (editing) {
      updateSession(course.id, editing, data);
      toast.show({ tone: 'success', message: `“${data.title}” updated` });
    } else {
      addSession(course.id, data);
      toast.show({ tone: 'success', message: `Session ${count + 1} added` });
    }
    update({}); // trigger autosave indicator
    setDraft(EMPTY);
    setEditing(null);
    titleRef.current?.focus();
  };

  const onEdit = (s: Session) => {
    setEditing(s.id);
    setErrors({});
    setDraft({ title: s.title, type: s.type, duration: String(s.duration), freePreview: s.freePreview });
    focusForm();
  };

  const onDelete = (s: Session, index: number) => {
    const before = course.sessions;
    removeSession(course.id, s.id);
    if (editing === s.id) { setEditing(null); setDraft(EMPTY); }
    toast.show({
      tone: 'info',
      message: `Session ${index + 1} deleted`,
      actionLabel: 'Undo',
      onAction: () => updateCourse(course.id, { sessions: before }),
      duration: 6000,
    });
  };

  const missing = Math.max(0, MIN_SESSIONS - count);

  return (
    <WizardFrame step="sessions" course={course} save={save} goTo={goTo} back={`/courses/${course.id}/details`}>
      <div className="wizard-grid">
        <Card
          title="Sessions"
          description={
            count === 0
              ? `0 sessions. Add at least ${MIN_SESSIONS} to publish.`
              : `${count} ${count === 1 ? 'session' : 'sessions'} · ${formatMinutes(totalMinutes(course))} total. Use the arrows to reorder.`
          }
        >
          {count === 0 ? (
            <EmptyState
              icon={<ListVideo />}
              title="No sessions yet"
              description={`Add at least ${MIN_SESSIONS} sessions so students know what to expect.`}
              action={<Button leadingIcon={<Plus />} appearance="outlined" onClick={focusForm}>Add your first session</Button>}
            />
          ) : (
            <>
              <ol className="session-list" aria-label="Course sessions">
                {course.sessions.map((s, i) => (
                  <SessionRow
                    key={s.id}
                    session={s}
                    index={i}
                    total={count}
                    editable
                    selected={editing === s.id}
                    onEdit={() => onEdit(s)}
                    onDelete={() => onDelete(s, i)}
                    onMove={(dir) => moveSession(course.id, s.id, dir)}
                  />
                ))}
              </ol>
              <Button appearance="outlined" leadingIcon={<Plus />} fullWidth className="add-session" onClick={() => { setEditing(null); setDraft(EMPTY); focusForm(); }}>
                Add session
              </Button>
            </>
          )}
        </Card>

        <Card
          title={editing ? 'Edit session' : 'New session'}
          description={editing ? 'Update this lesson and save.' : 'Add a lesson to this course.'}
          as="aside"
        >
          <form className="stack gap-lg" onSubmit={(e) => { e.preventDefault(); onSave(); }} noValidate>
            <Input ref={titleRef} label="Session title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} placeholder="e.g. Color in interfaces" error={errors.title} required />
            <Input label="Type" value={draft.type} onChange={(v) => setDraft({ ...draft, type: v as SessionType })} options={SESSION_TYPES} />
            <Input
              ref={durationRef}
              label="Duration (minutes)"
              value={draft.duration}
              onChange={(v) => setDraft({ ...draft, duration: v.replace(/[^0-9]/g, '') })}
              placeholder="e.g. 15"
              inputMode="numeric"
              leadingIcon={<Clock />}
              error={errors.duration}
              required
            />
            <div className="setting-row">
              <div className="setting-row__text">
                <span className="setting-row__title">Free preview</span>
                <span className="setting-row__hint" id="preview-hint">Visitors can watch before enrolling</span>
              </div>
              <Toggle label="Free preview" describedBy="preview-hint" checked={draft.freePreview} onChange={(v) => setDraft({ ...draft, freePreview: v })} />
            </div>
            <Button type="submit" fullWidth appearance={count === 0 ? 'filled' : 'outlined'}>
              {editing ? 'Save changes' : 'Save session'}
            </Button>
            {editing && (
              <Button appearance="outlined" intent="neutral" fullWidth onClick={() => { setEditing(null); setDraft(EMPTY); setErrors({}); }}>
                Cancel editing
              </Button>
            )}
          </form>
        </Card>
      </div>

      <ActionBar
        start={<Button appearance="outlined" intent="neutral" onClick={() => goTo('details')} className="only-desktop">Back</Button>}
        note={count === 0 ? 'Add at least 1 session to continue' : missing > 0 ? `${missing} more ${missing === 1 ? 'session' : 'sessions'} needed to publish` : undefined}
        end={
          <>
            <Button appearance="outlined" onClick={() => toast.show({ tone: settings.offline ? 'info' : 'success', message: settings.offline ? 'Saved on this device' : 'Draft saved' })}>
              Save as draft
            </Button>
            <Button disabled={count === 0} onClick={() => goTo('preview')}>Continue to preview</Button>
          </>
        }
      />
    </WizardFrame>
  );
}
