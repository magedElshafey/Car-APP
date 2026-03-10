import { cn } from "@/lib/utils";
import BannerCard from "@/features/listings/components/banners/banner-card/BannerCard";
import type { PromoBannerItem } from "@/features/listings/data/promoBanners.data";

type BannerStaticSectionProps = {
  items: readonly PromoBannerItem[];
  className?: string;
  gridClassName?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
  headerClassName?: string;
  sectionLabel?: string;
};

export default function BannerStaticSection({
  items,
  className,
  gridClassName,
  title,
  action,
  headerClassName,
  sectionLabel = "Promotional banners",
}: BannerStaticSectionProps) {
  if (!items.length) return null;

  const normalizedItems = items.slice(0, 2);
  const isSingle = normalizedItems.length === 1;

  return (
    <section className={cn("w-full", className)} aria-label={sectionLabel}>
      {(title || action) && (
        <div
          className={cn(
            "mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between",
            headerClassName,
          )}
        >
          {title ? (
            <div className="text-2xl font-bold text-text md:text-3xl">
              {title}
            </div>
          ) : (
            <div />
          )}

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}

      <div
        className={cn(
          "grid gap-4 md:gap-5",
          isSingle ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2",
          gridClassName,
        )}
      >
        {normalizedItems.map((item) => (
          <BannerCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            href={item.href}
            ctaLabel={item.ctaLabel}
            imageAlt={item.imageAlt}
            overlayClassName={item.overlayClassName}
            variant={item.variant}
          />
        ))}
      </div>
    </section>
  );
}
