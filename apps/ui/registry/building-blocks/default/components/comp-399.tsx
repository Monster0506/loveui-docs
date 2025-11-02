import { assetPath } from "@/lib/building-blocks/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"
import { Badge } from "@/registry/building-blocks/default/ui/badge"

export default function Component() {
  return (
    <div className="relative">
      <Avatar className="rounded-md">
        <AvatarImage src={assetPath("/building-blocks/avatar-80-07.jpg")} alt="Kelly King" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <Badge className="absolute -top-2 left-full min-w-5 -translate-x-3 border-background px-1">
        6
      </Badge>
    </div>
  )
}
