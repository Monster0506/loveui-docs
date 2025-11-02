import { useId } from "react"

import { Checkbox } from "@/registry/building-blocks/default/ui/checkbox"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        className="order-1"
        aria-describedby={`${id}-description`}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>
          Label{" "}
          <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
            (Sublabel)
          </span>
        </Label>
        <p id={`${id}-description`} className="text-xs text-muted-foreground">
          You can use this checkbox with a label and a description.
        </p>
      </div>
    </div>
  )
}
