import { useEffect, useState, useId } from "react";
import type { TocItem } from "../types/TocItem";
import { jumpToId } from "../utils/jumpToId";
import { useTranslation } from "react-i18next";

type Props = {
  tocItems: TocItem[];
  activeId?: string;
};

const MobileToc: React.FC<Props> = ({ tocItems, activeId }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!tocItems.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          lg:hidden fixed bottom-4 right-4 z-30
          rounded-pill
          bg-primary text-white
          px-4 py-2 text-xs font-semibold
          shadow-soft
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
      >
        {t("On this page")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            className="
              absolute bottom-0 w-full
              rounded-t-3xl
              bg-bg-surface
              border-t border-border-subtle
              p-4 max-h-[75vh] overflow-auto
            "
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-text-main">
                {t("On this page")}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="
                  h-9 w-9 rounded-xl
                  border border-border-subtle
                  bg-bg-surface
                  text-text-main
                  hover:bg-bg-alt
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                "
              >
                ✕
              </button>
            </div>

            <ol className="space-y-2">
              {tocItems.map((item, i) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        jumpToId(item.id);
                        setOpen(false);
                      }}
                      className={[
                        "w-full flex gap-2 rounded-xl px-3 py-2 text-sm text-left transition",
                        isActive
                          ? "bg-primary-soft text-primary font-semibold"
                          : "text-text-muted hover:bg-bg-alt",
                      ].join(" ")}
                    >
                      <span className="opacity-70">{i + 1}.</span>
                      <span className="line-clamp-2">{item.text}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileToc;
