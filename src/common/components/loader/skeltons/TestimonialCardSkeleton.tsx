const TestimonialsSkeleton = () => {
  return (
    <section aria-hidden className="section-shell bg-bg-alt">
      <div className="containerr space-y-6">
        {/* Header */}
        <header className="space-y-2 animate-pulse">
          <div className="h-5 w-40 rounded bg-border-subtle" />
          <div className="h-3 w-72 rounded bg-border-subtle" />
        </header>

        {/* Grid */}
        <ul
          role="list"
          className="
            grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <TestimonialCardSkeleton />
            </li>
          ))}
        </ul>

        {/* CTA placeholder */}
        <div className="flex justify-center md:justify-end">
          <div className="h-9 w-44 rounded-pill bg-border-subtle animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const TestimonialCardSkeleton = () => {
  return (
    <div
      aria-hidden
      className="
        rounded-card
        border border-border-subtle
        bg-bg-surface
        p-5
        flex flex-col
        gap-3
        animate-pulse
      "
    >
      {/* Comment */}
      <div className="space-y-2 min-h-[4.5rem]">
        <div className="h-3 w-full rounded bg-border-subtle" />
        <div className="h-3 w-5/6 rounded bg-border-subtle" />
        <div className="h-3 w-4/6 rounded bg-border-subtle" />
      </div>

      {/* Author */}
      <div className="mt-auto flex gap-2">
        <div className="h-3 w-20 rounded bg-border-subtle" />
        <div className="h-3 w-16 rounded bg-border-subtle" />
      </div>
    </div>
  );
};
export default TestimonialsSkeleton;
