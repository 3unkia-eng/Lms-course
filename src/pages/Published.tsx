import { useState } from 'react';
import { Check, ChevronRight, CircleCheck, Copy, Eye, Link2 } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppShell, CourseCard } from '../components/composite';
import { Badge, Button, ButtonLink, Card, Input } from '../components/core';
import { useStore } from '../data/store';
import { slugify } from '../data/rules';
import './pages.css';

/** 07 · Publish success (Figma 252:3463): Draft → Published, course link. */
export default function Published() {
  const { id } = useParams();
  const { getCourse } = useStore();
  const navigate = useNavigate();
  const course = getCourse(id);
  const [copied, setCopied] = useState(false);
  if (!course) return <Navigate to="/courses" replace />;

  const link = `academy.io/c/${slugify(course.title)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${link}`);
    } catch {
      /* clipboard blocked: still show feedback in the prototype */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell title={course.title} subtitle="Published" mobileTitle="Course published" back="/courses" showSearch={false} narrow>
      <Card className="success">
        <span className="success__icon" aria-hidden><CircleCheck /></span>
        <div className="success__message" role="status">
          <h2 className="success__title">Your course is live!</h2>
          <p className="success__description">Students can now find and enroll in {course.title}.</p>
        </div>
        <div className="status-change" aria-label="Status changed from Draft to Published">
          <Badge status="draft">Draft</Badge>
          <ChevronRight aria-hidden />
          <Badge status="published">Published</Badge>
        </div>
        <CourseCard course={course} to={`/courses/${course.id}`} />
        <Input
          label="Course link"
          value={link}
          onChange={() => undefined}
          readOnly
          leadingIcon={<Link2 />}
          trailing={
            <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
              {copied ? <><Check aria-hidden /> Copied</> : <><Copy aria-hidden /> Copy</>}
            </button>
          }
        />
        <div className="success__actions">
          <ButtonLink to="/courses?tab=published" variant="outlined" appearance="secondary" fullWidth>Back to courses</ButtonLink>
          <Button leadingIcon={<Eye />} fullWidth onClick={() => navigate(`/courses/${course.id}`)}>View course</Button>
        </div>
      </Card>
    </AppShell>
  );
}
