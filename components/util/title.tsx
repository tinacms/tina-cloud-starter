import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

export const Title = (props) => {
  return (
    <div className="flex items-center">
      {props.image && (
        <Image
          className="relative m-0 mb-7"
          alt={props.image.alt}
          src={props.image.src}
          width={160}
          height={160}
        />
      )}
      <TinaMarkdown content={props.children} />
    </div>
  );
};
