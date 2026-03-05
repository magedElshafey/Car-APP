import { useMemo } from "react";
import { slugify, uniqueId } from "@/features/blogs/utils/toc";

export type ContentSection = { heading: string; content: string };
export type ContentSectionWithId = ContentSection & { _id: string };

export function useSectionsWithIds(sections: ContentSection[]) {
  return useMemo<ContentSectionWithId[]>(() => {
    const used = new Set<string>();
    return (sections ?? []).map((sec, i) => {
      const base = slugify(sec.heading) || `section-${i + 1}`;
      return { ...sec, _id: uniqueId(base, used) };
    });
  }, [sections]);
}
