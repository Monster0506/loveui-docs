"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { PAGES_NEW } from "@/lib/docs"
import blocksMeta from "@/content/docs/blocks/meta.json"
import backgroundsMeta from "@/content/docs/backgrounds/meta.json"
import featuresMeta from "@/content/docs/features/meta.json"
import type { source } from "@/lib/source"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/registry/default/ui/badge"

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const normalizedPath = React.useMemo(() => {
    if (!pathname) return null
    if (basePath && pathname.startsWith(basePath)) {
      const nextPath = pathname.slice(basePath.length)
      return nextPath.startsWith("/") ? nextPath : `/${nextPath}`
    }
    return pathname
  }, [pathname, basePath])

  const sectionPrefix = React.useMemo(() => {
    if (!normalizedPath) return null
    if (normalizedPath.startsWith("/docs/features")) {
      return "/docs/features"
    }
    if (normalizedPath.startsWith("/docs/blocks")) {
      return "/docs/blocks"
    }
    if (normalizedPath.startsWith("/docs/backgrounds")) {
      return "/docs/backgrounds"
    }
    return null
  }, [normalizedPath])

  const activePath = normalizedPath ?? pathname ?? ""

  const filteredGroups = React.useMemo(() => {
    const baseGroups = sectionPrefix
      ? tree.children
      : tree.children.filter((group) => group.name !== "Backgrounds")

    if (!sectionPrefix) {
      return baseGroups
    }

    const containsPrefix = (node: any): boolean => {
      if (!node) return false
      if ("url" in node && typeof node.url === "string") {
        return node.url.startsWith(sectionPrefix)
      }
      if ("children" in node && Array.isArray(node.children)) {
        return node.children.some((child: any) => containsPrefix(child))
      }
      return false
    }

    const next = baseGroups.filter(
      (group) => group.type === "folder" && containsPrefix(group)
    )
    return next.length > 0 ? next : baseGroups
  }, [tree.children, sectionPrefix])

  const customSections = React.useMemo(() => {
    if (sectionPrefix === "/docs/features") {
      return buildMetaSections(featuresMeta.pages ?? [], "/docs/features")
    }
    if (sectionPrefix === "/docs/blocks") {
      return buildMetaSections(blocksMeta.pages ?? [], "/docs/blocks")
    }
    if (sectionPrefix === "/docs/backgrounds") {
      return buildMetaSections(backgroundsMeta.pages ?? [], "/docs/backgrounds")
    }
    return null
  }, [sectionPrefix])

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar px-4 py-2">
        <div className="h-(--top-spacing) shrink-0" />
        {customSections
          ? customSections.map((section) => (
              <SidebarGroup key={section.heading || section.items[0]?.href} className="gap-1">
                {section.heading ? (
                  <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground uppercase tracking-[0.2em]">
                    {section.heading}
                  </SidebarGroupLabel>
                ) : null}
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.href === activePath}
                          className="from-secondary to-secondary/64 ps-3.5 text-sidebar-foreground/64 hover:bg-transparent active:bg-transparent data-[active=true]:bg-gradient-to-tr"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          : filteredGroups.map((item) => (
              <SidebarGroup key={item.$id} className="gap-1">
                <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
                  {item.name}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  {item.type === "folder" && (
                    <SidebarMenu className="gap-0.5">
                      {item.children.map((child) => {
                        return (
                          child.type === "page" && (
                            <SidebarMenuItem key={child.url}>
                              <SidebarMenuButton
                                asChild
                                isActive={child.url === activePath}
                                className="from-secondary to-secondary/64 ps-3.5 text-sidebar-foreground/64 hover:bg-transparent active:bg-transparent data-[active=true]:bg-gradient-to-tr"
                              >
                                <Link href={child.url}>
                                  {child.name}
                                  {PAGES_NEW.includes(child.url) && (
                                    <Badge variant="info">New</Badge>
                                  )}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        )
                      })}
                    </SidebarMenu>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
      </SidebarContent>
    </Sidebar>
  )
}

type MetaSection = {
  heading: string
  items: { label: string; href: string }[]
}

function buildMetaSections(entries: string[], baseHref: string): MetaSection[] {
  const sections: MetaSection[] = []
  let current: MetaSection | null = null

  const ensureSection = (heading: string) => {
    current = { heading, items: [] }
    sections.push(current)
  }

  for (const entry of entries) {
    if (entry.startsWith("---") && entry.endsWith("---")) {
      ensureSection(entry.replace(/-/g, "").trim())
      continue
    }

    if (entry === "..." || entry.startsWith("[")) {
      continue
    }

    if (!current) {
      ensureSection("")
    }

    current.items.push({
      label: humanize(entry),
      href: `${baseHref}/${entry}`,
    })
  }

  return sections.filter((section) => section.items.length > 0)
}

function humanize(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
