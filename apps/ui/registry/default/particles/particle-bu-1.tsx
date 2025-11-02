import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"

export default function Particle() {
  return (
    <Button variant="link">
      <ChevronLeftIcon className="opacity-72" aria-hidden="true" />
      Go back
    </Button>
  )
}
