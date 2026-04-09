import {
  browseTabs,
  type BrowseTabKey,
} from "@/features/listings/data/browseTabs.data";
import { TabbedSection } from "@/common/tabs/TabbedSection";
import BrowseBrandsTab from "@/features/listings/components/browse/brwose-by-brands/BrowseBrandsTab";
import BrowseFuelTypeTab from "@/features/listings/components/browse/browse-by-fuel-type/BrowseFuelTypeTab";
import BrowseBodyTab from "@/features/listings/components/browse/browse-by-body/BrowseBodyTab";
import BrowseByTopCities from "@/features/listings/components/browse/browse-by-top-cities/BrowseByTopCities";
// import BrowseBySubType from "@/features/listings/components/browse/browse-by-sub-type/BrowseBySubType";

function renderTabContent(activeTab: BrowseTabKey) {
  switch (activeTab) {
    case "brands":
      return <BrowseBrandsTab />;
    case "fuel-type":
      return <BrowseFuelTypeTab />;

    case "sub-type":
      return <BrowseBodyTab />;
    case "top-cities":
      return <BrowseByTopCities />;
    // case "body":
    //   return <BrowseBySubType />;
    default:
      return null;
  }
}

export default function HomeBrowseSection() {
  return (
    <TabbedSection<BrowseTabKey>
      tabs={browseTabs}
      defaultTabId="brands"
      ariaLabel="Browse listings filters"
      className="w-full"
    >
      {(activeTab) => renderTabContent(activeTab)}
    </TabbedSection>
  );
}
