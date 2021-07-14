import React from "react";
import { Container } from "../container";
import { Section } from "../section";

export const RawRenderer = ({ rawData, data }) => {
  return (
    <Section color="tint">
      <Container className="prose prose-lg" size="large">
        {data.description && <p>{data.description}</p>}
        <pre>
          <code>{JSON.stringify(rawData, null, 2)}</code>
        </pre>
      </Container>
    </Section>
  );
};
