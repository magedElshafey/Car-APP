// import React, { useMemo } from "react";
// import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
// import { chunkArray } from "@/lib/utils";
// type GridPagesSliderProps<TItem> = {
//   items: readonly TItem[];
//   itemsPerPage?: number;
//   className?: string;
//   gridClassName?: string;
//   slideClassName?: string;
//   dotsClassName?: string;
//   getItemId: (item: TItem, index: number) => string | number;
//   getItemAriaLabel?: (item: TItem, index: number) => string;
//   renderItem: (item: TItem, index: number) => React.ReactNode;
// };

// export function GridPagesSlider<TItem>({
//   items,
//   itemsPerPage = 8,
//   className,
//   gridClassName,
//   slideClassName,
//   dotsClassName,
//   getItemId,
//   getItemAriaLabel,
//   renderItem,
// }: GridPagesSliderProps<TItem>) {
//   const pages = useMemo(() => {
//     return chunkArray(items, itemsPerPage);
//   }, [items, itemsPerPage]);

//   if (!items.length) return null;

//   return (
//     <SliderPrimitive
//       className={className}
//       slideClassName={slideClassName}
//       dotsClassName={dotsClassName}
//       slidesPerView={1}
//       spacing={16}
//       showArrows={false}
//       showDots
//       mode="snap"
//       renderMode="performance"
//     >
//       {pages.map((page, pageIndex) => (
//         <div
//           key={pageIndex}
//           className={`grid gap-3 ${gridClassName ? gridClassName : "grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"} `}
//         >
//           {page.map((item, itemIndex) => {
//             const absoluteIndex = pageIndex * itemsPerPage + itemIndex;

//             return (
//               <div
//                 key={getItemId(item, absoluteIndex)}
//                 aria-label={getItemAriaLabel?.(item, absoluteIndex)}
//               >
//                 {renderItem(item, absoluteIndex)}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </SliderPrimitive>
//   );
// }
import React, { useMemo } from "react";
import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
import { chunkArray } from "@/lib/utils";

type ResponsiveValue<T> =
  | T
  | {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };

type GridPagesSliderProps<TItem> = {
  items: readonly TItem[];
  itemsPerPage?: ResponsiveValue<number>;
  className?: string;
  gridClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  getItemId: (item: TItem, index: number) => string | number;
  getItemAriaLabel?: (item: TItem, index: number) => string;
  renderItem: (item: TItem, index: number) => React.ReactNode;
};

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  width: number,
): T {
  if (typeof value !== "object") return value;

  if (width >= BREAKPOINTS.xl && value.xl !== undefined) return value.xl;
  if (width >= BREAKPOINTS.lg && value.lg !== undefined) return value.lg;
  if (width >= BREAKPOINTS.md && value.md !== undefined) return value.md;
  if (width >= BREAKPOINTS.sm && value.sm !== undefined) return value.sm;

  return value.xs!;
}

function useResponsiveValue<T>(value: ResponsiveValue<T>, fallback: T): T {
  const getValue = () => {
    if (typeof window === "undefined") return fallback;
    return resolveResponsiveValue(value, window.innerWidth);
  };

  const [resolved, setResolved] = React.useState<T>(getValue);

  React.useEffect(() => {
    const handleResize = () => {
      setResolved(resolveResponsiveValue(value, window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [value]);

  return resolved;
}

export function GridPagesSlider<TItem>({
  items,
  itemsPerPage = { xs: 1, md: 2, lg: 8 },
  className,
  gridClassName,
  slideClassName,
  dotsClassName,
  getItemId,
  getItemAriaLabel,
  renderItem,
}: GridPagesSliderProps<TItem>) {
  const resolvedItemsPerPage = useResponsiveValue(itemsPerPage, 8);

  const pages = useMemo(() => {
    return chunkArray(items, resolvedItemsPerPage);
  }, [items, resolvedItemsPerPage]);

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
          className={`grid gap-3 ${
            gridClassName ??
            "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
          }`}
        >
          {page.map((item, itemIndex) => {
            const absoluteIndex = pageIndex * resolvedItemsPerPage + itemIndex;

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
