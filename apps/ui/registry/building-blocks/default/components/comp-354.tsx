import { Button } from "@/registry/building-blocks/default/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/building-blocks/default/ui/tooltip"

export default function Component() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Tiny
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          This is a simple tooltip
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
