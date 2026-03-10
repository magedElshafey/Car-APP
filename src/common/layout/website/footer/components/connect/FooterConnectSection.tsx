import React, { useId, useMemo } from "react";
import useNewsLetterLogic from "../../newsletter/logic/useNewsLetterLogic";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { SOCIAL_META, SocialKey } from "../../types/footer.social";

type FooterConnectSectionProps = {
  buyMeCoffeeUrl?: string;
};

const FooterConnectSection: React.FC<FooterConnectSectionProps> = () => {
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
      .filter(isNotNull);
  }, [settings]);

  const hasSocial = isLoading || socialLinks.length > 0;

  return (
    <section
      aria-label="Stay connected"
      className="grid gap-3 mt-6 md:grid-cols-2"
    >
      {/* ================= NEWSLETTER ================= */}
      <div className="p-4 border rounded-card border-border-subtle bg-bg-page sm:p-5 shadow-soft">
        <p className="text-xs font-semibold tracking-wide uppercase text-text-muted">
          {t("Newsletter")}
        </p>

        <h3 className="mt-2 text-sm font-semibold text-text-main">
          {t("Stay in the loop")}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-text-muted">
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
            <span role="alert" className="block mt-1 text-xs text-red-600">
              {t("Please enter a valid email")}
            </span>
          )}
        </form>
      </div>

      {/* ================= SOCIAL ================= */}
      {hasSocial && (
        <div className="p-4 border rounded-card border-border-subtle bg-bg-page sm:p-5 shadow-soft">
          <p className="text-xs font-semibold tracking-wide uppercase text-text-muted">
            {t("Social")}
          </p>

          <h3 className="mt-2 text-sm font-semibold text-text-main">
            {t("Follow Wise Follow Up")}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            {t("New leaflets, updates, and improvements.")}
          </p>

          <ul className="grid grid-cols-3 gap-2 mt-3">
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
                      className="inline-flex items-center justify-center w-full gap-2 text-xs border h-9 rounded-pill border-border-subtle bg-bg-surface text-text-muted hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <s.Icon className="text-sm" aria-hidden />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FooterConnectSection;
