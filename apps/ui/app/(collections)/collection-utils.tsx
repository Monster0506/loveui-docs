import Link from "next/link"
import { icons } from "lucide-react"

import { source } from "@/lib/source"

export type SectionItem =
  | {
      type: "page"
      title: string
      description?: string
      icon?: string
      url: string
    }
  | {
      type: "external"
      title: string
      url: string
    }
  | {
      type: "placeholder"
      title: string
      description?: string
    }

export type Section = {
  heading: string
  items: SectionItem[]
}

type BuildOptions = {
  placeholderTitle: string
  placeholderDescription?: string
}

export function buildSections(
  entries: string[],
  folder: string,
  options: BuildOptions
): Section[] {
  const sections: Section[] = []
  let current: Section | null = null

  for (const entry of entries) {
    const headingMatch = entry.match(/^---(.+?)---$/)
    if (headingMatch && headingMatch[1]) {
      current = {
        heading: headingMatch[1].trim(),
        items: [],
      }
      sections.push(current)
      continue
    }

    if (!current) {
      current = { heading: "", items: [] }
      sections.push(current)
    }

    if (entry === "...") {
      current.items.push({
        type: "placeholder",
        title: options.placeholderTitle,
        description: options.placeholderDescription,
      })
      continue
    }

    const linkMatch = entry.match(/^\[(.+?)\]\((.+?)\)$/)
    if (linkMatch && linkMatch[1] && linkMatch[2]) {
      current.items.push({
        type: "external",
        title: linkMatch[1],
        url: linkMatch[2],
      })
      continue
    }

    const page = source.getPage([folder, entry])
    if (!page) continue

    current.items.push({
      type: "page",
      title: page.data.title ?? humanize(entry),
      description: page.data.description,
      icon: page.data.icon,
      url: page.url,
    })
  }

  return sections.filter((section) => section.items.length > 0)
}

export function CollectionCard({
  item,
  externalHint = "Opens in a new tab.",
}: {
  item: SectionItem
  externalHint?: string
}) {
  if (item.type === "page") {
    return (
      <Link
        href={item.url}
        className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-background/80 p-5 text-left transition hover:border-primary/60 hover:bg-primary/5"
      >
        <div className="flex items-center gap-3">
          {item.icon ? <SectionIcon name={item.icon} /> : null}
          <span className="text-base font-medium">{item.title}</span>
        </div>
        {item.description ? (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        ) : null}
      </Link>
    )
  }

  if (item.type === "external") {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-full flex-col gap-3 rounded-2xl border border-dashed border-border/60 bg-background/80 p-5 text-left transition hover:border-primary/60 hover:bg-primary/5"
      >
        <span className="text-base font-medium">{item.title}</span>
        <p className="text-sm text-muted-foreground">{externalHint}</p>
      </a>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-dashed border-border/60 bg-muted/40 p-5">
      <div className="text-base font-medium text-foreground/80">
        {item.title}
      </div>
      {item.description ? (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      ) : null}
    </div>
  )
}

export function collectionCardKey(item: SectionItem) {
  switch (item.type) {
    case "page":
      return `page-${item.url}`
    case "external":
      return `external-${item.url}`
    case "placeholder":
      return `placeholder-${item.title}`
  }
}

function SectionIcon({ name }: { name: string }) {
  const Icon =
    icons[name as keyof typeof icons] ??
    icons[name.replace(/Icon$/, "") as keyof typeof icons]

  if (!Icon) return null

  return (
    <span className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background text-primary shadow-sm transition group-hover:border-primary/60 group-hover:text-primary">
      <Icon className="size-4" />
    </span>
  )
}

function humanize(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
