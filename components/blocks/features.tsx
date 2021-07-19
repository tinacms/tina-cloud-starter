import { Actions } from "../actions";
import { Section } from "../section";
import { Container } from "../container";
import { Icon } from "../icon";

export const Feature = ({ data }) => {
  return (
    <div className="flex-1 flex flex-col gap-6" style={{ flexBasis: "14rem" }}>
      {data.icon && <Icon icon={data.icon} />}
      {data.title && (
        <h3 className="text-2xl font-semibold title-font">{data.title}</h3>
      )}
      {data.text && (
        <p className="text-base opacity-80 leading-relaxed">{data.text}</p>
      )}
      {data.actions && <Actions actions={data.actions} />}
    </div>
  );
};

export const Features = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`flex flex-wrap gap-x-8 gap-y-8 text-left`}
        size="large"
      >
        {data.items &&
          data.items.map(function (block, i) {
            return <Feature key={i} data={block} />;
          })}
      </Container>
    </Section>
  );
};
