"use client"

import GradientBlinds from "@loveui/gradiant-blinds"

export default function GradientBlindsExample() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card">
      <div className="relative h-[420px] w-full overflow-hidden rounded-[1.75rem]">
        <GradientBlinds
          gradientColors={["#FF9FFC", "#5227FF"]}
          angle={20}
          noise={0.5}
          blindCount={16}
          blindMinWidth={60}
          spotlightRadius={0.5}
          distortAmount={0}
          shineDirection="left"
          mouseDampening={0.15}
        />
      </div>
    </div>
  )
}
