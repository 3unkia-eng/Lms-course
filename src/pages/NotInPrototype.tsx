import { Construction } from 'lucide-react';
import { AppShell } from '../components/composite';
import { ButtonLink, Card, EmptyState } from '../components/core';

/** Placeholder for sidebar items outside the tested flow. */
export default function NotInPrototype({ title }: { title: string }) {
  return (
    <AppShell title={title}>
      <Card>
        <EmptyState
          icon={<Construction />}
          title={`${title} isn’t part of this prototype`}
          description="This test covers creating and publishing a course. Head back to your courses to continue."
          action={<ButtonLink to="/courses" variant="outlined" appearance="secondary">Go to courses</ButtonLink>}
        />
      </Card>
    </AppShell>
  );
}
