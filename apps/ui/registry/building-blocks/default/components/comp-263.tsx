import { Label } from "@/registry/building-blocks/default/ui/label"
import { Slider } from "@/registry/building-blocks/default/ui/slider"

export default function Component() {
  return (
    <div className="*:not-first:mt-4">
      <Label>Vertical dual range slider and tooltip</Label>
      <div className="flex h-40 justify-center">
        <Slider
          defaultValue={[2, 7]}
          max={10}
          orientation="vertical"
          aria-label="Vertical slider"
          showTooltip
        />
      </div>
    </div>
  )
}
