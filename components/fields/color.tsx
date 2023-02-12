import * as React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const colorOptions = [
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "white",
];

export const ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  const inputClasses = {
    blue: "bg-blue-500 border-blue-600",
    teal: "bg-teal-500 border-teal-600",
    green: "bg-green-500 border-green-600",
    yellow: "bg-yellow-500 border-yellow-600",
    orange: "bg-orange-500 border-orange-600",
    red: "bg-red-500 border-red-600",
    pink: "bg-pink-500 border-pink-600",
    purple: "bg-purple-500 border-purple-600",
    white: "bg-white border-gray-150",
  };

  return (
    <>
      <input type="text" id={input.name} className="hidden" {...input} />
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => {
          return (
            <button
              className={`h-9 w-9 rounded-full border shadow ${
                inputClasses[color]
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
