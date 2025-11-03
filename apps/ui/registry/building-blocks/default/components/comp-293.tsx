import { XIcon } from "lucide-react"

import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="z-50 max-w-[400px] rounded-md border bg-background p-4 shadow-lg">
      <div className="flex gap-2">
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Manage your cookie preferences</p>
            <p className="text-sm text-muted-foreground">
              We use cookies to understand traffic and personalize your experience.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Accept all</Button>
            <Button size="sm" variant="outline">
              Manage choices
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
