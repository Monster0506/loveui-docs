import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"

export default function Component() {
  return (
    <div className="relative">
      <Avatar className="rounded-md">
        <AvatarImage src="https://i.pravatar.cc/160?img=20" alt="Kelly King" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
      <span className="absolute -end-1 -top-1 size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  )
}