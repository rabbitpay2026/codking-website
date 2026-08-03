import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names, resolving Tailwind conflicts last-wins.
 *
 * This is the path Shadcn UI and Magic UI components import (`@/lib/utils`),
 * so it must stay at this location.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
