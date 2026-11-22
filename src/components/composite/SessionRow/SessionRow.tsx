import { ArrowDown, ArrowUp, FileText, GripVertical, HelpCircle, Pencil, Radio, Trash2, Video } from 'lucide-react';
import type { Session, SessionType } from '../../../data/types';
import { SESSION_TYPES } from '../../../data/types';
import { cx } from '../../../lib/cx';
import { Badge, IconButton } from '../../core';
import './SessionRow.css';

const TYPE_ICON: Record<SessionType, typeof Video> = { video: Video, article: FileText, quiz: HelpCircle, live: Radio };

/**
 * Session row (Composite · Figma 248:2052).
 * Booleans: Show drag handle → `editable`, Show actions → `editable`,
 * Show badge → `session.freePreview`. Drag handle has a keyboard
 * alternative (Move up / Move down), per agent.md.
 */
export interface SessionRowProps {
  session: Session;
  index: number;
  total: number;
  editable?: boolean;
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMove?: (dir: -1 | 1) => void;
}

export function SessionRow({ session, index, total, editable = false, selected, onEdit, onDelete, onMove }: SessionRowProps) {
  const Icon = TYPE_ICON[session.type];
  const typeLabel = SESSION_TYPES.find((t) => t.value === session.type)?.label ?? 'Video';
  const n = index + 1;
  return (
    <li className={cx('lms-session-row', selected && 'lms-session-row--selected')}>
      {editable && <GripVertical className="lms-session-row__handle" aria-hidden />}
      <span className="lms-session-row__index" aria-hidden>{String(n).padStart(2, '0')}</span>
      <div className="lms-session-row__text">
        <span className="lms-session-row__title" title={session.title}>
          <span className="visually-hidden">Session {n}: </span>
          {session.title}
        </span>
        <span className="lms-session-row__meta">
          <Icon aria-hidden /> {typeLabel} · {session.duration} min
        </span>
      </div>
      {session.freePreview && <Badge status="info">Free preview</Badge>}
      {editable && (
        <div className="lms-session-row__actions">
          <IconButton appearance="ghost" label={`Move session ${n} up`} icon={<ArrowUp />} disabled={index === 0} onClick={() => onMove?.(-1)} className="lms-session-row__move" />
          <IconButton appearance="ghost" label={`Move session ${n} down`} icon={<ArrowDown />} disabled={index === total - 1} onClick={() => onMove?.(1)} className="lms-session-row__move" />
          <IconButton appearance="ghost" label={`Edit session ${n}`} icon={<Pencil />} onClick={onEdit} />
          <IconButton appearance="ghost" label={`Delete session ${n}`} icon={<Trash2 />} onClick={onDelete} />
        </div>
      )}
    </li>
  );
}
