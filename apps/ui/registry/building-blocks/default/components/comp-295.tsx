import { XIcon } from "lucide-react"

import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="z-50 max-w-[400px] rounded-md border bg-background p-4 shadow-lg">
      <div className="flex gap-3">
        <img
          className="size-9 rounded-full"
          src="https://i.pravatar.cc/160?img=7"
          width={32}
          height={32}
          alt="Connor Love"
        />
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <a
                className="font-medium text-foreground hover:underline"
                href="#"
              >
                Connor Love
              </a>{" "}
              shared a file in{" "}
              <a
                className="font-medium text-foreground hover:underline"
                href="#"
              >
                brand-refresh
              </a>
              .
            </p>
            <p className="text-xs text-muted-foreground">3 min ago</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">View file</Button>
            <Button size="sm" variant="outline">
              Mark as read
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
