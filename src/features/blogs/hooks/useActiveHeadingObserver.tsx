import { useEffect, useState } from "react";
import type { TocItem } from "@/features/blogs/types/TocItem";

export function useActiveHeadingObserver(tocItems: TocItem[]) {
  const [activeId, setActiveId] = useState<string | undefined>();

  useEffect(() => {
    if (!tocItems?.length) return;

    const ids = tocItems.map((x) => x.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const tocOffset =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--toc-offset"
        )
      ) || 96;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: `-${Math.max(0, tocOffset)}px 0px -70% 0px`,
        threshold: [0, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  return activeId;
}
