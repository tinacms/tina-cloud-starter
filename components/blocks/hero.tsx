'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { iconSchema } from '@/tina/fields/icon';
import { Icon } from '../icon';
import { Section } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export const Hero = ({ data }: { data: PageBlocksHero }) => {

  return (
    <Section>
      <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">

        {data.headline && (
          <div data-tina-field={tinaField(data, 'headline')}>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
              {data.headline!}
            </TextEffect>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, 'tagline')}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-balance text-lg">
              {data.tagline!}
            </TextEffect>
          </div>
        )}

        <AnimatedGroup
          variants={transitionVariants}
          className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">

          {data.actions && data.actions.map(action => (
            <div
              key={action!.label}
              data-tina-field={tinaField(action)}
              className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
              <Button
                asChild
                size="lg"
                variant={action!.type === 'link' ? 'ghost' : 'default'}
                className="rounded-xl px-5 text-base">
                <Link href={action!.link!}>
                  {action?.icon && (<Icon data={action?.icon} />)}
                  <span className="text-nowrap">{action!.label}</span>
                </Link>
              </Button>
            </div>
          ))}
        </AnimatedGroup>
      </div>

      {data.image && data.image.src && (
        <AnimatedGroup
          variants={transitionVariants}>
          <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
            <div
              aria-hidden
              className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
            />
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <Image
                data-tina-field={tinaField(data.image, 'src')}
                className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border"
                alt={data.image.alt || ''}
                src={data.image.src}
                height={4000}
                width={3000}
              />
            </div>
          </div>
        </AnimatedGroup>
      )}
    </Section>
  )
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: true,
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
      ],
    },
  ],
};
