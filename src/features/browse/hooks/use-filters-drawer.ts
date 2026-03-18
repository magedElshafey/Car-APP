import { createContext, useContext } from "react";

export interface FiltersDrawerContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const FiltersDrawerContext = createContext<FiltersDrawerContextType | undefined>(undefined);

const useFiltersDrawer = () => {
    const context = useContext(FiltersDrawerContext);
    if (!context) throw new Error("no context available");

    return context;
}

export default useFiltersDrawer;