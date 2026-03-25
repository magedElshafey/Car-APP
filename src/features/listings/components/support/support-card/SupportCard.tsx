import React, { memo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SupportCardProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
  trailingIcon?: React.ReactNode;
};

function SupportCardComponent({
  title,
  description,
  icon,
  href,
  external = false,
  ariaLabel,
  trailingIcon,
}: SupportCardProps) {
  const cardContent = (
    <article
      className={cn(
        "group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-2xl border border-divider",
        "bg-card/80 p-5 backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-lg hover:shadow-primary/5",
        "focus-within:border-primary/30 focus-within:shadow-lg focus-within:shadow-primary/10",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          "bg-primary/10 text-primary ring-1 ring-primary/10",
          "transition-transform duration-300 group-hover:scale-105",
        )}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold truncate text-text">{title}</h3>

        {description ? (
          <p
            className={cn(
              "mt-1 text-sm leading-6 text-text-muted",
              "break-words [unicode-bidi:plaintext]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {trailingIcon ? (
        <div className="flex items-center justify-center">{trailingIcon}</div>
      ) : null}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition duration-300",
          "group-hover:ring-primary/10",
        )}
      />
    </article>
  );

  if (!href) {
    return (
      <div aria-label={ariaLabel} className="block">
        {cardContent}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        className={cn(
          "block rounded-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={href}
      aria-label={ariaLabel}
      className={cn(
        "block rounded-2xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      {cardContent}
    </Link>
  );
}

const SupportCard = memo(SupportCardComponent);

export default SupportCard;
