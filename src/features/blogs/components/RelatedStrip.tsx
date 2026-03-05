import { useTranslation } from "react-i18next";
const RelatedStrip: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("Blog.moreArticles", "More articles")}
      className="
        mt-10 md:mt-12
        border-t border-[color:var(--border-subtle)]
        bg-[color:var(--bg-subtle)]
      "
    >
      <div className="containerr py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--section-muted-color)]">
              {t("Blog.keepReadingLabel", "Keep reading")}
            </p>
            <h2 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
              {t(
                "Blog.keepReadingTitle",
                "More articles our patients found helpful"
              )}
            </h2>
          </div>
        </div>

        {/* cards placeholder – اربطها بالـ real data بعدين */}
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((idx) => (
            <article
              key={idx}
              className="
                rounded-2xl
                bg-[color:var(--bg-surface)]
                border border-[color:var(--border-subtle)]
                p-3 md:p-4
                shadow-sm
                hover:border-[color:var(--accent)]
                transition-colors
              "
            >
              <h3 className="text-sm font-semibold text-[color:var(--section-title-color)] mb-1">
                {t("Blog.sampleRelatedTitle", "Understanding cataracts")}
              </h3>
              <p className="text-[11px] text-[color:var(--section-muted-color)] line-clamp-3">
                {t(
                  "Blog.sampleRelatedExcerpt",
                  "Short explainer about how cataracts develop and when to seek assessment."
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedStrip;
