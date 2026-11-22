import { BarChart3, BookOpen, Banknote, GraduationCap, LayoutGrid, MessageCircle, Settings, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Avatar, NavItem } from '../../core';
import './Sidebar.css';

/**
 * Sidebar (Composite · Figma 248:1770). Built from Nav item + Avatar.
 * Desktop ≥ 1024 only; below that AppShell shows it as a drawer.
 */
export interface SidebarProps {
  userName?: string;
  userRole?: string;
  onNavigate?: () => void;
}

const NAV = [
  { to: '/', label: 'Dashboard', icon: <LayoutGrid />, end: true },
  { to: '/courses', label: 'Courses', icon: <BookOpen /> },
  { to: '/students', label: 'Students', icon: <Users /> },
  { to: '/messages', label: 'Messages', icon: <MessageCircle /> },
  { to: '/analytics', label: 'Analytics', icon: <BarChart3 /> },
  { to: '/earnings', label: 'Earnings', icon: <Banknote /> },
];

export function Sidebar({ userName = 'Sanaz Kiani', userRole = 'Instructor', onNavigate }: SidebarProps) {
  const { pathname } = useLocation();
  return (
    <aside className="lms-sidebar">
      <div className="lms-sidebar__logo">
        <span className="lms-sidebar__logo-mark" aria-hidden><GraduationCap /></span>
        <span className="lms-sidebar__logo-text">Academy</span>
      </div>
      <nav className="lms-sidebar__nav" aria-label="Main" onClick={onNavigate}>
        <p className="lms-sidebar__section" id="nav-menu">Menu</p>
        <ul aria-labelledby="nav-menu" className="lms-sidebar__list">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavItem
                {...item}
                active={item.to === '/courses' ? pathname.startsWith('/courses') : undefined}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className="lms-sidebar__user">
        <Avatar name={userName} />
        <div className="lms-sidebar__user-text">
          <span className="lms-sidebar__user-name">{userName}</span>
          <span className="lms-sidebar__user-role">{userRole}</span>
        </div>
        <button type="button" className="lms-sidebar__settings" aria-label="Account settings">
          <Settings aria-hidden />
        </button>
      </div>
    </aside>
  );
}
