import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import './NavItem.css';

/** Nav item (Core · Figma 247:1881). Active state comes from the route. */
export interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  /** Force active (e.g. Courses stays active inside the create flow). */
  active?: boolean;
  end?: boolean;
}

export function NavItem({ to, icon, label, active, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cx('lms-nav-item', (active ?? isActive) && 'lms-nav-item--active')}
      aria-current={active ? 'page' : undefined}
    >
      <span className="lms-nav-item__icon" aria-hidden>{icon}</span>
      <span className="lms-nav-item__label">{label}</span>
    </NavLink>
  );
}
