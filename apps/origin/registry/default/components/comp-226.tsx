import { useId } from "react"

import { Label } from "@/registry/default/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Options with avatar</Label>
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
          <SelectGroup>
            <SelectLabel className="ps-2">Impersonate user</SelectLabel>
            <SelectItem value="1">
              <img
                className="size-5 rounded"
                src="https://i.pravatar.cc/160?img=1"
                alt="Frank Allison"
                width={20}
                height={20}
              />
              <span className="truncate">Connor Love</span>
            </SelectItem>
            <SelectItem value="2">
              <img
                className="size-5 rounded"
                src="https://i.pravatar.cc/160?img=2"
                alt="Xavier Guerra"
                width={20}
                height={20}
              />
              <span className="truncate">Thomas Raklovits</span>
            </SelectItem>
            <SelectItem value="3">
              <img
                className="size-5 rounded"
                src="https://i.pravatar.cc/160?img=3"
                alt="Anne Kelley"
                width={20}
                height={20}
              />
              <span className="truncate">Ian Schroeter</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}