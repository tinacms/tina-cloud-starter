import React from "react";
import type { Pages } from "../.tina/__generated__/types";
import { Content } from "./blocks/content";
import { Hero } from "./blocks/hero";
import { RawRenderer } from "./blocks/rawRenderer";

export const Blocks = (props: Pages) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PagesBlocksContent":
                return <Content data={block} index={i} />;
              case "PagesBlocksHero":
                return <Hero data={block} index={i} />;
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
