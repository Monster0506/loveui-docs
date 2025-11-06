import type { PageTemplate } from "@/lib/page-templates/utils"
import { cn } from "@/lib/page-templates/utils"

export default function TemplateCard({
  children,
  template,
  className,
}: {
  children: React.ReactNode
  template: PageTemplate
  className?: string
}) {
  return (
    <div
      className={cn(
        "group/item relative col-span-12 border border-zinc-200 dark:border-zinc-900",
        className
      )}
      data-slot={template.name}
    >
      {children}
    </div>
  )
}
