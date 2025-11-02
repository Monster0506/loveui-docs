import { ChevronDownIcon, TrashIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible"
import { Frame, FrameHeader, FramePanel } from "@/registry/default/ui/frame"

export default function Particle() {
  return (
    <Frame className="w-full">
      <Collapsible>
        <FrameHeader className="flex-row items-center justify-between px-2 py-2">
          <CollapsibleTrigger
            render={<Button variant="ghost" />}
            className="data-panel-open:[&_svg]:rotate-180"
          >
            <ChevronDownIcon className="size-4" />
            Section header
          </CollapsibleTrigger>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <TrashIcon />
          </Button>
        </FrameHeader>
        <CollapsiblePanel>
          <FramePanel>
            <h2 className="text-sm font-semibold">Section title</h2>
            <p className="text-sm text-muted-foreground">Section description</p>
          </FramePanel>
        </CollapsiblePanel>
      </Collapsible>
    </Frame>
  )
}
