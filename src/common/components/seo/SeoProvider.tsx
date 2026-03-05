import React from "react";
import { HelmetProvider } from "react-helmet-async";

interface SeoProviderProps {
  children: React.ReactNode;
}

const SeoProvider: React.FC<SeoProviderProps> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default SeoProvider;
