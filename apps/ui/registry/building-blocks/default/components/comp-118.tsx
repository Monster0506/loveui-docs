import { StarIcon } from "lucide-react"

import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <Button>
      <StarIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
      <span className="flex items-baseline gap-2">
        Star
        <span className="text-xs text-primary-foreground/60">729</span>
      </span>
    </Button>
  )
}
