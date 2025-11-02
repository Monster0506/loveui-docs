import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/building-blocks/default/ui/tabs"

export default function Component() {
  return (
    <Tabs defaultValue="tab-1" className="items-center">
      <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="tab-1"
          className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          <HouseIcon
            className="mb-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          <PanelsTopLeftIcon
            className="mb-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          <BoxIcon className="mb-1.5 opacity-60" size={16} aria-hidden="true" />
          Packages
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 1
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 2
        </p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 3
        </p>
      </TabsContent>
    </Tabs>
  )
}
