"use client";
import React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksImageContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { mermaid } from "./mermaid";
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from "../magicui/script-copy-btn";

export const ImageContent = ({ data }: { data: PageBlocksImageContent }) => {
  return (
    <Section background={data.background!} className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image Section - Left Side */}
        <div className="order-2 lg:order-1" data-tina-field={tinaField(data, "image")}>
          {data.image?.src && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={data.image.src}
                alt={data.image.alt || ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
        
        {/* Content Section - Right Side */}
        <div 
          className="order-1 lg:order-2 prose prose-lg max-w-none"
          data-tina-field={tinaField(data, "body")}
        >
          <TinaMarkdown
            content={data.body}
            components={{
              mermaid,
              scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export const imageContentBlockSchema: Template = {
  name: "imageContent",
  label: "Image + Content",
  ui: {
    previewSrc: "/blocks/image-content.png",
    defaultItem: {
      body: "## Your Content Here\n\nThis is where your markdown content will appear. You can include **bold text**, *italic text*, and even code blocks.\n\n- List items\n- Work great too\n- Perfect for features",
      image: {
        src: "",
        alt: "Image description",
      },
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          type: "image",
          label: "Image Source",
          name: "src",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "alt",
        },
      ],
    },
    {
      type: "rich-text",
      label: "Content",
      name: "body",
      templates: [
        scriptCopyBlockSchema,
      ],
    },
  ],
}; 