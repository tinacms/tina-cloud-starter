"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import type { Template } from "tinacms";
import { PageBlocksVideo } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const Video = ({ data }: { data: PageBlocksVideo }) => {
  return (
    <Section color={data.color}>
      <Container size="large">
        <div className="aspect-video">
          <ReactPlayer
            width="100%"
            height="100%"
            style={{ margin: "auto" }}
            playing={data.autoPlay}
            loop={data.loop}
            controls={true}
            url={data.url}
          />
        </div>
      </Container>
    </Section>
  );
};

export const videoBlockSchema: Template = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.png",
    defaultItem: {
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk",
    },
  },
  fields: [
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
    {
      type: "string",
      label: "Url",
      name: "url",
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay",
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop",
    }
  ],
};
