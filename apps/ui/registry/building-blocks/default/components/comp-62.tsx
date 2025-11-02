import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { Textarea } from "@/registry/building-blocks/default/ui/textarea"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="leading-6">
          Textarea with hint
        </Label>
        <span className="text-sm text-muted-foreground">Optional</span>
      </div>
      <Textarea id={id} placeholder="Leave a comment" />
    </div>
  )
}
