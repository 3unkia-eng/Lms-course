import { Fragment } from 'react';
import { cx } from '../../../lib/cx';
import { Step } from '../../core';
import './Stepper.css';

/**
 * Stepper (Composite · Figma 248:2023). `current` mirrors the Figma
 * Current variant (1–4). Completed steps are buttons (jump back, UX A4).
 */
export interface StepperProps {
  steps: { title: string; description: string }[];
  /** 1-based */
  current: number;
  /** Highest step the user may jump to (steps after it stay upcoming) */
  onStepClick?: (index: number) => void;
}

export function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <nav className="lms-stepper" aria-label="Course setup progress">
      <ol className="lms-stepper__list">
        {steps.map((s, i) => {
          const index = i + 1;
          const state = index < current ? 'completed' : index === current ? 'current' : 'upcoming';
          return (
            <Fragment key={s.title}>
              {i > 0 && (
                <li
                  aria-hidden
                  className={cx('lms-stepper__connector', index <= current && 'lms-stepper__connector--completed')}
                />
              )}
              <li aria-current={state === 'current' ? 'step' : undefined}>
                <Step
                  index={index}
                  title={s.title}
                  description={s.description}
                  state={state}
                  onClick={onStepClick ? () => onStepClick(index) : undefined}
                />
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
