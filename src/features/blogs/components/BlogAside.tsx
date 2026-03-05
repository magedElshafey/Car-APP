import { useTranslation } from "react-i18next";
import type { TocItem } from "../types/TocItem";
import { jumpToId } from "../utils/jumpToId";

type Props = {
  tocItems: TocItem[];
  activeId?: string;
};

const BlogAside: React.FC<Props> = ({ tocItems, activeId }) => {
  const { t } = useTranslation();
  if (!tocItems.length) return null;

  return (
    <div className="rounded-card border border-border-subtle bg-bg-surface p-4">
      <h2 className="text-xs font-semibold mb-3 text-text-main">
        {t("On this page")}
      </h2>

      <ol className="space-y-1.5 text-xs">
        {tocItems.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => jumpToId(item.id)}
                className={[
                  "w-full flex gap-2 px-2 py-1 rounded text-left transition",
                  isActive
                    ? "bg-primary-soft text-primary font-semibold"
                    : "text-text-muted hover:bg-bg-alt",
                ].join(" ")}
              >
                <span>{i + 1}.</span>
                <span>{item.text}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BlogAside;
