import type { ReactNode } from 'react';
import { FileQuestion } from 'lucide-react';
import type { Course, WizardStep } from '../../data/types';
import { STEPS } from '../../data/types';
import { AppShell, Stepper } from '../../components/composite';
import { ButtonLink, EmptyState } from '../../components/core';
import { SaveIndicator, stepSubtitle, type SaveState } from './useWizard';

/** Page frame shared by the 4 wizard steps: shell, title, Stepper, footer. */
export interface WizardFrameProps {
  step: WizardStep;
  course: Course | undefined;
  save: SaveState;
  goTo: (s: WizardStep) => void;
  back: string;
  children: ReactNode;
}

export function WizardFrame({ step, course, save, goTo, back, children }: WizardFrameProps) {
  if (!course) {
    return (
      <AppShell title="Course not found" back="/courses" showSearch={false}>
        <EmptyState
          icon={<FileQuestion />}
          title="We couldn't find this course"
          description="It may have been deleted, or the link is wrong."
          action={<ButtonLink to="/courses" appearance="outlined" intent="neutral">Back to courses</ButtonLink>}
        />
      </AppShell>
    );
  }
  const index = STEPS.findIndex((s) => s.key === step) + 1;
  const isNew = !course.title;
  return (
    <AppShell
      title={isNew ? 'Create new course' : course.title}
      subtitle={stepSubtitle(step)}
      mobileTitle={step === 'preview' ? 'Review & publish' : isNew ? 'Create new course' : course.title}
      mobileSubtitle={`Step ${index} of ${STEPS.length} · ${STEPS[index - 1].title}`}
      status={<SaveIndicator state={save} />}
      showSearch={false}
      back={back}
    >
      <div className="only-desktop">
        <Stepper steps={STEPS} current={index} onStepClick={(i) => goTo(STEPS[i - 1].key)} />
      </div>
      {children}
    </AppShell>
  );
}
