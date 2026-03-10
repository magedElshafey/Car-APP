import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SupportCardProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
};

export default function SupportCard({
  title,
  description,
  icon,
  href,
}: SupportCardProps) {
  const content = (
    <article
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-divider",
        "bg-white p-5 transition-colors duration-300",
        "hover:bg-gray/10",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          "bg-gray/10 text-primary",
        )}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-primary">{title}</span>

        {description && (
          <span className="text-sm text-text-muted">{description}</span>
        )}
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link
      to={href}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      {content}
    </Link>
  );
}
