"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs"
import { Button } from "@/registry/default/ui/button"

export function TemplatePreviewTabs({
  className,
  templateName,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  templateName: string
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  const handleOpenInNewTab = () => {
    window.open(`/page-templates/preview/${templateName}`, "_blank")
  }

  return (
    <div
      className={cn("group relative mb-12 mt-4 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
            <TabsTab value="preview" className="rounded-lg">
              Preview
            </TabsTab>
            <TabsTab value="code" className="rounded-lg">
              Code
            </TabsTab>
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenInNewTab}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in new tab
          </Button>
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="relative min-h-[600px] rounded-xl border data-[tab=code]:bg-code"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div className="preview flex min-h-[600px] w-full justify-center overflow-y-auto">
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[figure]:!h-full **:[pre]:!h-full **:[pre]:!max-h-full"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
