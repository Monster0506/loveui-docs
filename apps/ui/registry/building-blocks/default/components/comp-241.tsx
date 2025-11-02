import { Label } from "@/registry/building-blocks/default/ui/label"
import { Slider } from "@/registry/building-blocks/default/ui/slider"

export default function Component() {
  return (
    <div className="*:not-first:mt-4">
      <Label>Disabled slider</Label>
      <Slider defaultValue={[25]} disabled aria-label="Disabled slider" />
    </div>
  )
}
