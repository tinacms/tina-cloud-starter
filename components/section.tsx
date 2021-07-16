import React from "react";

export const Section = ({ children, color = "", className = "" }) => {
  const sectionColor = {
    default:
      "relative transition duration-150 ease-out text-gray-800 bg-gradient-to-br from-gray-50 dark:from-gray-800 to-transparent body-font overflow-hidden",
    tint: "relative transition duration-150 ease-out text-gray-700 bg-gradient-to-br from-gray-150 dark:from-gray-1000 to-transparent body-font overflow-hidden",
    primary:
      "relative transition duration-150 ease-out text-white bg-blue-500 bg-gradient-to-br from-blue-400 to-blue-500 body-font overflow-hidden",
  };

  return (
    <section
      className={`${
        sectionColor[color] ? sectionColor[color] : sectionColor.default
      } ${className}`}
    >
      {children}
    </section>
  );
};
