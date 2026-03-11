type SkeletonFilterListProps = {
  items?: number;
};

export default function SkeletonFilterList({
  items = 8,
}: SkeletonFilterListProps) {
  return (
    <div className="filter-item-menu space-y-2">
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 animate-pulse">
          {/* checkbox skeleton */}
          <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700" />

          {/* text skeleton */}
          <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}