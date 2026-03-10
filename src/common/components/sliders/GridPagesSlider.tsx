import React, { useMemo } from "react";
import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
import { chunkArray } from "@/lib/utils";
import { cn } from "@/lib/utils";
type GridPagesSliderProps<TItem> = {
  items: readonly TItem[];
  itemsPerPage?: number;
  className?: string;
  gridClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  getItemId: (item: TItem, index: number) => string | number;
  getItemAriaLabel?: (item: TItem, index: number) => string;
  renderItem: (item: TItem, index: number) => React.ReactNode;
};

export function GridPagesSlider<TItem>({
  items,
  itemsPerPage = 16,
  className,
  gridClassName,
  slideClassName,
  dotsClassName,
  getItemId,
  getItemAriaLabel,
  renderItem,
}: GridPagesSliderProps<TItem>) {
  const pages = useMemo(() => {
    return chunkArray(items, itemsPerPage);
  }, [items, itemsPerPage]);

  if (!items.length) return null;

  return (
    <SliderPrimitive
      className={className}
      slideClassName={slideClassName}
      dotsClassName={dotsClassName}
      slidesPerView={1}
      spacing={16}
      showArrows={false}
      showDots
      mode="snap"
      renderMode="performance"
    >
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className={cn(
            "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
            gridClassName,
          )}
        >
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
      ))}
    </SliderPrimitive>
  );
}
