// src/features/blog/utils/toc.ts

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function uniqueId(base: string, used: Set<string>) {
  let id = base || "section";
  let i = 2;

  while (used.has(id)) {
    id = `${base}-${i}`;
    i++;
  }

  used.add(id);
  return id;
}
