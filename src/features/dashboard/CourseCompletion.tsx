import { Card, Gauge } from '../../components/core';
import './CourseCompletion.css';

/**
 * Course completion (Figma Step 01 · Dashboard, Card/Course completion beside Enrollment
 * activity): Card + Gauge + two dot Legend items. One use only, so it lives in features/.
 */
const COMPLETED = 898;
const IN_PROGRESS = 350;

export function CourseCompletion() {
  const rate = (COMPLETED / (COMPLETED + IN_PROGRESS)) * 100;
  return (
    <Card title="Course completion" className="course-completion" headingLevel={2}>
      <div className="course-completion__body">
        <Gauge value={rate} caption="Avg. completion rate" label="Average course completion rate" />
        <ul className="course-completion__legend" aria-label="Learners">
          <li className="legend-item"><span className="legend-item__dot legend-item__dot--primary" aria-hidden="true" />Completed · {COMPLETED.toLocaleString('en-US')}</li>
          <li className="legend-item"><span className="legend-item__dot legend-item__dot--secondary" aria-hidden="true" />In progress · {IN_PROGRESS.toLocaleString('en-US')}</li>
        </ul>
      </div>
    </Card>
  );
}
