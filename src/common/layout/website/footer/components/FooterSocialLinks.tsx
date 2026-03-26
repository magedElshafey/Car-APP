import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { getSocialLinksFromSettings } from "../types/footer.social.types";

const FooterSocialLinks: React.FC = () => {
  const { t } = useTranslation();
  const { settings, isLoading } = useWebsiteSettings();

  const socialLinks = useMemo(() => {
    return getSocialLinksFromSettings(settings);
  }, [settings]);

  if (!isLoading && socialLinks.length === 0) return null;

  return (
    <section
      aria-labelledby="footer-social-title"
      className="p-5 border shadow-sm rounded-3xl border-border/70 bg-surface/80 backdrop-blur-sm sm:p-6"
    >
      <h3
        id="footer-social-title"
        className="mt-3 text-base font-semibold text-text"
      >
        {t("Stay connected")}
      </h3>

      <p className="mt-1 text-sm leading-6 text-text-muted">
        {t("Follow us for updates, featured listings, and more.")}
      </p>

      <ul className="flex flex-wrap gap-2 mt-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                aria-hidden="true"
                className="border h-11 w-11 animate-pulse rounded-2xl border-border bg-bg"
              />
            ))
          : socialLinks.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="
                    inline-flex h-11 w-11 items-center justify-center
                    rounded-2xl border border-border bg-bg text-text-muted
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:border-primary/30
                    hover:bg-primary/10 hover:text-primary
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-surface
                  "
                >
                  <item.Icon className="text-lg" aria-hidden="true" />
                </a>
              </li>
            ))}
      </ul>
    </section>
  );
};

export default React.memo(FooterSocialLinks);
