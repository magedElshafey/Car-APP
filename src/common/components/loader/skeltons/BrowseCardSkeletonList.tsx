import BrowseCardSkeleton from "./BrowseCardSkeleton";

type BrowseCardSkeletonListProps = {
  count?: number;
};

export default function BrowseCardSkeletonList({
  count = 8,
}: BrowseCardSkeletonListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {Array.from({ length: count }).map((_, index) => (
        <BrowseCardSkeleton key={index} />
      ))}
    </div>
  );
}
