"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[]
}) {
  const pathname = usePathname()
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/"

  const normalizedItems = items.map((item) => ({
    ...item,
    normalizedHref: item.href.replace(/\/$/, "") || "/",
  }))

  const bestMatch = normalizedItems.reduce<string | null>((best, item) => {
    const href = item.normalizedHref

    const matchesExact = normalizedPath === href
    const matchesPrefix = normalizedPath.startsWith(`${href}/`)

    if (matchesExact || matchesPrefix) {
      if (!best || href.length > best.length) {
        return href
      }
    }

    return best
  }, null)

  return (
    <nav className={cn("items-center gap-2", className)} {...props}>
      {normalizedItems.map((item) => {
        const isActive = bestMatch === item.normalizedHref

        return (
          <Button
            key={item.href}
            variant="ghost"
            data-pressed={isActive || undefined}
            render={
              <Link
                href={item.href}
                className={cn(isActive && "text-primary")}
              />
            }
          >
            {item.label}
          </Button>
        )
      })}
    </nav>
  )
}
