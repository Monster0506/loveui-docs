import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon,
} from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Particle() {
  return (
    <div className="inline-grid w-fit grid-cols-3 gap-1">
      <Button
        className="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera up"
      >
        <ChevronUpIcon aria-hidden="true" />
      </Button>
      <Button
        className="col-start-1"
        variant="outline"
        size="icon"
        aria-label="Pan camera left"
      >
        <ChevronLeftIcon aria-hidden="true" />
      </Button>
      <div className="flex items-center justify-center" aria-hidden="true">
        <CircleIcon className="size-4 opacity-72" />
      </div>
      <Button variant="outline" size="icon" aria-label="Pan camera right">
        <ChevronRightIcon aria-hidden="true" />
      </Button>
      <Button
        className="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera down"
      >
        <ChevronDownIcon aria-hidden="true" />
      </Button>
    </div>
  )
}
