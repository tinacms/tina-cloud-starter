import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { colorOptions } from "../fields/customColor";

const customColor: Record<(typeof colorOptions)[number], string> = {
  red: "[&>ul>li]:marker:text-[#F28E65]",
  green: "[&>ul>li]:marker:text-[#D2C72F]",
  teal: "[&>ul>li]:marker:text-[#BAC58F]",
  yellow: "[&>ul>li]:marker:text-[#EFC800]",
};

export const List = (props) => {
  console.log(props);

  return (
    <div className={`${customColor[props?.color ?? "yellow"]}`}>
      <TinaMarkdown content={props?.children} />
    </div>
  );
};
