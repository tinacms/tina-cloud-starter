import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

export const Testimonial = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color} className="relative h-full">
      <Image
        className={`absolute ${
          data.image.align /* TODO: no more used with fill and object-cover? */
        } object-cover`}
        alt={data.image.alt}
        src={data.image.src}
        fill
      />
      <Container size="large">
        <blockquote>
          <div
            className={`relative z-10 mx-auto max-w-3xl text-center font-truculenta text-4xl font-bold tracking-normal lg:text-5xl ${
              data.color === "primary"
                ? `text-green-500`
                : `text-white dark:text-gray-50`
            }`}
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
              className={`mx-auto block h-0.5 w-1/6 ${
                data.color === "primary"
                  ? `bg-blue-600`
                  : `bg-gray-200 dark:bg-gray-700`
              }`}
            ></span>
          </div>
          <footer className="relative z-10 text-center">
            <p
              data-tinafield={`${parentField}.author`}
              className={`font-truculenta text-lg font-bold tracking-wide ${
                data.color === "primary"
                  ? `text-blue-200`
                  : `text-yellow-200 dark:text-yellow-300`
              }`}
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
      quote:
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      color: "primary",
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
        {
          name: "align",
          label: "Zarovnání",
          type: "string",
          options: [
            { label: "Výchozí-shora", value: "top-0" },
            { label: "Střed", value: "top-0 bottom-0 my-auto" },
            { label: "Sdola", value: "bottom-0" },
          ],
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
