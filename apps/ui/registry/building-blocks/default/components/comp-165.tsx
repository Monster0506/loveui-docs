import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/building-blocks/default/ui/radio-group"

export default function Component() {
  const id = useId()

  const items = [
    { value: "1", label: "USA" },
    { value: "2", label: "UK" },
    { value: "3", label: "France" },
  ]

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm leading-none font-medium text-foreground">
        Server location
      </legend>
      <RadioGroup className="flex flex-wrap gap-2" defaultValue="1">
        {items.map((item) => (
          <div
            key={`${id}-${item.value}`}
            className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                className="after:absolute after:inset-0"
              />
              <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
