import React from "react";
import Markdown from "react-markdown";
import { Container } from "../container";
import { Section } from "../section";

export const Content = ({ data, index }) => {
  return (
    <Section color={data.color}>
      <Container key={`block-${index}`} className="prose prose-lg" size="large">
        <Markdown>{data.body}</Markdown>
      </Container>
    </Section>
  );
};
