import React from "react";
import { cn } from "@/lib/utils";

type BrowseCardSkeletonProps = {
  className?: string;
  hasVisual?: boolean;
  hasCount?: boolean;
  compact?: boolean;
};

const BrowseCardSkeleton = React.memo(function BrowseCardSkeleton({
  className,
  hasVisual = true,
  hasCount = true,
  compact = false,
}: BrowseCardSkeletonProps) {
  const isCompact = compact || !hasVisual;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-divider/70 bg-surface-2",
        isCompact
          ? "min-h-[76px] px-3 py-3 sm:min-h-[84px]"
          : "min-h-[116px] px-3 py-3.5 sm:min-h-[124px]",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center",
          isCompact ? "gap-1.5" : "gap-2.5",
        )}
      >
        {hasVisual ? (
          <div
            className={cn(
              "flex w-full items-center justify-center overflow-hidden",
              "h-12 sm:h-14",
            )}
          >
            <div className="w-16 h-full rounded-md max-h-11 sm:max-h-12 sm:w-20 animate-pulse bg-surface" />
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-center max-w-full min-w-0 gap-1">
          <div
            className={cn(
              "animate-pulse rounded-full bg-surface",
              hasCount ? "h-4 w-24 sm:w-28" : "h-4 w-28 sm:w-32",
            )}
          />

          {hasCount && (
            <div className="h-6 rounded-full w-14 animate-pulse bg-surface" />
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 h-px rounded-full pointer-events-none inset-x-4 bg-divider/60"
      />
    </div>
  );
});

export default BrowseCardSkeleton;
