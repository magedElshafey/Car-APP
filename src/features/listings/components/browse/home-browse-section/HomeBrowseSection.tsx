// import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
// import {
//   browseTabs,
//   type BrowseTabKey,
// } from "@/features/listings/data/browseTabs.data";
// import { TabbedSection } from "@/common/tabs/TabbedSection";
// import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";

// export default function HomeBrowseSection() {
//   return (
//     <TabbedSection<BrowseTabKey>
//       tabs={browseTabs.map((tab) => ({ id: tab.id, label: tab.label }))}
//       defaultTabId="brands"
//       ariaLabel="Browse listings filters"
//       className="w-full"
//     >
//       {(activeTab) => {
//         const activeTabData = browseTabs.find((tab) => tab.id === activeTab);

//         if (!activeTabData) return null;

//         return (
//           <GridPagesSlider
//             items={activeTabData.items}
//             itemsPerPage={16}
//             getItemId={(item) => item.id}
//             getItemAriaLabel={(item) => item.label}
//             renderItem={(item) => (
//               <BrowseCard
//                 label={item.label}
//                 count={item.count}
//                 image={item.image}
//               />
//             )}
//           />
//         );
//       }}
//     </TabbedSection>
//   );
// }
import {
  browseTabs,
  type BrowseTabKey,
} from "@/features/listings/data/browseTabs.data";
import { TabbedSection } from "@/common/tabs/TabbedSection";
import BrowseBrandsTab from "@/features/listings/components/browse/brwose-by-brands/BrowseBrandsTab";
import BrowseFuelTypeTab from "@/features/listings/components/browse/browse-by-fuel-type/BrowseFuelTypeTab";
import BrowseBodyTab from "@/features/listings/components/browse/browse-by-body/BrowseBodyTab";
// import BrowsePopularModelsTab from "./tabs/BrowsePopularModelsTab";
// import BrowseCitiesTab from "./tabs/BrowseCitiesTab";

function renderTabContent(activeTab: BrowseTabKey) {
  switch (activeTab) {
    case "brands":
      return <BrowseBrandsTab />;
    case "fuel-type":
      return <BrowseFuelTypeTab />;
    // case "cities":
    //   return <BrowseCitiesTab />;

    // case "price":
    //   return <div>Price tab</div>;

    case "body":
      return <BrowseBodyTab />;

    // case "engine":
    //   return <div>Engine tab</div>;

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
