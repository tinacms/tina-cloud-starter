import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children, background, ...props }) => {
  return (
    <div className={background || "bg-default"}>
      <section
        className={cn("py-6 mx-auto max-w-7xl px-6", className)}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Gray", value: "bg-gray-50/80" },
  { label: "Black", value: "bg-black/80" },
  { label: "White", value: "bg-white/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Zinc", value: "bg-zinc-50" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};