import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { Switch } from "@/registry/building-blocks/default/ui/switch"

export default function Component() {
  const id = useId()
  return (
    <div className="inline-flex items-center gap-2">
      <Switch id={id} />
      <Label htmlFor={id} className="sr-only">
        Simple switch
      </Label>
    </div>
  )
}
