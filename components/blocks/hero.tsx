import * as React from "react";
import { Actions } from "../util/actions";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import type { TinaTemplate } from "tinacms";

export const Hero = ({ data, parentField }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "text-blue-600",
    teal: "text-teal-600",
    green: "text-green-600",
    red: "text-red-600",
    pink: "text-pink-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="medium"
        className={`grid grid-cols-1 items-center justify-center ${
          data.image && "lg:grid-cols-5"
        }`}
      >
        <div
          className={`row-start-2 text-center ${
            data.image && "lg:col-span-3 lg:row-start-1 lg:text-left"
          }`}
        >
          {data.tagline && (
            <h2
              data-tinafield={`${parentField}.tagline`}
              className="text-md relative z-20 mb-8 inline-block px-3 py-1 font-truculenta font-bold tracking-wide"
            >
              {data.tagline}
              <span className="absolute left-0 top-0 -z-1 h-full w-full rounded-full bg-current opacity-7"></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tinafield={`${parentField}.headline`}
              className={`relative mb-10	w-full font-truculenta text-4xl font-extrabold leading-tight tracking-normal`}
            >
              <span className={`${headlineColorClasses[theme.color]}`}>
                {data.headline}
              </span>
            </h3>
          )}
          {data.text && (
            <div
              data-tinafield={`${parentField}.text`}
              className={`prose prose-lg mx-auto mb-10 ${
                data.image && "lg:mx-0"
              }`}
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}
          {data.actions && (
            <Actions
              parentField={`${parentField}.actions`}
              className={`justify-center py-2 ${
                data.image && "lg:justify-start"
              }`}
              parentColor={data.color}
              actions={data.actions}
            />
          )}
        </div>
        {data.image && (
          <div
            data-tinafield={`${parentField}.image`}
            className="relative row-start-1 flex justify-center lg:col-span-2"
          >
            <Image
              className="absolute h-auto w-full max-w-xs rounded-lg  dark:opacity-30 dark:brightness-150 lg:max-w-none"
              src={data.image.src}
              alt={data.image.alt}
              aria-hidden="true"
              width={320}
              height={320}
            />
            <Image
              className="relative z-10 h-auto w-full max-w-xs rounded-lg lg:max-w-none"
              alt={data.image.alt}
              src={data.image.src}
              width={320}
              height={320}
            />
          </div>
        )}
      </Container>
    </Section>
  );
};

export const heroBlockSchema: TinaTemplate = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      label: "Text",
      name: "text",
      type: "rich-text",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
