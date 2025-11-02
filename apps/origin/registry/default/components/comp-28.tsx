"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { Button, Group, Input, Label, NumberField } from "react-aria-components"

export default function Component() {
  return (
    <NumberField defaultValue={2048} minValue={0}>
      <div className="*:not-first:mt-2">
        <Label className="text-sm font-medium text-foreground">
          Number input with plus/minus buttons
        </Label>
        <Group className="relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border border-input text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:border-ring data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40">
          <Button
            slot="decrement"
            className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MinusIcon size={16} aria-hidden="true" />
          </Button>
          <Input className="w-full grow bg-background px-3 py-2 text-center text-foreground tabular-nums" />
          <Button
            slot="increment"
            className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon size={16} aria-hidden="true" />
          </Button>
        </Group>
      </div>
      <p
        className="mt-2 text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://react-spectrum.adobe.com/react-aria/NumberField.html"
          target="_blank"
          rel="noopener nofollow"
        >
          React Aria
        </a>
      </p>
    </NumberField>
  )
}
