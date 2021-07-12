import React from "react";
import { Container } from "../container";

export const RawRenderer = ({ rawData, data, index }) => {
  return (
    <Container
      key={`block-${index}`}
      className="prose prose-lg"
      color="tint"
      size="large"
    >
      {data.description && <p>{data.description}</p>}
      <pre>
        <code>{JSON.stringify(rawData, null, 2)}</code>
      </pre>
    </Container>
  );
};
