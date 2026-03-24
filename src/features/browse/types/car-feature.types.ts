export interface CarFeatureCategory {
    id: number;
    name: string;
    sort: number | null;
}

export interface CarFeature {
    id: number;
    name: string;
    category: CarFeatureCategory;
}

export interface GroupedCarFeature {
    category: CarFeatureCategory;
    features: CarFeature[];
}

export type GroupedCarFeaturesByCategory = Record<string, GroupedCarFeature>;