import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { FiltersContext } from "../hooks/use-filters";
import { Filters } from "../types/filters.types";
import { useSearchParams } from "react-router-dom";
import { stringFilterKeys } from "../types/filters.types";
import { DEBOUNCE_DELAY } from "../config";

const FilterContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    function getInitialFilters() {
        const params = searchParams;
        const filters: Partial<Filters> = {};
        for (const entry of params.entries()) {
            const [key, value] = entry;
            if(key.startsWith("filter-")) {
               const keyName = key.split("-")[1];
               if(keyName && (stringFilterKeys as unknown as string[]).includes(keyName)) {
                filters[keyName as keyof Filters] = {
                    label: undefined,
                    value
                };
               }
            }
        }
        return filters;
    }

    const [filters, setFilters] = useState<Partial<Filters>>(getInitialFilters);

    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    const handleChange = useCallback((key: keyof Filters, value: Filters[typeof key]) => {
        let curr: Partial<Filters> = {};
        setFilters(old => {
            curr = old;
            return {
                ...old,
                [key]: value,
            }
        });

        if(debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const filters = Object.entries(curr).reduce((acc, entry) => {
                const [key, value] = entry;
                acc[`filter-${key}`] = value.value;
                return acc;
            }, {} as Record<string, string>);

            setSearchParams({
                ...filters,
                [`filter-${key}`]: value.value
            });
        }, DEBOUNCE_DELAY);
    }, [setSearchParams]);

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