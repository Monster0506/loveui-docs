import { ChevronDownIcon } from "lucide-react"
import { assetPath } from "@/lib/building-blocks/utils"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"
import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
      <Avatar>
        <AvatarImage src={assetPath("/building-blocks/avatar.jpg")} alt="Profile image" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
    </Button>
  )
}
