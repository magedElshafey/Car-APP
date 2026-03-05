const PageSkeleton = () => {
  return (
    <div aria-hidden>
      {/* Header */}
      <div className="bg-bg-page border-b border-border-subtle">
        <div className="containerr py-8 space-y-3">
          <div className="h-7 w-3/4 rounded bg-border-subtle animate-pulse" />
          <div className="h-4 w-1/3 rounded bg-border-subtle animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-border-subtle animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="containerr py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-card-gap">
          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {/* At a glance */}
            <div className="rounded-card border border-border-subtle bg-bg-surface p-5 space-y-2">
              <div className="h-4 w-32 rounded bg-border-subtle animate-pulse" />
              <div className="h-3 w-full rounded bg-border-subtle animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-border-subtle animate-pulse" />
            </div>

            {/* PDF placeholder */}
            <div className="rounded-card bg-bg-surface shadow-soft overflow-hidden">
              <div className="h-[60vh] w-full bg-border-subtle animate-pulse" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rounded-card bg-bg-surface p-5 shadow-soft space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-20 rounded bg-border-subtle animate-pulse" />
                <div className="h-4 w-32 rounded bg-border-subtle animate-pulse" />
              </div>
            ))}

            <div className="h-9 w-full rounded-pill bg-border-subtle animate-pulse mt-4" />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
