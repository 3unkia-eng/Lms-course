import { AlertCircle } from 'lucide-react';
import { Button, EmptyState, Skeleton } from '../../components/core';

/** Course card · Loading (Figma 263:3694): Skeleton block + text lines. */
export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="course-grid" aria-busy="true" aria-label="Loading courses">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <Skeleton shape="block" />
          <Skeleton width="var(--spacing-16)" />
          <Skeleton width="70%" />
          <Skeleton width="50%" />
        </div>
      ))}
      <span className="visually-hidden" role="status">Loading courses…</span>
    </div>
  );
}

/** State · Courses · Load error */
export function CourseGridError({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      tone="error"
      icon={<AlertCircle />}
      title="We couldn't load your courses"
      description="Something went wrong on our side. Your courses are safe. Try again in a moment."
      action={<Button variant="outlined" appearance="secondary" onClick={onRetry}>Retry</Button>}
    />
  );
}
