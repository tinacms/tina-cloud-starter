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
                  <React.Fragment key={`block-${block.messageHeader}`}>
                    <h3>{block.messageHeader}</h3>
                    <Markdown>{block.messageBody}</Markdown>
                  </React.Fragment>
                );
              case "Diagram_Data":
                return (
                  <React.Fragment key={`diagram-${block.diagramID}`}>
                    <h3>{block.diagramHeading}</h3>
                    <Markdown>{block.diagramDescription}</Markdown>
                    <iframe
                      title={block.diagramHeading}
                      style={{ border: "none" }}
                      width="800"
                      height="450"
                      src={`https://whimsical.com/embed/${block.diagramID}`}
                    ></iframe>
                  </React.Fragment>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
