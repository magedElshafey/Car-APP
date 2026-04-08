import React, { useMemo } from "react";
import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
import { chunkArray } from "@/lib/utils";

/* ================= TYPES ================= */

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

/* ================= BREAKPOINTS ================= */

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/* ================= HELPERS ================= */

function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  width: number,
  fallback: T,
): T {
  // 👇 مهم جدًا: نتأكد إن value object فعلاً مش null
  if (typeof value !== "object" || value === null) {
    return value;
  }

  const breakpoints = value as { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

  if (width >= BREAKPOINTS.xl && breakpoints.xl !== undefined)
    return breakpoints.xl;
  if (width >= BREAKPOINTS.lg && breakpoints.lg !== undefined)
    return breakpoints.lg;
  if (width >= BREAKPOINTS.md && breakpoints.md !== undefined)
    return breakpoints.md;
  if (width >= BREAKPOINTS.sm && breakpoints.sm !== undefined)
    return breakpoints.sm;

  return breakpoints.xs ?? fallback;
}

/* ================= HOOK ================= */

function useResponsiveValue<T>(value: ResponsiveValue<T>, fallback: T): T {
  const getValue = () => {
    if (typeof window === "undefined") return fallback;
    return resolveResponsiveValue(value, window.innerWidth, fallback);
  };

  const [resolved, setResolved] = React.useState<T>(getValue);

  React.useEffect(() => {
    const handleResize = () => {
      setResolved(resolveResponsiveValue(value, window.innerWidth, fallback));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [value, fallback]);

  return resolved;
}

/* ================= COMPONENT ================= */

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
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
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
