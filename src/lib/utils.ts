import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function chunkArray<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) {
    return [Array.from(items)];
  }

  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    chunks.push(chunk);
  }

  return chunks;
}
