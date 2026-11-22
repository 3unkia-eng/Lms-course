import { Pencil } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../components/composite';
import { Button } from '../components/core';
import { useStore } from '../data/store';
import { CourseHeader, Curriculum } from './Preview';
import './pages.css';

/** Course page (read-only). Target of "View course" and published cards. */
export default function CourseView() {
  const { id } = useParams();
  const { getCourse } = useStore();
  const navigate = useNavigate();
  const course = getCourse(id);
  if (!course) return <Navigate to="/courses" replace />;
  return (
    <AppShell title={course.title} subtitle="Course page preview" back="/courses" showSearch={false}>
      <div className="section-header">
        <div className="section-header__text">
          <p className="section-header__subtitle">This is how students see your course.</p>
        </div>
        <Button variant="outlined" appearance="secondary" leadingIcon={<Pencil />} onClick={() => navigate(`/courses/${course.id}/basic`)}>
          Edit course
        </Button>
      </div>
      <CourseHeader course={course} />
      <Curriculum course={course} />
    </AppShell>
  );
}
