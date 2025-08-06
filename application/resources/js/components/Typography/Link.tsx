import { Link as InertiaLink } from '@inertiajs/react';
import React from 'react';

interface LinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
}

const Link: React.FC<LinkProps> = ({
  href,
  external = false,
  children,
  className = '',
  underline = false,
  ...props
}) => {
  const baseClasses =
    'transition-colors duration-200' +
    (underline ? ' underline' : '');

  const classes = `${baseClasses} ${className}`.trim();

  const accessibilityProps: Record<string, any> = { ...props };

  if (external && !props['aria-label']) {
    accessibilityProps['aria-label'] = `${children} (opens in new tab)`;
  }

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...accessibilityProps}
    >
      {children}
    </a>
  ) : (
    <InertiaLink href={href} className={classes} {...accessibilityProps}>
      {children}
    </InertiaLink>
  );
};

export default Link;
