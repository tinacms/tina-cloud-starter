import React from "react";
import { useTheme } from "../layout";

export const Section = ({ children, color = "", className = "" }) => {
  const theme = useTheme();
  const sectionColor = {
    default: "text-gray-800 dark:text-gray-50 bg-white",
    tint: "text-gray-900 dark:text-gray-100 bg-yellow-200 bg-opacity-20",
    primary: {
      blue: "text-gray-900 bg-blue-500 bg-blue-500 bg-opacity-5",
      teal: "text-gray-900 bg-teal-500 bg-teal-500 bg-opacity-5",
      green: "text-gray-900 bg-green-600 bg-green-600 bg-opacity-5",
      red: "text-gray-900 bg-red-500 bg-red-500 bg-opacity-5",
      pink: "text-gray-900 bg-pink-500 bg-pink-500 bg-opacity-5",
      purple: "text-gray-900 bg-purple-500 bg-purple-500 bg-opacity-5",
      orange: "text-gray-900 bg-orange-500 bg-orange-500 bg-opacity-5",
      yellow: "text-gray-900 dark:text-gray-100 bg-yellow-400 bg-opacity-60",
    },
  };
  const sectionColorCss =
    color === "primary"
      ? sectionColor.primary[theme.color]
      : sectionColor[color]
      ? sectionColor[color]
      : sectionColor.default;

  return (
    <section
      className={`body-font relative flex-1 overflow-hidden transition duration-150 ease-out ${sectionColorCss} ${className}`}
    >
      {children}
    </section>
  );
};
