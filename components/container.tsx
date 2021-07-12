import React from "react";

export const Container = ({
  children,
  size = "default",
  color = "default",
  className = "",
}) => {
  const sectionColor = {
    default:
      "relative transition duration-150 ease-out text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 body-font overflow-hidden",
    tint: "relative transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-600  body-font overflow-hidden",
    primary:
      "relative transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-blue-700 bg-gradient-to-br from-blue-500 to-blue-300 dark:from-blue-500 dark:to-blue-700 body-font overflow-hidden",
  };

  const verticalPadding = {
    default: "py-8",
    small: "py-4",
    large: "py-12",
  };

  return (
    <section className={sectionColor[color]}>
      <div
        className={`max-w-7xl mx-auto px-4 ${verticalPadding[size]} ${className}`}
      >
        {children}
      </div>
    </section>
  );
};
