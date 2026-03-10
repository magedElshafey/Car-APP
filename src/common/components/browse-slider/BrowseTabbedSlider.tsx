import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { cn } from "@/lib/utils";
import { chunkArray } from "@/lib/utils";

type BrowseTab<TKey extends string, TItem> = {
  id: TKey;
  label: string;
  items: readonly TItem[];
};

type BrowseTabbedSliderProps<TKey extends string, TItem> = {
  tabs: readonly BrowseTab<TKey, TItem>[];
  defaultTabId?: TKey;
  itemsPerPage?: number;
  sectionLabel?: string;
  className?: string;
  tabListClassName?: string;
  panelClassName?: string;
  getItemId: (item: TItem, index: number) => string | number;
  renderItem: (item: TItem, index: number) => React.ReactNode;
  getItemAriaLabel?: (item: TItem, index: number) => string;
};

export function BrowseTabbedSlider<TKey extends string, TItem>({
  tabs,
  defaultTabId,
  itemsPerPage = 16,
  sectionLabel = "Browse section",
  className,
  tabListClassName,
  panelClassName,
  getItemId,
  renderItem,
  getItemAriaLabel,
}: BrowseTabbedSliderProps<TKey, TItem>) {
  const generatedId = useId();
  const [activeTab, setActiveTab] = useState<TKey>(defaultTabId ?? tabs[0]?.id);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeIndex = useMemo(() => {
    return Math.max(
      0,
      tabs.findIndex((tab) => tab.id === activeTab),
    );
  }, [tabs, activeTab]);

  const activeTabData = tabs[activeIndex];

  const pages = useMemo(() => {
    const items = activeTabData?.items ?? [];
    return chunkArray(items, itemsPerPage);
  }, [activeTabData, itemsPerPage]);

  const isRTL =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    rtl: isRTL,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 16,
    },
    slideChanged(instance) {
      setCurrentSlide(instance.track.details.rel);
    },
    created() {
      setCurrentSlide(0);
    },
  });

  useEffect(() => {
    setCurrentSlide(0);
    slider.current?.update();
    slider.current?.moveToIdx(0, true);
  }, [activeTab, pages.length, slider]);

  const onKeyDownTabs = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!tabs.length) return;

      let nextIndex = activeIndex;

      if (e.key === "ArrowRight") {
        nextIndex = isRTL
          ? (activeIndex - 1 + tabs.length) % tabs.length
          : (activeIndex + 1) % tabs.length;
      }

      if (e.key === "ArrowLeft") {
        nextIndex = isRTL
          ? (activeIndex + 1) % tabs.length
          : (activeIndex - 1 + tabs.length) % tabs.length;
      }

      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex !== activeIndex) {
        e.preventDefault();
        setActiveTab(tabs[nextIndex].id);

        const nextBtn = document.getElementById(
          `${generatedId}-tab-${String(tabs[nextIndex].id)}`,
        );
        nextBtn?.focus();
      }
    },
    [tabs, activeIndex, generatedId, isRTL],
  );

  if (!tabs.length || !activeTabData) return null;

  return (
    <section className={cn("w-full", className)} aria-label={sectionLabel}>
      <div
        role="tablist"
        aria-label={sectionLabel}
        onKeyDown={onKeyDownTabs}
        className={cn(
          "scrollbar-none mb-6 flex w-full items-center gap-6 overflow-x-auto border-b border-divider",
          tabListClassName,
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabId = `${generatedId}-tab-${String(tab.id)}`;
          const tabPanelId = `${generatedId}-panel-${String(tab.id)}`;

          return (
            <button
              key={String(tab.id)}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={tabPanelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative shrink-0 px-1 pb-3 pt-1 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-text-muted hover:text-text",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-opacity",
                  isActive ? "bg-primary opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${generatedId}-panel-${String(activeTabData.id)}`}
        role="tabpanel"
        aria-labelledby={`${generatedId}-tab-${String(activeTabData.id)}`}
        className={cn("w-full", panelClassName)}
      >
        <div ref={sliderRef} className="keen-slider">
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="keen-slider__slide">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {page.map((item, itemIndex) => {
                  const absoluteIndex = pageIndex * itemsPerPage + itemIndex;

                  return (
                    <div
                      key={getItemId(item, absoluteIndex)}
                      aria-label={getItemAriaLabel?.(item, absoluteIndex)}
                    >
                      {renderItem(item, absoluteIndex)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {pages.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            {pages.map((_, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => slider.current?.moveToIdx(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    isActive
                      ? "w-8 bg-primary"
                      : "w-4 bg-divider hover:bg-text-muted/40",
                  )}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
