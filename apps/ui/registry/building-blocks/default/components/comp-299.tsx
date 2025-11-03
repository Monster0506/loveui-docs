"use client"

import { toast } from "sonner"

import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast("Deploy finished without errors.", {
          description: "Main branch is now live.",
          action: {
            label: "View logs",
            onClick: () => console.log("View logs"),
          },
        })
      }}
    >
      Show sonner
    </Button>
  )
}
