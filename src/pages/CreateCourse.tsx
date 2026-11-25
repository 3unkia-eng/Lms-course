import { useRef, useState } from 'react';
import { CheckCircle2 } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { ActionBar } from '../components/composite';
import { Alert, Button, Card, Dialog, Input } from '../components/core';
import { useStore } from '../data/store';
import { CATEGORIES, LANGUAGES, LEVELS } from '../data/types';
import { SUBTITLE_MAX, TITLE_MAX, validateBasic, type BasicErrors } from '../data/rules';
import { useToast } from '../app/toast';
import { useWizard } from '../features/wizard/useWizard';
import { WizardFrame } from '../features/wizard/WizardFrame';
import './pages.css';

const opts = (list: string[]) => list.map((v) => ({ value: v, label: v }));
const TIPS = [
  'Keep the title short and specific',
  'Choose the category students search',
  'Match the level to your audience',
  'Add 3–5 tags to improve discovery',
];

/** 03 · Create Course, step 1 Basic info (Figma 251:2371) + Validation errors state */
export default function CreateCourse() {
  const { course, update, save, goTo, settings } = useWizard('basic');
  const { courses, removeCourse } = useStore();
  const toast = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<BasicErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const refs = {
    title: useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null),
    category: useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null),
    level: useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null),
  };

  if (!course) return <WizardFrame step="basic" course={course} save={save} goTo={goTo} back="/courses">{null}</WizardFrame>;

  const set = (field: keyof typeof course) => (value: string) => {
    update({ [field]: value });
    if (submitted) setErrors(validateBasic({ ...course, [field]: value }));
  };

  // U7: duplicate title is allowed but flagged
  const duplicate = courses.some((c) => c.id !== course.id && c.title.trim().toLowerCase() === course.title.trim().toLowerCase() && c.title.trim());

  const onContinue = () => {
    const e = validateBasic(course);
    setErrors(e);
    setSubmitted(true);
    const first = (['title', 'category', 'level'] as const).find((k) => e[k]);
    if (first) {
      refs[first].current?.focus(); // U1: focus moves to the first error
      return;
    }
    goTo('details');
  };

  const onSaveDraft = () => {
    toast.show({ tone: settings.offline ? 'info' : 'success', message: settings.offline ? 'Draft saved on this device. It will sync when you’re online.' : 'Draft saved' });
  };

  const hasContent = !!(course.title || course.category || course.level || course.subtitle || course.tags);
  const onCancel = () => {
    if (!hasContent) {
      removeCourse(course.id);
      navigate('/courses');
    } else setLeaving(true);
  };

  const errorList = Object.entries(errors) as [keyof BasicErrors, string][];

  return (
    <WizardFrame step="basic" course={course} save={save} goTo={goTo} back="/courses">
      {submitted && errorList.length > 0 && (
        <Alert
          tone="error"
          className="error-summary"
          title={`Fix ${errorList.length} ${errorList.length === 1 ? 'field' : 'fields'} to continue`}
          description={
            <ul>
              {errorList.map(([k, msg]) => (
                <li key={k}>
                  <a href={`#field-${k}`} onClick={(e) => { e.preventDefault(); refs[k].current?.focus(); }}>{msg}</a>
                </li>
              ))}
            </ul>
          }
        />
      )}

      <div className="wizard-grid">
        <Card title="Basic information" description="Give your course a clear title and choose where it belongs.">
          <Input
            ref={refs.title}
            id="field-title"
            label="Course title"
            value={course.title}
            onChange={set('title')}
            placeholder="e.g. Introduction to UI Design"
            maxLength={TITLE_MAX}
            error={errors.title}
            helper={duplicate ? 'You already have a course with this title. You can keep it, but students may confuse them.' : undefined}
            required
          />
          <div className="field-row">
            <Input ref={refs.category} id="field-category" label="Category" value={course.category} onChange={set('category')} options={opts(CATEGORIES)} placeholder="Select a category" error={errors.category} required />
            <Input ref={refs.level} id="field-level" label="Level" value={course.level} onChange={set('level')} options={opts(LEVELS)} placeholder="Select a level" error={errors.level} required />
          </div>
          <div className="field-row">
            <Input label="Language" value={course.language} onChange={set('language')} options={opts(LANGUAGES)} />
            <Input label="Tags" value={course.tags} onChange={set('tags')} placeholder="UI, Figma, Visual design" helper="Separate tags with commas" />
          </div>
          <Input label="Subtitle (optional)" value={course.subtitle} onChange={set('subtitle')} placeholder="A short one-line summary of your course" maxLength={SUBTITLE_MAX} />
        </Card>

        <Card title="Tips for a great course" description="4 quick wins before you continue" as="aside" className="only-desktop">
          <ul className="tips">
            {TIPS.map((t) => (
              <li className="tip" key={t}><CheckCircle2 aria-hidden />{t}</li>
            ))}
          </ul>
        </Card>
      </div>

      <ActionBar
        hideStartOnMobile
        start={<Button appearance="outlined" intent="neutral" onClick={onCancel}>Cancel</Button>}
        end={
          <>
            <Button appearance="outlined" onClick={onSaveDraft}>Save as draft</Button>
            <Button onClick={onContinue}>Continue</Button>
          </>
        }
      />

      {/* U8: leaving the wizard with changes */}
      <Dialog
        open={leaving}
        title="Leave without finishing?"
        onClose={() => setLeaving(false)}
        actions={
          <>
            <Button fullWidth onClick={() => { setLeaving(false); toast.show({ tone: 'success', message: 'Draft saved. Find it under Courses → Drafts.' }); navigate('/courses?tab=draft'); }}>Save draft and leave</Button>
            <Button fullWidth appearance="outlined" intent="neutral" onClick={() => { removeCourse(course.id); setLeaving(false); navigate('/courses'); }}>Discard course</Button>
            <Button fullWidth appearance="outlined" intent="neutral" onClick={() => setLeaving(false)}>Stay</Button>
          </>
        }
      >
        Your changes are saved as a draft. You can keep it and finish later, or discard this course.
      </Dialog>
    </WizardFrame>
  );
}
