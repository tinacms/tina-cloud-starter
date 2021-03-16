import { Hero } from "./hero";
import { Cta } from "./cta";
import type * as Tina from "../.tina/__generated__/types";

export const BlocksRenderer = ({
  blocks,
}: {
  blocks: Tina.Page_Blocks_Data[];
}) => {
  return (
    <>
      {blocks
        ? blocks.map(function (block, i) {
            switch (block.__typename) {
              case "BlockHero_Data":
                return <Hero {...block} />;
              case "BlockCta_Data":
                return <Cta {...block} />;
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
