import * as React from "react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { registryItemSchema } from "shadcn/schema"
import { z } from "zod"

import { Icons } from "@loveui/ui/components/icons"
import { highlightCode } from "@loveui/ui/lib/highlight-code"

import { getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { CodeBlockCommand } from "@/components/code-block-command"
import { ComponentSource } from "@/components/component-source"
import { CopyRegistry } from "@/components/copy-registry"
import { Button } from "@/registry/default/ui/button"
import { Sheet, SheetPopup, SheetTrigger } from "@/registry/default/ui/sheet"

export type Particle = z.infer<typeof registryItemSchema> & {
  highlightedCode: string
}

export async function ParticleDisplay({
  name,
  children,
  className,
}: { name: string } & React.ComponentProps<"div">) {
  const cossuiUrl = process.env.NEXT_PUBLIC_APP_URL || "https://loveui.dev/ui"
  const particle = await getCachedRegistryItem(name)
  const highlightedCode = await getParticleHighlightedCode(
    particle?.files?.[0]?.content ?? ""
  )

  if (!particle || !highlightedCode) {
    return null
  }

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col rounded-xl border bg-muted/50 bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_2px_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/50 after:bg-clip-padding dark:after:bg-background/72",
        className
      )}
    >
      <div className="-m-px flex min-w-0 flex-1 flex-col flex-wrap items-center justify-center overflow-x-auto rounded-t-xl rounded-b-lg border bg-background p-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] lg:px-8 lg:py-12 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]">
        <div data-slot="particle-wrapper">{children}</div>
      </div>
      <div className="flex items-center gap-3 rounded-b-xl p-2">
        <p className="flex flex-1 gap-1 truncate text-xs text-muted-foreground">
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="size-3 h-[1lh] shrink-0"
          />
          <span className="truncate">{particle.description}</span>
        </p>
        <div className="flex items-center gap-1.5">
          {process.env.NODE_ENV === "development" && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              disabled
              title="Particle name"
            >
              {particle.name}
            </Button>
          )}
          <CopyRegistry
            value={`${cossuiUrl}/r/${name}.json`}
            variant="outline"
          />
          <Sheet>
            <SheetTrigger
              render={
                <Button size="sm" className="text-xs" variant="outline" />
              }
            >
              View code
            </SheetTrigger>
            <SheetPopup
              className="bg-sidebar duration-200 data-ending-style:translate-x-8 data-ending-style:opacity-0 data-starting-style:translate-x-8 data-starting-style:opacity-0 sm:max-w-3xl"
              showCloseButton={false}
            >
              <div className="flex flex-1 flex-col overflow-hidden p-6">
                <div>
                  <h2 className="mb-4 font-heading text-xl">Installation</h2>
                  <figure data-rehype-pretty-code-figure>
                    <CodeBlockCommand
                      __npm__={`npx loveui@latest add ${name}`}
                    />
                  </figure>
                </div>
                <div className="flex h-full flex-1 flex-col overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="mt-6 mb-4 font-heading text-xl">Code</h2>
                    <Button
                      variant="outline"
                      render={
                        <a
                          href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(`${cossuiUrl}/r/${name}.json`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      Open in<span className="sr-only">v0</span>
                      <Icons.v0 className="size-5" />
                    </Button>
                  </div>
                  <ComponentSource
                    name={name}
                    collapsible={false}
                    className="h-full overflow-hidden *:data-rehype-pretty-code-figure:mt-0 *:data-rehype-pretty-code-figure:no-scrollbar *:data-rehype-pretty-code-figure:max-h-full *:data-rehype-pretty-code-figure:overflow-y-auto"
                  />
                </div>
              </div>
            </SheetPopup>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name)
})

const getParticleHighlightedCode = React.cache(async (content: string) => {
  return await highlightCode(content)
})
