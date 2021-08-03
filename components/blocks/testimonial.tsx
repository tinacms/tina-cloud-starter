import React from "react";
import { Container } from "../container";
import { Section } from "../section";
import { ThemeContext } from "../theme";

export const Testimonial = ({ data }) => {
  const theme = React.useContext(ThemeContext);
  const quoteColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container size="large">
        <blockquote>
          <div
            className={`relative z-10 max-w-3xl mx-auto font-bold tracking-normal leading-tight text-center title-font ${
              data.color === "primary"
                ? `text-white`
                : `text-gray-700 dark:text-gray-50`
            }`}
          >
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-2	-left-4 leading-4 -z-1`}
            >
              &ldquo;
            </span>
            <p className="relative opacity-95 text-4xl lg:text-5xl">
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : quoteColorClasses[theme.color]
                }`}
              >
                {data.quote}
              </span>
            </p>
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-3	-right-4 leading-4 -z-1`}
            >
              &rdquo;
            </span>
          </div>
          <div className={`my-8 flex-grow-0`}>
            <span
              className={`block mx-auto h-0.5 w-1/6 opacity-15 bg-current`}
            ></span>
          </div>
          <footer className="text-center">
            <p
              className={`tracking-wide title-font font-bold text-lg ${
                data.color === "primary" && `text-white opacity-70`
              }`}
            >
              {data.author}
            </p>
          </footer>
        </blockquote>
      </Container>
    </Section>
  );
};
