"use client"

import { ClockIcon } from "lucide-react"
import { Label } from "react-aria-components"

import { DateInput, TimeField } from "@/registry/building-blocks/default/ui/datefield-rac"

export default function Component() {
  return (
    <TimeField className="*:not-first:mt-2">
      <Label className="text-sm font-medium text-foreground">
        Time input with start icon
      </Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80">
          <ClockIcon size={16} aria-hidden="true" />
        </div>
        <DateInput className="ps-9" />
      </div>
      <p
        className="mt-2 text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://react-spectrum.adobe.com/react-aria/DateField.html"
          target="_blank"
          rel="noopener nofollow"
        >
          React Aria
        </a>
      </p>
    </TimeField>
  )
}
