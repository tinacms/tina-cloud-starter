import { Actions } from "../util/actions";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { iconSchema } from "../util/icon";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Feature = ({ featuresColor, data, tinaField }) => {
  return (
    <div
      data-tinafield={tinaField}
      className="mx-auto flex max-w-xl flex-1 flex-col items-center gap-6 text-center"
      style={{ flexBasis: "16rem" }}
    >
      {data.icon && (
        <Icon
          tinaField={`${tinaField}.icon`}
          parentColor={featuresColor}
          data={{ size: "large", ...data.icon }}
        />
      )}
      {data.title && (
        <h3
          data-tinafield={`${tinaField}.title`}
          className="font-truculenta text-2xl font-semibold"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tinafield={`${tinaField}.text`}
          className="text-base leading-relaxed opacity-80"
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}
      {data.actions && <Actions actions={data.actions} />}
    </div>
  );
};

export const Features = ({ data, parentField }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`flex flex-wrap gap-x-10 gap-y-8 text-left`}
        size="large"
      >
        {data.items &&
          data.items.map(function (block, i) {
            return (
              <Feature
                tinaField={`${parentField}.items.${i}`}
                featuresColor={data.color}
                key={i}
                data={block}
              />
            );
          })}
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
      ],
    },
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
