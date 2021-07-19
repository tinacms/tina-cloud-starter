import React from "react";

export const Section = ({ children, color = "", className = "" }) => {
  const sectionColor = {
    default:
      "flex-1 relative transition duration-150 ease-out text-gray-800 dark:text-gray-50 bg-gradient-to-br from-gray-50 dark:from-gray-800 via-transparent to-transparent body-font overflow-hidden",
    tint: "flex-1 relative transition duration-150 ease-out text-gray-900 dark:text-gray-100 bg-gradient-to-br from-gray-100 dark:from-gray-1000 to-transparent body-font overflow-hidden",
    primary:
      "flex-1 relative transition duration-150 ease-out text-white bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 body-font overflow-hidden",
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
