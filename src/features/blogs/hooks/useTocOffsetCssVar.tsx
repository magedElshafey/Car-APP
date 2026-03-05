import { useEffect } from "react";

export function useTocOffsetCssVar(dep?: unknown) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const h = header?.getBoundingClientRect().height ?? 96;
    document.documentElement.style.setProperty("--toc-offset", `${h}px`);
  }, [dep]);
}
