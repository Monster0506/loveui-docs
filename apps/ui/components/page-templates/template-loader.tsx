"use client"

import { Suspense } from "react"
import type { PageTemplate } from "@/lib/page-templates/utils"

interface TemplateLoaderProps {
  template: PageTemplate
}

export default function TemplateLoader({ template }: TemplateLoaderProps) {
  // Dynamically import the template component
  const TemplateComponent = require(`@/registry/page-templates/default/templates/${template.name}`).default

  return (
    <div className="peer relative w-full overflow-hidden" data-comp-loading="false">
      <Suspense
        fallback={
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" />
          </div>
        }
      >
        <div className="w-full">
          <TemplateComponent />
        </div>
      </Suspense>
    </div>
  )
}
