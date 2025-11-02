"use client"

import { useState } from "react"

import Silk from "@loveui/silk"

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card"
import { Label } from "@/registry/default/ui/label"
import { Slider } from "@/registry/default/ui/slider"

const colorOptions = ["#A5B4FC", "#14B8A6", "#F9A8D4", "#FBBF24", "#60A5FA", "#F472B6"]

type SliderControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  format?: (value: number) => string
}

function SliderControl({ label, value, onChange, min, max, step = 0.1, format }: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        <span className="text-sm tabular-nums">
          {format ? format(value) : value.toFixed(2).replace(/\.00$/, "")}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : (next as number))}
      />
    </div>
  )
}

export default function SilkDemo() {
  const [speed, setSpeed] = useState(5)
  const [scale, setScale] = useState(1)
  const [noiseIntensity, setNoiseIntensity] = useState(1.5)
  const [rotation, setRotation] = useState(0)
  const [color, setColor] = useState<string>(colorOptions[0]!)

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card">
        <div className="relative h-[420px] w-full overflow-hidden rounded-[1.75rem] border border-border/60">
          <Silk speed={speed} scale={scale} noiseIntensity={noiseIntensity} rotation={rotation} color={color} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customize</CardTitle>
          <CardDescription>Tweak animation parameters and instantly preview the result.</CardDescription>
        </CardHeader>
        <CardPanel className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <SliderControl label="Speed" value={speed} onChange={setSpeed} min={0} max={10} step={0.2} />
            <SliderControl label="Scale" value={scale} onChange={setScale} min={0.5} max={4} step={0.05} />
            <SliderControl label="Noise Intensity" value={noiseIntensity} onChange={setNoiseIntensity} min={0} max={3} step={0.1} />
            <SliderControl label="Rotation" value={rotation} onChange={setRotation} min={-Math.PI} max={Math.PI} step={0.05} format={(val) => val.toFixed(2)} />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Color
            </Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setColor(hex)}
                  className={`h-12 w-20 rounded-2xl border-2 transition-all ${
                    hex === color ? "border-foreground scale-105" : "border-border hover:border-foreground/50"
                  }`}
                  style={{ backgroundColor: hex }}
                >
                  <span className="sr-only">{hex}</span>
                </button>
              ))}
            </div>
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
