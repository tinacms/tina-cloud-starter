import { Hero } from "./hero";
import { Cta } from "./cta";

export const BlocksRenderer = ({ blocks }) => {
  return blocks
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
    : null;
};
