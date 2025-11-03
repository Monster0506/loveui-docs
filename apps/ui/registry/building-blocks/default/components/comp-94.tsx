import { Button } from "@/registry/building-blocks/default/ui/button"

export default function Component() {
  return (
    <Button className="gap-0 rounded-full py-0 ps-0">
      <div className="me-0.5 flex aspect-square h-full p-1.5">
        <img
          className="h-auto w-full rounded-full"
          src="https://i.pravatar.cc/160?img=21"
          alt="Profile image"
          width={24}
          height={24}
          aria-hidden="true"
        />
      </div>
      @georgelucas
    </Button>
  )
}