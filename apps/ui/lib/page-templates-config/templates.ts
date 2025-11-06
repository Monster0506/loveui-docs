export interface TemplateCategory {
  slug: string
  name: string
  templates: { name: string }[]
  isNew?: boolean
}

export const categories: TemplateCategory[] = [
  {
    slug: "auth",
    name: "Auth",
    templates: [
      { name: "template-auth-01" },
      { name: "template-auth-02" },
      { name: "template-auth-03" },
    ],
  },
]

export function getCategory(slug: string): TemplateCategory | undefined {
  return categories.find((category) => category.slug === slug)
}
