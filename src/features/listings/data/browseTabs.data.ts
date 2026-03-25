export type BrowseTabKey = "brands" | "body" | "fuel-type";

export type BrowseTab = {
  id: BrowseTabKey;
  label: string;
};

export const browseTabs: readonly BrowseTab[] = [
  { id: "brands", label: "browse.filters.brand" },
  { id: "body", label: "browse.filters.carType" },
  { id: "fuel-type", label: "browse.filters.fuelType" },
];
