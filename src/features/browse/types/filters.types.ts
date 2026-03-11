export interface Filters {
    brand: string;
}

export interface FiltersContextType {
    states: Partial<Filters>;
    handlers: {
        handleChange: (key: keyof Filters, value: Filters[typeof key]) => void
    };
}