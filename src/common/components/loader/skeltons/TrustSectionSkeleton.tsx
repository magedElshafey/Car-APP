const TrustSectionSkeleton = () => {
  return (
    <section
      aria-hidden
      className="section-shell bg-bg-alt border-t border-border-subtle"
    >
      <div className="containerr">
        <div className="rounded-card bg-bg-surface p-5 md:p-6 animate-pulse">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <div className="h-5 w-40 rounded bg-border-subtle" />
            <div className="h-3 w-72 rounded bg-border-subtle" />
          </div>

          {/* Cards */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-card border border-border-subtle bg-bg-alt p-4 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-border-subtle" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-3/4 rounded bg-border-subtle" />
                    <div className="h-3 w-full rounded bg-border-subtle" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reassurance box */}
          <div className="mt-4 rounded-card border border-border-subtle bg-bg-alt p-4 space-y-2">
            <div className="h-3 w-40 rounded bg-border-subtle" />
            <div className="h-3 w-full rounded bg-border-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSectionSkeleton;
