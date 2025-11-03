import { useId } from "react"

import { Label } from "@/registry/default/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Options with portrait</Label>
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-auto ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/160?img=8"
                alt="Connor Love"
                width={40}
                height={40}
              />
              <span>
                <span className="block font-medium">Connor Love</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  @loveconnor
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="2">
            <span className="flex items-center gap-2">
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/160?img=9"
                alt="Thomas Raklovits"
                width={40}
                height={40}
              />
              <span>
                <span className="block font-medium">Thomas Raklovits</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  @monster0506
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="3">
            <span className="flex items-center gap-2">
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/160?img=10"
                alt="Ian Schroeter"
                width={40}
                height={40}
              />
              <span>
                <span className="block font-medium">Ian Schroeter</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  @ischroeter
                </span>
              </span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}