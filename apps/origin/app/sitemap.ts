import type { MetadataRoute } from "next"

import { categories } from "@/config/components"

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://loveui.dev/origin",
  }
  const search = {
    url: "https://loveui.dev/origin/search",
  }
  const easings = {
    url: "https://loveui.dev/origin/easings",
  }
  const categoryPages = categories.map((category) => ({
    url: `https://loveui.dev/origin/${category.slug}`,
  }))

  return [home, ...categoryPages, search, easings]
}
