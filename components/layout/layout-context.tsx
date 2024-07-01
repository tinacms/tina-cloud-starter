"use client";
import React, { useState, useContext } from "react";
import { GlobalQuery } from "../../tina/__generated__/types";

interface LayoutState {
  globalSettings: GlobalQuery["global"];
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalQuery["global"]>
  >;
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  theme: GlobalQuery["global"]["theme"];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"];
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery["global"]>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<{}>(initialPageData);

  const theme = globalSettings.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};