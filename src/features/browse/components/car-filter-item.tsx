import { createContext, FC, PropsWithChildren, useCallback, useContext, useRef, useState } from "react"
import { Filters } from "../types/filters.types";
import useFilters from "../hooks/use-filters";
import { FaAngleDown } from "react-icons/fa";
import { DEBOUNCE_DELAY } from "../config";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface FilterItemContextType {
    isOpen: boolean;
    toggle: () => void;
    filterValue?: string;
    filterKey?: string;
}

interface SearchContextType {
    value: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);
const FilterItemContext = createContext<FilterItemContextType | undefined>(undefined);

const useFilterItemContext = () => {
    const context = useContext(FilterItemContext);
    if(!context) throw new Error("no context available");

    return context;
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) throw new Error("no context available");

    return context;
}

interface FilterItemProps {
    filterKey?: keyof Filters;
}


const FilterItem: FC<PropsWithChildren<FilterItemProps>> & { Header: typeof FilterItemHeader, Menu: typeof FilterItemMenuContainer } = ({
    children,
    filterKey
}) => {
    const [state, setState] = useState(false);
    const { states } = useFilters();

    const toggle = useCallback(() => {
        setState(old => !old);
    }, []); 

    return (
        <FilterItemContext.Provider value={{ isOpen: state, toggle, filterValue: filterKey ? states[filterKey] : undefined, filterKey }}>
            {children}
        </FilterItemContext.Provider>
    );
}

interface FilterItemHeaderProps {
    title: string;
}

export const FilterItemHeader: FC<FilterItemHeaderProps> = ({
    title
}) => {
    const { toggle, filterValue, isOpen } = useFilterItemContext();
    return (
        <div onClick={toggle} className="cursor-pointer flex justify-between items-center py-1">
            <span>{title}</span>
            {
                filterValue ? <span className="text-sm text-gray-500 w-10 overflow-hidden text-ellipsis whitespace-nowrap">{filterValue}</span> : <FaAngleDown className={`text-gray-500 duration-100 transition-all ${isOpen ? "rotate-180" : "rotation-0"}`} /> 
            }
        </div>
    );
}

export const FilterItemMenuContainer: FC<PropsWithChildren<{searchable?: boolean}>> = ({
    children,
    searchable=false
}) => {
    const { isOpen, filterKey } = useFilterItemContext();
    const [search, setSearch] = useState("");
    const [deferredSearch, setDeferredSearch] = useState("");

    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    const handleChange = useCallback((val: string) => {
        setSearch(val);
        if(debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setDeferredSearch(val);
        }, DEBOUNCE_DELAY);
    }, []);


    return (
        <SearchContext.Provider value={{
            value: deferredSearch
        }}>
            <div className={`filter-item-menu space-y-2 overflow-y-auto border-b border-b-stone-300 transition-all duration-200 ${isOpen ? "max-h-96 pb-2" : "max-h-0"}`}>
                {
                    searchable && (
                        <div className="group/search border rounded-md border-stone-200 focus-within:border-blue-500 p-1 flex items-center">
                            <input 
                                className="flex-1 appearance-none outline-none"
                                value={search}
                                onChange={e => handleChange(e.target.value)}
                                placeholder={`Search ${filterKey}`}
                            />
                            <HiMagnifyingGlass
                                className="text-stone-200 group-focus-within/search:text-blue-500"
                            />
                        </div>
                    )
                }
                {children}
            </div>
        </SearchContext.Provider>
    );
}

FilterItem.Header = FilterItemHeader;
FilterItem.Menu = FilterItemMenuContainer;

export default FilterItem;