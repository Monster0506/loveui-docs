import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { FaqsSection } from "@/components/faqs";
import { BuildingBlocksGallery } from "@/components/image-gallery";
import {
  CommandIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";

const features = [
  {
    title: "Production-ready blocks",
    description:
      "Drop in meticulously designed sections, layouts, and backgrounds that match the LoveUI aesthetic out of the box.",
    icon: CommandIcon,
  },
  {
    title: "Composable primitives",
    description:
      "Use the same tokens, typography, and spacing foundations we rely on across /ui so every screen feels intentional.",
    icon: SparklesIcon,
  },
  {
    title: "Accessible by default",
    description:
      "Every component ships with WCAG-conscious states, focus rings, and semantic markup so you stay inclusive by design.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Copy-ready docs",
    description:
      "Real-world code examples, props, and usage notes live alongside the components, making onboarding a copy-and-paste job.",
    icon: ZapIcon,
  },
] as const;

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <section id="features" className="border-b border-border/50 bg-sidebar py-24">
        <div className="container mx-auto max-w-5xl space-y-12 px-4">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-balance font-semibold text-3xl md:text-4xl">
              Everything you need to ship the LoveUI look
            </h2>
            <p className="text-muted-foreground">
              Curated components, backgrounds, and docs that match the brand, scale with your product, and accelerate every handoff.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                className="h-full rounded-lg border bg-background/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
                feature={feature}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="border-b border-border/50 bg-sidebar">
        <BuildingBlocksGallery />
      </section>

      <section id="faqs" className="border-b border-border/50 bg-sidebar pb-24 pt-12">
        <FaqsSection />
      </section>
    </main>
  );
}
