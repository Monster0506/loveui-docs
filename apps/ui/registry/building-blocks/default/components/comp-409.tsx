import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <div className="flex -space-x-3">
      <img
        className="rounded-full ring-2 ring-background"
        src="https://i.pravatar.cc/160?img=16"
        width={40}
        height={40}
        alt="Avatar 01"
      />
      <img
        className="rounded-full ring-2 ring-background"
        src="https://i.pravatar.cc/160?img=17"
        width={40}
        height={40}
        alt="Avatar 02"
      />
      <img
        className="rounded-full ring-2 ring-background"
        src="https://i.pravatar.cc/160?img=18"
        width={40}
        height={40}
        alt="Avatar 03"
      />
      <img
        className="rounded-full ring-2 ring-background"
        src="https://i.pravatar.cc/160?img=19"
        width={40}
        height={40}
        alt="Avatar 04"
      />
      <Button
        variant="secondary"
        className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-2 ring-background hover:bg-secondary hover:text-foreground"
        size="icon"
      >
        +3
      </Button>
    </div>
  )
}