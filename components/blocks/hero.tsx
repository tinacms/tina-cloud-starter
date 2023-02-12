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
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="large"
        className="grid grid-cols-1 items-center justify-center gap-14 lg:grid-cols-5"
      >
        <div className="row-start-2 text-center lg:col-span-3 lg:row-start-1 lg:text-left">
          {data.tagline && (
            <h2
              data-tinafield={`${parentField}.tagline`}
              className="text-md title-font relative z-20 mb-8 inline-block px-3 py-1 font-bold tracking-wide"
            >
              {data.tagline}
              <span className="absolute left-0 top-0 -z-1 h-full w-full rounded-full bg-current opacity-7"></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tinafield={`${parentField}.headline`}
              className={`title-font relative	mb-10 w-full text-5xl font-extrabold leading-tight tracking-normal`}
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.headline}
              </span>
            </h3>
          )}
          {data.text && (
            <div
              data-tinafield={`${parentField}.text`}
              className={`prose prose-lg mx-auto mb-10 lg:mx-0 ${
                data.color === "primary" ? `prose-primary` : `dark:prose-dark`
              }`}
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}
          {data.actions && (
            <Actions
              parentField={`${parentField}.actions`}
              className="justify-center py-2 lg:justify-start"
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
              className="absolute h-auto w-full max-w-xs rounded-lg opacity-50 mix-blend-multiply blur-2xl brightness-150 contrast-[0.9] saturate-200 dark:opacity-30 dark:mix-blend-hard-light dark:brightness-150 lg:max-w-none"
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
