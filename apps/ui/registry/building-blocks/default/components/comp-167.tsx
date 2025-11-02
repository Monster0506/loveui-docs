import { useId } from "react"

import { RadioGroup, RadioGroupItem } from "@/registry/building-blocks/default/ui/radio-group"

export default function Component() {
  const id = useId()

  const items = [
    { value: "1", label: "Angry", icon: "😠" },
    { value: "2", label: "Sad", icon: "🙁" },
    { value: "3", label: "Neutral", icon: "😐" },
    { value: "4", label: "Happy", icon: "🙂" },
    { value: "5", label: "Laughing", icon: "😀" },
  ]

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm leading-none font-medium text-foreground">
        How did it go?
      </legend>
      <RadioGroup className="flex gap-1.5" defaultValue="3">
        {items.map((item) => (
          <label
            key={`${id}-${item.value}`}
            className="relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border border-input text-center text-xl shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:border-primary/50"
          >
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="sr-only after:absolute after:inset-0"
            />
            {item.icon}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
