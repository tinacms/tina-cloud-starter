import React from "react";
import Markdown from "react-markdown";
import { Container } from "../container";
import { Section } from "../section";

export const Content = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${data.color === "primary" && `prose-dark`}`}
        size="large"
      >
        <Markdown>{data.body}</Markdown>
      </Container>
    </Section>
  );
};
