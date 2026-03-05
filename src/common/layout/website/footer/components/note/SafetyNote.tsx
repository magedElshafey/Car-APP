import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";

const SafetyNote: React.FC = () => {
  const { settings, isLoading } = useWebsiteSettings();

  const description = settings?.footer_disclaimer_description;
  const plainText = settings?.footer_disclaimer_plain_text;
  const focusOn = settings?.footer_disclaimer_focus_on;

  const hasContent = Boolean(description || plainText || focusOn);

  // لو مفيش داتا خالص ومش loading → منرندرش حاجة
  if (!isLoading && !hasContent) return null;

  return (
    <section
      aria-label="Safety note"
      className="
        mt-6 rounded-card bg-bg-page border border-border-subtle
        px-4 py-3 sm:px-5 sm:py-3.5
       
      "
    >
      {/* ================= LEFT ================= */}
      <div className="flex items-center">
        {/* Icon (fixed size → no CLS) */}
        <span
          aria-hidden
          className="
            mt-0.5 inline-flex h-6 w-6 shrink-0
            items-center justify-center
            rounded-full bg-primary-soft
            text-xs font-semibold text-primary
          "
        >
          i
        </span>

        {/* Text */}
        {isLoading ? (
          <div aria-hidden className="space-y-1">
            <div className="h-3 w-64 rounded bg-border-subtle animate-pulse" />
            <div className="h-3 w-52 rounded bg-border-subtle animate-pulse" />
          </div>
        ) : description ? (
          <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {/* ================= RIGHT ================= */}
      {(isLoading || plainText || focusOn) && (
        <div className="flex flex-wrap gap-2 text-[11px] mt-3">
          {isLoading ? (
            <>
              <span
                aria-hidden
                className="h-6 w-28 rounded-pill bg-border-subtle animate-pulse"
              />
              <span
                aria-hidden
                className="h-6 w-24 rounded-pill bg-border-subtle animate-pulse"
              />
            </>
          ) : (
            <>
              {plainText && (
                <span
                  className="
                    inline-flex items-center
                    rounded-pill bg-bg-surface
                    px-3 py-1
                    border border-border-subtle
                    text-text-muted
                  "
                >
                  ✅ {plainText}
                </span>
              )}

              {focusOn && (
                <span
                  className="
                    inline-flex items-center
                    rounded-pill bg-bg-surface
                    px-3 py-1
                    border border-border-subtle
                    text-text-muted
                  "
                >
                  👁️ {focusOn}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default SafetyNote;
