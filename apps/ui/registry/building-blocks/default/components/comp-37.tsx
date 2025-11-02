"use client"

import { Label } from "react-aria-components"

import { DateInput, TimeField } from "@/registry/building-blocks/default/ui/datefield-rac"

export default function Component() {
  return (
    <TimeField className="*:not-first:mt-2">
      <Label className="text-sm font-medium text-foreground">Time input</Label>
      <DateInput />
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
