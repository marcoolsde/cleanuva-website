import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { ProductVideo } from "@/components/sections/product-video";
import { MediaFrame } from "@/components/robotics/media-frame";
import { cn } from "@/lib/utils";
import type { DemoMedia } from "@/content/compare";

/**
 * Large product "Demo / media" block shared across every robotics product page
 * (R-Series, U-Series, NuvaSpan) so the three pages read as one system. Dark,
 * near-full-width frame under a title + subtitle.
 *
 * - `media.type === "video"` → autoplaying muted demo clip (ProductVideo), which
 *   already degrades to its poster + a quiet "coming soon" note if the file is
 *   missing — never a black or broken player.
 * - `media.type === "image"` → a real still (MediaFrame) for products without a
 *   clip yet; a missing file stays a calm dark-steel frame, never an orange
 *   placeholder. Swap in a clip later by pointing the config at `futureVideo`.
 */
export function ProductDemoMedia({
  title,
  subtitle,
  titleClassName,
  note,
  alt,
  media,
  videoLabels,
}: {
  title: string;
  subtitle: string;
  /** e.g. md:whitespace-nowrap to keep a one-line title on the R-Series page. */
  titleClassName?: string;
  /** Small, unobtrusive line under the frame (used for image-only products). */
  note?: string;
  alt?: string;
  media: DemoMedia;
  /** Required only when media.type === "video". */
  videoLabels?: { play: string; pause: string; soon: string };
}) {
  return (
    <Section tone="dark" className="py-16 md:py-20">
      <Container className="mb-8 max-w-[80ch]">
        <h2 className={cn("text-h1 text-ink-inv", titleClassName)}>{title}</h2>
        <p className="mt-3 text-body-l text-ink-inv-2">{subtitle}</p>
      </Container>
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-8">
        {media.type === "video" && videoLabels ? (
          <ProductVideo
            src={media.src}
            poster={media.poster}
            alt={alt ?? title}
            playLabel={videoLabels.play}
            pauseLabel={videoLabels.pause}
            soonLabel={videoLabels.soon}
          />
        ) : (
          <MediaFrame
            src={media.src}
            alt={alt ?? title}
            sizes="(max-width: 1680px) 100vw, 1680px"
            className="aspect-video w-full overflow-hidden rounded-xl border border-line-inv"
          />
        )}
        {note ? <p className="mt-4 text-body-s text-ink-inv-3">{note}</p> : null}
      </div>
    </Section>
  );
}
