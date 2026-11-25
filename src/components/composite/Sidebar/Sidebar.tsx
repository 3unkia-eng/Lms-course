import { BarChart3, ChevronRight, BookOpen, Banknote, GraduationCap, LayoutGrid, MessageCircle, Users } from '../../icons';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, NavItem } from '../../core';
import './Sidebar.css';

/**
 * Sidebar (Composite · Figma 497:7995). Built from Nav item + Avatar.
 * Figma variant `Active item` = the active Nav item; by default it follows the route.
 * Desktop ≥ 1024 only; below that AppShell shows it as a drawer.
 */
export interface SidebarProps {
  userName?: string;
  userRole?: string;
  onNavigate?: () => void;
  /** Figma `Active item`. Defaults to the page that matches the route. */
  activeItem?: SidebarItem;
}

export type SidebarItem = 'Dashboard' | 'Courses' | 'Students' | 'Messages' | 'Analytics' | 'Earnings';

const NAV: { to: string; label: SidebarItem; icon: ReactNode; end?: boolean }[] = [
  { to: '/', label: 'Dashboard', icon: <LayoutGrid />, end: true },
  { to: '/courses', label: 'Courses', icon: <BookOpen /> },
  { to: '/students', label: 'Students', icon: <Users /> },
  { to: '/messages', label: 'Messages', icon: <MessageCircle /> },
  { to: '/analytics', label: 'Analytics', icon: <BarChart3 /> },
  { to: '/earnings', label: 'Earnings', icon: <Banknote /> },
];

export function Sidebar({ userName = 'Sanaz Kiani', userRole = 'Instructor', onNavigate, activeItem }: SidebarProps) {
  const { pathname } = useLocation();
  const fromRoute = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  return (
    <aside className="lms-sidebar">
      <div className="lms-sidebar__logo">
        <span className="lms-sidebar__logo-mark" aria-hidden><GraduationCap /></span>
        <span className="lms-sidebar__logo-text">Academy</span>
      </div>
      <nav className="lms-sidebar__nav" aria-label="Main" onClick={onNavigate}>
        <ul className="lms-sidebar__list">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavItem
                {...item}
                active={activeItem ? activeItem === item.label : fromRoute(item.to)}
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
        {/* Figma User › "Open profile" (icon/arrow-right-01). Settings live in the profile. */}
        <button type="button" className="lms-sidebar__settings" aria-label="Open profile">
          <ChevronRight aria-hidden />
        </button>
      </div>
    </aside>
  );
}
