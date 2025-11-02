import buildingBlocksRegistry from "../../../../apps/origin/registry.json"
import { clsx, type ClassValue } from "clsx"
import type { RegistryItem } from "shadcn/registry"
import { twMerge } from "tailwind-merge"

import type { RegistryTag } from "@/registry/registry-tags"

const components = buildingBlocksRegistry.items as unknown as RegistryItem[]
const basePath =
  (process.env.NEXT_PUBLIC_BASE_PATH || "/ui").replace(/\/$/, "")

export const getComponents = (
  selectedTags: RegistryTag[] = []
): RegistryItem[] => {
  return selectedTags.length
    ? components.filter((component) =>
        selectedTags.every(
          (tag) => component.meta?.tags?.includes(tag) ?? false
        )
      )
    : components
}

export const getComponentsByNames = (names: string[]): RegistryItem[] => {
  const componentsMap = new Map(components.map((comp) => [comp.name, comp]))

  return names
    .map((name) => componentsMap.get(name))
    .filter((comp): comp is RegistryItem => comp !== undefined)
}

export const getAvailableTags = (
  selectedTags: RegistryTag[]
): RegistryTag[] => {
  if (!selectedTags.length) return []

  // Get all components that have all the selected tags
  const matchingComponents = components.filter((component) =>
    selectedTags.every((tag) => component.meta?.tags?.includes(tag) ?? false)
  )

  // Get all unique tags from the matching components
  const availableTags = new Set<RegistryTag>()
  matchingComponents.forEach((component) => {
    component.meta?.tags?.forEach((tag: RegistryTag) => {
      if (!selectedTags.includes(tag)) {
        availableTags.add(tag)
      }
    })
  })

  return Array.from(availableTags)
}

export const convertRegistryPaths = (content: string): string => {
  return content
    .replace(/@\/registry\/default\/ui/g, "@/components/building-blocks/ui")
    .replace(/@\/registry\/default\/compositions/g, "@/components")
    .replace(/@\/registry\/default\/hooks/g, "@/hooks")
    .replace(/@\/registry\/default\/lib/g, "@/lib")
    .replace(/\/(?:origin)\//g, "/building-blocks/")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const assetPath = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}
