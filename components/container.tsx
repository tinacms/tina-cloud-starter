import React from "react";

export const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 ${className}`}>{children}</div>
  );
};
