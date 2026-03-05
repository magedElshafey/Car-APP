export function jumpToId(raw: string) {
  const id = decodeURIComponent(raw).split("#").pop()?.replace(/^#/, "") || "";
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const rawOffset =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--toc-offset")
    ) || 96;

  const offset = rawOffset + 16;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: "smooth" });

  // ✅ update URL hash safely
  if (typeof history !== "undefined") {
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
  }
}
