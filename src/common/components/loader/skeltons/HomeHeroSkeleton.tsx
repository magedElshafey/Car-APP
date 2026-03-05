import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const HomeHeroSkeleton = () => {
  return (
    <HeroLayout aria-hidden>
      <div
        className="
          mx-auto max-w-5xl
          min-h-[420px]
          rounded-card
          bg-bg-surface/70
          backdrop-blur-sm
          p-6 md:p-8
          shadow-soft
          animate-pulse
        "
      >
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="h-8 w-2/3 mx-auto rounded bg-border-subtle" />
          <div className="h-5 w-1/2 mx-auto rounded bg-border-subtle" />
        </div>

        {/* Search bar placeholder */}
        <div className="mt-10">
          <div className="h-12 w-full rounded-pill bg-border-subtle" />
          <div className="h-3 w-3/4 mx-auto rounded bg-border-subtle mt-3" />
        </div>

        {/* Featured words */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 w-20 rounded-pill bg-border-subtle" />
          ))}
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 w-24 rounded bg-border-subtle" />
          ))}
        </div>
      </div>
    </HeroLayout>
  );
};

export default HomeHeroSkeleton;
