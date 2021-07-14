import React from "react";
import { Container } from "../container";
import { Section } from "../section";

export const RawRenderer = ({ rawData, data }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "tint" && `prose-tint`
        } dark:prose-dark`}
        size="large"
      >
        {data.description && <p>{data.description}</p>}
        <pre>
          <code>{JSON.stringify(rawData, null, 2)}</code>
        </pre>
      </Container>
    </Section>
  );
};
