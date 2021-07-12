import React from "react";
import Markdown from "react-markdown";
import { Container } from "../container";

export const Content = ({ data, index }) => {
  return (
    <Container
      key={`block-${index}`}
      className="prose prose-lg"
      color={data.color}
      size="large"
    >
      <Markdown>{data.body}</Markdown>
    </Container>
  );
};
