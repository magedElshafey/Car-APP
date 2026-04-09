export type BrowseTabKey =
  | "brands"
  | "body"
  | "fuel-type"
  | "top-cities"
  | "sub-type";

export type BrowseTab = {
  id: BrowseTabKey;
  label: string;
};

export const browseTabs: readonly BrowseTab[] = [
  { id: "brands", label: "browse.filters.brand" },
  { id: "sub-type", label: "browse.filters.carType" },
  { id: "top-cities", label: "browse.filters.topCities" },
  { id: "fuel-type", label: "browse.filters.fuelType" },
  // { id: "body", label: "browse.filters.subType" },
];
