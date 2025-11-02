import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"

interface CategoryNavigationProps {
  currentCategory?: string
  categories?: Array<{ name: string; slug: string }>
}

export function CategoryNavigation({
  currentCategory,
  categories,
}: CategoryNavigationProps) {
  return (
    <div className="mx-auto mt-4 w-full max-w-4xl">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="xs"
          className={cn(
            "rounded-md px-2 py-1",
            !currentCategory &&
              "bg-accent !shadow-none before:!shadow-none dark:bg-input dark:hover:bg-input"
          )}
          render={<Link href="/particles">All</Link>}
        />
        {categories?.map((cat) => {
          const isActive = cat.slug === currentCategory
          return (
            <Button
              key={cat.slug}
              variant="outline"
              size="xs"
              className={cn(
                "rounded-md px-2 py-1 capitalize",
                isActive &&
                  "bg-accent !shadow-none before:!shadow-none dark:bg-input dark:hover:bg-input"
              )}
              render={<Link href={`/particles/${cat.slug}`} />}
            >
              {cat.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
