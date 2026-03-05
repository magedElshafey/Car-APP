import React from "react";

type Props = {
  lines?: number;
};

const VisionMissionSkeletonSection = () => {
  return (
    <section className="py-5 md:my-6 lg:py-7 xl:py-8 2xl:py-10">
      <div className="containerr">
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <VisionMissionSkeleton key={i} lines={3} />
          ))}
        </div>
      </div>
    </section>
  );
};
const VisionMissionSkeleton: React.FC<Props> = ({ lines = 2 }) => {
  return (
    <div
      aria-hidden
      className="
        rounded-card
        bg-bg-surface
        p-8
        shadow-soft
        space-y-4
        animate-pulse
      "
    >
      {/* Title */}
      <div className="h-5 w-2/3 rounded bg-border-subtle" />

      {/* Description */}
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 w-full rounded bg-border-subtle" />
      ))}
    </div>
  );
};
export default VisionMissionSkeletonSection;
