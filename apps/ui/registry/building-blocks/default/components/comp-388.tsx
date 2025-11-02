import { Button } from "@/registry/building-blocks/default/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/building-blocks/default/ui/popover"
import { Textarea } from "@/registry/building-blocks/default/ui/textarea"

export default function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Feedback</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <h2 className="mb-2 text-sm font-semibold">Send us feedback</h2>
          <form className="space-y-3">
            <Textarea
              id="feedback"
              placeholder="How can we improve loveui?"
              aria-label="Send feedback"
            />
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button size="sm">Send feedback</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  )
}
