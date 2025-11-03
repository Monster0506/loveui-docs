import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"
import { Badge } from "@/registry/building-blocks/default/ui/badge"

export default function Component() {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/160?img=20" alt="Kelly King" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <Badge className="absolute -top-1.5 left-full min-w-5 -translate-x-3.5 border-background px-1">
        6
      </Badge>
    </div>
  )
}