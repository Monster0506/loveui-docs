import * as React from "react"

import { ComponentPreview } from "@/components/component-preview"
import { cn } from "@/lib/utils"
import { Index } from "@/registry/__index__"

type PreviewProps = React.ComponentProps<"div"> & {
  path: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
}

export function Preview({
  path,
  align = "center",
  hideCode = true,
  className,
  ...props
}: PreviewProps) {
  if (!path) {
    return null
  }

  const hasComponent = Boolean(Index[path])

  if (!hasComponent) {
    return (
      <div
        className={cn(
          "mt-6 mb-12 rounded-xl border border-dashed border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground",
          className
        )}
        {...props}
      >
        Preview
        <code className="ms-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">
          {path}
        </code>{" "}
        is not available in the local registry yet.
      </div>
    )
  }

  return (
    <ComponentPreview
      name={path}
      align={align}
      hideCode={hideCode}
      className={className}
      {...props}
    />
  )
}
