const BlogCardSkeleton = ({ large = false }: { large?: boolean }) => {
  return (
    <div
      aria-hidden
      className={`
        card-base
        border
        rounded-card
        bg-bg-surface
        p-4
        animate-pulse
        ${large ? "h-52 lg:col-span-2" : "h-24"}
      `}
    >
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-border-subtle" />
        <div className="h-4 w-5/6 rounded bg-border-subtle" />
        <div className="h-3 w-full rounded bg-border-subtle" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
