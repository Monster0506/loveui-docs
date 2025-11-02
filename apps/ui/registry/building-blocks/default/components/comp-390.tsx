import { assetPath } from "@/lib/building-blocks/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"

export default function Component() {
  return (
    <Avatar>
      <AvatarImage src={assetPath("/building-blocks/avatar-80-07.jpg")} alt="Kelly King" />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
  )
}
