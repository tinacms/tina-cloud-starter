import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <section>
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        {children}
      </div>
    </section>
  );
};
