import { useId } from "react"

import { SelectNative } from "@/registry/building-blocks/default/ui/select-native"

export default function Component() {
  const id = useId()
  return (
    <div className="relative rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-[select:disabled]:cursor-not-allowed has-[select:disabled]:opacity-50 has-[select:is(:disabled)_*]:pointer-events-none dark:has-aria-invalid:ring-destructive/40">
      <label
        htmlFor={id}
        className="block px-3 pt-2 text-xs font-medium text-foreground"
      >
        Select with inset label (native)
      </label>
      <SelectNative
        id={id}
        defaultValue=""
        className="border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <option value="" disabled>
          Select framework
        </option>
        <option value="1">React</option>
        <option value="2">Next.js</option>
        <option value="3">Astro</option>
        <option value="4">Gatsby</option>
      </SelectNative>
    </div>
  )
}
