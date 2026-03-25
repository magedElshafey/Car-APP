import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "@/common/components/logo/Logo";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
const FooterBrand: React.FC = () => {
  const { t } = useTranslation();
  const { settings } = useWebsiteSettings();

  return (
    <section
      aria-labelledby="footer-brand-title"
      className="p-5 border shadow-sm rounded-3xl border-border/70 bg-surface/80 backdrop-blur-sm sm:p-6"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
        aria-label={t("Go to homepage")}
      >
        <Logo src={settings?.site_logo || "/images/logo.png"} />
      </Link>

      <h2
        id="footer-brand-title"
        className="mt-4 text-lg font-semibold tracking-tight text-text"
      >
        {t("Your trusted automotive marketplace")}
      </h2>

      <p className="max-w-md mt-2 text-sm leading-6 text-text-muted">
        {t(
          "Discover new cars, used cars, and other vehicles through a fast, modern, and easy browsing experience.",
        )}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        <span
          className="
            inline-flex items-center rounded-full border border-border
            bg-bg px-3 py-1.5 text-xs font-medium text-text-muted
          "
        >
          {t("Modern UI")}
        </span>

        <span
          className="
            inline-flex items-center rounded-full border border-border
            bg-bg px-3 py-1.5 text-xs font-medium text-text-muted
          "
        >
          {t("Fast browsing")}
        </span>

        <span
          className="
            inline-flex items-center rounded-full border border-border
            bg-bg px-3 py-1.5 text-xs font-medium text-text-muted
          "
        >
          {t("Trusted listings")}
        </span>
      </div>
    </section>
  );
};

export default React.memo(FooterBrand);
