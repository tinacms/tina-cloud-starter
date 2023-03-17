import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

export const Testimonial = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color} className="relative h-full">
      {data.image?.src && (
        <Image
          className="absolute object-cover"
          alt={data.image.alt}
          src={data.image.src}
          fill
        />
      )}
      <Container size="large">
        <blockquote>
          <div
            className={`relative z-10 mx-auto max-w-3xl text-center font-truculenta text-4xl font-bold tracking-normal lg:text-5xl text-white dark:text-gray-50`}
          >
            <div
              data-tinafield={`${parentField}.quote`}
              className="relative opacity-95"
            >
              <TinaMarkdown content={data.quote} />
            </div>
          </div>
          <div className={`my-8 flex-grow-0`}>
            <span
              className={`mx-auto block h-0.5 w-1/6 bg-gray-200 dark:bg-gray-700`}
            ></span>
          </div>
          <footer className="relative z-10 text-center">
            <p
              data-tinafield={`${parentField}.author`}
              className={`font-truculenta text-lg font-bold tracking-wide text-yellow-200 dark:text-yellow-300`}
            >
              {data.author}
            </p>
          </footer>
        </blockquote>
      </Container>
    </Section>
  );
};

export const testimonialBlockSchema: TinaTemplate = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      image: {
        src: "/images/background.png",
        alt: "Default",
      },
      quote:
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      color: "tint",
    },
  },
  fields: [
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
      type: "rich-text",
      label: "Quote",
      name: "quote",
    },
    {
      type: "string",
      label: "Author",
      name: "author",
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
