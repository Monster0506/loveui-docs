import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { templates } from "@/lib/page-templates/utils"

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  const template = templates.find((t) => t.name === name)

  return {
    title: `${template?.title || name} - Page Template Preview`,
    description: `Full page preview of ${template?.title || name} template`,
  }
}

export default async function PreviewPage({ params }: Props) {
  const { name } = await params

  // Find the template to get the main component path
  const template = templates.find((t) => t.name === name)

  if (!template) {
    notFound()
  }

  let TemplateComponent: React.ComponentType

  try {
    const mainComponentPath = template.mainComponent || "app/page"
    TemplateComponent = require(`@/registry/page-templates/default/templates/${name}/${mainComponentPath}`).default
  } catch (error) {
    console.error(`Template ${name} not found:`, error)
    notFound()
  }

  return (
    <div className="h-screen w-full">
      <TemplateComponent />
    </div>
  )
}
