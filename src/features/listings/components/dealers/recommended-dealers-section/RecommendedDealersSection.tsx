import DealerCard from "@/features/listings/components/dealers/dealer-card/DealerCard";
import {
  dealersTabs,
  type DealerTabKey,
} from "@/features/listings/data/dealersTabs.data";
import { TabbedSection } from "@/common/tabs/TabbedSection";
import { CarouselSlider } from "@/common/components/sliders/CarouselSlider";

export default function RecommendedDealersSection() {
  return (
    <TabbedSection<DealerTabKey>
      tabs={dealersTabs.map((tab) => ({ id: tab.id, label: tab.label }))}
      defaultTabId="featured"
      ariaLabel="Recommended dealers"
      title="معارض ننصح بها"
      action={
        <a
          href="/dealers"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          عرض الكل
        </a>
      }
    >
      {(activeTab) => {
        const activeTabData = dealersTabs.find((tab) => tab.id === activeTab);

        if (!activeTabData) return null;

        return (
          <CarouselSlider
            items={activeTabData.items}
            getItemId={(item) => item.id}
            getItemAriaLabel={(item) => item.name}
            renderItem={(item) => (
              <DealerCard
                name={item.name}
                city={item.city}
                logo={item.logo}
                featured={item.featured}
              />
            )}
          />
        );
      }}
    </TabbedSection>
  );
}
