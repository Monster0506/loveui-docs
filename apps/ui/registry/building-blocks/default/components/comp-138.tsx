import { useId } from "react"

import { Checkbox } from "@/registry/building-blocks/default/ui/checkbox"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <Label htmlFor={id}>
        I agree to the{" "}
        <a className="underline" href="https://loveui.dev/building-blocks" target="_blank">
          terms of service
        </a>
      </Label>
    </div>
  )
}
