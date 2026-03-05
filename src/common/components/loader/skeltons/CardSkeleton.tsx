import React from "react";

type Props = {
  lines?: number;
};

const CardSkeleton: React.FC<Props> = ({ lines = 2 }) => {
  return (
    <div
      className="
        rounded-card
        border border-border-subtle
        bg-bg-surface
        p-5
        space-y-3
      "
      aria-hidden
    >
      {/* Title */}
      <div className="h-4 w-3/4 rounded bg-border-subtle animate-pulse" />

      {/* Description */}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-full rounded bg-border-subtle animate-pulse"
        />
      ))}

      {/* Meta */}
      <div className="h-3 w-1/3 rounded bg-border-subtle animate-pulse mt-2" />
    </div>
  );
};

export default CardSkeleton;
