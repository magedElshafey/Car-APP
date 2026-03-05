const FeaturedLeafletsSkeleton = () => {
  return (
    <section aria-hidden className="section-shell">
      <div className="containerr">
        {/* Section Header Skeleton */}
        <header className="mb-6 flex items-end justify-between gap-4 animate-pulse">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-border-subtle" />
            <div className="h-3 w-56 rounded bg-border-subtle" />
          </div>

          <div className="h-4 w-20 rounded bg-border-subtle" />
        </header>

        {/* Cards Grid */}
        <div
          className="
            grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <FeaturedLeafletCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
const FeaturedLeafletCardSkeleton = () => {
  return (
    <div
      aria-hidden
      className="
        card-base
        border
        rounded-card
        bg-bg-surface
        p-6
        space-y-4
        animate-pulse
      "
    >
      {/* Title */}
      <div className="h-4 w-5/6 rounded bg-border-subtle" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-border-subtle" />
        <div className="h-3 w-4/5 rounded bg-border-subtle" />
      </div>

      {/* Meta */}
      <div className="mt-auto pt-3 border-t border-border-subtle flex gap-2">
        <div className="h-4 w-20 rounded-pill bg-border-subtle" />
        <div className="h-3 w-24 rounded bg-border-subtle" />
      </div>
    </div>
  );
};
export default FeaturedLeafletsSkeleton;
