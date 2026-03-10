import React from "react";
import { cn } from "@/lib/utils";

type BrowseCardProps = {
  label: string;
  count?: number;
  image?: string;
  icon?: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

const BrowseCard = React.memo(function BrowseCard({
  label,
  count,
  image,
  icon,
  active,
  className,
  onClick,
}: BrowseCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex min-h-[132px] w-full flex-col items-center justify-center rounded-xl border border-transparent bg-surface-2 px-3 py-4 text-center transition-all duration-200",
        "hover:border-divider hover:bg-surface hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "border-primary/20 bg-primary/5 shadow-xs",
        className,
      )}
    >
      <div className="flex items-center justify-center w-full mb-3 overflow-hidden h-14">
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full max-h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 text-text-muted">
            {icon}
          </div>
        )}
      </div>

      <div className="text-sm font-medium line-clamp-1 text-text">{label}</div>

      {typeof count === "number" && (
        <div className="mt-1 text-sm text-text-muted">
          ({count.toLocaleString()})
        </div>
      )}
    </button>
  );
});

export default BrowseCard;
