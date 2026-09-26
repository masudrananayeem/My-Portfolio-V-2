import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (clsx + tailwind-merge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Turn "My Project Title" -> "my-project-title" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format an ISO date range for experience/education entries */
export function formatDateRange(start: string, end: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
}

/** Cloudinary responsive URL helper: injects f_auto,q_auto + width transform */
export function cloudinaryUrl(
  baseUrl: string,
  opts: { width?: number; quality?: string } = {}
): string {
  if (!baseUrl.includes("/upload/")) return baseUrl;
  const transforms = ["f_auto", "q_auto" + (opts.quality ? `:${opts.quality}` : "")];
  if (opts.width) transforms.push(`w_${opts.width}`);
  return baseUrl.replace("/upload/", `/upload/${transforms.join(",")}/`);
}

/** Debounce helper for scroll/resize/mousemove handlers */
export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 150) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
