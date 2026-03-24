// import React from "react";
// import { cn } from "@/lib/utils";

// type BrowseCardProps = {
//   label: string;
//   count?: number;
//   image?: string;
//   icon?: React.ReactNode;
//   active?: boolean;
//   className?: string;
//   onClick?: () => void;
// };

// const BrowseCard = React.memo(function BrowseCard({
//   label,
//   count,
//   image,
//   icon,
//   active,
//   className,
//   onClick,
// }: BrowseCardProps) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={cn(
//         "group flex min-h-[132px] w-full flex-col items-center justify-center rounded-xl border border-transparent bg-surface-2 px-3 py-4 text-center transition-all duration-200",
//         "hover:border-divider hover:bg-surface hover:shadow-sm",
//         "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
//         active && "border-primary/20 bg-primary/5 shadow-xs",
//         className,
//       )}
//     >
//       <div className="flex items-center justify-center w-full mb-3 overflow-hidden h-14">
//         {image ? (
//           <img
//             src={image}
//             alt=""
//             loading="lazy"
//             decoding="async"
//             className="h-full max-h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
//           />
//         ) : (
//           <div className="flex items-center justify-center w-12 h-12 text-text-muted">
//             {icon}
//           </div>
//         )}
//       </div>

//       <div className="text-sm font-medium line-clamp-1 text-text">{label}</div>

//       {typeof count === "number" && (
//         <div className="mt-1 text-sm text-text-muted">
//           ({count.toLocaleString()})
//         </div>
//       )}
//     </button>
//   );
// });

// export default BrowseCard;
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
  disabled?: boolean;
};

const BrowseCard = React.memo(function BrowseCard({
  label,
  count,
  image,
  icon,
  active = false,
  className,
  onClick,
  disabled = false,
}: BrowseCardProps) {
  const hasImage = Boolean(image);
  const hasIcon = Boolean(icon);
  const hasVisual = hasImage || hasIcon;
  const isCompact = !hasVisual;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border text-center transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",

        active
          ? "border-primary/25 bg-primary/5 shadow-sm"
          : "border-divider/70 bg-surface-2 hover:border-divider hover:bg-surface hover:shadow-sm",

        isCompact
          ? "min-h-[76px] px-3 py-3 sm:min-h-[84px]"
          : "min-h-[116px] px-3 py-3.5 sm:min-h-[124px]",

        className,
      )}
    >
      <div
        className={cn(
          "relative z-[1] flex h-full w-full flex-col items-center justify-center",
          isCompact ? "gap-1.5" : "gap-2.5",
        )}
      >
        {hasVisual ? (
          <div
            className={cn(
              "flex w-full items-center justify-center overflow-hidden",
              hasImage ? "h-12 sm:h-14" : "h-auto",
            )}
          >
            {hasImage ? (
              <img
                src={image}
                alt={label}
                loading="lazy"
                decoding="async"
                className={cn(
                  "w-auto object-contain transition-transform duration-200",
                  "h-full max-h-11 sm:max-h-12",
                  "group-hover:scale-[1.04]",
                )}
              />
            ) : (
              <div
                aria-hidden="true"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  "border border-divider/70 bg-surface text-text-muted",
                  "transition-all duration-200 group-hover:scale-[1.03] group-hover:bg-surface-1",
                  active && "border-primary/20 bg-primary/10 text-primary",
                )}
              >
                {icon}
              </div>
            )}
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-center max-w-full min-w-0 gap-1">
          <div
            className={cn(
              "max-w-full truncate text-center font-medium text-text",
              isCompact ? "text-sm sm:text-[15px]" : "text-sm sm:text-[15px]",
              count !== undefined ? "line-clamp-1" : "line-clamp-2",
            )}
            title={label}
          >
            {label}
          </div>

          {typeof count === "number" && (
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium",
                active
                  ? "bg-primary/10 text-primary"
                  : "bg-surface text-text-muted",
              )}
            >
              {count.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 rounded-full bg-primary/60 transition-transform duration-200",
          "group-hover:scale-x-100",
          active && "scale-x-100",
        )}
      />
    </button>
  );
});

export default BrowseCard;
