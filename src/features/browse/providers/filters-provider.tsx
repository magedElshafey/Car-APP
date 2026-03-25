import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { FiltersContext } from "../hooks/use-filters";
import { Filters, FiltersContextType, rangeFilterKeys, rangeFilterParamKeys, stringFilterKeys } from "../types/filters.types";
import { useSearchParams } from "react-router-dom";
import { DEBOUNCE_DELAY } from "../config";

const FilterContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    function getInitialFilters() {
        const params = searchParams;
        const filters: Partial<Filters> = {};

        for (const key of stringFilterKeys) {
            const value = params.get(`filter-${key}`);
            if (value) {
                filters[key] = {
                    label: undefined,
                    value
                };
            }
        }

        for (const key of rangeFilterKeys) {
            const paramKeys = rangeFilterParamKeys[key];
            const from = params.get(`filter-${paramKeys.from}`) || undefined;
            const to = params.get(`filter-${paramKeys.to}`) || undefined;

            if (from || to) {
                filters[key] = {
                    from,
                    to
                };
            }
        }

        return filters;
    }

    const [filters, setFilters] = useState<Partial<Filters>>(getInitialFilters);

    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    const handleChange = useCallback<FiltersContextType["handlers"]["handleChange"]>((key, value) => {
        setFilters(old => {
            return {
                ...old,
                [key]: value,
            }
        });
    }, []);

    const handleUniqueChange = useCallback<FiltersContextType["handlers"]["handleUniqueChange"]>((key, value) => {
        const exists = filters[key]?.value && filters[key]?.value === value?.value && (filters[key]?.label && value?.label ? filters[key]?.label === value.label : false);
        handleChange(key, exists ? undefined : value);
    }, [filters, handleChange]);

    const resetFilters = useCallback<FiltersContextType["handlers"]["resetFilters"]>(() => {
        setFilters({});
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setSearchParams((prev) => {
                const nextSearchParams = new URLSearchParams(prev);

                for (const key of stringFilterKeys) {
                    const value = filters[key]?.value;
                    const searchKey = `filter-${key}`;
                    if (!value) {
                        nextSearchParams.delete(searchKey);
                    } else {
                        nextSearchParams.set(searchKey, value);
                    }
                }

                for (const key of rangeFilterKeys) {
                    const value = filters[key];
                    const paramKeys = rangeFilterParamKeys[key];
                    const fromSearchKey = `filter-${paramKeys.from}`;
                    const toSearchKey = `filter-${paramKeys.to}`;

                    if (!value?.from) {
                        nextSearchParams.delete(fromSearchKey);
                    } else {
                        nextSearchParams.set(fromSearchKey, value.from);
                    }

                    if (!value?.to) {
                        nextSearchParams.delete(toSearchKey);
                    } else {
                        nextSearchParams.set(toSearchKey, value.to);
                    }
                }

                return nextSearchParams;
            }, {replace: true});
        }, DEBOUNCE_DELAY);

    }, [filters, setSearchParams]);

    return (
        <FiltersContext.Provider value={{
            states: filters,
            handlers: {
                handleChange,
                handleUniqueChange,
                resetFilters
            }
        }}>
            {children}
        </FiltersContext.Provider>
    );
}

export default FilterContextProvider;