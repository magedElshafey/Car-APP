import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { FooterLinkGroup as FooterLinkGroupT } from "../types/footer.types";

type FooterLinkGroupProps = {
  group: FooterLinkGroupT;
};

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ group }) => {
  const { t } = useTranslation();

  if (!group.links.length) return null;

  return (
    <section aria-labelledby={`footer-group-${group.id}`}>
      <h3
        id={`footer-group-${group.id}`}
        className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-text-muted"
      >
        {t(group.title)}
      </h3>

      <ul className="space-y-2.5">
        {group.links.map((link) => (
          <li key={`${group.id}-${link.href}`}>
            <Link
              to={link.href}
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 rounded-lg  group text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5 w-1.5 rounded-full bg-primary/70
                  transition-transform duration-200 group-hover:scale-125
                "
              />
              <span>{t(link.label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default React.memo(FooterLinkGroup);
