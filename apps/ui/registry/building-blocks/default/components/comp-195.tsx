import { useId } from "react"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { SelectNative } from "@/registry/building-blocks/default/ui/select-native"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Select with gray background (native)</Label>
      <SelectNative id={id} className="border-transparent bg-muted shadow-none">
        <option value="1">React</option>
        <option value="2">Next.js</option>
        <option value="3">Astro</option>
        <option value="4">Gatsby</option>
      </SelectNative>
    </div>
  )
}
