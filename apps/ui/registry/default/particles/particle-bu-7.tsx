"use client"

import { useState } from "react"
import { StarIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Particle() {
  const [isStarred, setIsStarred] = useState(false)
  const count = isStarred ? 730 : 729

  return (
    <Button onClick={() => setIsStarred(!isStarred)}>
      <StarIcon
        className={`${isStarred ? "fill-yellow-500 text-yellow-500" : "opacity-72"}`}
        aria-hidden="true"
      />
      <span className="flex items-baseline gap-2">
        {isStarred ? "Starred" : "Star"}
        <span className="text-xs text-primary-foreground/60">{count}</span>
      </span>
    </Button>
  )
}
