"use client"

import { CheckIcon, TerminalIcon } from "lucide-react"

import { useCopy } from "@/hooks/use-copy"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

const CopyLayout = ({ command }: { command: string | undefined }) => {
  const { copied, copy } = useCopy()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="inline-flex items-center gap-1 text-sm hover:underline max-sm:hidden"
            onClick={() => copy(command || "")}
            aria-label={copied ? "Copied" : "Copy command"}
            disabled={copied}
          >
            {copied ? (
              <CheckIcon className="size-4 text-emerald-600" />
            ) : (
              <TerminalIcon className="size-4 text-muted-foreground" />
            )}
            CLI Command
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs text-muted-foreground">
          Click to copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CopyLayout
