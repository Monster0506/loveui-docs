import { assetPath } from "@/lib/building-blocks/utils"

export default function Component() {
  return (
    <div className="flex items-center rounded-full border bg-background p-1 shadow-sm">
      <div className="flex -space-x-1.5">
        <img
          className="rounded-full ring-1 ring-background"
          src={assetPath("/building-blocks/avatar-80-03.jpg")}
          width={20}
          height={20}
          alt="Avatar 01"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src={assetPath("/building-blocks/avatar-80-04.jpg")}
          width={20}
          height={20}
          alt="Avatar 02"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src={assetPath("/building-blocks/avatar-80-05.jpg")}
          width={20}
          height={20}
          alt="Avatar 03"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src={assetPath("/building-blocks/avatar-80-06.jpg")}
          width={20}
          height={20}
          alt="Avatar 04"
        />
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">60K+</strong>{" "}
        developers.
      </p>
    </div>
  )
}
