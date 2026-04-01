import React, { createContext, useContext, useMemo } from "react";
import useGetCarTypes from "@/features/car-types/useGetCarTypes";
type CarTypesContextValue = {
  types?: { value: string; label: string }[];
  isLoading: boolean;
};

const CarTypesContext = createContext<CarTypesContextValue | null>(null);

export const CarTypesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const query = useGetCarTypes();

  const value = useMemo(
    () => ({
      types: query.data?.filter((item) => item?.value !== "car"),
      isLoading: query.isLoading,
    }),
    [query.data, query.isLoading],
  );

  return (
    <CarTypesContext.Provider value={value}>
      {children}
    </CarTypesContext.Provider>
  );
};

export const useCarTypes = () => {
  const ctx = useContext(CarTypesContext);
  if (!ctx) {
    throw new Error(
      "useWebsiteSettings must be used inside WebsiteSettingsProvider",
    );
  }
  return ctx;
};
