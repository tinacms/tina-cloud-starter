import React from "react";
import Markdown from "react-markdown";
import { Container } from "./container";
import { Section } from "./section";

export const Post = ({ data }) => {
  return (
    <Section className="flex-1">
      <Container className={`flex-1 max-w-4xl`} size="large">
        <h2
          className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500`}
          >
            {data.values.title}
          </span>
        </h2>

        <div className="flex items-center justify-center mb-16">
          {data.data.author && (
            <>
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-14 w-14 rounded-full shadow-sm"
                  src={data.data.author.data.avatar}
                  alt={data.data.author.data.name}
                />
              </div>
              <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                {data.data.author.data.name}
              </p>
              <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                —
              </span>
            </>
          )}
          <p className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
            {data.values.date}
          </p>
        </div>

        <div className="prose dark:prose-dark  w-full max-w-none">
          <Markdown>{data.values._body}</Markdown>
        </div>
      </Container>
    </Section>
  );
};
