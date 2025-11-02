import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"
import { Badge } from "@/registry/default/ui/badge"

export default function Component() {
  return (
    <div className="relative">
      <Avatar className="rounded-md">
        <AvatarImage src="/origin/avatar-80-07.jpg" alt="Kelly King" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <Badge className="absolute -top-2 left-full min-w-5 -translate-x-3 border-background px-1">
        6
      </Badge>
    </div>
  )
}
