import { useId } from "react"

import { Checkbox } from "@/registry/building-blocks/default/ui/checkbox"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
      <Checkbox
        id={id}
        className="order-1 after:absolute after:inset-0"
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
          A short description goes here.
        </p>
      </div>
    </div>
  )
}
