import React, { useId, useMemo } from "react";
import useNewsLetterLogic from "../../newsletter/logic/useNewsLetterLogic";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { Link } from "react-router-dom";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { SOCIAL_META, SocialKey } from "../../types/footer.social";

type FooterConnectSectionProps = {
  buyMeCoffeeUrl?: string;
};

const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  buyMeCoffeeUrl = "https://ko-fi.com/wisefollowup",
}) => {
  const emailId = useId();
  const { settings, isLoading } = useWebsiteSettings();
  const { t } = useTranslation();

  const {
    states: { isValid, isTouched, email, isPending },
    handlers: { handleBlur, handleInputChange, handleSubmit },
  } = useNewsLetterLogic();

  const showError = !isValid && isTouched;

  /* ================= SOCIAL LINKS FROM SETTINGS ================= */
  function isNotNull<T>(value: T | null): value is T {
    return value !== null;
  }

  const socialLinks = useMemo(() => {
    if (!settings) return [];

    return (Object.keys(SOCIAL_META) as SocialKey[])
      .map((key) => {
        const href = settings[key];
        if (!href) return null;

        return {
          key,
          href,
          ...SOCIAL_META[key],
        };
      })
      .filter(isNotNull); // ✅ TypeScript فهم خلاص
  }, [settings]);

  const hasSocial = isLoading || socialLinks.length > 0;

  return (
    <section
      aria-label="Stay connected"
      className="mt-6 grid gap-3 md:grid-cols-3"
    >
      {/* ================= NEWSLETTER ================= */}
      <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          {t("Newsletter")}
        </p>

        <h3 className="mt-2 text-sm font-semibold text-text-main">
          {t("Stay in the loop")}
        </h3>

        <p className="mt-1 text-xs text-text-muted leading-relaxed">
          {t(
            "Occasional updates when we publish new leaflets or tools. No spam.",
          )}
        </p>

        <form onSubmit={handleSubmit} className="mt-3">
          <label htmlFor={emailId} className="sr-only">
            {t("Email address")}
          </label>

          <div className="relative">
            <input
              id={emailId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`
                w-full h-10 rounded-pill
                border border-border-subtle bg-bg-surface
                px-3 ${i18n.language === "en" ? "pr-24" : "pe-24"}
                text-sm text-text-main
                placeholder:text-text-muted
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary
                focus:ring-offset-2 focus:ring-offset-bg-page
                ${showError ? "border-red-500" : ""}
              `}
            />

            <button
              type="submit"
              aria-busy={isPending}
              disabled={isPending || !email.trim() || !isValid}
              className={`
                absolute ${i18n.language === "en" ? "right-1" : "left-1"}
                top-1/2 -translate-y-1/2
                h-8 px-3
                rounded-pill bg-primary
                text-xs font-semibold text-white
                shadow-soft hover:brightness-110
                disabled:opacity-60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              `}
            >
              {isPending ? "…" : t("Subscribe")}
            </button>
          </div>

          {showError && (
            <span role="alert" className="text-xs text-red-600 mt-1 block">
              {t("Please enter a valid email")}
            </span>
          )}
        </form>
      </div>

      {/* ================= SOCIAL ================= */}
      {hasSocial && (
        <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {t("Social")}
          </p>

          <h3 className="mt-2 text-sm font-semibold text-text-main">
            {t("Follow Wise Follow Up")}
          </h3>

          <p className="mt-1 text-xs text-text-muted leading-relaxed">
            {t("New leaflets, updates, and improvements.")}
          </p>

          <ul className="mt-3 grid grid-cols-3 gap-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <li
                    key={i}
                    aria-hidden
                    className="h-9 rounded-pill bg-border-subtle animate-pulse"
                  />
                ))
              : socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="
                        inline-flex h-9 w-full items-center justify-center gap-2
                        rounded-pill border border-border-subtle bg-bg-surface
                        text-xs text-text-muted
                        hover:bg-primary-soft hover:text-primary
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      "
                    >
                      <s.Icon className="text-sm" aria-hidden />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
      )}

      {/* ================= SUPPORT ================= */}
      <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          {t("Support")}
        </p>

        <h3 className="mt-2 text-sm font-semibold text-text-main">
          {t("Help us keep it free")}
        </h3>

        <p className="mt-1 text-xs text-text-muted leading-relaxed">
          {t(
            "If you find the leaflets helpful, you can support maintenance and updates.",
          )}
        </p>

        <a
          href={buyMeCoffeeUrl}
          target="_blank"
          rel="noreferrer"
          className="
            mt-3 inline-flex h-10 w-full items-center justify-center gap-2
            rounded-pill bg-primary px-4
            text-sm font-semibold text-white
            shadow-soft hover:brightness-110
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          "
        >
          <span aria-hidden>☕</span>
          {t("Buy us a Kofi")}
        </a>

        <p className="mt-2 text-[11px] text-text-muted">
          {t("Prefer email?")}{" "}
          <Link
            to="/contact-us"
            className="
              text-primary hover:underline
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
          >
            {t("Contact us")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default FooterConnectSection;
