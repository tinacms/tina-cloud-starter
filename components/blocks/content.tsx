import React from "react";
import Markdown from "react-markdown";
import { Container } from "../container";

export const Content = ({ data, index }) => {
  return (
    <Container key={`block-${index}`} className="py-4 prose">
      <Markdown>{data.body}</Markdown>
    </Container>
  );
};
