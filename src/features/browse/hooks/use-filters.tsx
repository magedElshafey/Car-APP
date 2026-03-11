import { createContext, useContext } from "react";
import { FiltersContextType } from "../types/filters.types";

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export default function useFilters() {
    const context = useContext(FiltersContext);
    if(!context) throw Error("no context available");

    return context;
}