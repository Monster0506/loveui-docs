import { Suspense } from "react"
import type { PageTemplate } from "@/lib/page-templates/utils"
import { TemplatePreviewTabs } from "@/components/page-templates/template-preview-tabs"
import { TemplateSource } from "@/components/page-templates/template-source"

interface TemplatePreviewProps {
  template: PageTemplate
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  // Dynamically import the template component from the main component file
  const mainComponentPath = template.mainComponent || "app/page"
  const TemplateComponent = require(`@/registry/page-templates/default/templates/${template.name}/${mainComponentPath}`).default

  return (
    <div className="mb-16">
      {template.title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">{template.title}</h2>
          {template.description && (
            <p className="mt-2 text-muted-foreground">{template.description}</p>
          )}
        </div>
      )}
      <TemplatePreviewTabs
        templateName={template.name}
        component={
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
        }
        source={<TemplateSource template={template} />}
      />
    </div>
  )
}
