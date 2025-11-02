import type { MetadataRoute } from "next"

import { categories } from "@/lib/building-blocks-config/components"

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://loveui.dev/building-blocks",
  }
  const search = {
    url: "https://loveui.dev/building-blocks/search",
  }
  const easings = {
    url: "https://loveui.dev/building-blocks/easings",
  }
  const categoryPages = categories.map((category) => ({
    url: `https://loveui.dev/building-blocks/${category.slug}`,
  }))

  return [home, ...categoryPages, search, easings]
}
