import SliderPrimitive from "@/common/components/sliders/SliderPrimitive";
import BannerCard from "@/features/listings/components/banners/banner-card/BannerCard";
import type { NormalizedBannerItem } from "@/features/listings/components/banners/types/banner.types";

type BannerSliderProps = {
  items: readonly NormalizedBannerItem[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export default function BannerSlider({
  items,
  className,
  showArrows = false,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: BannerSliderProps) {
  if (!items.length) return null;

  return (
    <section className={className} aria-label="Promotional banners">
      <SliderPrimitive
        slidesPerView={1}
        spacing={16}
        showArrows={showArrows}
        showDots={showDots}
        mode="snap"
        renderMode="performance"
        arrowsClassName="!h-11 !w-11"
        dotsClassName="mt-4"
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
      >
        {items.map((item) => (
          <BannerCard
            key={item.id}
            title={item.title}
            description={item.description}
            href={item.href}
            ctaLabel={item.ctaLabel}
            overlayClassName={item.overlayClassName}
            variant={item.variant}
            media={item.media}
            isSingle={items?.length === 1}
          />
        ))}
      </SliderPrimitive>
    </section>
  );
}
