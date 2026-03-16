export const stringFilterKeys = [
    "brand",
    "model",
] as const;

type StringFilters = {
    [key in typeof stringFilterKeys[number]]: {
        label?: string;
        value: string;
    };
} 

export type Filters = StringFilters; 

export interface FiltersContextType {
    states: Partial<Filters>;
    handlers: {
        handleChange: (key: keyof Filters, value: Filters[typeof key] | undefined) => void,
        handleUniqueChange: (key: keyof Filters, value: Filters[typeof key] | undefined) => void,
    };
}