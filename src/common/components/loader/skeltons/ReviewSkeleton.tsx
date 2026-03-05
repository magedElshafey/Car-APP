const ReviewSkeleton = () => (
  <div
    className="rounded-card border border-border-subtle bg-bg-surface p-5 space-y-3"
    aria-hidden
  >
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-3 rounded bg-border-subtle animate-pulse"
        />
      ))}
    </div>

    <div className="h-3 w-full rounded bg-border-subtle animate-pulse" />
    <div className="h-3 w-5/6 rounded bg-border-subtle animate-pulse" />

    <div className="h-3 w-1/3 rounded bg-border-subtle animate-pulse mt-2" />
  </div>
);
export default ReviewSkeleton;
