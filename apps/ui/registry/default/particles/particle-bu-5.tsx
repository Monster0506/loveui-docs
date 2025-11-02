import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react"

import { Button } from "@/registry/default/ui/button"

export default function Particle() {
  return (
    <div className="inline-flex flex-wrap gap-2">
      <Button variant="outline" aria-label="Login with Google" size="icon">
        <RiGoogleFill className="opacity-72" aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with Facebook" size="icon">
        <RiFacebookFill className="opacity-72" aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with X" size="icon">
        <RiTwitterXFill className="opacity-72" aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Login with GitHub" size="icon">
        <RiGithubFill className="opacity-72" aria-hidden="true" />
      </Button>
    </div>
  )
}
