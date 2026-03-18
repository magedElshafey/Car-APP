export const stringFilterKeys = [
    "brand",
    "model",
    "fuel_type",
    "color",
    "car_type",
    "transmission",
    "condition",
] as const;

export const rangeFilterKeys = [
    "year",
    "price",
] as const;

export const rangeFilterParamKeys = {
    year: {
        from: "year_from",
        to: "year_to"
    },
    price: {
        from: "price_from",
        to: "price_to"
    }
} as const;

export type StringFilterKey = typeof stringFilterKeys[number];
export type RangeFilterKey = typeof rangeFilterKeys[number];

export interface StringFilterValue {
    label?: string;
    value: string;
}

export interface RangeFilterValue {
    from?: string;
    to?: string;
}

type StringFilters = {
    [key in StringFilterKey]: StringFilterValue;
} 

type RangeFilters = {
    [key in RangeFilterKey]: RangeFilterValue;
}

export type Filters = StringFilters & RangeFilters;

export type FilterValue = Filters[keyof Filters];

export const isStringFilterValue = (value: FilterValue | undefined): value is StringFilterValue => {
    return Boolean(value && "value" in value);
};

export const isRangeFilterValue = (value: FilterValue | undefined): value is RangeFilterValue => {
    return Boolean(value && ("from" in value || "to" in value));
};

export interface FiltersContextType {
    states: Partial<Filters>;
    handlers: {
        handleChange: <K extends keyof Filters>(key: K, value: Filters[K] | undefined) => void,
        handleUniqueChange: <K extends StringFilterKey>(key: K, value: Filters[K] | undefined) => void,
        resetFilters: () => void,
    };
}