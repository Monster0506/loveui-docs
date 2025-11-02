"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { Menu09Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { PAGES_NEW } from "@/lib/docs"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/default/ui/badge"
import { Button } from "@/registry/default/ui/button"
import { Sheet, SheetPopup, SheetTrigger } from "@/registry/default/ui/sheet"

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("relative -ms-1.5 size-8", className)}
          >
            <HugeiconsIcon
              icon={Menu09Icon}
              strokeWidth={2}
              className="size-5"
            />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        }
      />
      <SheetPopup side="left">
        <div className="flex flex-col gap-12 overflow-auto p-6 pt-8">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-medium">Menu</div>
            <div className="flex flex-col gap-1">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item, index) => (
                <MobileLink key={index} href={item.href} onOpenChange={setOpen}>
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type === "folder") {
                return (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="text-sm font-medium">{group.name}</div>
                    <div className="flex flex-col gap-0.5">
                      {group.children.map((item) => {
                        if (item.type === "page") {
                          return (
                            <MobileLink
                              key={`${item.url}-${index}`}
                              href={item.url}
                              onOpenChange={setOpen}
                            >
                              {item.name}
                              {PAGES_NEW.includes(item.url) && (
                                <Badge variant="info">New</Badge>
                              )}
                            </MobileLink>
                          )
                        }
                      })}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </SheetPopup>
    </Sheet>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(
        "flex items-center gap-2 py-1.5 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
