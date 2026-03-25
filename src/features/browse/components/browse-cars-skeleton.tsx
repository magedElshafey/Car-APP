interface BrowseCarsSkeletonProps {
    items?: number;
}

const BrowseCarsSkeleton = ({ items = 6 }: BrowseCarsSkeletonProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-live="polite">
            {Array.from({ length: items }).map((_, index) => (
                <article
                    key={index}
                    className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
                >
                    <div className="aspect-[16/10] animate-pulse bg-stone-200" />
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-5 w-3/5 animate-pulse rounded bg-stone-200" />
                            <div className="h-5 w-16 animate-pulse rounded-full bg-stone-200" />
                        </div>
                        <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />
                        <div className="h-6 w-28 animate-pulse rounded bg-stone-200" />
                    </div>
                </article>
            ))}
        </div>
    );
};

export default BrowseCarsSkeleton;