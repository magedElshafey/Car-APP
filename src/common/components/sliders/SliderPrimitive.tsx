import React, { useEffect, useMemo, useRef, useState } from "react";
import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";

type ResponsivePerView =
  | number
  | "auto"
  | {
      xs?: number | "auto";
      sm?: number | "auto";
      md?: number | "auto";
      lg?: number | "auto";
      xl?: number | "auto";
    };

type BreakpointConfig = {
  perView?: number | "auto";
  spacing?: number;
};

type SliderPrimitiveProps = {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  dir?: "rtl" | "ltr";
  loop?: boolean;
  drag?: boolean;
  initial?: number;
  spacing?: number;
  slidesPerView?: ResponsivePerView;
  showArrows?: boolean;
  showDots?: boolean;
  renderMode?: "precision" | "performance";
  mode?: "snap" | "free" | "free-snap";
  breakpoints?: {
    sm?: BreakpointConfig;
    md?: BreakpointConfig;
    lg?: BreakpointConfig;
    xl?: BreakpointConfig;
  };
  onSlideChange?: (index: number) => void;
  arrowsClassName?: string;
  dotsClassName?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

function mapPerView(value?: number | "auto") {
  if (value === undefined) return 1;
  return value;
}

function getRootPerView(slidesPerView: ResponsivePerView) {
  if (typeof slidesPerView === "object" && slidesPerView !== null) {
    return mapPerView(slidesPerView.xs);
  }

  return mapPerView(slidesPerView);
}

export default function SliderPrimitive({
  children,
  className,
  trackClassName,
  slideClassName,
  dir,
  loop = false,
  drag = true,
  initial = 0,
  spacing = 16,
  slidesPerView = 1,
  showArrows = true,
  showDots = false,
  renderMode = "performance",
  mode = "snap",
  breakpoints,
  onSlideChange,
  arrowsClassName,
  dotsClassName,
  autoPlay = false,
  autoPlayInterval = 5000,
}: SliderPrimitiveProps) {
  const items = React.Children.toArray(children);

  const resolvedDir =
    dir ??
    (typeof document !== "undefined" && document.documentElement.dir === "ltr"
      ? "ltr"
      : "rtl");

  const [currentSlide, setCurrentSlide] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  const [maxIdx, setMaxIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);

  const clearAutoplayTimer = () => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const keenOptions = useMemo<KeenSliderOptions>(() => {
    const rootPerView = getRootPerView(slidesPerView);

    const rootBreakpoints: NonNullable<KeenSliderOptions["breakpoints"]> = {};

    const mergedBreakpoints = {
      "(min-width: 640px)": {
        slides: {
          perView:
            breakpoints?.sm?.perView ??
            (typeof slidesPerView === "object"
              ? slidesPerView.sm
              : undefined) ??
            rootPerView,
          spacing: breakpoints?.sm?.spacing ?? spacing,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView:
            breakpoints?.md?.perView ??
            (typeof slidesPerView === "object"
              ? slidesPerView.md
              : undefined) ??
            rootPerView,
          spacing: breakpoints?.md?.spacing ?? spacing,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView:
            breakpoints?.lg?.perView ??
            (typeof slidesPerView === "object"
              ? slidesPerView.lg
              : undefined) ??
            rootPerView,
          spacing: breakpoints?.lg?.spacing ?? spacing,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView:
            breakpoints?.xl?.perView ??
            (typeof slidesPerView === "object"
              ? slidesPerView.xl
              : undefined) ??
            rootPerView,
          spacing: breakpoints?.xl?.spacing ?? spacing,
        },
      },
    };

    Object.entries(mergedBreakpoints).forEach(([query, config]) => {
      rootBreakpoints[query] = {
        slides: {
          perView: mapPerView(config.slides.perView),
          spacing: config.slides.spacing,
        },
      };
    });

    return {
      initial,
      loop,
      drag,
      mode,
      rtl: resolvedDir === "rtl",
      renderMode,
      slides: {
        perView: rootPerView,
        spacing,
      },
      breakpoints: rootBreakpoints,
      created(slider) {
        setLoaded(true);
        setCurrentSlide(slider.track.details.rel);
        setMaxIdx(slider.track.details.maxIdx);
      },
      updated(slider) {
        setMaxIdx(slider.track.details.maxIdx);
      },
      slideChanged(slider) {
        const next = slider.track.details.rel;
        setCurrentSlide(next);
        setMaxIdx(slider.track.details.maxIdx);
        onSlideChange?.(next);
      },
    };
  }, [
    slidesPerView,
    breakpoints,
    spacing,
    initial,
    loop,
    drag,
    mode,
    resolvedDir,
    renderMode,
    onSlideChange,
  ]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenOptions);

  useEffect(() => {
    instanceRef.current?.update(keenOptions);
  }, [keenOptions, instanceRef, items.length]);

  useEffect(() => {
    if (!autoPlay) {
      clearAutoplayTimer();
      return;
    }

    if (!loaded) return;
    if (items.length <= 1) return;
    if (isHoveredRef.current || isFocusedRef.current) return;

    const scheduleNext = () => {
      clearAutoplayTimer();

      autoplayTimerRef.current = window.setTimeout(() => {
        const instance = instanceRef.current;
        if (!instance) return;

        const details = instance.track.details;
        const isLastSlide = details.rel >= details.maxIdx;

        if (loop) {
          instance.next();
        } else {
          if (isLastSlide) {
            instance.moveToIdx(0);
          } else {
            instance.next();
          }
        }
      }, autoPlayInterval);
    };

    scheduleNext();

    return () => {
      clearAutoplayTimer();
    };
  }, [
    autoPlay,
    autoPlayInterval,
    currentSlide,
    loaded,
    items.length,
    loop,
    instanceRef,
  ]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !autoPlay) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      clearAutoplayTimer();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    const handleFocusIn = () => {
      isFocusedRef.current = true;
      clearAutoplayTimer();
    };

    const handleFocusOut = () => {
      const activeElement = document.activeElement;
      const stillInside = activeElement
        ? element.contains(activeElement)
        : false;

      isFocusedRef.current = stillInside;

      if (!stillInside) {
        isFocusedRef.current = false;
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("focusin", handleFocusIn);
    element.addEventListener("focusout", handleFocusOut);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("focusin", handleFocusIn);
      element.removeEventListener("focusout", handleFocusOut);
    };
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      clearAutoplayTimer();
    };
  }, []);

  const canShowControls = loaded && items.length > 1;
  const canGoPrev = loop || currentSlide > 0;
  const canGoNext = loop || currentSlide < maxIdx;

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      dir={resolvedDir}
    >
      <div ref={sliderRef} className={cn("keen-slider", trackClassName)}>
        {items.map((child, index) => (
          <div
            key={index}
            className={cn(
              "keen-slider__slide min-w-0",
              typeof slidesPerView === "object" || slidesPerView === "auto"
                ? "w-auto"
                : "",
              slideClassName,
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && canShowControls && (
        <>
          <button
            type="button"
            aria-label={
              resolvedDir === "rtl" ? "الشريحة السابقة" : "Previous slide"
            }
            onClick={() => instanceRef.current?.prev()}
            disabled={!canGoPrev}
            className={cn(
              "absolute top-1/2 z-dropdown flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-divider bg-surface shadow-sm transition",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "hover:bg-surface-2",
              resolvedDir === "rtl" ? "right-3" : "left-3",
              arrowsClassName,
            )}
          >
            {resolvedDir === "rtl" ? (
              <IoIosArrowForward className="w-4 h-4" />
            ) : (
              <IoIosArrowBack className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            aria-label={
              resolvedDir === "rtl" ? "الشريحة التالية" : "Next slide"
            }
            onClick={() => instanceRef.current?.next()}
            disabled={!canGoNext}
            className={cn(
              "absolute top-1/2 z-dropdown flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-divider bg-surface shadow-sm transition",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "hover:bg-surface-2",
              resolvedDir === "rtl" ? "left-3" : "right-3",
              arrowsClassName,
            )}
          >
            {resolvedDir === "rtl" ? (
              <IoIosArrowBack className="w-4 h-4" />
            ) : (
              <IoIosArrowForward className="w-4 h-4" />
            )}
          </button>
        </>
      )}

      {showDots && canShowControls && maxIdx > 0 && (
        <div
          className={cn(
            "mt-4 flex items-center justify-center gap-2",
            dotsClassName,
          )}
        >
          {Array.from({ length: maxIdx + 1 }).map((_, idx) => {
            const isActive = idx === currentSlide;

            return (
              <button
                key={idx}
                type="button"
                aria-label={
                  resolvedDir === "rtl"
                    ? `الانتقال إلى الشريحة ${idx + 1}`
                    : `Go to slide ${idx + 1}`
                }
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive ? "w-5 bg-primary" : "w-2 bg-border",
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
