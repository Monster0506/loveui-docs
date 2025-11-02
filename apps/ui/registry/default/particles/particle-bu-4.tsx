import { ThumbsUpIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Particle() {
  return (
    <Button className="pe-0" variant="outline">
      <ThumbsUpIcon className="opacity-60" size={16} aria-hidden="true" />
      Like
      <span className="relative ms-1 px-3 text-xs font-medium text-muted-foreground before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
        86
      </span>
    </Button>
  )
}
