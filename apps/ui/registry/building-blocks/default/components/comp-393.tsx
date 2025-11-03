import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"

export default function Component() {
  return (
    <Avatar className="rounded-md">
      <AvatarImage src="https://i.pravatar.cc/160?img=20" alt="Kelly King" />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
  )
}