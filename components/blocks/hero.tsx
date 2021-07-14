import * as React from "react";
import { Actions } from "../actions";
import { Container } from "../container";
import { Section } from "../section";

export const Hero = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container size="large" className="grid grid-cols-3">
        <div className="">
          {data.tagline && (
            <h2 className="w-full	mb-5 text-md font-bold tracking-wide title-font">
              {data.tagline}
            </h2>
          )}
          {data.headline && (
            <h3
              className={`w-full relative	mb-6 text-5xl font-extrabold tracking-normal text-left title-font`}
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
            <p className="w-full max-w-xl mb-8 opacity-80 transition duration-150 ease-out text-left text-lg leading-relaxed lg:text-xl lg:leading-relaxed">
              {data.text}
            </p>
          )}
          {data.actions && (
            <Actions color={data.color} actions={data.actions} />
          )}
        </div>
        {data.image && (
          <div className="">
            <img className="" alt={data.image.alt} src={data.image.src} />
          </div>
        )}
      </Container>
    </Section>
  );
};
