import { Hero } from "./hero";
import { Cta } from "./cta";
import type * as Tina from "../.tina/__generated__/types";

export const BlocksRenderer = ({
  blocks,
}: {
  blocks: Tina.LandingPage_Blocks_Data[];
}) => {
  return (
    <>
      {blocks
        ? blocks.map(function (block, i) {
            switch (block.__typename) {
              case "BlockHero_Data":
                return <Hero key={block.heading} {...block} />;
              case "BlockCta_Data":
                return <Cta key={block.text} {...block} />;
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
