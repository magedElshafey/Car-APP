const BrowseByBodySkeleton = () => {
  return (
    <section aria-hidden className="section-shell">
      <div className="containerr">
        {/* Section Header Skeleton */}
        <header className="mb-6 space-y-2 animate-pulse">
          <div className="h-5 w-48 rounded bg-border-subtle" />
          <div className="h-3 w-72 rounded bg-border-subtle" />
        </header>

        {/* Grid */}
        <ul
          role="list"
          className="
            grid gap-4
            grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
          "
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <BodySystemTileSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const BodySystemTileSkeleton = () => {
  return (
    <div
      aria-hidden
      className="
        rounded-card border border-border-subtle
        bg-bg-surface p-4
        flex flex-col justify-between
        animate-pulse
      "
    >
      {/* Icon */}
      <div className="mb-3 h-10 w-10 rounded-md bg-border-subtle" />

      {/* Content */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-border-subtle" />
        <div className="h-3 w-full rounded bg-border-subtle" />
        <div className="h-3 w-5/6 rounded bg-border-subtle" />
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-border-subtle" />
        <div className="h-3 w-10 rounded bg-border-subtle" />
      </div>
    </div>
  );
};
export default BrowseByBodySkeleton;
