import { useId } from "react"

import { Button } from "@/registry/building-blocks/default/ui/button"
import { Label } from "@/registry/building-blocks/default/ui/label"
import { Textarea } from "@/registry/building-blocks/default/ui/textarea"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Textarea with left button</Label>
      <Textarea id={id} placeholder="Leave a comment" />
      <Button variant="outline">Send</Button>
    </div>
  )
}
