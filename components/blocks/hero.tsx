import * as React from "react";
import Markdown from "react-markdown";
import { Actions } from "../actions";
import { Container } from "../container";
import { Section } from "../section";

export const Hero = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container
        size="large"
        className="grid lg:grid-cols-3 gap-8 items-center justify-center"
      >
        <div className="row-start-2 lg:row-start-1 lg:col-start-1 lg:col-end-3 text-center lg:text-left">
          {data.tagline && (
            <h2 className="w-full	mb-6 text-md font-bold tracking-wide title-font dark:text-gray-50">
              {data.tagline}
            </h2>
          )}
          {data.headline && (
            <h3
              className={`w-full relative	mb-8 text-5xl font-extrabold tracking-normal title-font`}
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
            <Actions
              className="justify-center lg:justify-start"
              color={data.color}
              actions={data.actions}
            />
          )}
        </div>
        {data.image && (
          <div className="row-start-1 lg:-my-6 flex justify-center">
            <img
              className="w-full max-w-xs lg:max-w-none h-auto"
              alt={data.image.alt}
              src={data.image.src}
            />
          </div>
        )}
      </Container>
    </Section>
  );
};
