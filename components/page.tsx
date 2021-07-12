import React from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import type { Pages } from "../.tina/__generated__/types";
import { Content } from "./blocks/content";
import { RawRenderer } from "./blocks/rawRenderer";

export const Page = (props: Pages) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PagesBlocksContent":
                return <Content data={block} index={i} />;
              case "PagesBlocksImage":
                return (
                  <React.Fragment key={`diagram-${i}`}>
                    <h3>{block.heading}</h3>
                    <Markdown>{block.imgDescription}</Markdown>
                    <Image
                      loading="lazy"
                      src={block.src || "/asdf"}
                      title={block.heading}
                      layout="responsive"
                      width="1070x"
                      height="1220px"
                    />
                  </React.Fragment>
                );
              case "PagesBlocksRaw":
                return <RawRenderer rawData={props} data={block} index={i} />;
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
