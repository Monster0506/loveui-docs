"use client"

import Silk from "@loveui/silk"

export default function SilkExample() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card">
      <div className="relative h-[420px] w-full overflow-hidden rounded-[1.75rem]">
        <Silk speed={5} scale={1} noiseIntensity={1.5} rotation={0} color="#7B61FF" />
      </div>
    </div>
  )
}
