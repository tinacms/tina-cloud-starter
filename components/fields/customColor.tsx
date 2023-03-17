import * as React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const colorOptions = ["red", "green", "teal", "yellow"] as const;

const customColor = {
  red: { text: "text-[#F28E65]", bg: "bg-[#F28E65]" },
  green: { text: "text-[#D2C72F]", bg: "bg-[#D2C72F]" },
  teal: { text: "text-[#BAC58F]", bg: "bg-[#BAC58F]" },
  yellow: { text: "text-[#EFC800]", bg: "bg-[#EFC800]" },
};

export const CustomColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  return (
    <>
      <input type="text" id={input.name} {...input} />
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => {
          return (
            <button
              key={color}
              className={`h-9 w-9 rounded-full border shadow ${
                customColor[color].bg
              } ${
                input.value === color
                  ? "ring-[3px] ring-blue-400 ring-offset-2"
                  : ""
              }`}
              onClick={() => {
                input.onChange(color);
              }}
            ></button>
          );
        })}
      </div>
    </>
  );
});
