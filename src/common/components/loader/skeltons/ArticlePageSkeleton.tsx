import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const ArticlePageSkeleton = () => {
  return (
    <>
      {/* Header */}
      <HeroLayout minHeight="min-h-[30vh]">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-32 rounded bg-border-subtle" />
          <div className="h-10 w-3/4 rounded bg-border-subtle" />
          <div className="h-4 w-2/3 rounded bg-border-subtle" />

          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-full bg-border-subtle" />
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-border-subtle" />
              <div className="h-3 w-24 rounded bg-border-subtle" />
            </div>
          </div>
        </div>
      </HeroLayout>

      {/* Content */}
      <main className="containerr mt-8 lg:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Article */}
          <div className="col-span-4 space-y-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-border-subtle" />
            ))}
          </div>

          {/* Aside */}
          <aside className="hidden lg:block space-y-3 animate-pulse">
            <div className="h-4 w-24 rounded bg-border-subtle" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-full rounded bg-border-subtle" />
            ))}
          </aside>
        </div>
      </main>
    </>
  );
};

export default ArticlePageSkeleton;
