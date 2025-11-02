import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@workspace/ui/components/page-header"

import { Preview } from "@/components/preview"
import { examples } from "@/registry/registry-examples"

const title = "Features"
const description =
  "Explore interactive feature demos across forms, media, finance, and social experiences."

type RegistryExample = (typeof examples)[number]

const SECTION_CONFIG: Array<{
  id: string
  title: string
  description: string
  filter: (example: RegistryExample) => boolean
}> = [
  {
    id: "forms",
    title: "Form features",
    description:
      "High-utility building blocks for inputs, selectors, ratings, and tagging flows.",
    filter: (example) =>
      example.categories?.includes("forms") ||
      example.registryDependencies?.some((dependency) =>
        [
          "@repo/combobox",
          "@repo/choicebox",
          "@repo/dropzone",
          "@repo/pill",
          "@repo/rating",
          "@repo/tags",
        ].includes(dependency)
      ) ||
      false,
  },
  {
    id: "styling",
    title: "Styling features",
    description:
      "Tools for theming, typography, and polished color systems.",
    filter: (example) =>
      example.categories?.includes("styling") ||
      example.registryDependencies?.some((dependency) =>
        [
          "@repo/theme-switcher",
          "@repo/color-picker",
          "@repo/typography",
        ].includes(dependency)
      ) ||
      false,
  },
  {
    id: "marketing",
    title: "Marketing features",
    description: "Announcements, banners, and marquees built for campaigns.",
    filter: (example) =>
      example.categories?.includes("marketing") ||
      example.registryDependencies?.some((dependency) =>
        [
          "@repo/announcement",
          "@repo/banner",
          "@repo/marquee",
        ].includes(dependency)
      ) ||
      false,
  },
  {
    id: "images",
    title: "Image features",
    description:
      "Rich media interactions for cropping, zooming, and previewing visual content.",
    filter: (example) =>
      example.categories?.some((category) =>
        ["image", "preview"].includes(category)
      ) ||
      example.registryDependencies?.some((dependency) =>
        ["@repo/image-crop", "@repo/image-zoom", "@repo/glimpse"].includes(
          dependency
        )
      ) ||
      false,
  },
  {
    id: "overlays",
    title: "Overlay features",
    description: "Layered dialogs and stacked flows for complex interactions.",
    filter: (example) =>
      example.categories?.includes("overlay") ||
      example.registryDependencies?.some((dependency) =>
        ["@repo/dialog-stack"].includes(dependency)
      ) ||
      false,
  },
  {
    id: "feedback",
    title: "Feedback features",
    description:
      "Loaders and indicators that keep people informed while work happens.",
    filter: (example) =>
      example.categories?.includes("feedback") ||
      example.registryDependencies?.some((dependency) =>
        ["@repo/spinner"].includes(dependency)
      ) ||
      false,
  },
  {
    id: "utility",
    title: "Utility features",
    description: "Practical helpers like QR code generation and sharing.",
    filter: (example) =>
      example.categories?.includes("utility") ||
      example.registryDependencies?.some((dependency) =>
        ["@repo/qr-code"].includes(dependency)
      ) ||
      false,
  },
  {
    id: "finance",
    title: "Finance features",
    description:
      "Composable UI for cards and market data that keep financial products on-brand.",
    filter: (example) =>
      example.categories?.includes("finance") ||
      example.registryDependencies?.some((dependency) =>
        ["@repo/credit-card", "@repo/ticker"].includes(dependency)
      ) ||
      false,
  },
  {
    id: "social",
    title: "Social features",
    description:
      "Swipeable decks, stories, and reels that mirror social media interaction patterns.",
    filter: (example) =>
      example.categories?.includes("social") ||
      example.registryDependencies?.some((dependency) =>
        [
          "@repo/deck",
          "@repo/reel",
          "@repo/stories",
          "@repo/video-player",
        ].includes(dependency)
      ) ||
      false,
  },
]

const featureSections = SECTION_CONFIG.map(({ filter, ...section }) => ({
  ...section,
  examples: examples.filter((example) => filter(example)),
})).filter((section) => section.examples.length > 0)

export const metadata: Metadata = {
  title: "Feature examples built with React and Tailwind CSS - loveui",
  description,
}

function formatExampleName(name: string) {
  return name
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

export default function Page() {
  return (
    <div className="container w-full">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {description}
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-16 pb-16">
        {featureSections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-heading text-2xl">{section.title}</h2>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              {section.examples.map((example) => (
                <article key={example.name} className="space-y-4">
                  <Preview
                    path={example.name}
                    hideCode
                    className="!mt-0 !mb-0"
                  />
                  {(example.description || example.name) && (
                    <div className="space-y-1">
                      <h3 className="font-medium text-lg">
                        {formatExampleName(example.name)}
                      </h3>
                      {example.description ? (
                        <p className="text-sm text-muted-foreground">
                          {example.description}
                        </p>
                      ) : null}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
