export const stringFilterKeys = [
    "brand"
] as const;

type StringFilters = {
    [key in typeof stringFilterKeys[number]]: string;
} 

export type Filters = StringFilters; 

export interface FiltersContextType {
    states: Partial<Filters>;
    handlers: {
        handleChange: (key: keyof Filters, value: Filters[typeof key]) => void
    };
}