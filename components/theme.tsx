import * as React from "react";
import { useForm, useFormScreenPlugin } from "tinacms";
import GlobalData from "../content/global/index.json";

export const ThemeContext = React.createContext(GlobalData.theme);

export const Theme = ({ data, children }) => {
  return (
    <ThemeContext.Provider value={{ ...data }}>
      {children}
    </ThemeContext.Provider>
  );
};
