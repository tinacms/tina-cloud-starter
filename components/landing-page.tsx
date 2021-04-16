import React from "react";
import Markdown from "react-markdown";
import type { LandingPage_Doc_Data } from "../.tina/__generated__/types";

export const LandingPage = (props: LandingPage_Doc_Data) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "Message_Data":
                return (
                  <>
                    <h3>{block.messageHeader}</h3>
                    <Markdown>{block.messageBody}</Markdown>
                  </>
                );
              case "Diagram_Data":
                return (
                  <>
                    <h3>{block.diagramHeading}</h3>
                    <Markdown>{block.diagramDescription}</Markdown>
                    <iframe
                      style={{ border: "none" }}
                      width="800"
                      height="450"
                      src={`https://whimsical.com/embed/${block.diagramID}`}
                    ></iframe>
                  </>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
