import {
  ChevronLeftIcon,
  HistoryIcon,
  MessageSquareText,
  UserRoundPlus,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/building-blocks/default/ui/avatar"
import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Button
            className="size-8"
            variant="ghost"
            size="icon"
            aria-label="Go back"
            asChild
          >
            <a href="#">
              <ChevronLeftIcon />
            </a>
          </Button>
          <h1 className="text-sm font-medium">Love UI</h1>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* History button */}
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            aria-label="History"
          >
            <HistoryIcon size={16} aria-hidden="true" />
          </Button>
          {/* Comments button */}
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            aria-label="Save"
          >
            <MessageSquareText size={16} aria-hidden="true" />
          </Button>
          {/* Add user */}
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            aria-label="Add user"
          >
            <UserRoundPlus size={16} aria-hidden="true" />
          </Button>
          {/* Online users */}
          <div className="ml-2 flex items-center gap-2">
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/160?img=20" alt="Kelly King" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <span className="absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-emerald-500">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src="https://i.pravatar.cc/160?img=19"
                  alt="Martha Johnson"
                />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <span className="absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-muted-foreground">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/160?img=18" alt="Linda Green" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <span className="absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-muted-foreground">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <Button
              variant="secondary"
              className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-background hover:bg-secondary hover:text-foreground"
              size="icon"
            >
              +3
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}