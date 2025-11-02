import {
  Heading1Icon,
  Heading2Icon,
  MinusIcon,
  PlusIcon,
  TextQuoteIcon,
  TypeIcon,
} from "lucide-react"

import { Button } from "@/registry/building-blocks/default/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/building-blocks/default/ui/dropdown-menu"

export default function Component() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <PlusIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Add block</DropdownMenuLabel>
        <DropdownMenuItem>
          <div
            className="flex size-8 items-center justify-center rounded-md border bg-background"
            aria-hidden="true"
          >
            <TypeIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Text</div>
            <div className="text-xs text-muted-foreground">
              Start writing with plain text
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex size-8 items-center justify-center rounded-md border bg-background"
            aria-hidden="true"
          >
            <TextQuoteIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Quote</div>
            <div className="text-xs text-muted-foreground">Capture a quote</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex size-8 items-center justify-center rounded-md border bg-background"
            aria-hidden="true"
          >
            <MinusIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Divider</div>
            <div className="text-xs text-muted-foreground">
              Visually divide blocks
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex size-8 items-center justify-center rounded-md border bg-background"
            aria-hidden="true"
          >
            <Heading1Icon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Heading 1</div>
            <div className="text-xs text-muted-foreground">
              Big section heading
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex size-8 items-center justify-center rounded-md border bg-background"
            aria-hidden="true"
          >
            <Heading2Icon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Heading 2</div>
            <div className="text-xs text-muted-foreground">
              Medium section subheading
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
