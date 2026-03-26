import { cn } from "@/lib/utils";

// =========================
// Skeleton Components
// =========================

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-surface-2", className)} />
  );
}

function BlogHeroSkeleton() {
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-[320px] md:h-[420px]" />

        <div className="absolute bottom-0 w-full p-6 space-y-3 md:p-8">
          <Skeleton className="w-2/3 h-6" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
    </section>
  );
}

function BlogContentSkeleton() {
  return (
    <div className="space-y-4 lg:col-span-2">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
      <Skeleton className="w-4/6 h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-2/3 h-4" />
    </div>
  );
}

function BlogSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-28 rounded-2xl" />
      <Skeleton className="w-full h-40 rounded-2xl" />
      <Skeleton className="w-full h-20 rounded-2xl" />
    </div>
  );
}

// =========================
// Full Page Skeleton
// =========================

export default function BlogDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <main className="max-w-5xl px-4 py-10 mx-auto">
        <BlogHeroSkeleton />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <BlogContentSkeleton />
          <BlogSidebarSkeleton />
        </div>
      </main>
    </div>
  );
}
