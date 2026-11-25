import { useState, type ReactNode } from 'react';
import { Bell, Search } from '../../icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Input } from '../../core';
import './Topbar.css';

/**
 * Topbar (Composite · Figma 248:1857). Title is the page <h1>.
 * `Show search` Boolean → `showSearch`. Page actions never go here.
 */
export interface TopbarProps {
  title: string;
  subtitle?: ReactNode;
  showSearch?: boolean;
  /** Small status after the subtitle, e.g. the autosave indicator */
  status?: ReactNode;
}

export function Topbar({ title, subtitle, showSearch = true, status }: TopbarProps) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  return (
    <header className="lms-topbar">
      <div className="lms-topbar__heading">
        <h1 className="lms-topbar__title" title={title}>{title}</h1>
        {(subtitle || status) && (
          <p className="lms-topbar__subtitle">
            {subtitle}
            {status}
          </p>
        )}
      </div>
      {showSearch && (
        <form
          role="search"
          className="lms-topbar__search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/courses?q=${encodeURIComponent(q)}`);
          }}
        >
          <Input label="Search courses" hideLabel type="search" value={q} onChange={setQ} placeholder="Search courses…" leadingIcon={<Search />} />
        </form>
      )}
      <IconButton label="Notifications" icon={<Bell />} />
      <Avatar name="Sanaz Kiani" />
    </header>
  );
}
