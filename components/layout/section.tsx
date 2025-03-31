import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <section className="pb-24 pt-12">
      {children}
    </section>
  );
};
