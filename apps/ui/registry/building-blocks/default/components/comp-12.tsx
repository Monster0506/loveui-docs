import { useId } from "react"

import { Input } from "@/registry/building-blocks/default/ui/input"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with end inline add-on</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer pe-12"
          placeholder="google"
          type="text"
        />
        <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          .com
        </span>
      </div>
    </div>
  )
}
