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

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section>
      <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
          {data.headline && (<h1 data-tina-field={tinaField(data, 'headline')} className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">{data.headline}</h1>)}
          {data.tagline && (<p data-tina-field={tinaField(data, 'tagline')} className="mt-8 max-w-2xl text-pretty text-lg">{data.tagline}</p>)}

          {data.actions && (
            <div className='mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start'>
              {data.actions.map(action => (
                <Button
                  data-tina-field={tinaField(action)}
                  key={action!.label}
                  asChild
                  size="lg"
                  variant={action!.type === 'link' ? 'ghost' : 'default'}
                  className="px-5 text-base">
                  <Link href={action!.link!}>
                    {action?.icon && (<Icon data={action?.icon} />)}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        {data.image?.src && (
          <Image
            data-tina-field={tinaField(data.image, 'src')}
            className="-z-10 order-first ml-auto h-56 w-full object-cover sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten"
            alt={data.image.alt || ''}
            src={data.image.src}
            height={4000}
            width={3000}
          />
        )}
      </div>
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
