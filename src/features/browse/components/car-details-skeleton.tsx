const CarDetailsSkeleton = () => {
    return (
        <div className="app-container my-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="h-12 animate-pulse border-b border-stone-100 bg-stone-100" />
                        <div className="space-y-3 p-4">
                            <div className="h-11 animate-pulse rounded-lg bg-stone-200" />
                            <div className="h-11 animate-pulse rounded-lg bg-stone-200" />
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="h-12 animate-pulse border-b border-stone-100 bg-stone-100" />
                        <div className="space-y-3 p-4">
                            <div className="h-5 w-full animate-pulse rounded bg-stone-200" />
                            <div className="h-5 w-4/5 animate-pulse rounded bg-stone-200" />
                            <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 flex-1 space-y-8">
                    <div className="space-y-3">
                        <div className="aspect-[16/9] w-full animate-pulse rounded-xl bg-stone-200" />
                        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square animate-pulse rounded-md bg-stone-200"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-8 w-2/3 animate-pulse rounded bg-stone-200" />

                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="h-12 animate-pulse border-b border-stone-200 bg-stone-100" />
                        <div className="space-y-0">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-2 gap-4 px-4 py-4 md:grid-cols-4 ${index % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                                >
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-stone-200" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-stone-200" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="h-6 w-32 animate-pulse rounded bg-stone-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                        <div className="h-4 w-11/12 animate-pulse rounded bg-stone-200" />
                        <div className="h-4 w-4/5 animate-pulse rounded bg-stone-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsSkeleton;