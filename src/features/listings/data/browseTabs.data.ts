export type BrowseTabKey = "brands" | "body" | "fuel-type";

export type BrowseTab = {
  id: BrowseTabKey;
  label: string;
};

export const browseTabs: readonly BrowseTab[] = [
  { id: "brands", label: "العلامات التجارية" },
  { id: "body", label: "نوع الهيكل" },
  { id: "fuel-type", label: "نوع الوقود" },
];
