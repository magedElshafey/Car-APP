import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const AboutHeroSkeleton = () => {
  return (
    <HeroLayout minHeight="min-h-[80vh]">
      <div className="relative containerr pt-section-y pb-40 animate-pulse">
        {/* Center content */}
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="h-10 w-3/4 mx-auto bg-gray-200 rounded" />
          <div className="h-10 w-2/3 mx-auto bg-gray-200 rounded" />

          <div className="mt-6 space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-4/6 bg-gray-200 rounded mx-auto" />
          </div>
        </div>

        {/* Desktop founder images placeholders */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            hidden lg:flex
            justify-between
            items-end
          "
        >
          <SkeletonFounderImage align="left" />
          <SkeletonFounderImage align="right" />
        </div>

        {/* Mobile images */}
        <div className="mt-16 grid gap-8 lg:hidden">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="
                w-full max-w-sm mx-auto
                aspect-[3/4]
                bg-gray-200
                rounded-card
                shadow-soft
              "
            />
          ))}
        </div>
      </div>
    </HeroLayout>
  );
};

export default AboutHeroSkeleton;

/* -------------------------------------------------------------------------- */

function SkeletonFounderImage({ align }: { align: "left" | "right" }) {
  return (
    <div
      className={`
        relative
        w-[280px] xl:w-[340px]
        ${align === "left" ? "ml-6 xl:ml-12" : "mr-6 xl:mr-12"}
      `}
    >
      <div
        className="
          w-full
          h-[520px] xl:h-[620px]
          bg-gray-300
          rounded-t-[2rem]
        "
      />
    </div>
  );
}
