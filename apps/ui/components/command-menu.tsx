"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowTurnBackwardIcon,
  Atom01Icon,
  BookOpen02Icon,
  Search01Icon,
  GridIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { copyToClipboard } from "@loveui/ui/components/copy-button"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { useIsMac } from "@/hooks/use-is-mac"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/registry/default/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import { Separator } from "@/registry/default/ui/separator"
import { categories as buildingBlocksCategories } from "@/lib/building-blocks-config/components"
import featuresMeta from "@/content/docs/features/meta.json"

export function CommandMenu({
  tree,
  navItems,
  ...props
}: ComponentProps<typeof Dialog> & {
  tree: typeof source.pageTree
  navItems?: { href: string; label: string }[]
}) {
  const router = useRouter()
  const isMac = useIsMac()
  const [config] = useConfig()
  const [open, setOpen] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState<
    "page" | "component" | null
  >(null)
  const [copyPayload, setCopyPayload] = React.useState("")
  const packageManager = config.packageManager || "pnpm"

  const handlePageHighlight = React.useCallback(
    (isComponent: boolean, item: { url: string; name?: React.ReactNode }) => {
      if (isComponent) {
        const componentName = item.url.split("/").pop()
        setSelectedType("component")
        const registryItem = `@coss/${componentName}`
        let cmd: string
        switch (packageManager) {
          default:
            cmd = `npx loveui@latest add  ${registryItem}`
        }

        setCopyPayload(cmd)
      } else {
        setSelectedType("page")
        setCopyPayload("")
      }
    },
    [packageManager, setSelectedType, setCopyPayload]
  )

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const buildingBlocksQuickLinks = React.useMemo<
    Array<{ href: string; label: string; keywords: string[] }>
  >(
    () => [
      {
        href: "/building-blocks",
        label: "Building Blocks overview",
        keywords: ["building", "blocks", "home", "components"],
      },
      {
        href: "/building-blocks/search",
        label: "Building Blocks search",
        keywords: [
          "building",
          "blocks",
          "search",
          "components",
          "tags",
        ],
      },
      {
        href: "/building-blocks/easings",
        label: "Building Blocks easings",
        keywords: [
          "building",
          "blocks",
          "easings",
          "animation",
        ],
      },
    ],
    []
  )

  const buildingBlocksGroups = React.useMemo<
    Array<{
      href: string
      label: string
      keywords: string[]
      count: number
      isNew?: boolean
    }>
  >(
    () =>
      buildingBlocksCategories.map((category) => ({
        href: `/building-blocks/${category.slug}`,
        label: category.name,
        keywords: [
          "building",
          "blocks",
          category.slug,
          category.name.toLowerCase(),
          `${category.components.length} components`,
        ],
        count: category.components.length,
        isNew: category.isNew,
      })),
    []
  )

  const features = React.useMemo(() => {
    const pages = featuresMeta.pages ?? []
    const entries: Array<{
      slug: string
      label: string
      heading: string
    }> = []

    let currentHeading = ""

    for (const entry of pages) {
      if (entry.startsWith("---") && entry.endsWith("---")) {
        currentHeading = entry.replace(/-/g, "").trim()
        continue
      }

      if (!entry || entry === "..." || entry.startsWith("[")) {
        continue
      }

      const label = entry
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ")

      entries.push({ slug: entry, label, heading: currentHeading })
    }

    return entries
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        runCommand(() => {
          if (selectedType === "page" || selectedType === "component") {
            copyToClipboard(copyPayload)
          }
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [copyPayload, runCommand, selectedType, packageManager])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" onClick={() => setOpen(true)} {...props}>
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            <div className="gap-1 sm:flex">
              <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
              <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
            </div>
          </Button>
        }
      />
      <DialogPopup className="p-3 pb-13 sm:max-w-xl" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          filter={(value, search, keywords) => {
            const extendValue = value + " " + (keywords?.join(" ") || "")
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1
            }
            return 0
          }}
        >
          <CommandInput placeholder="Search documentation…" />
          <CommandList className="no-scrollbar min-h-76 scroll-pt-2 scroll-pb-1.5 pt-1">
            <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>
            {navItems && navItems.length > 0 && (
              <CommandGroup
                heading="Pages"
                className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5"
              >
                {navItems.map((item) => (
                  <CommandMenuItem
                    key={item.href}
                    value={`Navigation ${item.label}`}
                    keywords={["nav", "navigation", item.label.toLowerCase()]}
                    onHighlight={() => {
                      setSelectedType("page")
                      setCopyPayload("")
                    }}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                  >
                    <HugeiconsIcon
                      icon={BookOpen02Icon}
                      strokeWidth={2}
                      className="opacity-72"
                    />
                    {item.label}
                  </CommandMenuItem>
                ))}
              </CommandGroup>
            )}
            {(buildingBlocksQuickLinks.length > 0 || buildingBlocksGroups.length > 0) && (
              <CommandGroup
                heading="Building Blocks"
                className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5"
              >
                {buildingBlocksQuickLinks.map((item) => (
                  <CommandMenuItem
                    key={item.href}
                    value={`Building Blocks ${item.label}`}
                    keywords={item.keywords}
                    onHighlight={() => {
                      setSelectedType("page")
                      setCopyPayload("")
                    }}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                  >
                    <HugeiconsIcon
                      icon={
                        item.href.includes("search")
                          ? Search01Icon
                          : item.href.includes("easings")
                            ? Atom01Icon
                            : GridIcon
                      }
                      strokeWidth={2}
                      className="opacity-72"
                    />
                    <span className="flex-1">{item.label}</span>
                  </CommandMenuItem>
                ))}
                {buildingBlocksGroups.map((category) => (
                  <CommandMenuItem
                    key={category.href}
                    value={`Building Blocks ${category.label}`}
                    keywords={category.keywords}
                    onHighlight={() => {
                      setSelectedType("page")
                      setCopyPayload("")
                    }}
                    onSelect={() => {
                      runCommand(() => router.push(category.href))
                    }}
                  >
                    <HugeiconsIcon
                      icon={GridIcon}
                      strokeWidth={2}
                      className="opacity-72"
                    />
                    <span className="flex-1">{category.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.count}{" "}
                      {category.count === 1 ? "component" : "components"}
                    </span>
                    {category.isNew ? (
                      <span className="ms-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        New
                      </span>
                    ) : null}
                  </CommandMenuItem>
                ))}
              </CommandGroup>
            )}
            {features.length > 0 && (
              <CommandGroup
                heading="Features"
                className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5"
              >
                {features.map((feature) => (
                  <CommandMenuItem
                    key={feature.slug}
                    value={`${feature.label} ${feature.heading}`}
                    keywords={[
                      "feature",
                      feature.slug,
                      feature.heading.toLowerCase(),
                      ...feature.label.toLowerCase().split(" "),
                    ]}
                    onHighlight={() => {
                      setSelectedType("component")
                      setCopyPayload(`npx loveui@latest add ${feature.slug}`)
                    }}
                    onSelect={() => {
                      runCommand(() =>
                        router.push(`/docs/features/${feature.slug}`)
                      )
                    }}
                  >
                    <HugeiconsIcon
                      icon={GridIcon}
                      strokeWidth={2}
                      className="opacity-72"
                    />
                    <span className="flex-1">{feature.label}</span>
                    {feature.heading ? (
                      <span className="text-xs text-muted-foreground">
                        {feature.heading}
                      </span>
                    ) : null}
                  </CommandMenuItem>
                ))}
              </CommandGroup>
            )}
            {tree.children.map((group) => (
              <CommandGroup
                key={group.$id}
                heading={group.name}
                className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!px-2 [&_[cmdk-group-heading]]:!pt-4 [&_[cmdk-group-heading]]:!pb-1.5"
              >
                {group.type === "folder" &&
                  group.children.map((item) => {
                    if (item.type === "page") {
                      const isComponent = item.url.includes("/components/")

                      return (
                        <CommandMenuItem
                          key={item.url}
                          value={
                            item.name?.toString()
                              ? `${group.name} ${item.name}`
                              : ""
                          }
                          keywords={isComponent ? ["component"] : undefined}
                          onHighlight={() =>
                            handlePageHighlight(isComponent, item)
                          }
                          onSelect={() => {
                            runCommand(() => router.push(item.url))
                          }}
                        >
                          {isComponent ? (
                            <HugeiconsIcon
                              icon={Atom01Icon}
                              strokeWidth={2}
                              className="opacity-72"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={BookOpen02Icon}
                              strokeWidth={2}
                              className="opacity-72"
                            />
                          )}
                          {item.name}
                        </CommandMenuItem>
                      )
                    }
                    return null
                  })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 rounded-b-xl border-t bg-muted px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <CommandMenuKbd>
              <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2} />
            </CommandMenuKbd>{" "}
            {selectedType === "page" || selectedType === "component"
              ? "Go to Page"
              : null}
          </div>
          {copyPayload && (
            <>
              <Separator orientation="vertical" className="!h-4" />
              <div className="flex min-w-0 items-center gap-1">
                <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                <span className="truncate">{copyPayload}</span>
              </div>
            </>
          )}
        </div>
      </DialogPopup>
    </Dialog>
  )
}

function CommandMenuItem({
  children,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem ref={ref} {...props}>
      {children}
    </CommandItem>
  )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}
