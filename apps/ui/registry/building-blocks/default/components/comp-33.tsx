import { useId } from "react"

export default function Component() {
  const id = useId()
  return (
    <div className="relative rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-[input:is(:disabled)]:*:pointer-events-none dark:has-aria-invalid:ring-destructive/40">
      <label
        htmlFor={id}
        className="block px-3 pt-2 text-xs font-medium text-foreground"
      >
        Input with inset label
      </label>
      <input
        id={id}
        className="flex h-10 w-full bg-transparent px-3 pb-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none"
        placeholder="Email"
        type="email"
        disabled
      />
    </div>
  )
}
