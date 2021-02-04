import { Hero } from "./hero";
import { Cta } from "./cta";

export const BlocksRenderer = ({ blocks }) => {
  return blocks.map(function (block, i) {
    switch (block.__typename) {
      case "BlockHero_Data":
        return <Hero data={block} />;
      case "BlockCta_Data":
        return <Cta data={block} />;
      default:
        return null;
    }
  });
};
