import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { FiltersContext } from "../hooks/use-filters";
import { Filters } from "../types/filters.types";

const FilterContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [filters, setFilters] = useState<Partial<Filters>>({
        brand: ""
    });

    // const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

    const handleChange = useCallback((key: keyof Filters, value: Filters[typeof key]) => {
        setFilters(old => ({
            ...old,
            [key]: value
        }));
    }, []);

    return (
        <FiltersContext.Provider value={{
            states: filters,
            handlers: {
                handleChange
            }
        }}>
            {children}
        </FiltersContext.Provider>
    );
}

export default FilterContextProvider;