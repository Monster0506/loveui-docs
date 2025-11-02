import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { Textarea } from "@/registry/building-blocks/default/ui/textarea"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Textarea with helper text</Label>
      <Textarea id={id} placeholder="Leave a comment" />
      <p
        className="mt-2 text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Please add as many details as you can
      </p>
    </div>
  )
}
