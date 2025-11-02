"use client"

import { useState } from "react"

import GradientBlinds from "@loveui/gradiant-blinds"

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card"
import { Label } from "@/registry/default/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Slider } from "@/registry/default/ui/slider"

const colorOptions = [
  "#FF6FD8",
  "#7C4DFF",
  "#1FB6FF",
  "#22D1B2",
  "#FF9D52",
  "#F54768",
  "#6EE7B7",
  "#A855F7",
]

type SliderControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  format?: (value: number) => string
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.1,
  format,
}: SliderControlProps) {
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
        onValueChange={(next) =>
          onChange(Array.isArray(next) ? next[0] : (next as number))
        }
      />
    </div>
  )
}

export default function GradientBlindsDemo() {
  const [color1, setColor1] = useState<string>(colorOptions[0]!)
  const [color2, setColor2] = useState<string>(colorOptions[1]!)
  const [shineDirection, setShineDirection] = useState<"left" | "right">(
    "left"
  )
  const [blindsAngle, setBlindsAngle] = useState(20)
  const [noiseAmount, setNoiseAmount] = useState(0.5)
  const [blindsCount, setBlindsCount] = useState(16)
  const [minBlindW, setMinBlindW] = useState(60)
  const [spotRadius, setSpotRadius] = useState(0.5)
  const [distort, setDistort] = useState(0)
  const [mouseDamp, setMouseDamp] = useState(0.15)

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card">
        <div className="relative h-[420px] w-full overflow-hidden rounded-[1.75rem] border border-border/60">
          <GradientBlinds
            gradientColors={[color1, color2]}
            shineDirection={shineDirection}
            angle={blindsAngle}
            noise={noiseAmount}
            blindCount={blindsCount}
            blindMinWidth={minBlindW}
            spotlightRadius={spotRadius}
            distortAmount={distort}
            mouseDampening={mouseDamp}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customize</CardTitle>
          <CardDescription>
            Tweak animation parameters and instantly preview the result.
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Color 1
              </Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((hex) => (
                  <button
                    key={`color1-${hex}`}
                    type="button"
                    onClick={() => setColor1(hex)}
                    className={`h-12 w-20 rounded-2xl border-2 transition-all ${
                      hex === color1 ? "border-foreground scale-105" : "border-border hover:border-foreground/50"
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    <span className="sr-only">{hex}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Color 2
              </Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((hex) => (
                  <button
                    key={`color2-${hex}`}
                    type="button"
                    onClick={() => setColor2(hex)}
                    className={`h-12 w-20 rounded-2xl border-2 transition-all ${
                      hex === color2 ? "border-foreground scale-105" : "border-border hover:border-foreground/50"
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    <span className="sr-only">{hex}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Light Direction
              </Label>
              <Select
                value={shineDirection}
                onValueChange={(value) =>
                  setShineDirection(value as "left" | "right")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SliderControl
              label="Blinds Angle"
              value={blindsAngle}
              onChange={setBlindsAngle}
              min={0}
              max={360}
              step={1}
              format={(val) => val.toFixed(0)}
            />
            <SliderControl
              label="Noise Amount"
              value={noiseAmount}
              onChange={setNoiseAmount}
              min={0}
              max={2}
              step={0.1}
            />
            <SliderControl
              label="Blinds Count"
              value={blindsCount}
              onChange={setBlindsCount}
              min={1}
              max={50}
              step={1}
              format={(val) => val.toFixed(0)}
            />
            <SliderControl
              label="Min Blind W"
              value={minBlindW}
              onChange={setMinBlindW}
              min={10}
              max={200}
              step={5}
              format={(val) => val.toFixed(0)}
            />
            <SliderControl
              label="Spot Radius"
              value={spotRadius}
              onChange={setSpotRadius}
              min={0.1}
              max={2}
              step={0.05}
            />
            <SliderControl
              label="Distort"
              value={distort}
              onChange={setDistort}
              min={0}
              max={5}
              step={0.1}
            />
            <SliderControl
              label="Mouse Damp"
              value={mouseDamp}
              onChange={setMouseDamp}
              min={0}
              max={1}
              step={0.05}
            />
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
