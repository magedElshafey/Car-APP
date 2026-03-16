import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
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
            if (key.startsWith("filter-")) {
                const keyName = key.split("-")[1];
                if (keyName && (stringFilterKeys as unknown as string[]).includes(keyName)) {
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

    const handleChange = useCallback((key: keyof Filters, value: Filters[typeof key] | undefined) => {
        setFilters(old => {
            return {
                ...old,
                [key]: value,
            }
        });
    }, []);

    const handleUniqueChange = useCallback((key: keyof Filters, value: Filters[typeof key] | undefined) => {
        const exists = filters[key]?.value && filters[key]?.value === value?.value && (filters[key]?.label && value?.label ? filters[key]?.label === value.label : false);
        handleChange(key, exists ? undefined : value);
    }, [filters, handleChange]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const newFilters = Object.entries(filters).reduce((acc, entry) => {
                const [key, value] = entry;
                acc[`filter-${key}`] = value?.value;
                return acc;
            }, {} as Record<string, string>);

            setSearchParams((prev) => {
                for (const entry of Object.entries(newFilters)) {
                    const [key, value] = entry;
                    if (!value) {
                        prev.delete(key);
                    } else {
                        prev.set(key, value);
                    }
                }

                return prev.toString();
            });
        }, DEBOUNCE_DELAY);

    }, [filters]);

    return (
        <FiltersContext.Provider value={{
            states: filters,
            handlers: {
                handleChange,
                handleUniqueChange
            }
        }}>
            {children}
        </FiltersContext.Provider>
    );
}

export default FilterContextProvider;