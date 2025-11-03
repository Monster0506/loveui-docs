"use client"

import { useToast } from "@/registry/default/hooks/use-toast"
import { Button } from "@/registry/default/ui/button"
import { ToastAction } from "@/registry/default/ui/toast"

export default function Component() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Deploy succeeded",
          description: "Production updated with build #5421.",
          action: <ToastAction altText="View logs">View logs</ToastAction>,
        })
      }}
    >
      Show toast
    </Button>
  )
}
