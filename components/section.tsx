import React from "react";

export const Section = ({ children, color = "default", className = "" }) => {
  const sectionColor = {
    default:
      "relative transition duration-150 ease-out text-gray-800 bg-white dark:bg-gray-800 body-font overflow-hidden",
    tint: "relative transition duration-150 ease-out text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100  body-font overflow-hidden",
    primary:
      "relative transition duration-150 ease-out text-white bg-blue-500 bg-gradient-to-br from-blue-400 to-blue-500 body-font overflow-hidden",
  };

  return (
    <section className={`${sectionColor[color]} ${className}`}>
      {children}
    </section>
  );
};
