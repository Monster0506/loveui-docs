import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { ScrollArea, ScrollBar } from "@/registry/building-blocks/default/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/building-blocks/default/ui/tabs"

export default function Component() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
          <TabsTrigger
            value="tab-1"
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <HouseIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <PanelsTopLeftIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <BoxIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Packages
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 1
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 2
        </p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 3
        </p>
      </TabsContent>
    </Tabs>
  )
}
