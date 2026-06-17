import type { Metadata } from "next";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Chip } from "@/components/primitives/chip";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { MetricStat } from "@/components/primitives/metric-stat";
import { Reveal } from "@/components/primitives/reveal";
import { LoopSVG } from "@/components/loop/loop-svg";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Kitchen Sink — Cleanuva primitives",
  robots: { index: false, follow: false },
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Eyebrow accent="cool">{title}</Eyebrow>
      {children}
    </div>
  );
}

/** Every primitive, rendered identically so a parent <Section> sets light/dark. */
function Showcase() {
  return (
    <Container className="space-y-16">
      <Group title="Typography scale">
        <div className="space-y-3">
          <p className="text-display-xl">From detection to done.</p>
          <p className="text-display-l">Execution, proven.</p>
          <p className="text-h1">Section opener</p>
          <p className="text-h2">Major heading</p>
          <p className="text-h3">Subsection</p>
          <p className="text-h4">Card title</p>
          <p className="text-body-l measure">
            Body L — hero subcopy and intros sit at nineteen pixels with generous
            leading, capped at the sixty-eight character measure for comfortable
            reading.
          </p>
          <p className="text-body-m measure">
            Body M — the default seventeen-pixel paragraph used across the site.
          </p>
          <p className="text-body-s">Body S — dense UI and captions-plus.</p>
          <p className="text-caption text-ink-3 dark:text-ink-inv-3">
            Caption — footnotes and legal.
          </p>
          <p className="text-loop text-cool-text dark:text-cool">
            Connect · Analyze · Inspect · Execute · Verify
          </p>
        </div>
      </Group>

      <Group title="Eyebrow accents">
        <div className="flex flex-wrap gap-8">
          <Eyebrow accent="neutral">Neutral label</Eyebrow>
          <Eyebrow accent="cool">Intelligence</Eyebrow>
          <Eyebrow accent="warm">Execution</Eyebrow>
        </div>
      </Group>

      <Group title="Button variants">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Request a demo</Button>
          <Button variant="warm">Get robotics pricing</Button>
          <Button variant="secondary">See the platform</Button>
          <Button variant="onDark">See the Command Center</Button>
          <Button variant="glass">Watch the loop</Button>
          <Button variant="ghostLink">See how the Loop works</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button disabled variant="primary">
            Disabled
          </Button>
        </div>
      </Group>

      <Group title="Chip (mockup-only, NEXT_PUBLIC_SHOW_CHIPS=1)">
        <div className="flex flex-wrap gap-3">
          <Chip accent="cool">plant · golden-hour</Chip>
          <Chip accent="warm">robot · in-operation</Chip>
          <Chip>neutral</Chip>
          <span className="text-caption text-ink-3 dark:text-ink-inv-3">
            (Chips render only when NEXT_PUBLIC_SHOW_CHIPS=1)
          </span>
        </div>
      </Group>

      <Group title="PhotoPlate (fallback gradients)">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PhotoPlate alt="Solar plant at golden hour" scene="plant-golden-hour" chip="plant · golden-hour" />
          <PhotoPlate alt="Robot in operation" scene="robot-in-operation" />
          <PhotoPlate alt="Operator with tablet" scene="operator-tablet" />
          <PhotoPlate alt="Command Center UI" scene="product-ui" />
          <PhotoPlate alt="Drone thermal scan" scene="drone-thermal" />
        </div>
      </Group>

      <Group title="MetricStat (count-up on view)">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <MetricStat value={2.4} suffix=" GWp" decimals={1} label="Managed" accent="cool" />
          <MetricStat value={6.8} prefix="+" suffix="%" decimals={1} label="Yield uplift" accent="warm" />
          <MetricStat value={42} suffix="%" label="Downtime ↓" accent="verified" />
          <MetricStat value={3} label="Regions" accent="neutral" />
        </div>
      </Group>

      <Group title="LoopSVG — four modes">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>full</Eyebrow>
            <LoopSVG mode="full" />
          </div>
          <div>
            <Eyebrow>strip</Eyebrow>
            <LoopSVG mode="strip" />
          </div>
          <div>
            <Eyebrow>intel-arc</Eyebrow>
            <LoopSVG mode="intel-arc" />
          </div>
          <div>
            <Eyebrow>exec-arc</Eyebrow>
            <LoopSVG mode="exec-arc" />
          </div>
        </div>
      </Group>

      <Group title="Reveal (scroll-in)">
        <Reveal>
          <p className="text-body-m">
            This block fades and rises into view once, then stays put.
          </p>
        </Reveal>
      </Group>

      <Group title="shadcn primitives (re-skinned to tokens)">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Input placeholder="Work email" />
            <Textarea placeholder="Tell us about your portfolio…" />
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eu">EU</SelectItem>
                <SelectItem value="mea">MEA</SelectItem>
                <SelectItem value="na">NA</SelectItem>
              </SelectContent>
            </Select>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  Hover for tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>Re-skinned to brand tokens</TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="r">
              <TabsList>
                <TabsTrigger value="r">R-Series</TabsTrigger>
                <TabsTrigger value="u">U-Series</TabsTrigger>
                <TabsTrigger value="span">NuvaSpan</TabsTrigger>
              </TabsList>
              <TabsContent value="r" className="text-body-s">
                Single operator. Maximum coverage.
              </TabsContent>
              <TabsContent value="u" className="text-body-s">
                Autonomous. Every night.
              </TabsContent>
              <TabsContent value="span" className="text-body-s">
                Built for utility-scale operations.
              </TabsContent>
            </Tabs>
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger>What is the Loop?</AccordionTrigger>
                <AccordionContent>
                  Connect → Analyze → Inspect → Execute → Verify.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Deployment options</AccordionTrigger>
                <AccordionContent>SaaS, Private Cloud, or Hybrid.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Group>
    </Container>
  );
}

export default function KitchenSinkPage() {
  return (
    <>
      <Section tone="light">
        <Container>
          <Eyebrow accent="neutral">Kitchen sink · Light (default)</Eyebrow>
          <h1 className="text-h1 mt-2">Foundation primitives</h1>
        </Container>
        <div className="mt-12">
          <Showcase />
        </div>
      </Section>

      <Section tone="dark">
        <Container>
          <Eyebrow accent="cool">Kitchen sink · Earned dark</Eyebrow>
          <h2 className="text-h1 mt-2 text-ink-inv">
            The system is alive
          </h2>
        </Container>
        <div className="mt-12">
          <Showcase />
        </div>
      </Section>
    </>
  );
}
