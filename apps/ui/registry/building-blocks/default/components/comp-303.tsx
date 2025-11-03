import { EclipseIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="rounded-md border border-border/60 bg-muted/80 px-4 py-3 text-foreground shadow-sm">
      <p className="text-center text-sm">
        <EclipseIcon
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={16}
          aria-hidden="true"
        />
        Unlock role-based dashboards with live product analytics{" "}
        <span className="text-muted-foreground">·</span>{" "}
        <a href="#" className="font-medium underline hover:no-underline">
          Upgrade now
        </a>
      </p>
    </div>
  )
}
