import * as React from "react";
import Markdown from "react-markdown";
import { Actions } from "../actions";
import { Container } from "../container";
import { Section } from "../section";

export const Hero = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container size="large" className="grid grid-cols-3 items-center">
        <div className="col-start-1 col-end-3">
          {data.tagline && (
            <h2 className="w-full	mb-7 text-md font-bold tracking-wide title-font dark:text-gray-50">
              {data.tagline}
            </h2>
          )}
          {data.headline && (
            <h3
              className={`w-full relative	mb-8 text-5xl font-extrabold tracking-normal text-left title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : `from-blue-400 to-blue-600`
                }`}
              >
                {data.headline}
              </span>
            </h3>
          )}
          {data.text && (
            <div
              className={`prose prose-lg mb-8 ${
                data.color === "primary" ? `prose-primary` : `dark:prose-dark`
              }`}
            >
              <Markdown>{data.text}</Markdown>
            </div>
          )}
          {data.actions && (
            <Actions color={data.color} actions={data.actions} />
          )}
        </div>
        {data.image && (
          <div className="-my-6">
            <img className="" alt={data.image.alt} src={data.image.src} />
          </div>
        )}
      </Container>
    </Section>
  );
};
