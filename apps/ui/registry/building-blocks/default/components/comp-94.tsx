import { Button } from "@/registry/building-blocks/default/ui/button"
import { assetPath } from "@/lib/building-blocks/utils"

export default function Component() {
  return (
    <Button className="gap-0 rounded-full py-0 ps-0">
      <div className="me-0.5 flex aspect-square h-full p-1.5">
        <img
          className="h-auto w-full rounded-full"
          src={assetPath("/building-blocks/avatar.jpg")}
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
