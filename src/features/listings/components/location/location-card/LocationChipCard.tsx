import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
type LocationChipCardProps = {
  label: string;
  href?: string;
  className?: string;
};

export default function LocationChipCard({
  label,
  href,
  className,
}: LocationChipCardProps) {
  const content = (
    <div
      className={cn(
        "flex h-9 items-center justify-center rounded-md bg-surface-2 px-4 text-center",
        "text-sm font-medium text-text transition-colors",
        "hover:bg-surface",
        className,
      )}
    >
      <span className="truncate">{label}</span>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      to={href}
      aria-label={label}
      className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {content}
    </Link>
  );
}
