import { useEffect, useRef } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PrototypeProvider } from '../data/prototype';
import { StoreProvider } from '../data/store';
import { ToastProvider } from './toast';
import { PrototypePanel } from './PrototypePanel';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CreateCourse from '../pages/CreateCourse';
import CourseDetails from '../pages/CourseDetails';
import AddSessions from '../pages/AddSessions';
import Preview from '../pages/Preview';
import Published from '../pages/Published';
import CourseView from '../pages/CourseView';
import NotInPrototype from '../pages/NotInPrototype';
import { useStartCourse } from '../pages/Dashboard';

function NewCourse() {
  const start = useStartCourse();
  const done = useRef(false); // StrictMode runs effects twice in dev
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    start();
  }, [start]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

/**
 * Routes follow the Figma flow (📱 Create & publish a course, 250:1945).
 * HashRouter so the static build works on GitHub Pages without rewrites.
 */
export default function App() {
  return (
    <PrototypeProvider>
      <StoreProvider>
        <HashRouter>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/new" element={<NewCourse />} />
              <Route path="/courses/:id" element={<CourseView />} />
              <Route path="/courses/:id/basic" element={<CreateCourse />} />
              <Route path="/courses/:id/details" element={<CourseDetails />} />
              <Route path="/courses/:id/sessions" element={<AddSessions />} />
              <Route path="/courses/:id/preview" element={<Preview />} />
              <Route path="/courses/:id/published" element={<Published />} />
              <Route path="/students" element={<NotInPrototype title="Students" />} />
              <Route path="/messages" element={<NotInPrototype title="Messages" />} />
              <Route path="/analytics" element={<NotInPrototype title="Analytics" />} />
              <Route path="/earnings" element={<NotInPrototype title="Earnings" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <PrototypePanel />
          </ToastProvider>
        </HashRouter>
      </StoreProvider>
    </PrototypeProvider>
  );
}
