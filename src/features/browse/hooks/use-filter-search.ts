import { createContext, useContext } from "react";

interface SearchContextType {
    value: string;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

const useFilterSearch = () => {
    const context = useContext(SearchContext);
    if (!context) throw new Error("no context available");

    return context;
}

export default useFilterSearch;