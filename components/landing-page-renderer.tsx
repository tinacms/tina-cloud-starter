import React from "react";
import type * as Tina from "../.tina/__generated__/types";
import Markdown from "react-markdown";

export const LandingPageRenderer = (props: Tina.MarketingPages_Data) => {
  switch (props.__typename) {
    case "SimplePage_Doc_Data":
      return (
        <>
          <h2>{props.title}</h2>
          <Markdown>{props._body}</Markdown>
        </>
      );
    case "LandingPage_Doc_Data":
      <>
        {props.blocks
          ? props.blocks.map(function (block, i) {
              switch (block.__typename) {
                case "BlockHero_Data":
                  return <Hero key={block.heading} {...block} />;
                case "BlockCta_Data":
                  return <Cta key={block.text} {...block} />;
                default:
                  return null;
              }
            })
          : null}
      </>;
  }
};

export const Cta = ({
  text,
  link,
  message = "Hello World",
}: {
  text?: string;
  link?: string;
  message?: string;
}) => {
  return (
    <>
      <a
        href={link}
        onClick={() => {
          !link && alert(message);
        }}
        className="button"
      >
        {text}
      </a>
      <style jsx>{`
        .button {
          border: none;
          outline: none;
          text-decoration: none;
          color: white;
          border-radius: 2rem;
          background: var(--orange);
          font-size: 1em;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          display: inline-block;
          margin: 0.25rem 0;
        }

        .button:hover,
        .button:focus {
          background: var(--orange-light);
          box-shadow: 0 0 0 2px var(--orange-light);
        }
      `}</style>
    </>
  );
};

export const Hero = ({
  heading,
  message,
}: {
  heading?: string;
  message?: string;
}) => {
  return (
    <>
      <div className="hero">
        <h2 className="heading">{heading}</h2>
        <p className="message">{message}</p>
      </div>
      <style jsx>{`
        .hero {
          display: block;
        }

        .heading {
          font-size: 2rem;
          line-height: 1.4;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .message {
          white-space: pre-line;
          font-size: 1.25rem;
          line-height: 1.6;
          margin-top: 0;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};
