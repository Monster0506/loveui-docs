import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/building-blocks/default/ui/radio-group"

export default function Component() {
  const id = useId()
  return (
    <RadioGroup className="gap-6" defaultValue="1">
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value="1"
          id={`${id}-1`}
          aria-describedby={`${id}-1-description`}
        />
        <div className="grid grow gap-2">
          <Label htmlFor={`${id}-1`}>
            Small{" "}
            <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
              (Sublabel)
            </span>
          </Label>
          <p
            id={`${id}-1-description`}
            className="text-xs text-muted-foreground"
          >
            You can use this card with a label and a description.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value="2"
          id={`${id}-2`}
          aria-describedby={`${id}-2-description`}
        />
        <div className="grid grow gap-2">
          <Label htmlFor={`${id}-2`}>
            Large{" "}
            <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
              (Sublabel)
            </span>
          </Label>
          <p
            id={`${id}-2-description`}
            className="text-xs text-muted-foreground"
          >
            You can use this card with a label and a description.
          </p>
        </div>
      </div>
    </RadioGroup>
  )
}
