import React from "react";
import { Container } from "../container";
import { Section } from "../section";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Content = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-4xl prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <TinaMarkdown content={data.body} />
      </Container>
    </Section>
  );
};
