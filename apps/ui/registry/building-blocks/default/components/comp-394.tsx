import { assetPath } from "@/lib/building-blocks/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"

export default function Component() {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={assetPath("/building-blocks/avatar-80-07.jpg")} alt="Kelly King" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <span className="absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  )
}
