import { useId } from "react"

import { Checkbox } from "@/registry/building-blocks/default/ui/checkbox"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <Label htmlFor={id}>Simple checkbox</Label>
    </div>
  )
}
