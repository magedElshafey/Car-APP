import React, { useCallback, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem<TKey extends string> = {
  id: TKey;
  label: string;
};

type TabbedSectionProps<TKey extends string> = {
  tabs: readonly TabItem<TKey>[];
  defaultTabId?: TKey;
  ariaLabel: string;
  className?: string;
  tabsClassName?: string;
  panelClassName?: string;
  headerClassName?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: (activeTab: TKey) => React.ReactNode;
};

export function TabbedSection<TKey extends string>({
  tabs,
  defaultTabId,
  ariaLabel,
  className,
  tabsClassName,
  panelClassName,
  headerClassName,
  title,
  action,
  children,
}: TabbedSectionProps<TKey>) {
  const generatedId = useId();

  const initialTab = useMemo(() => {
    return defaultTabId ?? tabs[0]?.id;
  }, [defaultTabId, tabs]);

  const [activeTab, setActiveTab] = useState<TKey>(initialTab as TKey);

  const activeIndex = useMemo(() => {
    return Math.max(
      0,
      tabs.findIndex((tab) => tab.id === activeTab),
    );
  }, [tabs, activeTab]);

  const isRTL =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  const onKeyDownTabs = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!tabs.length) return;

      let nextIndex = activeIndex;

      if (e.key === "ArrowRight") {
        nextIndex = isRTL
          ? (activeIndex - 1 + tabs.length) % tabs.length
          : (activeIndex + 1) % tabs.length;
      }

      if (e.key === "ArrowLeft") {
        nextIndex = isRTL
          ? (activeIndex + 1) % tabs.length
          : (activeIndex - 1 + tabs.length) % tabs.length;
      }

      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex !== activeIndex) {
        e.preventDefault();
        const nextTab = tabs[nextIndex];
        setActiveTab(nextTab.id);

        const nextBtn = document.getElementById(
          `${generatedId}-tab-${String(nextTab.id)}`,
        );
        nextBtn?.focus();
      }
    },
    [tabs, activeIndex, isRTL, generatedId],
  );

  if (!tabs.length) return null;

  return (
    <section className={cn("w-full", className)} aria-label={ariaLabel}>
      {(title || action) && (
        <div
          className={cn(
            "mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between",
            headerClassName,
          )}
        >
          {title ? (
            <div className="text-2xl font-bold text-text md:text-4xl">
              {title}
            </div>
          ) : (
            <div />
          )}

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}

      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDownTabs}
        className={cn(
          "scrollbar-none flex w-full items-center gap-6 overflow-x-auto border-b border-divider",
          tabsClassName,
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabId = `${generatedId}-tab-${String(tab.id)}`;
          const panelId = `${generatedId}-panel-${String(tab.id)}`;

          return (
            <button
              key={String(tab.id)}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative shrink-0 px-1 pb-3 pt-1 text-sm font-medium transition-colors md:text-base",
                isActive ? "text-primary" : "text-text-muted hover:text-text",
              )}
            >
              {tab.label}

              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-opacity",
                  isActive ? "bg-primary opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${generatedId}-panel-${String(activeTab)}`}
        role="tabpanel"
        aria-labelledby={`${generatedId}-tab-${String(activeTab)}`}
        className={cn("pt-4 md:pt-5", panelClassName)}
      >
        {children(activeTab)}
      </div>
    </section>
  );
}
