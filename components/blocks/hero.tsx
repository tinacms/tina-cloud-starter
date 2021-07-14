import * as React from "react";
import { Actions } from "../actions";
import { Section } from "../section";

export const Hero = ({ data }) => {
  return (
    <Section color={data.color}>
      <div className="w-full pt-20 lg:py-56 lg:text-left">
        <div className="px-8 pb-20 lg:pb-0 lg:w-1/2 lg:px-12">
          <div className="max-w-3xl mx-auto">
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
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600`}
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
            {/* {data.actions && <Actions actions={data.actions} />} */}
          </div>
        </div>
        {data.image && (
          <div className="relative w-full h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              className="lg:absolute lg:inset-0 w-full h-auto max-h-96 md:max-h-128 lg:max-h-full lg:h-full object-cover"
              alt={data.image.alt}
              src={data.image.src}
            />
          </div>
        )}
      </div>
    </Section>
  );
};
