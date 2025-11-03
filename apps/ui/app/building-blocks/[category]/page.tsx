import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { categories, getCategory } from "@/lib/building-blocks-config/components"
import { getComponentsByNames } from "@/lib/building-blocks/utils"
import ComponentCard from "@/components/building-blocks/component-card"
import ComponentDetails from "@/components/building-blocks/component-details"
import ComponentLoader from "@/components/building-blocks/component-loader-server"
import Cta from "@/components/building-blocks/cta"
import PageGrid from "@/components/building-blocks/page-grid"
import PageHeader from "@/components/building-blocks/page-header"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category)

  if (!category) {
    return {}
  }

  // Get components to check count
  const components = getComponentsByNames(
    category.components.map((item) => item.name)
  )

  const isSingleComponent = components.length === 1

  // Custom title and description for event-calendar
  if (category.slug === "event-calendar") {
    return {
      title:
        "Event calendar component built with React and Tailwind CSS - loveui Building Blocks",
      description:
        "An event calendar component built with React and Tailwind CSS.",
    }
  }

  return {
    title: isSingleComponent
      ? `${category.name} component built with React and Tailwind CSS - loveui Building Blocks`
      : `${category.name} components built with React and Tailwind CSS - loveui Building Blocks`,
    description: isSingleComponent
      ? `A beautiful and accessible ${category.name.toLowerCase()} component built with React and Tailwind CSS.`
      : `A collection of beautiful and accessible ${category.name.toLowerCase()} components built with React and Tailwind CSS.`,
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

  const components = getComponentsByNames(
    category.components.map((item) => item.name)
  )

  // Determine the description text based on category
  const getDescriptionText = () => {
    // Special case for event-calendar
    if (category.slug === "event-calendar") {
      return (
        <span className="block text-balance">
          An event calendar component built with React and Tailwind CSS.
        </span>
      )
    }

    // Default case based on component count
    return components.length === 1
      ? `A ${category.name.toLowerCase()} component built with React and Tailwind CSS.`
      : `A growing collection of ${components.length} ${category.name.toLowerCase()} components built with React and Tailwind CSS.`
  }

  return (
    <>
      <PageHeader title={category.name}>{getDescriptionText()}</PageHeader>
      <PageGrid>
        {components.map((component) => (
          <ComponentCard
            key={component.name}
            component={component}
            className="data-[slot=comp-542]:px-0"
          >
            <ComponentLoader component={component} />
            <ComponentDetails component={component} />
          </ComponentCard>
        ))}
      </PageGrid>
      <Cta />
    </>
  )
}
