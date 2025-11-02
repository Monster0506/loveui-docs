"use client"

import { Label } from "@/registry/building-blocks/default/ui/label"
import { Slider } from "@/registry/building-blocks/default/ui/slider"

export default function Component() {
  return (
    <div className="*:not-first:mt-4">
      <Label>Slider with multiple thumbs</Label>
      <Slider
        defaultValue={[25, 50, 100]}
        aria-label="Slider with multiple thumbs"
        showTooltip
        tooltipContent={(value) => `${value}%`}
      />
    </div>
  )
}
