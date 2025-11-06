import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-200px)] items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Template Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The page template you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/page-templates"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
        >
          Back to Templates
        </Link>
      </div>
    </div>
  )
}
