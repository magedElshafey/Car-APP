import React, { createContext, useContext, useMemo } from "react";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import type { Setting } from "@/features/settings/types/settings.type";

type WebsiteSettingsContextValue = {
  settings?: Setting;
  isLoading: boolean;
};

const WebsiteSettingsContext =
  createContext<WebsiteSettingsContextValue | null>(null);

export const WebsiteSettingsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const query = useGetWebsiteSettings();

  const value = useMemo(
    () => ({
      settings: query.data,
      isLoading: query.isLoading,
    }),
    [query.data, query.isLoading],
  );

  return (
    <WebsiteSettingsContext.Provider value={value}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
};

export const useWebsiteSettings = () => {
  const ctx = useContext(WebsiteSettingsContext);
  if (!ctx) {
    throw new Error(
      "useWebsiteSettings must be used inside WebsiteSettingsProvider",
    );
  }
  return ctx;
};
