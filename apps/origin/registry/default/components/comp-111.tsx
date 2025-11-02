import { QrCodeIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="inline-flex divide-x divide-primary-foreground/30 rounded-md shadow-xs rtl:space-x-reverse">
      <Button
        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
        size="icon"
        aria-label="QR code"
      >
        <QrCodeIcon size={16} aria-hidden="true" />
      </Button>
      <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
        Sign in
      </Button>
    </div>
  )
}
