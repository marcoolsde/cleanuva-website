/**
 * Gallery media catalogue (P2B) — config-only, no CMS. Mixes real assets with
 * replaceable placeholder paths; missing files degrade gracefully (gradient
 * placeholder for images, poster/"coming soon" for video) so the build never
 * fails and nothing renders broken. NO customer logos, names, projects or data —
 * captions are generic. Product names (NuvaTrack-*) are never translated.
 */

export const GALLERY_CATEGORIES = ["robotics", "operation", "video", "exhibition"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  type: "image" | "video";
  /** Replaceable path; missing file → graceful placeholder. */
  src: string;
  /** Video poster (image). */
  poster?: string;
  /** Gallery.items.<id> — generic caption. */
  titleKey: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Robotics — product / detail
  { id: "rHero", category: "robotics", type: "image", src: "/images/robotics/r-series-hero.jpg", titleKey: "items.rHero" },
  { id: "uHero", category: "robotics", type: "image", src: "/images/robotics/u-series-hero.jpg", titleKey: "items.uHero" },
  { id: "spanHero", category: "robotics", type: "image", src: "/images/robotics/nuvaspan-hero.jpg", titleKey: "items.spanHero" },
  { id: "overview", category: "robotics", type: "image", src: "/images/robotics/overview-hero.jpg", titleKey: "items.overview" },

  // Field operation
  { id: "rOp1", category: "operation", type: "image", src: "/images/robotics/r-series-op-1.jpg", titleKey: "items.rOp1" },
  { id: "rOp2", category: "operation", type: "image", src: "/images/robotics/r-series-op-2.jpg", titleKey: "items.rOp2" },
  { id: "uOp1", category: "operation", type: "image", src: "/images/robotics/u-series-op-1.jpg", titleKey: "items.uOp1" },
  { id: "spanOp1", category: "operation", type: "image", src: "/images/robotics/nuvaspan-op-1.jpg", titleKey: "items.spanOp1" },

  // Video (graceful: poster + controls, no autoplay)
  { id: "rVid", category: "video", type: "video", src: "/videos/robotics/nuvatrack-r-demo.mp4", poster: "/images/robotics/r-series-hero.jpg", titleKey: "items.rVid" },
  { id: "uVid", category: "video", type: "video", src: "/videos/robotics/nuvatrack-u-demo.mp4", poster: "/images/robotics/u-series-poster.jpg", titleKey: "items.uVid" },
  { id: "spanVid", category: "video", type: "video", src: "/videos/robotics/nuvaspan-demo.mp4", poster: "/images/robotics/nuvaspan-hero.jpg", titleKey: "items.spanVid" },

  // Exhibitions — placeholders until real photos drop in
  { id: "exh1", category: "exhibition", type: "image", src: "/images/gallery/exhibition-1.jpg", titleKey: "items.exh1" },
  { id: "exh2", category: "exhibition", type: "image", src: "/images/gallery/exhibition-2.jpg", titleKey: "items.exh2" },
];
