export function FounderProfileSkeleton({
  reverse = false,
}: {
  reverse?: boolean;
}) {
  return (
    <section className="bg-bg-surface py-section-y">
      <div
        className={`
          containerr
          grid gap-12 items-center
          lg:grid-cols-2
          ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
        `}
      >
        {/* Image skeleton */}
        <div
          className="
            w-full
            h-[420px] md:h-[480px]
            rounded-card
            bg-border-subtle
            animate-pulse
          "
        />

        {/* Content skeleton */}
        <div className="max-w-xl space-y-4 animate-pulse">
          <div className="h-8 w-2/3 rounded bg-border-subtle" />
          <div className="h-4 w-1/3 rounded bg-border-subtle" />

          <div className="space-y-2 mt-6">
            <div className="h-4 w-full rounded bg-border-subtle" />
            <div className="h-4 w-5/6 rounded bg-border-subtle" />
            <div className="h-4 w-4/6 rounded bg-border-subtle" />
          </div>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 w-24 rounded-pill bg-border-subtle" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
