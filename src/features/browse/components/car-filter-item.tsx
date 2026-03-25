import { createContext, FC, PropsWithChildren, useCallback, useContext, useRef, useState } from "react"
import { SearchContext } from "@/features/browse/hooks/use-filter-search";
import { FilterValue, Filters, isRangeFilterValue, isStringFilterValue } from "../types/filters.types";
import useFilters from "../hooks/use-filters";
import { FaAngleDown } from "react-icons/fa";
import { DEBOUNCE_DELAY, RANGE_FILTER_CONFIG } from "../config";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/utils/formatPrice";

interface FilterItemContextType {
    isOpen: boolean;
    toggle: () => void;
    filterValue?: FilterValue;
    filterKey?: keyof Filters;
}

const FilterItemContext = createContext<FilterItemContextType | undefined>(undefined);

const useFilterItemContext = () => {
    const context = useContext(FilterItemContext);
    if(!context) throw new Error("no context available");

    return context;
}

interface FilterItemProps {
    filterKey?: keyof Filters;
    className?: string;
}


const FilterItem: FC<PropsWithChildren<FilterItemProps>> & { Header: typeof FilterItemHeader, Menu: typeof FilterItemMenuContainer } = ({
    children,
    filterKey,
    className=""
}) => {
    const [state, setState] = useState(false);
    const { states } = useFilters();

    const toggle = useCallback(() => {
        setState(old => !old);
    }, []); 

    return (
        <FilterItemContext.Provider value={{ isOpen: state, toggle, filterValue: filterKey ? states[filterKey] : undefined, filterKey }}>
            <div className={className}>
                {children}
            </div>
        </FilterItemContext.Provider>
    );
}

interface FilterItemHeaderProps {
    title: string;
    showLabel?: boolean;
}

export const FilterItemHeader: FC<FilterItemHeaderProps> = ({
    title,
    showLabel=false
}) => {
    const { toggle, filterValue, isOpen, filterKey } = useFilterItemContext();
    const { t, i18n } = useTranslation();
    const label = getFilterLabel(filterKey, filterValue, i18n.language);
    const isLoading = showLabel && isStringFilterValue(filterValue) && !label && filterValue.value;
    return (
        <div onClick={toggle} className="cursor-pointer flex justify-between items-center py-1">
            <span>{t(title)}</span>
            {
                isLoading ? <AiOutlineLoading3Quarters size={12} className="animate-spin text-stone-800" /> :
                (label && showLabel) ? <span className="text-sm text-gray-500 max-w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">{label}</span> : <FaAngleDown className={`text-gray-500 duration-100 transition-all ${isOpen ? "rotate-180" : "rotation-0"}`} /> 
            }
        </div>
    );
}

export const FilterItemMenuContainer: FC<PropsWithChildren<{searchable?: boolean}>> = ({
    children,
    searchable=false
}) => {
    const { isOpen, filterKey } = useFilterItemContext();
    const { t } = useTranslation();
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
            <div className={`space-y-2 flex flex-col overflow-hidden border-b border-b-stone-300 transition-all duration-200 ${isOpen ? "max-h-96 pb-2" : "max-h-0"}`}>
                {
                    searchable && (
                        <div className="group/search border rounded-md border-stone-200 focus-within:border-blue-500 p-1 flex items-center">
                            <input 
                                className="flex-1 appearance-none outline-none"
                                value={search}
                                onChange={e => handleChange(e.target.value)}
                                placeholder={filterKey ? t(`browse.filters.search.${filterKey}`) : ""}
                            />
                            <HiMagnifyingGlass
                                className="text-stone-200 group-focus-within/search:text-blue-500"
                            />
                        </div>
                    )
                }
                <div className="filter-item-menu overflow-y-auto flex-1">
                    {children}
                </div>
            </div>
        </SearchContext.Provider>
    );
}

FilterItem.Header = FilterItemHeader;
FilterItem.Menu = FilterItemMenuContainer;

export default FilterItem;

function getFilterLabel(filterKey: keyof Filters | undefined, filterValue: FilterValue | undefined, language: string) {
    if (isStringFilterValue(filterValue)) {
        return filterValue.label;
    }

    if (!filterKey || !isRangeFilterValue(filterValue)) {
        return undefined;
    }

    if (filterKey === "year") {
        const min = filterValue.from || RANGE_FILTER_CONFIG.year.min.toString();
        const max = filterValue.to || RANGE_FILTER_CONFIG.year.max.toString();
        return `${min} - ${max}`;
    }

    if (filterKey === "price") {
        const min = Number(filterValue.from || RANGE_FILTER_CONFIG.price.min);
        const max = Number(filterValue.to || RANGE_FILTER_CONFIG.price.max);
        return `${formatPrice(min, language)} - ${formatPrice(max, language)}`;
    }

    return undefined;
}