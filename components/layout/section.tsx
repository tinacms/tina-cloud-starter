import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children, ...props }) => {
  return (
    <section className={cn("py-12", className)} {...props}>
      {children}
    </section>
  );
};
