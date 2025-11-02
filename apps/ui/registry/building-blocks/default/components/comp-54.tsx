"use client"

import { useId } from "react"
import { withMask } from "use-mask-input"

import { Input } from "@/registry/building-blocks/default/ui/input"
import { Label } from "@/registry/building-blocks/default/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with mask</Label>
      <Input
        id={id}
        placeholder="AB12 CDE"
        type="text"
        ref={(input) => {
          if (input) {
            withMask("AA99 AAA", {
              placeholder: "",
              showMaskOnHover: false,
            })(input)
          }
        }}
      />
      <p
        className="mt-2 text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/eduardoborges/use-mask-input"
          target="_blank"
          rel="noopener nofollow"
        >
          use-mask-input
        </a>
      </p>
    </div>
  )
}
