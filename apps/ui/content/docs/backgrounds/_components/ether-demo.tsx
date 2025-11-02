"use client"

import { useMemo, useState } from "react"

import LiquidEther from "@loveui/ether"

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card"
import { Label } from "@/registry/default/ui/label"
import { Slider } from "@/registry/default/ui/slider"
import { Switch } from "@/registry/default/ui/switch"

const palettes = [
  {
    name: "Aurora",
    colors: ["#4338CA", "#7C3AED", "#EC4899"],
  },
  {
    name: "Nebula",
    colors: ["#1D4ED8", "#22D3EE", "#F59E0B"],
  },
  {
    name: "Midnight",
    colors: ["#0F172A", "#312E81", "#4C1D95"],
  },
  {
    name: "Sunset",
    colors: ["#F97316", "#EF4444", "#F59E0B"],
  },
]

type SliderRowProps = {
  label: string
  value: number
  onChange: (next: number) => void
  min: number
  max: number
  step?: number
  disabled?: boolean
  format?: (val: number) => string
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  format = (val) => val.toFixed(2).replace(/\.00$/, ""),
}: SliderRowProps) {
  return (
    <div className={`space-y-2 ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        <span className="text-sm tabular-nums">{format(value)}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : (next as number))}
        disabled={disabled}
      />
    </div>
  )
}

type ToggleRowProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <label className="flex items-center justify-between gap-4">
      <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  )
}

export default function EtherDemo() {
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [mouseForce, setMouseForce] = useState(20)
  const [cursorSize, setCursorSize] = useState(100)
  const [resolution, setResolution] = useState(0.5)
  const [autoSpeed, setAutoSpeed] = useState(0.5)
  const [autoIntensity, setAutoIntensity] = useState(2.2)
  const [autoResumeDelay, setAutoResumeDelay] = useState(3000)
  const [takeoverDuration, setTakeoverDuration] = useState(0.25)
  const [iterationsPoisson, setIterationsPoisson] = useState(32)
  const [iterationsViscous, setIterationsViscous] = useState(32)
  const [viscous, setViscous] = useState(30)
  const [autoDemo, setAutoDemo] = useState(false)
  const [isBounce, setIsBounce] = useState(false)
  const [isViscous, setIsViscous] = useState(false)

  const colors = useMemo(
    () => (palettes[paletteIndex] ? palettes[paletteIndex].colors : palettes[0]!.colors),
    [paletteIndex]
  )

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card">
        <div className="relative h-[460px] w-full overflow-hidden rounded-[2.2rem] border border-border/60">
          <LiquidEther
            colors={colors}
            mouseForce={mouseForce}
            cursorSize={cursorSize}
            resolution={resolution}
            autoSpeed={autoSpeed}
            autoIntensity={autoIntensity}
            autoDemo={autoDemo}
            autoResumeDelay={autoResumeDelay}
            takeoverDuration={takeoverDuration}
            iterationsPoisson={iterationsPoisson}
            iterationsViscous={iterationsViscous}
            viscous={viscous}
            isBounce={isBounce}
            isViscous={isViscous}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customize</CardTitle>
          <CardDescription>
            Adjust parameters and experiment with different palettes in real time.
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Palette
              </Label>
              <div className="flex flex-wrap gap-2">
                {palettes.map((palette, index) => (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() => setPaletteIndex(index)}
                    className={`relative h-12 w-20 overflow-hidden rounded-2xl border-2 transition-all ${
                      index === paletteIndex ? "border-foreground scale-105" : "border-border hover:border-foreground/50"
                    }`}
                  >
                    <span className="sr-only">{palette.name}</span>
                    <span
                      className="absolute inset-0"
                      style={{ backgroundColor: palette.colors[0] }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Options
              </Label>
              <div className="space-y-3">
                <ToggleRow label="Auto Animate" checked={autoDemo} onChange={setAutoDemo} />
                <ToggleRow label="Bounce Edges" checked={isBounce} onChange={setIsBounce} />
                <ToggleRow label="Viscous Fluid" checked={isViscous} onChange={setIsViscous} />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SliderRow label="Mouse Force" value={mouseForce} onChange={setMouseForce} min={5} max={60} />
            <SliderRow label="Cursor Size" value={cursorSize} onChange={setCursorSize} min={40} max={180} />
            <SliderRow label="Resolution" value={resolution} onChange={setResolution} min={0.2} max={1} step={0.05} />
            <SliderRow
              label="Auto Speed"
              value={autoSpeed}
              onChange={setAutoSpeed}
              min={0.1}
              max={1.5}
              step={0.05}
              disabled={!autoDemo}
            />
            <SliderRow
              label="Auto Intensity"
              value={autoIntensity}
              onChange={setAutoIntensity}
              min={0.5}
              max={4}
              step={0.1}
              disabled={!autoDemo}
            />
            <SliderRow
              label="Auto Resume"
              value={autoResumeDelay}
              onChange={setAutoResumeDelay}
              min={1000}
              max={6000}
              step={250}
              disabled={!autoDemo}
              format={(val) => `${Math.round(val)}ms`}
            />
            <SliderRow
              label="Takeover Duration"
              value={takeoverDuration}
              onChange={setTakeoverDuration}
              min={0.1}
              max={1}
              step={0.05}
              disabled={!autoDemo}
            />
            <SliderRow
              label="Pressure Iterations"
              value={iterationsPoisson}
              onChange={setIterationsPoisson}
              min={8}
              max={64}
              step={1}
              format={(value) => `${Math.round(value)}`}
            />
            <SliderRow
              label="Viscous Iterations"
              value={iterationsViscous}
              onChange={setIterationsViscous}
              min={8}
              max={64}
              step={1}
              disabled={!isViscous}
              format={(value) => `${Math.round(value)}`}
            />
            <SliderRow
              label="Viscous Coefficient"
              value={viscous}
              onChange={setViscous}
              min={10}
              max={60}
              step={1}
              disabled={!isViscous}
              format={(value) => `${Math.round(value)}`}
            />
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
