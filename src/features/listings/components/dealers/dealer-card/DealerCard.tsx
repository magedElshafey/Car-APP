import React from "react";
import { cn } from "@/lib/utils";

type DealerCardProps = {
  name: string;
  city: string;
  logo: string;
  featured?: boolean;
  className?: string;
};

const DealerCard = React.memo(function DealerCard({
  name,
  city,
  logo,
  featured,
  className,
}: DealerCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-divider bg-surface shadow-xs transition hover:shadow-sm",
        className,
      )}
    >
      <div className="relative flex h-[164px] items-center justify-center border-b border-divider bg-surface-2 p-4">
        {featured ? (
          <span className="absolute px-2 py-1 text-xs font-medium text-white rounded-md right-3 top-3 bg-primary">
            المميزون
          </span>
        ) : null}

        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="max-h-[120px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="p-4 space-y-1 text-center">
        <h3 className="text-lg font-semibold line-clamp-1 text-text">{name}</h3>
        <p className="text-sm line-clamp-1 text-text-muted">{city}</p>
      </div>
    </article>
  );
});

export default DealerCard;
