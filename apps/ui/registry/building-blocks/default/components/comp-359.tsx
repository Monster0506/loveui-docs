import { Button } from "@/registry/building-blocks/default/ui/button"
import { assetPath } from "@/lib/building-blocks/utils"
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
            W/ image
          </Button>
        </TooltipTrigger>
        <TooltipContent className="py-3">
          <div className="space-y-2">
            <img
              className="w-full rounded"
              src={assetPath("/building-blocks/dialog-content.png")}
              width={382}
              height={216}
              alt="Content image"
            />
            <div className="space-y-1">
              <p className="text-[13px] font-medium">
                Tooltip with title and icon
              </p>
              <p className="text-xs text-muted-foreground">
                Tooltips are made to be highly customizable, with features like
                dynamic placement, rich content, and a robust API.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
