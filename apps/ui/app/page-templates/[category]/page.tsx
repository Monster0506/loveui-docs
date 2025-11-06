import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { categories, getCategory } from "@/lib/page-templates-config/templates"
import { getTemplatesByNames } from "@/lib/page-templates/utils"
import PageHeader from "@/components/page-templates/page-header"
import { TemplatePreview } from "@/components/page-templates/template-preview"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category)

  if (!category) {
    return {}
  }

  // Get templates to check count
  const templates = getTemplatesByNames(
    category.templates.map((item) => item.name)
  )

  const isSingleTemplate = templates.length === 1

  return {
    title: isSingleTemplate
      ? `${category.name} page template built with React and Tailwind CSS - loveui Page Templates`
      : `${category.name} page templates built with React and Tailwind CSS - loveui Page Templates`,
    description: isSingleTemplate
      ? `A beautiful and accessible ${category.name.toLowerCase()} page template built with React and Tailwind CSS.`
      : `A collection of beautiful and accessible ${category.name.toLowerCase()} page templates built with React and Tailwind CSS.`,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function Page({ params }: Props) {
  const category = getCategory((await params).category)

  if (!category) {
    notFound()
  }

  const templates = getTemplatesByNames(
    category.templates.map((item) => item.name)
  )

  // Determine the description text based on category
  const getDescriptionText = () => {
    return templates.length === 1
      ? `A ${category.name.toLowerCase()} page template built with React and Tailwind CSS.`
      : `A growing collection of ${templates.length} ${category.name.toLowerCase()} page templates built with React and Tailwind CSS.`
  }

  return (
    <div className="container py-12">
      <PageHeader title={category.name}>{getDescriptionText()}</PageHeader>
      <div className="space-y-16">
        {templates.map((template) => (
          <TemplatePreview key={template.name} template={template} />
        ))}
      </div>
    </div>
  )
}
