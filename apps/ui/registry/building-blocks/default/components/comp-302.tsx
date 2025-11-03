import { ArrowRightIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="rounded-md border border-border/60 bg-muted/80 px-4 py-3 text-foreground shadow-sm">
      <p className="flex justify-center text-sm">
        <a href="#" className="group">
          <span className="me-1 text-base leading-none">✨</span>
          Launch customer journey templates for product teams
          <ArrowRightIcon
            className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </a>
      </p>
    </div>
  )
}
