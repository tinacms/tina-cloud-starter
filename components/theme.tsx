import * as React from "react";
import GlobalData from "../content/global/index.json";

export const ThemeContext = React.createContext(GlobalData.theme);

export const Theme = ({ data, children }) => {
  const { color, icon, font } = data;
  return (
    <ThemeContext.Provider
      value={{
        color: color ? color : "blue",
        icon: icon ? icon : "boxicon",
        font: font ? font : "sans",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
