import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import Image from "next/image";
import background from "../../public/images/background.png";

export const Intro = ({ data }) => {
  return (
    <Section color={data.color} className="relative w-full">
      <Image
        className={`relative max-h-[65vh] w-full`}
        alt="Hravá dekorace"
        src={background}
        placeholder="blur"
      />
      <Image
        className={`absolute top-0 bottom-0 left-0 right-0 m-auto h-full max-h-[40vh] max-w-[50vw]`}
        alt="Habitat Zbraslav"
        src="/images/habitat-zbraslav.svg"
        width={374}
        height={136}
      />
    </Section>
  );
};

export const introBlockSchema: TinaTemplate = {
  name: "intro",
  label: "Intro",
  ui: {
    previewSrc: "/blocks/intro.png",
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
  ],
};
