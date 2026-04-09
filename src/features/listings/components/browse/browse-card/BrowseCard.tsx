import React from "react";
import { cn } from "@/lib/utils";

type BrowseCardProps = {
  label: string;
  count?: number;
  image?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const FALLBACK_IMAGE = "/images/image-folder.png";

const BrowseCard = React.memo(function BrowseCard({
  label,
  count,
  image,
  active = false,
  className,
  onClick,
  disabled = false,
}: BrowseCardProps) {
  const imgSrc = !image ? FALLBACK_IMAGE : image;
  console.log("image src", imgSrc);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "group w-full text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {/* Image Box */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border",
          "aspect-[4/3]", // prevents CLS
          active
            ? "border-primary/30"
            : "border-divider/70 group-hover:border-divider",
        )}
      >
        <img
          src={imgSrc}
          alt={label}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover",
            "transition-transform duration-300",
            "group-hover:scale-[1.05]",
          )}
        />

        {/* overlay for active state */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-colors duration-200",
            active ? "bg-primary/10" : "bg-transparent",
          )}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-1 mt-2 text-center">
        {/* Label */}
        <span
          className={cn(
            "max-w-full truncate font-medium text-text",
            "text-sm sm:text-[15px]",
          )}
          title={label}
        >
          {label}
        </span>

        {/* Count */}
        {typeof count === "number" && (
          <span
            className={cn(
              "mt-1 text-xs font-medium",
              active ? "text-primary" : "text-text-muted",
            )}
          >
            ({count.toLocaleString()})
          </span>
        )}
      </div>
    </button>
  );
});

export default BrowseCard;
