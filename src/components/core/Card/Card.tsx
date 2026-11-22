import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import './Card.css';

/**
 * Card (Core · Figma 247:1907). Structural container: Header (Title +
 * optional Description) and a Content slot (`children`).
 */
export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Right side of the header (e.g. a status or a small action). */
  headerAside?: ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
  /** Heading level for the title */
  headingLevel?: 2 | 3;
  children?: ReactNode;
}

export function Card({
  title, description, headerAside, as: Tag = 'section', headingLevel = 2, className, children, ...rest
}: CardProps) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Tag className={cx('lms-card', className)} {...rest}>
      {(title || description) && (
        <header className="lms-card__header">
          <div className="lms-card__heading">
            {title && <H className="lms-card__title">{title}</H>}
            {description && <p className="lms-card__description">{description}</p>}
          </div>
          {headerAside}
        </header>
      )}
      {children !== undefined && <div className="lms-card__content">{children}</div>}
    </Tag>
  );
}
