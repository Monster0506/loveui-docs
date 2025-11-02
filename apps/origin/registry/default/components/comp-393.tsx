import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function Component() {
  return (
    <Avatar className="rounded-md">
      <AvatarImage src="/origin/avatar-80-07.jpg" alt="Kelly King" />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
  )
}
