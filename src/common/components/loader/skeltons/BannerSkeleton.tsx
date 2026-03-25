import { cn } from "@/lib/utils";

type BannerSkeletonProps = {
  className?: string;
  count?: number;
  variant?: "single" | "double";
  animated?: boolean;

  // 👇 جديد: نفس variant بتاع BannerCard
  itemVariant?: "full-hero" | "gradient" | "small-side" | "text-only";
};

function SkeletonBlock({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[rgb(var(--muted)/0.55)]",
        animated && "animate-pulse",
        className,
      )}
    />
  );
}

// 👇 نفس heights بالظبط من BannerCard
function getHeightByVariant(variant?: string) {
  switch (variant) {
    case "small-side":
      return "min-h-[180px] md:min-h-[220px]";

    case "gradient":
    case "text-only":
      return "min-h-[220px] md:min-h-[260px]";

    case "full-hero":
    default:
      return "min-h-[320px] md:min-h-[420px] lg:min-h-[520px]";
  }
}

function BannerSkeletonCard({
  animated = true,
  variant,
}: {
  animated?: boolean;
  variant?: string;
}) {
  const isCompact =
    variant === "small-side" ||
    variant === "gradient" ||
    variant === "text-only";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-divider bg-surface shadow-sm",
        getHeightByVariant(variant),
      )}
      aria-hidden="true"
    >
      {/* media */}
      <div className="absolute inset-0">
        <SkeletonBlock
          animated={animated}
          className="w-full h-full rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/10 to-transparent" />
      </div>

      {/* content */}
      <div
        className={cn(
          "relative z-[1] flex h-full flex-col justify-center",
          isCompact ? "p-4 md:p-5" : "p-5 md:p-8 lg:p-12",
        )}
      >
        <div className="ms-auto w-full max-w-[620px] text-right">
          {/* title */}
          <SkeletonBlock
            animated={animated}
            className={cn(
              "ms-auto",
              isCompact ? "h-6 w-3/4 md:h-7" : "h-7 w-4/5 md:h-10 lg:h-12",
            )}
          />

          {/* description */}
          <SkeletonBlock
            animated={animated}
            className={cn(
              "ms-auto mt-3",
              isCompact
                ? "h-4 w-full max-w-[280px]"
                : "h-4 w-full max-w-[420px] md:h-5 lg:h-6",
            )}
          />

          <SkeletonBlock
            animated={animated}
            className={cn(
              "ms-auto mt-2",
              isCompact
                ? "h-4 w-2/3 max-w-[220px]"
                : "h-4 w-3/4 max-w-[360px] md:h-5 lg:h-6",
            )}
          />

          {/* button */}
          <SkeletonBlock
            animated={animated}
            className={cn(
              "ms-auto mt-5 rounded-xl",
              isCompact ? "h-10 w-28" : "h-11 w-32 md:h-12 md:w-36",
            )}
          />
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2">
        <SkeletonBlock className="h-2.5 w-7 rounded-full" />
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
      </div>
    </article>
  );
}

export default function BannerSkeleton({
  className,
  count,
  variant = "single",
  animated = true,
  itemVariant = "full-hero",
}: BannerSkeletonProps) {
  const resolvedCount = count ?? (variant === "double" ? 2 : 1);
  const isSingle = resolvedCount === 1;

  return (
    <section
      className={cn("w-full", className)}
      aria-label="Loading banners"
      aria-busy="true"
    >
      <div
        className={cn(
          "grid gap-4 md:gap-5",
          isSingle ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2",
        )}
      >
        {Array.from({ length: resolvedCount }).map((_, index) => (
          <BannerSkeletonCard
            key={index}
            animated={animated}
            variant={itemVariant}
          />
        ))}
      </div>
    </section>
  );
}
