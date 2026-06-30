/**
 * Robotics media inventory generator.
 *   pnpm media:inventory
 * Scans public/images/robotics + public/videos/robotics, then writes
 * docs/website/robotics-media-inventory.md combining the on-disk file list with
 * a hand-maintained usage table (which page/component references each asset).
 * No AST parsing — update USAGE below when robotics media wiring changes.
 */
import { readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const IMG_DIR = "public/images/robotics";
const VID_DIR = "public/videos/robotics";
const OUT = "docs/website/robotics-media-inventory.md";

const list = (dir) =>
  existsSync(join(ROOT, dir))
    ? readdirSync(join(ROOT, dir)).filter((f) => !f.startsWith(".")).sort()
    : [];

const has = (publicPath) => existsSync(join(ROOT, "public", publicPath.replace(/^\//, "")));

// Hand-maintained: where each asset is referenced + replacement guidance.
// real = genuine product asset; temp = placeholder/reused until a real shot exists.
const USAGE = {
  rSeries: [
    { slot: "Hero (full-bleed)", path: "/images/robotics/r-series-hero.jpg", ref: "app/[locale]/robotics/r-series/page.tsx", kind: "real", note: "Main R-Series product photo." },
    { slot: "Model card — NuvaTrack-R", path: "/images/robotics/r-series-hero.jpg", ref: "app/[locale]/robotics/r-series/page.tsx", kind: "real", note: "Shares the hero photo." },
    { slot: "Model card — NuvaTrack-R Pro", path: "/images/robotics/r-series-hero.jpg", ref: "app/[locale]/robotics/r-series/page.tsx", kind: "temp", note: "Reuses R photo — replace with a real R Pro shot." },
    { slot: "Demo media section — video", path: "/videos/robotics/nuvatrack-r-demo.mp4", ref: "content/compare.ts → R_DEMO_MEDIA (ProductDemoMedia)", kind: "real", note: "Large demo clip below the model picker." },
    { slot: "Demo media section — poster", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → R_DEMO_MEDIA", kind: "real", note: "Shown before/while paused." },
    { slot: "In operation — video", path: "/videos/robotics/nuvatrack-r-demo.mp4", ref: "content/compare.ts → R_SERIES_MEDIA", kind: "real", note: "Poster: r-series-hero.jpg." },
    { slot: "In operation — image", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → R_SERIES_MEDIA", kind: "real", note: "Gallery still." },
    { slot: "In operation — image", path: "/images/robotics/r-series-op-1.jpg", ref: "content/compare.ts → R_SERIES_MEDIA", kind: "real", note: "Field operation photo." },
    { slot: "In operation — image", path: "/images/robotics/r-series-op-2.jpg", ref: "content/compare.ts → R_SERIES_MEDIA", kind: "real", note: "Cleaning detail photo." },
  ],
  uSeries: [
    { slot: "Hero (full-bleed)", path: "/images/robotics/u-series-hero.jpg", ref: "app/[locale]/robotics/u-series/page.tsx", kind: "real", note: "Main U-Series product photo." },
    { slot: "Demo media section — video", path: "/videos/robotics/nuvatrack-u-demo.mp4", ref: "content/compare.ts → U_DEMO_MEDIA (ProductDemoMedia)", kind: "real", note: "Large demo clip in the first half of the page." },
    { slot: "Demo media section — poster", path: "/images/robotics/u-series-poster.jpg", ref: "content/compare.ts → U_DEMO_MEDIA", kind: "real", note: "Shown before/while paused (falls back to u-series-hero.jpg if removed)." },
    { slot: "In operation — video", path: "/videos/robotics/nuvatrack-u-demo.mp4", ref: "content/compare.ts → U_SERIES_MEDIA", kind: "real", note: "Poster: u-series-poster.jpg." },
    { slot: "In operation — image", path: "/images/robotics/u-series-hero.jpg", ref: "content/compare.ts → U_SERIES_MEDIA", kind: "real", note: "Gallery still." },
    { slot: "In operation — image", path: "/images/robotics/u-series-op-1.jpg", ref: "content/compare.ts → U_SERIES_MEDIA", kind: "real", note: "Field operation photo." },
  ],
  nuvaSpan: [
    { slot: "Hero (full-bleed)", path: "/images/robotics/overview-hero.jpg", ref: "app/[locale]/robotics/nuvaspan/page.tsx", kind: "temp", note: "Overview stand-in — replace with a real NuvaSpan shot (suspended/bridge)." },
    { slot: "Demo media section — image (current)", path: "/images/robotics/overview-hero.jpg", ref: "content/compare.ts → NUVASPAN_DEMO_MEDIA (ProductDemoMedia)", kind: "temp", note: "Real still shown now; large media block in the first half of the page." },
    { slot: "Demo media section — future video slot", path: "/videos/robotics/nuvaspan-demo.mp4", ref: "content/compare.ts → NUVASPAN_DEMO_MEDIA.futureVideo", kind: "future", note: "Drop a clip here, then set NUVASPAN_DEMO_MEDIA.type='video' + src=this path — no page edit." },
  ],
  overview: [
    { slot: "Hero (full-bleed)", path: "/images/robotics/overview-hero.jpg", ref: "app/[locale]/robotics/page.tsx", kind: "real", note: "Utility-scale site shot for the index hero." },
    { slot: "Product card — NuvaTrack-R", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → OVERVIEW_MODELS", kind: "real", note: "R-Series photo." },
    { slot: "Product card — NuvaTrack-R Pro", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → OVERVIEW_MODELS", kind: "temp", note: "Reuses R photo — replace with a real R Pro shot." },
    { slot: "Product card — NuvaTrack-U", path: "/images/robotics/u-series-hero.jpg", ref: "content/compare.ts → OVERVIEW_MODELS", kind: "real", note: "U-Series photo." },
    { slot: "Product card — NuvaSpan", path: "/images/robotics/overview-hero.jpg", ref: "content/compare.ts → OVERVIEW_MODELS", kind: "temp", note: "Overview stand-in — replace with a real NuvaSpan shot (suspended/bridge)." },
  ],
  compare: [
    { slot: "NuvaTrack-R card", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → COMPARE_MODELS", kind: "real", note: "R-Series photo." },
    { slot: "NuvaTrack-R Pro card", path: "/images/robotics/r-series-hero.jpg", ref: "content/compare.ts → COMPARE_MODELS", kind: "temp", note: "Reuses R photo — replace with a real R Pro shot." },
    { slot: "NuvaTrack-U card", path: "/images/robotics/u-series-hero.jpg", ref: "content/compare.ts → COMPARE_MODELS", kind: "real", note: "U-Series photo." },
    { slot: "NuvaSpan card", path: "/images/robotics/overview-hero.jpg", ref: "content/compare.ts → COMPARE_MODELS", kind: "temp", note: "Overview stand-in — replace with a real NuvaSpan shot (suspended/bridge)." },
  ],
};

const mark = (p, kind) =>
  has(p) ? "✓" : kind === "future" ? "— (not yet)" : "✗ missing";
const tag = (k) =>
  k === "temp" ? "⚠️ temp/reused" : k === "future" ? "🔜 future slot" : "real";

function table(rows) {
  const head = "| Slot | File | Exists | Type | Referenced in | Replace with |\n|---|---|---|---|---|---|";
  const body = rows
    .map((r) => `| ${r.slot} | \`${r.path}\` | ${mark(r.path, r.kind)} | ${tag(r.kind)} | \`${r.ref}\` | ${r.note} |`)
    .join("\n");
  return `${head}\n${body}`;
}

const imgs = list(IMG_DIR);
const vids = list(VID_DIR);
const now = new Date().toISOString().slice(0, 10);

const md = `# Robotics media inventory

_Generated by \`pnpm media:inventory\` on ${now}. Edit the USAGE table in
\`scripts/generate-robotics-media-inventory.mjs\`, then re-run to refresh._

Drop a real file at the same path (same name) to replace any asset — no code change needed.

## Files on disk — \`${IMG_DIR}/\`
${imgs.length ? imgs.map((f) => `- \`${f}\``).join("\n") : "- (none)"}

## Files on disk — \`${VID_DIR}/\`
${vids.length ? vids.map((f) => `- \`${f}\``).join("\n") : "- (none)"}

## Robotics overview (\`/robotics\`)
${table(USAGE.overview)}

## R-Series page (\`/robotics/r-series\`)
${table(USAGE.rSeries)}

## U-Series page (\`/robotics/u-series\`)
${table(USAGE.uSeries)}

## NuvaSpan page (\`/robotics/nuvaspan\`)
${table(USAGE.nuvaSpan)}

## Compare page (\`/robotics/compare\`)
${table(USAGE.compare)}

## Future video slots (drop a clip to upgrade — no page edit)
- **NuvaSpan demo** — \`/videos/robotics/nuvaspan-demo.mp4\`. Currently the demo block shows a real still (\`overview-hero.jpg\`). Add the clip, then in \`content/compare.ts\` set \`NUVASPAN_DEMO_MEDIA.type = "video"\` and \`src = "/videos/robotics/nuvaspan-demo.mp4"\`.

## Replacement priorities (temp / reused → real)
- **NuvaTrack-R Pro** — real R Pro product photo (used on R-Series model card + Compare card).
- **NuvaSpan** — real suspended/bridge product photo (hero + Compare card currently use \`overview-hero.jpg\`).
- Optionally a higher-resolution \`r-series-hero.jpg\` for the full-bleed hero.
`;

mkdirSync(join(ROOT, "docs/website"), { recursive: true });
writeFileSync(join(ROOT, OUT), md);
console.log(`Wrote ${OUT} (${imgs.length} images, ${vids.length} videos).`);
