// import React from "react";
// import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";

// type CarouselSliderProps<TItem> = {
//   items: readonly TItem[];
//   className?: string;
//   trackClassName?: string;
//   slideClassName?: string;
//   arrowsClassName?: string;
//   dotsClassName?: string;
//   getItemId: (item: TItem, index: number) => string | number;
//   getItemAriaLabel?: (item: TItem, index: number) => string;
//   renderItem: (item: TItem, index: number) => React.ReactNode;
// };

// export function CarouselSlider<TItem>({
//   items,
//   className,
//   trackClassName,
//   slideClassName,
//   arrowsClassName,
//   dotsClassName,
//   getItemId,
//   getItemAriaLabel,
//   renderItem,
// }: CarouselSliderProps<TItem>) {
//   if (!items.length) return null;

//   return (
//     <SliderPrimitive
//       className={className}
//       trackClassName={trackClassName}
//       slideClassName={slideClassName}
//       arrowsClassName={arrowsClassName}
//       dotsClassName={dotsClassName}
//       slidesPerView={{ xs: 1.15, sm: 2.2, md: 3.1, lg: 4.1, xl: 5 }}
//       spacing={16}
//       showArrows
//       showDots={false}
//       mode="snap"
//       renderMode="performance"
//     >
//       {items.map((item, index) => (
//         <div
//           key={getItemId(item, index)}
//           aria-label={getItemAriaLabel?.(item, index)}
//         >
//           {renderItem(item, index)}
//         </div>
//       ))}
//     </SliderPrimitive>
//   );
// }
import React from "react";
import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
import { cn } from "@/lib/utils";

type CarouselSliderProps<TItem> = {
  items: readonly TItem[];
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  arrowsClassName?: string;
  dotsClassName?: string;
  getItemId: (item: TItem, index: number) => string | number;
  getItemAriaLabel?: (item: TItem, index: number) => string;
  renderItem: (item: TItem, index: number) => React.ReactNode;
};

export function CarouselSlider<TItem>({
  items,
  className,
  trackClassName,
  slideClassName,
  arrowsClassName,
  dotsClassName,
  getItemId,
  getItemAriaLabel,
  renderItem,
}: CarouselSliderProps<TItem>) {
  if (!items.length) return null;

  return (
    <SliderPrimitive
      className={className}
      trackClassName={trackClassName}
      slideClassName={cn("h-full", slideClassName)}
      arrowsClassName={arrowsClassName}
      dotsClassName={dotsClassName}
      slidesPerView={{ xs: 1.15, sm: 2.2, md: 3.1, lg: 4.1, xl: 4.1 }}
      spacing={16}
      showDots={true}
      mode="snap"
      renderMode="performance"
      showArrows={false}
    >
      {items.map((item, index) => (
        <div
          key={getItemId(item, index)}
          aria-label={getItemAriaLabel?.(item, index)}
          className="h-full"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </SliderPrimitive>
  );
}
