import { Shuffle } from "lucide-react"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/registry/building-blocks/default/ui/stepper"

export default function Component() {
  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <Stepper defaultValue={2}>
        <StepperItem step={1} className="not-last:flex-1">
          <StepperTrigger>
            <StepperIndicator asChild>
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/160?img=12"
                width={32}
                height={32}
                alt="Mike Palmer"
              />
            </StepperIndicator>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2} className="not-last:flex-1" loading>
          <StepperTrigger>
            <StepperIndicator />
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3} className="not-last:flex-1">
          <StepperTrigger>
            <StepperIndicator asChild>
              <Shuffle size={14} aria-hidden="true" />
              <span className="sr-only">Shuffle</span>
            </StepperIndicator>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
      <p
        className="mt-2 text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Stepper with mixed elements
      </p>
    </div>
  )
}