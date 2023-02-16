import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import Image from "next/image";

export const Testimonial = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Image
        className={`absolute ${data.image.align} w-full`}
        alt={data.image.alt}
        src={data.image.src}
        width={1024}
        height={468}
      />
      <Container size="large">
        <blockquote>
          <div
            className={`title-font relative z-10 mx-auto max-w-3xl text-center text-4xl font-bold tracking-normal lg:text-5xl ${
              data.color === "primary"
                ? `text-green-500`
                : `text-white dark:text-gray-50`
            }`}
          >
            <span
              className={`absolute inset-y-1/2 -left-4 -z-1 block translate-y-2 transform	text-8xl leading-4 opacity-15`}
            >
              &ldquo;
            </span>
            <p
              data-tinafield={`${parentField}.quote`}
              className="relative opacity-95"
            >
              {data.quote}
            </p>
            <span
              className={`absolute inset-y-1/2 -right-4 -z-1 block translate-y-3 transform	text-8xl leading-4 opacity-15`}
            >
              &rdquo;
            </span>
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
          <footer className="text-center">
            <p
              data-tinafield={`${parentField}.author`}
              className={`title-font text-lg font-bold tracking-wide ${
                data.color === "primary"
                  ? `text-blue-200`
                  : `text-blue-500 dark:text-blue-300`
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
      type: "string",
      ui: {
        component: "textarea",
      },
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
