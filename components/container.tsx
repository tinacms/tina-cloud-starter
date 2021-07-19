import React from "react";

export const Container = ({ children, size = "default", className = "" }) => {
  const verticalPadding = {
    default: "py-12",
    small: "py-8",
    large: "py-20",
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-8 ${verticalPadding[size]} ${className}`}
    >
      {children}
    </div>
  );
};
