import { Check } from '../../icons';
import { cx } from '../../../lib/cx';
import './Step.css';

/** Step (Core · Figma 247:1906). State: completed / current / upcoming. */
export interface StepProps {
  index: number;
  title: string;
  description: string;
  state: 'completed' | 'current' | 'upcoming';
  onClick?: () => void;
}

export function Step({ index, title, description, state, onClick }: StepProps) {
  const content = (
    <>
      <span className={cx('lms-step__indicator', `lms-step__indicator--${state}`)} aria-hidden>
        {state === 'completed' ? <Check /> : index}
      </span>
      <span className="lms-step__text">
        <span className="lms-step__title">{title}</span>
        <span className="lms-step__description">{description}</span>
      </span>
      <span className="visually-hidden">
        {state === 'completed' ? ' (completed)' : state === 'current' ? ' (current step)' : ''}
      </span>
    </>
  );
  // Completed steps are links back (UX doc A4: jump to a specific step).
  return onClick && state === 'completed' ? (
    <button type="button" className="lms-step lms-step--interactive" onClick={onClick}>{content}</button>
  ) : (
    <span className="lms-step">{content}</span>
  );
}
