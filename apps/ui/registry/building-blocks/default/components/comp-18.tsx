import { useId } from "react"

import { Input } from "@/registry/building-blocks/default/ui/input"
import { Label } from "@/registry/building-blocks/default/ui/label"
import { SelectNative } from "@/registry/building-blocks/default/ui/select-native"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with end select</Label>
      <div className="flex rounded-md shadow-xs">
        <Input
          id={id}
          className="-me-px rounded-e-none shadow-none focus-visible:z-10"
          placeholder="google"
          type="text"
        />
        <SelectNative className="w-fit rounded-s-none text-muted-foreground shadow-none hover:text-foreground">
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </SelectNative>
      </div>
    </div>
  )
}
