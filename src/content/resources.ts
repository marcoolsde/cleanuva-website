/**
 * Resources landing categories (v1.1-C). Minimal — no blog engine, no case
 * studies. Categories that map to an existing page link there; the rest are
 * marked "coming soon". Copy resolves from the Resources.* messages namespace.
 */

export interface ResourceCategory {
  /** Message key under Resources.categories.* */
  key: string;
  /** lucide-react icon name. */
  icon: "Layers" | "Bot" | "FileText" | "Calculator" | "Lightbulb";
  status: "available" | "soon";
  /** Present only when status === "available". */
  href?: string;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { key: "platform", icon: "Layers", status: "available", href: "/platform" },
  { key: "robotics", icon: "Bot", status: "available", href: "/robotics/compare" },
  { key: "brochures", icon: "FileText", status: "soon" },
  { key: "roi", icon: "Calculator", status: "soon" },
  { key: "insights", icon: "Lightbulb", status: "soon" },
];
