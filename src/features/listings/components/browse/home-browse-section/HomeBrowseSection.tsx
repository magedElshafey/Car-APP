import BrowseCard from "@/features/listings/components/browse/browse-card/BrowseCard";
import {
  browseTabs,
  type BrowseTabKey,
} from "@/features/listings/data/browseTabs.data";
import { TabbedSection } from "@/common/tabs/TabbedSection";
import { GridPagesSlider } from "@/common/components/sliders/GridPagesSlider";

export default function HomeBrowseSection() {
  return (
    <TabbedSection<BrowseTabKey>
      tabs={browseTabs.map((tab) => ({ id: tab.id, label: tab.label }))}
      defaultTabId="brands"
      ariaLabel="Browse listings filters"
      className="w-full"
    >
      {(activeTab) => {
        const activeTabData = browseTabs.find((tab) => tab.id === activeTab);

        if (!activeTabData) return null;

        return (
          <GridPagesSlider
            items={activeTabData.items}
            itemsPerPage={16}
            getItemId={(item) => item.id}
            getItemAriaLabel={(item) => item.label}
            renderItem={(item) => (
              <BrowseCard
                label={item.label}
                count={item.count}
                image={item.image}
              />
            )}
          />
        );
      }}
    </TabbedSection>
  );
}
