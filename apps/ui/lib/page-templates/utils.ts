import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const basePath =
  (process.env.NEXT_PUBLIC_BASE_PATH || "/ui").replace(/\/$/, "")

// Template file structure
export interface TemplateFile {
  path: string // e.g., "app/page.tsx" or "components/auth-page.tsx"
  content?: string // Will be loaded dynamically
}

// Placeholder template data structure
export interface PageTemplate {
  name: string
  title: string
  description?: string
  files: TemplateFile[] // Array of files that make up this template
  mainComponent?: string // Path to the main component file (for preview)
}

// Placeholder templates - you'll replace this with actual template data later
export const templates: PageTemplate[] = [
  {
    name: "template-auth-01",
    title: "Sign In",
    description: "A clean and modern sign-in page with email/password fields, social login options, and dark mode support.",
    files: [
      { path: "app/page.tsx" },
      { path: "components/auth-page.tsx" },
      { path: "components/floating-paths.tsx" },
      { path: "components/logo.tsx" },
    ],
    mainComponent: "app/page",
  },
  {
    name: "template-auth-02",
    title: "Login",
    description: "A clean and modern login page with card-based design and animated background effects.",
    files: [
      { path: "app/page.tsx" },
      { path: "components/login-form.tsx" },
      { path: "components/shader-ripple.tsx" },
    ],
    mainComponent: "app/page",
  },
  {
    name: "template-auth-03",
    title: "Login with Fields",
    description: "A centered login form using the Field component with proper validation and GitHub authentication.",
    files: [
      { path: "app/page.tsx" },
      { path: "components/login-form.tsx" },
      { path: "components/gradient-mesh.tsx" },
    ],
    mainComponent: "app/page",
  },
]

export const getTemplatesByNames = (names: string[]): PageTemplate[] => {
  const templatesMap = new Map(templates.map((tmpl) => [tmpl.name, tmpl]))

  return names
    .map((name) => templatesMap.get(name))
    .filter((tmpl): tmpl is PageTemplate => tmpl !== undefined)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const assetPath = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}
